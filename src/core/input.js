'use strict';
const fs = require('node:fs/promises');
async function withTimeout(promise, ms, label) { let timer; try { return await Promise.race([promise, new Promise((_, reject) => { timer=setTimeout(()=>reject(new Error(`${label} timed out after ${ms}ms`)),ms); })]); } finally { clearTimeout(timer); } }
async function loadInput(target, timeoutMs=10000) {
  if (/^https?:\/\//i.test(target)) { const response=await withTimeout(fetch(target,{redirect:'follow',headers:{'user-agent':'wcag-accessibility-skill/1.0'}}),timeoutMs,'HTTP request'); if (!response.ok) throw new Error(`Could not fetch ${target}: HTTP ${response.status}`); return { html:await response.text(), source:target }; }
  try { return { html:await fs.readFile(target,'utf8'), source:target }; } catch { return { html:target, source:'inline HTML' }; }
}
module.exports = { loadInput };
