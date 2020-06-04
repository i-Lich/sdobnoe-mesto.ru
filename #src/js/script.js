// // проверка браузера на поддержку webp
// function testWebP(callback) {
//     var webP = new Image();
//     webP.onload = webP.onerror = function () {
//         callback(webP.height == 2);
//     };
//     webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
// }
// testWebP(function (support) {
//     if (support == true) {
//         document.querySelector('body').classList.add('webp');
//     }
// });
// // end проверка браузера на поддержку webp
//
// //ibg
// function ibg(){
//
//     let ibg=document.querySelectorAll(".lsp-block-item-image-link");
//     console.log(ibg);
//     for (var i = 0; i < ibg.length; i++) {
//         if(ibg[i].querySelector('img')){
//             ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
//         }
//     }
// }
//
// ibg();
// //end ibg

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
    // window.jStoreEvents = window.jStoreEvents ? window.jStoreEvents : [];
    // jStoreEvents.push(['pageChanged', null, function (data) {
    //     $('.show-menu-burger').removeClass('active');
    //     $('.jstore-block-search').removeClass('open');
    //     $('#lsp-block-userinfo').removeClass('open');
    //     $('#lsp-block-cart--drop').removeClass('open');
    // }]);

    $(".show-menu-burger").click(function () {
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
    });

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
    //scroll к контенту при клике на кнопку "оформить заказ" <span class="icon span_depth_level_1"></span>

    window.jStoreEvents = window.jStoreEvents ? window.jStoreEvents : [];
    jStoreEvents.push(['ready', null, function (data) {
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
        const buttonsToOrder = document.querySelectorAll('.lsp-block-cart-order-button-cont a');
        // console.log(buttonsToOrder);
        buttonsToOrder.forEach(function(elem) {
            elem.addEventListener("click", function() {
                // alert('click')
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#lsp-block-content").offset().top
                }, 1000);
            });
        });
    }]);
});


window.jStoreEvents = window.jStoreEvents ? window.jStoreEvents : [];
jStoreEvents.push(['pageChanged', null, function (data) {
    $('.jstore-block-search').removeClass('open');
    $('.show-menu-burger').removeClass('active');
    $('.lsp-block-terminalinfo').removeClass('open');
    $('#lsp-block-userinfo').removeClass('open');
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
}]);


