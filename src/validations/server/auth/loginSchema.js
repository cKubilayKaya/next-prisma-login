import Joi from "joi";
import { emailValidation, passwordValidation } from "@/validations/validations";

const loginSchema = Joi.object({
  email: emailValidation(),
  password: passwordValidation(),
});

export default loginSchema;
