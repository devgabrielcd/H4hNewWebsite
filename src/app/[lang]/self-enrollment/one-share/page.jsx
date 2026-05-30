import SelfEnrollmentPage from "@/app/_components/SelfEnrollmentPage";
import { getSelfEnrollmentDictionary } from "@/lib/i18n";

const partner = {
  slug: "self-enrollment-oneshare",
  logo: "/assets/img/partners/oneshare-logo.svg",
  enrollmentUrl:
    "https://enroll.onesharehealth.com/home?context=U2FsdGVkX1-Xe2E4vedDJFBQEwTKizLDGrO6vBA_vz927CUE6JRJ71aOQ5Nm_ySh0eKQ790nd5Rf-8KUKvqwXLR6iq-ELe9J_fzecrg4b1_0RaLn6_VJZD3SwREjM51_",
  image: "/assets/img/health/oncology-2.png",
  featureIcons: ["bi bi-stopwatch", "bi bi-people", "bi bi-headset"],
};

export const metadata = { title: "One Share Self Enrollment" };

export default async function OneShareSelfEnrollmentPage({ params }) {
  const { lang = "en" } = await params;
  const content = getSelfEnrollmentDictionary(lang).partners.oneShare;
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
