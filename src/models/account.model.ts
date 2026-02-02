import { Schema, Document, model, Types } from "mongoose";

export interface IAccount extends Document {
    customerid: Types.ObjectId;
    accountnumber: string;
    accounttype: "savings" | "current";
    balance: number;
    createdat: Date;
    updatedat: Date;
}

const accountschema = new Schema<IAccount>(
    {
        customerid: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: [true, "Customer ki ID chahiye"],
        },
        accountnumber: {
            type: String,
            required: [true, "Account number chahiye"],
            unique: true,
        },
        accounttype: {
            type: String,
            enum: ["savings", "current"],
            required: [true, "Account type chahiye"],
        },
        balance: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const accountmodel = model<IAccount>("Account", accountschema);
