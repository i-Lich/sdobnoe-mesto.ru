$(function(){
    $(".menu-more").click(function () {
        $('#lsp-block-tree').toggleClass('open');
    });

    $(".recommendation-more").click(function () {
        $('.lsp-js-recommendation-items').toggleClass('open');
    });
    $(".happy-hour-more").click(function () {
        $('.lsp-block-hh-product-title').toggleClass('open');
        $('.lsp-block-hh-product-image').toggleClass('open');
        $('.lsp-block-hh-product-desc').toggleClass('open');
        $('.lsp-block-hh-product-prices').toggleClass('open');
        $('.lsp-block-hh-countdown-title').toggleClass('open');
        $('.lsp-block-hh-countdown-time').toggleClass('open');
        $('.lsp-block-hh-add-to-cart').toggleClass('open');
        $('.lsp-block-hh-inner').toggleClass('open');
    });
    $(".lsp-block-gift-more").click(function () {
        $('.lsp-block-js-gift-items').toggleClass('open');
        $('.lsp-block-gift-accept').toggleClass('open');
    });
    $(".cart-more").click(function () {
        $('#lsp-block-cart .lsp-cart-items-list').toggleClass('open');
        $('#lsp-block-cart .lsp-info-message-bottom').toggleClass('open');
    });
});

$(function() {
/*    $(".show-menu-burger").click(function () {
        $('.jstore-block-search').removeClass('open');
        $('#lsp-block-userinfo').removeClass('open');
        $('#lsp-block-cart--drop').removeClass('open');
        $('.jstore-header-menu').toggleClass('open');
        $('.show-menu-burger').toggleClass('active');
    });

    $(".icon-search").click(function () {
        $('.jstore-header-menu').removeClass('open');
        $('.show-menu-burger').removeClass('active');
        $('#lsp-block-userinfo').removeClass('open');
        $('#lsp-block-cart--drop').removeClass('open');
        $('.jstore-block-search').toggleClass('open');
    });

    $(".icon-signin").click(function () {
        $('.jstore-header-menu').removeClass('open');
        $('.show-menu-burger').removeClass('active');
        $('.jstore-block-search').removeClass('open');
        $('#lsp-block-cart--drop').removeClass('open');
        $('#lsp-block-userinfo').toggleClass('open');
    });*/

    function cartHeight(){
        if(document.getElementById('lsp-block-cart--drop').classList.contains('open')) {

            let clientWindowHeight = document.documentElement.clientHeight;
            let cartBlockTopPosition = document.getElementById('lsp-block-cart--drop').getBoundingClientRect().top;
            let contentHeight = document.querySelector('body').offsetHeight - cartBlockTopPosition;
            let cartBlockHeight = document.getElementById('lsp-block-cart--drop').offsetHeight + cartBlockTopPosition;
            let maxCartBlockHeight = 0;
            if (contentHeight > clientWindowHeight) {
                maxCartBlockHeight =  clientWindowHeight - cartBlockTopPosition -15 ;
            } else{
                maxCartBlockHeight =  contentHeight -15;
            }
            document.getElementById('lsp-block-cart--drop').style.maxHeight = maxCartBlockHeight + 'px';
        }
    }


    $(".login").click(function () {
        $('.jstore-block-search').removeClass('open--search');
        $('#lsp-block-userinfo').removeClass('open');
        $('#lsp-block-cart--drop').removeClass('open');
        $('#jstore-block-search--popup').removeClass('open');
        $('#lsp-block-userinfo--popup').toggleClass('open');
    });
    $(".search-open--popup").click(function () {
        $('#lsp-block-userinfo').removeClass('open');
        $('#lsp-block-cart--drop').removeClass('open');
        $('#lsp-block-userinfo--popup').removeClass('open');
        $('#jstore-block-search--popup').toggleClass('open--search');
    });

    $(".lsp-block-cart-open--drop").click(function () {
        $('.jstore-block-search').removeClass('open');
        $('#jstore-block-search--popup').removeClass('open--search');
        $('#lsp-block-userinfo').removeClass('open');
        $('#lsp-block-cart--drop').toggleClass('open');
        cartHeight();
    });

    window.onresize = function resizeCartBlock() {
        if (document.getElementById('lsp-block-cart--drop').classList.contains('open')) {
            cartHeight();
        }
    };


    window.jStoreEvents = window.jStoreEvents ? window.jStoreEvents : [];
    jStoreEvents.push(['ready', null, function (data) {

        //маргины доп блоков
        // console.log($('.lsp-block-gift-wrapper').height());
        if( $('.lsp-block-gift-wrapper').height() === 0 ) {
            $('.lsp-block-gift-wrapper').css('margin', '0');
        }
        if( $('.lsp-block-happy-hour-wrapper').height() === 0 ) {
            $('.lsp-block-happy-hour-wrapper').css('margin', '0');
        }
        if( $('.lsp-block-recommendation-wrapper').height() === 0 ) {
            $('.lsp-block-recommendation-wrapper').css('margin', '0');
        }

        //меню-tree
        $('.lsp-block-menu-tree>li:has(ul)').append("<span class=\"icon span_depth_level_1\"></span>");
        $('.lsp-block-menu-tree>li ul li:has(ul)').append("<span class=\"icon span_depth_level_2\"></span>");
        $(".span_depth_level_1").click(function () {
            if ($(this).closest('li').find('a').eq(0).hasClass('child-selected')){
                $(this).closest('li').find('a').eq(0).toggleClass('child-selected');
            } else{
                $(this).closest('li').find('a').eq(0).toggleClass('selected');
            }
        });
        $(".span_depth_level_2").click(function () {
            $(this).closest('li').find('a').eq(0).toggleClass('child-selected');
        });
        //scroll к контенту при клике на авторизацию-вход на мобилках
        const buttonsSignInUp = document.querySelectorAll('.lsp-block-userinfo .lsp-block-userinfo-inner a');
        buttonsSignInUp.forEach(function(elem) {
            elem.addEventListener("click", function() {
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#lsp-block-content").offset().top - 120
                }, 500);
            });
        });
        //end scroll к контенту при клике на авторизацию-вход
        //scroll к контенту при клике на кнопку "оформить заказ"
        const buttonsToOrder = document.querySelectorAll('.lsp-block-cart-order-button-cont a');
        console.log(buttonsToOrder);
        buttonsToOrder.forEach(function(elem) {
            elem.addEventListener("click", function() {
                $('#lsp-block-cart--drop').removeClass('open');
                $('.lsp-cart-items-list').removeClass('open');
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#lsp-block-content").offset().top - 120
                }, 500);
            });
        });
        //scroll к контенту при кнопке поиска
        const buttonsToSearch = document.querySelectorAll('.lsp-block-search-order-button-cont > input');
        buttonsToSearch.forEach(function(elem) {
            elem.addEventListener("click", function() {
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#lsp-block-content").offset().top - 120
                }, 500);
                $('#jstore-block-search--popup').removeClass('open--search');
            });
        });
    }]);
});

window.jStoreEvents = window.jStoreEvents ? window.jStoreEvents : [];
jStoreEvents.push(['pageChanged', null, function (data) {
    $('.jstore-block-search').removeClass('open');
    $('.show-menu-burger').removeClass('active');
    $('.lsp-block-terminalinfo').removeClass('open');
    $('#lsp-block-userinfo--popup').removeClass('open');
    $('#lsp-block-tree--header').removeClass('open');
    $('#lsp-block-cart--drop').removeClass('open');
    $('.lsp-cart-items-list').removeClass('open');
    $('.lsp-info-message-bottom').removeClass('open');
    $('#lsp-block-gift').removeClass('open');
    $('#lsp-block-happy-hour').removeClass('open');
    $('#lsp-block-recommendation').removeClass('open');
    //имитировать клик по бургеру, если он был открыт и изменилась страница
    if ($('.mobile_menu_list_wrapper').hasClass('mobile_menu_list_wrapper--opened')){
        $(".mobile_menu").click();
    }
    //скролл к контенту при смене категории на мобилках:
    if ((arguments[0].newPage === 'category') && (document.body.clientWidth < 769)){
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#lsp-block-content").offset().top - 120
        }, 500);
    }

    // //scroll к контенту при клике на кнопку "оформить заказ"
    // const buttonsToOrder = document.querySelectorAll('.lsp-block-cart-order-button-cont a');
    // buttonsToOrder.forEach(function(elem) {
    //     elem.addEventListener("click", function() {
    //         $([document.documentElement, document.body]).animate({
    //             scrollTop: $("#lsp-block-content").offset().top
    //         }, 500);
    //     });
    // });

    console.log('arguments');
    console.log(arguments);
}]);


