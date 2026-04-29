import {
  getTermsDictionary,
  getShellDictionary,
  localizePath,
} from "@/lib/i18n";

export default async function TermsPage({ params }) {
  const { lang = "en" } = await params;
  const terms = getTermsDictionary(lang);
  const shell = getShellDictionary(lang);

  return (
    <main className="main">
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1 className="heading-title">{terms.title}</h1>
                <p className="mb-0">{terms.intro}</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href={localizePath("/", lang)}>{shell.nav.home}</a></li>
              <li className="current">{terms.breadcrumb}</li>
            </ol>
          </div>
        </nav>
      </div>
      <section id="terms-of-service" className="terms-of-service section">
        <div className="container" data-aos="fade-up">
          <div className="tos-header text-center" data-aos="fade-up">
            <span className="last-updated">{terms.updated}</span>
            <h2>{terms.headerTitle}</h2>
            <p>{terms.headerText}</p>
          </div>
          <div className="tos-content" data-aos="fade-up" data-aos-delay="200">
            {terms.sections.map((section, index) => (
              <div id={`terms-section-${index + 1}`} className="content-section" key={section.title}>
                <h3>{section.title}</h3>
                <p>{section.text}</p>
                {section.info ? (
                  <div className="info-box">
                    <i className="bi bi-info-circle"></i>
                    <p>{section.info}</p>
                  </div>
                ) : null}
                {section.list ? (
                  <ul className="list-items">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.alertTitle ? (
                  <div className="alert-box">
                    <i className="bi bi-exclamation-triangle"></i>
                    <div className="alert-content">
                      <h5>{section.alertTitle}</h5>
                      <p>{section.alertText}</p>
                    </div>
                  </div>
                ) : null}
                {section.prohibited ? (
                  <div className="prohibited-list">
                    {section.prohibited.map((item) => (
                      <div className="prohibited-item" key={item}>
                        <i className="bi bi-x-circle"></i>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
                {section.boxTitle ? (
                  <div className="disclaimer-box">
                    <p>{section.boxTitle}</p>
                    <ul>
                      {section.boxList.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {section.notice ? (
                  <div className="notice-box">
                    <i className="bi bi-bell"></i>
                    <p>{section.notice}</p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="tos-contact" data-aos="fade-up" data-aos-delay="300">
            <div className="contact-box">
              <div className="contact-icon"><i className="bi bi-envelope"></i></div>
              <div className="contact-content">
                <h4>{terms.contactTitle}</h4>
                <p>{terms.contactText}</p>
                <a href={localizePath("/contact", lang)} className="contact-link">{terms.contactLink}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
