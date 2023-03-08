import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Make your GitHub Profile Great Again."
          />
          <meta property="og:site_name" content="ivivan.com" />
          <meta
            property="og:description"
            content="Make your GitHub Profile Great Again."
          />
          <meta property="og:title" content="GitHub Profile Generator" />
          {/* <meta name="twitter:card" content="summary_large_image" /> */}
          <meta name="twitter:title" content="GitHub Profile Generator" />
          <meta
            name="twitter:description"
            content="Make your GitHub Profile Great Again."
          />
          {/* <meta
            property="og:image"
            content="https://twitterbio.com/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://twitterbio.com/og-image.png"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
