import {
  getAppointmentDictionary,
  getShellDictionary,
  localizePath,
} from "@/lib/i18n";
import AppointmentForm from "@/app/_components/AppointmentForm";

export default async function AppointmentPage({ params }) {
  const { lang = "en" } = await params;
  const appointment = getAppointmentDictionary(lang);
  const shell = getShellDictionary(lang);

  return (
    <main className="main">
        <div className="page-title">
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1 className="heading-title">{appointment.title}</h1>
                  <p className="mb-0">{appointment.intro}</p>
                </div>
              </div>
            </div>
          </div>
          <nav className="breadcrumbs">
            <div className="container">
              <ol>
                <li><a href={localizePath("/", lang)}>{shell.nav.home}</a></li>
                <li className="current">{appointment.breadcrumb}</li>
              </ol>
            </div>
          </nav>
        </div>
        <section id="appointmnet" className="appointmnet section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="appointment-form-wrapper" data-aos="fade-up" data-aos-delay="200">
              <AppointmentForm form={appointment.form} locale={lang} />
            </div>
          </div>
        </section>
    </main>
  );
}
