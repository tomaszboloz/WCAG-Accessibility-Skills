'use strict';
const test=require('node:test');const assert=require('node:assert/strict');const {RULES,criteriaFor}=require('../../src');
test('registry has every active WCAG 2.2 criterion once',()=>{assert.equal(RULES.length,86);assert.equal(new Set(RULES.map(r=>r.id)).size,86);});
test('WCAG 2.1 excludes criteria added by WCAG 2.2',()=>{assert.equal(criteriaFor('AAA','2.1').length,78);assert.equal(criteriaFor('AAA','2.2').length,86);});
test('level filtering is cumulative',()=>{assert.ok(criteriaFor('A').length<criteriaFor('AA').length);assert.ok(criteriaFor('AA').length<criteriaFor('AAA').length);});
