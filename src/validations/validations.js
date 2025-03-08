import Joi from "joi";

export const fullNameValidation = () => {
  return Joi.string().optional().messages({
    "string.empty": "Ad Soyad boş olamaz.",
    "any.required": "Ad Soyad boş olamaz.",
  });
};

export const emailValidation = () => {
  return Joi.string().email().required().messages({
    "string.email": "Geçersiz e-posta formatı.",
    "string.empty": "E-posta boş olamaz.",
    "any.required": "E-posta boş olamaz.",
  });
};

export const userNameValidation = () => {
  return Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z0-9_.]+$/)
    .required()
    .messages({
      "string.min": "Kullanıcı adı en az 3 karakter olmalıdır.",
      "string.max": "Kullanıcı adı en fazla 30 karakter olmalıdır.",
      "string.pattern.base": "Kullanıcı adı sadece harf, rakam, alt çizgi (_) ve nokta (.) içerebilir.",
      "any.required": "Kullanıcı adı gereklidir.",
      "string.empty": "Kullanıcı adı boş olamaz.",
    });
};

export const passwordValidation = () => {
  return Joi.string().min(8).pattern(/[A-Z]/, "uppercase").pattern(/[a-z]/, "lowercase").pattern(/\d/, "number").required().messages({
    "string.min": "Şifre en az 8 karakter olmalıdır.",
    "string.pattern.uppercase": "Şifre en az bir büyük harf içermelidir.",
    "string.pattern.lowercase": "Şifre en az bir küçük harf içermelidir.",
    "string.pattern.number": "Şifre en az bir rakam içermelidir.",
    "any.required": "Şifre gereklidir.",
    "string.empty": "Şifre boş olamaz.",
  });
};
