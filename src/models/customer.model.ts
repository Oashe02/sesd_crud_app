import { Schema, Document, model } from "mongoose";

export interface ICustomer extends Document {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  dateofbirth: Date;
  createdat: Date;
  updatedat: Date;
}

const customerschema = new Schema<ICustomer>(
  {
    firstname: {
      type: String,
      required: [true, "First name chahiye"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Last name chahiye"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email chahiye"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number chahiye"],
    },
    dateofbirth: {
      type: Date,
      required: [true, "Date of birth chahiye"],
    },
  },
  {
    timestamps: true,
  }
);

export const customermodel = model<ICustomer>("Customer", customerschema);
