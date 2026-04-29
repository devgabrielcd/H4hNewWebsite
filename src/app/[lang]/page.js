import { getHomeDictionary, localizePath } from "@/lib/i18n";

const featuredDepartmentIcons = [
  "fas fa-heartbeat",
  "fa-solid fa-teeth",
  "fas fa-eye",
  "fas fa-band-aid",
  "fa-solid fa-heart-circle-check",
];

const featuredServiceIcons = [
  "fas fa-heartbeat",
  "fas fa-band-aid",
  "fa-solid fa-heart-pulse",
  "fas fa-baby",
  "fas fa-ribbon",
  "fas fa-flask",
];

const featuredServiceImages = [
  "/assets/img/health/cardiology-2.webp",
  "/assets/img/health/neurology-3.webp",
  "/assets/img/health/orthopedics-1.webp",
  "/assets/img/health/pediatrics-4.webp",
  "/assets/img/health/oncology-2.webp",
  "/assets/img/health/laboratory-3.webp",
];

const ctaServiceIcons = [
  "fas fa-heartbeat",
  "fas fa-band-aid",
  "fas fa-shield-alt",
];

export default async function IndexPage({ params }) {
  const { lang = "en" } = await params;
  const home = getHomeDictionary(lang);

  return (
    <main className="main">
      <section id="hero" className="hero section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="hero-image" data-aos="fade-right" data-aos-delay="100">
                <img
                  src="/assets/img/health/staff-7.png"
                  alt={home.hero.imageAlt}
                  className="img-fluid main-image"
                />
                <div className="floating-card stats-card" data-aos="fade-up" data-aos-delay="400">
                  {home.hero.stats.map((stat) => (
                    <div className="stat-item" key={stat.label}>
                      <span className="number">{stat.number}</span>
                      <span className="label">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="hero-content" data-aos="fade-left" data-aos-delay="200">
                <h1 className="hero-title">{home.hero.title}</h1>
                <p className="hero-description">{home.hero.description}</p>
                <div className="cta-section">
                  <div className="cta-buttons">
                    <a href={localizePath("/contact", lang)} className="btn btn-primary">
                      {home.hero.primaryCta}
                    </a>
                    <a
                      href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                      className="btn btn-secondary glightbox"
                    >
                      <i className="bi bi-play-circle"></i>
                      {home.hero.secondaryCta}
                    </a>
                  </div>
                  <div className="quick-actions">
                    {home.hero.quickActions.map((label, index) => (
                      <a href="#" className="action-link" key={label}>
                        <i
                          className={
                            index === 0
                              ? "bi bi-calendar-check"
                              : index === 1
                                ? "bi bi-chat-dots"
                                : "bi bi-file-medical"
                          }
                        ></i>
                        <span>{label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="background-elements">
          <div className="bg-shape shape-1"></div>
          <div className="bg-shape shape-2"></div>
          <div className="bg-pattern"></div>
        </div>
      </section>

      <section id="home-about" className="home-about section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center mb-5" data-aos="fade-up" data-aos-delay="150">
              <h2 className="section-heading">{home.about.heading}</h2>
              <p className="lead-description">{home.about.description}</p>
            </div>
          </div>
          <div className="row align-items-center gy-5">
            <div className="col-lg-7" data-aos="fade-right" data-aos-delay="200">
              <div className="image-grid">
                <div className="primary-image">
                  <img
                    src="/assets/img/agents/agent2.png"
                    alt={home.about.images.primaryAlt}
                    className="img-fluid"
                  />
                  <div className="certification-badge">
                    <i className="bi bi-award"></i>
                    <span>{home.about.badge}</span>
                  </div>
                </div>
                <div className="secondary-images">
                  <div className="small-image">
                    <img
                      src="/assets/img/health/consultation-3.webp"
                      alt={home.about.images.secondaryAlt1}
                      className="img-fluid"
                    />
                  </div>
                  <div className="small-image">
                    <img
                      src="/assets/img/agents/agent3.png"
                      alt={home.about.images.secondaryAlt2}
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5" data-aos="fade-left" data-aos-delay="300">
              <div className="content-wrapper">
                <div className="highlight-box">
                  <div className="highlight-icon"><i className="bi bi-heart-pulse-fill"></i></div>
                  <div className="highlight-content">
                    <h4>{home.about.highlightTitle}</h4>
                    <p>{home.about.highlightText}</p>
                  </div>
                </div>
                <div className="feature-list">
                  {home.about.features.map((feature) => (
                    <div className="feature-item" key={feature}>
                      <div className="feature-icon"><i className="bi bi-check-circle-fill"></i></div>
                      <div className="feature-text">{feature}</div>
                    </div>
                  ))}
                </div>
                <div className="metrics-row">
                  {home.about.metrics.map((metric) => (
                    <div className="metric-box" key={metric.label}>
                      <div className="metric-number">
                        <span
                          className="purecounter"
                          data-purecounter-start="0"
                          data-purecounter-end={metric.number}
                          data-purecounter-duration="0"
                        >
                          {metric.number}
                        </span>
                        {metric.suffix}
                      </div>
                      <div className="metric-label">{metric.label}</div>
                    </div>
                  ))}
                </div>
                <div className="action-buttons">
                  <a href={localizePath("/services", lang)} className="btn-explore">
                    {home.about.explore}
                  </a>
                  <a href={localizePath("/contact", lang)} className="btn-contact">
                    <i className="bi bi-telephone"></i>
                    {home.about.contact}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="featured-departments" className="featured-departments section">
        <div className="container section-title" data-aos="fade-up">
          <h2>{home.featuredDepartments.title}</h2>
          <p>{home.featuredDepartments.description}</p>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="departments-showcase">
            <div className="featured-department" data-aos="fade-up" data-aos-delay="200">
              <div className="row align-items-center">
                <div className="col-lg-6 order-lg-1">
                  <div className="department-content">
                    <div className="department-category">
                      {home.featuredDepartments.featured.category}
                    </div>
                    <h2 className="department-title">
                      {home.featuredDepartments.featured.title}
                    </h2>
                    <p className="department-description">
                      {home.featuredDepartments.featured.description}
                    </p>
                    <div className="department-features">
                      {home.featuredDepartments.featured.features.map((feature) => (
                        <div className="feature-item" key={feature}>
                          <i className="fas fa-check-circle"></i>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <a href={localizePath("/department-details", lang)} className="cta-link">
                      {home.featuredDepartments.featured.cta}
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
                <div className="col-lg-6 order-lg-2">
                  <div className="department-visual">
                    <div className="image-wrapper">
                      <img
                        src="/assets/img/plans/plans.png"
                        alt={home.featuredDepartments.featured.imageAlt}
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="departments-grid">
              <div className="row">
                {home.featuredDepartments.cards.map((card, index) => (
                  <div
                    className="col-lg-4 col-md-6"
                    data-aos="fade-up"
                    data-aos-delay={300 + index * 50}
                    key={card.title}
                  >
                    <div className="department-card">
                      <div className="card-icon">
                        <i className={featuredDepartmentIcons[index]}></i>
                      </div>
                      <div className="card-content">
                        <h3 className="card-title">{card.title}</h3>
                        <p className="card-description">{card.description}</p>
                        <div className="card-stats">
                          {card.stats.map((stat) => (
                            <div className="stat-item" key={stat.label}>
                              <span className="stat-number">{stat.number}</span>
                              <span className="stat-label">{stat.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="departments-cta" data-aos="fade-up" data-aos-delay="600">
              <div className="cta-content">
                <h3 className="cta-title">{home.featuredDepartments.ctaTitle}</h3>
                <p className="cta-description">{home.featuredDepartments.ctaDescription}</p>
                <a href={localizePath("/departments", lang)} className="btn btn-primary">
                  {home.featuredDepartments.ctaButton}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="featured-services" className="featured-services section">
        <div className="container section-title" data-aos="fade-up">
          <h2>{home.featuredServices.title}</h2>
          <p>{home.featuredServices.description}</p>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            {home.featuredServices.cards.map((card, index) => (
              <div
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay={index < 3 ? 200 + index * 100 : 200 + (index - 3) * 100}
                key={card.title}
              >
                <div className="service-card">
                  <div className="service-icon">
                    <i className={featuredServiceIcons[index]}></i>
                  </div>
                  <div className="service-image">
                    <img src={featuredServiceImages[index]} alt={card.title} className="img-fluid" loading="lazy" />
                  </div>
                  <div className="service-content">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <a href={localizePath("/service-details", lang)} className="service-link">
                      {home.featuredServices.learnMore}
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="call-to-action" className="call-to-action section light-background">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="hero-content" data-aos="fade-up" data-aos-delay="200">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="content-wrapper">
                  <h2>{home.cta.title}</h2>
                  <p>{home.cta.description}</p>
                  <div className="action-buttons">
                    <a href={localizePath("/appointment", lang)} className="primary-btn">
                      {home.cta.primary}
                    </a>
                    <a href={localizePath("/services", lang)} className="secondary-link">
                      <span>{home.cta.secondary}</span>
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="hero-image" data-aos="zoom-in" data-aos-delay="300">
                  <img
                    src="/assets/img/health/showcase-2.webp"
                    alt={home.cta.imageAlt}
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="stats-section" data-aos="fade-up" data-aos-delay="400">
            <div className="row">
              {home.cta.stats.map((stat) => (
                <div className="col-lg-3 col-md-6" key={stat.label}>
                  <div className="stat-item">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="services-grid" data-aos="fade-up" data-aos-delay="500">
            <div className="row">
              {home.cta.services.map((service, index) => (
                <div className="col-lg-4 col-md-6" key={service.title}>
                  <div className="service-card" data-aos="fade-up" data-aos-delay={100 + index * 100}>
                    <div className="service-icon">
                      <i className={ctaServiceIcons[index]}></i>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <a href={localizePath("/services", lang)} className="service-link">
                      {home.cta.learnMore}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-banner" data-aos="zoom-in" data-aos-delay="600">
            <div className="banner-content">
              <div className="contact-info">
                <div className="contact-icon"><i className="fas fa-phone"></i></div>
                <div className="contact-text">
                  <h5>{home.cta.bannerTitle}</h5>
                  <p>{home.cta.bannerDescription}</p>
                </div>
              </div>
              <div className="contact-actions">
                <a href="tel:+15551234567" className="call-btn">
                  <i className="fas fa-phone"></i>
                  (786) 397-7167
                </a>
                <a href={localizePath("/contact", lang)} className="contact-link">
                  {home.cta.contactLink}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
