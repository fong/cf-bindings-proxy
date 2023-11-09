const o = async (t, r) => {
  switch (r.from) {
    case "buffer": {
      if (r.to === "blob")
        return new Blob([t]);
      if (r.to === "base64") {
        const f = new Uint8Array(t);
        let s = "";
        for (let n = 0; n < f.byteLength; n++)
          s += String.fromCharCode(f[n]);
        return btoa(s);
      }
      const e = new TextDecoder().decode(t);
      if (r.to === "text")
        return e;
      if (r.to === "json")
        return JSON.parse(e);
      break;
    }
    case "blob": {
      if (r.to === "base64") {
        const e = await t.arrayBuffer();
        return o(e, { from: "buffer", to: "base64" });
      }
      break;
    }
    case "stream": {
      if (r.to === "base64") {
        const e = await t.getReader().read();
        return o(e.value, {
          from: "buffer",
          to: "base64"
        });
      }
      break;
    }
    case "base64": {
      if (r.to === "buffer")
        return Uint8Array.from(atob(t), (e) => e.charCodeAt(0)).buffer;
      if (r.to === "blob") {
        const e = await o(t, {
          from: "base64",
          to: "buffer"
        });
        return new Blob([e]);
      }
      if (r.to === "stream") {
        const e = await o(t, {
          from: "base64",
          to: "buffer"
        }), { readable: f, writable: s } = new FixedLengthStream(e.byteLength), n = s.getWriter();
        return n.write(e), n.close(), f;
      }
      if (r.to === "url")
        return new URL(t);
      break;
    }
    case "url": {
      if (r.to === "text")
        return t.toString();
      break;
    }
    case "request": {
      if (r.to === "text") {
        const e = t;
        return JSON.stringify({
          url: e.url,
          method: e.method,
          headers: [...e.headers.entries()],
          body: await o(await e.arrayBuffer(), {
            from: "buffer",
            to: "base64"
          })
        });
      }
      break;
    }
    case "response": {
      if (r.to === "text") {
        const e = t;
        return JSON.stringify({
          status: e.status,
          statusText: e.statusText,
          headers: [...e.headers.entries()],
          body: await o(await e.arrayBuffer(), { from: "buffer", to: "base64" })
        });
      }
      break;
    }
    case "text": {
      if (r.to === "url")
        return new URL(t);
      if (r.to === "request") {
        const e = JSON.parse(t);
        return new Request(e.url, {
          method: e.method,
          headers: Object.fromEntries(e.headers),
          body: e.body ? await o(e.body, { from: "base64", to: "buffer" }) : void 0
        });
      }
      if (r.to === "response") {
        const e = JSON.parse(t);
        return new Response(
          e.body ? await o(e.body, { from: "base64", to: "buffer" }) : void 0,
          {
            status: e.status,
            statusText: e.statusText,
            headers: Object.fromEntries(e.headers)
          }
        );
      }
      break;
    }
  }
  return t;
}, u = async (t, r) => t instanceof ArrayBuffer ? {
  transform: { from: "base64", to: "buffer" },
  data: await o(t, { from: "buffer", to: "base64" })
} : t instanceof Blob ? {
  transform: { from: "base64", to: "blob" },
  data: await o(t, { from: "blob", to: "base64" })
} : t instanceof URL ? {
  transform: { from: "text", to: "url" },
  data: await o(t, { from: "url", to: "text" })
} : t instanceof Request ? {
  transform: { from: "text", to: "request" },
  data: await o(t, { from: "request", to: "text" })
} : t instanceof Response ? {
  transform: { from: "text", to: "response" },
  data: await o(t, { from: "response", to: "text" })
} : t !== null && typeof t == "object" && "getReader" in t && typeof t.getReader == "function" ? {
  transform: { from: "base64", to: "stream" },
  data: await o(t, { from: "stream", to: "base64" })
} : r, b = async ({ data: t, takeDataFrom: r, transform: e }, f) => {
  const s = r ? await b(f[r], f) : t;
  return s && e ? async () => {
    const i = typeof s == "function" && !(s instanceof Blob) ? await Promise.resolve(s()) : s;
    return Promise.resolve(o(i, e));
  } : s ?? t;
};
export {
  u as prepareDataForProxy,
  o as transformData,
  b as transformFunctionInfo
};
//# sourceMappingURL=transform.js.map