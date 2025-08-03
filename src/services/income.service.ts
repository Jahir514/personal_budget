import {
  ICreateIncome,
  ICreateIncomeResponse,
  IDeleteIncomeResponse,
  IGetIncomeResponse,
  IIncome,
  IUpdateIncome,
  IUpdateIncomeResponse,
} from "../interfaces/income.interface";
import Income from "../model/income.model";
import { AppError } from "../utils/AppError";

//Income create service
const createIncome = async (data: ICreateIncome): Promise<ICreateIncomeResponse> => {
  const { title, category, amount, date } = data;
  if (!title || !category || !amount || !date) throw new AppError("Please provide correct Income information.", 400);

  //create ingridents instance
  const IncomeInfo = {
    title,
    category,
    amount,
    date,
  };
  //save to database
  const income = new Income(IncomeInfo);
  const savedIncome = await income.save();
  //handle response
  if (savedIncome) {
    const incomeData = await Income.findOne({ _id: savedIncome._id }).populate("category", "title");
    return {
      success: true,
      message: "Successfully create Income",
      income: incomeData,
    };
  } else {
    throw new AppError("Failed to create Income", 400);
  }
};

//all Income get service
const getAllIncome = async (): Promise<IGetIncomeResponse> => {
  const income: IIncome[] = await Income.find().populate("category", "title");

  if (income.length == 0) {
    return {
      message: "No income found.",
      income,
    };
  } else {
    return {
      message: "",
      income,
    };
  }
};
//single Income get service
const getSingleIncome = async (IncomeId: string): Promise<IGetIncomeResponse> => {
  const income: IIncome | null = await Income.findOne({ _id: IncomeId });
  if (income) {
    return {
      message: "",
      income,
    };
  } else {
    throw new AppError("No Income found.", 400);
  }
};

//Income update service
const updateIncome = async (incomeId: string, data: IUpdateIncome): Promise<IUpdateIncomeResponse> => {
  // get Income that need to update
  const income: IIncome | null = await Income.findOne({ _id: incomeId });
  //throw error if not exist
  if (!income) {
    throw new AppError("No ingridents found", 400);
  }
  //update when it exist
  const option = { new: true, runValidator: true };
  const updatedIncome: IIncome | null = await Income.findByIdAndUpdate(incomeId, { $set: data }, option).select(
    "name serialNo supplier category stock costPrice salePrice unit"
  );
  if (updatedIncome) {
    return {
      success: true,
      message: "Successfully update Income ",
      income: updatedIncome,
    };
  } else {
    return {
      success: false,
      message: "Failed to update Income ",
      income: updatedIncome,
    };
  }
};
//Income  delete service
const deleteIncome = async (incomeId: string): Promise<IDeleteIncomeResponse> => {
  // get Income  that needs to delete
  const income: IIncome | null = await Income.findOne({ _id: incomeId });
  //throw error if not exist
  if (!income) {
    throw new AppError("No Income  found", 400);
  }
  //delete when it exist
  const deletedIncome: IIncome | null = await Income.findByIdAndDelete(incomeId).select("name serialNo");
  //handle response
  if (deletedIncome) {
    return {
      success: true,
      message: "Successfully delete Income. ",
    };
  } else {
    return {
      success: false,
      message: "Failed to delete Income ",
    };
  }
};

export default {
  createIncome,
  getAllIncome,
  getSingleIncome,
  updateIncome,
  deleteIncome,
};
