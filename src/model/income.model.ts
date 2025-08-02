import mongoose, { Schema, Model } from 'mongoose';
import { IIncome } from '../interfaces/income.interface';
//create schema
const incomeSchema = new Schema<IIncome>(
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
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//index
incomeSchema.index({});

//create model
const Income: Model<IIncome> = mongoose.model<IIncome>('Income', incomeSchema);
export default Income;
