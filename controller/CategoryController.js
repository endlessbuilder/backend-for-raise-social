const Category = require("../models/CategoryModel");
const _ = require("lodash");

exports.createCategory = async (req, res) => {
  const newCategory = new Category({
    name: req.body.name,
    delete: false,
  });
  await newCategory.save((err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(200).json({
        message: "Success!",
      });
    }
  });
};

exports.getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    return res.status(200).json({ message: "Success", category: category });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body.categoryId) },
      {
        delete: true,
      },
    );
    res.status(200).json({ message: "Category is deleted." });
  } catch (error) {
    console.log(error);
  }
};

exports.editCategory = async (req, res) => {
  try {
    await Category.findOne({ _id: req.body.categoryId }).updateOne({
      name: req.body.name,
    });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
  }
};
