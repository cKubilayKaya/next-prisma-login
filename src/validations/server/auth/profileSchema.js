import Joi from "joi";
import { emailValidation, fullNameValidation, passwordValidation, userNameValidation } from "@/validations/validations";

const profileSchema = Joi.object({
  fullName: fullNameValidation(),
  email: emailValidation(),
  userName: userNameValidation(),
});

export default profileSchema;
