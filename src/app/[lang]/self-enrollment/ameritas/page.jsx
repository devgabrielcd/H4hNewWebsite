import SelfEnrollmentPage from "@/app/_components/SelfEnrollmentPage";
import { getSelfEnrollmentDictionary } from "@/lib/i18n";

const partner = {
  slug: "self-enrollment-ameritas",
  logo: "/assets/img/partners/ameritas-logo.png",
  enrollmentUrl: "https://myplan.ameritas.com/id/010z1711",
  image: "/assets/img/health/pediatrics-4.png",
  featureIcons: ["fas fa-tooth", "fas fa-eye", "bi bi-search"],
};

export const metadata = { title: "Ameritas Self Enrollment" };

export default async function AmeritasSelfEnrollmentPage({ params }) {
  const { lang = "en" } = await params;
  const content = getSelfEnrollmentDictionary(lang).partners.ameritas;
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
