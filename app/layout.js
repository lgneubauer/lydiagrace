import { Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import './page.css';
import Navbar from './components/Navbar';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata = {
  title: 'LYDIA GRACE',
  description: 'Lydia Grace',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cormorant.variable}>
      <body>
        <Navbar />
        <main className="page-wrapper">{children}</main>
      </body>
    </html>
  );
}