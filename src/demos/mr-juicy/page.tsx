"use client";

import { useState, useEffect, useRef } from "react";
import s from "./styles.module.css";

/* ── assets (imported so Next.js handles them) ── */
import logoFull from "./assets/logo-full.svg";
import burgerEmblem from "./assets/burger-emblem.png";
import burgerPhoto from "./assets/burger.jpg";

export default function MrJuicy() {
  const [navOpen, setNavOpen] = useState(false);
  const siteRef = useRef<HTMLDivElement>(null);

  /* scroll-reveal observer */
  useEffect(() => {
    const root = siteRef.current;
    if (!root) return;
    const els = root.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "none";
        }
      }),
      { threshold: 0.12 }
    );
    els.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(30px)";
      (el as HTMLElement).style.transition = "all .8s cubic-bezier(.2,.8,.2,1)";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className={s.site} ref={siteRef}>
      {/* ── NAV ── */}
      <header className={`${s.nav} ${navOpen ? s.navOpen : ""}`}>
        <div className={`${s.container} ${s.navInner}`}>
          <a className={s.brand} href="#">
            <img src={logoFull.src} alt="Mr Juicy" />
          </a>
          <ul className={s.navLinks}>
            <li><a className={s.activeLink} href="#">Home</a></li>
            <li><a href="#">Menu</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
          <a className={`${s.btn} ${s.cta}`} href="#">Order Now</a>
          <button className={s.burgerIcon} aria-label="Menu" onClick={() => setNavOpen(!navOpen)}>
            ☰
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className={s.hero}>
        <div className={s.heroGradient} />
        <div className={`${s.container} ${s.heroGrid}`}>
          <div>
            <span className={s.eyebrow}>★ San Antonio, TX ★</span>
            <h1 className={s.heroTitle}>
              Where <span>Juicy</span><br />Meets Bold.
            </h1>
            <p className={s.heroDesc}>
              A burger isn&rsquo;t just food — it&rsquo;s an experience. Perfectly seared patties,
              signature sauces, and toasted buns crafted fresh every day in the heart of San Antonio.
            </p>
            <div className={s.actions}>
              <a className={s.btn} href="#">See the Menu</a>
              <a className={`${s.btn} ${s.btnAlt} ${s.btnDisabled}`} href="#">
                Order Online <span className={s.badge}>Soon</span>
              </a>
            </div>
          </div>
          <div className={s.heroBurger}>
            <img src={burgerEmblem.src} alt="Mr Juicy burger" />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className={s.stripe} aria-hidden="true">
        <div className={s.track}>
          <span>Fresh Daily</span><span>Premium Angus</span>
          <span>House-Made Sauces</span><span>Texas Proud</span>
          <span>Fresh Daily</span><span>Premium Angus</span>
          <span>House-Made Sauces</span><span>Texas Proud</span>
        </div>
      </div>

      {/* ── FEATURED ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHead} data-reveal>
            <span className={s.eyebrowDark}>Fan Favorites</span>
            <h2>Burgers That Bite Back</h2>
            <p>Our menu is a curated collection of masterpieces — each one designed to deliver an explosion of flavor from the first bite to the last.</p>
          </div>
          <div className={s.cards}>
            {[
              { emoji: "🍔", name: "Double Cheeseburger", desc: "Two juicy beef patties stacked high with double cheese for extra indulgence.", price: "$7" },
              { emoji: "🔥", name: "San Antonio Sizzler", desc: "Our iconic signature burger — bold, smoky, and unapologetically Texas.", price: "Signature" },
              { emoji: "🥪", name: "Chicken Sandwich", desc: "Crispy fried chicken breast with pickles and special seasoning on brioche bun.", price: "$10" },
              { emoji: "🥤", name: "Hand-Spun Shakes", desc: "Strawberry, Nutella, Mint Chip, Peanut Butter — eight flavors of thick, creamy goodness.", price: "$6" },
            ].map((item) => (
              <div className={s.card} key={item.name} data-reveal>
                <div className={s.emoji}>{item.emoji}</div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <span className={s.price}>{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SPLIT ── */}
      <section className={s.section} style={{ paddingTop: 20 }}>
        <div className={s.container}>
          <div className={s.split}>
            <div
              className={s.splitImage}
              data-reveal
              role="img"
              aria-label="Mr Juicy burger"
              style={{ backgroundImage: `url(${burgerPhoto.src})` }}
            />
            <div data-reveal>
              <span className={s.eyebrowDark}>Our Story</span>
              <h2>Craveable Since 1994</h2>
              <p style={{ marginTop: 20, fontSize: "1.1rem" }}>
                At Mr Juicy, quality is our cornerstone. We hand-pick the freshest ingredients
                daily — from sustainably sourced premium Angus beef to crisp, locally-sourced
                vegetables. Every component is selected to ensure a superior taste experience
                that consistently exceeds expectations.
              </p>
              <div className={s.stats}>
                {[
                  { num: "26", lbl: "Years Serving" },
                  { num: "12", lbl: "Charities Supported" },
                  { num: "$25K+", lbl: "Raised for Community" },
                  { num: "2,000+", lbl: "Volunteer Hours" },
                ].map((stat) => (
                  <div className={s.stat} key={stat.lbl}>
                    <div className={s.statNum}>{stat.num}</div>
                    <div className={s.statLbl}>{stat.lbl}</div>
                  </div>
                ))}
              </div>
              <a className={`${s.btn} ${s.btnDark}`} href="#" style={{ marginTop: 30 }}>
                Read More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className={`${s.section} ${s.bgDark}`}>
        <div className={s.container}>
          <div className={s.sectionHead} data-reveal>
            <span className={s.eyebrowDark}>★ ★ ★ ★ ★</span>
            <h2>Reviews From Our Guests</h2>
            <p>Hear what our community has to say about their Mr Juicy experience.</p>
          </div>
          <div className={s.quotes}>
            {[
              { text: "Hands down the best burger I've had in San Antonio! So incredibly juicy and flavorful. The atmosphere is fantastic too.", who: "Jessica L." },
              { text: "Mr Juicy truly lives up to its name! Every bite was pure perfection. The San Antonio Sizzler is a must-try — bold and delicious!", who: "The O'Connell Family" },
              { text: "The service was as amazing as the food. A perfect spot for a casual dinner with friends. We'll definitely be back often!", who: "Marcus R." },
            ].map((q) => (
              <div className={s.quote} key={q.who} data-reveal>
                <p>{q.text}</p>
                <div className={s.who}>— {q.who}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className={s.section}>
        <div className={`${s.container} ${s.mission}`}>
          <span className={s.eyebrowDark}>Mission</span>
          <h2>&ldquo;Juicy Taste That Captures the Spirit of Texas.&rdquo;</h2>
          <p>
            Our mission is to consistently deliver an unparalleled burger experience, defined by
            the highest quality ingredients, innovative flavors, and genuine hospitality.
          </p>
          <p className={s.owner}>— Andrew Weissman, Owner</p>
        </div>
      </section>

      {/* ── LOCATIONS ── */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHead} data-reveal>
            <span className={s.eyebrowDark}>Find Us</span>
            <h2>Our Locations</h2>
            <p>Start in San Antonio — and keep an eye out, we&rsquo;re growing.</p>
          </div>
          <div className={s.locations}>
            <div className={s.loc} data-reveal>
              <span className={s.tag}>★ Flagship</span>
              <h3>San Pedro Ave</h3>
              <p>3315 San Pedro Ave<br />San Antonio, TX 78212</p>
              <p style={{ marginTop: 10 }}><strong>Hours:</strong> Mon–Sun · 11am–9pm</p>
              <p style={{ marginTop: 6 }}>
                <strong>Phone:</strong>{" "}
                <a href="tel:+12109949838" style={{ color: "var(--lime-dark)", fontWeight: 800 }}>
                  (210) 994-9838
                </a>
              </p>
              <a className={`${s.btn} ${s.btnDark}`} href="#" style={{ marginTop: 18 }}>
                Get Directions
              </a>
            </div>
            <div className={`${s.loc} ${s.locComing}`} data-reveal>
              <span className={`${s.tag} ${s.tagComing}`}>Coming Soon</span>
              <h3>Location #2</h3>
              <p style={{ opacity: 0.7 }}>More San Antonio juiciness is on the way. Stay tuned.</p>
              <a className={`${s.btn} ${s.btnDisabled}`} href="#" style={{ marginTop: 18 }}>
                Announcement Soon
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXTRAS ── */}
      <section className={`${s.section} ${s.bgDark}`} style={{ paddingTop: 70, paddingBottom: 90 }}>
        <div className={s.container}>
          <div className={s.sectionHead} data-reveal>
            <span className={s.eyebrowDark}>More Ways to Juicy</span>
            <h2>Catering, Gift Cards &amp; Merch</h2>
          </div>
          <div className={s.extras}>
            {[
              { ico: "🎉", title: "Catering", desc: "Feeding a team, party, or event? Let us bring the juice to you.", hasBtn: true },
              { ico: "🎁", title: "Gift Cards", desc: "The perfect gift for any burger lover in your life.", hasBtn: false },
              { ico: "👕", title: "Merch", desc: "Tees, caps, and stickers featuring the classic lime logo.", hasBtn: false },
              { ico: "📅", title: "Holiday Hours", desc: "Closed Thanksgiving & Christmas Day. All other days 11am–9pm.", hasBtn: false },
            ].map((item) => (
              <div className={s.extra} key={item.title} data-reveal>
                <div className={s.ico}>{item.ico}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
                {item.hasBtn && (
                  <a className={s.btn} href="#" style={{ marginTop: 14 }}>Inquire</a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={s.footer}>
        <div className={s.container}>
          <div className={s.footerGrid}>
            <div>
              <div className={s.brand} style={{ color: "var(--cream)" }}>
                <img src={logoFull.src} alt="Mr Juicy" />
              </div>
              <p style={{ marginTop: 16, opacity: 0.75 }}>
                A burger isn&rsquo;t just food — it&rsquo;s an experience.
                Nestled in the heart of San Antonio.
              </p>
            </div>
            <div>
              <h4>Quick Links</h4>
              <a href="#">Home</a>
              <a href="#">Menu</a>
              <a href="#">About</a>
              <a href="#">Gallery</a>
              <a href="#">Contact</a>
            </div>
            <div>
              <h4>Location &amp; Hours</h4>
              <p>3315 San Pedro Ave<br />San Antonio, TX 78212</p>
              <p style={{ marginTop: 10 }}>Mon – Sun<br />11am – 9pm</p>
            </div>
            <div>
              <h4>Get In Touch</h4>
              <a href="tel:+12109949838">+1-210-994-9838</a>
              <a href="#">mrjuicy.net</a>
            </div>
          </div>
          <div className={s.copy}>
            © {new Date().getFullYear()} Mr Juicy. All rights reserved. · Made with 🔥 in San Antonio
          </div>
        </div>
      </footer>
    </div>
  );
}
