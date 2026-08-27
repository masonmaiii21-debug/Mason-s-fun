#!/usr/bin/env node
const { Solar } = require('lunar-javascript');
function args() { const out = {}; for (let i = 2; i < process.argv.length; i += 2) out[process.argv[i].replace(/^--/, '')] = process.argv[i + 1]; return out; }
function call(obj, name, ...xs) { try { return obj && typeof obj[name] === 'function' ? obj[name](...xs) : null; } catch { return null; } }
const a = args();
if (!a.solar) throw new Error('Missing --solar YYYY-MM-DD');
const [y,m,d] = a.solar.split('-').map(Number);
const hour = Number(a.hour ?? 0), minute = Number(a.minute ?? 0), second = Number(a.second ?? 0);
const genderCode = String(a.gender || 'male').toLowerCase().startsWith('m') || a.gender === '男' ? 1 : 0;
const sect = Number(a.sect ?? 2);
const solar = Solar.fromYmdHms(y,m,d,hour,minute,second);
const lunar = solar.getLunar();
const ec = lunar.getEightChar();
if (typeof ec.setSect === 'function') ec.setSect(sect);
const yun = call(ec, 'getYun', genderCode, sect);
const dayun = call(yun, 'getDaYun', 10) || [];
const pillars = ['Year','Month','Day','Time'];
const p = {};
for (const k of pillars) p[k.toLowerCase()] = { ganzhi: call(ec, `get${k}`), hiddenStems: call(ec, `get${k}HideGan`), tenGodStem: call(ec, `get${k}ShiShenGan`), tenGodBranch: call(ec, `get${k}ShiShenZhi`), nayin: call(ec, `get${k}NaYin`), stage: call(ec, `get${k}DiShi`) };
const result = { source: 'lunar-javascript', input: { solar: a.solar, hour, minute, second, gender: a.gender || 'male', sect }, solar: call(solar, 'toYmdHms'), lunar: call(lunar, 'toFullString') || call(lunar, 'toString'), pillars: p, dayMaster: p.day.ganzhi ? p.day.ganzhi[0] : null, taiYuan: call(ec, 'getTaiYuan'), mingGong: call(ec, 'getMingGong'), shenGong: call(ec, 'getShenGong'), yun: yun ? { startYear: call(yun, 'getStartYear'), startMonth: call(yun, 'getStartMonth'), startDay: call(yun, 'getStartDay'), startSolar: call(call(yun, 'getStartSolar'), 'toYmd') } : null, dayun: dayun.map(x => ({ index: call(x,'getIndex'), ganzhi: call(x,'getGanZhi'), startYear: call(x,'getStartYear'), endYear: call(x,'getEndYear'), startAge: call(x,'getStartAge'), endAge: call(x,'getEndAge') })) };
console.log(JSON.stringify(result, null, 2));
