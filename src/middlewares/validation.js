import { validationResult } from "express-validator";

export function validation(req, res, next){
    const errors = validationResult(req);
    if(errors.isEmpty()) return next();

    const formattedErrors = errors
    .array()
    .map(err => ({
        [err.path]: err.msg
    }))
    
    return res.status(400).json({
        message: 'Error al validar',
        errors: formattedErrors
    })
} 