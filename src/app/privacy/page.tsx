export const metadata = {
  title: "Privacy Policy | BestAlt.org",
  description: "Privacy policy for BestAlt.org — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-white mb-6">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: May 2025</p>

      <div className="space-y-6 text-gray-400 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Information We Collect</h2>
          <p>
            We do not collect personal information directly. However, we use third-party services
            that may collect information as described below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Google Analytics</h2>
          <p>
            We use Google Analytics to analyze website traffic. Google Analytics collects
            standard log data and usage details, including your IP address, browser type,
            pages visited, and time spent on pages. This data is used to improve our website
            and understand how visitors use it. You can opt out of Google Analytics by installing
            the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              className="text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Affiliate Links</h2>
          <p>
            Some links on this site are affiliate links. This means if you click on a link and
            make a purchase or sign up, we may earn a commission at no extra cost to you. The
            tools and services we recommend are based on our research and are not influenced by
            compensation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Third-Party Services</h2>
          <p>
            Our site may include links to third-party websites, products, and services.
            These third parties may collect information about you when you interact with their
            content, advertising, or services. We are not responsible for the privacy practices
            of these third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Cookies</h2>
          <p>
            We may use cookies to collect non-personal information about your visit. Cookies
            are small text files stored on your device. You can control or disable cookies
            through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Data Retention</h2>
          <p>
            We do not store personal data on our servers. Any data collected by third-party
            services (such as Google Analytics) is subject to their respective privacy policies
            and data retention periods.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Your Rights</h2>
          <p>
            Depending on your location, you may have the right to access, correct, or delete
            personal information collected about you. Since we do not collect personal data
            directly, please contact the respective third-party services directly for data
            subject requests.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Children&apos;s Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age, and we do not
            knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on
            this page with an updated &quot;Last updated&quot; date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@bestalt.org" className="text-blue-400 hover:underline">
              privacy@bestalt.org
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
