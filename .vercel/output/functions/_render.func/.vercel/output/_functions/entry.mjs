import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_B-a3jFyp.mjs';
import { manifest } from './manifest_ByWYs5Ti.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/preview/_slug_.astro.mjs');
const _page2 = () => import('./pages/services/laser-hair-removal.astro.mjs');
const _page3 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/preview/[slug].astro", _page1],
    ["src/pages/services/laser-hair-removal.astro", _page2],
    ["src/pages/index.astro", _page3]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "f8f2b29e-80bf-4cbe-8073-0018bb069494",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
