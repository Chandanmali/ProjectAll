const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: "User"}, //username store in db
    content: { type: String, trim: true },                       // type of message: str, num, img
    chat: {type: mongoose.Schema.Types.ObjectId, ref: "Chat"},  // actual chat
}, { timestamps: true })

const messageModel = mongoose.model("Message", messageSchema)

module.exports = {
    messageModel
}