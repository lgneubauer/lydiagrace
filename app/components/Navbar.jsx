"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconInstagram, IconTikTok, IconYouTube, IconSubstack } from "./Icons";
import GyroTilt from "./GyroTilt";
import "./Navbar.css";

const NAV_ITEMS = [
  { label: "Food", href: "/food", position: "food", img: "/food.png" },
  {
    label: "Tea Cloud",
    href: "/tea-cloud",
    position: "tea",
    img: "/tea-cloud.png",
  },
  {
    label: "Astro\nReading",
    href: "/astro-reading",
    position: "astro",
    img: "/astro-reading.png",
  },
  { label: "Yoga", href: "/yoga", position: "yoga", img: "/yoga.png" },
];

const DROPDOWN_ITEMS = [
  { label: "Food", href: "/food", img: "/food.png" },
  { label: "Tea Cloud", href: "/tea-cloud", img: "/tea-cloud.png" },
  {
    label: "Astro\nReading",
    href: "/astro-reading",
    img: "/astro-reading.png",
  },
  { label: "Yoga", href: "/yoga", img: "/yoga.png" },
];

/* Home page — single nav, CSS handles mobile vs desktop */
export function MenuContent({ onNavigate }) {
  return (
    <div className="menu-content">
      <h1 className="menu-content__title">Lydia Grace</h1>

      <div className="menu-content__about-wrapper">
        <Link
          href="/about"
          className="menu-content__about"
          onClick={onNavigate}
        >
          ABOUT
        </Link>
      </div>

      <nav className="menu-content__nav">
        {NAV_ITEMS.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className={`menu-content__nav-item menu-content__nav-item--${item.position}`}
            onClick={onNavigate}
          >
            <span className="menu-content__nav-label">{item.label}</span>
            <img
              src={item.img}
              alt=""
              className={`menu-content__nav-sketch menu-content__nav-sketch--delay${i}`}
            />
            <GyroTilt intensity={600 + i * 3}>
              <img src={item.img} alt="" className="menu-content__nav-img" />
            </GyroTilt>
          </Link>
        ))}
      </nav>

      <div className="menu-content__socials">
        <a
          href="http://instagram.com/lydiagraceneubauer"
          target="_blank"
          className="menu-content__social-link"
          aria-label="Instagram"
        >
          <IconInstagram />
        </a>
        <a
          href="https://www.tiktok.com/@lydiagraceneubauer"
          target="_blank"
          className="menu-content__social-link"
          aria-label="TikTok"
        >
          <IconTikTok />
        </a>
        <a
          href="https://www.youtube.com/@lydiagraceneubauer"
          target="_blank"
          className="menu-content__social-link"
          aria-label="YouTube"
        >
          <IconYouTube />
        </a>
        <a
          href="https://substack.com/@lydiagrace"
          target="_blank"
          className="menu-content__social-link"
          aria-label="Substack"
        >
          <IconSubstack />
        </a>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const dropdownRef = useRef(null);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
      setVisible(false);
    }, 100);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
    setVisible(true);
  }, []);

  useEffect(() => {
    setOpen(false);
    setClosing(false);
    setVisible(false);
  }, [pathname]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleClose]);

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        handleClose();
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, handleClose]);

  useEffect(() => {
    if (visible) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [visible]);

  if (isHome) return null;

  return (
    <div ref={dropdownRef}>
      <header
        className="navbar"
        style={open || visible ? { display: "none" } : undefined}
      >
        <div />
        <button
          className="navbar__toggle"
          onClick={handleOpen}
          aria-expanded={false}
          aria-label="Open menu"
        >
          <span className="navbar__toggle-line" />
        </button>
      </header>

      {(open || visible) && (
        <div
          className={`dropdown ${closing ? "dropdown--closing" : "dropdown--open"}`}
        >
          <button
            className="dropdown__close"
            onClick={handleClose}
            aria-label="Close menu"
          >
            <span className="dropdown__close-icon" />
          </button>

          <Link href="/" className="dropdown__title" onClick={handleClose}>
            Lydia Grace
          </Link>

          <div className="dropdown__about-wrapper">
            <Link
              href="/about"
              className="dropdown__about-link"
              onClick={handleClose}
            >
              ABOUT
            </Link>
          </div>

          <nav className="dropdown__nav">
            {DROPDOWN_ITEMS.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="dropdown__nav-item"
                onClick={handleClose}
              >
                <span className="dropdown__nav-label">{item.label}</span>

                <GyroTilt intensity={6 + i * 3}>
                  <img src={item.img} alt="" className="dropdown__nav-img" />
                </GyroTilt>
              </Link>
            ))}
          </nav>

          <div className="dropdown__socials">
            <a
              href="http://instagram.com/lydiagraceneubauer"
              target="_blank"
              className="dropdown__social-link"
              aria-label="Instagram"
            >
              <IconInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@lydiagraceneubauer"
              target="_blank"
              className="dropdown__social-link"
              aria-label="TikTok"
            >
              <IconTikTok />
            </a>
            <a
              href="https://www.youtube.com/@lydiagraceneubauer"
              target="_blank"
              className="dropdown__social-link"
              aria-label="YouTube"
            >
              <IconYouTube />
            </a>
            <a
              href="https://substack.com/@lydiagrace"
              target="_blank"
              className="dropdown__social-link"
              aria-label="Substack"
            >
              <IconSubstack />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
