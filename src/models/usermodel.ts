import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
    Fullname: string,
    Email: string,
    Password: string,
    image: string,
    createdAt?: Date,
    updatedAt?: Date
}

const userSchema = new mongoose.Schema<IUser>({
    Fullname: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }

}, {
    timestamps: true
})

const UserModel = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;