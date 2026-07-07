/* nutti-index.js — index.html 인라인 <script> 추출본 (원본 순서 유지) */

/* ===== index block #2 ===== */
(function(){
  var HOLD=3000;
  function initHero(){
    var box=document.querySelector(".nutti-hero-video");
    if(!box) return;
    var isMobile=(window.matchMedia&&window.matchMedia("(max-width:768px)").matches)||(("ontouchstart" in window)&&Math.min(screen.width,screen.height)<=820);
    var keep=box.querySelector(isMobile?".nutti-hero-m":".nutti-hero-d");
    var drop=box.querySelector(isMobile?".nutti-hero-d":".nutti-hero-m");
    if(drop){ drop.removeAttribute("src"); drop.load&&drop.load(); drop.parentNode&&drop.parentNode.removeChild(drop); }
    box.classList.add(isMobile?"is-mobile":"is-desktop");
    if(!keep) return;
    keep.muted=true; keep.loop=false;
    keep.setAttribute("muted",""); keep.setAttribute("playsinline",""); keep.setAttribute("webkit-playsinline","");
    if(!keep.getAttribute("src")){ keep.setAttribute("src", keep.getAttribute("data-src")); }
    keep.load();
    var holding=false;
    function play(){ var p=keep.play(); if(p&&p.catch){ p.catch(function(){ setTimeout(play,400); }); } }
    keep.addEventListener("loadeddata",play);
    keep.addEventListener("canplay",play);
    keep.addEventListener("ended",function(){ holding=true; setTimeout(function(){ holding=false; try{keep.currentTime=0;}catch(e){} play(); }, HOLD); });
    keep.addEventListener("pause",function(){ if(!keep.ended && !holding){ play(); } });
    document.addEventListener("visibilitychange",function(){ if(!document.hidden && !holding) play(); });
    ["touchstart","click","scroll"].forEach(function(ev){ window.addEventListener(ev,function(){ if(!holding) play(); }, {once:true,passive:true}); });
    play();
  }
  if(document.readyState==="loading"){ document.addEventListener("DOMContentLoaded",initHero); } else { initHero(); }
})();

/* ===== index block #4 ===== */
/* nutti-frac-init : 반응형 캐러셀 "가장 사랑받은 상품" 분수형 페이지네이션 (데스크톱 무관, CSS로 표시제어) */
(function(){
  function setup(){
    var pag = document.querySelector('.swiper-pagination-highlight_product');
    var cont = document.querySelector('.highlight_slide');
    if(!pag || !cont || !cont.swiper){ return false; }
    var sw = cont.swiper;
    var frac = pag.querySelector('.nutti-frac');
    if(!frac){
      frac = document.createElement('span');
      frac.className = 'nutti-frac';
      frac.innerHTML = '<span class="nutti-frac-cur"></span><span class="nutti-frac-sep">/</span><span class="nutti-frac-tot"></span>';
      pag.appendChild(frac);
    }
    function total(){ return (sw.snapGrid && sw.snapGrid.length) ? sw.snapGrid.length : sw.slides.length; }
    function update(){
      var cur = (typeof sw.activeIndex === 'number' ? sw.activeIndex : 0) + 1;
      var tot = total();
      if(cur > tot){ cur = tot; }
      frac.querySelector('.nutti-frac-cur').textContent = cur;
      frac.querySelector('.nutti-frac-tot').textContent = tot;
    }
    update();
    sw.on('slideChange', update);
    sw.on('snapIndexChange', update);
    sw.on('resize', update);
    return true;
  }
  var tries = 0;
  var timer = setInterval(function(){
    tries++;
    if(setup() || tries > 40){ clearInterval(timer); }
  }, 250);
})();

/* ===== index block #5 ===== */
(function(){
  function getLovedContainer(){
    var w = document.querySelector(".grid5_slide");
    if(!w) return null;
    var el = w.parentElement;
    for(var i=0;i<6 && el;i++){ if(el.swiper) return el; el = el.parentElement; }
    return null;
  }
  function connect(){
    var c = getLovedContainer();
    if(!c || !c.swiper) return false;
    var sb = document.querySelector(".swiper-scrollbar-highlight_product");
    if(!sb) return false;
    var inst = c.swiper;
    try{
      inst.params.scrollbar = inst.params.scrollbar || {};
      inst.params.scrollbar.el = sb;
      inst.params.scrollbar.draggable = true;
      inst.params.scrollbar.hide = false;
      if(inst.scrollbar){
        inst.scrollbar.el = sb;
        if(inst.scrollbar.init) inst.scrollbar.init();
        if(inst.scrollbar.updateSize) inst.scrollbar.updateSize();
        if(inst.scrollbar.setTranslate) inst.scrollbar.setTranslate();
      }
      inst.on("setTranslate", function(){ if(inst.scrollbar && inst.scrollbar.setTranslate) inst.scrollbar.setTranslate(); });
      inst.on("resize", function(){ if(inst.scrollbar && inst.scrollbar.updateSize) inst.scrollbar.updateSize(); });
    }catch(e){}
    var frac = document.querySelector(".nutti-frac");
    if(frac) frac.style.display = "none";
    var pag = document.querySelector(".swiper-pagination-highlight_product");
    if(pag) pag.style.display = "none";
    return !!sb.querySelector(".swiper-scrollbar-drag");
  }
  var tries = 0;
  var t = setInterval(function(){
    tries++;
    if(connect() || tries > 40){ clearInterval(t); }
  }, 250);
  window.addEventListener("load", connect);
})();

/* ===== index block #7 ===== */
(function(){
  var HOLD=3000;
  function initHeroBottom(){
    var box=document.querySelector(".nutti-hero-bottom");
    if(!box) return;
    var isMobile=window.matchMedia("(max-width:767px)").matches;
    box.classList.add(isMobile?"is-mobile":"is-desktop");
    var keep=box.querySelector(isMobile?".nutti-hero-bottom-m":".nutti-hero-bottom-d");
    var drop=box.querySelector(isMobile?".nutti-hero-bottom-d":".nutti-hero-bottom-m");
    if(drop){ drop.removeAttribute("src"); drop.load&&drop.load(); drop.parentNode&&drop.parentNode.removeChild(drop); }
    if(!keep) return;
    keep.muted=true; keep.loop=false;
    keep.setAttribute("muted",""); keep.setAttribute("playsinline",""); keep.setAttribute("webkit-playsinline","");
    if(!keep.getAttribute("src")){ keep.setAttribute("src", keep.getAttribute("data-src")); }
    keep.load();
    var holding=false;
    function play(){ var p=keep.play(); if(p&&p.catch){ p.catch(function(){ setTimeout(play,400); }); } }
    keep.addEventListener("loadeddata",play);
    keep.addEventListener("canplay",play);
    keep.addEventListener("ended",function(){ holding=true; setTimeout(function(){ holding=false; try{keep.currentTime=0;}catch(e){} play(); }, HOLD); });
    keep.addEventListener("pause",function(){ if(!keep.ended && !holding){ play(); } });
    document.addEventListener("visibilitychange",function(){ if(!document.hidden && !holding) play(); });
    ["touchstart","click","scroll"].forEach(function(ev){ window.addEventListener(ev,function(){ if(!holding) play(); }, {once:true,passive:true}); });
    play();
  }
  if(document.readyState==="loading"){ document.addEventListener("DOMContentLoaded",initHeroBottom); } else { initHeroBottom(); }
})();

/* ===== index block #8 ===== */
(function(){
  function initNuttiHam(){
    var header=document.getElementById('header'); if(!header) return;
    var box=header.querySelector('.top_nav_box'); var cat=header.querySelector('.top_category'); if(!box||!cat) return;
    if(document.getElementById('nuttiHamBtn')) return;
    var btn=document.createElement('button');
    btn.id='nuttiHamBtn'; btn.type='button'; btn.setAttribute('aria-label','메뉴');
    btn.innerHTML='<span></span><span></span><span></span>';
    box.insertBefore(btn, box.firstChild);
    var ov=document.createElement('div'); ov.id='nuttiMenuOverlay'; document.body.appendChild(ov);
    btn.addEventListener('click', function(){ document.body.classList.toggle('nutti-menu-open'); });
    ov.addEventListener('click', function(){ document.body.classList.remove('nutti-menu-open'); });
    cat.addEventListener('click', function(e){ if(e.target.closest('a')) document.body.classList.remove('nutti-menu-open'); });
    window.addEventListener('resize', function(){ if(window.innerWidth>1440 || window.innerWidth<=1024) document.body.classList.remove('nutti-menu-open'); });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', initNuttiHam);
  else initNuttiHam();
})();
