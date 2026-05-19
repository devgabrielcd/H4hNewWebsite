import {
  getServiceDetailsDictionary,
  getShellDictionary,
  localizePath,
} from "@/lib/i18n";

const cardIcons = ["bi bi-heart-pulse", "bi bi-file", "bi bi-shield-check"];
const bookingIcons = ["bi bi-clock", "bi bi-telephone", "bi bi-geo-alt"];

export default async function ServiceDetailsContent({ params }) {
  const { lang = "en", slug } = await params;
  const service = getServiceDetailsDictionary(lang, slug);
  const shell = getShellDictionary(lang);

  return (
    <main className="main">
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1 className="heading-title">{service.title}</h1>
                <p className="mb-0">{service.intro}</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href={localizePath("/", lang)}>{shell.nav.home}</a></li>
              <li><a href={localizePath("/departments", lang)}>{shell.nav.coverageOptions}</a></li>
              <li className="current">{service.breadcrumb}</li>
            </ol>
          </div>
        </nav>
      </div>
      <section id="service-details-2" className="service-details-2 section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-5">
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="200">
              <div className="service-image">
                <img src={service.image} alt={service.imageAlt} className="img-fluid" />
                <div className="service-tag"><span>{service.tag}</span></div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left" data-aos-delay="300">
              <div className="service-content">
                <h2>{service.heroTitle}</h2>
                <p className="service-tagline">{service.heroTagline}</p>
                {service.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="service-features">
                  <h4>{service.includeTitle}</h4>
                  <ul>
                    {service.includeItems.map((item) => (
                      <li key={item}>
                        <i className="bi bi-check-circle"></i>
                        {" "}{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="service-actions">
                  <a href={localizePath("/appointment", lang)} className="btn-primary">{service.actions.primary}</a>
                  <a href={localizePath("/departments", lang)} className="btn-secondary">{service.actions.secondary}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            {service.cards.map((card, index) => (
              <div className="col-lg-4" data-aos="fade-up" data-aos-delay={100 + index * 100} key={card.title}>
                <div className="service-card">
                  <div className="card-icon"><i className={cardIcons[index]}></i></div>
                  <h4>{card.title}</h4>
                  <p>{card.text}</p>
                  <a href={localizePath("/contact", lang)} className="card-link">
                    <span>{card.cta}</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="row mt-5">
            <div className="col-lg-8" data-aos="fade-right" data-aos-delay="100">
              <div className="booking-section">
                <h3>{service.booking.title}</h3>
                <p>{service.booking.text}</p>
                <div className="availability-info">
                  {service.booking.items.map((item, index) => (
                    <div className="info-item" key={item.label}>
                      <i className={bookingIcons[index]}></i>
                      <div>
                        <strong>{item.label}</strong>
                        <span>{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-4" data-aos="fade-left" data-aos-delay="200">
              <div className="appointment-card">
                <h4>{service.appointmentCard.title}</h4>
                <p>{service.appointmentCard.text}</p>
                <a href={localizePath("/appointment", lang)} className="btn-appointment">{service.appointmentCard.button}</a>
                <div className="contact-alternative">
                  <span>{service.appointmentCard.altLabel}</span>
                  <a href="tel:7863977167">(786) 397-7167</a><br />
                  <a href="tel:8445440663">(844) 544-0663</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
