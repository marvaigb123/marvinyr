import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import mongoose from "mongoose";

import { catchAsync, pick } from "../utils";
import ApiError from "../errors/ApiError";

import Course from "./course.model";

import * as courseService from "./course.service";
import { IOptions } from "../paginate/paginate";

export const createNewCourse = catchAsync(
  async (req: Request | any, res: Response) => {
    const {
      category,
      title,
      description,
      availableLocation,
      price,
      time,
      rating,
    } = req.body;

    const course = {
      category,
      title,
      price,
      description,
      time,
      rating,
      availableLocation,
      creatorId: req.user.id,
      image: req.file ? req.file.path : (req.body.image ?? ""),
    };

    const newCourse = await Course.create(course);

    res.status(httpStatus.OK).json({
      status: "success",
      data: newCourse,
    });
  }
);

export const getAllCourse = catchAsync(async (req: Request, res: Response) => {
  const options: IOptions = pick(req.query, [
    "sortBy",
    "limit",
    "page",
    "projectBy",
  ]);
  const result = await courseService.queryDocs({}, options);

  res.status(httpStatus.OK).json({
    status: "success",
    data: result,
  });
});

export const updateCourse = catchAsync(
  async (req: Request | any, res: Response, next: NextFunction) => {
    const image = req.file && req.file.path;
    if (typeof req.params.id === "string") {
      const course = await courseService.updateCourseById(
        new mongoose.Types.ObjectId(req.params.id),
        req.body,
        image
      );

      res.status(httpStatus.OK).json({
        status: "success",
        data: course,
      });
    } else {
      return next(new ApiError(httpStatus.NOT_FOUND, "id is required"));
    }
  }
);

export const SoftDeleteCourseById = catchAsync(
  async (req: Request | any, res: Response, next: NextFunction) => {
    if (typeof req.params.id === "string") {
      await courseService.SoftDeleteById(
        new mongoose.Types.ObjectId(req.params.id)
      );

      res.status(httpStatus.NO_CONTENT).json({
        status: "success",
      });
    } else {
      return next(new ApiError(httpStatus.NOT_FOUND, "id is required"));
    }
  }
);

export const getCourseById = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params.id === "string") {
    const course = await courseService.getCourseById(
      new mongoose.Types.ObjectId(req.params.id)
    );

    res.status(httpStatus.OK).json({
      status: "success",
      data: course,
    });
  }
});

export const getUsersCourse = catchAsync(
  async (req: Request | any, res: Response) => {
    const userCourse = (await courseService.getCourseCreatedId(
      req.user.id
    )) as any;

    res.status(httpStatus.OK).json({
      status: "success",
      length: userCourse?.length,
      data: userCourse,
    });
  }
);

export const searchCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { search } = pick(req.query, ["search"]);
    const { id } = req.params;

    const types = ["title"];

    if (!types.includes(search)) {
      return next(
        new ApiError(httpStatus.NOT_ACCEPTABLE, "query type is not allowed")
      );
    }

    const data = await Course.find({ title: id });

    res.status(httpStatus.OK).json({
      status: "success",
      data,
    });
  }
);
