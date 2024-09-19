import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { catchAsync, pick } from "../utils";
import Cart from "./cart.model";
import * as cartService from "./cart.service";
import { IOptions } from "../paginate/paginate";
import { ApiError } from "../errors";

export const AddToCart = catchAsync(
  async (req: Request | any, res: Response) => {
    const newCart = await Cart.create({
      userId: req.user.id,
      course: req.body.course,
      quantity: req.body.quantity,
    });

    res.status(httpStatus.OK).json({
      status: "success",
      data: newCart,
    });
  }
);

export const getAllItemsInCart = catchAsync(async (req: Request, res: Response) => {
  const options: IOptions = pick(req.query, [
    "sortBy",
    "limit",
    "page",
    "projectBy",
  ]);
  const result = await cartService.queryDocs({}, options);

  res.status(httpStatus.OK).json({
    status: "success",
    data: result,
  });
});

export const SoftDeleteCartById = catchAsync(
  async (req: Request | any, res: Response, next: NextFunction) => {
    if (typeof req.params.id === "string") {
      await cartService.SoftDeleteById(
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

export const RemoveFromCart = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params.id === "string") {
    await cartService.deleteCartById(
      new mongoose.Types.ObjectId(req.params.id)
    );
    res.status(httpStatus.NO_CONTENT).send();
  }
});

export const getCoursesInCart = catchAsync(
  async (req: Request | any, res: Response) => {
    const userCourses = (await cartService.getItemInCart(req.user.id)) as any;

    res.status(httpStatus.OK).json({
      status: "success",
      length: userCourses?.length,
      data: userCourses,
    });
  }
);

export const getCoursesInCartById = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params.id === "string") {
      const doc = await cartService.getCartById(
        new mongoose.Types.ObjectId(req.params.id)
      );
      res.status(httpStatus.OK).json({
        status: "success",
        data: doc,
      });
    }
  }
);
