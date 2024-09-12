import express, { Router } from "express";
import { cartController } from "../../modules/Cart";
import { auth } from "../../modules/Auth";

const router: Router = express.Router();

router.route("/").post(auth.protect, cartController.AddToCart);
router.route("/user").get(auth.protect, cartController.getCoursesInCart);
router
  .route("/:id")
  .delete(auth.protect, cartController.RemoveFromCart)
  .get(cartController.getCoursesInCartById);

export default router;
