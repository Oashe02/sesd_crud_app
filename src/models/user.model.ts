import { Schema, Document, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdat: Date;
    comparePassword(password: string): Promise<boolean>;
}

const userschema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, "Username chahiye"],
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email chahiye"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password chahiye"],
            minlength: 6,
        },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
userschema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare password method
userschema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

export const usermodel = model<IUser>("User", userschema);
