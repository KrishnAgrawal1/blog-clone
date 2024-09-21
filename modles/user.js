const mongoose = require("mongoose");
const { error } = require("node:console");
const { createHmac, randomBytes } = require("node:crypto");
const { createTockenForUser } = require("../services/authentication");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const salt = randomBytes(16).toString();
  const hash = createHmac("sha256", salt).update(user.password).digest("hex");
  this.salt = salt;
  this.password = hash;
  next();
});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new error("user not found");
  const salt = user.salt;
  const hash = createHmac("sha256", salt).update(password).digest("hex");
  if(hash !== user.password) throw new error("incorrect password");
  const token = createTockenForUser(user);
  return token;
});

const User = mongoose.model("user", userSchema);

module.exports = User;
