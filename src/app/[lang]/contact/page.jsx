import {
  getContactDictionary,
  getShellDictionary,
  localizePath,
} from "@/lib/i18n";
import ContactForm from "@/app/_components/ContactForm";

const infoIcons = ["bi bi-geo-alt", "bi bi-telephone", "bi bi-envelope"];
const socialClasses = ["twitter", "facebook", "instagram", "linkedin", "youtube"];
const socialIcons = [
  "bi bi-twitter",
  "bi bi-facebook",
  "bi bi-instagram",
  // "bi bi-linkedin",
  // "bi bi-youtube",
];

export default async function ContactPage({ params }) {
  const { lang = "en" } = await params;
  const contact = getContactDictionary(lang);
  const shell = getShellDictionary(lang);

  return (
    <main className="main">
        <div className="page-title">
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1 className="heading-title">{contact.title}</h1>
                  <p className="mb-0">{contact.intro}</p>
                </div>
              </div>
            </div>
          </div>
          <nav className="breadcrumbs">
            <div className="container">
              <ol>
                <li><a href={localizePath("/", lang)}>{shell.nav.home}</a></li>
                <li className="current">{contact.breadcrumb}</li>
              </ol>
            </div>
          </nav>
        </div>
        <section id="contact" className="contact section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              {contact.infoCards.map((card, index) => (
                <div className="col-lg-4" data-aos="fade-up" data-aos-delay={200 + index * 100} key={card.title}>
                  <div className="info-box">
                    <i className={infoIcons[index]}></i>
                    <h3>{card.title}</h3>
                    <p>
                      {card.lines.map((line, lineIndex) => (
                        <span key={line}>
                          {line}
                          {lineIndex < card.lines.length - 1 ? <><br /></> : null}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="row gy-4 mt-4">
              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="500"><div className="map-container"><iframe src="https://www.google.com/maps?q=Health%204%20Haitians%20(H4H%20Insurance)%2C%201000%20NW%2065th%20St%20%23103%2C%20Fort%20Lauderdale%2C%20FL%2033309%2C%20USA&output=embed" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div></div>
              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="600">
                <ContactForm form={contact.form} />
              </div>
            </div>
            <div className="social-links text-center mt-5" data-aos="zoom-in" data-aos-delay="700">
              {socialIcons.map((icon, index) => (
                <a href="#" className={socialClasses[index]} key={icon}><i className={icon}></i></a>
              ))}
            </div>
          </div>
        </section>
    </main>
  );
}
