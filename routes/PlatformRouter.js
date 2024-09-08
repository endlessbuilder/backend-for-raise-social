const router = require("express").Router();
const PlatformController = require("../controller/PlatformController");
console.log("platform router");

router
  //Create platform
  .post("/create", PlatformController.createPlatform)
  //set platform admin
  .post("/setadim", PlatformController.setAdmin)
  //set platform fee
  .post("/setfee", PlatformController.setFee)
//   //set platform unlocked
//   .post("/setunlocked", PlatformController.setUnlocked)

module.exports = router;
