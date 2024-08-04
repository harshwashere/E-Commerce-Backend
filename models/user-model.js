import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userModel = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userModel.methods.generateToken = async function() {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        )
    } catch (error) {
        console.log("This error is from /models/user-model.js    ", error);
    }
}

export const User = new mongoose.model('User', userModel)