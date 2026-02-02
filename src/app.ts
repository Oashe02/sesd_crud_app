import express from "express";
import mongoose from "mongoose";
import routes from "./routes";

interface IApp {
  startServer(): void;
  connectDatabase(): Promise<void>;
  initializeMiddleware(): void;
  initializeRoutes(): void;
}

export default class App implements IApp {
  private port: number | string;
  private app: express.Application;
  private mongoUri: string;

  constructor() {
    this.port = process.env.PORT || 8000;
    this.mongoUri = process.env.MONGO_URI || "";

    if (!this.mongoUri) {
      throw new Error("MONGO_URI env nahi diya");
    }
    this.app = express();

    this.initializeMiddleware();
    this.initializeRoutes();
    this.connectDatabase();
    this.startServer();
  }

  initializeMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  initializeRoutes(): void {
    this.app.use("/api", routes);
  }

  async connectDatabase(): Promise<void> {
    try {
      await mongoose.connect(this.mongoUri);
      console.log("Database connected");
    } catch (error) {
      console.error("Database connection failed:", error);
      process.exit(1);
    }
  }

  startServer(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}`);
    });
  }
}
