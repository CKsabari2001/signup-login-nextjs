import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please provide the username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide the email"],
    unique: true,
  },
  passWord: {
    type: String,
    required: [true, "Please provide the password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  verificationToken: String,
  verificationExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
