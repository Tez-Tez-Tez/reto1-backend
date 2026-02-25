import { Router } from "express";
import { SnnipetsController } from "../controllers/snnipets.js";
import { auth } from "../middlewares/auth.js";
import { validation } from "../middlewares/validation.js";
import { body } from "express-validator";

export const routerSnnipets = Router();

const rulesCreate = [
    body("title")
        .notEmpty()
        .withMessage('Titulo es obligatorio')
        .trim()
        .isLength({min:3})
        .withMessage('Titulo debe tener al menos 3 carácteres'),
    body("code")
        .notEmpty()
        .withMessage('El fragmento de código es obligatorio'),
    body("language")
        .optional({values: 'falsy'})
        .trim()
        .isLength({min:2})
        .withMessage('Mínimo 2 carácteres para especificar el lenguaje'),
    body("tags")
        .optional({values:'falsy'})
        .trim()
]

const rulesUpdate = [
    body("title")
        .optional({ values: 'falsy' })
        .trim()
        .isLength({ min: 3 })
        .withMessage('Titulo debe tener al menos 3 carácteres'),
    body("code")
        .optional({ values: 'falsy' }),
    body("language")
        .optional({ values: 'falsy' })
        .trim()
        .isLength({ min: 2 })
        .withMessage('Mínimo 2 carácteres para especificar el lenguaje'),
    body("tags")
        .optional({ values: 'falsy' })
        .trim()
]

routerSnnipets.post('/', auth(), rulesCreate, validation, SnnipetsController.create)
routerSnnipets.put('/:id', auth(), rulesUpdate, validation, SnnipetsController.update)
routerSnnipets.get('/', auth(), SnnipetsController.getAll)
routerSnnipets.delete('/:id', auth(), SnnipetsController.delete)