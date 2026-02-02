import express, { Request, Response } from "express";
import { TodoService } from "../services/todo.service";

export class TodoController {
  todoService = new TodoService();
  app = express();

  getAllTaskRoute = async (req: Request, res: Response) => {
    const task = await this.todoService.getTask();
    res.json(task); 
  };
}
