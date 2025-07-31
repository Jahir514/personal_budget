import { Document, ObjectId } from 'mongoose';
//-----------------------------------------
//---------Model Related Interfaces--------
//-----------------------------------------
//full model interface
export interface ICategory extends Document {
  serialNo: number;
  title: string;
  groupType: string;
  group: ObjectId;
  createdAt?: Date;
  updateAt?: Date;
}

//-----------------------------------------
//---------CRUD Realated Interfaces--------
//-----------------------------------------
// category create interface
export interface ICreateCategory {
  serialNo: number;
  title: string;
  groupType: string;
  group: ObjectId;
}
// category update interface
export interface IUpdateCategory {
  serialNo?: number;
  title?: string;
  groupType?: string;
  group?: ObjectId;
}
//-----------------------------------------
//---------Response Realated Interfaces--------
//-----------------------------------------
// category create response interface
export interface ICreateCategoryResponse {
  success: boolean;
  message: string;
  category: null | ICategory;
}
// category get response interface
export interface IGetCategoryResponse {
  message: string;
  category: null | ICategory | ICategory[];
}
// category update response interface
export interface IUpdateCategoryResponse extends ICreateCategoryResponse {}
// category delete response interface
export interface IDeleteCategoryResponse {
  success: boolean;
  message: string;
}
