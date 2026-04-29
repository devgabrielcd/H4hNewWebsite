import {
  getPrivacyDictionary,
  getShellDictionary,
  localizePath,
} from "@/lib/i18n";

const rightIcons = ["bi bi-eye", "bi bi-pencil", "bi bi-trash"];
const securityIcons = ["bi bi-lock-fill", "bi bi-server"];
const contactIcons = ["bi bi-envelope", "bi bi-geo-alt", "bi bi-telephone"];

export default async function PrivacyPage({ params }) {
  const { lang = "en" } = await params;
  const privacy = getPrivacyDictionary(lang);
  const shell = getShellDictionary(lang);

  return (
    <main className="main">
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1 className="heading-title">{privacy.title}</h1>
                <p className="mb-0">{privacy.intro}</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href={localizePath("/", lang)}>{shell.nav.home}</a></li>
              <li className="current">{privacy.breadcrumb}</li>
            </ol>
          </div>
        </nav>
      </div>
      <section id="privacy" className="privacy section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="privacy-content">
                <div className="last-updated" data-aos="fade-up" data-aos-delay="200">
                  <p><strong>{privacy.updatedLabel}</strong> {privacy.updatedDate}</p>
                </div>

                <div className="privacy-section" data-aos="fade-up" data-aos-delay="300">
                  <h3>{privacy.sections.collected.title}</h3>
                  <p>{privacy.sections.collected.text}</p>
                  <h4>{privacy.sections.collected.personalTitle}</h4>
                  <ul>
                    {privacy.sections.collected.personal.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <h4>{privacy.sections.collected.usageTitle}</h4>
                  <p>{privacy.sections.collected.usageText}</p>
                </div>

                <div className="privacy-section" data-aos="fade-up" data-aos-delay="400">
                  <h3>{privacy.sections.use.title}</h3>
                  <p>{privacy.sections.use.text}</p>
                  <div className="info-box">
                    <h4>{privacy.sections.use.boxTitle}</h4>
                    <ol>
                      {privacy.sections.use.list.map((item) => <li key={item}>{item}</li>)}
                    </ol>
                  </div>
                </div>

                <div className="privacy-section" data-aos="fade-up" data-aos-delay="500">
                  <h3>{privacy.sections.sharing.title}</h3>
                  <p>{privacy.sections.sharing.text}</p>
                  <div className="highlight-box" data-aos="fade-up" data-aos-delay="600">
                    <i className="bi bi-shield-check"></i>
                    <h4>{privacy.sections.sharing.highlightTitle}</h4>
                    <p>{privacy.sections.sharing.highlightText}</p>
                  </div>
                </div>

                <div className="privacy-section" data-aos="fade-up" data-aos-delay="700">
                  <h3>{privacy.sections.security.title}</h3>
                  <p>{privacy.sections.security.text}</p>
                  <div className="security-measures">
                    <div className="row">
                      {privacy.sections.security.items.map((item, index) => (
                        <div className="col-md-6" data-aos={index === 0 ? "fade-right" : "fade-left"} data-aos-delay={800 + index * 100} key={item.title}>
                          <div className="measure-item">
                            <i className={securityIcons[index]}></i>
                            <h5>{item.title}</h5>
                            <p>{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="privacy-section" data-aos="fade-up" data-aos-delay="1000">
                  <h3>{privacy.sections.rights.title}</h3>
                  <p>{privacy.sections.rights.text}</p>
                  <div className="rights-list">
                    {privacy.sections.rights.items.map((item, index) => (
                      <div className="right-item" key={item.title}>
                        <i className={rightIcons[index]}></i>
                        <div>
                          <h5>{item.title}</h5>
                          <p>{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="privacy-section" data-aos="fade-up" data-aos-delay="1100">
                  <h3>{privacy.sections.cookies.title}</h3>
                  <p>{privacy.sections.cookies.text}</p>
                  <div className="cookie-types">
                    <h4>{privacy.sections.cookies.boxTitle}</h4>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            {privacy.sections.cookies.headers.map((header) => <th key={header}>{header}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {privacy.sections.cookies.rows.map((row) => (
                            <tr key={row[0]}>
                              {row.map((cell) => <td key={cell}>{cell}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="privacy-section" data-aos="fade-up" data-aos-delay="1200">
                  <h3>{privacy.sections.changes.title}</h3>
                  <p>{privacy.sections.changes.text}</p>
                </div>

                <div className="contact-section" data-aos="fade-up" data-aos-delay="1300">
                  <h3>{privacy.sections.contact.title}</h3>
                  <p>{privacy.sections.contact.text}</p>
                  <div className="contact-info">
                    {privacy.sections.contact.info.map((item, index) => (
                      <div className="contact-item" key={item}>
                        <i className={contactIcons[index]}></i>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
