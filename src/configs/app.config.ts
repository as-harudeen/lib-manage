import { registerAs } from "@nestjs/config";

const appConfig = registerAs("app", () => {
  const port = parseInt(process.env.PORT, 10) || 3000;

  return {
    port,
  };
});

export default appConfig;
