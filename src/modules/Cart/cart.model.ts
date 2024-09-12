import mongoose, { Schema } from "mongoose";

import toJSON from "../toJSON/toJSON";
import paginate from "../paginate/paginate";
import { ICartDoc, ICartModel } from "./cart.interface";

const cartSchema = new mongoose.Schema<ICartDoc, ICartModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "creator id is required"],
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "creator id is required"],
    },
    quantity: {
      type: Number,
    },
    isSoftDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.pre<ICartDoc>(/^find/, function (next) {
  this.populate({
    path: "userId course",
  });
  next();
});

// add plugin that converts mongoose to json
cartSchema.plugin(toJSON);
cartSchema.plugin(paginate as any);

const Cart = mongoose.model<ICartDoc, ICartModel>("Cart", cartSchema);
export default Cart;
