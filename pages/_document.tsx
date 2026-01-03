import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Dermalyze - Personal Care Product Advisor</title>
        <meta
          name="description"
          content="Find out if personal care products are safe and suitable for your skin"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

