$(function () {
    $(window).on("load resize", function () {
        $(".fill-screen").css("height", window.innerHeight);
    });

    // add bootstrap's scrollspy
    $('body').scrollspy({
        target: '.navbar',
        offset: 160
    });

    // smooth scrolling
    $('nav a, .down-button a').bind('click', function () {
        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top -60
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
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