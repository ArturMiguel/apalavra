import type { GetServerSideProps } from "next";
import Puzzle from "../components/Puzzle";
import { WordEntity } from "../database/entities/WordEntity";

export default function Home({ word }) {
  return (
    <div>
      <Puzzle word={word} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const words = await WordEntity.find();
  const random = Math.floor(Math.random() * words.length) + 1
  return {
    props: {
      word: JSON.parse(JSON.stringify(words[random]))
    } // will be passed to the page component as props
  }
}