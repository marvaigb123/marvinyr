import { Model, Document, Types } from "mongoose";
import { QueryResult } from "../paginate/paginate";

export interface ICourse {
  creatorId: string | Types.ObjectId;
  category: string;
  title: string;
  description: string;
  availableLocation: string; /// authors can just to restrict their content based on locations
  image?: Blob | string;
}

export type UpdateCourseBody = Partial<ICourse>;

type MakeRequiredExcept<T, K extends keyof T> = {
  [P in keyof T as P extends K ? P : Required<P>]: T[P];
};

export type NewCourseExcept = MakeRequiredExcept<ICourse, "image" | "category">;

export type NewCourse = Omit<NewCourseExcept, "availableLocation">;

export interface ICourseDoc extends ICourse, Document {
  _id: string;
}

export interface ICourseModel extends Model<ICourseDoc> {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}
