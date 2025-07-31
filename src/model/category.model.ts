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
    groupType: {
      type: String,
      required: true,
      enum: ['Income', 'Expense'],
    },
    group: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'groupType',
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
