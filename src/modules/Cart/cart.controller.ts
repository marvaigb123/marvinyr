import { Request, Response } from "express";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { catchAsync } from "../utils";
import Cart from "./cart.model";
import * as cartService from "./cart.service";

export const AddToCart = catchAsync(
  async (req: Request | any, res: Response) => {
    const newCart = await Cart.create({
      userId: req.user.id,
      course: req.body.tool,
      quantity: req.body.quantity,
    });

    res.status(httpStatus.OK).json({
      status: "success",
      data: newCart,
    });
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
