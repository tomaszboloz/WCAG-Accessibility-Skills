#!/usr/bin/env node
'use strict';
const { RULES } = require('../src');
const timeoutMs=10000;
async function check(url){const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),timeoutMs);try{let response=await fetch(url,{method:'HEAD',redirect:'follow',signal:controller.signal});if(response.status===405)response=await fetch(url,{method:'GET',redirect:'follow',signal:controller.signal});return {url,status:response.status,ok:response.ok};}catch(error){return {url,error:error.message,ok:false};}finally{clearTimeout(timer);}}
async function main(){const results=[];for(let index=0;index<RULES.length;index+=6){results.push(...await Promise.all(RULES.slice(index,index+6).map((rule)=>check(rule.url))));}const failed=results.filter((result)=>!result.ok);for(const result of failed)console.error(`${result.status||'ERROR'} ${result.url}${result.error?`: ${result.error}`:''}`);console.log(`Verified ${results.length-failed.length}/${results.length} official W3C Understanding URLs.`);process.exitCode=failed.length?1:0;}
main();
