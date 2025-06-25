import mongoose, { Mongoose, Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true,"Please provide a Username"],
        unique: true,
    },

    password:{
        type: String,
        required: [true,"Please provide a Password"],
    },

    email:{
        type: String,
        required: [true,"Please provide a Email"],
        unique: true,
    },

    isVerified:{
        type: Boolean,
        default: false,
    },

    isAdmin:{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.User || mongoose.model("User",userSchema) // Create a model if it doesn't exists

export default User;