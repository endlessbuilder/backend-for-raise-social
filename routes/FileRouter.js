const router = require("express").Router();
const FileCtrl = require("../controller/FileController");
console.log("file router");

router.post("/upload", FileCtrl.uploadFiles);
router.get("/download/:id", FileCtrl.downloadFile);

module.exports = router;
