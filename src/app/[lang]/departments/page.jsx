import {
  getDepartmentsDictionary,
  getShellDictionary,
  localizePath,
} from "@/lib/i18n";

const departmentIcons = [
  "fas fa-heartbeat",
  "fas fa-band-aid",
  "fa-solid fa-shield-halved",
  "fa-solid fa-teeth-open",
  "fas fa-eye",
  "fas fa-heartbeat",
];

const departmentImages = [
  "/assets/img/health/cardiology-2.png",
  "/assets/img/health/neurology-3.png",
  "/assets/img/health/consultation-3.png",
  "/assets/img/health/pediatrics-4.png",
  "/assets/img/health/oncology-2.png",
  "/assets/img/health/emergency-4.png",
];

const departmentServiceSlugs = [
  "health-insurance",
  "medicare",
  "life-insurance",
  "dental-vision",
  "final-expense",
  "accident-insurance",
];

export default async function DepartmentsPage({ params }) {
  const { lang = "en" } = await params;
  const departments = getDepartmentsDictionary(lang);
  const shell = getShellDictionary(lang);

  return (
    <main className="main">
        <div className="page-title">
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1 className="heading-title">{departments.title}</h1>
                  <p className="mb-0">{departments.intro}</p>
                </div>
              </div>
            </div>
          </div>
          <nav className="breadcrumbs">
            <div className="container">
              <ol>
                <li><a href={localizePath("/", lang)}>{shell.nav.home}</a></li>
                <li className="current">{departments.breadcrumb}</li>
              </ol>
            </div>
          </nav>
        </div>
        <section id="departments" className="departments section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              {departments.cards.map((card, index) => (
                <div className="col-lg-6" data-aos="zoom-in" data-aos-delay={100 + index * 100} key={card.title}>
                  <div className="department-item">
                    <div className="department-content">
                      <div className="department-header">
                        <div className="department-icon"><i className={departmentIcons[index]}></i></div>
                        <div className="department-info">
                          <h3>{card.title}</h3>
                          <span className="department-category">{card.category}</span>
                        </div>
                      </div>
                      <p>{card.text}</p>
                      <div className="department-features">
                        {card.badges.map((badge) => (
                          <span className="feature-badge" key={badge}>{badge}</span>
                        ))}
                      </div>
                    </div>
                    <div className="department-image">
                      <img src={departmentImages[index]} alt={card.imageAlt} className="img-fluid" />
                      <div className="department-overlay"><span className="department-link"><i className="fas fa-arrow-right"></i></span></div>
                    </div>
                    <a
                      href={localizePath(`/service-details/${departmentServiceSlugs[index]}`, lang)}
                      className="department-card-link"
                      aria-label={`${card.title} ${departments.breadcrumb}`}
                    ></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
    </main>
  );
}
