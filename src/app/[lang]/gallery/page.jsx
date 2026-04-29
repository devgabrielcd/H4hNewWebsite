import {
  getGalleryDictionary,
  getShellDictionary,
  localizePath,
} from "@/lib/i18n";

const galleryFilters = ["*", ".filter-nature", ".filter-architecture", ".filter-people"];
const galleryClasses = [
  "filter-nature",
  "filter-architecture",
  "filter-people",
  "filter-nature",
  "filter-architecture",
  "filter-people",
  "filter-nature",
  "filter-architecture",
];

export default async function GalleryPage({ params }) {
  const { lang = "en" } = await params;
  const gallery = getGalleryDictionary(lang);
  const shell = getShellDictionary(lang);

  return (
    <main className="main">
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1 className="heading-title">{gallery.title}</h1>
                <p className="mb-0">{gallery.intro}</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href={localizePath("/", lang)}>{shell.nav.home}</a></li>
              <li className="current">{gallery.breadcrumb}</li>
            </ol>
          </div>
        </nav>
      </div>
      <section id="gallery" className="gallery section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
            <ul className="gallery-filters isotope-filters" data-aos="fade-up" data-aos-delay="200">
              {gallery.filters.map((label, index) => (
                <li key={label} data-filter={galleryFilters[index]} className={index === 0 ? "filter-active" : undefined}>
                  {label}
                </li>
              ))}
            </ul>
            <div className="row gallery-grid isotope-container" data-aos="fade-up" data-aos-delay="300">
              {gallery.items.map((item, index) => {
                const imagePath = `/assets/img/gallery/gallery-${index + 1}.webp`;

                return (
                  <div className={`col-xl-3 col-md-4 col-sm-6 gallery-item isotope-item ${galleryClasses[index]}`} key={item.title}>
                    <div className="gallery-card">
                      <div className="gallery-image"><img src={imagePath} className="img-fluid" alt={item.title} /></div>
                      <div className="gallery-overlay">
                        <h4>{item.title}</h4>
                        <p>{item.text}</p>
                        <div className="gallery-actions">
                          <a href={imagePath} title={gallery.viewImage} className="glightbox"><i className="bi bi-eye"></i></a>
                          <a href="#"><i className="bi bi-info-circle"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
