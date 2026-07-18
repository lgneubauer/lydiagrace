import "../subpage.css";
import { submitFood } from "./actions";
import Footer from "../components/Footer";

export const metadata = { title: "Food — Lydia Grace" };

export default async function FoodPage({ searchParams }) {
  const { sent } = await searchParams;

  return (
    <div className="subpage">
      <div className="subpage__content">
        <h1 className="subpage__title">Food</h1>

        <div className="food__intro">
          <p className="food__tagline">Simply here to serve.</p>
          <p className="food__intro-placeholder">
            My love for food has allowed her to feed people all over the world.
            I cut my teeth in New York City kitchens cooking for design studios
            and catering private events. Currently based in Los Angeles, I'm
            available for all your culinary needs – including private dinners,
            brand events, catering, postpartum food packages, yoga retreats, &
            recipe development. Using primarily locally grown and seasonal
            ingredients, I create beautiful and delicious meals that can
            accommodate any dietary restrictions or allergies.
          </p>
        </div>

        <div className="food__content">
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

        <div className="food__contact">
          <p className="food__contact-label">Email</p>

          <form
            className="food__form"
            action={submitFood}
            key={sent ? "sent" : "fresh"}
          >
            <div className="food__field">
              <input
                className="food__input"
                type="text"
                name="name"
                placeholder="Name"
                required
              />
            </div>
            <div className="food__field">
              <input
                className="food__input"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="food__field">
              <textarea
                className="food__input food__textarea"
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

      {sent && <div className="toast">Email received</div>}

      <Footer />
    </div>
  );
}
