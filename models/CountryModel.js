const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { model } = require("mongoose");

const CountrySchema = new Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model("Country", CountrySchema);
const init = async () => {
  const countryModel = model("Country");
  var country = await countryModel.find({ name: "India" }, "");
  var us = new countryModel({
    name: "India",
  });
  if (!country[0]) us.save();
};

init();
