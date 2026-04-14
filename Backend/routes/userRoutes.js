const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// @route POST /api/users/register
// @description Register a new user
// @access Public
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //Registration logic
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User Already Exist" });

    user = new User({ name, email, password });
    await user.save();

    //Create JWT payload
    const payload = { user: { id: user._id, role: user.role } };

    //Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        //send the user and token in response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

//@route POST /api/users/login
//@desc Authenticate user
//@access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //Create JWT payload
    const payload = { user: { id: user._id, role: user.role } };

    //Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;

        //send the user and token in response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route GET /api/users/profile
//@desc GET logged-in user's profile (Protected Route)
//@access Private
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

// @route POST /api/users/forgot-password
// @desc Send password reset link to email
// @access Public
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate a secure token
    const token = crypto.randomBytes(32).toString("hex");

    // Save token and expiry to user
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or another email service
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Reset password link
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${token}`;

    // Send email
    await transporter.sendMail({
      to: user.email,
      subject: "Reset Your Password - The Drip Store",
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e5e5e5;">
      
      <h2 style="text-align: center; color: #000;">Reset Your Password</h2>
      
      <p style="color: #555; font-size: 14px;">
        Hey ${user.name || "there"},
      </p>

      <p style="color: #555; font-size: 14px;">
        We received a request to reset your password. Click the button below to set a new password.
      </p>

      <div style="text-align: center; margin: 25px 0;">
        <a href="${resetURL}" 
           style="background-color: #000; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block; font-size: 14px;">
          Reset Password
        </a>
      </div>

      <p style="color: #999; font-size: 12px; text-align: center;">
        This link will expire in 1 hour.
      </p>

      <p style="color: #999; font-size: 12px; text-align: center;">
        If you didn’t request this, you can safely ignore this email.
      </p>

      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />

      <p style="color: #aaa; font-size: 12px; text-align: center;">
        © ${new Date().getFullYear()} The Drip Store. All rights reserved.
      </p>

    </div>
  </div>
  `,
    });

    res.json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/users/reset-password/:token
// @desc Reset password using token
// @access Public
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // check token not expired
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    // Update password
    user.password = password; // bcrypt middleware in User model will hash it
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
