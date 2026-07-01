import logger from "./logger.js";

const requiredEnvVars = [
  "PORT",
  "MONGODB_URI",
  "FIREBASE_PROJECT_ID",
];

export const validateEnv = () => {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    logger.error(`❌ Missing required environment variables: ${missing.join(", ")}`);
    process.exit(1);
  }

  logger.info("✅ Environment variables validated");
};
