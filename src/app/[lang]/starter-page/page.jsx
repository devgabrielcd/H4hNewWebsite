import {
  getStarterPageDictionary,
  getShellDictionary,
  localizePath,
} from "@/lib/i18n";

export default async function StarterPagePage({ params }) {
  const { lang = "en" } = await params;
  const starter = getStarterPageDictionary(lang);
  const shell = getShellDictionary(lang);

  return (
    <main className="main">
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1 className="heading-title">{starter.title}</h1>
                <p className="mb-0">{starter.intro}</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href={localizePath("/", lang)}>{shell.nav.home}</a></li>
              <li className="current">{starter.breadcrumb}</li>
            </ol>
          </div>
        </nav>
      </div>
      <section id="starter-section" className="starter-section section">
        <div className="container section-title" data-aos="fade-up">
          <h2>{starter.sectionTitle}</h2>
          <p>{starter.sectionText}</p>
        </div>
        <div className="container" data-aos="fade-up">
          <p>{starter.bodyText}</p>
        </div>
      </section>
    </main>
  );
}
