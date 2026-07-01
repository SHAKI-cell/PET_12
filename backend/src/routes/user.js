import { Router } from "express";
import { verifyToken, requireRole } from "../middleware/auth.js";
import User from "../models/User.js";
import logger from "../config/logger.js";

const router = Router();

/**
 * GET /api/v1/users/leaderboard
 * Public: Premium users leaderboard
 */
router.get("/leaderboard", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find({ isPremium: true, isActive: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("fullName photoURL createdAt membershipDays"),
      User.countDocuments({ isPremium: true, isActive: true }),
    ]);

    return res.status(200).json({
      success: true,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
      count: users.length,
      users,
    });
  } catch (error) {
    logger.error("Leaderboard Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch leaderboard.",
    });
  }
});

/**
 * GET /api/v1/users/me
 * Protected: Current user full data
 */
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findByUid(req.user.uid).select("-__v");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        fullName: user.fullName,
        photoURL: user.photoURL,
        phone: user.phone,
        isPremium: user.isPremium,
        role: user.role,
        membershipDays: user.membershipDays,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /api/v1/users/stats
 * Admin only: Dashboard stats
 */
router.get("/stats", verifyToken, requireRole("admin"), async (req, res) => {
  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      premiumUsers,
      todaySignups,
      weekSignups,
      adminCount,
      recentUsers,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isPremium: true, isActive: true }),
      User.countDocuments({ createdAt: { $gte: todayStart } }),
      User.countDocuments({ createdAt: { $gte: weekStart } }),
      User.countDocuments({ role: "admin" }),
      User.find().sort({ createdAt: -1 }).limit(5).select("fullName email createdAt"),
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        premiumUsers,
        todaySignups,
        weekSignups,
        adminCount,
        conversionRate: totalUsers > 0 ? ((premiumUsers / totalUsers) * 100).toFixed(1) : 0,
      },
      recentUsers,
    });
  } catch (error) {
    logger.error("Stats Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
