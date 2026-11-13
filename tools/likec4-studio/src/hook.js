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
    else pop.append(h('p','✓ خروجی .c4 این نقشه از نظر خود LikeC4 معتبر است.'))
    if(window.LikeC4Layout&&!res.errors.length){const b=h('button','⬇ چیدمان همین نما برای LikeC4 (.likec4.snap)');b.className='sm';b.onclick=async e=>{e.stopPropagation();b.disabled=true;
      try{const r=await LikeC4Layout.snapCurrent();if(r.error)throw new Error(r.error);const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([r.text],{type:'text/plain'}));a.download=r.viewId+'.likec4.snap';a.click();
        b.after(h('p',`نمای ${r.viewId}: ${F(r.placed)} گره از بوم استودیو · drift: ${r.drifts.length?r.drifts.join('، '):'ندارد'} · فایل را در پوشهٔ .likec4 کنار .c4 بگذار.`))}catch(err){b.after(h('p','نشد: '+err.message))}b.disabled=false};pop.append(b)}
    if(res.parsed&&window.LikeC4Reader){try{const o=parseC4(last),d=LikeC4Reader.diff(LikeC4Reader.fromLikeC4(res.parsed,last,o),o);
      pop.append(h('p',d.length?`خواندن دوتایی: ${F(d.length)} فرق بین خوانش LikeC4 و مبدل استودیو (مبدل استودیو فعلاً اصلی است).`:'✓ خواندن دوتایی: خوانش LikeC4 و مبدل استودیو یکسان‌اند.'))}catch(e){}}}
  badge.onclick=e=>{e.stopPropagation();pop.hidden=!pop.hidden;show()};
  document.addEventListener('click',e=>{if(!pop.contains(e.target)&&e.target!==badge)pop.hidden=true});
  window.LikeC4Engine={ask:(op,text)=>new Promise((ok,no)=>{if(!W||state!=='ready')return no(new Error('engine not ready'));const id=++seq;wait.set(id,ok);W.postMessage(typeof text==='string'?{id,op,text}:{id,op,...text})}),get state(){return state}};
  async function check(){place();if(state!=='ready')return;let t;try{t=cur()}catch(e){return}if(t===last||busy)return;last=t;busy=true;badge.className='sm';badge.textContent='LikeC4 …';
    let r;try{r=await LikeC4Engine.ask('parse',t)}finally{busy=false}if(t!==last)return;res=r;const n=r.errors.length;
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

/* LIKEC4-READER — فرق ۲: «یک دستورزبان، یک خواننده».
   LikeC4 متن .c4 را می‌خواند (parsedModel) و همین تابع مدل استودیو (همان شکل parseC4) را از آن می‌سازد.
   فقط نشانه‌های قالب‌بندی (خط خالی بین گره‌ها، جای نوشتن فلش‌ها) از خوانندهٔ قدیمی برداشته می‌شود تا فایل ذخیره‌شده عوض نشود.
   مبدل قدیمی (parseC4) کنار آن می‌ماند و هر دو روی همان متن مقایسه می‌شوند (Strangler Fig). */
(function(){
  const A=x=>Array.isArray(x)?x:(x==null?[]:[x]);
  const txt=d=>d==null?undefined:(typeof d==='string'?d:(d.txt??d.md));
  // مدل استودیو از خروجی LikeC4
  function fromLikeC4(P,text,old){
    const spec=(P.specification&&P.specification.elements)||{};
    const els=Object.values(P.elements||{});
    const byId=new Map(),roots=[];
    for(const e of els){const fq=e.id,parts=fq.split('.');
      const st=e.style||{},ks=(spec[e.kind]&&spec[e.kind].style)||{};
      const n={id:parts[parts.length-1],kind:e.kind,title:e.title,tags:A(e.tags).slice(),children:[]};
      if(st.icon&&st.icon!==ks.icon)n.icon=st.icon;
      if(e.technology)n.tech=e.technology;
      const ds=txt(e.description);if(ds)n.desc=ds;
      if(e.metadata&&Object.keys(e.metadata).length){n.meta=[];for(const[k,v]of Object.entries(e.metadata))A(v).forEach(x=>n.meta.push([k,String(x)]))}
      byId.set(fq,n);const par=parts.slice(0,-1).join('.');(par&&byId.has(par)?byId.get(par).children:roots).push(n)}
    const rels=Object.values(P.relations||{}).map(r=>{const o={from:r.source.model,to:r.target.model,c:[]};const l=r.title;if(l)o.label=l;return o});
    // پیش‌متن و نماها همان برش‌های متن‌اند (این‌ها مدل نیستند)
    const t=text.replace(/\r\n/g,'\n'),mi=t.search(/^model\s*\{/m),mo=t.indexOf('{',mi);
    let d=0,mc=-1;for(let i=mo;i<t.length;i++){const c=t[i];if(c==="'"||c==='"'){i++;while(i<t.length&&t[i]!==c){if(t[i]==='\\')i++;i++}continue}if(c==='/'&&t[i+1]==='/'){while(i<t.length&&t[i]!=='\n')i++;continue}if(c==='{')d++;else if(c==='}'&&--d===0){mc=i;break}}
    const vi=t.search(/^views\s*\{/m);
    const M={pre:t.slice(0,mi),mid:t.slice(mc+1,vi<0?t.length:vi),views:vi<0?'':t.slice(vi),nodes:roots,rels};
    if(old){ // نشانه‌های قالب‌بندی از خوانندهٔ قدیمی
      const og=new Map();walk(old.nodes,'',(n,p)=>og.set(p,n));
      walk(M.nodes,'',(n,p)=>{const o=og.get(p);if(o&&o.gap!==undefined)n.gap=o.gap});
      const used=new Set();
      M.rels.forEach(r=>{const i=old.rels.findIndex((o,j)=>!used.has(j)&&o.from===r.from&&o.to===r.to&&(o.label||'')===(r.label||''));if(i>=0){used.add(i);r.c=old.rels[i].c.slice();if(old.rels[i].gap!==undefined)r.gap=old.rels[i].gap}});
      M.rels.sort((a,b)=>{const ia=old.rels.findIndex(o=>o.from===a.from&&o.to===a.to),ib=old.rels.findIndex(o=>o.from===b.from&&o.to===b.to);return (ia<0?1e9:ia)-(ib<0?1e9:ib)})}
    return M}
  // خلاصهٔ معنایی برای مقایسه (بی‌توجه به قالب‌بندی)
  function semantic(M){const N=[],R=[];walk(M.nodes,'',(n,p)=>N.push([p,n.kind,n.title,n.tags.slice().sort().join(','),n.icon||'',n.tech||'',n.desc||'',(n.meta||[]).map(x=>x.join('=')).join('|')].join(' ¦ ')));
    M.rels.forEach(r=>R.push([r.from,r.to,r.label||''].join(' → ')));return{N,R:R.sort()}}
  function diff(a,b){const A=semantic(a),B=semantic(b),out=[];
    const sa=new Set(A.N),sb=new Set(B.N);A.N.forEach(x=>{if(!sb.has(x))out.push('فقط LikeC4: '+x)});B.N.forEach(x=>{if(!sa.has(x))out.push('فقط قدیمی: '+x)});
    const ra=A.R.join('\n'),rb=B.R.join('\n');if(ra!==rb){const xa=new Set(A.R),xb=new Set(B.R);A.R.forEach(x=>{if(!xb.has(x))out.push('فلش فقط LikeC4: '+x)});B.R.forEach(x=>{if(!xa.has(x))out.push('فلش فقط قدیمی: '+x)})}
    return out}
  async function readWithLikeC4(text){const r=await LikeC4Engine.ask('parse',text);if(r.errors.length)throw new Error(r.errors.map(e=>e.message).join('؛ '));
    let old=null;try{old=parseC4(text)}catch(e){}return{M:fromLikeC4(r.parsed,text,old),old}}
  // آزمون طلایی: LikeC4 می‌خواند ← مدل استودیو ← emitC4 ← LikeC4 دوباره می‌خواند؛ دو مدل LikeC4 باید یکی باشند
  async function golden(text){const r1=await LikeC4Engine.ask('parse',text);if(r1.errors.length)return{ok:false,why:'خطای LikeC4 در متن اصلی'};
    let old=null,oldErr='';try{old=parseC4(text)}catch(e){oldErr=e.message}
    const M=fromLikeC4(r1.parsed,text,old),out=emitC4(M);
    const r2=await LikeC4Engine.ask('parse',out);
    const s1=semantic(fromLikeC4(r1.parsed,text,null)),s2=semantic(fromLikeC4(r2.parsed,out,null));
    const roundtrip=JSON.stringify(s1)===JSON.stringify(s2)&&!r2.errors.length;
    const vs=old?diff(M,old):['خوانندهٔ قدیمی نتوانست بخواند: '+oldErr];
    return{ok:roundtrip,errors2:r2.errors.length,sameAsOld:!vs.length,diffs:vs.slice(0,20),nDiffs:vs.length,sameText:out===text,nodes:s1.N.length,rels:s1.R.length}}
  window.LikeC4Reader={fromLikeC4,semantic,diff,readWithLikeC4,golden};
  // فرق ۱: جای گره‌های بوم استودیو → فایل چیدمان دستی LikeC4
  function studioPositions(){const pos={};document.querySelectorAll('#world .node[data-p]').forEach(n=>{const w=n.offsetWidth,h=n.offsetHeight;pos[n.dataset.p]={x:n.offsetLeft+w/2,y:n.offsetTop+h/2,w,h}});return pos}
  async function snapCurrent(viewId){return LikeC4Engine.ask('snap',Object.assign({text:cur()},{viewId,pos:studioPositions()}))}
  window.LikeC4Layout={studioPositions,snapCurrent};
})();
