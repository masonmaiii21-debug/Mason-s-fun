import {WORKSPACE_KEY} from './config.js';
const initial={auth:{session:null,user:null,status:'booting'},route:'home',ds:{status:'idle',ok:false,model:'—',message:'—',latencyMs:null},chart:null,selectedYear:new Date().getFullYear(),selectedPalace:null,visual:null,report:'',reportParts:[],reportStatus:{running:false,completed:0,total:5,current:'',chars:0,sections:0},history:[],ui:{notice:''}};
let state=structuredClone(initial);const listeners=new Set();
export const getState=()=>state;
export function setState(patch,meta={}){const next=typeof patch==='function'?patch(state):patch;state={...state,...next};listeners.forEach(fn=>fn(state,meta))}
export function updateSlice(key,patch,meta={}){const curr=state[key]||{};setState({[key]:typeof patch==='function'?patch(curr):{...curr,...patch}},meta)}
export function subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)}
export function resetWorkspace(){const{auth,ds}=state;state={...structuredClone(initial),auth,ds,selectedYear:new Date().getFullYear()};listeners.forEach(fn=>fn(state,{type:'workspace-reset'}))}
export function persistWorkspace(){const s=getState();if(!s.auth.user?.id)return;const payload={chart:s.chart,selectedYear:s.selectedYear,selectedPalace:s.selectedPalace,visual:s.visual,report:s.report,reportParts:s.reportParts};localStorage.setItem(`${WORKSPACE_KEY}:${s.auth.user.id}`,JSON.stringify(payload))}
export function restoreWorkspace(userId){try{const raw=localStorage.getItem(`${WORKSPACE_KEY}:${userId}`);if(!raw)return false;const w=JSON.parse(raw);setState({...w,reportStatus:{...initial.reportStatus,chars:(w.report||'').length,sections:countSections(w.report||'')}},{type:'workspace-restore'});return true}catch{return false}}
function countSections(text){return(text.match(/^#\s+/gm)||[]).length}
