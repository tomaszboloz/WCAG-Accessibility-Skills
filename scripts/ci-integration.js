#!/usr/bin/env node
'use strict';
const {spawn}=require('node:child_process');const args=process.argv.slice(2);if(!args[0]){console.error('Usage: ci-integration.js <url|file|html> [--output report.json] [--fail-on low|medium|high|critical|none]');process.exit(2);}const c=spawn(process.execPath,['bin/wcag-skill.js','/wcag-audit',args[0],'--format','json',...args.slice(1)],{stdio:'inherit'});c.on('exit',(code)=>process.exitCode=code);
