import { registerAs } from "@nestjs/config";

const swaggerConfig = registerAs("swagger", () => {
  const description = process.env.SWAGGER_DESCRIPTION;
  const version = process.env.SWAGGER_VERSION;
  const prefix = process.env.SWAGGER_PREFIX;
  return {
    description,
    version,
    prefix,
  };
});

export default swaggerConfig;
