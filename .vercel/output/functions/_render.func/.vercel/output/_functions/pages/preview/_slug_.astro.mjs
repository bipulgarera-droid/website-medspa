import { c as createComponent, r as renderComponent, d as renderTemplate, e as createAstro } from '../../chunks/astro/server_BHD9b0Bl.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../../chunks/Footer_C7Y0ykxF.mjs';
import { M as MainApp } from '../../chunks/MainApp_C98UqwaV.mjs';
export { renderers } from '../../renderers.mjs';

async function getProspectBySlug(slug) {
  {
    console.warn("Supabase credentials not configured");
    return null;
  }
}

const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  let prospectData = null;
  if (slug) {
    prospectData = await getProspectBySlug();
  }
  const pageTitle = prospectData?.business_name ? `${prospectData.business_name} - Advanced Skin Care` : "Rondebosch Laser - Advanced Skin Care";
  const reactProspectData = prospectData ? {
    businessName: prospectData.business_name,
    logoUrl: prospectData.logo_url,
    phone: prospectData.phone,
    email: prospectData.email,
    address: prospectData.address
  } : void 0;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": pageTitle }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "MainApp", MainApp, { "client:load": true, "prospectData": reactProspectData, "client:component-hydration": "load", "client:component-path": "/Users/bipul/Downloads/ALL WORKSPACES/rondebosch-laser-hair-removal---with-dashboard/src/components/react/MainApp", "client:component-export": "default" })} ` })}`;
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
