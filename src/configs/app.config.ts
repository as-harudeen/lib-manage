import { registerAs } from "@nestjs/config";

const appConfig = registerAs("app", () => {
  const port = parseInt(process.env.PORT, 10) || 3000;
  const appName = process.env.APP_NAME || "lib-manage";

  return {
    port,
    appName,
  };
});

export default appConfig;
