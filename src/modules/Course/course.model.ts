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
      type: String,
    },
    image: String,
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "creator id is required"],
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    time: { type: String },
    price: {
      type: Number,
      required: [true, "A course must have a price"],
    },
    isSoftDeleted: {
      type: Boolean,
      select: false,
      default: false,
    },
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
