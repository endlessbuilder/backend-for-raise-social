const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DonateSchema = new Schema(
  {
    dominatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: "Campaign",
    },
    wallet: {
      type: String,
    },
    amount: {
      type: Number,
    },
    unit: {
      type: String,     
    },
    delete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timeStamps: true,
  },
);

module.exports = mongoose.model("Donate", DonateSchema);
