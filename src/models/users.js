import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    name: String,
    mail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})
userSchema.pre("save",async function (next){
    if(!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}
export const UsersModel = model("users", userSchema)