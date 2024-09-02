const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
    },
    commenterId: {
      type: Schema.Types.ObjectId,
    },
    note: {
      type: String,
    },
    delete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: ture },
);

module.exports = mongoose.model("Comment", CommentSchema);
