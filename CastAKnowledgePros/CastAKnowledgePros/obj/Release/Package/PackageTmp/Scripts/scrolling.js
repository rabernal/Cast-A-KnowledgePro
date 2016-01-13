$(function () {
    //$(window).on("load resize", function () {
    //    $(".fill-screen").css("height", window.innerHeight);
    //});

    // add bootstrap's scrollspy
    $('body').scrollspy({
        target: '.navbar',
        offset: 160
    });

    // smooth scrolling
    //$('nav a, .down-button a').bind('click', function () {
    //    event.preventDefault();
    //    $('html, body').stop().animate({
    //        scrollTop: $($(this).attr('href')).offset().top - 70
    //    }, 1400, 'easeOutSine');
        
    //});

        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top -70
                    }, 1400);
                    event.preventDefault();
                    return true;
                }
            }
        });
  

    // parallax scrolling with stellar.js

    $(window).stellar();

    // initialize WOW for element animation
    new WOW().init();

    // initialize NanoGallery

    $(document).ready(function () {
        $("#nanoGallery3").nanoGallery({
            thumbnailHoverEffect: 'slideUp,borderLighter',
            
        });

    });

    //$(document).ready(function () {
    //    $("iframe").scroll(function () {
            
    //    });
    //});






});// this is the end 