import { asyncHandler } from "../middlewares/error.js";
import { SnnipetsModel } from "../models/snnipets.js";

export class SnnipetsController{
    static create = asyncHandler(async (req,res) => {
        const {title , language, code, tags} = req.body;
        const user = req.user._id;
        const snnipet = new SnnipetsModel({
            user,
            title,
            language,
            code,
            tags
        })

        await snnipet.save()
        res.status(201).json(snnipet)
    })

    static getAll = asyncHandler(async (req,res) => {
        const snnipets = await SnnipetsModel.find({user: req.user._id}).populate('user', 'name mail');
        res.status(200).json(snnipets)
    })

    static update = asyncHandler(async (req,res) => {
        const {id} = req.params;
        const {title , language, code, tags} = req.body;
        const user = req.user._id;

        const snnipet = await SnnipetsModel.findById(id);
        if(!snnipet){
            return res.status(404).json({
                message: 'Snnipet no encontrado'
            })
        }
        if(snnipet.user.toString() !== user.toString()){
            return res.status(403).json({
                message: 'No autorizado para actualizar este snnipet'
            })
        }
        const up = await SnnipetsModel.findByIdAndUpdate(id, {title, language, code, tags}, {new: true})
        res.status(200).json(up)
    })

    static delete = asyncHandler(async (req,res) => {
        const {id} = req.params;
        const user = req.user._id;
        const snnipet = await SnnipetsModel.findById(id);
        if(!snnipet){
            return res.status(404).json({
                message: 'Snnipet no encontrado'
            })
        }
        if(snnipet.user.toString() !== user.toString()){
            return res.status(403).json({
                message: 'No autorizado para eliminar este snnipet'
            })
        }
        const snnipetDeleted = await SnnipetsModel.findByIdAndDelete(id);
        if(!snnipetDeleted){
            return res.status(404).json({
                message: 'Snnipet no encontrado'
            })
        }
        res.status(200).json({
            message: 'Snnipet eliminado correctamente'
        })
    })

}