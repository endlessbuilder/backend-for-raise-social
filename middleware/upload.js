const fs = require("fs");
const path = require("path");

exports.move_to_upload = function (file, fileRecord, callback) {
  const uploadPath = path.join(
    __dirname,
    "../uploads",
    fileRecord._id.toString(),
  );

  fs.writeFile(uploadPath, file.data, (err) => {
    if (err) return callback(err);
    callback(null, fileRecord);
  });
};
