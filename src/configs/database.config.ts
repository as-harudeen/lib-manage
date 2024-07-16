import { registerAs } from "@nestjs/config";

const databaseConfig = registerAs("database", () => {
  const uri = process.env.DB_URI || "mongodb://localhost:27017";
  const dbName = process.env.DB_NAME || "lib-manage";

  return {
    uri,
    dbName,
  };
});

export default databaseConfig;
