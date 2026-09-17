'use strict';

// WCAG 2.2 contains 86 active success criteria. Verification is deliberately
// classified: automation can find evidence, but cannot certify human intent.
const rows = [
['1.1.1','Non-text Content','A','automated'],['1.2.1','Audio-only and Video-only (Prerecorded)','A','manual'],['1.2.2','Captions (Prerecorded)','A','manual'],['1.2.3','Audio Description or Media Alternative (Prerecorded)','A','manual'],['1.2.4','Captions (Live)','AA','manual'],['1.2.5','Audio Description (Prerecorded)','AA','manual'],['1.2.6','Sign Language (Prerecorded)','AAA','manual'],['1.2.7','Extended Audio Description (Prerecorded)','AAA','manual'],['1.2.8','Media Alternative (Prerecorded)','AAA','manual'],['1.2.9','Audio-only (Live)','AAA','manual'],
['1.3.1','Info and Relationships','A','semi-automated'],['1.3.2','Meaningful Sequence','A','manual'],['1.3.3','Sensory Characteristics','A','manual'],['1.3.4','Orientation','AA','manual'],['1.3.5','Identify Input Purpose','AA','semi-automated'],['1.3.6','Identify Purpose','AAA','manual'],
['1.4.1','Use of Color','A','manual'],['1.4.2','Audio Control','A','semi-automated'],['1.4.3','Contrast (Minimum)','AA','semi-automated'],['1.4.4','Resize Text','AA','manual'],['1.4.5','Images of Text','AA','semi-automated'],['1.4.6','Contrast (Enhanced)','AAA','semi-automated'],['1.4.7','Low or No Background Audio','AAA','manual'],['1.4.8','Visual Presentation','AAA','manual'],['1.4.9','Images of Text (No Exception)','AAA','semi-automated'],['1.4.10','Reflow','AA','manual'],['1.4.11','Non-text Contrast','AA','semi-automated'],['1.4.12','Text Spacing','AA','manual'],['1.4.13','Content on Hover or Focus','AA','semi-automated'],
['2.1.1','Keyboard','A','semi-automated'],['2.1.2','No Keyboard Trap','A','manual'],['2.1.3','Keyboard (No Exception)','AAA','manual'],['2.1.4','Character Key Shortcuts','A','semi-automated'],
['2.2.1','Timing Adjustable','A','manual'],['2.2.2','Pause, Stop, Hide','A','manual'],['2.2.3','No Timing','AAA','manual'],['2.2.4','Interruptions','AAA','manual'],['2.2.5','Re-authenticating','AAA','manual'],['2.2.6','Timeouts','AAA','manual'],
['2.3.1','Three Flashes or Below Threshold','A','manual'],['2.3.2','Three Flashes','AAA','manual'],['2.3.3','Animation from Interactions','AAA','semi-automated'],
['2.4.1','Bypass Blocks','A','semi-automated'],['2.4.2','Page Titled','A','automated'],['2.4.3','Focus Order','A','semi-automated'],['2.4.4','Link Purpose (In Context)','A','semi-automated'],['2.4.5','Multiple Ways','AA','manual'],['2.4.6','Headings and Labels','AA','semi-automated'],['2.4.7','Focus Visible','AA','manual'],['2.4.8','Location','AAA','manual'],['2.4.9','Link Purpose (Link Only)','AAA','manual'],['2.4.10','Section Headings','AA','semi-automated'],['2.4.11','Focus Not Obscured (Minimum)','AA','manual'],['2.4.12','Focus Not Obscured (Enhanced)','AAA','manual'],['2.4.13','Focus Appearance','AAA','manual'],
['2.5.1','Pointer Gestures','A','manual'],['2.5.2','Pointer Cancellation','A','manual'],['2.5.3','Label in Name','A','semi-automated'],['2.5.4','Motion Actuation','A','manual'],['2.5.5','Target Size (Enhanced)','AAA','manual'],['2.5.6','Concurrent Input Mechanisms','A','manual'],['2.5.7','Dragging Movements','AA','manual'],['2.5.8','Target Size (Minimum)','AA','semi-automated'],
['3.1.1','Language of Page','A','automated'],['3.1.2','Language of Parts','AA','semi-automated'],['3.1.3','Unusual Words','AAA','manual'],['3.1.4','Abbreviations','AAA','manual'],['3.1.5','Reading Level','AAA','manual'],['3.1.6','Pronunciation','AAA','manual'],
['3.2.1','On Focus','A','manual'],['3.2.2','On Input','A','manual'],['3.2.3','Consistent Navigation','AA','manual'],['3.2.4','Consistent Identification','AA','semi-automated'],['3.2.5','Change on Request','AAA','manual'],['3.2.6','Consistent Help','A','manual'],
['3.3.1','Error Identification','A','semi-automated'],['3.3.2','Labels or Instructions','A','automated'],['3.3.3','Error Suggestion','AA','semi-automated'],['3.3.4','Error Prevention (Legal, Financial, Data)','AA','manual'],['3.3.5','Help','AAA','manual'],['3.3.6','Error Prevention (All)','AAA','manual'],['3.3.7','Redundant Entry','A','manual'],['3.3.8','Accessible Authentication (Minimum)','AA','manual'],['3.3.9','Accessible Authentication (Enhanced)','AAA','manual'],
['4.1.2','Name, Role, Value','A','automated'],['4.1.3','Status Messages','AA','semi-automated']
];
const RULES = rows.map(([id,title,level,verification]) => ({ id, title, level, verification, url: `https://www.w3.org/WAI/WCAG22/Understanding/${id.replace('.', '')}.html` }));
const WCAG_21_ONLY = { id:'4.1.1', title:'Parsing', level:'A', verification:'semi-automated', url:'https://www.w3.org/WAI/WCAG21/Understanding/parsing.html' };
const LEVELS = { A: 1, AA: 2, AAA: 3 };
function criteriaFor(level = 'AA', version = '2.2') {
  const max = LEVELS[level];
  if (!max) throw new Error(`Unsupported conformance level: ${level}`);
  const matching = RULES.filter((rule) => LEVELS[rule.level] <= max && (version === '2.2' || !['2.4.11','2.4.12','2.4.13','2.5.7','2.5.8','3.2.6','3.3.7','3.3.8','3.3.9'].includes(rule.id)));
  return version === '2.1' && LEVELS[WCAG_21_ONLY.level] <= max ? [...matching, WCAG_21_ONLY] : matching;
}
module.exports = { RULES, WCAG_21_ONLY, LEVELS, criteriaFor };
