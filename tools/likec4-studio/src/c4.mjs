// نسخهٔ موقت از parseC4/emitC4 استودیو (docs/mockups/org-flow-artifact.html). در تبدیل کامل، هر دو از همین یک فایل می‌خوانند.
const q=s=>"'"+String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'")+"'";
const toFa=n=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);
const U='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/';
const BLOCK=new Set(['orgBox','flow','role','section','project']);
const STEPKINDS={ask:'askStep',auto:'autoStep',gate:'gateStep',route:'routeStep'};
const isStep=n=>/Step$/.test(n.kind);
const CATS=['money','legal','outbound','destructive','read_or_draft'];
const CATEX={money:['payment','refund','transfer'],legal:['sign','enter_contract','file_complaint'],outbound:['publish_post','publish_ad','message_customer'],destructive:['delete_data','delete_repo'],read_or_draft:['lookup','search','draft','advice']};
const CATFA={money:'پول',legal:'حقوقی',outbound:'بیرونی (انتشار/پیام)',destructive:'نابودکننده',read_or_draft:'خواندن/پیش‌نویس'};
const PROTOS=['rest+mcp','rest','mcp','a2a','none'];

/* ───────── تجزیه ───────── */
function matchBrace(s,open){let d=0;for(let i=open;i<s.length;i++){const c=s[i];
  if(c==="'"||c==='"'){i++;while(i<s.length&&s[i]!==c){if(s[i]==='\\')i++;i++}continue}
  if(c==='/'&&s[i+1]==='/'&&(i===0||/\s/.test(s[i-1]))){while(i<s.length&&s[i]!=='\n')i++;continue}
  if(c==='{')d++;else if(c==='}'){d--;if(d===0)return i}}return -1}
function tokenize(s){const t=[];let i=0,nl=0;
  while(i<s.length){const c=s[i];
    if(c==='\n'){nl++;i++;continue}
    if(/\s/.test(c)){i++;continue}
    if(c==='/'&&s[i+1]==='/'){while(i<s.length&&s[i]!=='\n')i++;continue}
    if(c==="'"||c==='"'){let j=i+1,v='';while(j<s.length&&s[j]!==c){if(s[j]==='\\'){v+=s[j+1];j+=2}else v+=s[j++]}t.push({t:'str',v,nl});nl=0;i=j+1;continue}
    if(c==='{'||c==='}'){t.push({t:c,nl});nl=0;i++;continue}
    if(c==='-'&&s[i+1]==='>'){t.push({t:'->',nl});nl=0;i+=2;continue}
    if(c==='='){t.push({t:'=',nl});nl=0;i++;continue}
    let j=i;while(j<s.length&&!/[\s{}'"=]/.test(s[j])&&!(s[j]==='-'&&s[j+1]==='>'))j++;
    t.push({t:'w',v:s.slice(i,j),nl});nl=0;i=j}
  return t}
function parseItems(tk,st,cpath){
  const o={tags:[],children:[]};
  while(st.p<tk.length&&tk[st.p].t!=='}'){
    const k=tk[st.p],nx=tk[st.p+1];
    if(k.t!=='w'){st.p++;continue}
    if(k.v[0]==='#'){o.tags.push(k.v.slice(1));st.p++}
    else if(nx&&nx.t==='='){
      const n={id:k.v,kind:tk[st.p+2].v,title:tk[st.p+3].v,gap:k.nl>=2,tags:[],children:[]};st.p+=4;
      if(tk[st.p]&&tk[st.p].t==='{'){st.p++;Object.assign(n,parseItems(tk,st,cpath.concat(n.id)));st.p++}
      o.children.push(n)}
    else if(nx&&nx.t==='->'){
      const r={from:k.v,to:tk[st.p+2].v,c:cpath,gap:k.nl>=2};st.p+=3;
      if(tk[st.p]&&tk[st.p].t==='str'){r.label=tk[st.p].v;st.p++}
      st.rels.push(r)}
    else if(k.v==='icon'&&nx){o.icon=nx.v;st.p+=2}
    else if(k.v==='technology'&&nx){o.tech=nx.v;st.p+=2}
    else if(k.v==='description'&&nx){o.desc=nx.v;st.p+=2}
    else if(k.v==='metadata'&&nx&&nx.t==='{'){st.p+=2;o.meta=[];
      while(tk[st.p]&&tk[st.p].t!=='}'){o.meta.push([tk[st.p].v,tk[st.p+1].v]);st.p+=2}st.p++}
    else st.p++;
  }
  return o}
function parseC4(text){
  text=text.replace(/\r\n/g,'\n');
  const mi=text.search(/^model\s*\{/m);if(mi<0)throw new Error('بلوک model پیدا نشد');
  const mo=text.indexOf('{',mi),mc=matchBrace(text,mo);
  const vi=text.search(/^views\s*\{/m);
  const st={p:0,rels:[]};
  const root=parseItems(tokenize(text.slice(mo+1,mc)),st,[]);
  const M={pre:text.slice(0,mi),mid:text.slice(mc+1,vi<0?text.length:vi),views:vi<0?'':text.slice(vi),nodes:root.children,rels:st.rels};
  const idx=new Map();walk(M.nodes,'',(n,p)=>idx.set(p,n));
  const res=(c,ref)=>{for(let k=c.length;k>=0;k--){const p=c.slice(0,k).concat(ref.split('.')).join('.');if(idx.has(p))return p}return ref};
  M.rels.forEach(r=>{r.from=res(r.c,r.from);r.to=res(r.c,r.to)});
  return M}
function walk(list,pre,f,par){list.forEach((n,i)=>{const p=pre?pre+'.'+n.id:n.id;n._p=p;f(n,p,par,list,i);walk(n.children,p,f,n)})}

/* ───────── ساخت متن ───────── */
function viewsAdjust(vs,idx,M){
  if(!vs)return vs;
  const open=vs.indexOf('{'),close=vs.lastIndexOf('}');
  const head=vs.slice(0,open+1),tail=vs.slice(close);const body=vs.slice(open+1,close);
  const re=/view\s+(\w+)(?:\s+of\s+([\w.]+))?\s*\{/g;let m,pos=0;const parts=[];
  while((m=re.exec(body))){const bo=m.index+m[0].length-1,bc=matchBrace(body,bo);
    parts.push({pre:body.slice(pos,m.index),text:body.slice(m.index,bc+1),id:m[1],of:m[2]});pos=bc+1;re.lastIndex=bc+1}
  const rest=body.slice(pos);
  let keep=parts.filter(p=>!p.of||idx.has(p.of));
  const roots=M.nodes.filter(n=>n.children.length&&!isStep(n));
  const nsteps=n=>n.children.reduce((a,c)=>a+(isStep(c)?1:0)+nsteps(c),0);
  keep.forEach(p=>{
    roots.forEach(R=>{
      if(new RegExp('include\\s+'+R.id+'\\.\\*\\*').test(p.text)){
        const ex=R.children.map(c=>R.id+'.'+c.id).join(', ');
        if(/^\s*exclude [^\n]*$/m.test(p.text))p.text=ex?p.text.replace(/^(\s*)exclude [^\n]*$/m,'$1exclude '+ex):p.text.replace(/\n\s*exclude [^\n]*/,'');
        else if(ex)p.text=p.text.replace(/^(\s*)(include [^\n]*)$/m,'$1$2\n$1exclude '+ex)}});
    if(p.id==='roles'){const c=(M.nodes.find(n=>n.id==='company')||{children:[]}).children.length;p.text=p.text.replace(/[۰-۹]+ نقش؛/,toFa(c)+' نقش؛')}
    if(p.id==='hiringAll'){const hr=M.nodes.find(n=>n.id==='hiring');if(hr)p.text=p.text.replace(/همهٔ [۰-۹]+ قدم/,'همهٔ '+toFa(nsteps(hr))+' قدم')}});
  const has=new Set(keep.map(p=>p.of).filter(Boolean));
  const used=new Set(keep.map(p=>p.id));
  const add=(id,of,title)=>{if(!has.has(of)&&idx.has(of)){let nid=id,k=2;while(used.has(nid))nid=id+'_'+(k++);used.add(nid);keep.push({pre:'\n\n  ',text:`view ${nid} of ${of} {\n    title ${q(title)}\n    include *\n  }`,id:nid,of})}};
  const num=id=>(id.match(/\d+/)||[id])[0];
  M.nodes.forEach(R=>R.children.forEach(c=>{
    const p=R.id+'.'+c.id,name=c.title.replace(/^(🔒|🔓)\s*/,'').replace(/^\d+ · /,'').replace(/\s*🔒$/,'');
    if(c.kind==='role')add('v'+num(c.id),p,num(c.id)+' · '+name);
    else if(c.kind==='section')add('hsec'+num(c.id),p,num(c.id)+' · '+name);
    else if(c.kind==='project')add('vp_'+c.id,p,name)}));
  return head+keep.map(p=>p.pre+p.text).join('')+rest+tail}
function emitC4(M){
  const idx=new Map();walk(M.nodes,'',(n,p)=>idx.set(p,n));
  const byC=new Map();M.rels.forEach(r=>{const k=r.c.join('.');if(!byC.has(k))byC.set(k,[]);byC.get(k).push(r)});
  const ref=(a,c)=>{const s=a.split('.');return(c.length&&c.every((x,i)=>s[i]===x)&&s.length>c.length)?s.slice(c.length).join('.'):a};
  const body=(list,d,cp,node)=>{const I='  '.repeat(d),L=[];
    if(node){node.tags.forEach(t=>L.push(I+'#'+t));
      if(node.icon)L.push(`${I}icon ${node.icon}`);
      if(node.tech)L.push(`${I}technology ${q(node.tech)}`);
      if(node.desc)L.push(`${I}description ${q(node.desc)}`);
      if(node.meta&&node.meta.length){L.push(I+'metadata {');node.meta.forEach(([k,v])=>L.push(`${I}  ${k} ${q(v)}`));L.push(I+'}')}}
    list.forEach(ch=>{const gap=ch.gap!==undefined?ch.gap:BLOCK.has(ch.kind);if(gap&&L.length)L.push('');L.push(...elem(ch,d,cp.concat(ch.id)))});
    (byC.get(cp.join('.'))||[]).forEach((r,i)=>{const gap=r.gap!==undefined?r.gap:(i===0&&list.length&&BLOCK.has(list[list.length-1].kind));
      if(gap&&L.length)L.push('');L.push(`${I}${ref(r.from,cp)} -> ${ref(r.to,cp)}${r.label?' '+q(r.label):''}`)});
    return L};
  const elem=(n,d,cp)=>{const I='  '.repeat(d),hd=`${I}${n.id} = ${n.kind} ${q(n.title)}`,b=body(n.children,d+1,cp,n);return b.length?[hd+' {',...b,I+'}']:[hd]};
  // شمارنده‌های متنیِ توضیحات
  const co=M.nodes.find(n=>n.id==='company'),hi=M.nodes.find(n=>n.id==='hiring');
  const backup=[];const fix=(n,re,v)=>{if(n&&n.desc&&re.test(n.desc)){backup.push([n,n.desc]);n.desc=n.desc.replace(re,v)}};
  if(co)fix(co,/^[۰-۹]+ نقش/,toFa(co.children.length)+' نقش');
  if(hi)fix(hi,/^[۰-۹]+ بخش/,toFa(hi.children.length)+' بخش');
  const lines=body(M.nodes,1,[],null);
  backup.forEach(([n,d])=>n.desc=d);
  let pre=M.pre;
  const hasKind=k=>[...idx.values()].some(n=>n.kind===k);
  if((hasKind('project')||hasKind('tool'))&&!/element project/.test(pre)){
    pre=pre.replace(/^(\s*tag locked)/m,`  element project {\n    notation "پروژهٔ قابل‌فراخوانی — Claude MCP + OpenAI/REST"\n    style {\n      color sky\n      shape component\n    }\n  }\n  element tool {\n    notation "ابزار پروژه — با #gated = پشت تأیید انسانی"\n    style {\n      color secondary\n    }\n  }\n$1`);
    if(!/tag gated/.test(pre))pre=pre.replace(/^(\s*tag unknownSkill)/m,'$1\n  tag gated')}
  return pre+'model {\n'+lines.join('\n')+'\n}'+M.mid+viewsAdjust(M.views,idx,M)}

/* ───────── حالت برنامه ───────── */
export {parseC4,emitC4,walk,q,isStep,STEPKINDS};
