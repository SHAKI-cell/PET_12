import User from "../models/User.js";
import { auth } from "../config/firebase-admin.js";
import logger from "../config/logger.js";

// Helper: Clean user response
const sanitizeUser = (user) => ({
  uid: user.uid,
  email: user.email,
  fullName: user.fullName,
  photoURL: user.photoURL,
  phone: user.phone,
  isPremium: user.isPremium,
  role: user.role,
  provider: user.provider,
  membershipDays: user.membershipDays,
  lastLogin: user.lastLogin,
  createdAt: user.createdAt,
});

/**
 * POST /api/v1/auth/verify
 * Firebase token verify + MongoDB sync (create or update user)
 */
export const verifyOrCreateUser = async (req, res) => {
  try {
    const { uid, email, name, picture } = req.user;
    const { fullName, provider = "email", photoURL } = req.body;

    let user = await User.findByUid(uid);

    if (!user) {
      // Create new user
      user = new User({
        uid,
        email: email || req.body.email,
        fullName: name || fullName || "DoFo User",
        photoURL: picture || photoURL || "",
        provider,
        isPremium: true,
        lastLogin: new Date(),
      });

      await user.save();
      logger.info(`🆕 New user created: ${email} (${uid})`);

      return res.status(201).json({
        success: true,
        message: "🎉 Premium account created successfully!",
        isNewUser: true,
        user: sanitizeUser(user),
      });
    }

    // Update existing user
    user.lastLogin = new Date();
    if (picture && !user.photoURL) user.photoURL = picture;
    if (name && user.fullName === "DoFo User") user.fullName = name;

    await user.save();
    logger.info(`👋 User logged in: ${email} (${uid})`);

    return res.status(200).json({
      success: true,
      message: "Welcome back to DoFo Premium! 🐾",
      isNewUser: false,
      user: sanitizeUser(user),
    });
  } catch (error) {
    logger.error("Verify User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during authentication.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * GET /api/v1/auth/profile
 * Get current user profile
 */
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByUid(req.user.uid).select("-__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user: sanitizeUser(user),
    });
  } catch (error) {
    logger.error("Get Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile.",
    });
  }
};

/**
 * PUT /api/v1/auth/profile
 * Update user profile
 */
export const updateUserProfile = async (req, res) => {
  try {
    const { fullName, phone, photoURL } = req.body;
    const updates = {};

    if (fullName !== undefined) updates.fullName = fullName.trim();
    if (phone !== undefined) updates.phone = phone.trim();
    if (photoURL !== undefined) updates.photoURL = photoURL.trim();

    const user = await User.findOneAndUpdate(
      { uid: req.user.uid },
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    logger.info(`✏️ Profile updated: ${user.email}`);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      user: sanitizeUser(user),
    });
  } catch (error) {
    logger.error("Update Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile.",
    });
  }
};

/**
 * PUT /api/v1/auth/role
 * Admin only: Update user role (with Firebase custom claims)
 */
export const updateUserRole = async (req, res) => {
  try {
    const { uid, role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be 'user' or 'admin'",
      });
    }

    // Update MongoDB
    const user = await User.findOneAndUpdate(
      { uid },
      { $set: { role } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Update Firebase custom claims
    await auth.setCustomUserClaims(uid, { role });

    logger.info(`👑 Role updated: ${user.email} → ${role}`);

    return res.status(200).json({
      success: true,
      message: `Role updated to ${role}`,
      user: sanitizeUser(user),
    });
  } catch (error) {
    logger.error("Update Role Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update role.",
    });
  }
};

/**
 * DELETE /api/v1/auth/account
 * GDPR-compliant account deletion
 */
export const deleteAccount = async (req, res) => {
  try {
    const { uid } = req.user;

    // Delete from MongoDB
    const deleted = await User.findOneAndDelete({ uid });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Delete from Firebase
    await auth.deleteUser(uid);

    logger.info(`🗑️ Account deleted: ${deleted.email}`);

    return res.status(200).json({
      success: true,
      message: "Account deleted permanently. We're sad to see you go! 😢",
    });
  } catch (error) {
    logger.error("Delete Account Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete account.",
    });
  }
};
