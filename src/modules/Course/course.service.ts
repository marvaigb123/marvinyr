import httpStatus from "http-status";
import mongoose from "mongoose";

import { ICourseDoc, UpdateCourseBody } from "./course.interface";
import Course from "./course.model";
import { ApiError } from "../errors";
import { IOptions, QueryResult } from "../paginate/paginate";

/**
 * Get document by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<ICourseDoc | null>}
 */
export const getCourseById = async (
  id: mongoose.Types.ObjectId
): Promise<ICourseDoc | null> => Course.findById(id);

/**
 * Update Course by id
 * @param {mongoose.Types.ObjectId} userId
 * @param {UpdateCourseBody} updateBody
 * @param {any} image
 * @returns {Promise<ICourseDoc | null>}
 */
export const updateCourseById = async (
  Id: mongoose.Types.ObjectId,
  updateCourse: UpdateCourseBody,
  image: any
): Promise<ICourseDoc | null> => {
  const course = await getCourseById(Id);

  const {
    category,
    title,
    description,
    availableLocation,
  } = updateCourse as any;

  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, "Course not found");
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    Id,
    {
      category,
      title,
      description,
      availableLocation,
      image,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedCourse;
};

/**
 * Query for courses
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryDocs = async (
  filter: Record<string, any>,
  options: IOptions
): Promise<QueryResult> => {
  const docs = await Course.paginate(filter, options);
  return docs;
};

/**
 * Get courses created by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<ICourseDoc | null>}
 */
export const getCourseCreatedId = async (
  id: mongoose.Types.ObjectId
): Promise<ICourseDoc | null> => {
  const docs = (await Course.find({ creatorId: id })) as any;
  return docs;
};