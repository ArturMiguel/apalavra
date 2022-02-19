import type { GetServerSideProps } from "next";
import Puzzle from "../components/Game";
import Header from "../components/Header";
import DailyWord from "../db/collections/DailyWord";
import { DbConnection } from "../db/connection";
import { WordDocDTO } from "../types/WordDocDTO";
import words from "../words";

export default function Home({ wordDoc, words }) {
  return (
    <div>
      <Header />
      <Puzzle wordDoc={wordDoc} words={words} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  await DbConnection.getConnection();
  const wordDocument: WordDocDTO = (await DailyWord.findOne())._doc;
  return {
    props: {
      wordDoc: JSON.parse(JSON.stringify(wordDocument)),
      words: words.map(w => w.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    }
  }
}