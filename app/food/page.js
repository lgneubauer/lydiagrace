export const metadata = { title: "Food — Lydia Grace" };

export default function FoodPage() {
  return (
    <div className="subpage">
      <div className="food">
        {/* ---- Title ---- */}
        <h1 className="food__title">Food</h1>

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

        {/* ---- Email form placeholder ---- */}
        <div className="food__contact">
          <p className="food__contact-placeholder">Email form goes here</p>
        </div>
      </div>
    </div>
  );
}
