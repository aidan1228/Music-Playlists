import axios from "axios";

export default {
  // Gets all articles
  getSongs: function() {
    return axios.get("/api/songs");
  },
  // Deletes the article with the given id
  deleteSong: function(id) {
    return axios.delete("/api/songs/" + id);
  },
  // Saves a article to the database
  saveSong: function(song) {
    song.saved = true;
    return axios.post("/api/songs", song);
  },
  getSaved: function() {
    return axios.get("/api/saved");
  }
};
