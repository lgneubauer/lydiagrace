export const metadata = { title: "Tea Cloud — Lydia Grace" };

export default function TeaCloudPage() {
  return (
    <div className="subpage">
      <div className="subpage__content">
        <h1 className="subpage__title">Tea Cloud</h1>

        {/* ---- Main content: text + photos ---- */}
        <div className="tea__content">
          {/* Left column: copy */}
          <div className="tea__text">
            <p className="tea__description">
              Tea Cloud is our monthly pop-up from Tommy &amp; me.
            </p>
            <p className="tea__description">
              A rotating menu, something sweet, usually something savory and
              always something gluten free, and we offer various coffees and
              teas.
            </p>
            <p className="tea__description">
              One Saturday a month 1–4pm open house. Come run into a friend or
              make a new one. It is held in a private residence so please
              message me for the address.
            </p>
            <p className="tea__highlight">
              Next Tea Cloud — Saturday June, 27th
            </p>
          </div>

          {/* Right column: photo placeholders */}
          <div className="tea__photos">
            <div
              className="tea__photo"
              aria-label="Tea Cloud photo placeholder"
            ></div>
            <div
              className="tea__photo"
              aria-label="Tea Cloud photo placeholder"
            ></div>
          </div>
        </div>

        {/* ---- Email subscription placeholder ---- */}
        <div className="tea__subscribe">
          <p className="tea__subscribe-heading">Subscribe for updates</p>
          <p className="tea__subscribe-placeholder">Form goes here</p>
        </div>
      </div>
    </div>
  );
}
