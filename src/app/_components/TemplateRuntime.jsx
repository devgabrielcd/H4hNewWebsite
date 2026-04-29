"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function TemplateRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    const html = document.documentElement;

    html.classList.remove("aos-ready");

    const initAOS = () => {
      if (cancelled) return;

      if (window.AOS) {
        window.AOS.init({
          duration: 600,
          easing: "ease-in-out",
          once: true,
          mirror: false,
        });
        window.AOS.refreshHard?.();
        html.classList.add("aos-ready");
        return;
      }

      attempts += 1;

      if (attempts < 40) {
        window.setTimeout(initAOS, 100);
        return;
      }

      // Keep content visible even if the vendor script fails to load.
      html.classList.add("aos-ready");
    };

    initAOS();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
