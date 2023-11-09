import { transformData as b, transformFunctionInfo as g, prepareDataForProxy as w } from "./transform.js";
const P = async (o) => ({
  ...o,
  __calls: await Promise.all(
    o.__calls.map(async (a) => ({
      ...a,
      args: await Promise.all(a.args.map((c) => w(c.data, c)))
    }))
  )
}), d = async (o) => {
  const a = await P(o), c = JSON.stringify(a);
  let n;
  try {
    n = await fetch("http://127.0.0.1:8799", {
      body: c,
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" }
    });
  } catch {
    throw new Error("Unable to connect to binding proxy");
  }
  const { success: s, data: e, transform: r, functions: t } = await n.json();
  if (!s)
    throw new Error(e || "Bad response from binding proxy");
  const i = r ? b(e, r) : e;
  if (t && i && typeof i == "object" && !Array.isArray(i))
    for (const [f, u] of Object.entries(t)) {
      const l = await g(u, t);
      if (u.asAccessor) {
        const y = typeof l == "function" && !(l instanceof Blob) ? await l() : l;
        if (f === "body") {
          const _ = new ReadableStream({
            start(h) {
              h.enqueue(y), h.close();
            }
          });
          Object.defineProperties(i, {
            body: {
              get() {
                return _;
              }
            },
            bodyUsed: {
              get() {
                return _.locked;
              }
            }
          });
        } else
          Object.defineProperty(i, f, {
            get() {
              return y;
            }
          });
      } else
        i[f] = l;
    }
  return i;
}, U = (o, a, c, n) => new Proxy(n, {
  get(s, e) {
    if (!n || ["then", Symbol.iterator, Symbol.toStringTag].includes(e))
      return;
    if (e in n || ["error", "results"].includes(e))
      return n[e];
    if (Array.isArray(n) && typeof e == "string" && !Number.isNaN(Number(e)))
      return n[Number(e)];
    if (["toJSON"].includes(e))
      return n;
    if (e === "writeHttpMetadata" && n && typeof n == "object") {
      const t = n.httpMetadata || {};
      return (i) => {
        t.cacheControl && i.set("cache-control", t.cacheControl), t.cacheExpiry && i.set("expires", t.cacheExpiry.toUTCString()), t.contentDisposition && i.set("content-disposition", t.contentDisposition), t.contentEncoding && i.set("content-encoding", t.contentEncoding), t.contentLanguage && i.set("content-language", t.contentLanguage), t.contentType && i.set("content-type", t.contentType);
      };
    }
    const r = m(a, {
      notChainable: !0,
      proxyType: o
    });
    return r.__original_call = c, async (...t) => (r.__calls.push({ prop: e, args: t.map((i) => ({ data: i })) }), d(r));
  }
}), x = (o) => ["prepare"].includes(o) ? ["first", "run", "all", "raw"] : [], p = (o, a) => ({ __proxyType: o, __bindingId: a, __calls: [], __chainUntil: [] }), m = (o, { notChainable: a = !1, proxyType: c = "binding" } = {}) => new Proxy(p(c, o), {
  get(n, s) {
    if (typeof s == "string" && s.startsWith("__"))
      return n[s];
    if (s !== "toJSON" && !a && !(n.__calls.length === 0 && s === "then")) {
      if (n.__chainUntil.length || (n.__chainUntil = x(s)), n.__chainUntil.length && !n.__chainUntil.includes(s)) {
        const e = m(o, { proxyType: c });
        return e.__chainUntil = n.__chainUntil, e.__calls = n.__calls, (...r) => (n.__calls.push({ prop: s, args: r.map((t) => ({ data: t })) }), e);
      }
      return async (...e) => {
        n.__calls.push({ prop: s, args: e.map((t) => ({ data: t })) });
        const r = await d(n);
        return typeof r != "object" || !r || Array.isArray(r) || [URL, Request, Response].find((t) => r instanceof t) ? r : U(c, o, n, r);
      };
    }
  }
});
export {
  m as createBindingProxy
};
//# sourceMappingURL=proxy.js.map
