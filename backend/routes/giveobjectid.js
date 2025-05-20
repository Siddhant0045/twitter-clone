const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Your User model

// GET /api/users/byFirebaseUid/:firebaseUid
router.get("/byFirebaseUid/:firebaseUid", async (req, res) => {
  const uid = req.params.firebaseUid;

  try {
    const user = await User.findOne({ uid }).select("uid following");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the MongoDB _id and following list
    res.json({
      _id: user._id,
      following: user.following,
    });
  } catch (err) {
    console.error("Error fetching user by Firebase UID", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
