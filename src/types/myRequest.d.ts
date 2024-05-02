import { IMessage } from "./webhook";
import "express";

declare module "express" {
  export interface Request {
    message?: IMessage;
  }
}
