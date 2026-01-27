import { c as createComponent, d as addAttribute, e as renderHead, f as renderSlot, a as renderTemplate, b as createAstro } from './astro/server_BTE7SAEk.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                         */

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

export { $$MainLayout as $ };
