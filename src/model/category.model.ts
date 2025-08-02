import mongoose, { Schema, Model } from 'mongoose';
import { ICategory } from '../interfaces/category.interface';
//create schema
const categorySchema = new Schema<ICategory>(
  {
    serialNo: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      retquired: true,
      unique: true,
      trim: true,
    },
    isIncome: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//index
categorySchema.index({});

//create model
const Category: Model<ICategory> = mongoose.model<ICategory>('Category', categorySchema);
export default Category;
