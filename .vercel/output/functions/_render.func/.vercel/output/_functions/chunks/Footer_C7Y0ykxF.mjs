import { c as createComponent, f as addAttribute, g as renderHead, h as renderSlot, d as renderTemplate, e as createAstro } from './astro/server_BHD9b0Bl.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { X, Menu, Instagram, Twitter, Facebook } from 'lucide-react';

const $$Astro = createAstro();
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const {
    title = "Rondebosch Laser - Advanced Skin Care",
    description = "Premium laser hair removal and skin care services in Rondebosch"
  } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(description, "content")}><title>${title}</title><!-- Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-nova-gray text-nova-text"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/bipul/Downloads/ALL WORKSPACES/rondebosch-laser-hair-removal---with-dashboard/src/layouts/MainLayout.astro", void 0);

const NAV_LINKS = [
  { label: "Treatments", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" }
];
const SERVICES = [
  {
    id: "1",
    number: "01",
    title: "Laser Hair",
    italicWord: "removal",
    description: "Experience silky smooth skin with our state-of-the-art diode laser technology. Painless, effective, and permanent.",
    image: "/images/service-laser.png"
  },
  {
    id: "2",
    number: "02",
    title: "Cosmelan",
    italicWord: "depigmentation",
    description: "The world’s leading professional depigmentation method to remove spots and prevent their reappearance.",
    image: "/images/service-cosmelan.png"
  },
  {
    id: "3",
    number: "03",
    title: "Dermaplaning",
    italicWord: "glow",
    description: "Exfoliate the epidermis and rid the skin of fine vellus hair (peach fuzz) for instant radiance.",
    image: "/images/service-dermaplaning.png"
  },
  {
    id: "4",
    number: "04",
    title: "Chemical",
    italicWord: "peels",
    description: "Advanced resurfacing solutions to improve texture, tone, and overall skin health.",
    image: "/images/service-peels.png"
  },
  {
    id: "5",
    number: "05",
    title: "Threading &",
    italicWord: "waxing",
    description: "Precision shaping for brows and gentle hair removal for sensitive areas.",
    image: "/images/service-waxing.png"
  },
  {
    id: "6",
    number: "06",
    title: "Microneedling",
    italicWord: "therapy",
    description: "Stimulate collagen production to reduce scars, fine lines, and improve skin texture.",
    image: "/images/service-microneedling.png"
  }
];

const Navbar = ({ businessName = "RONDEBOSCH LASER", logoUrl, onOpenBooking }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (href === "#" || href.startsWith("#")) {
      if (window.location.pathname === "/" || window.location.pathname === "") {
        if (href === "#") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const element = document.querySelector(href);
          if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        }
      } else {
        window.location.href = `/${href === "#" ? "" : href}`;
      }
    } else {
      window.location.href = href;
    }
  };
  const navBgClass = isScrolled ? "bg-nova-gray/90 backdrop-blur-md border-b border-gray-200/50 py-4" : "bg-transparent py-6 border-transparent";
  const navTextClass = isScrolled || isMobileMenuOpen ? "text-gray-600 hover:text-black" : "text-white/90 hover:text-white";
  const logoClass = isScrolled || isMobileMenuOpen ? "text-nova-dark" : "text-white";
  return /* @__PURE__ */ jsxs("nav", { className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBgClass}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "#",
          onClick: (e) => handleNavClick(e, "#"),
          className: `flex items-center gap-3 transition-colors ${logoClass}`,
          children: logoUrl ? /* @__PURE__ */ jsx(
            "img",
            {
              src: logoUrl,
              alt: businessName,
              className: "h-8 md:h-10 max-w-[180px] object-contain",
              style: { filter: isScrolled || isMobileMenuOpen ? "none" : "brightness(0) invert(1)" }
            }
          ) : /* @__PURE__ */ jsx("span", { className: "text-xl md:text-2xl font-bold tracking-wide uppercase font-sans", children: businessName })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center space-x-8", children: NAV_LINKS.map((link) => /* @__PURE__ */ jsx(
        "a",
        {
          href: link.href.startsWith("#") ? `/${link.href}` : link.href,
          onClick: (e) => handleNavClick(e, link.href),
          className: `text-sm font-medium transition-colors cursor-pointer ${navTextClass}`,
          children: link.label
        },
        link.label
      )) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: `md:hidden p-2 transition-colors ${logoClass}`,
          onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
          children: isMobileMenuOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 })
        }
      )
    ] }),
    isMobileMenuOpen && /* @__PURE__ */ jsxs("div", { className: "md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-6 flex flex-col space-y-4 shadow-xl", children: [
      NAV_LINKS.map((link) => /* @__PURE__ */ jsx(
        "a",
        {
          href: link.href.startsWith("#") ? `/${link.href}` : link.href,
          onClick: (e) => handleNavClick(e, link.href),
          className: "text-lg font-medium text-gray-800 cursor-pointer",
          children: link.label
        },
        link.label
      )),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setIsMobileMenuOpen(false);
            onOpenBooking();
          },
          className: "w-full bg-nova-dark text-white py-3 rounded-full mt-4",
          children: "Book Appointment"
        }
      )
    ] })
  ] });
};

const Footer = ({
  businessName = "RONDEBOSCH LASER",
  address = "15 Rondebosch Main Road, Cape Town, 7700",
  email = "info@rondeboschlaser.com",
  phone = "+27 (21) 123-4567",
  onAdminClick
}) => {
  const addressLines = address.split(",").map((line) => line.trim());
  return /* @__PURE__ */ jsxs("footer", { className: "bg-nova-dark text-white py-16 px-6 md:px-10", id: "contact", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-1", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold tracking-wide uppercase mb-6", children: businessName }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed", children: "Your premier destination for laser hair removal, advanced peels, and skin rejuvenation. State of the art technology meets luxury care." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-1", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold uppercase tracking-widest mb-6 text-gray-500", children: "Menu" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
          NAV_LINKS.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: link.href.startsWith("#") ? `/${link.href}` : link.href,
              className: "text-gray-300 hover:text-white transition-colors",
              children: link.label
            }
          ) }, link.label)),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/services/laser-hair-removal", className: "text-gray-300 hover:text-white transition-colors", children: "Laser Hair Removal" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-1", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold uppercase tracking-widest mb-6 text-gray-500", children: "Visit Us" }),
        /* @__PURE__ */ jsxs("address", { className: "not-italic text-gray-300 text-sm leading-relaxed space-y-2", children: [
          addressLines.map((line, i) => /* @__PURE__ */ jsx("p", { children: line }, i)),
          /* @__PURE__ */ jsx("p", { className: "pt-2 hover:text-white cursor-pointer", children: email }),
          /* @__PURE__ */ jsx("p", { className: "hover:text-white cursor-pointer", children: phone })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-1 flex flex-col items-start md:items-end", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold uppercase tracking-widest mb-6 text-gray-500", children: "Follow" }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 border border-white/20 rounded-full text-gray-400 cursor-not-allowed", children: /* @__PURE__ */ jsx(Instagram, { size: 18 }) }),
          /* @__PURE__ */ jsx("div", { className: "p-2 border border-white/20 rounded-full text-gray-400 cursor-not-allowed", children: /* @__PURE__ */ jsx(Twitter, { size: 18 }) }),
          /* @__PURE__ */ jsx("div", { className: "p-2 border border-white/20 rounded-full text-gray-400 cursor-not-allowed", children: /* @__PURE__ */ jsx(Facebook, { size: 18 }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "© 2026 ",
        businessName,
        ". All rights reserved."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx("p", { children: "Privacy Policy • Terms of Service" }),
        /* @__PURE__ */ jsx("button", { onClick: onAdminClick, className: "opacity-0 hover:opacity-50 transition-opacity", children: "Owner Login" })
      ] })
    ] })
  ] });
};

export { $$MainLayout as $, Footer as F, Navbar as N, SERVICES as S };
