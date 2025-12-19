import mongoose, { Document } from 'mongoose';

export interface IHelpRequest extends Document {
    username: string;
    email: string;
    subject: string;
    message: string;
    status: 'pending' | 'resolved';
    createdAt: Date;
    updatedAt: Date;
}

const helpSchema = new mongoose.Schema<IHelpRequest>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'resolved'],
        default: 'pending'
    }
}, {
    timestamps: true
})

const HelpModel = mongoose.models.HelpRequest || mongoose.model<IHelpRequest>("HelpRequest", helpSchema);

export default HelpModel;
