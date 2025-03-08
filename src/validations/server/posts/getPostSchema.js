import Joi from "joi";
import { postSlugValidation } from "@/validations/validations";

const getPostSchema = Joi.object({
  slug: postSlugValidation(),
});

export default getPostSchema;
