import "../subpage.css";
import { submitYoga } from "./actions";
import Footer from "../components/Footer";

export const metadata = { title: "Yoga — Lydia Grace" };

export default async function YogaPage({ searchParams }) {
  const { sent } = await searchParams;

  return (
    <div className="subpage">
      <div className="subpage__content">
        <h1 className="subpage__title">Yoga</h1>

        <div className="subpage__body">
          <p>
            With over ten years of teaching across Vinyasa and Kundalini, I
            offer private sessions in Los Angeles that meet you exactly where
            you are. Whether you're brand new or deepening an existing practice.
          </p>
        </div>

        <div className="yoga__schedule">
          <h2 className="yoga__schedule-heading">Schedule</h2>
          <ul className="yoga__schedule-list">
            <li className="yoga__schedule-item">Schedule goes here</li>
          </ul>
        </div>

        <p className="yoga__availability">Private sessions available</p>

        <div className="yoga__contact">
          <p className="yoga__contact-label">Email</p>

          <form
            className="yoga__form"
            action={submitYoga}
            key={sent ? "sent" : "fresh"}
          >
            <div className="yoga__field">
              <input
                className="yoga__input"
                type="text"
                name="name"
                placeholder="Name"
                required
              />
            </div>
            <div className="yoga__field">
              <input
                className="yoga__input"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="yoga__field">
              <textarea
                className="yoga__input yoga__textarea"
                name="message"
                placeholder="Message"
                rows="4"
                required
              />
            </div>
            <button className="yoga__submit" type="submit">
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
