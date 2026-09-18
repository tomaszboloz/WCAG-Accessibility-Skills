'use strict';
const test=require('node:test');const assert=require('node:assert/strict');const {RULES,criteriaFor}=require('../../src');
test('registry has every active WCAG 2.2 criterion once',()=>{assert.equal(RULES.length,86);assert.equal(new Set(RULES.map(r=>r.id)).size,86);});
test('WCAG 2.1 excludes criteria added by WCAG 2.2',()=>{assert.equal(criteriaFor('AAA','2.1').length,78);assert.equal(criteriaFor('AAA','2.2').length,86);});
test('level filtering is cumulative',()=>{assert.ok(criteriaFor('A').length<criteriaFor('AA').length);assert.ok(criteriaFor('AA').length<criteriaFor('AAA').length);});
test('WCAG 2.2 AA contains the official 55-criterion scope',()=>{assert.equal(criteriaFor('AA','2.2').length,55);assert.equal(RULES.find((rule)=>rule.id==='2.4.10').level,'AAA');assert.equal(RULES.find((rule)=>rule.id==='2.5.6').level,'AAA');});
test('every active WCAG 2.2 criterion has a semantic official Understanding URL',()=>{assert.equal(new Set(RULES.map((rule)=>rule.url)).size,86);for(const rule of RULES){assert.match(rule.url,/^https:\/\/www\.w3\.org\/WAI\/WCAG22\/Understanding\/[a-z0-9-]+\.html$/);assert.equal(rule.url.includes(rule.id.replace('.','')),false);}});
