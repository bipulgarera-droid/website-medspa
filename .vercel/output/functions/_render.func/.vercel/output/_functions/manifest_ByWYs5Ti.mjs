import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BjkEYE7P.mjs';
import 'es-module-lexer';
import { i as decodeKey } from './chunks/astro/server_BHD9b0Bl.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/bipul/Downloads/ALL%20WORKSPACES/rondebosch-laser-hair-removal---with-dashboard/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"services/laser-hair-removal/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/services/laser-hair-removal","isIndex":false,"type":"page","pattern":"^\\/services\\/laser-hair-removal\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"laser-hair-removal","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/laser-hair-removal.astro","pathname":"/services/laser-hair-removal","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.BTmaqWG-.css"}],"routeData":{"route":"/preview/[slug]","isIndex":false,"type":"page","pattern":"^\\/preview\\/([^/]+?)\\/?$","segments":[[{"content":"preview","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/preview/[slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/bipul/Downloads/ALL WORKSPACES/rondebosch-laser-hair-removal---with-dashboard/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/bipul/Downloads/ALL WORKSPACES/rondebosch-laser-hair-removal---with-dashboard/src/pages/preview/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/bipul/Downloads/ALL WORKSPACES/rondebosch-laser-hair-removal---with-dashboard/src/pages/services/laser-hair-removal.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/services/laser-hair-removal@_@astro":"pages/services/laser-hair-removal.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/preview/[slug]@_@astro":"pages/preview/_slug_.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/bipul/Downloads/ALL WORKSPACES/rondebosch-laser-hair-removal---with-dashboard/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_ByWYs5Ti.mjs","@astrojs/react/client.js":"_astro/client.BuOr9PT5.js","/Users/bipul/Downloads/ALL WORKSPACES/rondebosch-laser-hair-removal---with-dashboard/src/components/react/MainApp":"_astro/MainApp.YHTn-75l.js","/Users/bipul/Downloads/ALL WORKSPACES/rondebosch-laser-hair-removal---with-dashboard/src/components/react/Footer":"_astro/Footer.NCfisXiN.js","/Users/bipul/Downloads/ALL WORKSPACES/rondebosch-laser-hair-removal---with-dashboard/src/components/react/Navbar":"_astro/Navbar.B2cAW8_c.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.BTmaqWG-.css","/_astro/Footer.NCfisXiN.js","/_astro/MainApp.YHTn-75l.js","/_astro/Navbar.B2cAW8_c.js","/_astro/Navbar.CkSFjkxm.js","/_astro/client.BuOr9PT5.js","/_astro/constants.gzQLwcGl.js","/_astro/index.CVf8TyFT.js","/images/about-spa-interior.png","/images/hero-luxury-spa-wide.png","/images/hero-luxury-spa.png","/images/service-cosmelan.png","/images/service-dermaplaning.png","/images/service-laser.png","/images/service-microneedling.png","/images/service-peels.png","/images/service-waxing.png","/services/laser-hair-removal/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"1rOgFT63zEbQcj5Z4p3kTWncCUcwjl8KJjuCE5zhWyY=","experimentalEnvGetSecretEnabled":false});

export { manifest };
