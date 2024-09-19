import express, { Router } from "express";
import { cartController } from "../../modules/Cart";
import { auth } from "../../modules/Auth";

const router: Router = express.Router();

router
  .route("/")
  .post(auth.protect, cartController.AddToCart)
  .get(
    auth.protect,
    auth.checkRoles("GET_ALL_ITEMS_CART"),
    cartController.getAllItemsInCart
  );
router.route("/user").get(auth.protect, cartController.getCoursesInCart);
router
  .route("/:id")
  .delete(auth.protect, cartController.SoftDeleteCartById)
  .get(cartController.getCoursesInCartById);

router.route("/admin/:id").delete(auth.protect, auth.checkRoles("DELETE_ITEM_CART_HARD"), cartController.RemoveFromCart);

export default router;
