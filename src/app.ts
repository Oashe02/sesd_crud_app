import express from "express";
import mongoose from "mongoose";
interface App_Interface {
  startServer(): void;
  connectDatabase(): void;
  initializeRoutes(): void;
}

export default class App implements App_Interface {
  Port: number | string;
  app: express.Application;
  url: string;
  constructor() {
    this.Port = 8000;
    this.app = express();
    this.url = "";
    this.startServer();
    this.connectDatabase();
    this.initializeRoutes();
  }

  startServer(): void {
    this.app.listen(this.Port, () => {
      console.log(`server is on http://localhost:${this.Port}`);
    });
  }

  async connectDatabase(): Promise<void> {
    try {
      await mongoose.connect("");
    } catch (error) {
      console.log("Database connection failed", error);
    }
  }

  initializeRoutes(): void {
    this.app.use(express.json());
  }
}
