#!/usr/bin/env node
const { astro } = require('iztro');
function args() { const o={}; for(let i=2;i<process.argv.length;i+=2)o[process.argv[i].replace(/^--/,'')]=process.argv[i+1]; return o; }
const a=args();
if(!a.solar) throw new Error('Missing --solar YYYY-MM-DD');
const hour=Number(a.hour ?? 0);
const gender=(a.gender==='女'||String(a.gender||'male').toLowerCase().startsWith('f'))?'女':'男';
const timeIndex = hour === 23 ? 12 : (hour === 0 ? 0 : Math.floor((hour + 1) / 2));
const chart=astro.bySolar(a.solar,timeIndex,gender,true,'zh-CN');
const output={ source:'iztro', input:{solar:a.solar,hour,gender,timeIndex}, chart: typeof chart.toJSON==='function' ? chart.toJSON() : chart };
if(a.year){ const target=`${Number(a.year)}-07-01`; output.targetYear=Number(a.year); output.horoscope=chart.horoscope(target); }
console.log(JSON.stringify(output,null,2));
