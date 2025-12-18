const express = require("express");
const router = express.Router();

/**
 * POST /api/login
 * Mock login endpoint
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Simple mock validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  if (email === "admin@example.com" && password === "admin123") {
    return res.json({
      success: true,
      token: "mock-jwt-token",
      user: {
        name: "Admin User",
        email
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
});

module.exports = router;
