'use strict';
const { createHash } = require('node:crypto');
const { criteriaFor } = require('./rules');

function attrs(raw = '') {
  const map = {};
  raw.replace(/([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g, (_, key, a, b, c) => { map[key.toLowerCase()] = a ?? b ?? c ?? ''; return ''; });
  return map;
}
function text(fragment = '') { return fragment.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }
function issue(criterion, severity, message, evidence, fix) { const fingerprint=createHash('sha256').update(`${criterion}\n${message}\n${evidence}`).digest('hex').slice(0,12); return { id: `WCAG-${criterion}-${fingerprint}`, criterion, severity, message, evidence, suggestedFix: fix }; }
function isInsideHiddenHoneypot(html, index) { const before=html.slice(0,index); const open=before.lastIndexOf('<div'); if (open<0) return false; const close=html.indexOf('</div>',open); if (close<index) return false; const attributes=html.slice(open,index).match(/^<div\b([^>]*)>/i)?.[1] || ''; const parsed=attrs(attributes); return parsed['aria-hidden']==='true' && /\bhoneypot\b/i.test(parsed.class || ''); }

function scanHtml(html, options = {}) {
  if (typeof html !== 'string' || !html.trim()) throw new Error('Audit input must be non-empty HTML.');
  const issues = [], add = (c,s,m,e,f) => issues.push(issue(c,s,m,e,f));
  const ids = new Set([...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map((m) => m[1]));
  for (const m of html.matchAll(/<img\b([^>]*)>/gi)) { const a = attrs(m[1]); if (!Object.hasOwn(a, 'alt')) add('1.1.1','critical','Image has no alt attribute.',m[0],'Use alt="meaningful alternative" or alt="" for a decorative image.'); }
  const htmlTag = html.match(/<html\b([^>]*)>/i); if (!htmlTag || !attrs(htmlTag[1]).lang) add('3.1.1','high','Document language is not declared.',htmlTag?.[0] || '<html>','Set a valid primary language, for example <html lang="en">.');
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i); if (!title || !text(title[1])) add('2.4.2','high','Page has no non-empty title.',title?.[0] || '<head>','Add a concise, unique <title>.');
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>/gi)].map((m) => Number(m[1]));
  for (let i=1;i<headings.length;i++) if (headings[i] > headings[i-1]+1) { add('1.3.1','medium',`Heading level jumps from h${headings[i-1]} to h${headings[i]}.`,`h${headings[i-1]} → h${headings[i]}`,'Use a nested heading level or restructure the section.'); break; }
  for (const m of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) { const a=attrs(m[1]); if (!text(m[2]) && !a['aria-label'] && !a.title) add('2.4.4','high','Link has no accessible name.',m[0],'Add visible text or an aria-label that states the destination.'); }
  for (const m of html.matchAll(/<(input|select|textarea)\b([^>]*)>/gi)) { const tag=m[1].toLowerCase(), a=attrs(m[2]); if (tag==='input' && ['hidden','submit','button','reset','image'].includes((a.type||'text').toLowerCase())) continue; if (isInsideHiddenHoneypot(html,m.index)) continue; const escapedId=(a.id||'').replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); const labelled = a['aria-label'] || a['aria-labelledby'] || (escapedId && new RegExp(`<label[^>]*\\bfor\\s*=\\s*(?:["']?${escapedId}["']?)`, 'i').test(html)); if (!labelled) add('3.3.2','high',`${tag} has no programmatic label.`,m[0],'Associate a <label for>, aria-label, or aria-labelledby.'); }
  for (const m of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) { const a=attrs(m[1]); if (!text(m[2]) && !a['aria-label'] && !a.title) add('4.1.2','high','Button has no accessible name.',m[0],'Add a visible label or aria-label.'); }
  for (const m of html.matchAll(/<iframe\b([^>]*)>/gi)) { const a=attrs(m[1]); if (!a.title) add('4.1.2','medium','Frame has no accessible name.',m[0],'Add a descriptive title attribute.'); }
  for (const m of html.matchAll(/\btabindex\s*=\s*["']?([1-9]\d*)/gi)) add('2.4.3','medium','Positive tabindex can create an unexpected focus order.',m[0],'Use tabindex="0" only when needed; rely on DOM order.');
  for (const m of html.matchAll(/<(div|span)\b([^>]*\bonclick\s*=\s*[^>]+)>/gi)) { const a=attrs(m[2]); if (!a.role && !Object.hasOwn(a,'tabindex')) add('2.1.1','high','Clickable non-semantic element may be unavailable by keyboard.',m[0],'Use a native <button> or implement keyboard behavior, role, and focus deliberately.'); }
  return reportFromIssues(issues, options);
}
function reportFromIssues(issues, { level='AA', version='2.2', source='inline HTML' } = {}) {
  const criteria = criteriaFor(level, version);
  const automated = criteria.filter((r) => r.verification === 'automated').map((r) => r.id);
  return { schemaVersion:'1.0', generatedAt:new Date().toISOString(), source, wcag:{version,level,criteriaInScope:criteria.length}, summary:{issues:issues.length,critical:issues.filter(i=>i.severity==='critical').length,high:issues.filter(i=>i.severity==='high').length,medium:issues.filter(i=>i.severity==='medium').length,low:issues.filter(i=>i.severity==='low').length,automatedCriteria:automated.length,manualOrSemiAutomatedCriteria:criteria.length-automated.length}, issues, manualReview:criteria.filter((r)=>r.verification!=='automated').map(({id,title,level,verification,url})=>({id,title,level,verification,url})), disclaimer:'This report identifies machine-detectable evidence and review prompts. It is not a conformance claim, legal advice, or a substitute for expert manual testing with users and assistive technology.' };
}
module.exports = { scanHtml, reportFromIssues };
