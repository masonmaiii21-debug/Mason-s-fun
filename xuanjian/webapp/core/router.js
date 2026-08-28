import {setState,getState,subscribe} from './store.js';
const valid=new Set(['home','chart','visual','report','account']);
function fromHash(){const p=location.hash.replace(/^#\/?/,'');return valid.has(p)?p:'home'}
export function go(route,{replace=false}={}){if(!valid.has(route))route='home';const h='#/'+route;replace?history.replaceState(null,'',h):history.pushState(null,'',h);setState({route},{type:'route'})}
export function initRouter(){addEventListener('hashchange',()=>setState({route:fromHash()},{type:'route'}));document.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();go(b.dataset.page)}));setState({route:fromHash()},{type:'route'});subscribe(s=>renderRoute(s.route))}
function renderRoute(route){document.querySelectorAll('.page').forEach(x=>x.classList.toggle('active',x.id===route));document.querySelectorAll('#nav button').forEach(x=>x.classList.toggle('active',x.dataset.page===route));if(getState().auth.user)document.title=`玄鑑 Advanced · ${routeName(route)}`}
function routeName(r){return({home:'總覽',chart:'八字紫微',visual:'面相手相',report:'詳批全書',account:'歷史記錄'})[r]||'總覽'}
