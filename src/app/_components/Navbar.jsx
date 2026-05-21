"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSelector from "./LanguageSelector";
import { socialLinks } from "./socialLinks";
import { getShellDictionary, localizePath, removeLocaleFromPathname } from "@/lib/i18n";

function isActive(pathname, path) {
  return pathname === path ? "active" : undefined;
}

export default function Navbar({ locale = "en" }) {
  const rawPathname = usePathname() || "/";
  const pathname = removeLocaleFromPathname(rawPathname);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const t = getShellDictionary(locale);

  useEffect(() => {
    setIsMobileNavOpen(false);
    setIsResourcesOpen(false);
    document.body.classList.remove("mobile-nav-active");
  }, [rawPathname]);

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-active", isMobileNavOpen);

    return () => {
      document.body.classList.remove("mobile-nav-active");
    };
  }, [isMobileNavOpen]);

  function closeMobileNav() {
    setIsMobileNavOpen(false);
    setIsResourcesOpen(false);
  }

  function toggleMobileNav(event) {
    event.preventDefault();
    event.nativeEvent?.stopImmediatePropagation?.();
    setIsMobileNavOpen((current) => !current);
  }

  function toggleResources(event) {
    if (window.innerWidth >= 1200) {
      return;
    }

    event.preventDefault();
    setIsResourcesOpen((current) => !current);
  }

  return (
    <header id="header" className={`header fixed-top${isMobileNavOpen ? " is-mobile-nav-open" : ""}`}>
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
            {socialLinks.map((social) => (
              <a
                href={social.href}
                aria-label={social.label}
                key={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={social.icon} />
              </a>
            ))}
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

        <nav id="navmenu" className={`navmenu${isMobileNavOpen ? " is-mobile-open" : ""}`}>
          <ul>
            <li>
              <Link href={localizePath("/", locale)} className={isActive(pathname, "/")} onClick={closeMobileNav}>
                {t.nav.home}
              </Link>
            </li>
            <li>
              <Link
                href={localizePath("/about", locale)}
                className={isActive(pathname, "/about")}
                onClick={closeMobileNav}
              >
                {t.nav.about}
              </Link>
            </li>
            <li>
              <Link
                href={localizePath("/departments", locale)}
                className={isActive(pathname, "/departments")}
                onClick={closeMobileNav}
              >
                {t.nav.coverageOptions}
              </Link>
            </li>
            <li>
              <Link
                href={localizePath("/services", locale)}
                className={isActive(pathname, "/services")}
                onClick={closeMobileNav}
              >
                {t.nav.plans}
              </Link>
            </li>
            <li className="dropdown">
              <a
                href="#"
                className={isResourcesOpen ? "active" : undefined}
                onClick={toggleResources}
                aria-expanded={isResourcesOpen}
              >
                <span>{t.nav.resources}</span>{" "}
                <i className="bi bi-chevron-down" />
              </a>
              <ul className={isResourcesOpen ? "dropdown-active" : undefined}>
                <li>
                  <Link
                    href={localizePath("/department-details", locale)}
                    className={isActive(pathname, "/department-details")}
                    onClick={closeMobileNav}
                  >
                    {t.nav.departmentDetails}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizePath("/service-details", locale)}
                    className={isActive(pathname, "/service-details")}
                    onClick={closeMobileNav}
                  >
                    {t.nav.serviceDetails}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizePath("/testimonials", locale)}
                    className={isActive(pathname, "/testimonials")}
                    onClick={closeMobileNav}
                  >
                    {t.nav.testimonials}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizePath("/refer-a-friend", locale)}
                    className={isActive(pathname, "/refer-a-friend")}
                    onClick={closeMobileNav}
                  >
                    {t.nav.referFriend}
                  </Link>
                </li>
                <li>
                  <Link href={localizePath("/faq", locale)} className={isActive(pathname, "/faq")} onClick={closeMobileNav}>
                    {t.nav.faq}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizePath("/gallery", locale)}
                    className={isActive(pathname, "/gallery")}
                    onClick={closeMobileNav}
                  >
                    {t.nav.gallery}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizePath("/terms", locale)}
                    className={isActive(pathname, "/terms")}
                    onClick={closeMobileNav}
                  >
                    {t.nav.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizePath("/privacy", locale)}
                    className={isActive(pathname, "/privacy")}
                    onClick={closeMobileNav}
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
                onClick={closeMobileNav}
              >
                {t.nav.contact}
              </Link>
            </li>

          </ul>
          <button
            type="button"
            className={`mobile-nav-toggle d-xl-none bi ${isMobileNavOpen ? "bi-x" : "bi-list"}`}
            aria-label={isMobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileNavOpen}
            onClick={toggleMobileNav}
          />
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
