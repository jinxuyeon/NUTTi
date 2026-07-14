/** 아키테이블_JS 210806 **/
jQuery(document).ready(function() {

	/* 메인상품분류 슬라이드 */
	var highlight_slide = new Swiper('.highlight_slide', {
		slidesPerView: 'auto',
		spaceBetween: 20,
		observer: true,
		observeParents: true,
		speed:700,
		watchOverflow: 'true',
		preloadImages: false,
		lazy : {
			loadPrevNext : true,
		},
		navigation: {
			nextEl: '.swiper-next-highlight_product',
			prevEl: '.swiper-prev-highlight_product',
		},
		pagination: {
			el: '.swiper-pagination-highlight_product',
			clickable: true,
		},
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		breakpoints: {
			768: {
				slidesPerView: 'auto',
				spaceBetween: 10,
			},
		}
	});

	/* 메인 탭상품 슬라이드 */
	var swiper03 = new Swiper('.swiper03', {
		roundLengths: true,
		observer: true,
		observeParents: true,
		slidesPerView: 'auto',
		spaceBetween: 0,
		preloadImages: false,
		lazy : {
			loadPrevNext : true,
		},
		scrollbar: {
			el: '.swiper-scrollbar_swiper03',
			hide: false,
			draggable: true,
		},
		breakpoints: {
			1024: {
				slidesPerView: 'auto',
				spaceBetween: 10,
			},
		}
	});

	/* 메인 탭카테고리 */
	jQuery(".main_product_tab li").bind("click", function() {
		jQuery(this).parent().find('li button').removeClass("active");
		jQuery(this).parents('.main_product_category').find('.content_list .tabcontent').removeClass("active");
		jQuery('button', this).addClass("active");
		var activeTab = jQuery('button', this).attr("data-id");
		jQuery(this).parents('.main_product_category').find('.content_list .tabcontent' + '#' + activeTab).addClass("active");
	});
	jQuery('.main_product_category .main_product_inner .main_product_tab li button, .content_list .tabcontent').removeClass('active'); // 나머지 탭 숨김
	jQuery('.main_product_category .main_product_inner .main_product_tab li:first-child button, .content_list .tabcontent:first-child').addClass('active'); // 첫번째 탭 오픈

	/* 메인 텍스트배너 링크 없을시 영역삭제 */
	jQuery(".main_text_link").each(function(){
		var text_none = jQuery('a', this).text();
		if ( text_none == '' ) {
			jQuery(this).hide();
		}
	});

	EZST.register('image-gallery/2', function () {
		return {
			connect: connect,
			change: change,
		};

		/**
		 * 섹션이 추가되는 경우 / 페이지로딩시 검색되는 섹션도 개념상 추가로 간주
		 * @param  {HTMLElement} section 섹션 최상위 요소
		 * @param  {string} type 타입
		 * @returns void
		 */
		function connect(section, type) {
			_reset(section, type);
		}

		/**
		 * 섹션 설정 변경 하위 추가 또는 삭제등의 변경사항이 생긴 경우
		 * @param  {HTMLElement} section 섹션 최상위 요소
		 * @param  {string} type 타입
		 * @returns void
		 */
		function change(section, type) {
			_reset(section, type);
		}

		/**
		 * 각 섹션 최상위 요소(.section)를 기준으로 기능을 재 초기화 합니다.
		 * @param  {HTMLElement} section 섹션 최상위 요소
		 * @param  {string} type 타입
		 * @returns void
		 */
		function _reset(section, type) {
			// 섹션 초기화 처리
			/* 메인 텍스트갤러리배너 노출설정보다 배너가 적을때 중앙정렬 */
			jQuery(section).find(".main_3dan_banner ul").each(function () {
				var grid_num = parseInt(jQuery(section).find("[data-ez-column]").attr('data-ez-column'), 10);	//설정한 노출개수				
        var li_num = parseInt(jQuery(section).attr('data-ez-item-length'), 10); //등록된 아이템 개수

				if (!document.documentElement.classList.contains('ez-view-type-mobile') && grid_num > li_num) {	// 모바일일때
					jQuery(this).css('justify-content', 'center');
					jQuery('li', this).css('flex', '1');
				} else {
					jQuery(this).css('justify-content', '');
					jQuery('li', this).css('flex', '');
				}

				if (grid_num == '4') { // 설정한 노출 개수가 4개일때
					if (li_num >= grid_num) {	// 등록한 아이템 개수가 노출개수보다 많을때
						jQuery(this).addClass("fs_medium");
					}
				}

				if (grid_num == '5') { // 설정한 노출 개수가 5개일때
					if (li_num >= grid_num) {	// 등록한 아이템 개수가 노출개수보다 많을때
						jQuery(this).addClass("fs_small");
					} else if(li_num == '4') {
						jQuery(this).addClass("fs_medium");
					}
				}

				if (li_num < '4') {	// 배너가 4개 미만이면 더보기 버튼 숨김
					jQuery(this).parent('.main_3dan_banner').find('.main_image_text_gallery_more').hide();
				}
				if (li_num == '1') { // 배너가 1장일때
					jQuery('li a picture img', this).css('width', '100%');
					jQuery('li', this).css('width', '100%');
				}
			});
			/* 메인 텍스트갤러리배너 더보기 */
			jQuery(section).find(".main_image_text_gallery_more_btn").on("click", function (event) {
				jQuery(section).find('ul li').show().animate({ opacity: 1 });
				jQuery(this).parent().hide();
			})
		}
	});
});


/* nutti-cart-widget JS (moved from layout inline) */

(function(){
  window.__nuttiWidgetRan=(window.__nuttiWidgetRan||0)+1;
  var panel=document.getElementById("nuttiCartPanel");
  if(!panel)return;
  function getBtn(){return document.getElementById("nuttiCartBtn");}
  var body=document.getElementById("nuttiCartBody"),foot=document.getElementById("nuttiCartFoot");
  var totalEl=document.getElementById("nuttiCartTotal"),badge=document.getElementById("nuttiCartBadge");
  var loaded=false,frame=null,qtyBusy=false;
  function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];});}
  function render(list){
    if(!list||!list.length){body.innerHTML='<div class="ncp-empty">담긴 상품이 없습니다.</div>';foot.style.display="none";badge.style.display="none";return;}
    var html="",cnt=0;
    list.forEach(function(p,idx){
      cnt+=parseInt(p.quantity,10)||0;
      var img=p.product_image||p.img||"";if(img&&img.indexOf("//")===0)img="https:"+img;
      var price=p.sum_price||p.product_sale_price_str||p.product_price_str||"";
      var opt=p.opt_str||p.option_str||"";
      html+='<div class="ncp-item" data-prdno="'+esc(p.basket_prd_no)+'" data-idx="'+idx+'">'+
        '<img class="ncp-item-thumb" src="'+esc(img)+'" alt="">'+
        '<div class="ncp-item-info">'+
          '<span class="ncp-item-name">'+esc(p.product_name)+'</span>'+
          (opt?'<span class="ncp-item-opt">'+esc(opt)+'</span>':"")+
          '<div class="ncp-item-meta">'+
            '<div class="ncp-qty">'+
              '<button type="button" class="ncp-qty-btn ncp-qty-minus" data-idx="'+idx+'" aria-label="수량 감소">&minus;</button>'+
              '<span class="ncp-qty-num">'+esc(p.quantity)+'</span>'+
              '<button type="button" class="ncp-qty-btn ncp-qty-plus" data-idx="'+idx+'" aria-label="수량 증가">+</button>'+
            '</div>'+
            '<span class="ncp-item-price">'+esc(price)+'</span>'+
          '</div>'+
        '</div>'+
        '<button type="button" class="ncp-item-del" data-prdno="'+esc(p.basket_prd_no)+'">삭제</button>'+
      '</div>';
    });
    body.innerHTML=html;foot.style.display="block";
    badge.textContent=cnt;badge.style.display=cnt>0?"block":"none";
    bindDel();bindQty();
  }
  function bindDel(){
    body.querySelectorAll(".ncp-item-del").forEach(function(b){
      b.addEventListener("click",function(){
        var no=this.getAttribute("data-prdno");
        try{ if(window.Basket&&Basket.deleteBasket){Basket.deleteBasket(no);} }catch(e){}
        var row=this.closest(".ncp-item");if(row)row.parentNode.removeChild(row);
        setTimeout(function(){loaded=false;load();},400);
      });
    });
  }
  function parseTotal(doc){
    var el=doc.querySelector("#totalSettlePrice, .total strong, .ec-base-prdInfo .total");
    return el?el.textContent.trim():"";
  }
  function load(){
    body.innerHTML='<div class="ncp-loading">불러오는 중…</div>';
    if(frame&&frame.parentNode){frame.parentNode.removeChild(frame);}
    frame=document.createElement("iframe");
    frame.style.cssText="position:absolute;width:0;height:0;border:0;left:-9999px;top:-9999px;";
    frame.src="/order/basket.html";
    frame.onload=function(){
      var data=[],total="";
      try{ var w=frame.contentWindow; if(typeof w.aBasketProductData==='undefined'){ try{console.warn('[NUTTI cart/main] aBasketProductData 없음 — Cafe24 변경 또는 빈 장바구니');}catch(_){} } data=w.aBasketProductData||[];
        var d=w.document; var tEl=d.querySelector("#totalSettlePrice, .total strong, strong#total_price, .ec-base-prdInfo .total"); if(tEl)total=tEl.textContent.trim();
      }catch(err){}
      render(data);
      if(total)totalEl.textContent=total;
      loaded=true;
    };
    frame.onerror=function(){ body.innerHTML='<div class="ncp-empty">불러오지 못했습니다.</div>'; };
    document.body.appendChild(frame);
  }
  function bindQty(){
    body.querySelectorAll(".ncp-qty-btn").forEach(function(b){
      b.addEventListener("click",function(){
        if(qtyBusy)return;
        var idx=this.getAttribute("data-idx");
        var isPlus=this.classList.contains("ncp-qty-plus");
        var numEl=this.parentNode.querySelector(".ncp-qty-num");
        var cur=parseInt(numEl.textContent,10)||1;
        if(!isPlus&&cur<=1)return;
        qtyBusy=true; body.style.opacity="0.5";
        try{
          var w=frame&&frame.contentWindow;
          var Bk=w&&w.Basket;
          var qid="quantity_id_"+idx;
          if(Bk){
            if(isPlus){Bk.addQuantityShortcut(qid, idx);} else {Bk.outQuantityShortcut(qid, idx);}
            Bk.modifyQuantity();
          }
        }catch(err){}
        setTimeout(function(){ qtyBusy=false; body.style.opacity=""; loaded=false; load(); },900);
      });
    });
  }
  function bindBtn(){
    var b=getBtn();
    if(!b){ setTimeout(bindBtn,300); return; }
    if(b.getAttribute("data-ncbound")) return;
    b.setAttribute("data-ncbound","1");
    b.addEventListener("click",function(e){
      e.preventDefault();e.stopPropagation();
      var open=panel.classList.toggle("is-open");
      panel.setAttribute("aria-hidden",open?"false":"true");
      if(open&&!loaded)load();
    });
  }
  bindBtn();
  var closeBtn=document.getElementById("nuttiCartClose");
  if(closeBtn)closeBtn.addEventListener("click",function(){panel.classList.remove("is-open");panel.setAttribute("aria-hidden","true");});
  document.addEventListener("click",function(e){if(!panel.classList.contains("is-open"))return;if((e.target.closest&&e.target.closest("#nuttiCartBtn"))||(e.target.closest&&e.target.closest("#nuttiCartPanel")))return;panel.classList.remove("is-open");panel.setAttribute("aria-hidden","true");});
})();


/* nutti-review-arrow: transition none */
(function(){
  var st=document.createElement("style");
  st.textContent=".nr-arrow{transition:none!important;}";
  document.head.appendChild(st);
})();