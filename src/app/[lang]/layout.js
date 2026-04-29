import { notFound } from "next/navigation";
import Footer from "../_components/Footer";
import LanguagePreferenceSync from "../_components/LanguagePreferenceSync";
import Navbar from "../_components/Navbar";
import { hasLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({ children, params }) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  return (
    <>
      <LanguagePreferenceSync locale={lang} />
      <Navbar locale={lang} />
      {children}
      <Footer locale={lang} />
    </>
  );
}
