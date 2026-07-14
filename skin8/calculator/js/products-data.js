/* ─────────────────────────────────────────────
   NUTTI 상품 데이터 (products-data.js)
   - 2026-07-14 nutti.co.kr 실판매 15개 품목과 1:1 매칭 (품절 포함, 단종 없음).
   - 가격(도매/소매) 정보는 보안상 클라이언트 코드에 두지 않는다.
   - url: 자사몰(nutti.co.kr) 상품 상세 경로. 비어 있으면 바로가기 미노출.
   - age/size/texture/functions는 상세페이지 공개 정보 기반 추정 — 운영자 검수 권장.
   ───────────────────────────────────────────── */
var PRODUCTS = [
  /* ── 치석 싹 오래먹는 껌 ── */
  {id:1, name:'든든한 하루 한 대, 카우스틱', weight:'미니 20cm · 롱 30cm', url:'/product/든든한-하루-한-대-카우스틱/54/',
   texture:'HARD', texVal:3, age:[1,2], size:[1,2,3,4],
   emoji:'🦷', color:'#F3E8FF', cat:'bone', catLabel:'오래먹는 껌',
   functions:['치아','스트레스 해소','기력']},

  /* ── 튼튼 관절 뼈 간식 ── */
  {id:2, name:'바삭바삭 영양 통오리 바이트', weight:'원물 건조', url:'/product/바삭바삭-영양-통오리-바이트/81/',
   texture:'MIDDLE', texVal:2, age:[1,2], size:[1,2,3,4],
   emoji:'🦆', color:'#FAE8DC', cat:'bone', catLabel:'뼈·관절',
   functions:['피부','다이어트','기력']},
  {id:3, name:'통째로 말려 더 고소한 돼지 통 귀', weight:'원물 건조', url:'/product/통째로-말려-더-고소한-돼지-통-귀/80/',
   texture:'HARD', texVal:3, age:[2], size:[2,3,4],
   emoji:'🐷', color:'#FCEBEB', cat:'bone', catLabel:'뼈·관절',
   functions:['치아','관절','피부']},
  {id:4, name:'정성으로 빚은 포크스틱', weight:'미니 30g · 롱 2p', url:'/product/정성으로-빚은-포크스틱/79/',
   texture:'MIDDLE', texVal:2, age:[1,2], size:[1,2,3,4],
   emoji:'🍖', color:'#FCEBEB', cat:'bone', catLabel:'뼈·관절',
   functions:['치아','기력','스트레스 해소']},
  {id:5, name:'스트레스 싹, 고소한 소울대 스틱', weight:'원물 건조', url:'/product/스트레스-싹-고소한-소울대-스틱/64/',
   texture:'HARD', texVal:3, age:[2], size:[2,3,4],
   emoji:'🐮', color:'#FAE8DC', cat:'bone', catLabel:'뼈·관절',
   functions:['관절','치아','스트레스 해소']},
  {id:6, name:'쫀득한 콜라겐 미니 하프족', weight:'미니 사이즈', url:'/product/쫀득한-콜라겐-미니-하프족/63/',
   texture:'HARD', texVal:3, age:[2], size:[1,2,3,4],
   emoji:'🐖', color:'#FCEBEB', cat:'bone', catLabel:'뼈·관절',
   functions:['관절','피부','치아']},
  {id:7, name:'말랑 튼튼 송아지 연골 천연 껌', weight:'원물 건조', url:'/product/말랑-튼튼-송아지-연골-천연-껌/57/',
   texture:'MIDDLE', texVal:2, age:[2,3], size:[1,2,3,4],
   emoji:'🦴', color:'#F3E8FF', cat:'bone', catLabel:'뼈·관절',
   functions:['관절','뼈건강','치아']},

  /* ── 지능발달 노즈워크 ── */
  {id:8, name:'프레시 그린 연어 야채 트릿', weight:'한입 사이즈', url:'/product/프레시-그린-연어-야채-트릿/76/',
   texture:'SOFT', texVal:1, age:[1,2,3,4], size:[1,2,3,4],
   emoji:'🐟', color:'#E8F5E1', cat:'mixed', catLabel:'노즈워크',
   functions:['피부','두뇌','면역']},
  {id:9, name:'노즈워크 한입 쏙 연어 삼색트릿', weight:'한입 사이즈', url:'/product/노즈워크-한입-쏙-연어-삼색트릿/75/',
   texture:'SOFT', texVal:1, age:[1,2,3,4], size:[1,2,3,4],
   emoji:'🐠', color:'#E6F1FB', cat:'mixed', catLabel:'노즈워크',
   functions:['두뇌','피부','소화']},

  /* ── 영양 가득 비건 칩 ── */
  {id:10, name:'햇살 가득 아삭 연근칩', weight:'원물 100%', url:'/product/햇살-가득-아삭-연근칩/68/',
   texture:'MIDDLE', texVal:2, age:[1,2,3,4], size:[1,2,3,4],
   emoji:'🌿', color:'#F1E9DF', cat:'veggie', catLabel:'비건 칩',
   functions:['소화','면역','다이어트']},
  {id:11, name:'달콤한 자연 한 입 당근', weight:'원물 100%', url:'/product/달콤한-자연-한-입-당근/69/',
   texture:'MIDDLE', texVal:2, age:[1,2,3,4], size:[1,2,3,4],
   emoji:'🥕', color:'#FDF3DC', cat:'veggie', catLabel:'비건 칩',
   functions:['시력보호','다이어트','면역']},
  {id:12, name:'껍질째 통째로, 바삭한 완두콩칩', weight:'원물 100%', url:'/product/껍질째-통째로-바삭한-완두콩칩/70/',
   texture:'MIDDLE', texVal:2, age:[1,2,3,4], size:[1,2,3,4],
   emoji:'🫘', color:'#E8F5E1', cat:'veggie', catLabel:'비건 칩',
   functions:['다이어트','소화','뼈건강']},
  {id:13, name:'붉은 빛 영양 가득 비트칩', weight:'원물 100%', url:'/product/붉은-빛-영양-가득-비트칩/71/',
   texture:'MIDDLE', texVal:2, age:[1,2,3,4], size:[1,2,3,4],
   emoji:'🍠', color:'#FCEBEB', cat:'veggie', catLabel:'비건 칩',
   functions:['면역','소화','다이어트']},
  {id:14, name:'노랗게 잘 익은 달콤 단호박칩', weight:'원물 100%', url:'/product/노랗게-잘-익은-달콤-단호박칩/73/',
   texture:'MIDDLE', texVal:2, age:[1,2,3,4], size:[1,2,3,4],
   emoji:'🎃', color:'#FDF3DC', cat:'veggie', catLabel:'비건 칩',
   functions:['시력보호','소화','면역','다이어트']},
  {id:15, name:'자연의 단맛을 담은 청무칩', weight:'원물 100%', url:'/product/자연의-단맛을-담은-청무칩/82/',
   texture:'MIDDLE', texVal:2, age:[1,2,3,4], size:[1,2,3,4],
   emoji:'🌱', color:'#E8F5E1', cat:'veggie', catLabel:'비건 칩',
   functions:['소화','면역','다이어트']},
];
