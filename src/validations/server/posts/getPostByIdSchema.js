import Joi from "joi";
import { emailValidation } from "@/validations/validations";

const getPostByIdSchema = Joi.object({
  email: emailValidation(),
});

export default getPostByIdSchema;
