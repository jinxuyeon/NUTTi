/* 상품 데이터: js/products-data.js 의 전역 PRODUCTS 사용 */

var profile = {name:'', breed:'', age:'성견', size:'소형견', activity:'보통', health:[], bcs:'', weight:''};
var currentFilter = 'all';
var currentView = 'all';   // 'recommend' | 'all' — 초기값은 init에서 결정

/* ── 보안 유틸 ── */
// XSS 방지: innerHTML에 들어가는 모든 동적 문자열은 반드시 이스케이프
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
}
// 카드 배경색: 데이터 오염 대비 hex 형식만 허용
function safeColor(c) {
  return /^#[0-9A-Fa-f]{3,8}$/.test(c || '') ? c : '#F1E9DF';
}
// 자사몰 바로가기: nutti.co.kr 도메인만 허용 + UTM 부착. 그 외엔 빈 문자열(미노출)
var STORE_ORIGIN = 'https://nutti.co.kr';
function storeUrl(path) {
  if (!path) return '';
  try {
    var u = new URL(path, STORE_ORIGIN);
    if (u.origin !== STORE_ORIGIN) return '';
    u.searchParams.set('utm_source', 'treat-calculator');
    u.searchParams.set('utm_medium', 'referral');
    return u.href;
  } catch (e) { return ''; }
}

/* ── 추천 점수 ── */
// 연령·견종 크기 적합 여부
function fitsAgeSize(p) {
  var ageMap = {'자견':1,'성견':2,'노령견':3};
  var ageVal = ageMap[profile.age]||2;
  var sizeMap = {'소형견':2,'중대형견':3,'모든견종':4};
  var sizeVal = sizeMap[profile.size]||2;
  var ageOk = p.age.indexOf(4)>-1 || p.age.indexOf(ageVal)>-1;
  var sizeOk = p.size.indexOf(4)>-1 || p.size.indexOf(sizeVal)>-1;
  return ageOk && sizeOk;
}
// 강아지의 건강 고민 중 이 제품이 해결해주는 항목들
function matchedConcerns(p) {
  if (profile.health.length === 0) return [];
  if (!fitsAgeSize(p)) return [];
  return profile.health.filter(function(h){
    return p.functions.some(function(f){ return f.indexOf(h)>-1 || h.indexOf(f)>-1; });
  });
}
// 추천 점수: 해결하는 건강 고민 개수 (0이면 추천 아님)
function recScore(p) {
  return matchedConcerns(p).length;
}

function makeSpec(labels, pct, isPowder) {
  return '<div class="spec-row">' +
    '<div class="spec-labels">'+labels.map(function(l){return '<span>'+l+'</span>';}).join('')+'</div>' +
    '<div class="spec-track">' +
      '<div class="spec-fill" style="width:'+pct+'%"></div>' +
      '<div class="spec-dot'+(isPowder?' powder':'')+'" style="left:'+pct+'%"></div>' +
    '</div></div>';
}

function pct(val, min, max){ return Math.round((val-min)/(max-min)*100); }

var FILTER_MAP = {
  '관절': ['관절','골다공증','뼈건강','신경통'],
  '피부': ['피부','모질','노화방지','알러지예방'],
  '다이어트': ['다이어트','저지방'],
  '치아': ['치아','치석'],
  '두뇌': ['두뇌'],
  '면역': ['면역','감기예방','시력보호'],
};

function filterMatch(p, f) {
  if(f==='all') return true;
  if(f==='SOFT') return p.texture==='SOFT';
  if(f==='MIDDLE') return p.texture==='MIDDLE';
  if(f==='HARD') return p.texture==='HARD';
  if(f==='분말') return p.texture==='분말';
  var keys = FILTER_MAP[f]||[f];
  return p.functions.some(function(fn){ return keys.some(function(k){return fn.indexOf(k)>-1||k.indexOf(fn)>-1;}); });
}

/* ── 카드 1개 HTML ── */
function cardHTML(p, isRec, show, concerns) {
  var texPct = p.texture==='분말' ? 0 : pct(p.texVal,1,3);
  var agePct = p.age.indexOf(4)>-1 ? 100 : pct(Math.max.apply(null,p.age),1,4);
  var sizePct = p.size.indexOf(4)>-1 ? 100 : pct(Math.max.apply(null,p.size),1,4);
  var isPowder = p.texture==='분말';
  var hlFns = p.functions.slice(0,3).map(function(f){
    var isHL = profile.health.length>0 && profile.health.some(function(h){return f.indexOf(h)>-1||h.indexOf(f)>-1;});
    return '<span class="tag-chip'+(isHL?' highlight':'')+'">'+escapeHtml(f)+'</span>';
  }).join('');
  var link = storeUrl(p.url);
  var footerHTML = link
    ? '<div class="card-footer"><a class="card-link" href="'+escapeHtml(link)+'" target="_blank" rel="noopener noreferrer">누띠에서 보러가기 →</a></div>'
    : '';
  // 추천 이유 배지: 강아지 고민 중 이 제품이 맞는 항목(최대 2개)
  var reason = (concerns && concerns.length)
    ? '✦ ' + concerns.slice(0,2).join('·') + ' 맞춤'
    : '';
  var reasonHTML = reason
    ? '<div class="reason-tag">'+escapeHtml(reason)+'</div>'
    : '';
  return '<div class="product-card'+(isRec?' matched':'')+(show?'':' hidden')+'">' +
    '<div class="card-img" style="background-color:'+safeColor(p.color)+';">' +
      '<span>'+p.emoji+'</span>' +
      '<span class="cat-badge cat-'+escapeHtml(p.cat)+'">'+escapeHtml(p.catLabel)+'</span>'+
    '</div>'+
    '<div class="card-body">'+
      reasonHTML+
      '<div class="card-name">'+escapeHtml(p.name)+'</div>'+
      '<div class="card-weight">'+escapeHtml(p.weight)+'</div>'+
      '<div class="specs">'+
        (isPowder
          ? '<div class="spec-row"><div class="spec-labels"><span>분말형 제품</span></div><div class="spec-track"><div class="spec-dot powder" style="left:0%;top:50%;transform:translate(-50%,-50%);position:relative;display:inline-block;margin-left:2px;"></div></div></div>'
          : makeSpec(['SOFT','MIDDLE','HARD'], texPct, false)
        )+
        makeSpec(['자견','성견','노령견','전연령'], agePct, false)+
        makeSpec(['초소형','소형견','중대형','모든견종'], sizePct, false)+
      '</div>'+
      '<div class="tag-row">'+hlFns+'</div>'+
      footerHTML+
    '</div>'+
  '</div>';
}

/* ── 렌더 ── */
function renderCards() {
  // 추천 이유·점수 부여 + 추천 우선 정렬(동점은 원래 순서 유지 — 안정 정렬)
  var list = PRODUCTS.map(function(p, i){
    var concerns = matchedConcerns(p);
    return { p:p, concerns:concerns, score:concerns.length, rec:concerns.length>0, idx:i };
  });
  var recCount = list.filter(function(x){ return x.rec; }).length;
  list.sort(function(a, b){ return (b.score - a.score) || (a.idx - b.idx); });

  var visible = 0;
  var html = list.map(function(x){
    var inView = (currentView === 'all') || x.rec;
    var show = inView && filterMatch(x.p, currentFilter);
    if (show) visible++;
    return cardHTML(x.p, x.rec, show, x.concerns);
  }).join('');
  document.getElementById('productsGrid').innerHTML = html;

  // 탭 카운트
  document.getElementById('recTabCount').textContent = recCount;
  document.getElementById('allTabCount').textContent = PRODUCTS.length;
  document.getElementById('filterCount').textContent = visible + '개 제품';

  // 빈 상태(맥락별 메시지)
  var empty = document.getElementById('emptyState');
  if (visible === 0) {
    empty.style.display = 'block';
    empty.querySelector('p').textContent =
      (currentView === 'recommend' && recCount === 0)
        ? '건강 특이사항을 입력하면 맞춤 추천을 보여드려요'
        : '조건에 맞는 제품이 없습니다';
  } else {
    empty.style.display = 'none';
  }
}

/* ── 탭/필터 ── */
function setView(v, el) {
  currentView = v;
  currentFilter = 'all';
  document.querySelectorAll('.view-tab').forEach(function(b){ b.classList.toggle('active', b===el); });
  document.querySelectorAll('.filter-btn').forEach(function(b){ b.classList.toggle('active', b.dataset.filter==='all'); });
  renderCards();
}

function setFilter(val, el) {
  currentFilter = val;
  document.querySelectorAll('.filter-btn').forEach(function(b){b.classList.remove('active');});
  el.classList.add('active');
  renderCards();
}

/* ── URL 파라미터 파싱 (화이트리스트 검증) ── */
var ALLOWED_PARAMS = {
  age:  ['자견','성견','노령견'],
  size: ['소형견','중대형견','모든견종'],
  act:  ['낮음','보통','높음','매우 높음'],
  bcs:  ['저체중','약간 마름','이상적','과체중','비만'],
};
var ALLOWED_HEALTH = ['관절','피부','다이어트','소화','치아','빈혈','두뇌','면역','기력'];

function pickAllowed(p, key, fallback) {
  var v = p.get(key);
  return ALLOWED_PARAMS[key].indexOf(v) > -1 ? v : fallback;
}

function parseParams() {
  var p = new URLSearchParams(window.location.search);
  // 자유 텍스트: 제어문자 제거 + 길이 제한 (출력 시 escapeHtml 추가 적용)
  if(p.get('name'))  profile.name  = p.get('name').replace(/[\x00-\x1F\x7F]/g,'').trim().slice(0, 20);
  if(p.get('breed')) profile.breed = p.get('breed').replace(/[^0-9A-Za-z가-힣ㄱ-ㅎ\s()\-·]/g,'').slice(0, 30);
  // 열거형: 화이트리스트 외 값은 기본값으로
  profile.age      = pickAllowed(p, 'age',  profile.age);
  profile.size     = pickAllowed(p, 'size', profile.size);
  profile.activity = pickAllowed(p, 'act',  profile.activity);
  if(p.get('bcs')) profile.bcs = pickAllowed(p, 'bcs', '');
  // 건강 태그: 알려진 값만 통과
  if(p.get('health')) {
    profile.health = p.get('health').split(',').filter(function(h){
      return ALLOWED_HEALTH.indexOf(h) > -1;
    });
  }
  // 체중: 숫자 검증 + 범위 보정
  if(p.get('weight')) {
    var w = parseFloat(p.get('weight'));
    profile.weight = isFinite(w) ? String(Math.min(60, Math.max(0.5, w)).toFixed(1)) : '';
  }
  if(profile.bcs==='과체중'||profile.bcs==='비만'){
    if(profile.health.indexOf('다이어트')===-1) profile.health.push('다이어트');
  }
}

function updatePersonaBar() {
  var hasName = profile.name && profile.name!=='우리 강아지';
  if(hasName){ document.getElementById('pName').textContent=profile.name; document.getElementById('pNameTag').style.display='flex'; }
  document.getElementById('pBreed').textContent  = (profile.breed?profile.breed+' · ':'')+profile.size;
  document.getElementById('pAge').textContent    = profile.age;
  document.getElementById('pAct').textContent    = profile.activity;
  document.getElementById('pHealth').textContent = profile.health.length?profile.health.join(' · '):'없음';
  if(profile.bcs&&profile.bcs!=='이상적'){ document.getElementById('pBcs').textContent=profile.bcs; document.getElementById('pBcsTag').style.display='flex'; }
  var displayName = hasName?profile.name:'내 강아지';
  document.getElementById('heroTitle').innerHTML = '<em>'+escapeHtml(displayName)+'</em>에게 딱 맞는<br>간식 루틴';
  if(profile.breed) document.getElementById('heroDesc').textContent = profile.breed+' · '+profile.age+' 기준으로 맞춤 추천해 드립니다.';
}

/* ── 초기 뷰 결정: 추천할 게 있으면 '맞춤 추천' 탭으로 시작 ── */
function initView() {
  var hasRec = PRODUCTS.some(function(p){ return recScore(p) > 0; });
  currentView = hasRec ? 'recommend' : 'all';
  document.querySelectorAll('.view-tab').forEach(function(b){
    b.classList.toggle('active', b.dataset.view === currentView);
  });
}

/* ── 이벤트 바인딩 (inline 핸들러 제거 — CSP 대응) ── */
document.querySelector('.view-tabs').addEventListener('click', function(e){
  var tab = e.target.closest('.view-tab');
  if (tab && tab.dataset.view) setView(tab.dataset.view, tab);
});
document.querySelector('.filter-wrap').addEventListener('click', function(e){
  var btn = e.target.closest('.filter-btn');
  if (btn && btn.dataset.filter) setFilter(btn.dataset.filter, btn);
});
document.querySelectorAll('.back-btn, .persona-edit').forEach(function(el){
  el.addEventListener('click', function(){ window.location.href = 'index.html'; });
});

parseParams();
updatePersonaBar();
initView();
renderCards();
