import {
  ICreateCategory,
  ICreateCategoryResponse,
  IDeleteCategoryResponse,
  IGetCategoryResponse,
  ICategory,
  IUpdateCategory,
  IUpdateCategoryResponse,
} from '../interfaces/category.interface';
import Category from '../model/category.model';
import { AppError } from '../utils/AppError';

// category create service
const createCategory = async (data: ICreateCategory): Promise<ICreateCategoryResponse> => {
  const { title, isIncome } = data;
  if (!title) throw new AppError('Please provide a  category title', 400);
  //create serial no based on last  category serial no
  //if no  category then serial start from 1000
  let serialNo: number = 1000;
  const lastCategoryInfo: ICategory | null = await Category.findOne().sort({
    create: -1,
  });
  if (lastCategoryInfo) {
    serialNo = lastCategoryInfo.serialNo + 1;
  } else {
    serialNo += 1;
  }
  //create  category instance
  const categoryInfo = {
    title,
    serialNo,
    isIncome,
  };
  //save to database
  const category = new Category(categoryInfo);
  const savedCategory = await category.save();
  //handle response
  if (savedCategory) {
    const categoryData = await Category.findOne({ _id: savedCategory._id });
    return {
      success: true,
      message: 'Successfully create  category',
      category: categoryData,
    };
  } else {
    throw new AppError('Failed to create  category', 400);
  }
};

//all  category get service
const getAllCategory = async (): Promise<IGetCategoryResponse> => {
  const category: ICategory[] = await Category.find();
  if (category.length == 0) {
    return {
      message: 'No  category found.',
      category,
    };
  } else {
    return {
      message: '',
      category,
    };
  }
};
//single  category get service
const getSingleCategory = async (categoryId: string): Promise<IGetCategoryResponse> => {
  const category: ICategory | null = await Category.findOne({ _id: categoryId });
  if (category) {
    return {
      message: '',
      category,
    };
  } else {
    throw new AppError('No  category found.', 400);
  }
};

//get catgory by income or expense service
const getCategoryByIncomeExpense = async (isIncome: boolean): Promise<IGetCategoryResponse> => {
  const category: ICategory[] | null = await Category.find({ isIncome: isIncome });
  if (category.length == 0) {
    return {
      message: 'No  category found.',
      category,
    };
  } else {
    return {
      message: '',
      category,
    };
  }
};

// category update service
const updateCategory = async (categoryId: string, data: IUpdateCategory): Promise<IUpdateCategoryResponse> => {
  // get  category that need to update
  const category: ICategory | null = await Category.findOne({ _id: categoryId });
  //throw error if not exist
  if (!category) {
    throw new AppError('No  category found', 400);
  }
  //update when it exist
  const option = { new: true, runValidator: true };
  const updatedCategory: ICategory | null = await Category.findByIdAndUpdate(categoryId, { $set: data }, option).select('name serialNo');
  if (updatedCategory) {
    return {
      success: true,
      message: 'Successfully update  category',
      category: updatedCategory,
    };
  } else {
    return {
      success: false,
      message: 'Failed to update  category',
      category: updatedCategory,
    };
  }
};
// category delete service
const deleteCategory = async (categoryId: string): Promise<IDeleteCategoryResponse> => {
  // get  category that needs to delete
  const category: ICategory | null = await Category.findOne({ _id: categoryId });
  //throw error if not exist
  if (!category) {
    throw new AppError('No  category found', 400);
  }
  //delete when it exist
  const deletedCategory: ICategory | null = await Category.findByIdAndDelete(categoryId).select('name serialNo');
  //handle response
  if (deletedCategory) {
    return {
      success: true,
      message: 'Successfully delete  category',
    };
  } else {
    return {
      success: false,
      message: 'Failed to delete  category',
    };
  }
};

export default {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  getCategoryByIncomeExpense,
};
