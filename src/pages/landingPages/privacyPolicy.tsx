type PolicySubsection = {
  title: string;
  intro?: string;
  items?: string[];
  after?: string[];
};

type PolicySection = {
  title: string;
  paragraphs?: string[];
  intro?: string;
  items?: string[];
  after?: string[];
  subsections?: PolicySubsection[];
};

const POLICY_DATE = "26 August 2026";

const sections: PolicySection[] = [
  {
    title: "1. Introduction",
    paragraphs: [
      "Welcome to Quick Retail.",
      "Quick Retail is a Point-of-Sale (POS) and retail management platform owned and operated by SBSC. The platform helps businesses manage their day-to-day retail operations, including sales transactions, inventory, products, customers, suppliers, and business records.",
      "SBSC respects your privacy and is committed to protecting the information entrusted to us. This Privacy Policy explains how Quick Retail collects, uses, stores, protects, and handles information when you access or use our platform.",
      "By creating an account or using Quick Retail, you acknowledge that you have read and understood this Privacy Policy.",
    ],
  },
  {
    title: "2. Information We Collect",
    paragraphs: [
      "The information we collect depends on how you use Quick Retail and the features you access.",
    ],
    subsections: [
      {
        title: "2.1 Account Information",
        intro: "When creating or managing a Quick Retail account, we may collect:",
        items: [
          "Business or organization name",
          "User's name",
          "Email address",
          "Phone number",
          "Login credentials",
          "Account and subscription information",
        ],
      },
      {
        title: "2.2 Business Information",
        intro:
          "Quick Retail allows businesses to manage information relating to their operations, including:",
        items: [
          "Product names and descriptions",
          "Product prices",
          "Inventory and stock levels",
          "Sales records",
          "Purchase records",
          "Customer information",
          "Supplier information",
          "Store or branch information",
          "Discounts and pricing information",
          "Business reports and records",
        ],
      },
      {
        title: "2.3 Transaction and Payment Information",
        intro:
          "Quick Retail records information relating to sales and transactions carried out through the platform. This may include:",
        items: [
          "Products purchased or sold",
          "Quantities",
          "Transaction amounts",
          "Discounts",
          "Sales dates and times",
          "Transaction references",
          "Payment methods used for transactions",
        ],
        after: [
          "Quick Retail may record payment methods such as cash, bank transfer, card, or other available payment methods for the purpose of recording and managing sales.",
          "Quick Retail does not require the storage of sensitive payment credentials, such as card PINs or passwords, for the purpose of recording a sale.",
          "Where payment processing is provided by a third-party service, the processing of payment information is subject to that provider's applicable terms and privacy policy.",
        ],
      },
      {
        title: "2.4 Technical and Usage Information",
        intro:
          "When you access Quick Retail, we may automatically collect certain technical information, including where applicable:",
        items: [
          "Device type",
          "Operating system",
          "Browser information",
          "IP address",
          "Login information",
          "Platform activity",
          "Usage information",
          "Error and diagnostic information",
        ],
        after: [
          "This information helps us maintain the security, functionality, and performance of the platform.",
        ],
      },
    ],
  },
  {
    title: "3. How We Use Information",
    intro: "SBSC may use information collected through Quick Retail to:",
    items: [
      "Create and manage user accounts.",
      "Provide and maintain Quick Retail services.",
      "Process and record sales transactions.",
      "Manage inventory and stock levels.",
      "Maintain product, customer, and supplier records.",
      "Generate sales and business reports.",
      "Provide customer support.",
      "Investigate and resolve technical issues.",
      "Monitor and improve platform performance.",
      "Develop and improve Quick Retail features.",
      "Communicate important service-related information.",
      "Detect, prevent, and address security or fraudulent activities.",
      "Comply with applicable legal and regulatory requirements.",
    ],
  },
  {
    title: "4. Business Data",
    paragraphs: [
      "Quick Retail allows businesses to enter and manage information relating to their customers, employees, suppliers, products, inventory, and transactions.",
      "The business using Quick Retail is responsible for ensuring that information it collects and enters into the platform is obtained and processed lawfully.",
      "Where a business uses Quick Retail to store information about its customers or employees, the business remains responsible for determining why that information is collected and how it should be used.",
    ],
  },
  {
    title: "5. Customer Information",
    paragraphs: [
      "Businesses may use Quick Retail to maintain customer records for purposes such as sales management, transaction history, customer service, and business reporting.",
      "If your personal information has been entered into Quick Retail by a business, you may need to contact that business directly regarding requests relating to your information, depending on applicable data protection requirements.",
    ],
  },
  {
    title: "6. Sharing of Information",
    paragraphs: ["SBSC does not sell or rent users' personal information."],
    intro: "Information may be shared where reasonably necessary to:",
    items: [
      "Provide and operate Quick Retail.",
      "Maintain and improve our services.",
      "Provide technical, hosting, security, analytics, or other supporting services.",
      "Comply with applicable laws or legal processes.",
      "Protect the rights, property, safety, and security of SBSC, Quick Retail, our users, or others.",
      "Investigate suspected fraud, misuse, or security incidents.",
    ],
    after: [
      "Where third-party service providers are used, they will only receive information necessary to perform the services they provide.",
    ],
  },
  {
    title: "7. Data Security",
    paragraphs: [
      "SBSC takes reasonable technical and organizational measures to protect information handled through Quick Retail against unauthorized access, alteration, disclosure, loss, or misuse.",
      "Users are also responsible for maintaining the confidentiality of their account credentials and should notify SBSC if they suspect unauthorized access to their account.",
      "However, no electronic system, online platform, or method of transmitting information over the internet can be guaranteed to be completely secure.",
    ],
  },
  {
    title: "8. Data Retention",
    intro: "SBSC retains information for as long as reasonably necessary to:",
    items: [
      "Provide Quick Retail services.",
      "Maintain business and transaction records.",
      "Meet contractual obligations.",
      "Comply with applicable legal and regulatory requirements.",
      "Resolve disputes.",
      "Prevent fraud or misuse.",
      "Enforce applicable agreements.",
    ],
    after: [
      "The length of time information is retained may vary depending on the type of information and the purpose for which it was collected.",
    ],
  },
  {
    title: "9. Data Deletion",
    paragraphs: [
      "Users may request deletion of certain personal information, subject to applicable legal, contractual, and operational requirements.",
      "Where information is required to be retained for legal, accounting, security, or legitimate business purposes, SBSC may retain such information for the required period.",
      "Business customers may also be responsible for managing information they have entered into Quick Retail, including customer and employee records.",
    ],
  },
  {
    title: "10. Cookies and Similar Technologies",
    paragraphs: [
      "Quick Retail may use cookies and similar technologies where necessary to provide functionality, maintain user sessions, understand platform usage, improve performance, and enhance the user experience.",
      "Users may be able to manage certain cookie settings through their browser or device.",
      "Disabling certain cookies may affect the functionality of some parts of the platform.",
    ],
  },
  {
    title: "11. Third-Party Services",
    paragraphs: [
      "Quick Retail may use third-party services to support certain aspects of the platform, including hosting, analytics, communications, payment-related services, security, or other technical services.",
      "Where third-party services process personal information, such processing may be governed by the third party's own privacy policy and applicable data protection requirements.",
      "SBSC is not responsible for the privacy practices of third-party services that operate independently from us.",
    ],
  },
  {
    title: "12. User Responsibilities",
    intro: "Users are responsible for:",
    items: [
      "Keeping their login credentials confidential.",
      "Providing accurate information where required.",
      "Ensuring that information entered into Quick Retail is collected and used lawfully.",
      "Using Quick Retail in accordance with applicable laws and our terms of service.",
      "Not attempting to access information belonging to other users without authorization.",
    ],
  },
  {
    title: "13. Children's Privacy",
    paragraphs: [
      "Quick Retail is designed for businesses and retail operations and is not intended to be used directly by children.",
      "SBSC does not knowingly collect personal information directly from children where such collection is prohibited by applicable law.",
    ],
  },
  {
    title: "14. Your Privacy Rights",
    intro:
      "Depending on your location and applicable data protection laws, you may have certain rights regarding your personal information, including the right to:",
    items: [
      "Request access to your personal information.",
      "Request correction of inaccurate information.",
      "Request deletion of certain information.",
      "Object to or restrict certain processing.",
      "Request a copy of certain personal information.",
      "Withdraw consent where processing is based on consent.",
    ],
    after: [
      "Certain rights may be subject to legal or contractual limitations.",
      "Where your information was provided to Quick Retail by a business customer, we may direct your request to that business where appropriate.",
    ],
  },
  {
    title: "15. Changes to This Privacy Policy",
    paragraphs: [
      "SBSC may update this Privacy Policy from time to time to reflect changes in Quick Retail, our business practices, technology, or applicable legal requirements.",
      "When changes are made, we will update the Last Updated date at the beginning of this policy.",
      "Where required, we will provide additional notice of significant changes.",
      "We encourage users to review this Privacy Policy periodically.",
    ],
  },
  {
    title: "16. Contact Us",
    paragraphs: [
      "If you have questions, concerns, or requests regarding this Privacy Policy or how Quick Retail handles information, please contact us:",
    ],
  },
  {
    title: "17. Acceptance",
    paragraphs: [
      "By accessing or using Quick Retail, you acknowledge that you have read and understood this Privacy Policy and understand how information may be collected and processed in connection with your use of the platform.",
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <main className="bg-[#F9FAFB] py-10 sm:py-14">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 font-sans text-[#48464E]">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-clash-medium text-[#101828]">
            Quick Retail Privacy Policy
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#6C6975]">
            Effective Date: {POLICY_DATE}
          </p>
          <p className="text-sm sm:text-base text-[#6C6975]">
            Last Updated: {POLICY_DATE}
          </p>
        </header>

        <div className="space-y-10 text-sm sm:text-base leading-7">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-[#101828] mb-3">
                {section.title}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mb-3">
                  {paragraph}
                </p>
              ))}
              {section.intro && <p className="mb-3">{section.intro}</p>}
              {section.items && (
                <ul className="list-disc pl-5 space-y-1 mb-3">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.after?.map((paragraph) => (
                <p key={paragraph} className="mb-3">
                  {paragraph}
                </p>
              ))}
              {section.subsections?.map((subsection) => (
                <div key={subsection.title} className="mt-6">
                  <h3 className="text-lg font-semibold text-[#101828] mb-2">
                    {subsection.title}
                  </h3>
                  {subsection.intro && <p className="mb-3">{subsection.intro}</p>}
                  {subsection.items && (
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                      {subsection.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {subsection.after?.map((paragraph) => (
                    <p key={paragraph} className="mb-3">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </section>
          ))}

          <section className="rounded-xl border border-[#EAECF0] bg-white p-5 sm:p-6">
            <p>
              <span className="font-semibold">Company:</span> SBSC (Software
              Business Solutions Consulting)
            </p>
            <p>
              <span className="font-semibold">Product:</span> Quick Retail
            </p>
            <p>
              <span className="font-semibold">Address:</span> 27A &amp; B Dele
              Adedeji, Lekki Phase 1, Lagos, Nigeria
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:quickretail@gmail.com"
                className="text-[#F16722] hover:underline"
              >
                quickretail@gmail.com
              </a>
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              <a href="tel:07044501078" className="text-[#F16722] hover:underline">
                07044501078
              </a>
            </p>
            <p>
              <span className="font-semibold">Website:</span>{" "}
              <a
                href="https://www.quick-retail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F16722] hover:underline"
              >
                https://www.quick-retail.com
              </a>
            </p>
          </section>
        </div>
      </article>
    </main>
  );
};

export default PrivacyPolicy;
