import { auth } from "../config/firebase-admin.js";
import logger from "../config/logger.js";

/**
 * Verify Firebase ID Token from Authorization header
 * Format: Authorization: Bearer <id_token>
 */
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
        code: "NO_TOKEN",
      });
    }

    const token = authHeader.split("Bearer ")[1].trim();

    if (!token || token === "null" || token === "undefined") {
      return res.status(401).json({
        success: false,
        message: "Invalid token format.",
        code: "INVALID_TOKEN_FORMAT",
      });
    }

    // Verify with Firebase Admin
    const decodedToken = await auth.verifyIdToken(token, true); // checkRevoked = true

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      name: decodedToken.name || "",
      picture: decodedToken.picture || "",
      role: decodedToken.role || "user", // Custom claims
    };

    logger.debug(`🔐 Auth success: ${decodedToken.email} (${decodedToken.uid})`);
    next();
  } catch (error) {
    logger.error("Auth Middleware Error:", error.message);

    const isExpired = error.code === "auth/id-token-expired";
    const isRevoked = error.code === "auth/id-token-revoked";

    return res.status(401).json({
      success: false,
      message: isExpired
        ? "Session expired. Please login again."
        : isRevoked
        ? "Session revoked. Please login again."
        : "Invalid authentication token.",
      code: error.code || "AUTH_ERROR",
    });
  }
};

/**
 * Optional auth - token hai toh user attach karo, nahi toh guest
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split("Bearer ")[1].trim();
      const decodedToken = await auth.verifyIdToken(token);
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name || "",
        picture: decodedToken.picture || "",
      };
    } else {
      req.user = null;
    }
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

/**
 * Role-based access control
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${allowedRoles.join(" or ")}`,
      });
    }

    next();
  };
};
