import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: {type: String, unique: true}
})

export const UserModel = mongoose.model("user", UserSchema)