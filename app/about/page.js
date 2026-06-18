import Image from 'next/image';
import ScrollTilt from '../components/ScrollTilt';
import '../subpage.css';

export const metadata = { title: 'About — Lydia Grace' };

export default function AboutPage() {
  return (
    <div className="subpage">
      <article className="subpage__content">
        <h1 className="subpage__title">About</h1>

        <div className="subpage__body">
          <p>
            I'm Lydia Grace, a private chef, yoga teacher, astrologer, and
            mother. Most people find me through one of those things and stay for
            all of them.
          </p>
          <p>
            My background in professional kitchens spans NYC design studios,
            celebrity homes, branded events, and sailboats. I've cooked for
            postpartum mothers during their most vulnerable weeks and for retreats
            built around slowing down.
          </p>
        </div>

        <ScrollTilt className="subpage__image">
          <Image
            src="/about-img.png"
            alt="Abstract painted illustration — blue brushstroke, red circle, and yellow dash"
            width={280}
            height={300}
            priority
          />
        </ScrollTilt>

        <div className="subpage__body">
          <p>
            Food, for me, has always been inseparable from how we inhabit our
            bodies.
          </p>
          <p>
            That same philosophy runs through my yoga and meditation practice,
            and through the astrology readings I offer. I'm not interested in
            compartmentalizing wellness. I'm interested in the whole picture —
            and in helping you feel at home in yours.
          </p>
          
        </div>
      </article>
    </div>
  );
}