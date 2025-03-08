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

export const postTitleValidation = () => {
  return Joi.string().min(3).max(100).required().messages({
    "string.min": "Başlık en az 3 karakter olmalıdır.",
    "string.max": "Başlık en fazla 100 karakter olmalıdır.",
    "any.required": "Başlık gereklidir.",
    "string.empty": "Başlık boş olamaz.",
  });
};

export const postContentValidation = () => {
  return Joi.string().min(10).required().messages({
    "string.min": "İçerik en az 10 karakter olmalıdır.",
    "any.required": "İçerik gereklidir.",
    "string.empty": "İçerik boş olamaz.",
  });
};

export const postIdValidation = () => {
  return Joi.string().uuid().required().messages({
    "string.uuid": "Geçersiz ID formatı. Lütfen geçerli bir UUID kullanın.",
    "any.required": "ID gereklidir.",
    "string.empty": "ID boş olamaz.",
  });
};

export const postSlugValidation = () => {
  return Joi.string()
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .min(3)
    .max(100)
    .messages({
      "string.pattern.base": "Slug sadece küçük harfler, rakamlar ve tire (-) içerebilir.",
      "string.min": "Slug en az 3 karakter olmalıdır.",
      "string.max": "Slug en fazla 100 karakter olmalıdır.",
      "string.empty": "Slug boş olamaz.",
    });
};
