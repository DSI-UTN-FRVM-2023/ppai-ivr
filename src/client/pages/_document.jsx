import { Html, Head, Main, NextScript } from 'next/document';
import Navbar from '../components/Navbar';

export default function Document() {
  return (
    <Html>
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <body className="bg-slate-700">
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
