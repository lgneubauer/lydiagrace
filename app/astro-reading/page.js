import "../subpage.css";
import { submitAstro } from "./actions";
import Footer from "../components/Footer";

export const metadata = { title: "Astro Reading — Lydia Grace" };

export default async function AstroReadingPage({ searchParams }) {
  const { sent } = await searchParams;

  return (
    <div className="subpage">
      <div className="subpage__content">
        <h1 className="subpage__title">Big 3 Read</h1>

        <div className="astro__body">
          <p className="astro__description">
            Everyone's natal birth chart is like a thumbprint, each one uniquely
            singular. Like a coordinate on earth mapped by the heavens, using
            collective ancient patterning I use the natal chart as a divination
            tool.
          </p>
        </div>

        <p className="astro__form-intro">
          Enter your information below and schedule your reading.
        </p>

        <form
          className="astro__form"
          action={submitAstro}
          key={sent ? "sent" : "fresh"}
        >
          <div className="astro__field">
            <label className="astro__label" htmlFor="astro-name">
              Name
            </label>
            <input
              className="astro__input"
              type="text"
              id="astro-name"
              name="name"
              required
            />
          </div>

          <div className="astro__field">
            <label className="astro__label" htmlFor="astro-email">
              Email
            </label>
            <input
              className="astro__input"
              type="email"
              id="astro-email"
              name="email"
              required
            />
          </div>

          <div className="astro__field">
            <label className="astro__label" htmlFor="astro-dob">
              Date of Birth
            </label>
            <input
              className="astro__input"
              type="date"
              id="astro-dob"
              name="date_of_birth"
              required
            />
          </div>

          <div className="astro__field">
            <label className="astro__label" htmlFor="astro-tob">
              Time of Birth
            </label>
            <span className="astro__hint">
              Exact time for most accurate reading
            </span>
            <input
              className="astro__input"
              type="time"
              id="astro-tob"
              name="time_of_birth"
              required
            />
          </div>

          <div className="astro__field">
            <label className="astro__label" htmlFor="astro-pob">
              Place of Birth
            </label>
            <input
              className="astro__input"
              type="text"
              id="astro-pob"
              name="place_of_birth"
              required
            />
          </div>

          <div className="astro__field">
            <label className="astro__label" htmlFor="astro-topic">
              Any topic you're specifically curious about?
            </label>
            <span className="astro__hint">Career, love, health, etc.</span>
            <textarea
              className="astro__input astro__textarea"
              id="astro-topic"
              name="topic"
              rows="3"
            />
          </div>

          <button className="astro__submit" type="submit">
            Submit
          </button>
        </form>

        <div className="astro__cta">
          <a
            className="astro__calendly"
            href="https://calendly.com/lgneubauer/big-3-read"
            target="_blank"
            rel="noopener noreferrer"
          >
            Calendly Link
          </a>
          <p className="astro__cta-price">$111</p>
          <p className="astro__cta-details">
            20 minute virtual session + a recording of the reading
          </p>
        </div>
      </div>

      {sent && <div className="toast">Email received</div>}

      <Footer />
    </div>
  );
}
