import type { GetServerSideProps } from "next";
import Puzzle from "../components/Game";
import Header from "../components/Header";
import DailyWord from "../db/collections/DailyWord";
import { DbConnection } from "../db/connection";
import words from "../words";

export default function Home({ word, words }) {
  return (
    <div>
      <Header />
      <Puzzle word={word} words={words} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  await DbConnection.getConnection();
  const wordDocument = await DailyWord.findOne();
  return {
    props: {
      word: wordDocument.word,
      words: words.map(w => w.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    }
  }
}