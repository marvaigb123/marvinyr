import mongoose, { Schema } from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

courseSchema.pre<ICourseDoc>(/^find/, function (next) {
  this.populate({
    path: "creatorId",
  });
  next();
});

// add plugin that converts mongoose to json
courseSchema.plugin(toJSON);
courseSchema.plugin(paginate as any);

const Tool = mongoose.model<ICourseDoc, ICourseModel>("Course", courseSchema);
export default Tool;
