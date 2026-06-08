'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconInstagram, IconTikTok, IconSubstack } from './Icons';
import './Navbar.css';

const NAV_ITEMS = [
  { label: 'Food', href: '/food', position: 'food' },
  { label: 'Astro\nReading', href: '/astro-reading', position: 'astro' },
  { label: 'Tea Cloud', href: '/tea-cloud', position: 'tea' },
  { label: 'Yoga', href: '/yoga', position: 'yoga' },
];

const DROPDOWN_ITEMS = [
  { label: 'Food', href: '/food', img: '/food.png' },
  { label: 'Tea Cloud', href: '/tea-cloud', img: '/tea-cloud.png' },
  { label: 'Astro\nReading', href: '/astro-reading', img: '/astro-reading.png' },
  { label: 'Yoga', href: '/yoga', img: '/yoga.png' },
];

/* Home page — scattered desktop, vertical mobile */
export function MenuContent({ onNavigate }) {
  return (
    <div className="menu-content">
      <h1 className="menu-content__title">Lydia Grace</h1>

      <Link href="/about" className="menu-content__about" onClick={onNavigate}>
        About
      </Link>

      <nav className="menu-content__nav-scattered">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`menu-content__nav-item menu-content__nav-item--${item.position}`}
            onClick={onNavigate}
          >
            <span className="menu-content__nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="menu-content__socials">
        <a href="#" className="menu-content__social-link" aria-label="Instagram"><IconInstagram /></a>
        <a href="#" className="menu-content__social-link" aria-label="TikTok"><IconTikTok /></a>
        <a href="#" className="menu-content__social-link" aria-label="Substack"><IconSubstack /></a>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const dropdownRef = useRef(null);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    function handleKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  if (isHome) return null;

  return (
    <div ref={dropdownRef}>
      <header className="navbar">
        <div />
        {!open && (
          <button
            className="navbar__toggle"
            onClick={() => setOpen(true)}
            aria-expanded={false}
            aria-label="Open menu"
          >
            <span className="navbar__toggle-line" />
          </button>
        )}
      </header>

      {open && (
        <div className="dropdown">
          <button
            className="dropdown__close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <span className="dropdown__close-icon" />
          </button>

          <div className="dropdown__about-wrapper">
            <Link href="/about" className="dropdown__about-link" onClick={() => setOpen(false)}>
              About
            </Link>
          </div>

          <nav className="dropdown__nav">
            {DROPDOWN_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="dropdown__nav-item"
                onClick={() => setOpen(false)}
              >
                <span className="dropdown__nav-label">{item.label}</span>
                <img src={item.img} alt="" className="dropdown__nav-img" />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}