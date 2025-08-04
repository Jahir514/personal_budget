import { IGetIncomeResponse, IGetIncomeSummaryResponse, IIncome } from '../interfaces/income.interface';
import Income from '../model/income.model';
import Category from '../model/category.model';
import { AppError } from '../utils/AppError';
import { startOfDay, subDays } from 'date-fns';

//all Income get service
const getIncomeSummary = async (): Promise<IGetIncomeSummaryResponse> => {
  const today = startOfDay(new Date());
  const sevenDaysAgo = subDays(today, 6); // includes today = 7 days

  const result = await Income.aggregate([
    {
      $facet: {
        // Total income
        totalIncome: [
          {
            $group: {
              _id: null,
              amount: { $sum: '$amount' },
            },
          },
        ],

        // Category wise
        categoryWise: [
          {
            $lookup: {
              from: 'categories',
              localField: 'category',
              foreignField: '_id',
              as: 'category',
            },
          },
          { $unwind: '$category' },
          {
            $group: {
              _id: '$category.title',
              amount: { $sum: '$amount' },
            },
          },
          {
            $project: {
              _id: 0,
              category: '$_id',
              amount: 1,
            },
          },
        ],

        // Last 7 days chart
        last7DaysChart: [
          {
            $match: {
              date: { $gte: sevenDaysAgo },
            },
          },
          {
            $group: {
              _id: {
                $dateToString: { format: '%Y-%m-%d', date: '$date' },
              },
              amount: { $sum: '$amount' },
            },
          },
          {
            $project: {
              _id: 0,
              date: '$_id',
              amount: 1,
            },
          },
        ],
      },
    },
  ]);

  // Fill missing dates (days with 0 income)
  const chartData = result[0].last7DaysChart;
  const fullChart: { date: Date; amount: number }[] = [];

  for (let i = 0; i < 7; i++) {
    const date = subDays(today, 6 - i);
    const found = chartData.find((d: { date: Date }) => new Date(d.date).toDateString() === date.toDateString());
    fullChart.push({ date, amount: found ? found.amount : 0 });
  }
  return {
    totalIncome: result[0].totalIncome[0]?.amount || 0,
    last7DaysChart: fullChart,
    categoryWise: result[0].categoryWise,
  };
};

export default {
  getIncomeSummary,
};
