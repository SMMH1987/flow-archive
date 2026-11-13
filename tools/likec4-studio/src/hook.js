/* LIKEC4-HOOK — موتور LikeC4 (فایل کناری likec4-engine.js) بعد از باز شدن صفحه در Web Worker بار می‌شود.
   صفحه سبک می‌ماند؛ اگر فایل موتور نبود (مثلاً باز کردن مستقیم فایل)، فقط نشان «LikeC4 خاموش» دیده می‌شود و هیچ امکانی کم نمی‌شود. */
(function(){
  const F=n=>typeof toFa==='function'?toFa(n):n;
  const badge=document.createElement('button');badge.id='lc4badge';badge.className='sm';badge.textContent='LikeC4 …';
  badge.title='اعتبارسنجی با موتور رسمی LikeC4 1.60 که در پس‌زمینه بار می‌شود';
  const pop=document.createElement('div');pop.id='lc4pop';pop.hidden=true;
  const css=document.createElement('style');css.textContent='#lc4badge{margin-inline-start:6px}#lc4badge.ok{color:#16a34a;border-color:#16a34a}#lc4badge.bad{color:#dc2626;border-color:#dc2626}#lc4badge.off{opacity:.6}#lc4pop{position:fixed;top:56px;right:72px;z-index:60;width:min(520px,92vw);max-height:60vh;overflow:auto;background:var(--card,#fff);color:var(--ink,#222);border:1px solid var(--line,#ccc);border-radius:10px;box-shadow:0 10px 30px #0003;padding:12px 14px;font-size:13px}#lc4pop li{margin:4px 0}';
  document.head.append(css);document.body.append(pop);
  let W=null,seq=0,last='',res=null,state='loading',loadMs=0,busy=false;const wait=new Map();
  const place=()=>{const top=document.querySelector('.top');if(top&&!top.contains(badge))top.append(badge)};
  const h=(t,x)=>{const e=document.createElement(t);e.textContent=x;return e};
  function show(){pop.replaceChildren(h('b','موتور LikeC4 1.60'));
    if(state==='off'){pop.append(h('p','فایل موتور (likec4-engine.js) کنار صفحه نیست یا مرورگر Worker را اجازه نداد. استودیو کامل کار می‌کند؛ فقط اعتبارسنجی LikeC4 خاموش است.'));return}
    if(!res){pop.append(h('p','در حال بار شدن در پس‌زمینه…'));return}
    pop.append(h('p',`موتور در ${F(loadMs)} میلی‌ثانیه رسید · ${F(res.views.length)} نما در ${F(res.ms)} میلی‌ثانیه ساخته شد.`));
    if(res.errors.length){const ul=document.createElement('ul');res.errors.slice(0,50).forEach(e=>ul.append(h('li',(e.line!=null?'خط '+F(e.line+1)+': ':'')+e.message)));pop.append(h('p','خطاهای LikeC4 در خروجی .c4 همین نقشه:'),ul)}
    else pop.append(h('p','✓ خروجی .c4 این نقشه از نظر خود LikeC4 معتبر است.'))}
  badge.onclick=e=>{e.stopPropagation();pop.hidden=!pop.hidden;show()};
  document.addEventListener('click',e=>{if(!pop.contains(e.target)&&e.target!==badge)pop.hidden=true});
  window.LikeC4Engine={ask:(op,text)=>new Promise((ok,no)=>{if(!W||state!=='ready')return no(new Error('engine not ready'));const id=++seq;wait.set(id,ok);W.postMessage({id,op,text})}),get state(){return state}};
  async function check(){place();if(state!=='ready')return;let t;try{t=cur()}catch(e){return}if(t===last||busy)return;last=t;busy=true;badge.className='sm';badge.textContent='LikeC4 …';
    let r;try{r=await LikeC4Engine.ask('check',t)}finally{busy=false}if(t!==last)return;res=r;const n=r.errors.length;
    badge.className='sm '+(n?'bad':'ok');badge.textContent=n?`LikeC4 ✗ ${F(n)} خطا`:`LikeC4 ✓ ${F(r.views.length)} نما`;if(!pop.hidden)show()}
  function off(){state='off';place();badge.className='sm off';badge.textContent='LikeC4 خاموش'}
  function boot(){const t0=performance.now();
    try{W=new Worker(new URL('likec4-engine.js',location.href),{type:'module'})}catch(e){return off()}
    W.onerror=()=>{if(state==='loading')off()};
    W.onmessage=({data})=>{if(data.ready){state='ready';loadMs=Math.round(performance.now()-t0);check();setInterval(check,1500);return}
      const f=wait.get(data.id);if(f){wait.delete(data.id);f(data)}}}
  place();
  // اول صفحه، بعد موتور: بعد از نمایش و بی‌کاری مرورگر
  const later=window.requestIdleCallback||(f=>setTimeout(f,300));
  if(document.readyState==='complete')later(boot);else addEventListener('load',()=>later(boot),{once:true});
})();
