$(document).ready(function () {
    var methods = {
        aCategory: [],
        aSubCategory: {},

        get: function () {
            $.ajax({
                url: '/exec/front/Product/SubCategory',
                dataType: 'json',
                success: function (aData) {
                    if (!aData) return;
                    aData.forEach(item => {
                        const parent = item.parent_cate_no;
                        if (!methods.aSubCategory[parent]) {
                            methods.aSubCategory[parent] = [];
                        }
                        methods.aSubCategory[parent].push(item);
                    });
                }
            });
        },

        getParam: function (sUrl, sKey) {
            const sQueryString = sUrl.split('?')[1];
            if (!sQueryString) return;
            const aFields = sQueryString.split("&");
            const aParam = {};
            aFields.forEach(field => {
                const [key, val] = field.split('=');
                aParam[key] = val;
            });
            return sKey ? aParam[sKey] : aParam;
        },

        getParamSeo: function (sUrl) {
            const aUrl = EC_ROUTE.getCleanUrl(sUrl).split('/');
            return aUrl[3] || null;
        },

        show: function (overNode, iCateNo) {
            if (methods.aSubCategory[iCateNo] === undefined) return;

            const aHtml = ['<ul class="sub-category sub_cate01">'];
            const myList = localStorage.getItem("myCateList");

            methods.aSubCategory[iCateNo].forEach(item => {
                const nextNo = item.cate_no;
                const hasChild = methods.aSubCategory[nextNo] !== undefined;
                aHtml.push(`<li${hasChild ? '' : ' class="noChild"'} id="cate${item.cate_no}">`);
                aHtml.push(`<span class="view"><a href="/product/list.html${item.param}" cate="${item.param}" data-i18n="LIST.PRD_CATE_NO_${item.cate_no}" data-i18n-new>${item.name}</a>`);
                    
                if (hasChild) {
                    aHtml.push('<span class="more"></span>');
                }
            
                aHtml.push('</span>');

                if (hasChild) {
                    aHtml.push('<ul class="sub-category-middle sub_cate02">');
                    methods.aSubCategory[nextNo].forEach(sub => {
                        const subChild = methods.aSubCategory[sub.cate_no] !== undefined;
                        aHtml.push(`<li${subChild ? '' : ' class="noChild"'} id="cate${sub.cate_no}">`);
                        aHtml.push(`<span class="view"><a href="/product/list.html${sub.param}" cate="${sub.param}" data-i18n="LIST.PRD_CATE_NO_${sub.cate_no}" data-i18n-new>${sub.name}</a>`);

                        if (subChild) {
                            aHtml.push('<span class="more"></span>');
                        }
                    
                        aHtml.push('</span>');

                        if (subChild) {
                            aHtml.push('<ul class="sub-category-child sub_cate03">');
                            methods.aSubCategory[sub.cate_no].forEach(deep => {
                                aHtml.push(`<li class="noChild" id="cate${deep.cate_no}">`);
                                aHtml.push(`<a href="/product/list.html${deep.param}" cate="${deep.param}" data-i18n="LIST.PRD_CATE_NO_${deep.cate_no}" data-i18n-new>${deep.name}</a>`);
                                aHtml.push('</li>');
                            });
                            aHtml.push('</ul>');
                        }

                        aHtml.push('</li>');
                    });
                    aHtml.push('</ul>');
                }

                aHtml.push('</li>');
            });
            aHtml.push('</ul>');

            if($(overNode).find('.sub_cate01').length <= 0){
                $(overNode).append(aHtml.join(''));
            }

            if (window.i18nextCafe24) {
                i18nextCafe24.translate('data-i18n-new');
            }
        },

        /* close: function () {
            $('.sub-category').remove();
        } */
    };

    methods.get();

    setTimeout(() => {
        $('#header .xans-layout-category > ul > li').each(function(){
            const $href = $(this).find('a').attr('href')
            const iCateNo = Number(methods.getParam($href, 'cate_no')) || Number(methods.getParamSeo($href));

            if(methods.aSubCategory[iCateNo]){
                methods.show($(this), iCateNo);
                $(this).find('.more').show();
            }
        });
    }, 300);

    $(document).on('click', '#header .xans-layout-category > ul > li > .view > .more', function (e) {
        e.preventDefault();
        const $li = $(this).closest('li');
        
        if ($li.hasClass('active')) {
            $li.removeClass('active on');
            $li.find('.sub-category').hide();
        } else {
            // 다른 형제 카테고리 모두 닫기
            $li.siblings().removeClass('active on');
            $li.siblings().find('.sub-category').hide();

            // 현재 클릭한 카테고리 열기
            $li.addClass('active on');
            const $href = $(this).siblings('a').attr('href');
            const iCateNo = Number(methods.getParam($href, 'cate_no')) || Number(methods.getParamSeo($href));

            if (methods.aSubCategory[iCateNo]) {
                methods.show($li, iCateNo); 
            }
            $li.find('.sub-category').show();
        }
    });

    $(document).on('click', '.top_category .sub_cate01 .view .more', function (e) {
        e.preventDefault();
        const $a = $(this).siblings('a');
        const $li = $a.closest('li');
        const $sub = $li.children('ul.sub-category, ul.sub_cate02, ul.sub_cate03');

        if ($sub.length) {
            const $siblings = $li.siblings('li');

            // 형제들 닫기
            $siblings.removeClass('active on');
            $siblings.children('ul.sub_cate02, ul.sub_cate03').css('display', 'none');

            if ($li.hasClass('active')) {
                $li.removeClass('active on');
                $sub.css('display', 'none');
            } else {
                $li.addClass('active on');
                $sub.css('display', 'flex');
            }
        }
    });
});