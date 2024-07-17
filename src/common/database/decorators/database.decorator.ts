import { InjectModel } from "@nestjs/mongoose";
import { DB_CONNECTION_NAME } from "../constants/database.constant";

export const DatabaseModel = (model: string, connectionName?: string) => {
  return InjectModel(model, connectionName ?? DB_CONNECTION_NAME);
};
