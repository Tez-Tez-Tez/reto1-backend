import { asyncHandler } from "../middlewares/error.js";
import { UsersModel } from "../models/users.js";
import jwt from 'jsonwebtoken'

export class UsersController{
    static create= asyncHandler(async(req,res)=>{
            const {name, mail, password} = req.body;

            const user = await UsersModel.findOne({mail});
            if(user){
                throw new Error('El correo esta en uso')
            }
            const newUser = new UsersModel({
                name,
                mail,
                password
            })
            await newUser.save();
            res.status(201).json({user:{
                name: newUser.name,
                mail: newUser.mail,
            }})
    })

    static  login = asyncHandler(async (req,res)=>{
            const {mail,password} = req.body;
            const log = await UsersModel.findOne({mail});
            if(log && (await log.matchPassword(password))){
                const token = jwt.sign({id:log._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
                res.status(200).json({
                    name: log.name,
                    mail: log.mail,
                    token
                })
            }else{
                res.status(401);
                throw new Error('Contraseña o correo incorrectos')
            }
        })
}