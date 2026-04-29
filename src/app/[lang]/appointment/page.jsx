import {
  getAppointmentDictionary,
  getShellDictionary,
  localizePath,
} from "@/lib/i18n";
import AppointmentForm from "@/app/_components/AppointmentForm";

const sidebarIcons = [
  "bi bi-calendar-check",
  "bi bi-stopwatch",
  "bi bi-shield-check",
];

const stepIcons = [
  "bi bi-person-fill",
  "bi bi-calendar-event",
  "bi bi-check-circle",
  "bi bi-heart-pulse",
];

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
            <div className="row gy-4">
              <div className="col-lg-6">
                <div className="appointment-info">
                  <h3>{appointment.sidebar.title}</h3>
                  <p className="mb-4">{appointment.sidebar.text}</p>
                  <div className="info-items">
                    {appointment.sidebar.items.map((item, index) => (
                      <div className="info-item d-flex align-items-center mb-3" data-aos="fade-up" data-aos-delay={200 + index * 50} key={item.title}>
                        <div className="icon-wrapper me-3"><i className={sidebarIcons[index]}></i></div>
                        <div>
                          <h5>{item.title}</h5>
                          <p className="mb-0">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="emergency-contact mt-4" data-aos="fade-up" data-aos-delay="350">
                    <div className="emergency-card p-3">
                      <h6 className="mb-2">
                        <i className="bi bi-telephone-fill me-2"></i>
                        {appointment.sidebar.callTitle}
                      </h6>
                      <p className="mb-0">
                        {appointment.sidebar.callText}{" "}
                        <strong> (786) 397-7167</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="appointment-form-wrapper" data-aos="fade-up" data-aos-delay="200">
                  <AppointmentForm form={appointment.form} />
                </div>
              </div>
            </div>
            <div className="process-steps mt-5" data-aos="fade-up" data-aos-delay="300">
              <div className="row text-center gy-4">
                {appointment.steps.map((step, index) => (
                  <div className="col-lg-3 col-md-6" key={step.title}>
                    <div className="step-item">
                      <div className="step-number">{index + 1}</div>
                      <div className="step-icon"><i className={stepIcons[index]}></i></div>
                      <h5>{step.title}</h5>
                      <p>{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
    </main>
  );
}
