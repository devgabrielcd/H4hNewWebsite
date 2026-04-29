import {
  getDepartmentDetailsDictionary,
  getShellDictionary,
  localizePath,
} from "@/lib/i18n";

const highlightIcons = ["bi bi-activity", "bi bi-eye", "bi bi-shield-plus"];

export default async function DepartmentDetailsPage({ params }) {
  const { lang = "en" } = await params;
  const details = getDepartmentDetailsDictionary(lang);
  const shell = getShellDictionary(lang);

  return (
    <main className="main">
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1 className="heading-title">{details.title}</h1>
                <p className="mb-0">{details.intro}</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href={localizePath("/", lang)}>{shell.nav.home}</a></li>
              <li className="current">{details.breadcrumb}</li>
            </ol>
          </div>
        </nav>
      </div>
      <section id="department-details" className="department-details section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="department-content" data-aos="fade-right" data-aos-delay="200">
                <div className="department-header">
                  <div className="specialty-tag">
                    <i className="bi bi-heart-pulse"></i>
                    <span>{details.specialty}</span>
                  </div>
                  <h1 className="department-name">{details.heroTitle}</h1>
                  <p className="department-description">{details.heroText}</p>
                </div>
                <div className="service-highlights" data-aos="fade-up" data-aos-delay="300">
                  <h3>{details.highlightsTitle}</h3>
                  <div className="highlights-grid">
                    {details.highlights.map((item, index) => (
                      <div className="highlight-card" key={item.title}>
                        <div className="highlight-icon"><i className={highlightIcons[index]}></i></div>
                        <h4>{item.title}</h4>
                        <p>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="cta-section" data-aos="fade-up" data-aos-delay="400">
                  <a href={localizePath("/appointment", lang)} className="btn-appointment">
                    <i className="bi bi-calendar-plus"></i>
                    <span>{details.cta.button}</span>
                  </a>
                  <div className="contact-quick">
                    <span className="contact-label">{details.cta.label}</span>
                    <span className="contact-number">(786) 397-7167</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="visual-section" data-aos="fade-left" data-aos-delay="300">
                <div className="main-visual">
                  <img
                    src="/assets/img/health/cardiology-3.webp"
                    alt={details.imageAlt}
                    className="img-fluid department-image"
                  />
                  <div className="stats-overlay" data-aos="zoom-in" data-aos-delay="500">
                    {details.stats.map((stat) => (
                      <div className="stat-item" key={stat.label}>
                        <span className="stat-number">{stat.number}</span>
                        <span className="stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="department-details" data-aos="fade-up" data-aos-delay="600">
            <div className="row">
              <div className="col-lg-8">
                <div className="details-content">
                  <h3>{details.detailsTitle}</h3>
                  <p>{details.detailsText}</p>
                  <div className="care-features">
                    {details.features.map((feature) => (
                      <div className="feature-row" key={feature}>
                        <i className="bi bi-check-circle"></i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="info-sidebar" data-aos="fade-left" data-aos-delay="700">
                  <div className="info-card">
                    <h4>{details.advisoryHours.title}</h4>
                    <div className="hours-list">
                      {details.advisoryHours.rows.map((row) => (
                        <div className="hours-item" key={row.label}>
                          <span>{row.label}</span>
                          <span>{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="info-card">
                    <h4>{details.quickLinks.title}</h4>
                    <div className="quick-links">
                      {details.quickLinks.items.map((item) => (
                        <a href={localizePath(item.href, lang)} key={item.label}>
                          <i className="bi bi-arrow-right"></i>
                          <span>{item.label}</span>
                        </a>
                      ))}
                    </div>
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
