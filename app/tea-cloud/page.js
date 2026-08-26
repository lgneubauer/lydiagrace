import "../subpage.css";
import Footer from "../components/Footer";
import Image from "next/image";

export const metadata = { title: "Tea Cloud — Lydia Grace" };

export default function TeaCloudPage() {
  return (
    <div className="subpage">
      <div className="subpage__content">
        <h1 className="subpage__title">Tea Cloud</h1>

        <div className="tea__content">
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
              Next Tea Cloud — Saturday September 5th, 1-4pm
            </p>
          </div>

          <div className="tea__photos">
            <Image
              className="tea__photo"
              src="/images/tea-cloud-1.jpg"
              alt="Tea Cloud spread"
              width={900}
              height={1200}
              style={{ width: "100%", height: "auto" }}
            />
            <Image
              className="tea__photo"
              src="/images/tea-cloud-2.jpg"
              alt="Tea Cloud spread"
              width={900}
              height={1200}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>

        {/* <div className="tea__subscribe">
          <p className="tea__subscribe-heading">Subscribe for updates</p>
          <p className="tea__subscribe-placeholder">Form goes here</p>
        </div> */}
      </div>

      <Footer />
    </div>
  );
}
