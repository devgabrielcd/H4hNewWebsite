import { getServiceDetailSlugs, locales } from "@/lib/i18n";
import ServiceDetailsContent from "../ServiceDetailsContent";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getServiceDetailSlugs(lang).map((slug) => ({ lang, slug }))
  );
}

export default function ServiceDetailsSlugPage({ params }) {
  return <ServiceDetailsContent params={params} />;
}
