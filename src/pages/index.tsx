import type { GetServerSideProps } from "next";
import Puzzle from "../components/Game";
import { words } from "../words";

export default function Home({ word }) {
  return (
    <div>
      <Puzzle word={word} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const word =  words[1975];
  console.log(word)
  return {
    props: {
      word: JSON.parse(JSON.stringify(word))
    }
  }
}