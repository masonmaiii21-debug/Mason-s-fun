export const $=id=>document.getElementById(id);
export function err(e){if(!e)return'未知錯誤';if(typeof e==='string')return e;for(const k of['message','error','msg','error_description','details','hint']){const v=e?.[k];if(typeof v==='string'&&v)return v;if(v&&typeof v==='object'){const nested=err(v);if(nested)return nested}}try{return JSON.stringify(e)}catch{return'未知錯誤'}}
export const esc=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
export function safe(fn,fallback=''){try{return fn()??fallback}catch{return fallback}}
