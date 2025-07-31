import mongoose, { Schema, Model } from 'mongoose';
import { IExpense } from '../interfaces/expense.interface';
//create schema
const expenseSchema = new Schema(
  {
    title: {
      type: String,
      retquired: true,
      unique: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

//index
expenseSchema.index({});

//create model
const Expense: Model<IExpense> = mongoose.model<IExpense>('Expense', expenseSchema);
export default Expense;
