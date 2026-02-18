const mongoose = require("mongoose")


//user entry in db
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pic: {
    type: String,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
}, { timestamps: true });

const userModel = mongoose.model("User", userSchema)

module.exports = {
    userModel
}