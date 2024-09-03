const Donate = require("../models/DonateModel");
const Campaign = require("../models/CampaignModel");
const _ = require("lodash");
const RaiseContractImpl = require("../utils/integration")
const CONNECTION = require('../utils/endpoints')

// const raiseContract = RaiseContractImpl.create(CONNECTION)

exports.createDonate = async (req, res) => {
  const newDonate = new Donate({
    dominatorId: req.body.userId,
    campaignId: req.body.campaignId,
    wallet: req.body.wallet,
    amount: req.body.amount,
    unit: req.body.unit,
    text: req.body.text,
    delete: false,
  });
  const ttlamount = await Campaign.findById(req.body.campaignId);
  const ttl = ttlamount.totalAmount * 1 + req.body.amount * 1;
  await Campaign.findOneAndUpdate(
    { _id: req.body.campaignId },
    {
      totalAmount: ttl,
      $push: {
        donated: {
          donatorId: req.body.userId,
          amount: req.body.amount,
          text: req.body.text,
        },
      },
    },
  );

  await newDonate.save((err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(200).json({
        message: "Donate Success!",
      });
    }
  });
};

exports.getAllDonate = async (req, res) => {
  try {
    const donate = await Donate.find({ delete: false });
    return res.status(200).json({ message: "Success", donate: donate });
  } catch (error) {
    console.log(error);
  }
};
