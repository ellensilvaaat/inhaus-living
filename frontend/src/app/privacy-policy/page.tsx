import type { Metadata } from "next";
import Script from "next/script";
import "./PrivacyPolicy.css";

const siteUrl = "https://inhausliving.com.au";
const pagePath = "/privacy-policy";
const pageUrl = `${siteUrl}${pagePath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "Privacy Policy | Inhaus Living",

  description:
    "Learn how Inhaus Living protects your privacy and handles your personal information with transparency and care.",

  alternates: {
    canonical: pagePath,
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    url: pageUrl,
    title: "Privacy Policy | Inhaus Living",
    description:
      "Learn how Inhaus Living protects your privacy and handles your personal information with transparency and care.",
    siteName: "Inhaus Living",
    locale: "en_AU",
  },

  twitter: {
    card: "summary",
    title: "Privacy Policy | Inhaus Living",
    description:
      "Learn how Inhaus Living protects your privacy and handles your personal information with transparency and care.",
  },
};

export default function PrivacyPolicyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Privacy Policy",
        description:
          "Privacy policy outlining how Inhaus Living collects, uses and protects personal information.",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        inLanguage: "en-AU",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Privacy Policy",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="privacy-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main className="privacy">
        <div className="privacy__container">

          <header className="privacy__hero">
            <span className="privacy__kicker">Legal</span>
            <h1 className="privacy__title">Privacy Policy</h1>
            <div className="privacy__divider" />
          </header>

          <section className="privacy__section">
            <h2>Our Commitment</h2>
            <p className="privacy__lead">
              Your privacy is of the utmost importance to us.
            </p>

            <p>
              Inhaus Living is committed to protecting the privacy of its online
              visitors. Any personal information that you provide on this website
              will be used by Inhaus Living only to respond to your inquiry and
              to help us understand our customers’ needs and interests.
            </p>

            <p>
              You may choose not to provide certain information but still receive
              the benefits of the Site.
            </p>
          </section>

          <section className="privacy__section">
            <h2>Information You Give Us Voluntarily</h2>

            <p>
              We only collect information about you that you choose to share with
              us, and we will never sell or rent your information to any third
              party. The information you give us is used solely to complete a
              transaction with you or provide service to you.
            </p>

            <p>
              If you choose to work with Inhaus Living, we will ask for your name
              and email address. We may also ask for your phone number so that we
              can contact you about the project. We may also ask for additional
              information about your project (e.g., budget).
            </p>

            <p>
              This information helps us gain a better understanding of your
              requirements and allows us to provide a refined and personalised
              service experience.
            </p>
          </section>

          <section className="privacy__section">
            <h2>Data Protection</h2>

            <p>
              We implement industry-standard security measures to protect your
              personal information. Your data is handled with discretion,
              integrity and transparency.
            </p>

            <p>
              We do not share, sell or distribute your personal information to
              third parties unless required by law.
            </p>
          </section>

          <footer className="privacy__footer">
            <p>
              © {new Date().getFullYear()} Inhaus Living. All rights reserved.
            </p>
          </footer>

        </div>
      </main>
    </>
  );
}