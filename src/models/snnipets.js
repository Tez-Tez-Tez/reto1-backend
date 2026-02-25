import { Schema, model} from "mongoose";

const snnipetSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    title:{
        type: String,
        required: true
    },
    language: String,
    code: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
})

export const SnnipetsModel = model("snnipets", snnipetSchema);
