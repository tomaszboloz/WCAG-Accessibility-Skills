'use strict';
const test=require('node:test');const assert=require('node:assert/strict');const {execFile}=require('node:child_process');const {promisify}=require('node:util');const run=promisify(execFile);
test('CLI emits a JSON audit report',async()=>{try{await run(process.execPath,['bin/wcag-skill.js','audit','<html lang=en><head><title>x</title></head><body></body></html>','--format','json']);assert.ok(true);}catch(error){assert.equal(error.stdout.includes('"schemaVersion"'),true);}});
test('CLI accepts the slash-prefixed wcag command',async()=>{const {stdout}=await run(process.execPath,['bin/wcag-skill.js','/wcag-check','1.1.1']);assert.equal(JSON.parse(stdout).id,'1.1.1');});
