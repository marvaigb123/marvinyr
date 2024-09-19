import { NewCourse } from "./course.interface";

const Joi = require("joi");

const newCourseBody: Record<keyof NewCourse, any> = {
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string(),
  image: Joi.alternatives()
    .try(Joi.string(), Joi.binary().encoding("base64"))
    .optional(),
  rating: Joi.number().required(),
  time: Joi.string().optional(),
  price: Joi.number().required(),
};

export const createNewCourse = {
  body: Joi.object().keys(newCourseBody),
};
