"use client";

import { useState } from "react";
import { getFaqDictionary, getShellDictionary, localizePath } from "@/lib/i18n";

export default function FaqPage({ params, lang: providedLang = "en" }) {
  const lang = params?.lang || providedLang;
  const [openIndex, setOpenIndex] = useState(0);
  const faq = getFaqDictionary(lang);
  const shell = getShellDictionary(lang);

  const toggleItem = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? -1 : index));
  };

  return (
    <main className="main">
        <div className="page-title">
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1 className="heading-title">{faq.title}</h1>
                  <p className="mb-0">{faq.description}</p>
                </div>
              </div>
            </div>
          </div>
          <nav className="breadcrumbs">
            <div className="container">
              <ol>
                <li>
                  <a href={localizePath("/", lang)}>{shell.nav.home}</a>
                </li>
                <li className="current">{faq.breadcrumb}</li>
              </ol>
            </div>
          </nav>
        </div>
        <section id="faq" className="faq section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10" data-aos="fade-up" data-aos-delay="100">
                <div className="faq-container">
                  {faq.items.map((item, index) => {
                    const isOpen = openIndex === index;
                    const answerId = `faq-answer-${index}`;

                    return (
                      <div
                        key={item.question}
                        className={`faq-item${isOpen ? " faq-active" : ""}`}
                      >
                        <h3
                          onClick={() => toggleItem(index)}
                          role="button"
                          tabIndex={0}
                          aria-expanded={isOpen}
                          aria-controls={answerId}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              toggleItem(index);
                            }
                          }}
                        >
                          {item.question}
                        </h3>
                        <div
                          id={answerId}
                          className="faq-content"
                          aria-hidden={!isOpen}
                        >
                          <p>{item.answer}</p>
                        </div>
                        <i
                          className="faq-toggle bi bi-chevron-right"
                          onClick={() => toggleItem(index)}
                          aria-hidden="true"
                        ></i>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
    </main>
  );
}
