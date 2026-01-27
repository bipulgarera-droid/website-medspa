import { c as createComponent, r as renderComponent, a as renderTemplate, b as createAstro } from '../../chunks/astro/server_BTE7SAEk.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$MainLayout } from '../../chunks/MainLayout_CqwsFml9.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Voice AI Template" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "MainApp", null, { "client:only": "react", "slug": slug, "client:component-hydration": "only", "client:component-path": "/Users/bipul/Downloads/ALL WORKSPACES/rondebosch-laser-hair-removal---with-dashboard/src/components/react/MainApp", "client:component-export": "default" })} ` })}`;
}, "/Users/bipul/Downloads/ALL WORKSPACES/rondebosch-laser-hair-removal---with-dashboard/src/pages/preview/[slug].astro", void 0);

const $$file = "/Users/bipul/Downloads/ALL WORKSPACES/rondebosch-laser-hair-removal---with-dashboard/src/pages/preview/[slug].astro";
const $$url = "/preview/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
