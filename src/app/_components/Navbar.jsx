"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSelector from "./LanguageSelector";
import { getShellDictionary, localizePath, removeLocaleFromPathname } from "@/lib/i18n";

function isActive(pathname, path) {
  return pathname === path ? "active" : undefined;
}

export default function Navbar({ locale = "en" }) {
  const pathname = removeLocaleFromPathname(usePathname() || "/");
  const t = getShellDictionary(locale);

  return (
    <header id="header" className="header fixed-top">
      <div className="topbar d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <a href="mailto:info@h4hinsurance.com" className="topbar-contact d-flex align-items-center">
              <i className="bi bi-envelope" aria-hidden="true" />
              <span>info@h4hinsurance.com</span>
            </a>
            <a href="tel:+17863977167" className="topbar-phone d-flex align-items-center">
              <i className="bi bi-phone" aria-hidden="true" />
              <span>(786) 397-7167</span>
            </a>
            <a href="tel:+18445440663" className="topbar-phone d-flex align-items-center">
              <i className="bi bi-telephone" aria-hidden="true" />
              <span>(844) 544-0663</span>
            </a>
          </div>
          <div className="social-links d-none d-md-flex align-items-center">
            <a href="#!" aria-label="Twitter">
              <i className="bi bi-twitter-x" />
            </a>
            <a href="#!" aria-label="Facebook">
              <i className="bi bi-facebook" />
            </a>
            <a href="#!" aria-label="Instagram">
              <i className="bi bi-instagram" />
            </a>
          </div>
        </div>
      </div>

      <div className="container branding position-relative d-flex align-items-center justify-content-between">
        <Link href={localizePath("/", locale)} className="logo d-flex align-items-center">
          <img src="/HHlogoNoBg3.png" alt="H4H Insurance" />
          <h1 className="sitename">
            <span>Health4Haitians</span>
          </h1>
        </Link>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li>
              <Link href={localizePath("/", locale)} className={isActive(pathname, "/")}>
                {t.nav.home}
              </Link>
            </li>
            <li>
              <Link
                href={localizePath("/about", locale)}
                className={isActive(pathname, "/about")}
              >
                {t.nav.about}
              </Link>
            </li>
            <li>
              <Link
                href={localizePath("/departments", locale)}
                className={isActive(pathname, "/departments")}
              >
                {t.nav.coverageOptions}
              </Link>
            </li>
            <li>
              <Link
                href={localizePath("/services", locale)}
                className={isActive(pathname, "/services")}
              >
                {t.nav.plans}
              </Link>
            </li>
            <li className="dropdown">
              <a href="#">
                <span>{t.nav.resources}</span>{" "}
                <i className="bi bi-chevron-down toggle-dropdown" />
              </a>
              <ul>
                <li>
                  <Link
                    href={localizePath("/department-details", locale)}
                    className={isActive(pathname, "/department-details")}
                  >
                    {t.nav.departmentDetails}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizePath("/service-details", locale)}
                    className={isActive(pathname, "/service-details")}
                  >
                    {t.nav.serviceDetails}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizePath("/testimonials", locale)}
                    className={isActive(pathname, "/testimonials")}
                  >
                    {t.nav.testimonials}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizePath("/refer-a-friend", locale)}
                    className={isActive(pathname, "/refer-a-friend")}
                  >
                    {t.nav.referFriend}
                  </Link>
                </li>
                <li>
                  <Link href={localizePath("/faq", locale)} className={isActive(pathname, "/faq")}>
                    {t.nav.faq}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizePath("/gallery", locale)}
                    className={isActive(pathname, "/gallery")}
                  >
                    {t.nav.gallery}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizePath("/terms", locale)}
                    className={isActive(pathname, "/terms")}
                  >
                    {t.nav.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizePath("/privacy", locale)}
                    className={isActive(pathname, "/privacy")}
                  >
                    {t.nav.privacy}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href={localizePath("/contact", locale)}
                className={isActive(pathname, "/contact")}
              >
                {t.nav.contact}
              </Link>
            </li>

          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list" />
        </nav>

        <div className="header-actions">
          <LanguageSelector locale={locale} />
          <Link className="btn-getstarted" href={localizePath("/appointment", locale)}>
            {t.nav.appointment}
          </Link>
        </div>
      </div>
    </header>
  );
}
