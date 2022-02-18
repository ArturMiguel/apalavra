import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <meta name="description" content="apalavra é um jogo de adivinhar palavras da lingua portuguesa (pt-BR). As palavras podem ter 5 ou 6 letras. A cada dia é publicada uma nova palavra e você tem 6 chances para descobrir." />
          <meta name="keywords" content="game, puzzle, palavra" />
          <meta name="author" content="https://www.linkedin.com/in/arturmiguelrocha/" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;