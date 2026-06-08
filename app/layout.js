import './globals.css';
import './page.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'LYDIA GRACE',
  description: 'Lydia Grace',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="page-wrapper">{children}</main>
      </body>
    </html>
  );
}