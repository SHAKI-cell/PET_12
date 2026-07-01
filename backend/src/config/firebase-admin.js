import admin from "firebase-admin";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import logger from "./logger.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const serviceAccountPath = join(
  __dirname,
  "../../config/serviceAccountKey.json"
);

let serviceAccount;
let auth = null;
let firestore = null;

try {
  if (existsSync(serviceAccountPath)) {
    serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));
    logger.info("✅ Firebase Admin: Using local service account key");
  } else {
    // Cloud deployment: environment variables se
    const { FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL } =
      process.env;

    if (!FIREBASE_PROJECT_ID || !FIREBASE_PRIVATE_KEY || !FIREBASE_CLIENT_EMAIL) {
      throw new Error(
        "Missing Firebase credentials. Place serviceAccountKey.json in backend/config/ or set FIREBASE_* env vars."
      );
    }

    serviceAccount = {
      type: "service_account",
      project_id: FIREBASE_PROJECT_ID,
      private_key: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: FIREBASE_CLIENT_EMAIL,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    };
    logger.info("✅ Firebase Admin: Using environment variables");
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    logger.info("🔥 Firebase Admin SDK initialized");
  }
  auth = admin.auth();
  firestore = admin.firestore();
} catch (error) {
  logger.error("❌ Firebase Admin initialization failed:", error.message);
  logger.warn("⚠️ Continuing startup in partial mode. Firebase auth routes will fail until serviceAccountKey.json is provided.");
}

export { auth, firestore };
export default admin;
