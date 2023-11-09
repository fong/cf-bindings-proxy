import { createBindingProxy as t } from "./proxy.js";
import "./transform.js";
const s = () => {
  var e, n, r;
  return typeof process < "u" && (((e = process == null ? void 0 : process.env) == null ? void 0 : e.ENABLE_BINDINGS_PROXY) || !((n = process == null ? void 0 : process.env) != null && n.DISABLE_BINDINGS_PROXY) && ((r = process == null ? void 0 : process.env) == null ? void 0 : r.NODE_ENV) === "development");
}, d = (e, n) => {
  var r;
  return s() ? new Proxy(
    {},
    {
      get: (o, c) => t(e, { proxyType: "binding" })[c]
    }
  ) : (r = (n == null ? void 0 : n.fallback) ?? (process == null ? void 0 : process.env)) == null ? void 0 : r[e];
}, f = (e) => {
  if (s())
    return new Proxy(
      {},
      {
        get: (r, o) => t(e ?? "default", { proxyType: "caches" })[o]
      }
    );
  const n = caches;
  return e === "default" || e === void 0 ? n.default : n.open(e);
};
export {
  d as binding,
  f as cacheApi,
  s as isProxyEnabled
};
//# sourceMappingURL=index.js.map
