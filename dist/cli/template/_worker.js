import { prepareDataForProxy as l, transformData as b } from "../../transform.js";
const y = async (o, u) => u.reduce(async (t, { prop: s, args: d }) => (await t)[s](
  ...await Promise.all(
    d.map(async (e) => Array.isArray(e.data) ? Promise.all(
      e.data.map((n) => "__bindingId" in n ? y(o, n.__calls) : n)
    ) : e.transform ? b(e.data, e.transform) : e.data)
  )
), Promise.resolve(o)), w = {
  async fetch(o, u) {
    if (o.method !== "POST")
      return new Response("Method not allowed", { status: 405 });
    try {
      const { __original_call: t, __proxyType: s, __bindingId: d, __calls: e } = await o.json(), n = t ? t.__bindingId : d;
      let i;
      switch (s) {
        case "caches": {
          const f = caches;
          i = n === "default" ? f.default : await f.open(n);
          break;
        }
        case "binding": {
          i = u[n];
          break;
        }
        default:
          throw new Error("Unknown proxy type");
      }
      const p = t ? await y(i, t.__calls) : i, a = await y(p, e), r = { success: !0, data: a, functions: {} };
      if (r.success) {
        const f = await l(a, { data: a });
        if (r.transform = f.transform, r.data = f.data, a && typeof a == "object" && !Array.isArray(a) && ![Response, Request, URL].find((c) => a instanceof c)) {
          if ("arrayBuffer" in a && typeof a.arrayBuffer == "function") {
            const c = await a.arrayBuffer();
            r.functions.arrayBuffer = await l(c, {
              data: c
            });
          }
          "blob" in a && typeof a.blob == "function" && (r.functions.blob = {
            takeDataFrom: "arrayBuffer",
            transform: { from: "buffer", to: "blob" }
          }), "text" in a && typeof a.text == "function" && (r.functions.text = {
            takeDataFrom: "arrayBuffer",
            transform: { from: "buffer", to: "text" }
          }), "json" in a && typeof a.json == "function" && (r.functions.json = {
            takeDataFrom: "arrayBuffer",
            transform: { from: "buffer", to: "json" }
          }), "body" in a && typeof a.body == "object" && (r.functions.body = {
            takeDataFrom: "arrayBuffer",
            asAccessor: !0
          });
        }
      }
      return new Response(JSON.stringify(r), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (t) {
      console.error(t);
      const s = JSON.stringify({
        success: !1,
        data: t instanceof Error ? t.message : "Failed to access binding"
      });
      return new Response(s, {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};
export {
  w as default
};
//# sourceMappingURL=_worker.js.map
