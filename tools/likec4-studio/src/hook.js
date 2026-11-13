// اتصال موتور LikeC4 به استودیو: هر تغییر نقشه → همان متن .c4 به LikeC4 داده می‌شود
(function(){
  const badge=document.createElement('button');badge.id='lc4badge';badge.className='sm';badge.textContent='LikeC4 …';
  badge.title='اعتبارسنجی و چیدمان با موتور رسمی LikeC4 (داخل همین صفحه، بدون اینترنت)';
  const pop=document.createElement('div');pop.id='lc4pop';pop.hidden=true;
  const css=document.createElement('style');css.textContent='#lc4badge{margin-inline-start:6px}#lc4badge.ok{color:#16a34a;border-color:#16a34a}#lc4badge.bad{color:#dc2626;border-color:#dc2626}#lc4pop{position:fixed;top:56px;right:72px;z-index:60;width:min(520px,92vw);max-height:60vh;overflow:auto;background:var(--card,#fff);color:var(--ink,#222);border:1px solid var(--line,#ccc);border-radius:10px;box-shadow:0 10px 30px #0003;padding:12px 14px;font-size:13px}#lc4pop li{margin:4px 0}';
  document.head.append(css);document.body.append(pop);
  let last='',timer=null,res=null;
  const place=()=>{const top=document.querySelector('.top');if(top&&!top.contains(badge))top.append(badge)};
  function show(){pop.replaceChildren();const F=n=>typeof toFa==='function'?toFa(n):n;const h=(t,x)=>{const e=document.createElement(t);e.textContent=x;return e};
    pop.append(h('b','موتور LikeC4 '+LikeC4Engine.version));
    if(!res){pop.append(h('p','در حال خواندن…'));return}
    pop.append(h('p',`${F(res.views.length)} نما ساخته شد در ${F(res.ms)} میلی‌ثانیه.`));
    if(res.errors.length){const ul=document.createElement('ul');res.errors.slice(0,50).forEach(e=>ul.append(h('li',(e.line!=null?'خط '+F(e.line+1)+': ':'')+e.message)));pop.append(h('p','خطاهای LikeC4 در خروجی .c4 همین نقشه:'),ul)}
    else pop.append(h('p','✓ خروجی .c4 این نقشه از نظر خود LikeC4 معتبر است.'))}
  badge.onclick=e=>{e.stopPropagation();pop.hidden=!pop.hidden;show()};
  document.addEventListener('click',e=>{if(!pop.contains(e.target)&&e.target!==badge)pop.hidden=true});
  async function check(){place();let t;try{t=cur()}catch(e){return}if(t===last)return;last=t;badge.className='sm';badge.textContent='LikeC4 …';
    try{res=await LikeC4Engine.check(t)}catch(e){res={errors:[{message:String(e.message||e)}],views:[],ms:0}}
    if(t!==last)return;const n=res.errors.length;badge.className='sm '+(n?'bad':'ok');badge.textContent=n?`LikeC4 ✗ ${typeof toFa==='function'?toFa(n):n} خطا`:`LikeC4 ✓ ${typeof toFa==='function'?toFa(res.views.length):res.views.length} نما`;if(!pop.hidden)show()}
  const start=()=>{place();check();setInterval(()=>{clearTimeout(timer);timer=setTimeout(check,400)},1200)};
  if(window.LikeC4Engine)start();else addEventListener('likec4-ready',start,{once:true});
})();
