module.exports = {
  // Secret key for JWT signing and encryption
  secret: "super secret passphrase",
  db_collection_prefix: "raise_",
  lang: "en",
  allowed_origin: ["http://localhost:3000", "https://localhost:4000"],

  expiresIn: 3600 * 72, // 3 days
  db_url: "mongodb://127.0.0.1:27017/raise",
  db_options: {
    // useNewUrlParser: true, //from 6 or higher version of mongoose
    // useUnifiedTopology: true, // the same above
  },
  serviceUrl:
    process.env.REACT_APP_SERVICE_URL || "http://localhost:5005/api",
};
