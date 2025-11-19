const mongoose = require("mongoose");
const { Schema } = mongoose;

const sessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // optional, references the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Session", sessionSchema);
