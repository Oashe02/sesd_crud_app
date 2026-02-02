import { TodoModel, TodoInterface } from "../schema/todo.schema";

export class TodoService {
  async getTask() {
    return await TodoModel.find();
  }
  async createTask() {
    return TodoModel.create();
  }
  async updateTask() {}
  async deleteTask() {}
}
