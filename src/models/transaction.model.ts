import { Schema, Document, model, Types } from "mongoose";

export interface ITransaction extends Document {
    accountid: Types.ObjectId;
    type: "credit" | "debit";
    amount: number;
    description: string;
    createdat: Date;
}

const transactionschema = new Schema<ITransaction>(
    {
        accountid: {
            type: Schema.Types.ObjectId,
            ref: "Account",
            required: [true, "Account ID chahiye"],
        },
        type: {
            type: String,
            enum: ["credit", "debit"],
            required: [true, "Transaction type chahiye"],
        },
        amount: {
            type: Number,
            required: [true, "Amount chahiye"],
        },
        description: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export const transactionmodel = model<ITransaction>("Transaction", transactionschema);
