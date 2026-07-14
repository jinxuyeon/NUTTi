/* ── 견종 데이터 (40종) ── */
var BREEDS = [
  // 소형견
  {name:'말티즈',        emoji:'🐶',size:'소형',factor:1.0,  warn:'슬개골 탈구 주의. 부드럽고 가벼운 간식을 권장합니다.'},
  {name:'포메라니안',    emoji:'🦊',size:'소형',factor:1.05, warn:'치아·잇몸 질환에 취약. 딱딱한 간식은 소량만 급여하세요.'},
  {name:'토이푸들',      emoji:'🐩',size:'소형',factor:1.0,  warn:'귀 질환·피부 알러지 주의. 단일 단백질 간식을 추천합니다.'},
  {name:'시츄',          emoji:'🐕',size:'소형',factor:0.95, warn:'비만 경향이 있습니다. 칼로리 밀도가 낮은 간식을 선택하세요.'},
  {name:'비숑프리제',    emoji:'🤍',size:'소형',factor:0.95, warn:'피부·눈물자국 예민. 인공첨가물 없는 간식을 선택하세요.'},
  {name:'치와와',        emoji:'🐕',size:'소형',factor:1.1,  warn:'저혈당 주의. 소량씩 자주 급여하는 것이 좋습니다.'},
  {name:'닥스훈트',      emoji:'🌭',size:'소형',factor:0.9,  warn:'척추 디스크 취약. 과체중 방지를 위해 칼로리 관리가 필수입니다.'},
  {name:'요크셔테리어',  emoji:'🐶',size:'소형',factor:1.05, warn:'치석·치주 질환 취약. 씹는 질감의 간식으로 치아를 관리하세요.'},
  {name:'파피용',        emoji:'🦋',size:'소형',factor:1.1,  warn:'전반적으로 건강하나 슬개골 주의. 고단백 간식 적합.'},
  {name:'미니핀',        emoji:'🐕',size:'소형',factor:1.15, warn:'활동량 많아 에너지 소모가 높습니다. 고단백 간식 권장.'},
  {name:'퍼그',          emoji:'🐷',size:'소형',factor:0.85, warn:'호흡기·비만 취약. 저칼로리·소화 잘 되는 간식을 선택하세요.'},
  {name:'페키니즈',      emoji:'🐕',size:'소형',factor:0.9,  warn:'호흡기 문제 주의. 딱딱한 간식 피하고 부드러운 것 권장.'},
  {name:'미니어처슈나우저',emoji:'🐕',size:'소형',factor:0.95,warn:'췌장염·고지혈 취약. 저지방 간식이 필수입니다.'},
  {name:'스피츠',        emoji:'🐶',size:'소형',factor:1.0,  warn:'전반적으로 건강한 편. 털 건강을 위한 오메가3 성분 권장.'},
  {name:'이탈리안그레이하운드',emoji:'🐕',size:'소형',factor:1.05,warn:'근육 유지 중요. 고단백 간식과 칼슘 보충을 권장합니다.'},
  {name:'라사압소',      emoji:'🐕',size:'소형',factor:0.95, warn:'피부·신장 건강 주의. 저염 간식을 권장합니다.'},
  {name:'카바리에킹찰스',emoji:'🐕',size:'소형',factor:0.9,  warn:'심장 질환 취약. 저나트륨·저지방 간식이 중요합니다.'},
  {name:'보스턴테리어',  emoji:'🐕',size:'소형',factor:0.9,  warn:'호흡기·비만 주의. 소화 잘 되는 소량 간식을 권장합니다.'},
  // 중형견
  {name:'비글',          emoji:'🐕',size:'중형',factor:0.88, warn:'비만 경향 매우 강함. 간식 양을 엄격하게 제한해 주세요.'},
  {name:'코카스파니엘',  emoji:'🐕',size:'중형',factor:0.9,  warn:'귀 염증·비만 주의. 저지방 간식과 귀 건강 성분 권장.'},
  {name:'시바이누',      emoji:'🦊',size:'중형',factor:1.05, warn:'피부 알러지 취약. 단일 단백질·저알러지 간식을 선택하세요.'},
  {name:'웰시코기',      emoji:'🐕',size:'중형',factor:0.9,  warn:'척추·관절 주의. 체중 관리가 건강의 핵심입니다.'},
  {name:'바센지',        emoji:'🐕',size:'중형',factor:1.1,  warn:'신장 건강 주의. 저염 간식을 권장합니다.'},
  {name:'잉글리시스프링거',emoji:'🐕',size:'중형',factor:1.0, warn:'귀 감염·체중 관리 필요. 저지방 간식 권장.'},
  {name:'미니어처슈나우저(중형)',emoji:'🐕',size:'중형',factor:0.92,warn:'췌장염 취약. 저지방 간식이 필수입니다.'},
  {name:'프렌치불독',    emoji:'🐷',size:'중형',factor:0.85, warn:'호흡기·비만 취약. 딱딱한 간식 주의, 저칼로리 권장.'},
  {name:'불독',          emoji:'🐶',size:'중형',factor:0.85, warn:'호흡기 문제·과열 주의. 칼로리를 엄격히 관리하세요.'},
  {name:'사모예드(중형)',emoji:'🐶',size:'중형',factor:1.05, warn:'당뇨 취약. 혈당 지수 낮은 자연 성분 간식을 권장합니다.'},
  // 대형견
  {name:'골든리트리버',  emoji:'🦮',size:'대형',factor:0.9,  warn:'비만·관절 취약. 체중과 칼로리를 엄격히 관리해 주세요.'},
  {name:'래브라도리트리버',emoji:'🐕‍🦺',size:'대형',factor:0.85,warn:'비만 경향 매우 강함. 간식 칼로리는 5% 이내로 제한하세요.'},
  {name:'시베리안허스키',emoji:'🐺',size:'대형',factor:1.2,  warn:'아연 결핍 주의. 아연 함유 자연 성분 간식을 보충하세요.'},
  {name:'저먼셰퍼드',    emoji:'🐕',size:'대형',factor:1.0,  warn:'고관절·소화기 취약. 고단백·저지방 간식을 권장합니다.'},
  {name:'보더콜리',      emoji:'🐕',size:'대형',factor:1.3,  warn:'고활동량 견종. 운동 부족 시 스트레스성 과식에 주의하세요.'},
  {name:'진돗개',        emoji:'🐕',size:'대형',factor:1.1,  warn:'특이사항 적음. 활동량이 높아 고단백 간식이 적합합니다.'},
  {name:'사모예드',      emoji:'🤍',size:'대형',factor:1.05, warn:'당뇨 취약. 혈당 지수 낮은 자연 성분 간식을 권장합니다.'},
  {name:'알래스칸말라뮤트',emoji:'🐺',size:'대형',factor:1.15,warn:'고활동량. 고단백·고에너지 간식이 필요합니다.'},
  {name:'아키타',        emoji:'🐕',size:'대형',factor:1.0,  warn:'자가면역 질환 취약. 저알러지 성분 간식을 선택하세요.'},
  {name:'로트와일러',    emoji:'🐕',size:'대형',factor:0.95, warn:'고관절·심장 주의. 체중 관리와 관절 보호 성분을 권장합니다.'},
  {name:'달마시안',      emoji:'🐕',size:'대형',factor:1.0,  warn:'요로 결석 취약. 저퓨린 성분 간식이 필수입니다.'},
  {name:'믹스견',        emoji:'🐾',size:'중형',factor:1.0,  warn:'유전적 특이사항 불명확. 체중·활동량 기준으로 관리하세요.'},
];

/* ── 성분 데이터 ── */
var INGREDIENTS = [
  {val:'닭가슴살',  emoji:'🍗', safe:'safe',  health:[]},
  {val:'오리고기',  emoji:'🦆', safe:'safe',  health:['피부']},
  {val:'소고기',    emoji:'🥩', safe:'safe',  health:[]},
  {val:'연어',      emoji:'🐟', safe:'safe',  health:['관절','피부']},
  {val:'고구마',    emoji:'🍠', safe:'safe',  health:['소화','다이어트']},
  {val:'당근',      emoji:'🥕', safe:'safe',  health:['다이어트']},
  {val:'블루베리',  emoji:'🫐', safe:'safe',  health:[]},
  {val:'호박',      emoji:'🎃', safe:'safe',  health:['소화','다이어트']},
  {val:'브로콜리',  emoji:'🥦', safe:'safe',  health:['다이어트']},
  {val:'사과',      emoji:'🍎', safe:'safe',  health:[]},
  {val:'치즈',      emoji:'🧀', safe:'warn',  health:['치아']},
  {val:'땅콩버터',  emoji:'🥜', safe:'warn',  health:[]},
  {val:'포도',      emoji:'🍇', safe:'danger', health:[]},
  {val:'양파',      emoji:'🧅', safe:'danger', health:[]},
  {val:'자일리톨',  emoji:'❌', safe:'danger', health:[]},
  {val:'초콜릿',    emoji:'🍫', safe:'danger', health:[]},
  {val:'마카다미아', emoji:'🥜', safe:'danger', health:[]},
  {val:'포도씨유',  emoji:'🍇', safe:'danger', health:[]},
];

/* ── 건강상태별 성분 추천 메시지 ── */
var HEALTH_ING_TIP = {
  관절:  { 연어:'오메가3가 관절 염증 완화에 도움', 고구마:'관절에 부담 낮은 저칼로리 탄수화물' },
  피부:  { 연어:'오메가3·6로 피부 장벽 강화', 오리고기:'단일 단백질로 알러지 반응 최소화' },
  소화:  { 고구마:'식이섬유로 장 건강 개선', 호박:'소화 촉진, 장운동 도움' },
  다이어트: { 고구마:'포만감 높고 칼로리 낮음', 당근:'칼로리 거의 없는 간식 대체재', 브로콜리:'저칼로리·고섬유 간식' },
  치아:  { 치즈:'칼슘 공급으로 치아 강화 (소량)' },
};

var state = { breed: BREEDS[0], neuter:'Y', activity:'normal', bcs: 5 };
var currentStep = 0;
var STEP_LABELS = ['견종 선택','기본 정보','생활 패턴','성분 선택','결과'];

var BCS_HINTS = {
  2: '⚠️ 저체중입니다. 현재 체중 기준으로 계산하며, 수의사와 영양 상담을 권장합니다.',
  4: '현재 체중 기준으로 계산합니다. 간식 급여량을 늘리는 것도 고려해 보세요.',
  5: '✅ 이상적인 체형입니다. 현재 체중 기준으로 계산합니다.',
  7: '⚠️ 과체중입니다. 이상체중으로 보정해 계산합니다. (현재 체중 × 0.85)',
  9: '🚨 비만입니다. 이상체중으로 보정해 계산하며, 간식 허용량을 5%로 제한합니다. (현재 체중 × 0.70)',
};

/* ── 입력값 검증 유틸 ── */
// XSS 방지: innerHTML에 사용자 입력을 넣기 전 반드시 이스케이프
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
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
// 강아지 이름: 공백 정리 + 20자 제한, 비면 기본값
function getDogNameRaw() {
  var v = (document.getElementById('dogName').value || '').trim().slice(0, 20);
  return v || '우리 강아지';
}
// 체중: 유한수 + 0.5~60kg 범위로 보정
function getWeightSafe() {
  var w = parseFloat(document.getElementById('weightSlider').value);
  if (!isFinite(w)) return 5;
  return Math.min(60, Math.max(0.5, w));
}
// 슬라이더 값 표시 + 트랙 채움(--fill) 동기화
function updateWeightUI(el) {
  var v = parseFloat(el.value);
  if (!isFinite(v)) v = 5;
  document.getElementById('weightVal').textContent = v.toFixed(1) + 'kg';
  var min = parseFloat(el.min), max = parseFloat(el.max);
  el.style.setProperty('--fill', ((v - min) / (max - min) * 100) + '%');
}

/* ── 단계 이동 검증 ── */
function validateStep(step) {
  clearStepErrors();
  if (step === 1) {
    var raw = (document.getElementById('dogName').value || '').trim();
    if (raw.length > 20) {
      showStepError(step, '강아지 이름은 20자 이내로 입력해 주세요.');
      return false;
    }
    var w = parseFloat(document.getElementById('weightSlider').value);
    if (!isFinite(w) || w < 0.5 || w > 60) {
      showStepError(step, '체중을 0.5~60kg 범위에서 선택해 주세요.');
      return false;
    }
  }
  return true;
}
function showStepError(step, msg) {
  var panel = document.getElementById('panel' + step);
  if (!panel) return;
  var err = panel.querySelector('.step-error');
  if (!err) {
    err = document.createElement('div');
    err.className = 'step-error alert amber';
    err.innerHTML = '<span class="alert-icon">⚠️</span><span class="step-error-msg"></span>';
    panel.insertBefore(err, panel.querySelector('.btn-row'));
  }
  err.querySelector('.step-error-msg').textContent = msg;
  err.style.display = 'flex';
}
function clearStepErrors() {
  document.querySelectorAll('.step-error').forEach(function(e){ e.style.display = 'none'; });
}

function selectBCS(el, bcs) {
  state.bcs = bcs;
  document.querySelectorAll('.bcs-card').forEach(function(c){c.classList.remove('selected');});
  el.classList.add('selected');
  var hint = document.getElementById('bcsHint');
  hint.textContent = BCS_HINTS[bcs] || '';
  hint.classList.add('show');
}

/* ── 이상체중 보정 ── */
function getIdealWeight(weight, bcs) {
  if(bcs <= 5) return weight;          // 정상·저체중: 현재 체중 사용
  if(bcs <= 7) return weight * 0.85;   // 과체중: ~15% 감량 목표
  return weight * 0.70;                // 비만: ~30% 감량 목표
}

/* ── 견종 렌더 ── */
function initBreeds() {
  var grid = document.getElementById('breedGrid');
  grid.innerHTML = BREEDS.map(function(b,i){
    var sizeClass = b.size==='소형'?'size-small':b.size==='중형'?'size-medium':'size-large';
    return '<div class="breed-card'+(i===0?' selected':'')+'" data-idx="'+i+'" data-name="'+escapeHtml(b.name)+'">' +
      '<div class="breed-emoji">'+b.emoji+'</div>' +
      '<div class="breed-name">'+escapeHtml(b.name)+'</div>' +
      '<span class="breed-size-tag '+sizeClass+'">'+escapeHtml(b.size)+'</span>' +
    '</div>';
  }).join('');
}

function filterBreeds(q) {
  document.querySelectorAll('.breed-card').forEach(function(c){
    c.classList.toggle('hidden', q.trim() && c.dataset.name.indexOf(q.trim())===-1);
  });
}

function pickBreed(el, idx) {
  state.breed = BREEDS[idx];
  document.querySelectorAll('.breed-card').forEach(function(c){c.classList.remove('selected');});
  el.classList.add('selected');
}

function selectGroup(group, el, val) {
  state[group] = val;
  el.parentElement.querySelectorAll('.choice-card').forEach(function(c){c.classList.remove('selected');});
  el.classList.add('selected');
}

function toggleTag(el){
  var wrap = el.parentElement;
  var isNone = el.dataset.val === '없음';
  el.classList.toggle('selected');
  if (el.classList.contains('selected')) {
    if (isNone) {
      // '없음' 선택 시 나머지 해제
      wrap.querySelectorAll('.tag').forEach(function(t){ if (t !== el) t.classList.remove('selected'); });
    } else {
      // 일반 항목 선택 시 '없음' 해제
      var none = wrap.querySelector('.tag[data-val="없음"]');
      if (none) none.classList.remove('selected');
    }
  }
  // 아무것도 선택 안 됐으면 '없음' 자동 선택 (빈 상태 방지)
  if (wrap.querySelectorAll('.tag.selected').length === 0) {
    var none2 = wrap.querySelector('.tag[data-val="없음"]');
    if (none2) none2.classList.add('selected');
  }
}

function getTags(id){
  return Array.from(document.querySelectorAll('#'+id+' .tag.selected')).map(function(t){return t.dataset.val;});
}

/* ── 성분 그리드 (건강 연동) ── */
function renderIngGrid() {
  var health = getTags('healthTags');
  var grid = document.getElementById('ingGrid');
  var existSelected = {};
  document.querySelectorAll('#ingGrid .ing-row-sel.selected').forEach(function(el){
    existSelected[el.dataset.val] = true;
  });

  grid.innerHTML = INGREDIENTS.map(function(ing){
    var isSel = existSelected[ing.val] ? ' selected' : '';
    var tipHTML = '';

    if(ing.safe==='danger') {
      tipHTML = '<span class="ing-tip tip-danger">🚫 위험 성분</span>';
    } else if(ing.safe==='warn') {
      tipHTML = '<span class="ing-tip tip-caution">⚠ 소량만</span>';
    } else {
      // 건강 상태 연동
      var matchedTip = '';
      health.forEach(function(h){
        if(HEALTH_ING_TIP[h] && HEALTH_ING_TIP[h][ing.val]) {
          matchedTip = HEALTH_ING_TIP[h][ing.val];
        }
      });
      if(matchedTip) {
        tipHTML = '<span class="ing-tip tip-recommend">✦ 추천</span>';
      } else if(ing.health.length && ing.health.some(function(h){return health.indexOf(h)>-1;})){
        tipHTML = '<span class="ing-tip tip-info">도움</span>';
      }
    }

    return '<div class="ing-row-sel'+isSel+'" data-val="'+escapeHtml(ing.val)+'">' +
      '<div class="ing-left">' +
        '<span class="ing-emoji">'+ing.emoji+'</span>' +
        '<span class="ing-label">'+escapeHtml(ing.val)+'</span>' +
        tipHTML +
      '</div>' +
      '<div class="ing-check"></div>' +
    '</div>';
  }).join('');
}

function toggleIng(el) { el.classList.toggle('selected'); }

function getSelectedIngs() {
  return Array.from(document.querySelectorAll('#ingGrid .ing-row-sel.selected')).map(function(el){return el.dataset.val;});
}

/* ── Step 이동 ── */
function goStep(n) {
  // 앞으로 이동할 때만 현재 단계 입력값 검증
  if (n > currentStep) { if (!validateStep(currentStep)) return; }
  else { clearStepErrors(); }
  document.getElementById('panel'+currentStep).classList.remove('active');
  currentStep = n;
  document.getElementById('panel'+currentStep).classList.add('active');
  for(var i=0;i<5;i++){
    var dot = document.getElementById('dot'+i);
    dot.classList.toggle('active', i===n);
    dot.classList.toggle('done', i<n);
    if(i<4) document.getElementById('line'+i).classList.toggle('done', i<n);
  }
  document.getElementById('progLabel').innerHTML =
    '<strong>'+STEP_LABELS[n]+'</strong> · 5단계 중 '+(n+1)+'단계';
  if(n===3) renderIngGrid();
  if(n===4) renderResult();
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ── 결과 렌더 ── */
function renderResult() {
  var name   = getDogNameRaw();
  var nameSafe = escapeHtml(name);
  var weight = getWeightSafe();
  var age    = document.getElementById('dogAge').value;
  var health = getTags('healthTags');
  var ings   = getSelectedIngs();
  var breed  = state.breed;
  var bcs    = state.bcs;

  /* BCS 기반 이상체중 보정 */
  var idealWeight = getIdealWeight(weight, bcs);
  var isBcsAdjusted = idealWeight !== weight;

  var rer         = 70 * Math.pow(idealWeight, 0.75);
  var ageFactor   = age==='puppy'?3.0:age==='senior'?1.4:1.8;
  var neutFactor  = state.neuter==='Y'?0.8:1.0;
  var actFactor   = {low:0.8,normal:1.0,high:1.2,vhigh:1.6}[state.activity];
  var dietFactor  = health.indexOf('다이어트')>-1?0.8:1.0;
  var isObeseOrLabrador = bcs>=8 || breed.name==='래브라도리트리버';
  var treatPct    = (isObeseOrLabrador||health.indexOf('다이어트')>-1)?0.05:0.10;

  var dailyCal  = Math.round(rer*ageFactor*neutFactor*actFactor*dietFactor*breed.factor);
  var treatCal  = Math.round(dailyCal*treatPct);
  var treatGram = Math.round(treatCal/3.5);

  var accuracy = 68 + (state.activity!=='normal'?5:0) + 10 + (bcs!==5?10:0);
  accuracy = Math.min(accuracy, 95);

  var actLabel = {low:'낮음',normal:'보통',high:'높음',vhigh:'매우 높음'}[state.activity];
  var bcsLabel = {2:'저체중 (BCS 1~3)',4:'약간 마름 (BCS 4)',5:'이상적 (BCS 5)',7:'과체중 (BCS 6~7)',9:'비만 (BCS 8~9)'}[bcs];

  /* 성분 안전도 */
  var DANGER_SET = {포도:1,양파:1,자일리톨:1,초콜릿:1,마카다미아:1,'포도씨유':1};
  var WARN_SET   = {치즈:1,'땅콩버터':1};
  var hasDanger=false, hasWarn=false;
  var ingRows = ings.map(function(v){
    var s = DANGER_SET[v]?'danger':WARN_SET[v]?'warn':'safe';
    if(s==='danger')hasDanger=true;
    if(s==='warn')hasWarn=true;
    var badge = s==='safe'
      ? '<span class="ing-badge badge-safe">✓ 안전</span>'
      : s==='warn'
      ? '<span class="ing-badge badge-warn">⚠ 소량만</span>'
      : '<span class="ing-badge badge-danger">✗ 위험</span>';
    return '<div class="ing-result-row"><span>'+v+'</span>'+badge+'</div>';
  }).join('');

  var ingAlert = ings.length===0
    ? '<div class="alert gray"><span class="alert-icon">ℹ️</span><span>선택된 성분이 없습니다.</span></div>'
    : hasDanger
    ? '<div class="alert red"><span class="alert-icon">🚫</span><span>위험 성분이 포함되어 있습니다. 즉시 급여를 중단하고 수의사에게 문의하세요.</span></div>'
    : hasWarn
    ? '<div class="alert amber"><span class="alert-icon">⚠️</span><span>주의 성분이 있습니다. 소량만 급여하고 반응을 지켜보세요.</span></div>'
    : '<div class="alert green"><span class="alert-icon">✅</span><span>선택하신 성분은 모두 안전합니다.</span></div>';

  /* 상품 추천 — nutti.co.kr 실판매 품목과 1:1 매칭 (가격 정보는 보안·정책상 노출하지 않음) */
  var ALL_RECS = [
    // 관절
    {name:'말랑 튼튼 송아지 연골 천연 껌', desc:'천연 송아지 연골 — 관절·뼈 건강 케어', badge:'관절 맞춤', bc:'b-purple', cond:'관절', url:'/product/말랑-튼튼-송아지-연골-천연-껌/57/'},
    {name:'쫀득한 콜라겐 미니 하프족', desc:'콜라겐 가득 — 관절·피부 동시 케어', badge:'관절 맞춤', bc:'b-purple', cond:'관절', url:'/product/쫀득한-콜라겐-미니-하프족/63/'},
    // 피부
    {name:'프레시 그린 연어 야채 트릿', desc:'연어 오메가3 — 피부 장벽·모질 개선', badge:'피부 맞춤', bc:'b-purple', cond:'피부', url:'/product/프레시-그린-연어-야채-트릿/76/'},
    {name:'노즈워크 한입 쏙 연어 삼색트릿', desc:'연어·단호박·자색고구마 — 피부·항산화', badge:'피부 맞춤', bc:'b-purple', cond:'피부', url:'/product/노즈워크-한입-쏙-연어-삼색트릿/75/'},
    // 다이어트
    {name:'껍질째 통째로, 바삭한 완두콩칩', desc:'식물성 단백질·식이섬유 — 저지방 비건 칩', badge:'다이어트 맞춤', bc:'b-purple', cond:'다이어트', url:'/product/껍질째-통째로-바삭한-완두콩칩/70/'},
    {name:'달콤한 자연 한 입 당근', desc:'저칼로리 자연 간식 — 죄책감 없는 한 입', badge:'다이어트 맞춤', bc:'b-purple', cond:'다이어트', url:'/product/달콤한-자연-한-입-당근/69/'},
    // 소화
    {name:'햇살 가득 아삭 연근칩', desc:'식이섬유 — 소화·장 건강에 도움', badge:'소화 맞춤', bc:'b-purple', cond:'소화', url:'/product/햇살-가득-아삭-연근칩/68/'},
    {name:'노랗게 잘 익은 달콤 단호박칩', desc:'펙틴·식이섬유 — 소화·눈 건강 동시', badge:'소화 맞춤', bc:'b-purple', cond:'소화', url:'/product/노랗게-잘-익은-달콤-단호박칩/73/'},
    // 치아
    {name:'든든한 하루 한 대, 카우스틱', desc:'하루 한 대 오래 씹는 껌 — 치석 관리', badge:'치아 맞춤', bc:'b-purple', cond:'치아', url:'/product/든든한-하루-한-대-카우스틱/54/'},
    {name:'통째로 말려 더 고소한 돼지 통 귀', desc:'통째로 말린 츄 — 치아·잇몸 단련', badge:'치아 맞춤', bc:'b-purple', cond:'치아', url:'/product/통째로-말려-더-고소한-돼지-통-귀/80/'},
    // 기본 추천 (조건 없을 때)
    {name:'든든한 하루 한 대, 카우스틱', desc:'즐겁게 오래 씹는 데일리 영양 껌', badge:'인기', bc:'b-green', cond:null, url:'/product/든든한-하루-한-대-카우스틱/54/'},
    {name:'노즈워크 한입 쏙 연어 삼색트릿', desc:'한입 쏙 말랑 트릿 — 훈련 보상·노즈워크', badge:'추천', bc:'b-green', cond:null, url:'/product/노즈워크-한입-쏙-연어-삼색트릿/75/'},
    {name:'노랗게 잘 익은 달콤 단호박칩', desc:'단호박 100% 바삭 칩 — 전연령 기호성 높음', badge:'추천', bc:'b-green', cond:null, url:'/product/노랗게-잘-익은-달콤-단호박칩/73/'},
  ];

  // 건강 상태 매칭 추천 3개 선택
  var recs = [];
  var added = {};
  health.forEach(function(h) {
    ALL_RECS.forEach(function(r) {
      if(r.cond && h.indexOf(r.cond)>-1 && !added[r.name] && recs.length<3) {
        recs.push(r); added[r.name]=1;
      }
    });
  });
  // 부족하면 기본 추천으로 채우기
  ALL_RECS.forEach(function(r) {
    if(!r.cond && !added[r.name] && recs.length<3) {
      recs.push(r); added[r.name]=1;
    }
  });

  document.getElementById('resultHeading').textContent = name+'의 맞춤 결과';
  document.getElementById('resultBody').innerHTML =
    '<div class="result-hero">' +
      '<div class="result-hero-label">Daily Treat · 하루 권장 간식량</div>' +
      '<div class="result-dog-name">'+breed.emoji+' '+nameSafe+' ('+escapeHtml(breed.name)+')</div>' +
      '<div class="result-big"><span class="result-num" id="resultNum">0</span><span class="result-unit">g / 일</span></div>' +
      '<div class="result-chips">' +
        '<span class="r-chip">🔥 허용 칼로리 '+treatCal+' kcal</span>' +
        '<span class="r-chip">하루 칼로리의 '+Math.round(treatPct*100)+'%</span>' +
      '</div>' +
    '</div>' +

    '<div class="stat-grid">' +
      '<div class="stat-card"><div class="stat-label">🔥 하루 권장 칼로리</div><div class="stat-value">'+dailyCal+' kcal</div></div>' +
      '<div class="stat-card"><div class="stat-label">⚖️ 체중'+(isBcsAdjusted?' (보정값)':'')+'</div><div class="stat-value">'+idealWeight.toFixed(1)+' kg'+(isBcsAdjusted?' <span style="font-size:10px;color:var(--text-light);">입력 '+weight.toFixed(1)+'kg</span>':'')+'</div></div>' +
      '<div class="stat-card"><div class="stat-label">🐕 체형 (BCS)</div><div class="stat-value" style="font-size:13px;">'+bcsLabel+'</div></div>' +
      '<div class="stat-card"><div class="stat-label">✂️ 중성화 / 활동량</div><div class="stat-value" style="font-size:13px;">'+(state.neuter==='Y'?'완료':'미완료')+' / '+actLabel+'</div></div>' +
    '</div>' +

    (isBcsAdjusted ?
      '<div class="alert amber" style="margin-bottom:14px;">' +
        '<span class="alert-icon">⚖️</span>' +
        '<span><strong>이상체중으로 보정했습니다.</strong><br>' +
        '입력 체중 '+weight.toFixed(1)+'kg → 보정 체중 '+idealWeight.toFixed(1)+'kg 기준으로 계산했습니다. ' +
        '과체중 상태에서 현재 체중 기준으로 칼로리를 계산하면 실제보다 더 많이 급여하게 됩니다.</span>' +
      '</div>'
    : '') +

    '<div class="alert blue" style="margin-bottom:14px;">' +
      '<span class="alert-icon">🐾</span>' +
      '<span><strong>'+escapeHtml(breed.name)+' 주의사항</strong><br>'+escapeHtml(breed.warn)+'</span>' +
    '</div>' +

    '<div class="accuracy-section">' +
      '<div class="accuracy-header"><span>계산 정확도</span><span>'+accuracy+'%</span></div>' +
      '<div class="accuracy-track"><div class="accuracy-fill" id="accFill" style="width:0%"></div></div>' +
    '</div>' +

    (ings.length > 0 ?
      '<div class="divider"></div>' +
      '<div class="section-title">성분 안전도 분석</div>' +
      ingAlert +
      '<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);padding:4px 14px;margin-bottom:4px;">'+ingRows+'</div>'
    : '') +

    '<div class="divider"></div>' +
    '<div class="section-title">'+nameSafe+'에게 맞는 누띠 추천</div>' +
    recs.map(function(r){
      var inner = '<div><div class="rec-item-name">'+escapeHtml(r.name)+'</div><div class="rec-item-desc">'+escapeHtml(r.desc)+' · 누띠에서 보러가기 →</div></div><span class="rec-badge '+r.bc+'">'+escapeHtml(r.badge)+'</span>';
      var link = storeUrl(r.url);
      return link
        ? '<a class="rec-item" href="'+escapeHtml(link)+'" target="_blank" rel="noopener noreferrer">'+inner+'</a>'
        : '<div class="rec-item">'+inner+'</div>';
    }).join('') +

    '<div class="disclaimer"><span style="flex-shrink:0;">ℹ️</span><span>본 결과는 수의영양학 공식(RER = 70 × 체중^0.75) 기반 참고값입니다. 정확한 급여량은 담당 수의사와 상담하세요.</span></div>';

  setTimeout(function(){
    var el = document.getElementById('accFill');
    if(el) el.style.width = accuracy+'%';
  }, 100);

  // 결과 숫자 카운트업 애니메이션
  var numEl = document.getElementById('resultNum');
  if (numEl) {
    if (window.requestAnimationFrame) {
      var dur = 700, startT = null;
      var tick = function(t){
        if (startT === null) startT = t;
        var p = Math.min(1, (t - startT) / dur);
        p = 1 - Math.pow(1 - p, 3); // ease-out
        numEl.textContent = Math.round(treatGram * p);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    } else {
      numEl.textContent = treatGram;
    }
  }
}

function goToProducts() {
  var name   = getDogNameRaw();
  var weight = getWeightSafe();
  var age    = document.getElementById('dogAge').value;
  var health = getTags('healthTags').filter(function(h){return h!=='없음';});
  var idealWeight = getIdealWeight(weight, state.bcs);

  var ageLabel  = age==='puppy'?'자견':age==='senior'?'노령견':'성견';
  var sizeLabel = state.breed.size==='소형'?'소형견':state.breed.size==='중형'?'중대형견':'중대형견';
  var actLabel  = {low:'낮음',normal:'보통',high:'높음',vhigh:'매우 높음'}[state.activity];
  var bcsLabel  = {2:'저체중',4:'약간 마름',5:'이상적',7:'과체중',9:'비만'}[state.bcs]||'이상적';

  var params = new URLSearchParams({
    name:   name,
    breed:  state.breed.name,
    size:   sizeLabel,
    age:    ageLabel,
    act:    actLabel,
    weight: idealWeight.toFixed(1),
    neuter: state.neuter,
    health: health.join(','),
    bcs:    bcsLabel,
  });

  window.location.href = 'routinebite-products.html?' + params.toString();
}

/* ── 이벤트 바인딩 (inline 핸들러 제거 — CSP 대응) ── */
document.addEventListener('click', function(e){
  // 단계 이동 버튼
  var nav = e.target.closest('[data-goto]');
  if (nav) { goStep(parseInt(nav.dataset.goto, 10)); return; }
  // 상품 페이지 이동 CTA
  if (e.target.closest('[data-action="products"]')) { goToProducts(); return; }
  // 견종 카드
  var breed = e.target.closest('.breed-card');
  if (breed) { pickBreed(breed, parseInt(breed.dataset.idx, 10)); return; }
  // BCS 카드
  var bcs = e.target.closest('.bcs-card');
  if (bcs) { selectBCS(bcs, parseInt(bcs.dataset.bcs, 10)); return; }
  // 중성화/활동량 선택 카드
  var choice = e.target.closest('.choice-card');
  if (choice && choice.dataset.group) { selectGroup(choice.dataset.group, choice, choice.dataset.val); return; }
  // 건강 태그
  var tag = e.target.closest('#healthTags .tag');
  if (tag) { toggleTag(tag); return; }
  // 성분 행
  var ing = e.target.closest('.ing-row-sel');
  if (ing) { toggleIng(ing); return; }
});
document.querySelector('.breed-search').addEventListener('input', function(){ filterBreeds(this.value); });
document.getElementById('weightSlider').addEventListener('input', function(){ updateWeightUI(this); });

initBreeds();
updateWeightUI(document.getElementById('weightSlider'));
