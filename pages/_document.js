import AllScripts from '@/components/AllScripts'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css" />
        <script src="/js/jquery.js" ></script>
        </Head>
      <body className='bg-grey-100'>
        <Main />
        <NextScript />
      </body>
      <AllScripts />

    </Html>
  )
}
