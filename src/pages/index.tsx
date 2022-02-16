import type { GetServerSideProps } from "next";
import Puzzle from "../components/Game";
import Header from "../components/Header";
import { words } from "../words";

export default function Home({ word, words }) {
  return (
    <div>
      <Header />
      <Puzzle word={word} words={words} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const word =  words[1975];
  return {
    props: {
      word: JSON.parse(JSON.stringify(word)),
      words: words
    }
  }
}