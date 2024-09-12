import express, { Router } from "express";
import { courseController } from "../../modules/Course";
// import { validate } from "../../modules/validate";
import { auth } from "../../modules/Auth";

const router: Router = express.Router();

router
  .route("/")
  .post(
    // validate(courseValidation.createNewcourse),
    auth.protect,
    auth.checkRoles("CREATE_COURSE"),
    courseController.createNewCourse
  )
  .get(courseController.getAllCourse);

router.route("/user").get(auth.protect, courseController.getUsersCourse);

router
  .route("/:id")
  .patch(
    auth.protect,
    auth.checkRoles("UPDATE_COURSE"),
    courseController.updateCourse
  )
  .get(courseController.getCourseById);

router.route("/search/:id").get(courseController.searchCourse);

export default router;