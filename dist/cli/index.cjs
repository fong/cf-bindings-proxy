#!/usr/bin/env node
"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const d=require("node:child_process"),r=require("node:path"),l=require("node:url");var o=typeof document<"u"?document.currentScript:null;const p=l.fileURLToPath(typeof document>"u"?require("url").pathToFileURL(__filename).href:o&&o.src||new URL("cli/index.cjs",document.baseURI).href),u=r.dirname(p),i=e=>e<10?`0${e}`:e,s=async()=>{const e=process.argv.slice(2),c=`npx${process.platform==="win32"?".cmd":""}`;if(console.log(`
-----------------
Starting cf-bindings-proxy...

WARNING: This is an experimental proxy for interfacing with bindings remotely.

Please report any issues to https://github.com/james-elicx/cf-bindings-proxy
-----------------
`),!e.includes("compatibility-date")){const t=new Date,n=`${t.getUTCFullYear()}-${i(t.getUTCMonth()+1)}-${i(t.getUTCDate())}`;e.push(`--compatibility-date=${n}`)}const a=d.spawn(c,["wrangler","pages","dev",r.resolve(u,"template"),"--port=8799",...e],{stdio:"inherit"});await new Promise(t=>{a.on("close",n=>{t(n)})})};s();exports.spawnDevMode=s;
//# sourceMappingURL=index.cjs.map
