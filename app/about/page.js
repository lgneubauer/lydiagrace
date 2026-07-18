import Image from "next/image";
import GyroTilt from "../components/GyroTilt";
import Footer from "../components/Footer";
import { submitAbout } from "./actions";
import "../subpage.css";

export const metadata = { title: "About — Lydia Grace" };

export default async function AboutPage({ searchParams }) {
  const { sent } = await searchParams;

  return (
    <div className="subpage">
      <article className="subpage__content">
        <h1 className="subpage__title">About</h1>

        <div className="subpage__body">
          <p>
            I&apos;m Lydia Grace, a private chef, yoga teacher, astrologer, and
            mother. Most people find me through one of those things and stay for
            all of them.
          </p>
          <p>
            My background in professional kitchens spans NYC design studios,
            celebrity homes, branded events, and sailboats. I&apos;ve cooked for
            postpartum mothers during their most vulnerable weeks and for
            retreats built around slowing down.
          </p>
        </div>

        <GyroTilt className="subpage__image" intensity={5}>
          <Image
            src="/about-img.png"
            alt="Abstract painted illustration — blue brushstroke, red circle, and yellow dash"
            width={280}
            height={300}
            priority
          />
        </GyroTilt>

        <div className="subpage__body">
          <p>
            Food, for me, has always been inseparable from how we inhabit our
            bodies.
          </p>
          <p>
            That same philosophy runs through my yoga and meditation practice,
            and through the astrology readings I offer. I&apos;m not interested
            in compartmentalizing wellness. I&apos;m interested in the whole
            picture — and in helping you feel at home in yours.
          </p>
        </div>

        <div id="contact" className="about__contact">
          <h2 className="about__contact-heading">Contact</h2>

          <form
            className="about__form"
            action={submitAbout}
            key={sent ? "sent" : "fresh"}
          >
            <div className="about__field">
              <input
                className="about__input"
                type="text"
                name="name"
                placeholder="Name"
                required
              />
            </div>
            <div className="about__field">
              <input
                className="about__input"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="about__field">
              <textarea
                className="about__input about__textarea"
                name="message"
                placeholder="Message"
                rows="4"
                required
              />
            </div>
            <button className="about__submit" type="submit">
              Send
            </button>
          </form>
        </div>
      </article>

      {sent && <div className="toast">Email received</div>}

      <Footer />
    </div>
  );
}
