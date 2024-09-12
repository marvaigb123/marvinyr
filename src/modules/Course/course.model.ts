import mongoose, { Schema, Query } from "mongoose";

import toJSON from "../toJSON/toJSON";
import paginate from "../paginate/paginate";
import { ICourseDoc, ICourseModel } from "./course.interface";

const courseSchema = new mongoose.Schema<ICourseDoc, ICourseModel>(
  {
    category: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    availableLocation: {
      type: String
    },
    image: String,
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "creator id is required"],
    },
    isSoftDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

courseSchema.pre(/^find/, function (this: Query<any, any>, next) {
  const query = this.getQuery();
  query.isSoftDeleted = { $ne: true };
  next();
});

courseSchema.pre<ICourseDoc>(/^find/, function (next) {
  this.populate({
    path: "creatorId",
  });
  next();
});

// add plugin that converts mongoose to json
courseSchema.plugin(toJSON);
courseSchema.plugin(paginate as any);

const Course = mongoose.model<ICourseDoc, ICourseModel>("Course", courseSchema);
export default Course;
