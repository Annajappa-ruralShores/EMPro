import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
    Fullname: string,
    Email: string,
    Password: string,
    isAdmin: boolean,
    image: string,
    isVerified: boolean,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    createdAt?: Date,
    updatedAt?: Date
}

const userSchema = new mongoose.Schema<IUser>({
    Fullname: {
        type: String,
        required: [true, "Please Provide Fullname"],
    },
    Email: {
        type: String,
        required: [true, "Please Provide Email"],
    },
    Password: {
        type: String,
        required: [true, "Please Provide Password"],
    },
    image: {
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date

}, {
    timestamps: true
})

const UserModel = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;