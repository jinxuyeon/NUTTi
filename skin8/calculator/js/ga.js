/* ─────────────────────────────────────────────
   GA4 로더 (ga.js)
   - 아래 GA_ID에 측정 ID(G-…)를 넣는 순간 활성화된다.
   - 비어 있으면 아무 요청도 보내지 않는다 (안전 no-op).
   - 유입 확인: GA4 → 보고서 → 획득 → 트래픽 획득
     (유튜브/댓글 등에 뿌릴 땐 링크에 utm_source를 붙일 것)
   - 바로가기 클릭은 'store_click' 이벤트로 수집된다.
   ───────────────────────────────────────────── */
var GA_ID = 'G-KG0XE6F5XT';

if (GA_ID) {
  var gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(gaScript);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', GA_ID);
}
