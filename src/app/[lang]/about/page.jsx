import { getAboutDictionary, getShellDictionary, localizePath } from "@/lib/i18n";

const missionIcons = ["bi bi-heart", "bi bi-eye", "bi bi-star"];
const specialtyIcons = [
  "bi bi-activity",
  "bi bi-bandaid",
  "bi bi-person-hearts",
  "bi bi-shield",
  "bi bi-emoji-sunglasses",
  "bi bi-clipboard2-pulse",
];

export default async function AboutPage({ params }) {
  const { lang = "en" } = await params;
  const about = getAboutDictionary(lang);
  const shell = getShellDictionary(lang);

  return (
    <main className="main">
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1 className="heading-title">{about.title}</h1>
                <p className="mb-0">{about.intro}</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href={localizePath("/", lang)}>{shell.nav.home}</a></li>
              <li className="current">{about.breadcrumb}</li>
            </ol>
          </div>
        </nav>
      </div>
      <section id="about" className="about section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="intro-section">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center" data-aos="fade-up" data-aos-delay="100">
                <h2>{about.leadTitle}</h2>
                <p className="lead">{about.leadText}</p>
              </div>
            </div>
          </div>
          <div className="image-stats-section">
            <div className="row align-items-center">
              <div className="col-lg-7" data-aos="fade-right" data-aos-delay="200">
                <div className="image-gallery">
                  <div className="main-image-container">
                    <img src="/assets/img/health/facilities-3.png" className="img-fluid main-image" alt={about.images.mainAlt} />
                  </div>
                  <div className="secondary-images">
                    <img src="/assets/img/health/staff-12.png" className="img-fluid secondary-image" alt={about.images.secondaryAlt1} data-aos="zoom-in" data-aos-delay="400" />
                    <img src="/assets/img/health/consultation-4.png" className="img-fluid secondary-image" alt={about.images.secondaryAlt2} data-aos="zoom-in" data-aos-delay="500" />
                  </div>
                </div>
              </div>
              <div className="col-lg-5" data-aos="fade-left" data-aos-delay="300">
                <div className="stats-content">
                  <h3>{about.partner.title}</h3>
                  <p>{about.partner.text}</p>
                  <div className="stats-list">
                    {about.partner.stats.map((stat) => (
                      <div className="stat-row" key={stat.title}>
                        <div className="stat-number">
                          {stat.number ? (
                            <>
                              <span data-purecounter-start="0" data-purecounter-end={stat.number} data-purecounter-duration="0" className="purecounter">{stat.number}</span>
                              <span>{stat.suffix}</span>
                            </>
                          ) : (
                            <i className="bi bi-check-circle"></i>
                          )}
                        </div>
                        <div className="stat-info">
                          <h5>{stat.title}</h5>
                          <p>{stat.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mission-section" data-aos="fade-up" data-aos-delay="400">
            <div className="row">
              {about.mission.map((item, index) => (
                <div className="col-lg-4" data-aos="fade-up" data-aos-delay={100 + index * 100} key={item.title}>
                  <div className="mission-item">
                    <div className="mission-icon"><i className={missionIcons[index]}></i></div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="specialties-section" data-aos="fade-up" data-aos-delay="500">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h3>{about.specialties.title}</h3>
                <p className="section-description">{about.specialties.text}</p>
              </div>
            </div>
            <div className="row">
              {about.specialties.items.map((item, index) => (
                <div className="col-lg-2 col-md-4 col-sm-6" data-aos="fade-up" data-aos-delay={100 + index * 50} key={item}>
                  <div className="specialty-item">
                    <i className={specialtyIcons[index]}></i>
                    <span>{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="accreditation-section" data-aos="fade-up" data-aos-delay="600">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h3>{about.carriers.title}</h3>
                <p className="section-description">{about.carriers.text}</p>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="accreditation-grid">
                  {about.carriers.logos.map((alt, index) => (
                    <div className="accreditation-item" data-aos="fade-up" data-aos-delay={100 + index * 50} key={alt}>
                      <img src={`/assets/img/clients/client-${index + 1}.png`} className={`img-fluid accreditation-logo accreditation-logo--${["cigna","aetna","anthem","ambetter","florida-blue"][index]}`} alt={alt} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
