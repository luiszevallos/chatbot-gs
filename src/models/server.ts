import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { WebhookRouter } from "../routes";
import sequelize from "../db/connection";

class Server {
  private app: Application;
  private port: string;
  private paths: {
    webhook: string;
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "4000";
    this.paths = {
      webhook: "/api/webhook",
    };

    this.connectDB();

    this.middlewares();

    this.routes();
  }

  async connectDB() {
    try {
      await sequelize.authenticate();
      console.log("Conectado auth");
      await sequelize.sync();
      console.log("Conectado Sync");
    } catch (error) {
      throw new Error("Error al sincronizar la base de datos");
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.webhook, WebhookRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

export default Server;
