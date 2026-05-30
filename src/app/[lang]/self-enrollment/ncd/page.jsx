import SelfEnrollmentPage from "@/app/_components/SelfEnrollmentPage";
import { getSelfEnrollmentDictionary } from "@/lib/i18n";

const partner = {
  slug: "self-enrollment-ncd",
  logo: "/assets/img/partners/ncd-logo.svg",
  enrollmentUrl: "https://enrollment.ncd.com/880978",
  image: "/assets/img/health/staff-8.png",
  featureIcons: ["bi bi-person-badge", "fas fa-tooth", "fas fa-glasses"],
};

export const metadata = { title: "NCD Self Enrollment" };

export default async function NcdSelfEnrollmentPage({ params }) {
  const { lang = "en" } = await params;
  const content = getSelfEnrollmentDictionary(lang).partners.ncd;
  const translatedPartner = {
    ...partner,
    ...content,
    features: content.features.map((feature, index) => ({
      ...feature,
      icon: partner.featureIcons[index],
    })),
  };

  return <SelfEnrollmentPage locale={lang} partner={translatedPartner} />;
}
