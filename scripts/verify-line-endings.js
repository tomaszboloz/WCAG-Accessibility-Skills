#!/usr/bin/env node
'use strict';
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const files = execFileSync('git',['ls-files','-z'],{encoding:'buffer'}).toString('utf8').split('\0').filter(Boolean);
const crlf = files.filter((file) => fs.readFileSync(file).includes(0x0d));
if (crlf.length) { console.error(`CRLF line endings found in tracked files:\n${crlf.join('\n')}`); process.exitCode=1; } else { console.log(`Verified LF line endings in ${files.length} tracked files.`); }
