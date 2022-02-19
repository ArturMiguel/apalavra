import type { NextApiRequest, NextApiResponse } from "next";
import DailyWord from "../../db/collections/DailyWord";
import { DbConnection } from "../../db/connection";
import words from "../../words";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.authorization != process.env.API_SECRET) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  switch (req.method) {
    case "PUT":
      await DbConnection.getConnection();
      const random = words[Math.floor(Math.random() * words.length)];
      const current = await DailyWord.findOne();
      await DailyWord.updateOne({}, {
        word: random,
        unaccented: random.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        sequence: (current.sequence || 0) + 1
      }, {
        upsert: true
      })
      return res.status(200).json({ message: "Updated" });
    default:
      return res.status(405).json(`Method ${req.method} not allowed`);
  }
}