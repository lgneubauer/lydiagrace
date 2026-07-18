import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import "./page.css";
import Navbar from "./components/Navbar";
import SparkleTrail from "./components/SparkleTrail";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata = {
  title: "LYDIA GRACE",
  description: "Lydia Grace",
  icons: {
    icon: "/Food.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cormorant.variable}>
      <body>
        <Navbar />
        <SparkleTrail />
        <main className="page-wrapper">{children}</main>
      </body>
    </html>
  );
}
