import Joi from "joi";
import { postContentValidation, postSlugValidation, postTitleValidation } from "@/validations/validations";

const addPostSchema = Joi.object({
  slug: postSlugValidation(),
  title: postTitleValidation(),
  content: postContentValidation(),
});

export default addPostSchema;
