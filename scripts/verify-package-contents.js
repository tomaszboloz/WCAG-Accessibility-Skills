#!/usr/bin/env node
'use strict';
const { spawnSync } = require('node:child_process');
const result = spawnSync('npm', ['pack', '--dry-run', '--json'], { encoding: 'utf8' });
if (result.status !== 0) { console.error(result.stderr || 'npm pack --dry-run failed.'); process.exit(result.status || 1); }
const pack = JSON.parse(result.stdout)[0];
const paths = pack.files.map((file) => file.path);
const allowed = (file) => file === 'LICENSE' || file === 'README.md' || file === 'package.json' || file.startsWith('bin/') || file.startsWith('src/');
const unexpected = paths.filter((file) => !allowed(file));
const required = ['LICENSE', 'README.md', 'package.json', 'bin/wcag-skill.js', 'src/index.js', 'src/core/audit.js', 'src/core/input.js', 'src/core/report.js', 'src/core/rules.js'];
const missing = required.filter((file) => !paths.includes(file));
if (unexpected.length || missing.length) { if (unexpected.length) console.error(`Unexpected npm files:\n${unexpected.join('\n')}`); if (missing.length) console.error(`Missing npm files:\n${missing.join('\n')}`); process.exitCode = 1; } else { console.log(`Verified ${paths.length} runtime files in ${pack.filename}.`); }
