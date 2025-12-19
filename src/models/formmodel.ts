import mongoose, { Document } from "mongoose";

export interface IForm extends Document {
    userId: mongoose.Types.ObjectId;
    orgName: string;
    orgType: string;
    regNumber: string;
    foundedDate: string;
    branch: string;
    country: string;
    state: string;
    contactName: string;
    contactNumber: string;
    email: string;
    status: string;
    services: string[];
    address: string;
    description: string;
    fileName?: string;
    createdAt: Date;
    updatedAt: Date;
}

const formSchema = new mongoose.Schema<IForm>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orgName: {
        type: String,
        required: [true, "Organization Name is required"]
    },
    orgType: {
        type: String,
        required: [true, "Organization Type is required"]
    },
    regNumber: {
        type: String,
        required: [true, "Registration Number is required"]
    },
    foundedDate: {
        type: String,
        required: [true, "Founded Date is required"]
    },
    branch: {
        type: String,
        required: [true, "Branch is required"]
    },
    country: {
        type: String,
        required: [true, "Country is required"]
    },
    state: {
        type: String,
        required: [true, "State is required"]
    },
    contactName: {
        type: String,
        required: [true, "Contact Name is required"]
    },
    contactNumber: {
        type: String,
        required: [true, "Contact Number is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    status: {
        type: String,
        default: "pending"
    },
    services: {
        type: [String],
        default: []
    },
    address: {
        type: String,
        required: [true, "Address is required"]
    },
    description: {
        type: String,
        default: ""
    },
    fileName: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const FormModel = mongoose.models.Form || mongoose.model<IForm>("Form", formSchema);

export default FormModel;