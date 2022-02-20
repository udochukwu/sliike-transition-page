import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';


class CheshireCatDocument extends Document {
  render() {
    return (
      <Html style={{ height: 'auto' }}>
        <Head>
          <link rel='icon' href='/favicon.ico' />
          <link
            href='https://fonts.googleapis.com/css?family=Spartan&display=optional'
            rel='stylesheet'
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CheshireCatDocument;
