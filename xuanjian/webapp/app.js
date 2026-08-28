import {$} from './core/utils.js';
import {getState,subscribe} from './core/store.js';
import {initRouter} from './core/router.js';
import {initAuth,ensureAuth,renderAuth} from './modules/auth.js';
import {initChart} from './modules/chart.js';
import {initDashboard,renderDashboard} from './modules/dashboard.js';
import {initDeepSeek,checkDeepSeek,renderDeepSeek} from './modules/deepseek.js';
import {initAI,renderAI} from './modules/ai.js';
import {initHistory,loadHistory,renderHistory} from './modules/history.js';
import {initVisual,renderVisual} from './modules/visual.js';
function render(s){renderAuth(s);renderDashboard(s);renderDeepSeek(s);renderAI(s);renderVisual(s);renderHistory(s)}
async function boot(){initRouter();initAuth();initChart();initDashboard();initDeepSeek();initAI();initHistory();initVisual();subscribe((s,meta)=>{render(s);if(meta?.type==='auth'&&s.auth.user){checkDeepSeek();loadHistory()}});setInterval(()=>{$('clock').textContent='資料同步：'+new Date().toLocaleString('zh-TW',{hour12:false})},1000);await ensureAuth();render(getState());if(getState().auth.user){await checkDeepSeek();await loadHistory()}}
boot();
