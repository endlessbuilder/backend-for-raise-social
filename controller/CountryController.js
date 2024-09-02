const Country = require("../models/CountryModel");
const _ = require("lodash");

exports.createCountry = async (req, res) => {
  const newCountry = new Country({
    name: req.body.name,
    delete: false,
  });
  await newCountry.save((err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(200).json({
        message: "Success!",
      });
    }
  });
};

exports.getAllCountry = async (req, res) => {
  try {
    const country = await Country.find();
    return res.status(200).json({ message: "Success", country: country });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCountry = async (req, res) => {
  try {
    await Country.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body.countryId) },
      {
        delete: true,
      },
    );
    res.status(200).json({ message: "Country is deleted." });
  } catch (error) {
    console.log(error);
  }
};

exports.editCountry = async (req, res) => {
  try {
    await Country.findOne({ _id: req.body.countryId }).updateOne({
      name: req.body.name,
    });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
  }
};
