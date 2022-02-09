import mongoose from "../connection";

let wordEntity: mongoose.Model<any>;

try {
  wordEntity = mongoose.model("words", new mongoose.Schema({
    name: String,
    noAccent: String,
  }));
} catch {
  wordEntity = mongoose.model("words");
}

export const WordEntity = wordEntity;