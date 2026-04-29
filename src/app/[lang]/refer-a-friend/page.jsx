import {
  getReferFriendDictionary,
  getShellDictionary,
  localizePath,
} from "@/lib/i18n";
import ReferFriendForm from "@/app/_components/ReferFriendForm";

export default async function ReferFriendPage({ params }) {
  const { lang = "en" } = await params;
  const refer = getReferFriendDictionary(lang);
  const shell = getShellDictionary(lang);

  return (
    <main className="main">
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1 className="heading-title">{refer.title}</h1>
                <p className="mb-0">{refer.intro}</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href={localizePath("/", lang)}>{shell.nav.home}</a></li>
              <li className="current">{refer.breadcrumb}</li>
            </ol>
          </div>
        </nav>
      </div>

      <section className="appointment section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row justify-content-center gy-4">
            <div className="col-lg-8 text-center">
              <div className="appointment-info mb-4">
                <h3>{refer.highlightTitle}</h3>
                <p className="mb-0">{refer.highlightText}</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="appointment-form-wrapper" data-aos="fade-up" data-aos-delay="200">
                <div className="text-center mb-4">
                  <h3>{refer.form.title}</h3>
                </div>
                <ReferFriendForm form={refer.form} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
