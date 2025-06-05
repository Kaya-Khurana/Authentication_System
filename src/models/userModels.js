import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    reuired: [true, "Please Fill Up this Filed"],
    unique: true,
  },
  email: {
    type: String,
    reuired: [true, "Please Fill Up this Filed"],
    unique: true,
  },
  password: {
    type: String,
    reuired: [true, "Please Fill Up this Filed"],
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
