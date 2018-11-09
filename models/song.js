const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const musicPlaylist = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: false },
  url: { type: String, required: false },
  imgUrl: { type: String, required: false },
  saved: { type: Boolean, required: true, default: false }
});

const Song = mongoose.model("Song", musicPlaylist);

module.exports = Song;