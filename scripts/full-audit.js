#!/usr/bin/env node
'use strict';
const { spawn }=require('node:child_process');
const args=process.argv.slice(2); if(!args[0]){console.error('Usage: full-audit.js <url|file|html> [options]');process.exit(2);} const child=spawn(process.execPath,['bin/wcag-skill.js','audit',args[0],'--level','AAA','--version','2.2',...args.slice(1)],{stdio:'inherit'});child.on('exit',(code)=>process.exitCode=code);
