import { UsersController } from "../controllers/users.js";
import { Router } from "express";
import { body } from "express-validator";
import { validation } from "../middlewares/validation.js";

export const routerUsers = Router();

const rulesCreate = [
    body("name")
        .optional({ values: 'falsy' })
        .trim()
        .isLength({ min: 3 })
        .withMessage("Debe ser un nombre con mínimo 3 carácteres"),
    body("mail")
        .notEmpty()
        .withMessage("Correo es obligatorio")
        .isEmail()
        .normalizeEmail()
        .withMessage("Envia un correo en formato válido"),
    body("password")
        .notEmpty()
        .withMessage("Contraseña es obligatoria")
        .trim()
        .isLength({ min: 6 })
        .withMessage("La contraseña debe ser de mínimo 6 carácteres")
]

const rulesLogin = [
    body("mail")
        .notEmpty()
        .withMessage("Correo es obligatorio")
        .isEmail()
        .normalizeEmail()
        .withMessage("Envia un correo en formato válido"),
    body("password")
        .notEmpty()
        .withMessage("Contraseña es obligatoria")
        .trim()
        .isLength({ min: 6 })
        .withMessage("La contraseña debe ser de mínimo 6 carácteres")
]

routerUsers.post('/', rulesCreate, validation, UsersController.create)
routerUsers.post('/login',rulesLogin, validation, UsersController.login)