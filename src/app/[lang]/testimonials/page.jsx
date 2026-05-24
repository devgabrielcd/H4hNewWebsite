import {
  getTestimonialsDictionary,
  getShellDictionary,
  localizePath,
} from "@/lib/i18n";

const images = [
  "/assets/img/person/person-f-12.webp",
  "/assets/img/person/person-f-5.webp",
  "/assets/img/person/person-m-12.webp",
  "/assets/img/person/person-f-13.webp",
  "/assets/img/person/person-m-13.webp",
];

export default async function TestimonialsPage({ params }) {
  const { lang = "en" } = await params;
  const testimonials = getTestimonialsDictionary(lang);
  const shell = getShellDictionary(lang);

  return (
    <main className="main">
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1 className="heading-title">{testimonials.title}</h1>
                <p className="mb-0">{testimonials.intro}</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href={localizePath("/", lang)}>{shell.nav.home}</a></li>
              <li className="current">{testimonials.breadcrumb}</li>
            </ol>
          </div>
        </nav>
      </div>
      <section id="testimonials" className="testimonials section">
        <div className="container">
          <div className="row gy-4">
            {testimonials.items.map((item, index) => (
              <div className="col-lg-6" data-aos="fade-up" data-aos-delay={100 + index * 100} key={item.name}>
                <div className="testimonial-item">
                  <img src={images[index]} className="testimonial-img" alt={item.name} />
                  <h3>{item.name}</h3>
                  <div className="stars">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <p>
                    <i className="bi bi-quote quote-icon-left"></i>
                    <span>{item.text}</span>
                    <i className="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
