const router = require("express").Router();
const CampaignController = require("../controller/CampaignController");

router
  //Create campaign
  .post("/create", CampaignController.createCampaign)
  //Get all campaign
  .get("/", CampaignController.getAllCampaign)
  //Edit campaign
  .put("/edit/", CampaignController.editCampaign)
  //End campaign
  .delete("/delete/", CampaignController.endCampaign)
  //Delete update
  .delete("/update/", CampaignController.deleteUpdate)
  //Make update
  .post("/update/", CampaignController.updateCampaign)
  .get("/:id",CampaignController.getACampaign)

module.exports = router;
