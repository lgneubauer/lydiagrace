import "../subpage.css";

export const metadata = { title: "Astro Reading — Lydia Grace" };

export default function AstroReadingPage() {
  return (
    <div className="subpage">
      <div className="subpage__content">
        <h1 className="subpage__title">Big 3 Read</h1>

        {/* <div className="astro__subtitle">
          <p className="astro__subtitle-text">
            Natal Chart Reading — 20 minutes
          </p>
          <p className="astro__price">$111</p>
        </div> */}

        {/* <hr className="astro__divider" /> */}

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

        {/* Replace YOUR_FORM_ID with your Formspree form ID */}
        <form
          className="astro__form"
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
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
    </div>
  );
}
