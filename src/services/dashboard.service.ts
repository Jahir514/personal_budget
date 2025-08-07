import { IChart, IGetDashboardSummaryResponse, IRawChart } from '../interfaces/dashboard.interface';
import Income from '../model/income.model';
import Category from '../model/category.model';
import { AppError } from '../utils/AppError';
import { startOfDay, subDays } from 'date-fns';
import Expense from '../model/expense.model';

//all Income get service
const getIncomeSummary = async (): Promise<IGetDashboardSummaryResponse> => {
  const today = startOfDay(new Date());
  const sevenDaysAgo = subDays(today, 6); // includes today = 7 days
  const result = await Income.aggregate([
    // Tag all income with type
    {
      $project: {
        amount: 1,
        category: 1,
        date: 1,
        type: { $literal: 'income' },
      },
    },
    // Union with expenses
    {
      $unionWith: {
        coll: 'expenses',
        pipeline: [
          {
            $project: {
              amount: 1,
              category: 1,
              date: 1,
              type: { $literal: 'expense' },
            },
          },
        ],
      },
    },
    // Lookup category details
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    { $unwind: '$category' },
    // Multiple aggregations using $facet
    {
      $facet: {
        // Total income & expense
        total: [
          {
            $group: {
              _id: '$type',
              amount: { $sum: '$amount' },
            },
          },
        ],
        // Last 7 days income/expense/profit
        last7Days: [
          {
            $match: {
              date: {
                $gte: sevenDaysAgo,
                $lte: new Date(), // include up to current time
              },
            },
          },
          {
            $group: {
              _id: {
                type: '$type',
                date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
              },
              amount: { $sum: '$amount' },
            },
          },
          {
            $group: {
              _id: '$_id.date',
              income: {
                $sum: { $cond: [{ $eq: ['$_id.type', 'income'] }, '$amount', 0] },
              },
              expense: {
                $sum: { $cond: [{ $eq: ['$_id.type', 'expense'] }, '$amount', 0] },
              },
            },
          },
          {
            $project: {
              _id: 0,
              date: '$_id',
              income: 1,
              expense: 1,
              profit: { $subtract: ['$income', '$expense'] },
            },
          },
          {
            $sort: { date: 1 },
          },
        ],
        // Category wise income/expense/profit
        categoryWise: [
          {
            $group: {
              _id: {
                type: '$type',
                category: '$category.title',
              },
              amount: { $sum: '$amount' },
            },
          },
          {
            $group: {
              _id: '$_id.category',
              income: {
                $sum: { $cond: [{ $eq: ['$_id.type', 'income'] }, '$amount', 0] },
              },
              expense: {
                $sum: { $cond: [{ $eq: ['$_id.type', 'expense'] }, '$amount', 0] },
              },
            },
          },
          {
            $project: {
              _id: 0,
              category: '$_id',
              income: 1,
              expense: 1,
              profit: { $subtract: ['$income', '$expense'] },
            },
          },
        ],
      },
    },
  ]);

  const [agg] = result;

  const totalIncome = agg.total.find((t: any) => t._id === 'income')?.amount || 0;
  const totalExpense = agg.total.find((t: any) => t._id === 'expense')?.amount || 0;
  const totalProfit = totalIncome - totalExpense;

  // Fill missing dates for chart
  const last7Days = agg.last7Days as IRawChart[];
  const last7DaysMap = new Map<string, IRawChart>(last7Days.map((d) => [d.date, d]));

  const last7DaysIncomeChart: IChart[] = [];
  const last7DaysExpenseChart: IChart[] = [];
  const last7DaysProfitChart: IChart[] = [];

  for (let i = 0; i < 7; i++) {
    const d = subDays(today, 6 - i);
    const dateStr = d.toISOString().split('T')[0];
    const found = last7DaysMap.get(dateStr);

    last7DaysIncomeChart.push({ date: d, amount: found?.income || 0 });
    last7DaysExpenseChart.push({ date: d, amount: found?.expense || 0 });
    last7DaysProfitChart.push({ date: d, amount: found?.profit || 0 });
  }

  // Return full response
  return {
    totalIncome,
    totalExpense,
    totalProfit,
    last7DaysIncomeChart,
    last7DaysExpenseChart,
    last7DaysProfitChart,
    categoryWiseIncome: agg.categoryWise.map((c: any) => ({
      category: c.category,
      amount: c.income,
    })),
    categoryWiseExpense: agg.categoryWise.map((c: any) => ({
      category: c.category,
      amount: c.expense,
    })),
    categoryWiseProfit: agg.categoryWise.map((c: any) => ({
      category: c.category,
      amount: c.profit,
    })),
  };
};

export default {
  getIncomeSummary,
};
