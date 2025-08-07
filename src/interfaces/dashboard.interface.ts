//-----------------------------------------
//---------Response Realated Interfaces--------
//-----------------------------------------

export interface IRawChart {
  date: string;
  income: number;
  expense: number;
  profit: number;
}

//chart interface
export interface IChart {
  date: Date;
  amount: number;
}
//category wise data
interface ICategoryWiseData {
  category: String;
  amount: number;
}
//dashboard summary get response interface
export interface IGetDashboardSummaryResponse {
  totalIncome: number;
  totalExpense: number;
  totalProfit: number;
  last7DaysIncomeChart: IChart[];
  last7DaysExpenseChart: IChart[];
  last7DaysProfitChart: IChart[];
  categoryWiseIncome: ICategoryWiseData[];
  categoryWiseExpense: ICategoryWiseData[];
  categoryWiseProfit: ICategoryWiseData[];
}
