import Joi from "joi";

const userSchema = Joi.object({
  fullName: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    "string.email": "Geçersiz e-posta formatı.",
    "any.required": "E-posta gereklidir.",
    "string.empty": "E-posta boş olamaz.",
  }),
  password: Joi.string().min(8).pattern(/[A-Z]/, "uppercase").pattern(/[a-z]/, "lowercase").pattern(/\d/, "number").required().messages({
    "string.min": "Şifre en az 8 karakter olmalı.",
    "string.pattern.base": "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir.",
    "any.required": "Şifre gereklidir.",
    "string.empty": "Şifre boş olamaz.",
  }),
});

export default userSchema;
