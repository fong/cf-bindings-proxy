#!/usr/bin/env node
import { spawn as n } from "node:child_process";
import { dirname as a, resolve as c } from "node:path";
import { fileURLToPath as p } from "node:url";
const l = p(import.meta.url), m = a(l), s = (e) => e < 10 ? `0${e}` : e, f = async () => {
  const e = process.argv.slice(2), i = `npx${process.platform === "win32" ? ".cmd" : ""}`;
  if (console.log(`
-----------------
Starting cf-bindings-proxy...

WARNING: This is an experimental proxy for interfacing with bindings remotely.

Please report any issues to https://github.com/james-elicx/cf-bindings-proxy
-----------------
`), !e.includes("compatibility-date")) {
    const t = /* @__PURE__ */ new Date(), o = `${t.getUTCFullYear()}-${s(t.getUTCMonth() + 1)}-${s(
      t.getUTCDate()
    )}`;
    e.push(`--compatibility-date=${o}`);
  }
  const r = n(
    i,
    ["wrangler", "pages", "dev", c(m, "template"), "--port=8799", ...e],
    { stdio: "inherit" }
  );
  await new Promise((t) => {
    r.on("close", (o) => {
      t(o);
    });
  });
};
f();
export {
  f as spawnDevMode
};
//# sourceMappingURL=index.js.map
