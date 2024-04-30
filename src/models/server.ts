import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { WebhookRouter } from "../routes";

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

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors());
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
