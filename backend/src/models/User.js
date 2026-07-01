import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: [true, "Firebase UID is required"],
      unique: true,
      index: true,
      immutable: true, // Cannot change after creation
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    photoURL: {
      type: String,
      default: "",
      validate: {
        validator: function (v) {
          return v === "" || /^https?:\/\/.+/.test(v);
        },
        message: "Photo URL must be a valid URL",
      },
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    isPremium: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "Role must be user or admin",
      },
      default: "user",
    },
    provider: {
      type: String,
      enum: ["email", "google", "facebook"],
      default: "email",
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
userSchema.index({ createdAt: -1 });
userSchema.index({ isPremium: 1, createdAt: -1 });

// Virtual: membership duration
userSchema.virtual("membershipDays").get(function () {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Pre-save hook
userSchema.pre("save", function (next) {
  if (this.isModified("lastLogin")) {
    // Any login-related logic
  }
  next();
});

// Static methods
userSchema.statics.findByUid = function (uid) {
  return this.findOne({ uid });
};

userSchema.statics.getPremiumCount = function () {
  return this.countDocuments({ isPremium: true, isActive: true });
};

export default mongoose.model("User", userSchema);
