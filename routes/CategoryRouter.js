const router = require("express").Router();
const CategoryController = require("../controller/CategoryController");

router
  //create Category  
  .post("/create", CategoryController.createCategory)
  //getAll categories
  .get("/", CategoryController.getAllCategory)
  //edit Category
  .put("/edit/", CategoryController.editCategory)
  //delete Category
  .delete("/delete/", CategoryController.deleteCategory)


module.exports = router;
