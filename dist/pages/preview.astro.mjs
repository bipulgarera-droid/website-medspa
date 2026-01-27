import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_BTE7SAEk.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$MainLayout } from '../chunks/MainLayout_CqwsFml9.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Voice AI Template" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "MainApp", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/bipul/Downloads/ALL WORKSPACES/rondebosch-laser-hair-removal---with-dashboard/src/components/react/MainApp", "client:component-export": "default" })} ` })}`;
}, "/Users/bipul/Downloads/ALL WORKSPACES/rondebosch-laser-hair-removal---with-dashboard/src/pages/preview/index.astro", void 0);

const $$file = "/Users/bipul/Downloads/ALL WORKSPACES/rondebosch-laser-hair-removal---with-dashboard/src/pages/preview/index.astro";
const $$url = "/preview";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
