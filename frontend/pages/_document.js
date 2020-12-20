import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

/*https://github.com/vercel/next.js/blob/canary/examples/with-styled-components-rtl/pages/_document.js*/
// Now, all styles are collected and styles are maintained on page refreshes
export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()

    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />))

    const styleTags = sheet.getStyleElement()

    return { ...page, styleTags }
  }
  render() {
    return (
      <html>
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}