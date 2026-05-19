import { getServicesDictionary, getShellDictionary, localizePath } from "@/lib/i18n";

const cardClasses = [
  "primary-care",
  "specialty-care",
  "diagnostics",
  "emergency",
  "maternal",
  "vaccination",
];

const cardIcons = [
  "fas fa-heartbeat",
  "fas fa-band-aid",
  "fa-solid fa-shield-halved",
  "fas fa-eye",
  "fas fa-building",
  "fas fa-file",
];

const serviceSlugs = [
  "health-insurance",
  "life-insurance",
  "medicare",
  "dental-vision",
  "final-expense",
  "accident-insurance",
];

export default async function ServicesPage({ params }) {
  const { lang = "en" } = await params;
  const services = getServicesDictionary(lang);
  const shell = getShellDictionary(lang);

  return (
    <main className="main">
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1 className="heading-title">{services.title}</h1>
                <p className="mb-0">{services.intro}</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href={localizePath("/", lang)}>{shell.nav.home}</a></li>
              <li className="current">{services.breadcrumb}</li>
            </ol>
          </div>
        </nav>
      </div>
      <section id="services" className="services section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="services-grid">
            <div className="row g-4">
              {services.cards.map((card, index) => (
                <div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay={200 + index * 100} key={card.title}>
                  <div className={`service-card ${cardClasses[index]}`}>
                    <div className="service-header">
                      <div className="service-icon"><i className={cardIcons[index]}></i></div>
                      <span className="service-category">{card.category}</span>
                      {card.featured ? (
                        index === 1 ? <div className="featured-badge">{card.featured}</div> : <div className="status-indicator">{card.featured}</div>
                      ) : null}
                    </div>
                    <div className="service-body">
                      <h4>{card.title}</h4>
                      <p>{card.text}</p>
                      <div className="service-features">
                        {card.badges.map((badge) => (
                          <span className="feature-badge" key={badge}>{badge}</span>
                        ))}
                      </div>
                    </div>
                    <div className="service-footer">
                      <a
                        href={localizePath(`/service-details/${serviceSlugs[index]}`, lang)}
                        className="service-btn"
                      >
                        {card.cta}
                        <i className="fas fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="appointment-banner" data-aos="fade-up" data-aos-delay="900">
            <div className="banner-content">
              <div className="banner-text">
                <h3>{services.banner.title}</h3>
                <p>{services.banner.text}</p>
              </div>
              <div className="banner-actions">
                <a href={localizePath("/appointment", lang)} className="btn-primary">{services.banner.primary}</a>
                <a href="tel:+15551234567" className="btn-secondary">
                  <i className="fas fa-phone"></i>
                  {services.banner.secondary}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
