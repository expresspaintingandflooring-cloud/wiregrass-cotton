import { useEffect, useState } from "react";
import homeHero from "./imports/photos/home-hero.png";
import shopHero from "./imports/photos/shop-hero.png";
import collectionsHero from "./imports/photos/collections-hero.png";
import cottonBanner from "./imports/photos/cotton-banner.png";
import graphicTees from "./imports/photos/graphic-tees.png";
import hats from "./imports/photos/hats.png";
import hoodies from "./imports/photos/hoodies.png";
import workwear from "./imports/photos/workwear.png";
import dogLovers from "./imports/photos/dog-lovers.png";
import catLovers from "./imports/photos/cat-lovers.png";
import accessories from "./imports/photos/accessories.png";
import newArrivals from "./imports/photos/new-arrivals.png";
import classicTee from "./imports/photos/classic-tee.png";
import southernTee from "./imports/photos/southern-tee.png";
import antlerTee from "./imports/photos/antler-tee.png";
import dogTee from "./imports/photos/dog-tee.png";
import catTee from "./imports/photos/cat-tee.png";
import hoodieProduct from "./imports/photos/hoodie-product.png";
import truckerHat from "./imports/photos/trucker-hat.png";
import campMug from "./imports/photos/camp-mug.png";
import logoFile from "./imports/logo.png";

type Page =
  | "home" | "shop" | "collections" | "story" | "contact" | "account"
  | "newarrivals" | "tracking" | "help" | "cart" | "search" | "sizeguide" | "shipping" | "faq";

type CartItem = { name: string; price: string; image: string; color: string; qty: number };

type IconName =
  | "search" | "bag" | "menu" | "close" | "truck" | "shield" | "leaf"
  | "people" | "mail" | "box" | "heart" | "gift" | "gear" | "logout"
  | "pin" | "card" | "phone" | "chat" | "check" | "user" | "house" | "star"
  | "tree" | "mountain" | "waves";

const pageFromHash = (): Page => {
  const hash = window.location.hash.replace("#/", "");
  const map: Record<string, Page> = {
    "": "home", "shop": "shop", "collections": "collections",
    "story": "story", "contact": "contact", "account": "account",
    "newarrivals": "newarrivals", "tracking": "tracking", "help": "help",
    "cart": "cart", "search": "search", "sizeguide": "sizeguide", "shipping": "shipping",
    "faq": "faq",
  };
  return map[hash] ?? "home";
};

const images = {
  homeHero, shopHero, collectionsHero,
  cotton: cottonBanner, cottonWide: cottonBanner,
  man: workwear, manHat: hats, manShirt: graphicTees, hoodie: hoodies,
  field: newArrivals, dog: dogLovers, cat: catLovers,
};

const collectionData: [string, string, string, string][] = [
  ["GRAPHIC TEES", "STATEMENTS FOR EVERYDAY LIFE.", graphicTees, "SHOP GRAPHIC TEES"],
  ["HATS", "TOP IT OFF RIGHT.", hats, "SHOP HATS"],
  ["HOODIES", "COMFORT THAT GOES FURTHER.", hoodies, "SHOP HOODIES"],
  ["WORKWEAR", "BUILT DIFFERENT.", workwear, "SHOP WORKWEAR"],
  ["DOG LOVERS", "GOOD DOGS. BETTER DAYS.", dogLovers, "SHOP DOG LOVERS"],
  ["CAT LOVERS", "CATS MAKE LIFE BETTER.", catLovers, "SHOP CAT LOVERS"],
  ["ACCESSORIES", "THE FINISHING TOUCH.", accessories, "SHOP ACCESSORIES"],
  ["NEW ARRIVALS", "FRESH DROPS. SAME VALUES.", newArrivals, "SHOP NEW ARRIVALS"],
];

const productData = [
  { name: "Classic Logo Tee", price: "$29.99", image: classicTee, color: "#26372b", rating: 4.8 },
  { name: "Southern Roots Tee", price: "$29.99", image: southernTee, color: "#b08a62", rating: 4.7 },
  { name: "Antler Tee", price: "$29.99", image: antlerTee, color: "#111814", rating: 4.9 },
  { name: "Good Dogs Tee", price: "$29.99", image: dogTee, color: "#ded8ca", rating: 4.6 },
  { name: "Cat Lovers Tee", price: "$29.99", image: catTee, color: "#1b2420", rating: 4.5 },
  { name: "Signature Hoodie", price: "$54.99", image: hoodieProduct, color: "#354237", rating: 4.9 },
  { name: "Heritage Trucker Hat", price: "$27.99", image: truckerHat, color: "#7e593c", rating: 4.7 },
  { name: "Insulated Camp Mug", price: "$24.99", image: campMug, color: "#26372b", rating: 4.6 },
];

const storyFaqs = [
  { q: "Where is my order?", a: "You can track your order using your order number on our Order Tracking page. Orders typically ship within 1-2 business days." },
  { q: "What is your return policy?", a: "We offer free returns within 30 days of delivery on all unworn items with original tags attached." },
  { q: "How long does shipping take?", a: "Standard shipping takes 5-7 business days. Expedited options (2-3 days) are available at checkout." },
  { q: "Do you offer wholesale?", a: "Yes! We love working with like-minded retailers. Reach out to partnerships@wiregrasscottonco.com for wholesale inquiries." },
  { q: "Can I change or cancel my order?", a: "Orders can be modified or cancelled within 1 hour of placement. Contact us immediately at orders@wiregrasscottonco.com." },
];

// ── Icons ──────────────────────────────────────────────────────
function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bag: <><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    menu: <><path d="M3 6h18M3 12h18M3 18h18" /></>,
    close: <path d="m5 5 14 14M19 5 5 19" />,
    truck: <><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
    shield: <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
    leaf: <><path d="M20 4C11 4 5 8 5 15c0 2 1 4 3 5 0-8 5-11 12-16Z" /><path d="M4 21c3-5 7-8 12-10" /></>,
    people: <><circle cx="8" cy="8" r="3" /><circle cx="17" cy="8" r="3" /><path d="M2 20v-4c0-3 2-5 6-5s6 2 6 5v4M14 12c4 0 7 1 7 5v3" /></>,
    mail: <><rect x="2" y="5" width="20" height="14" /><path d="m3 7 9 7 9-7" /></>,
    box: <><path d="M3 6l9-4 9 4v10l-9 4-9-4V6Z" /><path d="M3 6l9 4 9-4M12 10v10" /></>,
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l8.84 8.84 8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />,
    gift: <><rect x="3" y="8" width="18" height="13" /><path d="M3 8h18M12 2v6M8 4s-2 2 0 4c1-4 4-4 4-4M16 4s2 2 0 4c-1-4-4-4-4-4" /></>,
    gear: <><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
    pin: <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
    card: <><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />,
    chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    check: <polyline points="20 6 9 17 4 12" />,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
    house: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
    tree: <><path d="M12 2L4 14h5v6h6v-6h5L12 2z" /></>,
    mountain: <><path d="M3 20l6-10 3 5 3-7 6 12H3z" /></>,
    waves: <><path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0" /></>,
  };
  return <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <img
      src={logoFile}
      alt="Wiregrass and Cotton Co."
      className={`brand-logo ${light ? "brand-logo-light" : ""}`}
    />
  );
}

// ── Header ────────────────────────────────────────────────────
function Header({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [open, setOpen] = useState(false);
  const go = (next: Page) => { setOpen(false); setPage(next); };
  const navItems: [Page, string][] = [
    ["home", "HOME"], ["shop", "SHOP"], ["collections", "COLLECTIONS"],
    ["newarrivals", "NEW ARRIVALS"], ["story", "OUR STORY"], ["contact", "CONTACT"],
  ];
  return (
    <>
      <div className="announcement">
        <span>FREE SHIPPING ON ORDERS $75+</span>
        <strong>SIMPLE THINGS. A BETTER LIFE.™</strong>
        <span className="ann-links">
          <button onClick={() => go("account")}>MY ACCOUNT</button>
          <span className="ann-sep"> | </span>
          <button onClick={() => go("tracking")}>ORDER TRACKING</button>
          <span className="ann-sep"> | </span>
          <button onClick={() => go("help")}>HELP</button>
        </span>
      </div>
      <header className="header">
        <a className="logo-link" href="#/" onClick={(e) => { e.preventDefault(); go("home"); }}><Brand /></a>
        <nav className={`nav ${open ? "nav-open" : ""}`} aria-label="Main navigation">
          {navItems.map(([key, label]) => (
            <a
              key={key}
              className={page === key ? "active" : ""}
              href={key === "home" ? "#/" : `#/${key}`}
              onClick={(e) => { e.preventDefault(); go(key); }}
            >{label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button aria-label="Search" onClick={() => go("search")}><Icon name="search" /></button>
          <button className="bag" aria-label="Shopping bag" onClick={() => go("cart")}>
            <Icon name="bag" /><b id="cart-badge">0</b>
          </button>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </header>
    </>
  );
}

// ── Feature Bar ───────────────────────────────────────────────
const featureItems = [
  { icon: "truck" as IconName, title: "FAST SHIPPING", text: "Orders $75+" },
  { icon: "shield" as IconName, title: "SECURE CHECKOUT", text: "Shop with confidence" },
  { icon: "leaf" as IconName, title: "PREMIUM QUALITY", text: "Built to last" },
  { icon: "people" as IconName, title: "A REAL COMMUNITY", text: "More than a brand" },
];

function FeatureBar() {
  return (
    <section className="feature-bar">
      {featureItems.map((item) => (
        <div className="feature" key={item.title}>
          <Icon name={item.icon} />
          <div><b>{item.title}</b><span>{item.text}</span></div>
        </div>
      ))}
    </section>
  );
}

// ── Social Icons ──────────────────────────────────────────────
function SocialIcons() {
  return (
    <div className="social-icons" aria-label="Social media links">
      <svg className="social-icon" viewBox="0 0 24 24" aria-label="Instagram" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="0" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="var(--pine)" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="var(--pine)" />
      </svg>
      <svg className="social-icon" viewBox="0 0 24 24" aria-label="Facebook" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
      <svg className="social-icon" viewBox="0 0 24 24" aria-label="TikTok" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.95a8.2 8.2 0 0 0 4.78 1.52V7.01a4.85 4.85 0 0 1-1.01-.32z" />
      </svg>
      <svg className="social-icon" viewBox="0 0 24 24" aria-label="YouTube" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20.05 12 20.05 12 20.05s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--pine)" />
      </svg>
      <svg className="social-icon" viewBox="0 0 24 24" aria-label="Pinterest" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.19-.77 1.27-5.37 1.27-5.37s-.32-.65-.32-1.61c0-1.51.88-2.64 1.97-2.64.93 0 1.38.7 1.38 1.54 0 .94-.6 2.34-.91 3.64-.26 1.09.54 1.97 1.6 1.97 1.92 0 3.2-2.47 3.2-5.39 0-2.22-1.49-3.88-4.18-3.88-3.04 0-4.92 2.27-4.92 4.8 0 .87.26 1.49.67 1.96.18.22.21.31.14.56-.05.19-.16.64-.2.82-.07.26-.28.35-.51.26-1.41-.58-2.07-2.13-2.07-3.88 0-2.88 2.43-6.36 7.25-6.36 3.89 0 6.45 2.82 6.45 5.85 0 4.01-2.22 7-5.44 7-1.09 0-2.11-.59-2.46-1.25l-.71 2.65c-.25.96-.94 2.16-1.41 2.9.77.24 1.59.37 2.43.37 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
      </svg>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer({ setPage }: { setPage: (p: Page) => void }) {
  const go = (p: Page) => { setPage(p); };
  return (
    <footer id="footer">
      <div className="newsletter">
        <Icon name="mail" />
        <div><h3>JOIN OUR CREW</h3><p>Get updates on new drops, exclusive offers and more.</p></div>
        <form onSubmit={(e) => e.preventDefault()}><input aria-label="Email address" placeholder="Enter your email" type="email" /><button>SIGN UP</button></form>
        <div className="handwritten">More Than a Hat...<br />It&apos;s A Lifestyle!</div>
      </div>
      <div className="footer-main">
        <div>
          <Brand light />
          <p className="tagline">SIMPLE THINGS. A BETTER LIFE.™</p>
        </div>
        <div className="footer-links">
          <div>
            <b>SHOP</b>
            <a href="#/shop" onClick={() => go("shop")}>All Products</a>
            <a href="#/newarrivals" onClick={() => go("newarrivals")}>New Arrivals</a>
            <a href="#/shop" onClick={() => go("shop")}>T-Shirts</a>
            <a href="#/shop" onClick={() => go("shop")}>Hoodies</a>
            <a href="#/shop" onClick={() => go("shop")}>Hats</a>
            <a href="#/shop" onClick={() => go("shop")}>Accessories</a>
            <a href="#/collections" onClick={() => go("collections")}>Collections</a>
          </div>
          <div>
            <b>COMPANY</b>
            <a href="#/story" onClick={() => go("story")}>Our Story</a>
            <a href="#/contact" onClick={() => go("contact")}>Contact</a>
            <a href="#/faq" onClick={() => go("faq")}>FAQs</a>
            <a href="#/help" onClick={() => go("help")}>Help Center</a>
            <a href="#/shipping" onClick={() => go("shipping")}>Shipping &amp; Returns</a>
            <a href="#/sizeguide" onClick={() => go("sizeguide")}>Size Guide</a>
            <a href="#/tracking" onClick={() => go("tracking")}>Track Order</a>
          </div>
          <div>
            <b>CONNECT</b>
            <SocialIcons />
            <span>#WiregrassLife</span>
          </div>
        </div>
        <div className="footer-cotton">
          <img src={cottonBanner} alt="Cotton blossoms" />
          <div className="footer-cotton-text">SOUTHERN ROOTS.<br />MODERN LIVING.<br />TIMELESS STYLE.</div>
        </div>
      </div>
      <div className="copyright">
        <span>© 2026 Wiregrass &amp; Cotton Co. All rights reserved.</span>
        <span>SIMPLE THINGS. A BETTER LIFE.™</span>
      </div>
    </footer>
  );
}

// ── Shared Components ─────────────────────────────────────────
function QuoteBanner({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <section className="quote-banner">
      <img className="section-photo" src={images.cottonWide} alt="Cotton field at sunset" />
      <div className="handwritten">More Than a Hat...<br />It&apos;s A Lifestyle!</div>
      <h2>SIMPLE THINGS.<br />A BETTER LIFE.™</h2>
      <button className="outline" onClick={() => setPage("collections")}>SHOP ALL COLLECTIONS <span>→</span></button>
    </section>
  );
}

function CollectionGrid({ setPage, compact = false }: { setPage: (p: Page) => void; compact?: boolean }) {
  return (
    <div className={`collection-grid ${compact ? "compact-grid" : ""}`}>
      {collectionData.slice(0, compact ? 4 : 8).map(([title, subtitle, image, cta]) => (
        <article className="collection-card" key={title}>
          <img src={image} alt="" />
          <div>
            <h3>{title}</h3>
            <p>{subtitle}</p>
            <button onClick={() => setPage("shop")}>{cta} <span>→</span></button>
          </div>
        </article>
      ))}
    </div>
  );
}

// ── Star Rating ───────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= full ? "star-full" : (i === full + 1 && half ? "star-half" : "star-empty")}
        >★</span>
      ))}
      <span className="star-count">({Math.floor(rating * 25 + 100)})</span>
    </div>
  );
}

function ProductCard({ name, price, image, color, rating, onAdd }: {
  name: string; price: string; image: string; color: string; rating?: number; onAdd: () => void;
}) {
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);
  const handleAdd = () => {
    setAdded(true);
    onAdd();
    setTimeout(() => setAdded(false), 2000);
  };
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />
        <button
          className={`product-wishlist ${liked ? "product-wishlist-active" : ""}`}
          onClick={() => setLiked(!liked)}
          aria-label="Toggle wishlist"
        >
          <Icon name="heart" />
        </button>
      </div>
      <h3>{name}</h3>
      {rating !== undefined && <StarRating rating={rating} />}
      <b>{price}</b>
      <div className="product-swatches">
        <i style={{ backgroundColor: color }} />
        <i style={{ backgroundColor: "#ded8ca" }} />
        <i style={{ backgroundColor: "#2a2e2c" }} />
      </div>
      <button className={added ? "added" : ""} onClick={handleAdd}>{added ? "ADDED ✓" : "ADD TO CART"}</button>
    </article>
  );
}

function Filter({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="filter-group">
      <b>{title}<span>⌃</span></b>
      {values.map((v) => <label key={v}><input type="checkbox" /> {v}</label>)}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && <div className="faq-a">{a}</div>}
    </div>
  );
}

// ── Shared Page Hero ──────────────────────────────────────────
function PageHero({ img, eyebrow, title, subtitle, tagline, centered }: {
  img: string; eyebrow?: string; title: string; subtitle?: string; tagline?: string; centered?: boolean;
}) {
  return (
    <section className="pg-hero">
      <img className="section-photo" src={img} alt="" />
      <div className={centered ? "pg-hero-center" : "pg-hero-left"}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {tagline && <span className="pg-hero-tagline">{tagline}</span>}
        {centered && <hr className="pg-hero-rule" />}
      </div>
      <div className="handwritten pg-hero-script">More Than a Hat...<br />It&apos;s A Lifestyle!</div>
    </section>
  );
}

// ── Home Page ─────────────────────────────────────────────────
function Home({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <main>
      <section className="home-hero">
        <img className="section-photo" src={images.homeHero} alt="Wiregrass model wearing the heritage collection" />
        <div className="hero-copy">
          <span className="eyebrow">SOUTHERN ROOTS. MODERN LIVING.</span>
          <h1>BUILT FOR THE LIFE<br />YOU ACTUALLY LIVE.</h1>
          <p>Quality apparel, timeless character, and comfort made for wherever the day takes you.</p>
          <div className="button-row">
            <button className="primary" onClick={() => setPage("shop")}>SHOP NOW <span>→</span></button>
            <button className="outline" onClick={() => setPage("collections")}>EXPLORE COLLECTIONS</button>
          </div>
        </div>
      </section>
      <section className="home-intro" id="story">
        <span className="eyebrow dark">OUR WAY OF LIFE</span>
        <h2>SIMPLE THINGS.<br /><em>A BETTER LIFE.</em></h2>
        <p>Rooted in Southern tradition and made for modern living. We create honest goods that feel right from the very first wear.</p>
      </section>
      <section className="home-feature">
        <div className="feature-photo"><img src={images.cotton} alt="Cotton field at golden hour" /></div>
        <div className="feature-copy">
          <span className="eyebrow">THE WIREGRASS STANDARD</span>
          <h2>Made to last.<br />Made to live in.</h2>
          <p>Easy-wearing staples inspired by open fields, long days, and the people who know that the good life is built one honest moment at a time.</p>
          <button className="text-link" onClick={() => setPage("collections")}>OUR COLLECTIONS <span>→</span></button>
        </div>
      </section>
      <section className="section-heading"><span>SHOP THE LIFE</span><h2>Find your everyday favorite.</h2></section>
      <CollectionGrid setPage={setPage} compact />
      <QuoteBanner setPage={setPage} />
      <FeatureBar />
    </main>
  );
}

// ── Shop Page ─────────────────────────────────────────────────
function Shop({ setPage, addToCart }: { setPage: (p: Page) => void; addToCart: (item: Omit<CartItem, "qty">) => void }) {
  return (
    <main>
      <section className="shop-hero">
        <img className="section-photo" src={images.shopHero} alt="Wiregrass workwear collection" />
        <div>
          <h1>SHOP</h1>
          <h2>QUALITY APPAREL FOR A MORE GROUNDED LIFE.</h2>
          <p>SOUTHERN ROOTS. MODERN LIVING. TIMELESS STYLE.</p>
        </div>
      </section>
      <div className="category-strip">
        {collectionData.slice(0, 7).map(([title, , image]) => (
          <button key={title}><img src={image} alt="" /><span>{title}</span></button>
        ))}
        <button className="all-collections" onClick={() => setPage("collections")}>ALL<br />COLLECTIONS<br />→</button>
      </div>
      <section className="shop-layout">
        <aside className="filters">
          <div className="filter-title"><b>FILTERS</b><u>Clear All</u></div>
          <Filter title="Category" values={["T-Shirts", "Hoodies", "Hats", "Accessories", "Workwear", "Dog Lovers", "Cat Lovers", "New Arrivals"]} />
          <Filter title="Size" values={["S", "M", "L", "XL", "2XL", "3XL"]} />
          <div className="filter-group"><b>Color</b><div className="swatches">{["#101713", "#b8bbb9", "#f4f3ed", "#354237", "#b19a7c", "#31465b", "#6c4934", "#781824"].map((c) => <i key={c} style={{ backgroundColor: c }} />)}</div></div>
          <div className="filter-group"><b>Price</b><input type="range" aria-label="Maximum price" /><div className="price"><span>$0</span><span>$100</span></div></div>
        </aside>
        <div className="products-area">
          <div className="product-toolbar">
            <b>ALL PRODUCTS (48)</b>
            <select aria-label="Sort products"><option>Sort by: Featured</option><option>Price: Low to High</option><option>Newest</option></select>
          </div>
          <div className="product-grid">
            {productData.map((p) => (
              <ProductCard key={p.name} {...p} onAdd={() => addToCart(p)} />
            ))}
          </div>
        </div>
      </section>
      <QuoteBanner setPage={setPage} />
      <FeatureBar />
    </main>
  );
}

// ── Collections Page ──────────────────────────────────────────
function Collections({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <main>
      <section className="collections-hero">
        <img className="section-photo" src={images.collectionsHero} alt="Wiregrass heritage hat collection" />
        <div>
          <span>EXPLORE OUR</span>
          <h1>COLLECTIONS</h1>
          <p>DIFFERENT LIFESTYLES. SAME VALUES.</p>
          <button className="primary" onClick={() => setPage("shop")}>SHOP ALL COLLECTIONS <span>→</span></button>
        </div>
        <div className="handwritten">More<br />Than a Hat...<br />It&apos;s A Lifestyle!</div>
      </section>
      <div className="breadcrumb">
        <span>Home &nbsp;/&nbsp; Collections</span>
        <b>SOUTHERN ROOTS. MODERN LIVING. TIMELESS STYLE.</b>
      </div>
      <CollectionGrid setPage={setPage} />
      <QuoteBanner setPage={setPage} />
      <FeatureBar />
    </main>
  );
}

// ── New Arrivals Page ─────────────────────────────────────────
function NewArrivals({ setPage, addToCart }: { setPage: (p: Page) => void; addToCart: (item: Omit<CartItem, "qty">) => void }) {
  return (
    <main>
      <section className="arrivals-hero">
        <img className="section-photo" src={images.field} alt="New arrivals" />
        <div>
          <h1>NEW<br />ARRIVALS</h1>
          <h2>FRESH DROPS. SAME VALUES.</h2>
          <p>SOUTHERN ROOTS. MODERN LIVING. TIMELESS STYLE.</p>
        </div>
      </section>
      <div className="breadcrumb">
        <span>Home &nbsp;/&nbsp; New Arrivals</span>
        <b>SOUTHERN ROOTS. MODERN LIVING. TIMELESS STYLE.</b>
      </div>
      <section className="shop-layout" style={{ background: "white", padding: "24px 2% 28px" }}>
        <aside className="filters">
          <div className="filter-title"><b>FILTERS</b><u>Clear All</u></div>
          <Filter title="Category" values={["T-Shirts", "Hoodies", "Hats", "Accessories"]} />
          <Filter title="Size" values={["S", "M", "L", "XL", "2XL", "3XL"]} />
        </aside>
        <div className="products-area">
          <div className="product-toolbar">
            <b>NEW ARRIVALS (8)</b>
            <select aria-label="Sort products"><option>Sort by: Newest</option><option>Price: Low to High</option><option>Featured</option></select>
          </div>
          <div className="product-grid">
            {productData.map((p) => (
              <ProductCard key={p.name} {...p} onAdd={() => addToCart(p)} />
            ))}
          </div>
        </div>
      </section>
      <QuoteBanner setPage={setPage} />
      <FeatureBar />
    </main>
  );
}

// ── Our Story Page ────────────────────────────────────────────
function OurStory({ setPage }: { setPage: (p: Page) => void }) {
  const values = [
    { icon: "leaf" as IconName, label: "QUALITY MATERIALS", sub: "Built to last." },
    { icon: "tree" as IconName, label: "SOUTHERN HERITAGE", sub: "Rooted in tradition." },
    { icon: "mountain" as IconName, label: "OUTDOOR LIVING", sub: "Made for it." },
    { icon: "waves" as IconName, label: "EVERYDAY COMFORT", sub: "Wear it anywhere." },
    { icon: "people" as IconName, label: "A BETTER TOMORROW", sub: "For real people." },
  ];
  return (
    <main>
      <section className="story-hero">
        <img className="section-photo" src={homeHero} alt="Wiregrass heritage lifestyle" />
        <div className="story-hero-inner">
          <div className="story-hero-copy">
            <span className="eyebrow">OUR STORY</span>
            <h1>MORE THAN CLOTHING.<br />IT&apos;S A LIFESTYLE.</h1>
            <p>SOUTHERN ROOTS. MODERN LIVING. TIMELESS STYLE.</p>
          </div>
          <div className="handwritten story-hero-script">More<br />Than a Hat...<br />It&apos;s A Lifestyle!</div>
        </div>
      </section>

      <section className="story-purpose">
        <div className="purpose-text">
          <span className="eyebrow dark" style={{ fontSize: 12, letterSpacing: "3px" }}>OUR PURPOSE</span>
          <h2>SIMPLE THINGS.<br />A BETTER LIFE.™</h2>
          <div className="purpose-rule"></div>
          <p>Wiregrass &amp; Cotton Co. was created for people who value the simple things in life — quality, comfort, and a more grounded way of living. Our apparel and lifestyle essentials are inspired by the Southern lifestyle, built for everyday wear, and designed to remind you to slow down, appreciate what matters, and live a little better.</p>
          <p>From the fields to the outdoors, from hard work to good times, Wiregrass &amp; Cotton Co. is a reflection of real life — authentic, comfortable, and built to last.</p>
          <button className="purpose-cta" onClick={() => setPage("collections")}>OUR COLLECTIONS →</button>
        </div>
        <div className="purpose-img">
          <img src={cottonBanner} alt="Cotton blossoms at golden hour" />
        </div>
        <div className="purpose-values">
          {values.map((v) => (
            <div className="purpose-value" key={v.label}>
              <Icon name={v.icon} />
              <div><b>{v.label}</b><span>{v.sub}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className="story-panels">
        {[
          { label: "OUR ROOTS", title: "SOUTHERN\nINSPIRED.", body: "The Wiregrass represents more than a place — it's a mindset. Hard work, strong values, and a deep appreciation for the land and the people.", img: hats },
          { label: "OUR PEOPLE", title: "BUILT FOR\nREAL LIFE.", body: "For the workers, the dreamers, the outdoorsmen, the families, and everyone who understands that a better life is found in the simple things.", img: hoodies },
          { label: "OUR FUTURE", title: "A BRIGHTER\nTOMORROW.", body: "We're committed to creating quality products, building a strong community, and leaving a positive impact — today and for generations to come.", img: newArrivals },
        ].map((panel) => (
          <div className="story-panel" key={panel.label}>
            <img src={panel.img} alt="" />
            <div className="story-panel-text">
              <span className="eyebrow">{panel.label}</span>
              <h3>{panel.title.split("\n").map((line, i) => <span key={i}>{line}<br /></span>)}</h3>
              <p>{panel.body}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="story-dark-quote">
        <blockquote>
          &ldquo;It&apos;s not just what you wear, it&apos;s how you live.&rdquo;
          <cite>— WIREGRASS &amp; COTTON CO.</cite>
        </blockquote>
        <div className="handwritten story-dark-quote-script">Wiregrass<br />&amp; Cotton Co.</div>
      </section>

      <FeatureBar />
    </main>
  );
}

// ── Contact Page ──────────────────────────────────────────────
function Contact() {
  const [sent, setSent] = useState(false);
  const contactInfo = [
    { icon: "mail" as IconName, label: "Email Us", detail: "support@wiregrasscottonco.com", sub: "We typically respond within 1 business day." },
    { icon: "phone" as IconName, label: "Call Us", detail: "(478) 555-0123", sub: "Mon – Fri: 9AM – 6PM EST" },
    { icon: "chat" as IconName, label: "Live Chat", detail: "Chat with us on the website.", sub: "Mon – Fri: 9AM – 6PM EST" },
    { icon: "pin" as IconName, label: "Business Inquiries", detail: "partnerships@wiregrasscottonco.com", sub: "Wholesale, collaborations, and media." },
    { icon: "people" as IconName, label: "Customer Support", detail: "orders@wiregrasscottonco.com", sub: "Order issues, returns, and product support." },
  ];
  return (
    <main>
      <section className="story-hero">
        <img className="section-photo" src={homeHero} alt="Wiregrass team" />
        <div className="story-hero-inner">
          <div className="story-hero-copy">
            <span className="eyebrow">GET IN TOUCH</span>
            <h1>WE&apos;RE HERE<br />FOR YOU.</h1>
            <p>QUESTIONS. SUPPORT. OPPORTUNITIES. LET&apos;S TALK.</p>
          </div>
          <div className="handwritten story-hero-script">More<br />Than a Hat...<br />It&apos;s A Lifestyle!</div>
        </div>
      </section>

      <div className="contact-body">
        <div className="contact-form-section">
          <span className="eyebrow dark" style={{ fontSize: 12, letterSpacing: "3px" }}>CONTACT US</span>
          <h2>LET&apos;S START<br />A CONVERSATION.</h2>
          <p>We&apos;d love to hear from you. Whether you have a question about an order, need help with a product, want to partner, or just want to say hello — our team is here to help.</p>
          {sent ? (
            <div className="contact-sent">
              <div className="conf-check" style={{ margin: "0 0 16px" }}><Icon name="check" /></div>
              <b>Message Sent!</b>
              <p>Thank you for reaching out. We&apos;ll get back to you within 1 business day.</p>
            </div>
          ) : (
            <form className="cform" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="cform-row2">
                <input placeholder="First Name *" required />
                <input placeholder="Last Name *" required />
              </div>
              <input placeholder="Email Address *" type="email" required />
              <div style={{ position: "relative" }}>
                <select aria-label="Subject" required defaultValue="">
                  <option value="" disabled>Subject *</option>
                  <option>General Inquiry</option>
                  <option>Order Issue</option>
                  <option>Product Question</option>
                  <option>Partnership / Wholesale</option>
                  <option>Other</option>
                </select>
              </div>
              <textarea placeholder="Your Message *" required></textarea>
              <button type="submit" className="cform-submit">SEND MESSAGE →</button>
            </form>
          )}
        </div>

        <div className="contact-info-section">
          <h3>CONTACT INFORMATION</h3>
          {contactInfo.map((item) => (
            <div className="contact-info-item" key={item.label}>
              <div className="contact-info-icon"><Icon name={item.icon} /></div>
              <div className="contact-info-text">
                <b>{item.label}</b>
                <span>{item.detail}<br />{item.sub}</span>
              </div>
            </div>
          ))}
          <div className="wholesale-box">
            <div className="wholesale-head">
              <Icon name="people" />
              <div>
                <b>WHOLESALE &amp; PARTNERSHIPS</b>
                <p>Interested in carrying Wiregrass &amp; Cotton Co.? We&apos;d love to connect.</p>
              </div>
            </div>
            <button className="wholesale-btn">INQUIRE NOW →</button>
          </div>
        </div>

        <div className="contact-img-col">
          <img src={workwear} alt="Wiregrass lifestyle" />
        </div>
      </div>

      <div className="contact-faq-section">
        <div className="contact-faq-img">
          <img src={cottonBanner} alt="Cotton field" />
          <div className="contact-faq-img-overlay">
            <p>SOUTHERN ROOTS.<br />MODERN LIVING.<br />TIMELESS STYLE.</p>
          </div>
        </div>
        <div className="contact-faq-right">
          <div className="faq-section-head">
            <h3>FREQUENTLY ASKED QUESTIONS</h3>
            <span className="faq-view-all">View All FAQs →</span>
          </div>
          {storyFaqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </div>

      <FeatureBar />
    </main>
  );
}

// ── My Account Page ───────────────────────────────────────────
function MyAccount({ setPage, addToCart }: { setPage: (p: Page) => void; addToCart: (item: Omit<CartItem, "qty">) => void }) {
  const [activeTab, setActiveTab] = useState("overview");
  const savedItems = [
    { name: "Classic Logo Tee", price: "$29.99", image: classicTee, color: "#26372b" },
    { name: "Heritage Trucker Hat", price: "$27.99", image: truckerHat, color: "#7e593c" },
    { name: "Antler Hoodie", price: "$54.99", image: hoodieProduct, color: "#354237" },
    { name: "Good Dogs Tee", price: "$29.99", image: dogTee, color: "#ded8ca" },
  ];
  const orders = [
    { num: "#WC10284", date: "Sep 20, 2026", items: "2 items", total: "$64.98", status: "Delivered" },
    { num: "#WC10217", date: "Sep 3, 2026", items: "3 items", total: "$89.97", status: "Shipped" },
    { num: "#WC10102", date: "Aug 15, 2026", items: "1 item", total: "$29.99", status: "Delivered" },
  ];
  const navItems = [
    { id: "overview", icon: "house" as IconName, label: "Account Overview" },
    { id: "orders", icon: "box" as IconName, label: "Orders" },
    { id: "addresses", icon: "pin" as IconName, label: "Addresses" },
    { id: "payment", icon: "card" as IconName, label: "Payment Methods" },
    { id: "wishlist", icon: "heart" as IconName, label: "Wishlist" },
    { id: "rewards", icon: "gift" as IconName, label: "Rewards &amp; Offers" },
    { id: "settings", icon: "gear" as IconName, label: "Account Settings" },
    { id: "signout", icon: "logout" as IconName, label: "Sign Out" },
  ];
  return (
    <main>
      <section className="account-hero">
        <img className="section-photo" src={shopHero} alt="My Account" />
        <div className="account-hero-copy">
          <h1>MY ACCOUNT</h1>
          <p>MANAGE YOUR ORDERS, SAVED ITEMS AND MORE.</p>
          <span className="tagline">SOUTHERN ROOTS. MODERN LIVING. TIMELESS STYLE.</span>
        </div>
        <div className="handwritten" style={{ position: "relative", zIndex: 1, marginLeft: "auto", fontSize: 28, lineHeight: .9, paddingLeft: 28, borderLeft: "1px solid rgba(255,255,255,.4)", color: "white" }}>More<br />Than a Hat...<br />It&apos;s A Lifestyle!</div>
      </section>
      <div className="account-breadcrumb">Home / My Account</div>

      <div className="account-layout">
        <aside className="account-sidebar">
          <div className="account-user-card">
            <div className="account-avatar">DR</div>
            <div className="account-user-name">Darrell Riley</div>
            <div className="account-user-email">darrellriley@example.com</div>
            <button className="account-edit-link">Edit Profile</button>
          </div>
          <nav className="account-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={activeTab === item.id ? "acct-active" : ""}
                onClick={() => item.id === "signout" ? setPage("home") : setActiveTab(item.id)}
              >
                <Icon name={item.icon} />
                {item.id === "rewards" ? "Rewards & Offers" : item.label}
              </button>
            ))}
          </nav>
          <div className="account-sidebar-img">
            <img src={newArrivals} alt="" />
            <div className="account-sidebar-img-overlay">
              <p>SIMPLE THINGS.<br />A BETTER LIFE.™</p>
            </div>
          </div>
        </aside>

        <div className="account-main">
          <div className="account-welcome-card">
            <div>
              <h2>Welcome Back, Darrell.</h2>
              <p>Thanks for being part of the Wiregrass &amp; Cotton Co. family.</p>
            </div>
            <div className="account-welcome-aside">SOUTHERN ROOTS.<br />MODERN LIVING.<br />TIMELESS STYLE.</div>
          </div>

          <div className="account-tiles">
            {[
              { icon: "box" as IconName, label: "Track Order", sub: "Check the status of your order", action: () => setPage("tracking") },
              { icon: "heart" as IconName, label: "View Wishlist", sub: "See your saved favorites", action: () => setActiveTab("wishlist") },
              { icon: "user" as IconName, label: "Manage Profile", sub: "Update your info and preferences", action: () => setActiveTab("settings") },
              { icon: "gift" as IconName, label: "Rewards & Offers", sub: "Exclusive deals just for you", action: () => setActiveTab("rewards") },
            ].map((tile) => (
              <button className="account-tile" key={tile.label} onClick={tile.action}>
                <Icon name={tile.icon} />
                <b>{tile.label}</b>
                <span>{tile.sub}</span>
              </button>
            ))}
          </div>

          <div className="account-card">
            <div className="account-section-head" style={{ padding: "18px 20px 0" }}>
              <h3>Recent Orders</h3>
              <span className="acct-link">View All Orders →</span>
            </div>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.num}>
                    <td><b style={{ fontFamily: "var(--display)" }}>{o.num}</b></td>
                    <td>{o.date}</td>
                    <td>{o.items}</td>
                    <td><b style={{ fontFamily: "var(--display)" }}>{o.total}</b></td>
                    <td><span className={`status-badge ${o.status === "Delivered" ? "status-delivered" : "status-shipped"}`}>{o.status}</span></td>
                    <td><button className="order-btn" onClick={() => setPage("tracking")}>{o.status === "Shipped" ? "Track Order" : "View Order"}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <div className="account-section-head">
              <h3>Your Saved Items</h3>
              <span className="acct-link">View Wishlist →</span>
            </div>
            <div className="account-saved-grid">
              {savedItems.map((item) => (
                <SavedCard key={item.name} item={item} onAdd={() => addToCart(item)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <FeatureBar />
    </main>
  );
}

function SavedCard({ item, onAdd }: { item: { name: string; price: string; image: string; color: string }; onAdd: () => void }) {
  const [liked, setLiked] = useState(true);
  const [added, setAdded] = useState(false);
  const handleAdd = () => { setAdded(true); onAdd(); setTimeout(() => setAdded(false), 2000); };
  return (
    <div className="saved-card">
      <button className="saved-heart" onClick={() => setLiked(!liked)} aria-label="Toggle wishlist">
        {liked ? "♥" : "♡"}
      </button>
      <img src={item.image} alt={item.name} />
      <h4>{item.name}</h4>
      <b>{item.price}</b>
      <button onClick={handleAdd} style={{ display: "block", width: "calc(100% - 14px)", margin: "8px 7px", height: 32, background: "var(--pine)", color: "white", border: 0, cursor: "pointer", font: "500 10px var(--display)", letterSpacing: "2px" }}>
        {added ? "ADDED ✓" : "ADD TO CART"}
      </button>
    </div>
  );
}

// ── Order Tracking Page ───────────────────────────────────────
function OrderTracking() {
  const [orderNum, setOrderNum] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<null | "found" | "notfound">(null);
  const knownOrders: Record<string, { status: string; date: string; items: string }> = {
    "WC10284": { status: "Delivered", date: "Sep 20, 2026", items: "Classic Logo Tee, Southern Roots Tee" },
    "WC10217": { status: "Shipped", date: "Sep 3, 2026", items: "Signature Hoodie, Good Dogs Tee, Heritage Trucker Hat" },
    "WC10102": { status: "Delivered", date: "Aug 15, 2026", items: "Classic Logo Tee" },
  };
  const handleSearch = () => {
    const key = orderNum.replace("#", "").trim();
    setResult(knownOrders[key] ? "found" : "notfound");
  };
  const order = knownOrders[orderNum.replace("#", "").trim()];
  const trackingSteps = [
    { icon: "bag" as IconName, label: "ORDER PLACED", desc: "Order received and confirmed" },
    { icon: "box" as IconName, label: "PROCESSING", desc: "Items being prepared" },
    { icon: "truck" as IconName, label: "SHIPPED", desc: "Package on its way" },
    { icon: "pin" as IconName, label: "OUT FOR DELIVERY", desc: "Almost there!" },
    { icon: "check" as IconName, label: "DELIVERED", desc: "Package delivered" },
  ];
  const trackingFaqs = [
    { q: "How long does shipping take?", a: "Standard shipping takes 5-7 business days. Expedited options are available at checkout." },
    { q: "My tracking number isn't working yet.", a: "Tracking numbers activate within 24 hours of shipment. Please check back soon." },
    { q: "Can I change my delivery address?", a: "Contact us within 1 hour of placing your order to update the delivery address." },
    { q: "What if my package is delayed?", a: "Delays can occur due to weather or high volume. Contact us if your package is more than 3 days late." },
    { q: "What if my order shows delivered but I don't have it?", a: "Check with neighbors and your local post office. Contact us if it remains missing after 48 hours." },
    { q: "Do you ship internationally?", a: "Yes! International shipping takes 10-21 business days. Rates are calculated at checkout." },
  ];
  return (
    <main>
      <section className="pg-hero">
        <img className="section-photo" src={shopHero} alt="Track Your Order" />
        <div className="pg-hero-center">
          <h1>TRACK YOUR ORDER</h1>
          <p>REAL PRODUCTS. REAL PEOPLE. REAL UPDATES.</p>
          <hr className="pg-hero-rule" />
        </div>
        <div className="handwritten pg-hero-script">More Than a Hat...<br />It&apos;s A Lifestyle!</div>
      </section>

      <div className="tracking-form-section">
        <div className="tracking-form-inner">
          <div className="tracking-form-icon"><Icon name="box" /></div>
          <h2>TRACK YOUR ORDER</h2>
          <p>Enter your order number and email address to see the latest updates on your package.</p>
          <div className="tracking-inputs">
            <div className="tracking-input-field">
              <span className="tracking-field-prefix">#</span>
              <input
                value={orderNum}
                onChange={(e) => setOrderNum(e.target.value)}
                placeholder="Order Number (e.g. WC10284)"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div className="tracking-input-field">
              <span className="tracking-field-icon"><Icon name="mail" /></span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                type="email"
              />
            </div>
          </div>
          <button className="tracking-submit-btn" onClick={handleSearch}>TRACK ORDER →</button>
          <p className="tracking-help-link">Need help? <a href="#/contact">Contact us</a></p>
          {result === "notfound" && (
            <p className="tracking-error">No order found. Try #WC10284, #WC10217, or #WC10102.</p>
          )}
          {result === "found" && order && (
            <div className="tracking-result">
              <h3>Order #{orderNum.replace("#", "")}</h3>
              <div className="tracking-result-meta">{order.items} &nbsp;·&nbsp; {order.date}</div>
              <span className={`status-badge ${order.status === "Delivered" ? "status-delivered" : "status-shipped"}`}>{order.status}</span>
            </div>
          )}
        </div>
      </div>

      <div className="tracking-steps-section">
        <h3>ORDER TRACKING STEPS</h3>
        <div className="tracking-steps-row">
          {trackingSteps.map((step, i) => (
            <div className="ts-step" key={step.label}>
              <div className="ts-step-wrap">
                <div className="ts-step-icon"><Icon name={step.icon} /></div>
                {i < trackingSteps.length - 1 && <div className="ts-connector" />}
              </div>
              <b>{step.label}</b>
              <span>{step.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="tracking-bottom">
        <div className="tracking-bottom-img">
          <img src={cottonBanner} alt="" />
          <div className="tracking-bottom-overlay">
            <p>GOOD THINGS ARE ON THE WAY.</p>
            <span>SIMPLE THINGS. A BETTER LIFE.™</span>
          </div>
        </div>
        <div className="tracking-bottom-faqs">
          <h3>COMMON TRACKING QUESTIONS</h3>
          {trackingFaqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          <button className="tracking-contact-btn">STILL NEED HELP? CONTACT US →</button>
        </div>
      </div>

      <FeatureBar />
    </main>
  );
}

// ── Help Center Page ──────────────────────────────────────────
function Help({ setPage }: { setPage: (p: Page) => void }) {
  const topics = [
    { icon: "bag" as IconName, title: "ORDERS & PAYMENT", desc: "Order status, payment methods, receipts" },
    { icon: "truck" as IconName, title: "SHIPPING & DELIVERY", desc: "Shipping times, tracking, international" },
    { icon: "box" as IconName, title: "RETURNS & EXCHANGES", desc: "Returns, exchanges, refunds" },
    { icon: "shield" as IconName, title: "PRODUCTS & SIZING", desc: "Fit guides, materials, care instructions" },
    { icon: "user" as IconName, title: "MY ACCOUNT", desc: "Login, profile, order history" },
    { icon: "gift" as IconName, title: "PROMOTIONS & REWARDS", desc: "Discounts, promo codes, loyalty program" },
    { icon: "people" as IconName, title: "WHOLESALE & PARTNERSHIPS", desc: "Bulk orders, custom requests, collaborations" },
    { icon: "leaf" as IconName, title: "CARE & QUALITY", desc: "Product care, sustainability, quality standards" },
    { icon: "chat" as IconName, title: "TECHNICAL SUPPORT", desc: "Website, account, checkout issues" },
    { icon: "mail" as IconName, title: "GENERAL QUESTIONS", desc: "Anything else? We're here to help." },
  ];
  const popularFaqs = [
    { q: "Where is my order?", a: "Track your order using your order number on our Order Tracking page. Orders typically ship within 1-2 business days." },
    { q: "What is your return policy?", a: "We accept returns within 30 days of delivery on unworn items with original tags attached." },
    { q: "How long does shipping take?", a: "Standard shipping: 5-7 business days. Expedited: 2-3 days. Overnight: 1 business day." },
    { q: "Do you offer free shipping?", a: "Yes! Free standard shipping on all orders $75+ within the continental US." },
    { q: "How do I find my size?", a: "Check our Size Guide page for detailed measurements by product category." },
    { q: "Can I change or cancel my order?", a: "Orders can be modified within 1 hour of placement. Contact us at orders@wiregrasscottonco.com." },
    { q: "How do refunds work?", a: "Refunds are processed within 3-5 business days of receiving your return." },
    { q: "Do you offer wholesale pricing?", a: "Yes! Email partnerships@wiregrasscottonco.com for wholesale inquiries." },
    { q: "Are your products true to size?", a: "Generally yes. Our tees run slightly relaxed. See individual product pages for fit notes." },
    { q: "How do I care for my items?", a: "Machine wash cold, tumble dry low. Avoid bleach. Air dry hoodies and hats to maintain shape." },
  ];
  const contactItems = [
    { icon: "chat" as IconName, title: "LIVE CHAT", sub: "Mon–Fri 9AM–6PM EST", cta: "START CHAT →" },
    { icon: "mail" as IconName, title: "EMAIL SUPPORT", sub: "support@wiregrasscottonco.com", cta: "SEND AN EMAIL →" },
    { icon: "phone" as IconName, title: "CALL US", sub: "(478) 555-0123", cta: "GIVE US A CALL →" },
    { icon: "people" as IconName, title: "BUSINESS & WHOLESALE", sub: "partnerships@wiregrasscottonco.com", cta: "LEARN MORE →" },
  ];
  return (
    <main>
      <section className="pg-hero">
        <img className="section-photo" src={newArrivals} alt="Help Center" />
        <div className="pg-hero-left">
          <span className="eyebrow">WE&apos;RE HERE FOR YOU</span>
          <h1>HELP CENTER</h1>
          <p>Answers. Support. Real People.</p>
          <span className="pg-hero-tagline">SIMPLE THINGS. A BETTER LIFE.™</span>
        </div>
        <div className="handwritten pg-hero-script">More Than a Hat...<br />It&apos;s A Lifestyle!</div>
      </section>

      <div className="help-search-section">
        <div className="help-search-bar">
          <Icon name="search" />
          <input placeholder="What can we help you with?" />
          <button>SEARCH</button>
        </div>
        <p>Search for answers or browse the topics below.</p>
      </div>

      <div className="help-topics-grid">
        {topics.map((t) => (
          <div className="help-topic-card" key={t.title}>
            <Icon name={t.icon} />
            <b>{t.title}</b>
            <span>{t.desc}</span>
          </div>
        ))}
      </div>

      <div className="help-body">
        <div className="help-body-col">
          <h2 className="help-section-title">POPULAR HELP TOPICS</h2>
          <div className="help-faqs">
            {popularFaqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
        <div className="help-body-col">
          <h2 className="help-section-title">STILL NEED HELP?</h2>
          {contactItems.map((c) => (
            <div className="help-contact-item" key={c.title}>
              <div className="help-contact-icon"><Icon name={c.icon} /></div>
              <div className="help-contact-text">
                <b>{c.title}</b>
                <span>{c.sub}</span>
              </div>
              <button className="help-contact-cta" onClick={() => setPage("contact")}>{c.cta}</button>
            </div>
          ))}
        </div>
      </div>

      <section className="help-quote-banner">
        <img className="section-photo" src={cottonBanner} alt="" />
        <div className="help-quote-inner">
          <hr className="help-quote-rule" />
          <h2>REAL SUPPORT. REAL PEOPLE.</h2>
          <div className="handwritten">More Than a Hat... It&apos;s A Lifestyle!</div>
        </div>
      </section>

      <FeatureBar />
    </main>
  );
}

// ── Cart & Checkout ───────────────────────────────────────────
type CheckoutStep = "cart" | "shipping" | "review" | "confirmation";
type ShippingData = { firstName: string; lastName: string; address: string; city: string; state: string; zip: string; phone: string };

function CheckoutSteps({ step }: { step: CheckoutStep }) {
  const steps: [CheckoutStep, string][] = [["cart", "CART"], ["shipping", "SHIPPING"], ["review", "REVIEW"], ["confirmation", "CONFIRMATION"]];
  const idx = steps.findIndex(([s]) => s === step);
  return (
    <div className="checkout-steps">
      {steps.map(([s, label], i) => (
        <>
          <div key={s} className={`chk-step ${i < idx ? "done" : i === idx ? "active" : ""}`}>
            <div className="chk-num">{i < idx ? "✓" : i + 1}</div>
            <span>{label}</span>
          </div>
          {i < steps.length - 1 && <div key={`d${i}`} className="chk-div" />}
        </>
      ))}
    </div>
  );
}

function CartPage({ cart, setPage, removeFromCart, updateQty, addToCart }: {
  cart: CartItem[];
  setPage: (p: Page) => void;
  removeFromCart: (name: string) => void;
  updateQty: (name: string, delta: number) => void;
  addToCart: (item: Omit<CartItem, "qty">) => void;
}) {
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [shipping, setShipping] = useState<ShippingData>({ firstName: "", lastName: "", address: "", city: "", state: "", zip: "", phone: "" });
  const [orderNum] = useState(`#WC${10290 + Math.floor(Math.random() * 99)}`);

  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price.replace("$", "")) * item.qty, 0);
  const shippingCost = subtotal >= 75 ? 0 : 7.99;
  const total = subtotal + shippingCost;

  if (step === "confirmation") {
    return (
      <main>
        <div className="cart-page">
          <div className="confirmation-page">
            <div className="conf-check"><Icon name="check" /></div>
            <h1>Order Confirmed!</h1>
            <p>Thank you for your order. We&apos;ve received your purchase and are getting it ready to ship. You&apos;ll receive a confirmation email shortly.</p>
            <div className="conf-order-box">ORDER {orderNum} &nbsp;·&nbsp; CONFIRMATION SENT</div>
            <div className="conf-actions">
              <button className="primary" onClick={() => setPage("tracking")}>TRACK YOUR ORDER →</button>
              <button className="outline" style={{ borderColor: "var(--pine)", color: "var(--pine)" }} onClick={() => setPage("shop")}>CONTINUE SHOPPING</button>
            </div>
          </div>
        </div>
        <FeatureBar />
      </main>
    );
  }

  if (step === "review") {
    return (
      <main>
        <div className="cart-page">
          <CheckoutSteps step="review" />
          <div className="review-section">
            <div>
              <div className="review-box">
                <h2>Order Summary</h2>
                {cart.map((item) => (
                  <div className="review-item-row" key={item.name}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <div style={{ font: "600 13px var(--display)", marginBottom: 4 }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: "#666" }}>Qty: {item.qty}</div>
                    </div>
                    <b style={{ fontFamily: "var(--display)" }}>${(parseFloat(item.price.replace("$", "")) * item.qty).toFixed(2)}</b>
                  </div>
                ))}
              </div>
              <div className="review-shipping-box">
                <h3>SHIPPING TO</h3>
                <p>{shipping.firstName} {shipping.lastName}<br />{shipping.address}<br />{shipping.city}, {shipping.state} {shipping.zip}<br />{shipping.phone}</p>
              </div>
              <div className="rv-actions">
                <button className="sf-back" onClick={() => setStep("shipping")}>← BACK</button>
                <button className="sf-continue" onClick={() => setStep("confirmation")}>PLACE ORDER →</button>
              </div>
            </div>
            <div className="cart-summary-box">
              <h3>ORDER TOTAL</h3>
              <div className="cs-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="cs-row"><span>Shipping</span><span>{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span></div>
              <div className="cs-row cs-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
        <FeatureBar />
      </main>
    );
  }

  if (step === "shipping") {
    return (
      <main>
        <div className="cart-page">
          <CheckoutSteps step="shipping" />
          <div className="shipping-section">
            <form className="shipping-form-box" onSubmit={(e) => { e.preventDefault(); setStep("review"); }}>
              <h2>Shipping Information</h2>
              <div className="sf-row">
                <div className="sf-field">
                  <label>First Name *</label>
                  <input value={shipping.firstName} onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })} required />
                </div>
                <div className="sf-field">
                  <label>Last Name *</label>
                  <input value={shipping.lastName} onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })} required />
                </div>
              </div>
              <div className="sf-field">
                <label>Street Address *</label>
                <input value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} placeholder="123 Main St" required />
              </div>
              <div className="sf-row">
                <div className="sf-field">
                  <label>City *</label>
                  <input value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} required />
                </div>
                <div className="sf-field">
                  <label>State *</label>
                  <select value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} required>
                    <option value="">Select State</option>
                    {["AL", "GA", "FL", "MS", "SC", "TN", "TX", "NC", "VA", "KY"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="sf-row">
                <div className="sf-field">
                  <label>ZIP Code *</label>
                  <input value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} required />
                </div>
                <div className="sf-field">
                  <label>Phone</label>
                  <input value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} type="tel" placeholder="(555) 000-0000" />
                </div>
              </div>
              <div className="sf-actions">
                <button type="button" className="sf-back" onClick={() => setStep("cart")}>← BACK TO CART</button>
                <button type="submit" className="sf-continue">REVIEW ORDER →</button>
              </div>
            </form>
            <div className="cart-summary-box">
              <h3>ORDER SUMMARY</h3>
              {cart.map((item) => (
                <div className="cs-row" key={item.name} style={{ fontSize: 12 }}>
                  <span>{item.name} ×{item.qty}</span>
                  <span>${(parseFloat(item.price.replace("$", "")) * item.qty).toFixed(2)}</span>
                </div>
              ))}
              <div className="cs-row" style={{ marginTop: 10 }}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="cs-row"><span>Shipping</span><span>{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span></div>
              <div className="cs-row cs-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
        <FeatureBar />
      </main>
    );
  }

  // Cart view
  if (cart.length === 0) {
    return (
      <main>
        <div className="cart-page">
          <div className="cart-empty">
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven&apos;t added anything yet.<br />Explore our collections to find your next favorite piece.</p>
            <button className="primary" onClick={() => setPage("shop")}>SHOP NOW →</button>
          </div>
        </div>
        <FeatureBar />
      </main>
    );
  }

  return (
    <main>
      <section className="pg-hero cart-hero">
        <img className="section-photo" src={homeHero} alt="Your Cart" />
        <div className="pg-hero-center">
          <h1>YOUR CART</h1>
          <p>GOOD GEAR. A BRIGHTER TOMORROW.</p>
          <hr className="pg-hero-rule" />
        </div>
        <div className="handwritten pg-hero-script">More Than a Hat...<br />It&apos;s A Lifestyle!</div>
      </section>

      <div className="cart-page">
        <div className="cart-table-top">
          <h2 className="cart-table-heading">SHOPPING CART ({cart.reduce((s, i) => s + i.qty, 0)} ITEMS)</h2>
          <button className="cart-continue" onClick={() => setPage("shop")}>← Continue Shopping</button>
        </div>

        <div className="cart-grid">
          <div className="cart-items-list">
            <div className="cart-table-header">
              <div>PRODUCT</div>
              <div>PRICE</div>
              <div>QUANTITY</div>
              <div>TOTAL</div>
            </div>
            {cart.map((item) => (
              <div className="cart-table-row" key={item.name}>
                <div className="cart-table-product">
                  <button className="cart-remove-x" onClick={() => removeFromCart(item.name)} aria-label="Remove item">✕</button>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <div className="cart-row-name">{item.name}</div>
                    <div className="cart-row-meta">Standard · One Size</div>
                  </div>
                </div>
                <div className="cart-table-price">{item.price}</div>
                <div className="cart-table-qty">
                  <button onClick={() => updateQty(item.name, -1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.name, 1)}>+</button>
                </div>
                <div className="cart-table-total">${(parseFloat(item.price.replace("$", "")) * item.qty).toFixed(2)}</div>
              </div>
            ))}
            <div className="cart-table-actions">
              <button className="cart-clear-btn" onClick={() => cart.forEach((i) => removeFromCart(i.name))}>CLEAR CART</button>
              <button className="cart-update-btn">UPDATE CART</button>
            </div>
          </div>

          <div className="cart-summary-box">
            <h3>ORDER SUMMARY</h3>
            <div className="cs-row"><span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="cs-row"><span>Shipping</span><span>{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span></div>
            {shippingCost > 0 && <p className="cs-free-note">Add ${(75 - subtotal).toFixed(2)} more for free shipping!</p>}
            <div className="cs-row"><span>Estimated Tax</span><span>$0.00</span></div>
            <div className="cs-row cs-total"><span>Estimated Total</span><span>${total.toFixed(2)}</span></div>
            <button className="cart-checkout-btn" onClick={() => setStep("shipping")}>PROCEED TO CHECKOUT →</button>
            <div className="cart-or-divider"><span>OR</span></div>
            <div className="cart-payment-btns">
              <button className="cart-shoppay-btn">Shop Pay</button>
              <button className="cart-paypal-btn">PayPal</button>
            </div>
            <p className="cart-secure-note">🔒 Secure Checkout · Your information is safe with us.</p>
          </div>
        </div>

        <div className="cart-recommendations">
          <div className="cart-rec-head">
            <h3>YOU MAY ALSO LIKE</h3>
            <button className="acct-link" onClick={() => setPage("shop")}>View All Products →</button>
          </div>
          <div className="cart-rec-grid">
            {productData.slice(0, 4).map((p) => (
              <ProductCard key={p.name} {...p} onAdd={() => addToCart(p)} />
            ))}
          </div>
        </div>
      </div>
      <FeatureBar />
    </main>
  );
}

// ── Search Page ───────────────────────────────────────────────
function SearchPage({ setPage, addToCart }: { setPage: (p: Page) => void; addToCart: (item: Omit<CartItem, "qty">) => void }) {
  const [query, setQuery] = useState("");
  const [inputVal, setInputVal] = useState("");
  const filtered = query
    ? productData.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    : productData;
  const doSearch = () => setQuery(inputVal);
  return (
    <main>
      <section className="pg-hero">
        <img className="section-photo" src={shopHero} alt="Search" />
        <div className="pg-hero-left">
          <span className="eyebrow">SEARCH</span>
          <h1>FIND WHAT MOVES YOU.</h1>
          <p><em>Real gear. Real people. Real life.</em></p>
          <span className="pg-hero-tagline">SOUTHERN ROOTS. MODERN LIVING. TIMELESS STYLE.</span>
        </div>
        <div className="handwritten pg-hero-script">More Than a Hat...<br />It&apos;s A Lifestyle!</div>
      </section>

      <div className="search-results-layout">
        <aside className="search-sidebar">
          <b className="search-filter-title">FILTER RESULTS</b>
          <div className="filter-group">
            <b>CATEGORY <span>⌃</span></b>
            {["T-Shirts (12)", "Hoodies (8)", "Hats (6)", "Accessories (4)"].map((v) => (
              <label key={v}><input type="checkbox" /> {v}</label>
            ))}
          </div>
          <div className="filter-group">
            <b>SIZE <span>⌃</span></b>
            <div className="size-buttons">
              {["S", "M", "L", "XL", "2XL", "3XL"].map((s) => (
                <button key={s} className="size-btn">{s}</button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <b>COLOR <span>⌃</span></b>
            <div className="swatches">
              {["#101713", "#b8bbb9", "#f4f3ed", "#354237", "#b19a7c", "#31465b", "#6c4934", "#781824"].map((c) => (
                <i key={c} style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
          <div className="filter-group">
            <b>PRICE <span>⌃</span></b>
            {["Under $25", "$25–$50", "$50–$75", "Over $75"].map((v) => (
              <label key={v}><input type="checkbox" /> {v}</label>
            ))}
          </div>
          <div className="filter-group">
            <b>PRODUCT TYPE <span>⌃</span></b>
            {["Pullover", "Zip-Up", "Graphic", "Minimal Logo", "Camo", "Performance"].map((v) => (
              <label key={v}><input type="checkbox" /> {v}</label>
            ))}
          </div>
          <button className="search-clear-btn">CLEAR ALL FILTERS</button>
        </aside>

        <div className="search-right-col">
          <div className="search-bar-lg">
            <span className="search-icon-wrap"><Icon name="search" /></span>
            <input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search for products, collections, or styles..."
              onKeyDown={(e) => e.key === "Enter" && doSearch()}
              autoFocus
            />
            {inputVal && (
              <button className="search-clear-x" onClick={() => { setInputVal(""); setQuery(""); }} aria-label="Clear search">✕</button>
            )}
            <button className="search-go-btn" onClick={doSearch}>SEARCH</button>
          </div>

          {query && (
            <div className="search-result-bar">
              <p>Showing results for &ldquo;{query}&rdquo; ({filtered.length} products)</p>
              <div className="search-sort">
                Sort by: <select aria-label="Sort products"><option>Best Match</option><option>Price: Low to High</option><option>Newest</option></select>
              </div>
            </div>
          )}

          <div className="search-product-grid">
            {filtered.map((p) => (
              <ProductCard key={p.name} {...p} onAdd={() => addToCart(p)} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <p style={{ color: "#666", marginBottom: 24 }}>No products found. Try a different search or browse our collections.</p>
              <button className="primary" onClick={() => setPage("shop")}>BROWSE ALL PRODUCTS →</button>
            </div>
          )}

          <div className="pagination">
            <button>&lt;</button>
            <button className="pg-active">1</button>
            <button>2</button>
            <button>3</button>
            <span className="pg-ellipsis">...</span>
            <button>4</button>
            <button>&gt;</button>
          </div>
        </div>
      </div>

      <FeatureBar />
    </main>
  );
}

// ── Size Guide Page ───────────────────────────────────────────
function SizeGuide() {
  const [activeTab, setActiveTab] = useState("tshirts");
  const tabs = [
    { id: "tshirts", label: "T-SHIRTS", icon: "leaf" as IconName },
    { id: "hoodies", label: "HOODIES", icon: "box" as IconName },
    { id: "hats", label: "HATS", icon: "star" as IconName },
    { id: "bottoms", label: "BOTTOMS", icon: "shield" as IconName },
    { id: "youth", label: "YOUTH", icon: "people" as IconName },
  ];
  const sidebarCategories = ["T-Shirts", "Hoodies & Sweatshirts", "Hats", "Outerwear", "Bottoms", "Accessories"];
  const sidebarGuides = [
    { label: "Fit Guide", active: true },
    { label: "Men's Sizing", active: false },
    { label: "Women's Sizing", active: false },
    { label: "Youth Sizing", active: false },
    { label: "Hats Sizing", active: false },
    { label: "How to Measure", active: false },
  ];
  const tshirtRows = [
    ["XS", "34–36", "26", "32"],
    ["S", "36–38", "27", "33"],
    ["M", "38–40", "28", "34"],
    ["L", "40–42", "29", "35"],
    ["XL", "42–44", "30", "36"],
    ["2XL", "44–46", "31", "37"],
    ["3XL", "46–48", "32", "38"],
    ["4XL", "48–50", "33", "39"],
  ];
  return (
    <main>
      <section className="pg-hero">
        <img className="section-photo" src={hoodies} alt="Size Guide" />
        <div className="pg-hero-left">
          <span className="eyebrow">SIZE GUIDE</span>
          <h1>THE RIGHT FIT.<br />A BETTER FEEL.</h1>
          <p>Great style starts with the right fit. Use this guide to find your perfect size.</p>
        </div>
        <div className="pg-hero-right-block">
          SOUTHERN ROOTS.<br />MODERN LIVING.<br />TIMELESS STYLE.
        </div>
      </section>

      <div className="breadcrumb"><span>Home &nbsp;/&nbsp; Size Guide</span></div>

      <div className="sg-layout">
        <aside className="sg-sidebar">
          <div className="sg-sidebar-section">
            <b>SHOP BY CATEGORY</b>
            {sidebarCategories.map((c) => (
              <button key={c} className="sg-sidebar-cat">
                <Icon name="leaf" />{c}
              </button>
            ))}
          </div>
          <div className="sg-sidebar-section">
            <b>SIZE GUIDE</b>
            {sidebarGuides.map((g) => (
              <button key={g.label} className={`sg-sidebar-link ${g.active ? "sg-sidebar-active" : ""}`}>
                {g.label}
              </button>
            ))}
          </div>
          <div className="sg-sidebar-img">
            <img src={cottonBanner} alt="" />
            <div className="sg-sidebar-overlay">SIMPLE THINGS. A BETTER LIFE.™</div>
          </div>
        </aside>

        <div className="sg-main">
          <div className="sg-tabs">
            {tabs.map((t) => (
              <button
                key={t.id}
                className={`sg-tab ${activeTab === t.id ? "sg-tab-active" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                <Icon name={t.icon} />{t.label}
              </button>
            ))}
          </div>

          {activeTab === "tshirts" && (
            <div className="sg-content">
              <div className="sg-content-head">
                <div>
                  <h2>T-SHIRTS SIZE GUIDE</h2>
                  <p className="sg-head-sub">Classic fit. Everyday comfort.</p>
                </div>
              </div>
              <div className="sg-content-body">
                <div>
                  <table className="sg-table">
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Chest (in)</th>
                        <th>Length (in)</th>
                        <th>Sleeve (in)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tshirtRows.map(([s, chest, length, sleeve]) => (
                        <tr key={s}>
                          <td><b>{s}</b></td>
                          <td>{chest}</td>
                          <td>{length}</td>
                          <td>{sleeve}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="sg-diagram">
                  <div className="sg-diagram-box">
                    <svg viewBox="0 0 120 150" className="sg-diagram-svg">
                      <path d="M35 10 L10 35 L28 42 L28 135 L92 135 L92 42 L110 35 L85 10 L72 22 L48 22 Z" fill="none" stroke="var(--pine)" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                    <div className="sg-label-sleeve">← SLEEVE</div>
                    <div className="sg-label-chest">CHEST ↔</div>
                    <div className="sg-label-length">LENGTH ↕</div>
                  </div>
                </div>
              </div>

              <div className="sg-how-to">
                <h3>HOW TO MEASURE (T-SHIRTS)</h3>
                <div className="sg-how-to-steps">
                  <div className="sg-how-to-step">
                    <span>1</span>
                    <div><b>Chest</b><p>Measure around the fullest part of your chest, keeping the tape level under your arms.</p></div>
                  </div>
                  <div className="sg-how-to-step">
                    <span>2</span>
                    <div><b>Length</b><p>Measure from the highest point of the shoulder down to the bottom hem.</p></div>
                  </div>
                  <div className="sg-how-to-step">
                    <span>3</span>
                    <div><b>Sleeve</b><p>Measure from the shoulder seam to the end of the sleeve cuff.</p></div>
                  </div>
                </div>
              </div>

              <div className="sg-mini-tables">
                <div className="sg-mini-table">
                  <h4>HOODIES &amp; SWEATSHIRTS</h4>
                  <table className="sg-table">
                    <thead><tr><th>Size</th><th>Chest</th><th>Length</th></tr></thead>
                    <tbody>
                      {[["S", "38–40", "28"], ["M", "40–42", "29"], ["L", "42–44", "30"], ["XL", "44–46", "31"]].map(([s, c, l]) => (
                        <tr key={s}><td><b>{s}</b></td><td>{c}</td><td>{l}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="sg-mini-table">
                  <h4>HATS SIZE GUIDE</h4>
                  <table className="sg-table">
                    <thead><tr><th>Size</th><th>Head Circ.</th></tr></thead>
                    <tbody>
                      {[["S/M", "21½–22½\""], ["L/XL", "22½–23½\""], ["OSFA", "Adjustable"]].map(([s, c]) => (
                        <tr key={s}><td><b>{s}</b></td><td>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="sg-mini-table">
                  <h4>YOUTH SIZE GUIDE</h4>
                  <table className="sg-table">
                    <thead><tr><th>Size</th><th>Age</th><th>Chest</th></tr></thead>
                    <tbody>
                      {[["XS", "4–5", "22–23"], ["S", "6–7", "24–25"], ["M", "8–10", "26–27"], ["L", "12–14", "28–30"]].map(([s, a, c]) => (
                        <tr key={s}><td><b>{s}</b></td><td>{a}</td><td>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="sg-fit-tips">
                <h3>FIT TIPS</h3>
                <ul>
                  <li>If you are between sizes, size up for a relaxed fit or size down for a slimmer fit.</li>
                  <li>Our classic tees run true to size with a comfortable, relaxed cut.</li>
                  <li>Pre-washed to minimize shrinkage — what you order is what you get.</li>
                  <li>Questions about fit? Email us at support@wiregrasscottonco.com.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab !== "tshirts" && (
            <div className="sg-content">
              <p style={{ padding: "60px 20px", color: "#666", textAlign: "center", fontSize: 14 }}>
                Select the T-SHIRTS tab above to view the full size guide.
              </p>
            </div>
          )}
        </div>
      </div>

      <FeatureBar />
    </main>
  );
}

// ── FAQ Page ──────────────────────────────────────────────────
function Faq({ setPage, addToCart }: { setPage: (p: Page) => void; addToCart: (item: Omit<CartItem, "qty">) => void }) {
  const categories = [
    { icon: "bag" as IconName, label: "ORDERS & PAYMENT" },
    { icon: "truck" as IconName, label: "SHIPPING & DELIVERY" },
    { icon: "box" as IconName, label: "RETURNS & EXCHANGES" },
    { icon: "shield" as IconName, label: "PRODUCTS & SIZING" },
    { icon: "user" as IconName, label: "MY ACCOUNT" },
    { icon: "gift" as IconName, label: "PROMOTIONS & REWARDS" },
    { icon: "people" as IconName, label: "WHOLESALE & PARTNERSHIPS" },
    { icon: "leaf" as IconName, label: "CARE & QUALITY" },
    { icon: "chat" as IconName, label: "TECHNICAL SUPPORT" },
    { icon: "mail" as IconName, label: "GENERAL QUESTIONS" },
  ];
  const faqs = [
    { q: "Where is my order?", a: "Track your order using your order number on our Order Tracking page. Orders typically ship within 1-2 business days." },
    { q: "What is your return policy?", a: "We accept returns within 30 days of delivery on unworn items with original tags attached. Final sale items are non-returnable." },
    { q: "How long does shipping take?", a: "Standard shipping: 5-7 business days. Expedited: 2-3 days. Overnight: 1 business day." },
    { q: "Do you offer free shipping?", a: "Yes! Free standard shipping on all orders $75+ within the continental US — no code needed." },
    { q: "How do I find my size?", a: "Check our Size Guide page for detailed measurements by product category. When in doubt, size up for a relaxed fit." },
    { q: "Can I change or cancel my order?", a: "Orders can be modified or cancelled within 1 hour of placement. Contact us immediately at orders@wiregrasscottonco.com." },
    { q: "How do refunds work?", a: "Refunds are processed within 3-5 business days of receiving your return. Allow 5-10 days to see the credit on your statement." },
    { q: "Do you offer wholesale pricing?", a: "Yes! We love working with like-minded retailers. Email partnerships@wiregrasscottonco.com for wholesale inquiries." },
    { q: "Are your products true to size?", a: "Generally yes. Our tees run slightly relaxed. See individual product pages for specific fit notes." },
    { q: "How do I care for my items?", a: "Machine wash cold, tumble dry low. Avoid bleach. Air dry hoodies and hats to maintain shape and color." },
    { q: "How does the rewards program work?", a: "Earn 1 point per dollar spent. 100 points = $5 reward. Points never expire as long as your account is active." },
    { q: "Can I change my password?", a: "Yes. Go to My Account → Account Settings → Change Password. You'll receive a confirmation email after updating." },
    { q: "Do you ship internationally?", a: "Yes! International shipping takes 10-21 business days. Rates are calculated at checkout." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, ShopPay, Apple Pay, and Google Pay." },
    { q: "How do I contact customer support?", a: "Email support@wiregrasscottonco.com, use Live Chat (Mon–Fri 9AM–6PM EST), or call (478) 555-0123." },
    { q: "Is my information secure?", a: "Yes. We use SSL encryption and never store payment details on our servers. Shop with confidence." },
  ];
  const contactCtas = [
    { icon: "chat" as IconName, title: "LIVE CHAT", desc: "Chat with a real person Mon–Fri 9AM–6PM EST", cta: "START CHAT" },
    { icon: "mail" as IconName, title: "EMAIL US", desc: "support@wiregrasscottonco.com", cta: "SEND EMAIL" },
    { icon: "phone" as IconName, title: "CALL US", desc: "(478) 555-0123 · Mon–Fri 9AM–6PM EST", cta: "CALL NOW" },
  ];
  // addToCart available for future product recommendations
  void addToCart;
  return (
    <main>
      <section className="pg-hero">
        <img className="section-photo" src={homeHero} alt="FAQ" />
        <div className="pg-hero-left">
          <span className="eyebrow">HAVE QUESTIONS?</span>
          <h1>FAQ</h1>
          <p>WE&apos;VE GOT YOU COVERED.</p>
          <span className="pg-hero-tagline">SOUTHERN ROOTS. MODERN LIVING. TIMELESS STYLE.</span>
        </div>
        <div className="handwritten pg-hero-script">More Than a Hat...<br />It&apos;s A Lifestyle!</div>
      </section>

      <div className="breadcrumb"><span>Home &nbsp;/&nbsp; Frequently Asked Questions</span></div>

      <div className="faq-page">
        <aside className="faq-sidebar">
          <b className="faq-sidebar-title">BROWSE FAQ TOPICS</b>
          {categories.map((c) => (
            <button className="faq-sidebar-cat" key={c.label}>
              <Icon name={c.icon} />
              <span>{c.label}</span>
              <span className="faq-sidebar-arrow">→</span>
            </button>
          ))}
          <div className="faq-sidebar-img">
            <img src={cottonBanner} alt="" />
            <div className="faq-sidebar-overlay">SIMPLE THINGS. A BETTER LIFE.™</div>
          </div>
        </aside>

        <div className="faq-main">
          <span className="eyebrow dark">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="faq-main-title">Find Your Answers Here</h2>
          <div className="help-faqs">
            {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </div>

      <div className="faq-contact-row">
        {contactCtas.map((c) => (
          <div className="faq-contact-card" key={c.title}>
            <div className="faq-contact-icon"><Icon name={c.icon} /></div>
            <b>{c.title}</b>
            <span>{c.desc}</span>
            <button className="faq-contact-btn" onClick={() => setPage("contact")}>{c.cta}</button>
          </div>
        ))}
      </div>

      <FeatureBar />
    </main>
  );
}

// ── Shipping Info Page ────────────────────────────────────────
function ShippingInfo() {
  return (
    <main>
      <div className="inner-hero">
        <span className="eyebrow" style={{ color: "rgba(255,255,255,.65)", letterSpacing: "4px", display: "block", marginBottom: 10 }}>POLICIES</span>
        <h1>SHIPPING &amp; RETURNS</h1>
      </div>
      <div className="shipping-info">
        <h2>Shipping Options</h2>
        <table className="ship-tbl">
          <thead><tr><th>Method</th><th>Delivery Time</th><th>Cost</th></tr></thead>
          <tbody>
            <tr><td>Standard Shipping</td><td>5–7 Business Days</td><td>$7.99 (FREE on orders $75+)</td></tr>
            <tr><td>Expedited Shipping</td><td>2–3 Business Days</td><td>$14.99</td></tr>
            <tr><td>Overnight Shipping</td><td>1 Business Day</td><td>$24.99</td></tr>
            <tr><td>International</td><td>10–21 Business Days</td><td>Calculated at checkout</td></tr>
          </tbody>
        </table>
        <p>All orders are processed within 1–2 business days (Monday–Friday, excluding holidays). Orders placed on weekends or holidays will begin processing the next business day.</p>

        <h2>Free Shipping</h2>
        <p>Enjoy <b>FREE standard shipping</b> on all orders over $75 within the continental United States. Free shipping is automatically applied at checkout — no code needed.</p>

        <h2>Order Tracking</h2>
        <p>Once your order ships, you&apos;ll receive a confirmation email with your tracking number. Use our <a href="#/tracking" style={{ color: "var(--pine)" }}>Order Tracking</a> page to monitor your delivery status in real time.</p>

        <h2>Returns &amp; Exchanges</h2>
        <p>We want you to love your Wiregrass &amp; Cotton Co. gear. If you&apos;re not satisfied, we&apos;ll make it right.</p>
        <ul style={{ color: "#555", lineHeight: 2, paddingLeft: 24, fontSize: 14 }}>
          <li>Returns accepted within <b>30 days</b> of delivery</li>
          <li>Items must be unworn, unwashed, and in original packaging with tags attached</li>
          <li>Final sale items are not eligible for return or exchange</li>
          <li>Exchanges are subject to availability</li>
        </ul>

        <h2>How to Start a Return</h2>
        <p>Email <b>orders@wiregrasscottonco.com</b> with your order number and reason for the return. Our team will respond within 1 business day with a prepaid return label and instructions.</p>
        <p>Once we receive your return, refunds are processed within <b>3–5 business days</b>. Please allow an additional 5–10 days for the credit to appear on your statement.</p>

        <h2>Damaged or Incorrect Items</h2>
        <p>If your order arrives damaged or you received the wrong item, please contact us immediately at orders@wiregrasscottonco.com with photos of the item and packaging. We&apos;ll make it right at no cost to you.</p>
      </div>
      <FeatureBar />
    </main>
  );
}

// ── App ───────────────────────────────────────────────────────
export default function App() {
  const [page, setPageState] = useState<Page>(pageFromHash());
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const onHash = () => setPageState(pageFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const badge = document.getElementById("cart-badge");
    if (badge) badge.textContent = String(cart.reduce((s, i) => s + i.qty, 0));
  }, [cart]);

  const setPage = (next: Page) => {
    window.location.hash = next === "home" ? "/" : `/${next}`;
    setPageState(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (item: Omit<CartItem, "qty">) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.name === item.name);
      if (existing) return prev.map((c) => c.name === item.name ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  };
  const removeFromCart = (name: string) => setCart((prev) => prev.filter((c) => c.name !== name));
  const updateQty = (name: string, delta: number) =>
    setCart((prev) => prev.map((c) => c.name === name ? { ...c, qty: Math.max(1, c.qty + delta) } : c));

  const renderPage = () => {
    switch (page) {
      case "home": return <Home setPage={setPage} />;
      case "shop": return <Shop setPage={setPage} addToCart={addToCart} />;
      case "collections": return <Collections setPage={setPage} />;
      case "newarrivals": return <NewArrivals setPage={setPage} addToCart={addToCart} />;
      case "story": return <OurStory setPage={setPage} />;
      case "contact": return <Contact />;
      case "account": return <MyAccount setPage={setPage} addToCart={addToCart} />;
      case "tracking": return <OrderTracking />;
      case "help": return <Help setPage={setPage} />;
      case "cart": return <CartPage cart={cart} setPage={setPage} removeFromCart={removeFromCart} updateQty={updateQty} addToCart={addToCart} />;
      case "search": return <SearchPage setPage={setPage} addToCart={addToCart} />;
      case "sizeguide": return <SizeGuide />;
      case "shipping": return <ShippingInfo />;
      case "faq": return <Faq setPage={setPage} addToCart={addToCart} />;
      default: return <Home setPage={setPage} />;
    }
  };

  return (
    <div className="site">
      <Header page={page} setPage={setPage} />
      {renderPage()}
      <Footer setPage={setPage} />
    </div>
  );
}
