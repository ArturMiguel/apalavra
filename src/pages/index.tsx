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
  const index = 10; // TODO Implementar rotina para definir o indice da palavra do dia
  const word = words[index];
  return {
    props: {
      word: JSON.parse(JSON.stringify(word))
    }
  }
}