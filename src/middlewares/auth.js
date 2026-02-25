import jwt from 'jsonwebtoken'
import { UsersModel } from '../models/users.js'

export function auth(){
    return async(req,res,next)=>{
        try{
            let token;

            if(req.headers['authorization'] && req.headers.authorization.startsWith('Bearer ')){
                token = req.headers['authorization'].split(' ')[1]
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await UsersModel.findById(decoded.id).select("-password");
                
                if(!req.user){
                    return res.status(401).json({
                        message: 'Usuario no encontrado'
                    })
                }
                
                return next();
            }

            return res.status(401).json({
                message: 'Token expirado o sin sesión'
            })
        }catch(err){
            return res.status(401).json({
                message: 'Token inválido o expirado',
                error: err.message
            })
        }
    }
}