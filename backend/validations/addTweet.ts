import { body } from "express-validator";

export const addTweetValidations = [
  body("text", "Введите текст твита")
    .isString()
    .isLength({ min: 1, max: 280 })
    .withMessage("Допустимое количество символов от 1 до 280")
    .trim()
];
