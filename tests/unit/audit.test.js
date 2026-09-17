'use strict';
const test=require('node:test');const assert=require('node:assert/strict');const {scanHtml}=require('../../src');
test('flags common deterministic failures',()=>{const r=scanHtml('<html><head></head><body><img src=x><a href=x></a><input type=text><button></button></body></html>');assert.deepEqual(new Set(r.issues.map(i=>i.criterion)),new Set(['1.1.1','3.1.1','2.4.2','2.4.4','3.3.2','4.1.2']));});
test('does not report labelled basic controls',()=>{const r=scanHtml('<html lang=en><head><title>Test</title></head><body><img alt="Chart"><a href=x>Read more</a><label for=email>Email</label><input id=email><button>Save</button></body></html>');assert.equal(r.issues.length,0);});
test('does not report an aria-hidden honeypot control as an unlabeled field',()=>{const r=scanHtml('<html lang=en><head><title>Test</title></head><body><div class="honeypot" aria-hidden="true"><input type=text tabindex=-1></div></body></html>');assert.equal(r.issues.some((item)=>item.criterion==='3.3.2'),false);});
test('rejects empty audit input',()=>assert.throws(()=>scanHtml(''),/non-empty HTML/));
