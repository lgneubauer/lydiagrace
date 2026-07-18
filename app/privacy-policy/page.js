import "../subpage.css";
import Footer from "../components/Footer";

export const metadata = { title: "Privacy Policy — Lydia Grace" };

export default function PrivacyPolicyPage() {
  return (
    <div className="subpage">
      <div className="subpage__content">
        <h1 className="subpage__title">Privacy Policy</h1>

        <div className="privacy">
          <p className="privacy__updated">Last updated: July 16, 2026</p>

          <p className="privacy__intro">
            This privacy policy describes how our website, operated by Lydia
            Neubauer, collects, uses, and shares information about you when you
            use our website at lydia-grace.com. By using our website, you agree
            to the collection and use of information in accordance with this
            policy.
          </p>

          <h2 className="privacy__heading">1. Information We Collect</h2>
          <p className="privacy__text">
            We may collect the following types of information when you visit or
            interact with our website: log data including your IP address,
            browser type, pages visited, time and date of visit, and time spent
            on pages; usage data collected automatically via Google Analytics;
            contact information including your name and email address when you
            submit a contact form; email address when you subscribe to our
            newsletter; and payment information processed securely through our
            third-party payment processor. We do not store full payment card
            details on our servers.
          </p>

          <h2 className="privacy__heading">2. How We Use Your Information</h2>
          <p className="privacy__text">
            We use the information we collect to operate, maintain, and improve
            our website and services; to analyze website traffic and understand
            how visitors use our site through Google Analytics; to display
            relevant advertisements through Google AdSense; to send newsletters,
            updates, or promotional content you have opted into; to respond to
            your inquiries and contact form submissions; to process transactions
            and send related information; to comply with legal obligations and
            enforce our terms of service; and to protect the security and
            integrity of our website.
          </p>

          <h2 className="privacy__heading">
            3. Cookies and Tracking Technologies
          </h2>
          <p className="privacy__text">
            Our website uses cookies and similar tracking technologies to
            enhance your browsing experience and analyze website usage. You can
            instruct your browser to refuse all cookies or to indicate when a
            cookie is being sent. However, if you do not accept cookies, some
            portions of our website may not function properly.
          </p>
          <p className="privacy__text">
            We use Google Analytics, a web analytics service provided by Google
            LLC. Google Analytics uses cookies to collect information about how
            visitors use our site. You can opt out of Google Analytics by
            installing the Google Analytics opt-out browser add-on.
          </p>
          <p className="privacy__text">
            We use Google AdSense to display advertisements. Google AdSense uses
            cookies to serve ads based on your prior visits to our website or
            other websites. You may opt out of personalized advertising by
            visiting Google&apos;s Ads Settings.
          </p>

          <h2 className="privacy__heading">4. Third-Party Services</h2>
          <p className="privacy__text">
            We may share your information with trusted third-party service
            providers who assist us in operating our website and conducting our
            business. These parties are contractually obligated to keep your
            information confidential. Third-party services we use may include
            Google Analytics, Google AdSense, payment processors such as Stripe
            or PayPal, email marketing platforms, and web hosting providers.
          </p>
          <p className="privacy__text">
            We do not sell, trade, or rent your personal information to third
            parties for their marketing purposes.
          </p>

          <h2 className="privacy__heading">5. Your Rights and Choices</h2>
          <p className="privacy__text">
            You have the right to request a copy of the personal data we hold
            about you, to request correction of inaccurate or incomplete data,
            to request deletion of your personal data subject to certain legal
            exceptions, and to opt out of marketing communications at any time
            by following the unsubscribe link in any email we send.
          </p>

          <h2 className="privacy__heading">
            6. California Privacy Rights (CCPA)
          </h2>
          <p className="privacy__text">
            If you are a California resident, you have additional rights under
            the California Consumer Privacy Act including the right to know what
            personal information we collect, the right to request deletion, the
            right to opt out of the sale of your personal information, and the
            right to non-discrimination. We do not sell personal information. To
            exercise your California privacy rights, please{" "}
            <a href="/about#contact" className="privacy__email">
              contact us
            </a>
            .
          </p>

          <h2 className="privacy__heading">7. Data Security</h2>
          <p className="privacy__text">
            We take reasonable technical and organizational measures to protect
            your personal information from unauthorized access, disclosure,
            alteration, or destruction. However, no method of transmission over
            the internet or electronic storage is 100% secure.
          </p>

          <h2 className="privacy__heading">8. Links to Other Websites</h2>
          <p className="privacy__text">
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices of those websites and
            encourage you to review their privacy policies.
          </p>

          <h2 className="privacy__heading">
            9. Changes to This Privacy Policy
          </h2>
          <p className="privacy__text">
            We may update this privacy policy from time to time. We will notify
            you of any significant changes by posting the new policy on this
            page and updating the date at the top. Your continued use of our
            website after changes are posted constitutes your acceptance of the
            updated policy.
          </p>

          <h2 className="privacy__heading">10. Contact Us</h2>
          <p className="privacy__text">
            If you have any questions about this privacy policy or our data
            practices, please contact us:
          </p>
          <p className="privacy__text">
            Lydia Neubauer
            <br />
            Website: lydia-grace.com
            <br />
            Email:{" "}
            <a href="/about#contact" className="privacy__email">
              Contact form
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
