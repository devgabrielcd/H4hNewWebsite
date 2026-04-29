import {
  getError404Dictionary,
  getShellDictionary,
  localizePath,
} from "@/lib/i18n";

export default async function Error404Page({ params }) {
  const { lang = "en" } = await params;
  const error404 = getError404Dictionary(lang);
  const shell = getShellDictionary(lang);

  return (
    <main className="main">
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1 className="heading-title">{error404.title}</h1>
                <p className="mb-0">{error404.intro}</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href={localizePath("/", lang)}>{shell.nav.home}</a></li>
              <li className="current">{error404.breadcrumb}</li>
            </ol>
          </div>
        </nav>
      </div>
      <section id="error-404" className="error-404 section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="error-wrapper">
            <div className="row align-items-center">
              <div className="col-lg-6" data-aos="fade-right" data-aos-delay="200">
                <div className="error-illustration">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <div className="circle circle-1"></div>
                  <div className="circle circle-2"></div>
                  <div className="circle circle-3"></div>
                </div>
              </div>
              <div className="col-lg-6" data-aos="fade-left" data-aos-delay="300">
                <div className="error-content">
                  <span className="error-badge" data-aos="zoom-in" data-aos-delay="400">{error404.badge}</span>
                  <h1 className="error-code" data-aos="fade-up" data-aos-delay="500">404</h1>
                  <h2 className="error-title" data-aos="fade-up" data-aos-delay="600">{error404.heading}</h2>
                  <p className="error-description" data-aos="fade-up" data-aos-delay="700">{error404.text}</p>
                  <div className="error-actions" data-aos="fade-up" data-aos-delay="800">
                    <a href={localizePath("/", lang)} className="btn-home">
                      <i className="bi bi-house-door"></i>
                      {" "}{error404.actions.home}
                    </a>
                    <a href={localizePath("/contact", lang)} className="btn-help">
                      <i className="bi bi-question-circle"></i>
                      {" "}{error404.actions.contact}
                    </a>
                  </div>
                  <div className="error-suggestions" data-aos="fade-up" data-aos-delay="900">
                    <h3>{error404.suggestionsTitle}</h3>
                    <ul>
                      {error404.suggestions.map((item) => (
                        <li key={item.label}>
                          <a href={localizePath(item.href, lang)}>
                            <i className="bi bi-arrow-right-circle"></i>
                            {" "}{item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
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
