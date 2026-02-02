import { Schema, Document, model } from "mongoose";

export interface TodoInterface extends Document {
  title: String;
}

const TodoSchema = new Schema({ title: String });

export const TodoModel = model("task", TodoSchema);
