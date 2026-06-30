import "../subpage.css";

export const metadata = { title: "Food — Lydia Grace" };

export default function FoodPage() {
  return (
    <div className="subpage">
      <div className="subpage__content">
        <h1 className="subpage__title">Food</h1>

        {/* ---- Intro text (user will replace) ---- */}
        <div className="food__intro">
          <p className="food__intro-placeholder">Food text goes here</p>
        </div>

        {/* ---- Main content: clients + photos ---- */}
        <div className="food__content">
          {/* Left column: clients */}
          <div className="food__clients">
            <h2 className="food__clients-heading">Past Clients</h2>
            <ul className="food__clients-list">
              <li className="food__clients-item">Benshen Co.</li>
              <li className="food__clients-item">District Vision</li>
              <li className="food__clients-item">Christopher Golden</li>
              <li className="food__clients-item">Alex Nashton</li>
              <li className="food__clients-item">Sailing Collective</li>
              <li className="food__clients-item">Lindsay Adelman</li>
            </ul>
          </div>

          {/* Right column: photo placeholders */}
          <div className="food__photos">
            <div
              className="food__photo"
              aria-label="Food photo placeholder"
            ></div>
            <div
              className="food__photo"
              aria-label="Food photo placeholder"
            ></div>
            <div
              className="food__photo"
              aria-label="Food photo placeholder"
            ></div>
          </div>
        </div>

        {/* ---- Contact form ---- */}
        <div className="food__contact">
          <p className="food__contact-label">Email</p>

          {/* Replace YOUR_FORM_ID with your Formspree form ID */}
          <form
            className="food__form"
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
          >
            <div className="food__field">
              <input
                className="food__input"
                type="text"
                id="food-name"
                name="name"
                placeholder="Name"
                required
              />
            </div>

            <div className="food__field">
              <input
                className="food__input"
                type="email"
                id="food-email"
                name="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="food__field">
              <textarea
                className="food__input food__textarea"
                id="food-message"
                name="message"
                placeholder="Message"
                rows="4"
                required
              />
            </div>

            <button className="food__submit" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
