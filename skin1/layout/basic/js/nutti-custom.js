/* nutti-custom.js — layout.html 인라인 <script> 블록 추출본 (원본 순서 유지) */

/* ── NUTTI 리뷰 스크래핑 설정: Cafe24 게시판/마크업 바뀌면 여기만 고치면 됨 ──
   (block #5는 죽은 코드라 의도적으로 미연결 / 장바구니 설정은 layout.html 인라인에 별도) */
var NUTTI_CFG = {
  boardNo: 4,
  rowSel: '.xans-board-listpackage-4 tbody tr',
  detailSel: ['.xans-board-read .detail', '.fr-view-article', '.xans-board-read'],
  ratingImgSel: 'img[alt$="점"]'
};
NUTTI_CFG.listUrl = '/board/product/list.html?board_no=' + NUTTI_CFG.boardNo;
function nrWarn(m){ try{ console.warn('[NUTTI]', m); }catch(_){} }
function nrPickDetail(doc){ for(var i=0;i<NUTTI_CFG.detailSel.length;i++){ var el=doc.querySelector(NUTTI_CFG.detailSel[i]); if(el){return el;} } return null; }

/* ===== block #5 (layout.html에서 추출) ===== */
(function(){function esc(s){return (s||"").split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split(String.fromCharCode(34)).join("&quot;");}function pickImg(html){var d=new DOMParser().parseFromString(html,"text/html");var ims=d.querySelectorAll(".xans-board-read img, .view img, img");for(var i=0;i<ims.length;i++){var s=ims[i].getAttribute("src")||ims[i].getAttribute("ec-data-src")||"";if(s.indexOf("/web/upload/")>=0&&s.indexOf("/category/")<0){if(s.indexOf("//")===0){s="https:"+s;}return s;}}return "";}function pickVid(h){var m=h.match(/https?:[^\s"'<)]*res\.cloudinary\.com\/[^\s"'<)]*\/video\/upload\/[^\s"'<)]*|https?:[^\s"'<)]*\.(?:mp4|webm)(?:\?[^\s"'<)]*)?/);return m?m[0]:"";}function build(items){var html="";for(var i=0;i<10;i++){var it=items[i];if(it){var bg=it.img?("background-image:url("+it.img+");background-size:cover;background-position:center;"):"";var vid=it.vid?'<video class="nr-vidbg" src="'+esc(it.vid)+'" muted loop autoplay playsinline preload="metadata"></video>':"";html+='<a class="nr-card" href="'+esc(it.link)+'"><div class="nr-thumb nr-ldg" style="'+bg+'">'+vid+'<div class="nr-text"><p class="nr-q">'+esc(it.title)+'</p><p class="nr-d">'+esc(it.date)+'</p><span class="nr-w">'+esc(it.writer)+'</span></div></div><div class="nr-user"><span class="nr-ava"></span><span class="nr-name">'+esc(it.writer)+'</span></div></a>';}else if(i<5){html+='<div class="nr-card"><div class="nr-thumb"></div><div class="nr-user"><span class="nr-ava"></span><span class="nr-name">리뷰 준비중</span></div></div>';}}return html;}function init(){var p=location.pathname;var main=(p==="/"||p===""||p==="/index.html"||p.slice(-11)==="/index.html");if(!main){return;}if(document.querySelector(".nutti-review")){return;}var sec=document.createElement("section");return;sec.className="nutti-review";sec.innerHTML='<h2 class="nr-head">REVIEW</h2><p class="nr-sub">우리 아이가 직접 먹어본 솔직한 후기<br>NUTTI를 만난 반려견 가족들의 이야기</p><div class="nr-carousel"><button type="button" class="nr-arrow prev" aria-label="이전">\u2039</button><div class="nr-grid"></div><button type="button" class="nr-arrow next" aria-label="다음">\u203a</button></div>';var anchor=document.querySelector(".main_product_list");if(anchor&&anchor.parentNode){anchor.parentNode.insertBefore(sec,anchor);}else{var f=document.getElementById("footer");if(f&&f.parentNode){f.parentNode.insertBefore(sec,f);}else{document.body.appendChild(sec);}}var grid=sec.querySelector(".nr-grid");grid.innerHTML=build([]);function step(dir){var c=grid.querySelector(".nr-card");var w=c?c.getBoundingClientRect().width+16:240;if(dir>0&&grid.scrollLeft+grid.clientWidth>=grid.scrollWidth-10){grid.scrollTo({left:0,behavior:"smooth"});}else{grid.scrollBy({left:dir*w*3,behavior:"smooth"});}}sec.querySelector(".nr-arrow.prev").addEventListener("click",function(){step(-1);});sec.querySelector(".nr-arrow.next").addEventListener("click",function(){step(1);});fetch("/board/product/list.html?board_no=4",{cache:"no-store"}).then(function(r){return r.text();}).then(function(h){var doc=new DOMParser().parseFromString(h,"text/html");var trs=[].slice.call(doc.querySelectorAll(".ec-base-table tbody tr"));var items=trs.map(function(tr){var tds=tr.querySelectorAll("td");var sa=tds[2]?tds[2].querySelector("a"):null;var date=tds[5]?tds[5].textContent.trim().slice(0,10).split("-").join("."):"";return {title:sa?sa.textContent.trim():"",link:sa?sa.getAttribute("href"):"#",writer:tds[4]?tds[4].textContent.trim():"",date:date,img:"",vid:""};}).filter(function(x){return x.title&&x.link&&x.link!=="#"&&x.link!=="/";}).slice(0,10);grid.innerHTML=build(items);Promise.all(items.map(function(it){return fetch(it.link,{cache:"no-store"}).then(function(r){return r.text();}).then(function(hh){it.img=pickImg(hh);it.vid=pickVid(hh);}).catch(function(){});})).then(function(){grid.innerHTML=build(items);});}).catch(function(){});}if(document.readyState!=="loading"){init();}else{document.addEventListener("DOMContentLoaded",init);}})();

/* ===== block #7 (layout.html에서 추출) ===== */
(function(){function init(){if(location.pathname.indexOf("/member/login")<0){return;}var pw=document.querySelector("input[name=member_passwd]")||document.querySelector("input[type=password]");if(!pw){return;}if(document.body.classList.contains("nutti-login")){return;}document.body.classList.add("nutti-login");var outerForm=pw.closest("form");var fieldset=pw.closest("fieldset")||outerForm;var wrap=outerForm?outerForm.parentElement:null;if(wrap){wrap.classList.add("nlogin-wrap");if(!wrap.querySelector(".nlogin-head")){var hd=document.createElement("div");hd.className="nlogin-head";hd.innerHTML='<h2>로그인</h2><p class="nlogin-sub">아이디 비밀번호 입력하기 귀찮으시죠?<small>귀찮은 입력 없이 간편하게 1초 안에 로그인</small></p>';wrap.insertBefore(hd,outerForm);}}var k=document.querySelector("a.btnKakao");if(k){k.textContent="카카오 1초 로그인/회원가입";}var n=document.querySelector("a.btnNaver");if(n){n.textContent="네이버 1초 로그인/회원가입";}var lb=document.querySelector(".login__button .btnSubmit");if(lb){lb.textContent="기존 회원 로그인";}var tb=fieldset?fieldset.querySelector(".nlogin-tabs"):null;if(fieldset&&!fieldset.querySelector(".nlogin-coupon")){var cp=document.createElement("a");cp.className="nlogin-coupon";cp.href="/member/agreement.html";cp.innerHTML='<span class="nlogin-ticket"><b>1000원</b><em>신규 회원 웰컴 할인 쿠폰</em></span><p>회원가입 하시면 즉시 사용 가능한 쿠폰을 드려요!</p>';var orr=document.createElement("div");orr.className="nlogin-or";orr.innerHTML="<span>또는</span>";tb=document.createElement("div");tb.className="nlogin-tabs";tb.innerHTML='<a class="on" data-tab="member" href="#">기존 회원</a><a data-tab="nonmember" href="/member/login.html?noMemberOrder&returnUrl=%2Fmyshop%2Forder%2Flist.html">비회원 주문조회</a>';fieldset.appendChild(cp);fieldset.appendChild(orr);fieldset.appendChild(tb);}function setMode(x){if(x){document.body.classList.add("nutti-nonmember");}else{document.body.classList.remove("nutti-nonmember");}if(tb){var as=tb.querySelectorAll("a");for(var j=0;j<as.length;j++){var isn=as[j].getAttribute("data-tab")==="nonmember";if(isn===x){as[j].classList.add("on");}else{as[j].classList.remove("on");}}}}var oid=document.querySelector("input[name=order_id]");var nmForm=oid?oid.closest("form"):null;if(nmForm){nmForm.classList.add("nlogin-nmform");if(wrap){wrap.appendChild(nmForm);}}if(tb){var aa=tb.querySelectorAll("a");for(var j=0;j<aa.length;j++){aa[j].addEventListener("click",function(e){var m=this.getAttribute("data-tab");if(m==="member"){e.preventDefault();setMode(false);}else if(m==="nonmember"){e.preventDefault();setMode(true);}});}}setMode((location.search.indexOf("noMemberOrder")>=0)&&!!document.querySelector(".nlogin-nmform"));if(!nmForm){fetch("/member/login.html?noMemberOrder&returnUrl=%2Fmyshop%2Forder%2Flist.html",{cache:"no-store"}).then(function(r){return r.text();}).then(function(h){var doc=new DOMParser().parseFromString(h,"text/html");var o2=doc.querySelector("input[name=order_id]");var f2=o2?o2.closest("form"):null;if(f2&&wrap&&!document.querySelector(".nlogin-nmform")){var imp=document.importNode(f2,true);imp.classList.add("nlogin-nmform");wrap.appendChild(imp);var on=imp.querySelector("#order_name");if(on){on.setAttribute("placeholder","주문자명");}var oi=imp.querySelector("#order_id");if(oi){oi.setAttribute("placeholder","주문번호(하이픈(-) 포함)");}var op=imp.querySelector("#order_password");if(op){op.setAttribute("placeholder","비회원주문 비밀번호");}}}).catch(function(){});}}if(document.readyState!=="loading"){init();}else{document.addEventListener("DOMContentLoaded",init);}})();

/* ===== block #15 (layout.html에서 추출) ===== */
(function(){
 if(window.__nrvInit){return;} window.__nrvInit=true;
 /* 카드 클릭은 문서 위임 — grid.innerHTML 재작성(block #5류)에도 리스너가 안 날아감 */
 document.addEventListener('click',function(e){ var card=e.target&&e.target.closest?e.target.closest('.nutti-review .nr-card'):null; if(!card||!artNo(card.getAttribute('href'))){return;} e.preventDefault(); openCard(card); });
 function mk(t,c){var e=document.createElement(t); if(c){e.className=c;} return e;}
 function stars(n){n=parseInt(n,10)||0; var f=document.createDocumentFragment(); for(var i=1;i<=5;i++){var s=mk('i', i<=n?'':'off'); s.textContent='★'; f.appendChild(s);} return f;}
 function artNo(h){ if(!h){return null;} var p=h.split('?')[0].split('/').filter(function(x){return x;}); var last=p[p.length-1]; return (last && !isNaN(last))?last:null; }
 function isBlank(node){ if(node.nodeType===3){ return node.textContent.split(String.fromCharCode(160)).join('').trim()===''; } if(node.nodeType===1){ if(node.tagName==='BR'){return true;} return ((node.textContent||'').trim()==='') && node.getElementsByTagName('img').length===0; } return true; }
 function trimEnds(el){ var n; while((n=el.firstChild) && isBlank(n)){ el.removeChild(n); } while((n=el.lastChild) && isBlank(n)){ el.removeChild(n); } }
 function loadArticle(card){
  if(card.__data){return Promise.resolve(card.__data);}
  return fetch(card.getAttribute('href'),{credentials:'same-origin'}).then(function(r){return r.text();}).then(function(t){
   var d=new DOMParser().parseFromString(t,'text/html');
   var c=nrPickDetail(d);
   var imgs=[]; var html='';
   if(c){ var clone=c.cloneNode(true); var list=clone.querySelectorAll('img'); var seen={};
    for(var i=0;i<list.length;i++){ var s=list[i].getAttribute('src')||list[i].getAttribute('ec-data-src')||list[i].getAttribute('data-src'); if(s&&!seen[s]){seen[s]=1; imgs.push(s);} } var VV=[]; var vs=clone.querySelectorAll('video source[src],video[src]'); for(var _vi=0;_vi<vs.length;_vi++){var _vu=vs[_vi].getAttribute('src');if(_vu&&VV.indexOf(_vu)<0)VV.push(_vu);} var va2=clone.querySelectorAll('a[href]'); for(var _ai=0;_ai<va2.length;_ai++){var _au=va2[_ai].getAttribute('href')||'';if(/\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(_au)&&VV.indexOf(_au)<0)VV.push(_au);} var vf2=clone.querySelectorAll('iframe[src]'); for(var _fi=0;_fi<vf2.length;_fi++){var _fu=vf2[_fi].getAttribute('src')||'';if(/youtu/.test(_fu)&&VV.indexOf(_fu)<0)VV.push(_fu);} for(var _vk=VV.length-1;_vk>=0;_vk--){imgs.unshift(VV[_vk]);}
    for(var j=list.length-1;j>=0;j--){ if(list[j].parentNode){list[j].parentNode.removeChild(list[j]);} }
    trimEnds(clone); html=clone.innerHTML;
   }
   var _vu=''; try{ var _tt=(((clone&&clone.textContent)||'').split('\n').join(' ')); var _tk=_tt.split(' '); for(var _vi=0;_vi<_tk.length;_vi++){ var _w=_tk[_vi]; while(_w.length&&')]>,.'.indexOf(_w.charAt(_w.length-1))>-1)_w=_w.slice(0,-1); var _L=_w.toLowerCase(); if(_L.indexOf('http')===0&&(_L.indexOf('res.cloudinary.com')>-1||_L.indexOf('youtu')>-1||_L.indexOf('.mp4')>-1||_L.indexOf('.webm')>-1||_L.indexOf('.mov')>-1)){ _vu=_w; break; } } }catch(_e){} card.__data={imgs:imgs, html:html, vurl:_vu}; return card.__data;
  });
 }
 var modal,galMain,thumbs,elStars,elTitle,elMeta,elContent,elProd,curImgs=[];
 function build(){
  var bd=mk('div','nrv-backdrop'); var m=mk('div','nrv-modal');
  var close=mk('button','nrv-close'); close.innerHTML='&times;';
  galMain=mk('img','nrv-main'); thumbs=mk('div','nrv-thumbs');
  var body=mk('div','nrv-body');
  elStars=mk('div','nrv-stars'); elTitle=mk('h3','nrv-title'); elMeta=mk('div','nrv-meta'); elContent=mk('div','nrv-content'); elProd=mk('div','nrv-prod');
  body.appendChild(elStars); body.appendChild(elTitle); body.appendChild(elMeta); body.appendChild(elProd); body.appendChild(elContent);
  m.appendChild(close); m.appendChild(galMain); m.appendChild(thumbs); m.appendChild(body);
  bd.appendChild(m); document.body.appendChild(bd);
  function cl(){ bd.classList.remove('show'); setTimeout(function(){bd.style.display='none';},250); }
  bd.addEventListener('click',function(e){ var tg=e.target; if(tg===bd||tg===close){cl();return;} if(tg.tagName==='IMG'&&tg.parentNode===thumbs){ var i=parseInt(tg.getAttribute('data-i'),10)||0; galMain.src=curImgs[i]; var ts=thumbs.querySelectorAll('img'); for(var k=0;k<ts.length;k++){ts[k].classList.remove('active');} tg.classList.add('active'); } });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'){cl();} });
  return bd;
 }
 function openCard(card){
  if(window.NRV){ var _all=[].slice.call(document.querySelectorAll('.nutti-review .nr-card')).filter(function(c){return artNo(c.getAttribute('href'));}); var _items=_all.map(function(c){ return {rating:c.getAttribute('data-rating'),title:((c.querySelector('.nr-q')||{}).textContent||'').trim(),writer:((c.querySelector('.nr-w')||{}).textContent||'').trim(),date:((c.querySelector('.nr-d')||{}).textContent||'').trim(),pname:c.getAttribute('data-pname'),purl:c.getAttribute('data-purl'),imgs:[],body:null,loader:(function(cc){return function(){return loadArticle(cc).then(function(d){var tmp=document.createElement('div');tmp.innerHTML=(d&&d.html)||'';return {imgs:(d&&d.imgs)||[],body:(tmp.textContent||'').trim()};});};})(c)}; }); var _di=_all.indexOf(card); if(_di<0)_di=0; NRV.open(_items,_di); return; }
  if(!modal){modal=build();}
  galMain.style.display='none'; galMain.removeAttribute('src');
  thumbs.style.display='none'; thumbs.innerHTML=''; curImgs=[];
  elStars.innerHTML=''; elStars.appendChild(stars(card.getAttribute('data-rating')));
  elTitle.textContent=(card.querySelector('.nr-q')||{}).textContent||'';
  elMeta.textContent=((card.querySelector('.nr-w')||{}).textContent||'')+'   ·   '+((card.querySelector('.nr-d')||{}).textContent||'');
  var _pn=card.getAttribute('data-pname'),_pu=card.getAttribute('data-purl'); if(_pn&&_pu){ elProd.innerHTML=''; var _pa=mk('a','nrv-go'); _pa.setAttribute('href',_pu); var _s1=mk('span','nrv-pname'); _s1.textContent=_pn; var _s2=mk('span','nrv-goarrow'); _s2.textContent='바로가기 ›'; _pa.appendChild(_s1); _pa.appendChild(_s2); elProd.appendChild(_pa); elProd.style.display='block'; } else { elProd.style.display='none'; } elContent.textContent='불러오는 중…';
  modal.style.display='flex'; requestAnimationFrame(function(){modal.classList.add('show');});
  loadArticle(card).then(function(data){
   curImgs=data.imgs||[];
   if(curImgs.length){ galMain.style.display='block'; galMain.src=curImgs[0]; }
   if(curImgs.length>1){ thumbs.style.display='flex'; for(var k=0;k<curImgs.length;k++){ var im=mk('img', k===0?'active':''); im.setAttribute('data-i',k); im.src=curImgs[k]; thumbs.appendChild(im); } }
   var _tmp=document.createElement('div'); _tmp.innerHTML=data.html||''; elContent.textContent=_tmp.textContent;
  }).catch(function(){ elContent.textContent='내용을 불러올 수 없어요'; });
 }
 function init(){
  var all=document.querySelectorAll('.nutti-review .nr-card'); var cards=[];
  for(var i=0;i<all.length;i++){ if(artNo(all[i].getAttribute('href'))){cards.push(all[i]);} }
  if(!cards.length){return;}
  for(var b=0;b<cards.length;b++){ (function(card){ var th=card.querySelector('.nr-thumb'); var bg=th?getComputedStyle(th).backgroundImage:''; if(th && (bg==='none'||bg.indexOf('url(')<0)){ var _fill=function(){ loadArticle(card).then(function(data){ if(th)th.classList.remove('nr-ldg'); if(data.vurl){ var _vd=document.createElement('video'); _vd.src=data.vurl; _vd.autoplay=true; _vd.muted=true; _vd.loop=true; _vd.setAttribute('playsinline',''); _vd.setAttribute('muted',''); _vd.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;'; th.style.position='relative'; th.insertBefore(_vd, th.firstChild); var _nt=th.querySelector('.nr-text'); if(_nt){ _nt.style.zIndex='2'; } } else if(data.imgs&&data.imgs[0]){ th.style.backgroundImage='url('+data.imgs[0]+')'; th.style.backgroundSize='cover'; th.style.backgroundPosition='center'; } }); }; if('IntersectionObserver' in window){ var _io=new IntersectionObserver(function(es,ob){ for(var _e=0;_e<es.length;_e++){ if(es[_e].isIntersecting){ ob.disconnect(); _fill(); break; } } },{rootMargin:'250px'}); _io.observe(card); } else { _fill(); } } })(cards[b]); }
  fetch(NUTTI_CFG.listUrl,{credentials:'same-origin'}).then(function(r){return r.text();}).then(function(t){
   var d=new DOMParser().parseFromString(t,'text/html'); var map={};
   var rows=d.querySelectorAll(NUTTI_CFG.rowSel);
   if(!rows.length){ nrWarn('리뷰 캐러셀 rows=0 — rowSel="'+NUTTI_CFG.rowSel+'" board_no='+NUTTI_CFG.boardNo+' (Cafe24 마크업 변경 의심)'); }
   for(var j=0;j<rows.length;j++){ var a=rows[j].querySelector('td.subject a')||rows[j].querySelector('a[href*="/article/"]'); var no=artNo(a&&a.getAttribute('href')); var s=rows[j].querySelector(NUTTI_CFG.ratingImgSel); if(no&&s){ map[no]=parseInt(s.alt,10)||0; } }
   for(var k=0;k<cards.length;k++){ (function(card){ var no=artNo(card.getAttribute('href')); var r=map[no]; if(r){ card.setAttribute('data-rating',r); var holder=card.querySelector('.nr-text')||card; if(!holder.querySelector('.nr-stars')){ var sd=mk('div','nr-stars'); sd.appendChild(stars(r)); holder.insertBefore(sd, holder.firstChild); } } var prow=null; for(var pj=0;pj<rows.length;pj++){ var pa0=rows[pj].querySelector('td.subject a')||rows[pj].querySelector('a[href*="/article/"]'); if(pa0&&artNo(pa0.getAttribute('href'))==no){ prow=rows[pj]; break; } } if(prow){ var plink=prow.querySelector('a[href*="/product/"]'); var pnmEl=prow.querySelector('p.product'); var pnms=pnmEl?(pnmEl.textContent||'').trim():''; var phref=plink?plink.getAttribute('href'):''; if(pnms&&phref){ card.setAttribute('data-pname',pnms); card.setAttribute('data-purl',phref); var holderP=card.querySelector('.nr-text')||card; if(!holderP.querySelector('.nr-prod')){ var prd=mk('div','nr-prod'); var pspan=mk('span','nr-prod-name'); pspan.textContent=pnms; var pgo=mk('span','nr-go'); pgo.textContent='바로가기 ›'; (function(u){ pgo.addEventListener('click',function(ev){ev.stopPropagation();ev.preventDefault();window.location.href=u;}); })(phref); prd.appendChild(pspan); prd.appendChild(pgo); holderP.appendChild(prd); } } } })(cards[k]); }
  }).catch(function(e){ nrWarn('리뷰 캐러셀 목록 로드 실패: '+e); });
 }
 if(document.readyState!=='loading'){init();}else{document.addEventListener('DOMContentLoaded',init);}
 setTimeout(init,1500);
})();

/* ===== block #17 (layout.html에서 추출) ===== */
(function(){
 var items=[],idx=0,cur=0,built=false;
 var back,panel,bodyEl,stageEl,dotsEl,thumbsEl,starsEl,titleEl,metaEl,petEl,textEl,tagsEl,pnameEl,pthumbEl,prevBtn,nextBtn,zoomEl,zoomImg;
 function mk(t,c){var e=document.createElement(t);if(c)e.className=c;return e;}
 function detect(s){ if(!s)return{type:'image',src:s}; var yt=s.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/); if(yt)return{type:'youtube',id:yt[1],src:s}; if(/\.(mp4|webm|mov|m4v|ogg)(\?|#|$)/i.test(s))return{type:'video',src:s}; return {type:'image',src:s}; }
 function isVidUrl(u){ if(!u)return false; var L=u.toLowerCase(); if(L.indexOf('http')!==0)return false; if(L.indexOf('res.cloudinary.com')>-1)return true; if(L.indexOf('youtu')>-1)return true; var exts=['.mp4','.webm','.mov','.m4v']; for(var e=0;e<exts.length;e++){ var p=L.indexOf(exts[e]); if(p>-1){ var a=L.charAt(p+exts[e].length); if(a===''||a==='?'||a==='#')return true; } } return false; } function cleanTok(u){ while(u.length&&')]>,.'.indexOf(u.charAt(u.length-1))>-1)u=u.slice(0,-1); return u; } function extractVid(t){ var out=[]; var toks=String(t||'').split(/\s+/); for(var i=0;i<toks.length;i++){ var u=cleanTok(toks[i]); if(isVidUrl(u)&&out.indexOf(u)<0)out.push(u); } return out; } function stripVid(t){ var lines=String(t||'').split(/\n/); var keep=[]; for(var i=0;i<lines.length;i++){ var ws=lines[i].split(/\s+/); var kw=[]; for(var j=0;j<ws.length;j++){ var w=ws[j]; if(w==='[리뷰영상]')continue; if(isVidUrl(cleanTok(w)))continue; kw.push(w); } keep.push(kw.join(' ')); } var r=keep.join('\n'); while(r.indexOf('\n\n\n')>-1)r=r.replace('\n\n\n','\n\n'); return r.trim(); } function media(it){ if(it.media&&it.media.length)return it.media; var arr=(it.imgs||[]).slice(); var fb=extractVid(it.body||''); for(var i=fb.length-1;i>=0;i--){ if(arr.indexOf(fb[i])<0)arr.unshift(fb[i]); } return arr.map(detect); }
 function curItem(){return items[idx]||{};}
 function starStr(r){ r=parseInt(r,10)||0; var s=''; for(var i=0;i<5;i++)s+=(i<r?'★':'☆'); return s; }
 function build(){
  back=mk('div','nrvx-back'); panel=mk('div','nrvx-panel');
  var head=mk('div','nrvx-head'); pnameEl=mk('a','nrvx-phead'); pthumbEl=mk('span','nrvx-pthumb'); var pn=mk('span','nrvx-pname'); pnameEl.appendChild(pthumbEl); pnameEl.appendChild(pn); pnameEl._name=pn;
  var close=mk('button','nrvx-close'); close.innerHTML='&times;';
  head.appendChild(pnameEl); head.appendChild(close);
  bodyEl=mk('div','nrvx-body');
  stageEl=mk('div','nrvx-stage'); dotsEl=mk('div','nrvx-dots'); thumbsEl=mk('div','nrvx-thumbs');
  var info=mk('div','nrvx-info'); starsEl=mk('div','nrvx-stars'); titleEl=mk('h3','nrvx-title'); metaEl=mk('div','nrvx-meta'); petEl=mk('div','nrvx-pet'); textEl=mk('div','nrvx-text'); tagsEl=mk('div','nrvx-tags');
  info.appendChild(starsEl); info.appendChild(titleEl); info.appendChild(metaEl); info.appendChild(petEl); info.appendChild(textEl); info.appendChild(tagsEl);
  bodyEl.appendChild(stageEl); bodyEl.appendChild(thumbsEl); bodyEl.appendChild(info);
  var foot=mk('div','nrvx-foot'); prevBtn=mk('button','nrvx-nav'); prevBtn.innerHTML='‹ 이전 리뷰'; nextBtn=mk('button','nrvx-nav'); nextBtn.innerHTML='다음 리뷰 ›';
  foot.appendChild(prevBtn); foot.appendChild(nextBtn);
  panel.appendChild(head); panel.appendChild(bodyEl); panel.appendChild(foot);
  back.appendChild(panel); document.body.appendChild(back);
  function close_(){ back.classList.remove('show'); document.documentElement.style.overflow=''; setTimeout(function(){back.style.display='none';stageEl.innerHTML='';},320); }
  back.addEventListener('click',function(e){ if(e.target===back) close_(); });
  close.addEventListener('click',close_);
  prevBtn.addEventListener('click',function(){ if(idx>0){idx--;show();} });
  nextBtn.addEventListener('click',function(){ if(idx<items.length-1){idx++;show();} });
  var sx=0,sy=0,act=false,mv=false;
  stageEl.addEventListener('touchstart',function(e){ sx=e.touches[0].clientX;sy=e.touches[0].clientY;act=true;mv=false; },{passive:true});
  stageEl.addEventListener('touchmove',function(e){ if(!act)return; var dx=e.touches[0].clientX-sx,dy=e.touches[0].clientY-sy; if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>8){ if(e.cancelable)e.preventDefault(); mv=true; } },{passive:false});
  stageEl.addEventListener('touchend',function(e){ if(!act)return; var dx=e.changedTouches[0].clientX-sx; if(mv&&Math.abs(dx)>40){ setMedia(cur+(dx<0?1:-1)); } act=false; });
  var md=false,msx=0,mmv=false;
  stageEl.addEventListener('mousedown',function(e){ if(e.target.tagName==='VIDEO'||e.target.tagName==='IFRAME')return; md=true;msx=e.clientX;mmv=false; e.preventDefault(); });
  document.addEventListener('mousemove',function(e){ if(!md)return; if(Math.abs(e.clientX-msx)>6)mmv=true; });
  document.addEventListener('mouseup',function(e){ if(!md)return; var dx=e.clientX-msx; if(mmv&&Math.abs(dx)>40){ setMedia(cur+(dx<0?1:-1)); } md=false; });
  zoomEl=mk('div','nrvx-zoom'); zoomImg=document.createElement('img'); zoomEl.appendChild(zoomImg); back.appendChild(zoomEl);
  zoomEl.addEventListener('click',function(){ zoomEl.style.display='none'; });
  stageEl.addEventListener('click',function(e){ if(mmv)return; if(e.target.closest&&e.target.closest('.nrvx-dot'))return; var ms=media(curItem()); var m=ms[cur]; if(m&&m.type==='image'&&m.src){ zoomImg.src=m.src; zoomEl.style.display='flex'; } });
  built=true;
 }
 function renderStage(){
  var ms=media(curItem()); stageEl.innerHTML='';
  if(!ms.length){ stageEl.style.display='none'; return; } stageEl.style.display='block';
  var m=ms[cur]||ms[0];
  if(m.type==='youtube'){ var f=mk('iframe','nrvx-frame'); f.src='https://www.youtube.com/embed/'+m.id; f.setAttribute('allowfullscreen',''); f.allow='accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture'; stageEl.appendChild(f); }
  else if(m.type==='video'){ var vd=mk('video','nrvx-video'); vd.src=m.src; vd.controls=true; vd.playsInline=true; vd.setAttribute('playsinline',''); if(m.poster)vd.poster=m.poster; stageEl.appendChild(vd); }
  else { var im=mk('div','nrvx-img'); im.style.backgroundImage='url('+m.src+')'; stageEl.appendChild(im); }
  if(ms.length>1) stageEl.appendChild(dotsEl);
 }
 function setMedia(n){ var ms=media(curItem()); if(!ms.length)return; n=(n+ms.length)%ms.length; cur=n; renderStage(); var ds=dotsEl.children; for(var i=0;i<ds.length;i++)ds[i].classList.toggle('on',i===n); var ts=thumbsEl.children; for(var j=0;j<ts.length;j++)ts[j].classList.toggle('on',j===n); }
 function renderThumbs(){
  var ms=media(curItem()); dotsEl.innerHTML=''; thumbsEl.innerHTML=''; 
  if(ms.length>1){ thumbsEl.style.display='flex'; ms.forEach(function(m,i){
    var d=mk('span','nrvx-dot'+(i===cur?' on':'')); (function(k){d.addEventListener('click',function(){setMedia(k);});})(i); dotsEl.appendChild(d);
    var t=mk('span','nrvx-th'+(i===cur?' on':'')+((m.type!=='image')?' vid':'')); if(m.type==='image'&&m.src)t.style.backgroundImage='url('+m.src+')'; else if(m.poster)t.style.backgroundImage='url('+m.poster+')'; (function(k){t.addEventListener('click',function(){setMedia(k);});})(i); thumbsEl.appendChild(t);
  }); } else { thumbsEl.style.display='none'; }
 }
 function show(){
  var it=curItem(); cur=0; if(zoomEl)zoomEl.style.display='none';
  pnameEl._name.textContent=it.pname||'상품 후기'; if(it.purl){pnameEl.setAttribute('href',it.purl);}else{pnameEl.removeAttribute('href');}
  if(it.pthumb){pthumbEl.style.display='block';pthumbEl.style.backgroundImage='url('+it.pthumb+')';}else{pthumbEl.style.display='none';}
  starsEl.textContent=starStr(it.rating);
  titleEl.textContent=it.title||''; titleEl.style.display=it.title?'block':'none';
  metaEl.textContent=(it.writer||'')+(it.date?'   ·   '+it.date:'');
  if(it.pet){petEl.textContent=it.pet;petEl.style.display='flex';}else{petEl.style.display='none';}
  textEl.textContent=stripVid(it.body||'');
  tagsEl.innerHTML=''; var tags=it.tags||[]; if(tags.length){tagsEl.style.display='flex';tags.forEach(function(tg){var c=mk('span','nrvx-tag');c.textContent=(tg.charAt(0)==='#'?'':'#')+tg;tagsEl.appendChild(c);});}else{tagsEl.style.display='none';}
  prevBtn.disabled=idx<=0; nextBtn.disabled=idx>=items.length-1;
  renderThumbs(); renderStage(); bodyEl.scrollTop=0;
  if((!it.imgs||!it.imgs.length||it.body==null)&&typeof it.loader==='function'&&!it._loaded){ it._loaded=true; if(!it.body)textEl.textContent='불러오는 중…'; it.loader().then(function(data){ if(data){ if(data.imgs)it.imgs=(it.imgs&&it.imgs.length?it.imgs:data.imgs); if(data.body!=null&&!it.body)it.body=data.body; if(data.tags&&!(it.tags&&it.tags.length))it.tags=data.tags; } if(items[idx]===it)show(); }).catch(function(){ if(items[idx]===it&&!it.body)textEl.textContent='내용을 불러올 수 없어요'; }); }
 }
 window.NRV={ open:function(list,i,startMedia){ if(!built)build(); items=list||[]; idx=i||0; back.style.display='block'; document.documentElement.style.overflow='hidden'; back.offsetHeight; back.classList.add('show'); show(); if(startMedia){ setMedia(startMedia); } } };
})();

/* ===== block #19 (layout.html에서 추출) ===== */
(function(){
 if(window.self!==window.top){return;}
 if(window.__rvwInit){return;} window.__rvwInit=true;
 function collapse(s){ s=s||''; s=s.split(String.fromCharCode(10)).join(' '); s=s.split(String.fromCharCode(9)).join(' '); s=s.split(String.fromCharCode(13)).join(' '); while(s.indexOf('  ')>-1){s=s.split('  ').join(' ');} return s.trim(); }
 function starStr(n){ var s=''; for(var i=1;i<=5;i++){ s+= i<=n ? '★' : '☆'; } return s; }
 function esc(x){ var e=document.createElement('div'); e.textContent=x||''; return e.innerHTML; }
 function loadReviews(sec){
  if(sec.__rvwLoad){ return sec.__rvwLoad; }
  var rows=[].slice.call(sec.querySelectorAll('tbody tr')).filter(function(r){return r.querySelector('a[href*="/article/"]');});
  var pname=(document.title.split('|')[1]||'').trim();
  var reviews=rows.map(function(r){ var a=r.querySelector('a[href*="/article/"]'); var st=r.querySelector(NUTTI_CFG.ratingImgSel); var tds=[].slice.call(r.querySelectorAll('td')); var dIdx=-1; for(var k=0;k<tds.length;k++){ var tx=(tds[k].textContent||'').trim(); if(tx.length>=8 && tx.split('-').length>=3 && tx.indexOf(':')>-1){ dIdx=k; break; } } var rawDate= dIdx>-1 ? (tds[dIdx].textContent||'').trim() : ''; var writer= dIdx>1 ? (tds[dIdx-1].textContent||'').trim() : ''; var dateF= rawDate ? rawDate.slice(0,16).split('-').join('.') : ''; return {href:a.getAttribute('href').split('?')[0], rating:st?parseInt(st.alt,10):5, title:(a.textContent||'').trim(), writer:writer, date:dateF, body:'', imgs:[]}; });
  sec.__rvwLoad=Promise.all(reviews.map(function(rv){ return fetch(rv.href,{credentials:'same-origin'}).then(function(r){return r.text();}).then(function(t){
    var d=new DOMParser().parseFromString(t,'text/html'); var c=nrPickDetail(d);
    if(c){ var clone=c.cloneNode(true); var seen={}; var L=clone.querySelectorAll('img'); for(var i=0;i<L.length;i++){ var s=L[i].getAttribute('src'); if(s&&!seen[s]){seen[s]=1; rv.imgs.push(s);} } var VV=[]; var vs=clone.querySelectorAll('video source[src],video[src]'); for(var _vi=0;_vi<vs.length;_vi++){var _vu=vs[_vi].getAttribute('src');if(_vu&&VV.indexOf(_vu)<0)VV.push(_vu);} var va2=clone.querySelectorAll('a[href]'); for(var _ai=0;_ai<va2.length;_ai++){var _au=va2[_ai].getAttribute('href')||'';if(/\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(_au)&&VV.indexOf(_au)<0)VV.push(_au);} var vf2=clone.querySelectorAll('iframe[src]'); for(var _fi=0;_fi<vf2.length;_fi++){var _fu=vf2[_fi].getAttribute('src')||'';if(/youtu/.test(_fu)&&VV.indexOf(_fu)<0)VV.push(_fu);} for(var _vk=VV.length-1;_vk>=0;_vk--){rv.imgs.unshift(VV[_vk]);} for(var j=L.length-1;j>=0;j--){ if(L[j].parentNode){L[j].parentNode.removeChild(L[j]);} } while(clone.firstChild && (clone.firstChild.nodeType===1 ? (clone.firstChild.tagName==='BR'||!(clone.firstChild.textContent||'').trim()) : !(clone.firstChild.textContent||'').trim())){ clone.removeChild(clone.firstChild); } rv.body=collapse(clone.textContent); (function(){ function _isV(u){ if(!u)return false; var L=u.toLowerCase(); if(L.indexOf('http')!==0)return false; if(L.indexOf('res.cloudinary.com')>-1||L.indexOf('youtu')>-1)return true; var ex=['.mp4','.webm','.mov','.m4v']; for(var e=0;e<ex.length;e++){var p=L.indexOf(ex[e]); if(p>-1){var a=L.charAt(p+ex[e].length); if(a===''||a==='?'||a==='#')return true;}} return false; } function _ct(u){ while(u.length&&')]>,.'.indexOf(u.charAt(u.length-1))>-1)u=u.slice(0,-1); return u; } var tk=(rv.body||'').split(' '); var kp=[]; for(var _i=0;_i<tk.length;_i++){ var w=tk[_i]; if(w==='[리뷰영상]')continue; var cw=_ct(w); if(_isV(cw)){ if(!rv.vurl)rv.vurl=cw; continue; } kp.push(w); } rv.body=kp.join(' ').trim(); })(); } var cul=d.querySelector('ul.boardComment'); if(cul){ rv.replies=[].slice.call(cul.querySelectorAll('li')).map(function(cli){ var ctop=cli.querySelector('.commentTop'); var cwa=ctop?ctop.querySelector('a,strong'):null; var cdt=cli.querySelector('.date'); var ccm=cli.querySelector('.comment'); return {writer:cwa?(cwa.textContent||'').trim():'', text:ccm?collapse(ccm.textContent||''):''}; }).filter(function(x){return x.text;}); }
  }).catch(function(e){ nrWarn('리뷰 상세 로드 실패 '+rv.href+': '+e); }); })).then(function(){ return {reviews:reviews, pname:pname}; });
  return sec.__rvwLoad;
 }
 function openDetail(rv,startIdx,pname){
  if(window.NRV){ var st=window.__NR||{}; var list=(st.list&&st.list.length)?st.list:[rv]; var items=list.map(function(r){return {imgs:(r.vurl?[r.vurl]:[]).concat((r.imgs||[])),rating:r.rating,title:r.title,writer:r.writer,date:r.date,body:r.body,pname:(st.pname||pname||(document.title.split(' - ')[0])),purl:st.purl||location.pathname,tags:r.tags};}); var di=list.indexOf(rv); if(di<0){for(var _i=0;_i<list.length;_i++){if(list[_i].href&&rv.href&&list[_i].href===rv.href){di=_i;break;}}} if(di<0)di=0; NRV.open(items,di,startIdx||0); return; }
  var bd=document.createElement('div'); bd.className='rvw-modal-bd';
  var imgs=rv.imgs||[]; var idx=startIdx||0; if(idx<0){idx=0;}
  var thumbs = imgs.length>1 ? ('<div class="mthumbs">'+imgs.map(function(s,i){return '<img data-i="'+i+'" class="'+(i===idx?'on':'')+'" src="'+s+'">';}).join('')+'</div>') : '';
  bd.innerHTML='<div class="rvw-modal"><button class="mclose">닫기</button>'+(imgs.length?'<img class="mmain" src="'+imgs[idx]+'">':'')+thumbs+'<div class="mbody"><div class="mstars">'+starStr(rv.rating)+'</div><div class="mtitle">'+esc(rv.title)+'</div><span class="mprd">'+esc(pname)+'</span><div class="mmeta">'+esc(rv.writer)+' · '+esc(rv.date)+'</div><div class="mtext">'+esc(rv.body)+'</div></div></div>';
  document.body.appendChild(bd);
  bd.addEventListener('click',function(e){ var tg=e.target; if(tg===bd||tg.className==='mclose'){ bd.remove(); return; } if(tg.tagName==='IMG'&&tg.parentNode.className==='mthumbs'){ var i=parseInt(tg.getAttribute('data-i'),10)||0; bd.querySelector('.mmain').src=imgs[i]; var ts=bd.querySelectorAll('.mthumbs img'); for(var k=0;k<ts.length;k++){ts[k].classList.remove('on');} tg.classList.add('on'); } });
 }
 function openGallery(allPhotos,pname){
  var bd=document.createElement('div'); bd.className='rvw-modal-bd';
  bd.innerHTML='<div class="rvw-modal"><button class="mclose">닫기</button><div class="rvw-gal-h">포토 후기 전체보기</div><div class="rvw-gal-grid">'+allPhotos.map(function(p,i){return '<div class="cell" data-i="'+i+'" style="background-image:url('+p.src+')"></div>';}).join('')+'</div></div>';
  document.body.appendChild(bd);
  bd.addEventListener('click',function(e){ var tg=e.target; if(tg===bd||tg.className==='mclose'){ bd.remove(); return; } var cell=tg.closest?tg.closest('.cell'):null; if(cell){ var i=parseInt(cell.getAttribute('data-i'),10)||0; var p=allPhotos[i]; bd.remove(); openDetail(p.rv, p.rv.imgs.indexOf(p.src), pname); } });
 }
 function buildContent(reviews, pname, withCards){
  var IS_ADMIN=/(^|;\s*)ec_mem_level=A/.test(document.cookie);
  var counts=[0,0,0,0,0,0], total=0, sum=0;
  reviews.forEach(function(rv){ var n=rv.rating||5; counts[n]++; total++; sum+=n; });
  var avg= total ? (sum/total) : 0;
  var labels={5:'아주 좋아요',4:'맘에 들어요',3:'보통이에요',2:'그냥 그래요',1:'별로예요'};
  var allPhotos=[]; reviews.forEach(function(rv){ rv.imgs.forEach(function(s){ allPhotos.push({src:s, rv:rv}); }); });
  var barsHtml=''; for(var s=5;s>=1;s--){ var pct= total ? Math.round(counts[s]/total*100) : 0; barsHtml+='<div class="rvw-bar"><span class="lb">'+labels[s]+'</span><span class="track"><span class="fill" style="width:'+pct+'%"></span></span><span class="vc">'+counts[s]+'</span></div>'; }
  var photoCells=allPhotos.slice(0,8).map(function(p,i){return '<div class="cell" data-i="'+i+'" style="background-image:url('+p.src+')"></div>';}).join('');
  var cardsHtml='';
  if(withCards){ cardsHtml=reviews.map(function(rv,ri){ var gal=''; if(rv.vurl){ gal='<div class="gmain gmvid" data-ri="'+ri+'"><video src="'+rv.vurl+'" autoplay muted loop playsinline preload="metadata"></video></div>'; } else if(rv.imgs.length){ gal='<div class="gmain" data-ri="'+ri+'" style="background-image:url('+rv.imgs[0]+')">'+(rv.imgs.length>1?'<div class="gdots">'+rv.imgs.map(function(s,ii){return '<span class="gdot'+(ii===0?' on':'')+'" data-ri="'+ri+'" data-ii="'+ii+'"></span>';}).join('')+'</div>':'')+'</div>'; } return '<div class="rvw-card rvw-ig"><div class="ig-head"><span class="ig-ava">'+esc((rv.writer||'?').slice(0,1))+'</span><div class="ig-hm"><span class="ig-name">'+esc(rv.writer)+'</span><span class="ig-date">'+esc(rv.date)+'</span></div></div>'+gal+'<div class="ig-body"><div class="stars">'+starStr(rv.rating)+'</div><div class="ti">'+esc(rv.title)+'</div><div class="bd">'+esc(rv.body)+'</div>'+((rv.replies&&rv.replies.length)?rv.replies.map(function(rp){return '<div class="ig-reply"><span class="ig-rh">'+esc(rp.writer)+'</span><div class="ig-rt">'+esc(rp.text)+'</div></div>';}).join(''):'')+(IS_ADMIN?'<a class="ig-reply-btn" href="'+esc(rv.href)+'" target="_blank">답글 달기</a>':'')+'</div></div>'; }).join(''); }
  var html='<div class="rvw-sum"><div class="rvw-avg"><div class="rvw-score">'+avg.toFixed(1)+'</div><div class="stt">★★★★★</div><div class="rvw-cnt">리뷰 '+total+'개</div></div><div class="rvw-bars">'+barsHtml+'</div></div>'+(allPhotos.length?'<div class="rvw-ph"><div class="rvw-ph-h"><b>포토 후기</b><span class="rvw-all">전체보기 ›</span></div><div class="rvw-ph-grid">'+photoCells+'</div></div>':'')+(withCards?'<div class="rvw-list">'+cardsHtml+'</div>':'');
  return {html:html, allPhotos:allPhotos};
 }
 function attachHandlers(w, allPhotos, reviews, pname){
  window.__NR={list:reviews,pname:pname,purl:location.pathname};
  var _swiped=false;
  function _chImg(g,dir){ var ri=parseInt(g.getAttribute('data-ri'),10)||0; var Rv=reviews[ri]; if(!Rv||!Rv.imgs||Rv.imgs.length<2)return; var card=g.closest('.rvw-card'); var dots=card.querySelectorAll('.gdot'); var cur=0; for(var i=0;i<dots.length;i++){if(dots[i].classList.contains('on'))cur=i;} var nx=(cur+dir+Rv.imgs.length)%Rv.imgs.length; g.style.backgroundImage='url('+Rv.imgs[nx]+')'; for(var j=0;j<dots.length;j++)dots[j].classList.remove('on'); if(dots[nx])dots[nx].classList.add('on'); }
  var _sx=0,_sy=0,_g=null,_act=false,_mv=false;
  w.addEventListener('touchstart',function(e){ var t=(e.target.closest)?e.target.closest('.rvw-ig .gmain'):null; if(!t)return; var ri=parseInt(t.getAttribute('data-ri'),10)||0; if(!reviews[ri]||!reviews[ri].imgs||reviews[ri].imgs.length<2)return; _g=t;_sx=e.touches[0].clientX;_sy=e.touches[0].clientY;_act=true;_mv=false; },{passive:true});
  w.addEventListener('touchmove',function(e){ if(!_act)return; var dx=e.touches[0].clientX-_sx,dy=e.touches[0].clientY-_sy; if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>8){ if(e.cancelable)e.preventDefault(); _mv=true; } },{passive:false});
  w.addEventListener('touchend',function(e){ if(!_act)return; var dx=e.changedTouches[0].clientX-_sx; if(_mv&&Math.abs(dx)>40){ _swiped=true; _chImg(_g,dx<0?1:-1); } _act=false;_g=null;_mv=false; });
  w.addEventListener('mousedown',function(e){ var t=(e.target.closest)?e.target.closest('.rvw-ig .gmain'):null; if(!t)return; var ri=parseInt(t.getAttribute('data-ri'),10)||0; if(!reviews[ri]||!reviews[ri].imgs||reviews[ri].imgs.length<2)return; _g=t;_sx=e.clientX;_act=true;_mv=false; e.stopPropagation(); });
  w.addEventListener('mousemove',function(e){ if(!_act||!_g)return; if(Math.abs(e.clientX-_sx)>6)_mv=true; });
  w.addEventListener('mouseup',function(e){ if(!_act||!_g)return; var dx=e.clientX-_sx; if(_mv&&Math.abs(dx)>40){ _swiped=true; _chImg(_g,dx<0?1:-1); } _act=false;_g=null; },true);
  w.addEventListener('click',function(e){ if(_swiped){_swiped=false;e.stopPropagation();e.preventDefault();return;} var tg=e.target;
    if(tg.className==='rvw-all'){ openGallery(allPhotos,pname); return; }
    var phcell=tg.closest?tg.closest('.rvw-ph-grid .cell'):null; if(phcell){ var i=parseInt(phcell.getAttribute('data-i'),10)||0; var p=allPhotos[i]; openDetail(p.rv, p.rv.imgs.indexOf(p.src), pname); return; }
    if(tg.classList&&tg.classList.contains('gdot')){ var dri=parseInt(tg.getAttribute('data-ri'),10)||0; var dii=parseInt(tg.getAttribute('data-ii'),10)||0; var dcard=tg.closest('.rvw-card'); var dmain=dcard.querySelector('.gmain'); dmain.style.backgroundImage='url('+reviews[dri].imgs[dii]+')'; var dds=tg.parentNode.querySelectorAll('.gdot'); for(var dk=0;dk<dds.length;dk++){dds[dk].classList.remove('on');} tg.classList.add('on'); return; }
    if(tg.classList&&tg.classList.contains('gth')){ var ri=parseInt(tg.getAttribute('data-ri'),10)||0; var ii=parseInt(tg.getAttribute('data-ii'),10)||0; var card=tg.closest('.rvw-card'); var main=card.querySelector('.gmain'); main.style.backgroundImage='url('+reviews[ri].imgs[ii]+')'; var ths=tg.parentNode.querySelectorAll('.gth'); for(var k=0;k<ths.length;k++){ths[k].classList.remove('on');} tg.classList.add('on'); return; }
    var _gm=(tg.closest)?tg.closest('.gmain'):null; if(_gm){ var ri2=parseInt(_gm.getAttribute('data-ri'),10)||0; openDetail(reviews[ri2], 0, pname); return; }
  });
 }
 function enableDrag(el){ if(el.__drg)return; el.__drg=true; var dn=false,mv=false,sx=0,sl=0; el.style.cursor='grab'; el.addEventListener('mousedown',function(e){dn=true;mv=false;sx=e.pageX;sl=el.scrollLeft;el.style.cursor='grabbing';}); document.addEventListener('mousemove',function(e){if(!dn)return;var dx=e.pageX-sx;if(Math.abs(dx)>4)mv=true;el.scrollLeft=sl-dx;}); document.addEventListener('mouseup',function(){if(dn){dn=false;el.style.cursor='grab';}}); el.addEventListener('click',function(e){if(mv){e.preventDefault();e.stopPropagation();}},true); }
 function render(sec, reviews, pname){
  var b=buildContent(reviews, pname, true);
  var w=document.createElement('div'); w.className='rvw'; w.innerHTML=b.html;
  sec.insertBefore(w, sec.firstChild);
  attachHandlers(w, b.allPhotos, reviews, pname); var rl0=w.querySelector('.rvw-list'); if(rl0){enableDrag(rl0);} var pg0=w.querySelector('.rvw-ph-grid'); if(pg0){enableDrag(pg0);}
 }
 function renderMini(reviews, pname){
  if(!reviews.length){return;} var anchor=document.getElementById('prdDetail')||document.getElementById('tabProduct'); if(!anchor){return;} if(document.querySelector('.rvwm')){return;}
  var b=buildContent(reviews, pname, false);
  var w=document.createElement('div'); w.className='rvwm'; w.innerHTML=b.html;
  if(anchor.id==='prdDetail'){ anchor.insertBefore(w, anchor.firstChild); } else { anchor.parentNode.insertBefore(w, anchor.nextSibling); }
  attachHandlers(w, b.allPhotos, reviews, pname); var rl0=w.querySelector('.rvw-list'); if(rl0){enableDrag(rl0);} var pg0=w.querySelector('.rvw-ph-grid'); if(pg0){enableDrag(pg0);}
 }
  function renderEmpty(sec){ if(sec.querySelector('.rvw-empty')){return;} var wl=sec.querySelector('a[href*="board/product/write"]'); var href=wl?wl.getAttribute('href'):''; var w=document.createElement('div'); w.className='rvw rvw-empty'; w.innerHTML='<div style="text-align:center;padding:46px 20px;background:#fff;border:1px solid #efe7da;border-radius:16px;margin:12px 0;"><div style="font-size:42px;color:#e4d8c5;line-height:1;margin-bottom:14px;">☆</div><p style="font-size:16px;color:#3a2e25;font-weight:700;margin:0 0 6px;">아직 등록된 후기가 없어요</p><p style="font-size:13px;color:#9a8b77;margin:0 0 20px;">이 상품의 첫 후기를 남겨주세요!</p>'+(href?'<a class="rvw-wbtn" href="'+esc(href)+'" style="display:inline-block;background:var(--nutti-brown);color:#fff;font-weight:700;padding:13px 30px;border-radius:12px;text-decoration:none;font-size:14px;box-shadow:0 8px 20px rgba(92,61,36,.22);">첫 리뷰 작성하기</a>':'')+'</div>'; var nd=sec.querySelector('.nodata'); if(nd){ nd.style.display='none'; nd.parentNode.insertBefore(w, nd); } else { sec.insertBefore(w, sec.firstChild); } } function build(sec){ var rows=[].slice.call(sec.querySelectorAll('tbody tr')).filter(function(r){return r.querySelector('a[href*="/article/"]');}); if(!rows.length){ renderEmpty(sec); return; } loadReviews(sec).then(function(data){ render(sec, data.reviews, data.pname); setTimeout(styleButtons,80); setTimeout(styleButtons,400); }); }
 function buildMini(){ return; if(document.querySelector('.rvwm')){return;} var anc=document.getElementById('prdDetail')||document.getElementById('tabProduct'); if(!anc){return;} var sec=(document.querySelector('.xans-product-review')||document.getElementById('prdReview')); if(!sec){return;} loadReviews(sec).then(function(data){ renderMini(data.reviews, data.pname); }); }
 function styleButtons(){ var bts=document.querySelectorAll('.board_title'); for(var z=0;z<bts.length;z++){ bts[z].style.setProperty('border-bottom-color','#e5ddd0','important'); bts[z].style.setProperty('margin-top','-70px','important'); } var dvs=document.querySelectorAll('.rvw-sum,.rvw-list,.rvw-ph,.rvw-card'); for(var z2=0;z2<dvs.length;z2++){ dvs[z2].style.setProperty('border-color','#e5ddd0','important'); } var gths=document.querySelectorAll('.gth'); for(var g3=0;g3<gths.length;g3++){ gths[g3].style.setProperty('border-color','#d0d0d0','important'); } var as=document.querySelectorAll('a.btnNormalFix'); for(var i=0;i<as.length;i++){ var a=as[i]; var h=a.getAttribute('href')||''; var tx=(a.textContent||'').trim(); if(h.indexOf('write')>-1||tx==='WRITE'){ if(tx!=='리뷰 작성'){a.textContent='리뷰 작성';} a.classList.add('rvw-wbtn'); a.style.setProperty('border-color','#cbb079','important'); a.style.setProperty('color','#7a5a1e','important'); } else if(h.indexOf('list')>-1||tx==='LIST'){ a.style.display='none'; } } }
 function maybeBuild(){ styleButtons(); var sec=(document.querySelector('.xans-product-review')||document.getElementById('prdReview')); if(!sec||sec.__rvwBuilt){return;} if(sec.offsetParent===null){return;} sec.__rvwBuilt=true; build(sec); }
 function refresh(){
  var sec=(document.querySelector('.xans-product-review')||document.getElementById('prdReview'));
  if(!sec){ location.reload(); return; }
  fetch(location.href,{credentials:'same-origin'}).then(function(r){return r.text();}).then(function(t){
   var d=new DOMParser().parseFromString(t,'text/html');
   var nsec=d.querySelector('.xans-product-review')||d.getElementById('prdReview');
   if(!nsec){ location.reload(); return; }
   sec.innerHTML=nsec.innerHTML; sec.__rvwBuilt=false; sec.__rvwLoad=null;
   maybeBuild();
  }).catch(function(){ location.reload(); });
 }
 window.__rvwRefresh=refresh;
 function setup(){ var sec=(document.querySelector('.xans-product-review')||document.getElementById('prdReview')); if(!sec){return;} styleButtons(); if(window.IntersectionObserver){ var io=new IntersectionObserver(function(es){ for(var i=0;i<es.length;i++){ if(es[i].isIntersecting){ maybeBuild(); } } }); io.observe(sec); } document.addEventListener('click',function(e){ var t=e.target; if(t && /review/i.test((t.textContent||'')) && (t.textContent||'').length<14){ setTimeout(maybeBuild,400); } }); setTimeout(buildMini,1200); setTimeout(maybeBuild,1600); setTimeout(styleButtons,1800); }
 if(document.readyState!=='loading'){setup();}else{document.addEventListener('DOMContentLoaded',setup);}
})();

/* ===== block #21 (layout.html에서 추출) ===== */
(function(){
 if(window.self!==window.top){return;}
 if(window.__rvwWInit){return;} window.__rvwWInit=true;
 var modal;
 function loggedIn(){ var as=document.querySelectorAll('a'); var hasLogin=false,hasLogout=false; for(var i=0;i<as.length;i++){ var t=(as[i].textContent||'').trim(); if(t==='로그인'){hasLogin=true;} if(t==='로그아웃'||t==='LOGOUT'){hasLogout=true;} } return hasLogout || !hasLogin; }
 function ensureModal(){ if(modal){return modal;} var bd=document.createElement('div'); bd.className='rvwW-bd'; bd.innerHTML='<div class="rvwW"></div>'; document.body.appendChild(bd); bd.addEventListener('click',function(e){ var c=e.target.className||''; if(e.target===bd||(typeof c==='string'&&c.indexOf('rvwW-close')>-1)){ bd.classList.remove('show'); } }); document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&modal){ modal.classList.remove('show'); } }); modal=bd; return bd; }
 function showMsg(){ var bd=ensureModal(); bd.querySelector('.rvwW').innerHTML='<div class="rvwW-head"><b>리뷰 작성</b><button class="rvwW-close">닫기</button></div><div class="rvwW-msg"><div>리뷰는 회원만 작성할 수 있어요.<br>로그인 후 작성해 주세요.</div><a href="/member/login.html" target="_top">로그인하기</a></div>'; bd.classList.add('show'); }
 function open(href){
  if(!loggedIn()){ showMsg(); return; }
  var W=720,H=970; var l=Math.max(0,Math.round((screen.width-W)/2)), t=Math.max(0,Math.round((screen.height-H)/2));
  var win=window.open(href,'rvwWrite','width='+W+',height='+H+',left='+l+',top='+t+',scrollbars=yes,resizable=yes');
  if(!win){ window.location.href=href; return; }
  try{win.focus();}catch(e){} var bd=document.getElementById('rvwW-backdrop'); if(!bd){ bd=document.createElement('div'); bd.id='rvwW-backdrop'; bd.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;z-index:99998;background:rgba(40,30,20,.38);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);'; document.body.appendChild(bd); }
  var iv=setInterval(function(){ if(win.closed){ clearInterval(iv); var bdc=document.getElementById('rvwW-backdrop'); if(bdc){bdc.parentNode.removeChild(bdc);} if(window.__rvwRefresh){window.__rvwRefresh();}else{window.location.reload();} } },300);
 }
 document.addEventListener('click',function(e){ var a=(e.target&&e.target.closest)?e.target.closest('a.rvw-wbtn, a[href*="board/product/write"]'):null; if(a){ e.preventDefault(); e.stopPropagation(); var href=a.getAttribute('href'); if(href){ open(href); } } }, true);
})();

/* ===== block #23 (layout.html에서 추출) ===== */
(function(){function nrPaint(){var ss=document.querySelectorAll('.sort select,select[name="selArray"]');for(var i=0;i<ss.length;i++){ss[i].style.setProperty('background-color','#fbf8f1','important');}}if(document.readyState!=='loading')nrPaint();else document.addEventListener('DOMContentLoaded',nrPaint);setTimeout(nrPaint,600);setTimeout(nrPaint,1500);})();
