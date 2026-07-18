import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <Link href="/privacy-policy" className="footer__link">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
