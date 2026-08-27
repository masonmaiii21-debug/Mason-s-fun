#!/usr/bin/env node
const { Solar } = require('lunar-javascript');
function args(){const o={};for(let i=2;i<process.argv.length;i+=2)o[process.argv[i].replace(/^--/,'')]=process.argv[i+1];return o;}
function c(o,n,...x){try{return o&&typeof o[n]==='function'?o[n](...x):null}catch{return null}}
const a=args(); if(!a.date) throw new Error('Missing --date YYYY-MM-DD');
const [y,m,d]=a.date.split('-').map(Number); const lunar=Solar.fromYmd(y,m,d).getLunar();
const result={ source:'lunar-javascript', date:a.date, lunar:c(lunar,'toFullString')||c(lunar,'toString'), dayGanZhi:c(lunar,'getDayInGanZhi'), yi:c(lunar,'getDayYi'), ji:c(lunar,'getDayJi'), chong:c(lunar,'getDayChongDesc'), sha:c(lunar,'getDaySha'), positions:{ xi:c(lunar,'getDayPositionXiDesc'), fu:c(lunar,'getDayPositionFuDesc'), cai:c(lunar,'getDayPositionCaiDesc'), yangGui:c(lunar,'getDayPositionYangGuiDesc'), yinGui:c(lunar,'getDayPositionYinGuiDesc') }, xiu:c(lunar,'getXiu'), zhiXing:c(lunar,'getZhiXing'), dayTianShen:c(lunar,'getDayTianShen'), dayTianShenType:c(lunar,'getDayTianShenType') };
console.log(JSON.stringify(result,null,2));
