import mongoose from "mongoose";

let DailyWord = null;

try {
  DailyWord = mongoose.model("daily_words", new mongoose.Schema({
    word: String,
    unaccented: String,
    sequence: Number
  }));
} catch (e) {
  DailyWord = mongoose.model("daily_words");
}

export default DailyWord;