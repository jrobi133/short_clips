const router = require("express").Router();
const userRoutes = require("./user");
const videoRoutes = require("./video");

// User routes
router.use("/user", userRoutes);
router.use("/video", videoRoutes);

module.exports = router;
