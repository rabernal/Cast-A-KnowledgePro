/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

(function (window) {

    'use strict';

    // class helper functions from bonzo https://github.com/ded/bonzo

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    // classList support for class management
    // altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function (elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function (elem, c) {
            elem.classList.add(c);
        };
        removeClass = function (elem, c) {
            elem.classList.remove(c);
        };
    }
    else {
        hasClass = function (elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function (elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function (elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

    // transport
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(classie);
    } else {
        // browser global
        window.classie = classie;
    }

})(window);

/*! WOW - v1.0.2 - 2014-10-28
* Copyright (c) 2014 Matthieu Aussaguel; Licensed MIT */(function(){var a,b,c,d,e,f=function(a,b){return function(){return a.apply(b,arguments)}},g=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b=function(){function a(){}return a.prototype.extend=function(a,b){var c,d;for(c in b)d=b[c],null==a[c]&&(a[c]=d);return a},a.prototype.isMobile=function(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)},a.prototype.addEvent=function(a,b,c){return null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c},a.prototype.removeEvent=function(a,b,c){return null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]},a.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},a}(),c=this.WeakMap||this.MozWeakMap||(c=function(){function a(){this.keys=[],this.values=[]}return a.prototype.get=function(a){var b,c,d,e,f;for(f=this.keys,b=d=0,e=f.length;e>d;b=++d)if(c=f[b],c===a)return this.values[b]},a.prototype.set=function(a,b){var c,d,e,f,g;for(g=this.keys,c=e=0,f=g.length;f>e;c=++e)if(d=g[c],d===a)return void(this.values[c]=b);return this.keys.push(a),this.values.push(b)},a}()),a=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(a=function(){function a(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return a.notSupported=!0,a.prototype.observe=function(){},a}()),d=this.getComputedStyle||function(a){return this.getPropertyValue=function(b){var c;return"float"===b&&(b="styleFloat"),e.test(b)&&b.replace(e,function(a,b){return b.toUpperCase()}),(null!=(c=a.currentStyle)?c[b]:void 0)||null},this},e=/(\-([a-z]){1})/g,this.WOW=function(){function e(a){null==a&&(a={}),this.scrollCallback=f(this.scrollCallback,this),this.scrollHandler=f(this.scrollHandler,this),this.start=f(this.start,this),this.scrolled=!0,this.config=this.util().extend(a,this.defaults),this.animationNameCache=new c}return e.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0},e.prototype.init=function(){var a;return this.element=window.document.documentElement,"interactive"===(a=document.readyState)||"complete"===a?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},e.prototype.start=function(){var b,c,d,e;if(this.stopped=!1,this.boxes=function(){var a,c,d,e;for(d=this.element.querySelectorAll("."+this.config.boxClass),e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.all=function(){var a,c,d,e;for(d=this.boxes,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else for(e=this.boxes,c=0,d=e.length;d>c;c++)b=e[c],this.applyStyle(b,!0);return this.disabled()||(this.util().addEvent(window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live?new a(function(a){return function(b){var c,d,e,f,g;for(g=[],e=0,f=b.length;f>e;e++)d=b[e],g.push(function(){var a,b,e,f;for(e=d.addedNodes||[],f=[],a=0,b=e.length;b>a;a++)c=e[a],f.push(this.doSync(c));return f}.call(a));return g}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},e.prototype.stop=function(){return this.stopped=!0,this.util().removeEvent(window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval?clearInterval(this.interval):void 0},e.prototype.sync=function(){return a.notSupported?this.doSync(this.element):void 0},e.prototype.doSync=function(a){var b,c,d,e,f;if(null==a&&(a=this.element),1===a.nodeType){for(a=a.parentNode||a,e=a.querySelectorAll("."+this.config.boxClass),f=[],c=0,d=e.length;d>c;c++)b=e[c],g.call(this.all,b)<0?(this.boxes.push(b),this.all.push(b),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(b,!0),f.push(this.scrolled=!0)):f.push(void 0);return f}},e.prototype.show=function(a){return this.applyStyle(a),a.className=""+a.className+" "+this.config.animateClass},e.prototype.applyStyle=function(a,b){var c,d,e;return d=a.getAttribute("data-wow-duration"),c=a.getAttribute("data-wow-delay"),e=a.getAttribute("data-wow-iteration"),this.animate(function(f){return function(){return f.customStyle(a,b,d,c,e)}}(this))},e.prototype.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),e.prototype.resetStyle=function(){var a,b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.style.visibility="visible");return e},e.prototype.customStyle=function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a},e.prototype.vendors=["moz","webkit"],e.prototype.vendorSet=function(a,b){var c,d,e,f;f=[];for(c in b)d=b[c],a[""+c]=d,f.push(function(){var b,f,g,h;for(g=this.vendors,h=[],b=0,f=g.length;f>b;b++)e=g[b],h.push(a[""+e+c.charAt(0).toUpperCase()+c.substr(1)]=d);return h}.call(this));return f},e.prototype.vendorCSS=function(a,b){var c,e,f,g,h,i;for(e=d(a),c=e.getPropertyCSSValue(b),i=this.vendors,g=0,h=i.length;h>g;g++)f=i[g],c=c||e.getPropertyCSSValue("-"+f+"-"+b);return c},e.prototype.animationName=function(a){var b;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=d(a).getPropertyValue("animation-name")}return"none"===b?"":b},e.prototype.cacheAnimationName=function(a){return this.animationNameCache.set(a,this.animationName(a))},e.prototype.cachedAnimationName=function(a){return this.animationNameCache.get(a)},e.prototype.scrollHandler=function(){return this.scrolled=!0},e.prototype.scrollCallback=function(){var a;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],a&&(this.isVisible(a)?this.show(a):e.push(a));return e}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},e.prototype.offsetTop=function(a){for(var b;void 0===a.offsetTop;)a=a.parentNode;for(b=a.offsetTop;a=a.offsetParent;)b+=a.offsetTop;return b},e.prototype.isVisible=function(a){var b,c,d,e,f;return c=a.getAttribute("data-wow-offset")||this.config.offset,f=window.pageYOffset,e=f+Math.min(this.element.clientHeight,this.util().innerHeight())-c,d=this.offsetTop(a),b=d+a.clientHeight,e>=d&&b>=f},e.prototype.util=function(){return null!=this._util?this._util:this._util=new b},e.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},e}()}).call(this);
/*
 nanoGALLERY v5.2.3
 Plugin for jQuery by Christophe Brisbois
 Demo: http://nanogallery.brisbois.fr
 Sources: https://github.com/Kris-B/nanoGALLERY 

 License: For personal, non-profit organizations, or open source projects (without any kind of fee), you may use nanoGALLERY for jQuery for free.
 -------- ALL OTHER USES REQUIRE THE PURCHASE OF A PROFESSIONAL LICENSE.


 Components:
  - jQuery (http://www.jquery.com) - version >= 1.7.1
  - jQuery Color plugin - is embedded
  - imagesloaded (https://github.com/desandro/imagesloaded) - is embebed
  - screenfull.js (https://github.com/sindresorhus/screenfull.js) - is embeded
  - webfont generated by http://fontello.com - based on Font Awesome Copyright (C) 2012 by Dave Gandy (http://fortawesome.github.com/Font-Awesome/)
  - http://closure-compiler.appspot.com/home - minifying javascript
  - http://gpbmike.github.io/refresh-sf/ - minifying css
*/
(function(s){var J=null;jQuery.fn.nanoGallery=function(D){var A=s.extend(!0,{userID:"",kind:"",album:"",photoset:"",blackList:"scrapbook|profil",whiteList:"",albumList:"",RTL:!1,picasaUseUrlCrossDomain:!0,galleryToolbarWidthAligned:!0,galleryToolbarHideIcons:!1,galleryFullpageButton:!1,galleryFullpageBgColor:"#111",galleryRenderStep:10,breadcrumbAutoHideTopLevel:!1,displayBreadcrumb:!1,theme:"default",colorScheme:"none",colorSchemeViewer:"default",items:null,itemsBaseURL:"",paginationMaxLinesPerPage:0,
maxWidth:0,viewer:"internal",fancyBoxOptions:null,viewerDisplayLogo:!1,imageTransition:"slide",viewerToolbar:{display:!0,position:"bottom",style:"innerImage",autoMinimize:800,standard:"minimizeButton , previousButton, pageCounter ,nextButton,playPauseButton,fullscreenButton,infoButton,linkOriginalButton,closeButton,label",minimized:"minimizeButton,label"},thumbnailAlignment:"center",thumbnailWidth:230,thumbnailHeight:154,thumbnailGutterWidth:2,thumbnailGutterHeight:2,thumbnailAdjustLastRowHeight:!0,
thumbnailFeatured:!1,thumbnailHoverEffect:null,thumbnailLabel:{position:"overImageOnBottom",display:!0,displayDescription:!0,titleMaxLength:0,descriptionMaxLength:0,hideIcons:!1,title:"",itemsCount:""},thumbnailDisplayInterval:30,thumbnailDisplayTransition:!0,thumbnailLazyLoad:!1,thumbnailLazyLoadTreshold:100,thumbnailGlobalImageTitle:"",thumbnailGlobalAlbumTitle:"",thumbnailSizeSM:480,thumbnailSizeME:992,thumbnailSizeLA:1200,thumbnailSizeXL:1800,fnThumbnailInit:null,fnThumbnailHoverInit:null,fnThumbnailHoverResize:null,
fnThumbnailHover:null,fnThumbnailHoverOut:null,fnThumbnailDisplayEffect:null,fnViewerInfo:null,fnImgToolbarCustInit:null,fnImgToolbarCustDisplay:null,fnImgToolbarCustClick:null,fnProcessData:null,touchAnimation:!0,touchAutoOpenDelay:0,useTags:!1,preset:"none",locationHash:!1,slideshowDelay:3E3,slideshowAutoStart:!1,photoSorting:"",albumSorting:"",dataSorting:"",lazyBuild:"none",lazyBuildTreshold:150,flickrSkipOriginal:!0,i18n:{breadcrumbHome:"Galleries",breadcrumbHome_FR:"Galeries",paginationPrevious:"Previous",
paginationPrevious_FR:"Pr&eacute;c&eacute;dent",paginationPrevious_DE:"Zur&uuml;ck",paginationPrevious_IT:"Indietro",paginationNext:"Next",paginationNext_FR:"Suivant",paginationNext_DE:"Weiter",paginationNext_IT:"Avanti",thumbnailLabelItemsCountPart1:"",thumbnailLabelItemsCountPart2:"",thumbnailImageTitle:"",thumbnailAlbumTitle:"",thumbnailImageDescription:"",thumbnailAlbumDescription:"",infoBoxPhoto:"Photo",infoBoxDate:"Date",infoBoxAlbum:"Album",infoBoxDimensions:"Dimensions",infoBoxFilename:"Filename",
infoBoxFileSize:"File size",infoBoxCamera:"Camera",infoBoxFocalLength:"Focal length",infoBoxExposure:"Exposure",infoBoxFNumber:"F Number",infoBoxISO:"ISO",infoBoxMake:"Make",infoBoxFlash:"Flash",infoBoxViews:"Views",infoBoxComments:"Comments"}},D);return this.each(function(){J=new nanoGALLERY;J.Initiate(this,A)})};jQuery.fn.nanoGallery.TEST=function(){console.dir(J)}})(jQuery);
function nanoGALLERY(){function s(){return{animationEngine:F,t:"test"}}function J(){var b;b='Your browser version is not supported anymore. The image gallery cannot be displayed. <br><br>Please update to a more recent one. Download:<br>&nbsp;&nbsp;&nbsp; <a href="http://www.google.com/chrome/?hl=en-US)">Chrome</a><br>&nbsp;&nbsp;&nbsp; <a href="http://www.mozilla.com/firefox/)">Firefox</a><br>';b+='&nbsp;&nbsp;&nbsp; <a href="http://www.microsoft.com/windows/internet-explorer/default.aspx">Internet Explorer</a><br>';
b+='&nbsp;&nbsp;&nbsp; <a href="http://www.apple.com/safari/download/">Safari</a>';R(b,!1)}function D(b){for(var c=document.createElement("div"),a=0;a<b.length;++a)if("undefined"!=typeof c.style[b[a]])return b[a];return null}function A(){var b=Math.max(window.screen.width,window.screen.height);void 0!=window.devicePixelRatio&&1<window.devicePixelRatio&&(b*=window.devicePixelRatio);for(var c=0;c<C.length;c++)switch(C[c].name){case "imageScale150":case "imageScale150Outside":case "imageScaleIn80":case "imageSlide2Up":case "imageSlide2Down":case "imageSlide2Left":case "imageSlide2Right":case "imageSlide2UpRight":case "imageSlide2UpLeft":case "imageSlide2DownRight":case "imageSlide2DownLeft":case "imageSlide2Random":h.scale=
Math.max(h.scale,1.5);break;case "scale120":h.scale=Math.max(h.scale,1.2)}0<f.itemsBaseURL.length&&(f.itemsBaseURL+="/");switch(f.kind){case "":W(O.breadcrumbHome,"","","","","album","","0","-1");void 0!==f.items&&null!==f.items?(Ub(),r(!1)||X(0,!1)):(b=jQuery(e.base).children("a"),0<b.length?(Vb(b),r(!1)||X(0,!1)):R("error: no image to process."));break;case "flickr":f.flickrSkipOriginal||(Q.photoAvailableSizes.push(1E4),Q.photoAvailableSizesStr.push("o"));for(i=0;i<Q.photoAvailableSizes.length&&
!(Q.photoSize=i,b<=Q.photoAvailableSizes[i]);i++);W(O.breadcrumbHome,"","","","","album","",0<f.photoset.length?f.photoset:"0","-1");sb(0,!0,-1,!1);break;case "json":W(O.breadcrumbHome,"","","","","album","","0","-1");tb(0,!0,-1,!1);break;default:0<f.album.length?(c=f.album.indexOf("&authkey="),0<=c?(b=f.album.substring(0,c),c=f.album.substring(c),-1==c.indexOf("Gv1sRg")&&(c="&authkey=Gv1sRg"+c.substring(9)),W(O.breadcrumbHome,"","","","","album","",b,"-1").customData.authkey=c):W(O.breadcrumbHome,
"","","","","album","",f.album,"-1")):W(O.breadcrumbHome,"","","","","album","","0","-1"),ub(0,!0,-1,!1)}jQuery(document).keyup(function(a){if(S)switch(a.keyCode){case 27:Da(!0);break;case 32:case 13:bb();break;case 38:case 39:case 33:Ea();break;case 40:case 37:case 34:Fa()}});jQuery(window).bind("hashchange",function(a){f.locationHash&&r(!0)});f.galleryFullpageButton&&(e.conNavBFullpage=f.RTL?jQuery('<div class="nanoGalleryFullpage setFullPageButton"></div>').prependTo(e.conNavB):jQuery('<div class="nanoGalleryFullpage setFullPageButton"></div>').appendTo(e.conNavB),
e.conNavBFullpage.on("click",function(a){e.conNavBFullpage.hasClass("setFullPageButton")?S||(0<f.maxWidth&&jQuery(e.base).css({maxWidth:""}),e.conNavBFullpage.removeClass("setFullPageButton").addClass("removeFullPageButton"),L("",e.base),e.base.addClass("fullpage"),jQuery("body").css({overflow:"hidden"}),Ga()):S||(e.conNavBFullpage.removeClass("removeFullPageButton").addClass("setFullPageButton"),0<f.maxWidth&&jQuery(e.base).css({maxWidth:f.maxWidth}),e.base.removeClass("fullpage"),U(),Ga())}))}function U(){jQuery("body").css({overflow:"visible"})}
function I(b){function c(a){void 0!=a&&(null!=Y&&Ha(Y),Y=null,void 0!==p[a].destinationURL&&0<p[a].destinationURL.length?window.location=p[a].destinationURL:(oa=!1,"album"==p[a].kind?sa(a,!1,-1,!0):ta(a,!1)))}function a(){ua=0;h=Z=null;jQuery(e.conTn[0]).css({left:0});if(S)Y=null,oa=!1;else if(null!=Y)if(10<Math.abs(aa.t-M().t))Ha(Y),Y=null,oa=!1;else{var a=Y,b=a.data("index");void 0!=b&&(f.touchAnimation&&!oa?0<f.touchAutoOpenDelay?(Ia(),cb(a),window.clearInterval(db),db=window.setInterval(function(){window.clearInterval(db);
10<Math.abs(aa.t-M().t)?(oa=!1,Y=null,Ha(a)):c(b)},f.touchAutoOpenDelay)):p[b].hovered?c(b):(Ia(),cb(a)):c(b))}else oa=!1}function d(a){var b={};a.targetTouches?(b.x=a.targetTouches[0].clientX,b.y=a.targetTouches[0].clientY):(b.x=a.clientX,b.y=a.clientY);return b}function m(){if(E){if(0<T&&"auto"!=w()&&"auto"!=l()){var a=ua-(Z.x-h.x);jQuery(u).css({left:a})}E=!1}}var u=b,E=!1,Z=null,h=null,ua=0,g=!1,aa=0;this.handleGestureStartNoDelay=function(a){if(S)return a.stopPropagation(),a.eventDefault(),!1;
400>(new Date).getTime()-eb||(oa=!0,this.handleGestureStart(a))}.bind(this);this.handleGestureStart=function(a){if(S)return a.stopPropagation(),a.eventDefault(),!1;if(!(400>(new Date).getTime()-ga||400>(new Date).getTime()-eb)){eb=(new Date).getTime();for(var b=a.target||a.srcElement,c=!1;b!=e.conTn[0];)"nanoGalleryThumbnailContainer"==b.getAttribute("class")&&(null==Y||Y.is(jQuery(b))||Ia(),Y=jQuery(b),c=!0),b=b.parentNode;c&&(aa=M(),Z=d(a),initialOffsetTop=M().t,window.navigator.msPointerEnabled?
(document.addEventListener("MSPointerMove",this.handleGestureMove,!0),document.addEventListener("MSPointerUp",this.handleGestureEnd,!0)):(document.addEventListener("touchmove",this.handleGestureMove,!0),document.addEventListener("touchend",this.handleGestureEnd,!0),document.addEventListener("touchcancel",this.handleGestureEnd,!0),document.addEventListener("mousemove",this.handleGestureMove,!0),document.addEventListener("mouseup",this.handleGestureEnd,!0)),e.base.addClass("unselectable").find("*").attr("draggable",
"false").attr("unselectable","on"))}}.bind(this);this.handleGestureMove=function(a){h=d(a);!E&&0<T&&"auto"!=w()&&"auto"!=l()&&(15<Math.abs(Z.x-h.x)||g)&&(a.preventDefault(),E=g=!0,window.requestAnimationFrame(m))}.bind(this);this.handleGestureEnd=function(b){b.cancelable&&b.preventDefault();b.stopPropagation();g=E=!1;window.navigator.msPointerEnabled?(document.removeEventListener("MSPointerMove",this.handleGestureMove,!0),document.removeEventListener("MSPointerUp",this.handleGestureEnd,!0)):(document.removeEventListener("touchmove",
this.handleGestureMove,!0),document.removeEventListener("touchend",this.handleGestureEnd,!0),document.removeEventListener("touchcancel",this.handleGestureEnd,!0),document.removeEventListener("mousemove",this.handleGestureMove,!0),document.removeEventListener("mouseup",this.handleGestureEnd,!0));e.base.addClass("unselectable").find("*").attr("draggable","true").attr("unselectable","off");null==h||null==Z?a():(b=Z.x-h.x,ua-=b,0<T&&"auto"!=w()&&"auto"!=l()?30<Math.abs(b)?(Y=null,ua=0,h=Z=null,Ia(),-30>
b?vb():wb()):a():a());h=Z=null;ua=0;g=!1}.bind(this);window.navigator.msPointerEnabled?u.addEventListener("MSPointerDown",this.handleGestureStartNoDelay,!0):(u.addEventListener("touchstart",this.handleGestureStart,!0),Wb||u.addEventListener("mousedown",this.handleGestureStartNoDelay,!0));u.addEventListener("mouseenter",function(a){S||(a=a.target||a.srcElement,"nanoGalleryThumbnailContainer"==a.getAttribute("class")&&cb(jQuery(a)))},!0);u.addEventListener("mouseleave",function(a){a=a.target||a.srcElement;
"nanoGalleryThumbnailContainer"==a.getAttribute("class")&&Ha(jQuery(a))},!0)}function q(){"fancybox"==f.viewer&&"undefined"===typeof jQuery.fancybox&&(f.viewer="internal",ma("Fancybox could not be found. Fallback to internal viewer. Please check the file includes of the page."));if("CBRISBOIS@GMAIL.COM"==f.userID.toUpperCase()||"111186676244625461692"==f.userID)if(""==f.blackList||"SCRAPBOOK|PROFIL"==f.blackList.toUpperCase())f.blackList="profil|scrapbook|forhomepage";""!=f.blackList&&(Ma=f.blackList.toUpperCase().split("|"));
""!=f.whiteList&&(Na=f.whiteList.toUpperCase().split("|"));""!=f.albumList&&(Ja=f.albumList.toUpperCase().split("|"));if("picasa"==f.kind||"flickr"==f.kind)f.displayBreadcrumb=!0;void 0!==f.photoset?0<f.photoset.length&&(f.displayBreadcrumb=!1):f.photoset="";void 0!==f.album?0<f.album.length&&(f.displayBreadcrumb=!1):f.album="";0<f.maxWidth&&(jQuery(e.base).css({maxWidth:f.maxWidth}),jQuery(e.base).css({"margin-left":"auto"}),jQuery(e.base).css({"margin-right":"auto"}));"number"==V(f.slideshowDelay)&&
2E3<=f.slideshowDelay?Oa=f.slideshowDelay:ma('Parameter "slideshowDelay" must be an integer >= 2000 ms.');"number"==V(f.thumbnailDisplayInterval)&&0<=f.thumbnailDisplayInterval?h.displayInterval=f.thumbnailDisplayInterval:ma('Parameter "thumbnailDisplayInterval" must be an integer.');"number"==V(f.thumbnailLazyLoadTreshold)&&0<=f.thumbnailLazyLoadTreshold?h.lazyLoadTreshold=f.thumbnailLazyLoadTreshold:ma('Parameter "thumbnailLazyLoadTreshold" must be an integer.');"number"==V(f.paginationMaxLinesPerPage)&&
0<=f.paginationMaxLinesPerPage?T=f.paginationMaxLinesPerPage:ma('Parameter "paginationMaxLinesPerPage" must be an integer.');var b=f.albumSorting.toUpperCase();0==b.indexOf("RANDOM")&&6<b.length&&(n=parseInt(b.substring(6)),0<n&&(Pa=n),f.albumSorting="random");b=f.photoSorting.toUpperCase();0==b.indexOf("RANDOM")&&6<b.length&&(n=parseInt(b.substring(6)),0<n&&(fb=n),f.photoSorting="random");switch(V(f.thumbnailHoverEffect)){case "string":for(var c=f.thumbnailHoverEffect.split(","),b=0;b<c.length;b++)if("none"!=
c[b]&&g(c[b])){var a=v();a.name=c[b];C.push(a)}break;case "object":"none"!=f.thumbnailHoverEffect.name&&g(f.thumbnailHoverEffect.name)&&(a=v(),C.push(jQuery.extend(a,f.thumbnailHoverEffect)));break;case "array":for(b=0;b<f.thumbnailHoverEffect.length;b++)"none"!=f.thumbnailHoverEffect[b].name&&g(f.thumbnailHoverEffect[b].name)&&(a=v(),C.push(jQuery.extend(a,f.thumbnailHoverEffect[b])));break;case "null":break;default:R('incorrect parameter for "thumbnailHoverEffect".')}0==C.length&&(f.touchAnimation=
!1);ha=ca();if("number"==V(f.thumbnailWidth))k("width","l1",f.thumbnailWidth,"u"),k("width","lN",f.thumbnailWidth,"u");else{c=f.thumbnailWidth.split(" ");a="auto";"auto"!=c[0].substring(0,4)&&(a=parseInt(c[0]));var d="u";"C"==c[0].charAt(c[0].length-1)&&(d="c");k("width","l1",a,d);k("width","lN",a,d);for(b=1;b<c.length;b++){var m=c[b].substring(0,2).toLowerCase();if(/xs|sm|me|la|xl/i.test(m)){var u=c[b].substring(2),a="auto";"auto"!=u.substring(0,4)&&(a=parseInt(u));d="u";"C"==u.charAt(u.length-1)&&
(d="c");h.settings.width.l1[m]=a;h.settings.width.lN[m]=a;h.settings.width.l1[m+"c"]=d;h.settings.width.lN[m+"c"]=d}}}if(void 0!=f.thumbnailL1Width)if("number"==V(f.thumbnailL1Width))k("width","l1",f.thumbnailL1Width,"u");else for(c=f.thumbnailL1Width.split(" "),a="auto","auto"!=c[0].substring(0,4)&&(a=parseInt(c[0])),d="u","C"==c[0].charAt(c[0].length-1)&&(d="c"),k("width","l1",a,d),b=1;b<c.length;b++)m=c[b].substring(0,2).toLowerCase(),/xs|sm|me|la|xl/i.test(m)&&(u=c[b].substring(2),a="auto","auto"!=
u.substring(0,4)&&(a=parseInt(u)),d="u","C"==u.charAt(u.length-1)&&(d="c"),h.settings.width.l1[m]=a,h.settings.width.l1[m+"c"]=d);if("number"==V(f.thumbnailHeight))k("height","l1",f.thumbnailHeight,"u"),k("height","lN",f.thumbnailHeight,"u");else for(c=f.thumbnailHeight.split(" "),a="auto","auto"!=c[0].substring(0,4)&&(a=parseInt(c[0])),d="u","C"==c[0].charAt(c[0].length-1)&&(d="c"),k("height","l1",a,d),k("height","lN",a,d),b=1;b<c.length;b++)m=c[b].substring(0,2).toLowerCase(),/xs|sm|me|la|xl/i.test(m)&&
(u=c[b].substring(2),a="auto","auto"!=u.substring(0,4)&&(a=parseInt(u)),d="u","C"==u.charAt(u.length-1)&&(d="c"),h.settings.height.l1[m]=a,h.settings.height.lN[m]=a,h.settings.height.l1[m+"c"]=d,h.settings.height.lN[m+"c"]=d);if(void 0!=f.thumbnailL1Height)if("number"==V(f.thumbnailL1Height))k("height","l1",f.thumbnailL1Height,"u");else for(c=f.thumbnailL1Height.split(" "),a="auto","auto"!=c[0].substring(0,4)&&(a=parseInt(c[0])),d="u","C"==c[0].charAt(c[0].length-1)&&(d="c"),k("height","l1",a,d),
b=1;b<c.length;b++)m=c[b].substring(0,2).toLowerCase(),/xs|sm|me|la|xl/i.test(m)&&(u=c[b].substring(2),a="auto","auto"!=u.substring(0,4)&&(a=parseInt(u)),d="u","C"==u.charAt(u.length-1)&&(d="c"),h.settings.height.l1[m]=a,h.settings.height.l1[m+"c"]=d)}function k(b,c,a,d){h.settings[b][c].xs=a;h.settings[b][c].sm=a;h.settings[b][c].me=a;h.settings[b][c].la=a;h.settings[b][c].xl=a;h.settings[b][c].xsc=d;h.settings[b][c].smc=d;h.settings[b][c].mec=d;h.settings[b][c].lac=d;h.settings[b][c].xlc=d}function l(){return h.settings.width[ba][ha]}
function w(){return h.settings.height[ba][ha]}function H(){return h.outerWidth[ba][ha]}function da(){return h.outerHeight[ba][ha]}function ca(){var b=M().w;return 0<f.thumbnailSizeSM&&b<f.thumbnailSizeSM?"xs":0<f.thumbnailSizeME&&b<f.thumbnailSizeME?"sm":0<f.thumbnailSizeLA&&b<f.thumbnailSizeLA?"me":0<f.thumbnailSizeXL&&b<f.thumbnailSizeXL?"la":"xl"}function v(){var b={delay:0,delayBack:0,duration:400,durationBack:200,easing:"swing",easingBack:"swing",animParam:null};"animate"!=F&&(b.easing="ease",
b.easingBack="ease");return b}function g(b){var c=/labelOpacity50|borderLighter|borderDarker/i.test(b),a=/imageFlipVertical|imageFlipHorizontal|imageRotateCornerBR|imageRotateCornerBL|rotateCornerBL|rotateCornerBR|imageScale150|overScale|overScaleOutside|imageScaleIn80|imageScale150Outside|scale120|scaleLabelOverImage|slideUp|slideDown|slideLeft|slideRight|imageSlideUp|imageSlideDown|imageSlideLeft|imageSlideRight|labelAppear|labelAppear75|descriptionAppear|labelSlideDown|labelSlideUp|labelSlideUpTop|imageInvisible|imageOpacity50|descriptionSlideUp|labelSplitVert|labelSplit4|labelAppearSplitVert|labelAppearSplit4|imageSplitVert|imageSplit4/i.test(b),
d=/imageExplode/i.test(b);f.touchAutoOpenDelay=parseInt(f.touchAutoOpenDelay);0==f.touchAutoOpenDelay&&(f.touchAutoOpenDelay=1E3);return c||a||d?"onBottom"!=f.thumbnailLabel.position||/borderLighter|borderDarker|imageOpacity50|imageScale150|imageScaleIn80|imageSlide2Up|imageSlide2Down|imageSlide2Left|imageSlide2Right|imageSlide2Random|imageSlide2UpRight|imageSlide2UpLeft|imageSlide2DownRight|imageSlide2DownLeft|imageScale150Outside|scale120/i.test(b)?!d||"animate"!=F&&null!=K?!0:(ma('Parameter thumbnailHoverEffect="'+
b+'" requires one of the additionals jQuery plugins "Velocity" or "Transit".'),!1):(R('The parameter combination thumbnailHoverEffect="'+b+'" and thumbnailLabel.position="onBottom" is not supported.'),!1):(R('Unknow parameter value: thumbnailHoverEffect="'+b+'".'),!1)}function x(){ia=(navigator.language||navigator.userLanguage).toUpperCase();"UNDEFINED"===ia&&(ia="");var b=-("_"+ia).length;if("object"==V(f.i18n))for(var c in f.i18n){var a=c.substr(b);a=="_"+ia?O[c.substr(0,c.length-a.length)]=f.i18n[c]:
O[c]=f.i18n[c]}}function r(b){if(!f.locationHash)return!1;var c=null,a=null,c="#nanogallery/"+ja+"/",d=location.hash;if(d!=va&&(""==d&&-1!=gb&&(va="",sa(0,!1,-1,!1)),0==d.indexOf(c))){var m=d.substring(c.length),u=m.indexOf("/"),E=d=-1,Z=p.length;if(0<u)for(c=m.substring(0,u),a=m.substring(u+1),m=0;m<Z;m++){if("image"==p[m].kind&&p[m].GetID()==a){E=m;break}}else c=m;for(m=0;m<Z;m++)if("album"==p[m].kind&&p[m].GetID()==c){d=m;break}null!==a?(b||(Qa=d),""==f.kind?ta(E):-1==E?sa(d,!1,a,b):ta(E)):sa(d,
!1,-1,b);return!0}}function P(){p=[];var b="";f.thumbnailLabel.displayDescription&&(b="d");b=W("dummydummydummy","data:image/gif;base64,R0lGODlhEAAQAIAAAP///////yH5BAEKAAEALAAAAAAQABAAAAIOjI+py+0Po5y02ouzPgUAOw==","data:image/gif;base64,R0lGODlhEAAQAIAAAP///////yH5BAEKAAEALAAAAAAQABAAAAIOjI+py+0Po5y02ouzPgUAOw==",b,"","image","","1","0");b=xb(b,0,!1).e$;h.borderWidth=b.outerWidth(!0)-b.width();h.borderHeight=b.outerHeight(!0)-b.height();h.imgcBorderWidth=b.find(".imgContainer").outerWidth(!0)-b.find(".imgContainer").width();
h.imgcBorderHeight=b.find(".imgContainer").outerHeight(!0)-b.find(".imgContainer").height();h.labelBorderHeight=b.find(".labelImage").outerHeight(!0)-b.find(".labelImage").height();h.labelBorderWidth=b.find(".labelImage").outerWidth(!0)-b.find(".labelImage").width();"onBottom"==f.thumbnailLabel.position&&(h.labelHeight=b.find(".labelImage").outerHeight(!0));for(var c=["xs","sm","me","la","xl"],a=0;a<c.length;a++){var d=h.settings.width.l1[c[a]];h.outerWidth.l1[c[a]]="auto"!=d?d+h.borderWidth+h.imgcBorderWidth:
0;d=h.settings.width.lN[c[a]];h.outerWidth.lN[c[a]]="auto"!=d?d+h.borderWidth+h.imgcBorderWidth:0}for(a=0;a<c.length;a++)d=h.settings.height.l1[c[a]],h.outerHeight.l1[c[a]]="auto"!=d?d+h.borderHeight+h.imgcBorderHeight+h.labelHeight:0,d=h.settings.height.lN[c[a]],h.outerHeight.lN[c[a]]="auto"!=d?d+h.borderHeight+h.imgcBorderHeight+h.labelHeight:0;ka=wa();G.oldBorderColor=b.css("border-color");if(""==G.oldBorderColor||null==G.oldBorderColor||void 0==G.oldBorderColor)G.oldBorderColor="#000";G.oldLabelOpacity=
b.find(".labelImage").css("opacity");b=jQuery.Color(b.find(".labelImage"),"backgroundColor");G.oldLabelRed=b.red();G.oldLabelGreen=b.green();G.oldLabelBlue=b.blue();p=[]}function pa(b,c){var a="";return""!=ia&&void 0!==b[c+"_"+ia]&&0<b[c+"_"+ia].length?a=b[c+"_"+ia]:a=b[c]}function N(b){return"%filename"==f.thumbnailLabel.title?b.split("/").pop().replace("_"," "):"%filenameNoExt"==f.thumbnailLabel.title?b.split("/").pop().split(".").shift().replace("_"," "):b}function Ub(){var b=!1;"undefined"!==
typeof f.dataSorting&&("random"==f.dataSorting?f.items=Ka(f.items):"reversed"==f.dataSorting&&(f.items=f.items.reverse()));jQuery.each(f.items,function(a,c){var d="",d=pa(c,"title");void 0===d&&(d="");var m=f.itemsBaseURL+c.src,u="",u=void 0!==c.srct&&0<c.srct.length?f.itemsBaseURL+c.srct:m,e="",e=void 0!==c.srct2x&&0<c.srct2x.length?f.itemsBaseURL+c.srct2x:""!=u?u:m;""!=f.thumbnailLabel.title&&(d=N(m));var h="",h=pa(c,"description");void 0===h&&(h="");var g="";void 0!==c.destURL&&0<c.destURL.length&&
(g=c.destURL);var p=pa(c,"tags");void 0===p&&(p="");var k=0;void 0!==c.albumID&&(k=c.albumID,b=!0);var l=null;void 0!==c.ID&&(l=c.ID);var r="image";void 0!==c.kind&&0<c.kind.length&&(r=c.kind);d=W(d,u,m,h,g,r,p,l,k);d.thumbX2src=e;e=0;void 0!==c.imgtWidth&&0<c.imgtWidth&&(e=c.imgtWidth,d.thumbImgWidth=e);m=0;void 0!==c.imgtHeight&&0<c.imgtHeight&&(m=c.imgtHeight,d.thumbImgHeight=m);d.thumbs={url:{l1:{xs:u,sm:u,me:u,la:u,xl:u},lN:{xs:u,sm:u,me:u,la:u,xl:u}},width:{l1:{xs:e,sm:e,me:e,la:e,xl:e},lN:{xs:e,
sm:e,me:e,la:e,xl:e}},height:{l1:{xs:m,sm:m,me:m,la:m,xl:m},lN:{xs:m,sm:m,me:m,la:m,xl:m}}};"function"==typeof f.fnProcessData&&f.fnProcessData(d,"api",null)});b&&(f.displayBreadcrumb=!0);for(var c=p.length,a=0,d=0,m=0;m<c;m++){for(var u=d=a=0;u<c;u++)m!=u&&p[m].GetID()==p[u].albumID&&(a++,"image"==p[u].kind&&(p[u].imageNumber=d++));p[m].contentLength=a}}function Vb(b){var c=!1;"undefined"!==typeof f.dataSorting&&("random"==f.dataSorting?b=Ka(b):"reversed"==f.dataSorting&&(jQuery.fn.reverse=[].reverse,
b=b.reverse()));jQuery.each(b,function(a,b){var d="";void 0!==jQuery(b).attr("data-ngthumb")&&0<jQuery(b).attr("data-ngthumb").length&&(d=f.itemsBaseURL+jQuery(b).attr("data-ngthumb"));void 0!==jQuery(b).attr("data-ngThumb")&&0<jQuery(b).attr("data-ngThumb").length&&(d=f.itemsBaseURL+jQuery(b).attr("data-ngThumb"));var m="";void 0!==jQuery(b).attr("data-ngthumb2x")&&0<jQuery(b).attr("data-ngthumb2x").length&&(m=f.itemsBaseURL+jQuery(b).attr("data-ngthumb2x"));void 0!==jQuery(b).attr("data-ngThumb2x")&&
0<jQuery(b).attr("data-ngThumb2x").length&&(m=f.itemsBaseURL+jQuery(b).attr("data-ngThumb2x"));src=f.itemsBaseURL+jQuery(b).attr("href");var u="";void 0!==jQuery(b).attr("data-ngdesc")&&0<jQuery(b).attr("data-ngdesc").length&&(u=jQuery(b).attr("data-ngdesc"));void 0!==jQuery(b).attr("data-ngDesc")&&0<jQuery(b).attr("data-ngDesc").length&&(u=jQuery(b).attr("data-ngDesc"));var e="";void 0!==jQuery(b).attr("data-ngdest")&&0<jQuery(b).attr("data-ngdest").length&&(e=jQuery(b).attr("data-ngdest"));void 0!==
jQuery(b).attr("data-ngDest")&&0<jQuery(b).attr("data-ngDest").length&&(e=jQuery(b).attr("data-ngDest"));var h=0;void 0!==jQuery(b).attr("data-ngalbumid")&&(h=jQuery(b).attr("data-ngalbumid"),c=!0);void 0!==jQuery(b).attr("data-ngAlbumID")&&(h=jQuery(b).attr("data-ngAlbumID"),c=!0);var g=null;void 0!==jQuery(b).attr("data-ngid")&&(g=jQuery(b).attr("data-ngid"));void 0!==jQuery(b).attr("data-ngID")&&(g=jQuery(b).attr("data-ngID"));var p="image";void 0!==jQuery(b).attr("data-ngkind")&&0<jQuery(b).attr("data-ngkind").length&&
(p=jQuery(b).attr("data-ngkind"));void 0!==jQuery(b).attr("data-ngKind")&&0<jQuery(b).attr("data-ngKind").length&&(p=jQuery(b).attr("data-ngKind"));var k=jQuery(b).text();""!=f.thumbnailLabel.title&&void 0!=f.thumbnailLabel.title&&(k=N(src));u=W(k,d,src,u,e,p,"",g,h);u.thumbX2src=m;m=0;void 0!==jQuery(b).attr("data-ngthumbImgWidth")&&0<jQuery(b).attr("data-ngthumbImgWidth").length&&(m=jQuery(b).attr("data-ngthumbImgWidth"),u.thumbImgWidth=m);e=0;void 0!==jQuery(b).attr("data-ngthumbImgHeight")&&0<
jQuery(b).attr("data-ngthumbImgHeight").length&&(e=jQuery(b).attr("data-ngthumbImgHeight"),u.thumbImgHeight=e);u.thumbs={url:{l1:{xs:d,sm:d,me:d,la:d,xl:d},lN:{xs:d,sm:d,me:d,la:d,xl:d}},width:{l1:{xs:m,sm:m,me:m,la:m,xl:m},lN:{xs:m,sm:m,me:m,la:m,xl:m}},height:{l1:{xs:e,sm:e,me:e,la:e,xl:e},lN:{xs:e,sm:e,me:e,la:e,xl:e}}};"function"==typeof f.fnProcessData&&f.fnProcessData(u,"markup",null)});jQuery.each(b,function(a,b){jQuery(b).remove()});c&&(f.displayBreadcrumb=!0);b=p.length;for(var a=0,d=0,m=
0;m<b;m++){for(var u=d=a=0;u<b;u++)m!=u&&p[m].GetID()==p[u].albumID&&(a++,"image"==p[u].kind&&(p[u].imageNumber=d++));p[m].contentLength=a}}function tb(b,c,a,d){Ra(b);if(p[b].contentIsLoaded)X(b,d);else{var m=f.customSourceProvider+"?albumID="+encodeURIComponent(p[b].GetID());hb();jQuery.ajaxSetup({cache:!1});jQuery.support.cors=!0;var u=setTimeout(function(){ea();R("Could not retrieve Custom data...")},6E4);jQuery.getJSON(m,function(m,f,e){clearTimeout(u);ea();Xb(b,m);if(c)r(!1)||X(b,d);else if(-1!=
a){m=-1;f=p.length;for(e=0;e<f;e++)if("image"==p[e].kind&&p[e].GetID()==a){m=e;break}ta(m,!0)}else X(b,d)}).fail(function(a,b,c){clearTimeout(u);ea();R("Could not retrieve Custom items list (jQuery): "+(b+", "+c))})}}function Xb(b,c){var a=!1,d=0;jQuery.each(c,function(b,c){var E="",E=pa(c,"title");void 0===E&&(E="");var e=f.itemsBaseURL+c.src,e=e.replaceAll("%2F","/"),h=f.itemsBaseURL+c.srct,h=h.replaceAll("%2F","/");""!=f.thumbnailLabel.title&&(E=N(e));var g="",g=pa(c,"description");void 0===g&&
(g="");var p="";void 0!==c.destURL&&0<c.destURL.length&&(p=c.destURL);var k=0;void 0!==c.albumID&&(k=c.albumID,a=!0);var l=null;void 0!==c.ID&&(l=c.ID);var r="image";void 0!==c.kind&&0<c.kind.length&&(r=c.kind);E=W(E,h,e,g,p,r,"",l,k);e=c.imgtWidth;g=c.imgtHeight;E.thumbs={url:{l1:{xs:h,sm:h,me:h,la:h,xl:h},lN:{xs:h,sm:h,me:h,la:h,xl:h}},width:{l1:{xs:e,sm:e,me:e,la:e,xl:e},lN:{xs:e,sm:e,me:e,la:e,xl:e}},height:{l1:{xs:g,sm:g,me:g,la:g,xl:g},lN:{xs:g,sm:g,me:g,la:g,xl:g}}};"function"==typeof f.fnProcessData&&
f.fnProcessData(E,"api",null);if("image"==r&&(E.imageNumber=d,d++,d>=Pa))return!1});a&&(f.displayBreadcrumb=!0);p[b].contentIsLoaded=!0;p[b].contentLength=d}function sb(b,c,a,d){Ra(b);if(p[b].contentIsLoaded)X(b,d);else{var m="",u="album";0==p[b].GetID()?m=Q.url()+"?&method=flickr.photosets.getList&api_key="+Q.ApiKey+"&user_id="+f.userID+"&per_page=500&primary_photo_extras=url_o,url_sq,url_t,url_q,url_s,url_m,url_z,url_b,url_h,url_k&format=json&jsoncallback=?":(m="none"==p[b].GetID()?Q.url()+"?&method=flickr.people.getPublicPhotos&api_key="+
Q.ApiKey+"&user_id="+f.userID+"&extras=description,views,url_o,url_sq,url_t,url_q,url_s,url_m,url_z,url_b,url_h,url_k&per_page=500&format=json&jsoncallback=?":Q.url()+"?&method=flickr.photosets.getPhotos&api_key="+Q.ApiKey+"&photoset_id="+p[b].GetID()+"&extras=description,views,url_o,url_sq,url_t,url_q,url_s,url_m,url_z,url_b,url_h,url_k&format=json&jsoncallback=?",u="image");hb();jQuery.ajaxSetup({cache:!1});jQuery.support.cors=!0;var e=setTimeout(function(){ea();R("Could not retrieve Flickr data...")},
6E4);jQuery.getJSON(m,function(m,f,h){clearTimeout(e);ea();"album"==u?Yb(b,m):Zb(b,m);if(c)r(!1)||X(b,d);else if(-1!=a){m=-1;f=p.length;for(h=0;h<f;h++)if("image"==p[h].kind&&p[h].GetID()==a){m=h;break}ta(m,!0)}else X(b,d)}).fail(function(a,b,c){clearTimeout(e);ea();R("Could not retrieve Flickr photoset list (jQuery): "+(b+", "+c))})}}function Yb(b,c){var a=!0;void 0!==c.stat&&"fail"===c.stat&&(R("Could not retrieve Flickr photoset list: "+c.message+" (code: "+c.code+")."),a=!1);if(a){var d=0,a=c.photosets.photoset;
switch(f.albumSorting){case "random":a=Ka(a);break;case "reversed":a=a.reverse();break;case "titleAsc":a.sort(function(a,b){var c=a.title._content.toUpperCase(),d=b.title._content.toUpperCase();return c<d?-1:c>d?1:0});break;case "titleDesc":a.sort(function(a,b){var c=a.title._content.toUpperCase(),d=b.title._content.toUpperCase();return c>d?-1:c<d?1:0})}jQuery.each(a,function(a,c){itemTitle=c.title._content;if(yb(itemTitle,c.id)){itemID=c.id;itemDescription="";void 0!=c.description._content&&(itemDescription=
c.description._content);var f={},e;for(e in c.primary_photo_extras)f[e]=c.primary_photo_extras[e];tags="";void 0!==c.primary_photo_extras&&void 0!==c.primary_photo_extras.tags&&(tags=c.primary_photo_extras.tags);e=W(itemTitle,"","",itemDescription,"","album",tags,itemID,p[b].GetID());e.contentLength=c.photos;e.thumbSizes=f;f={url:{l1:{xs:"",sm:"",me:"",la:"",xl:""},lN:{xs:"",sm:"",me:"",la:"",xl:""}},width:{l1:{xs:0,sm:0,me:0,la:0,xl:0},lN:{xs:0,sm:0,me:0,la:0,xl:0}},height:{l1:{xs:0,sm:0,me:0,la:0,
xl:0},lN:{xs:0,sm:0,me:0,la:0,xl:0}}};f=Sa(f,c.primary_photo_extras,"l1");f=Sa(f,c.primary_photo_extras,"lN");e.thumbs=f;d++;if(d>=Pa)return!1}});p[b].contentIsLoaded=!0;p[b].contentLength=d}}function Sa(b,c,a){for(var d=["xs","sm","me","la","xl"],m=0;m<d.length;m++){if("auto"==h.settings.width[a][d[m]])var f="height_",e=Math.ceil(h.settings.height[a][d[m]]*h.scale);else"auto"==h.settings.height[a][d[m]]?(f="width_",e=Math.ceil(h.settings.width[a][d[m]]*h.scale)):(f="height_",e=Math.ceil(h.settings.height[a][d[m]]*
h.scale),h.settings.width[a][d[m]]>h.settings.height[a][d[m]]&&(f="width_",e=Math.ceil(h.settings.width[a][d[m]]*h.scale)));f=$b(f,e,c);b.url[a][d[m]]=f.url;b.width[a][d[m]]=f.width;b.height[a][d[m]]=f.height}return b}function $b(b,c,a){for(var d={url:"",width:0,height:0},m=0,f=0;f<Q.thumbAvailableSizes.length;f++){var e=a[b+Q.photoAvailableSizesStr[f]];if(void 0!=e&&(m=f,e>=c))break}b=Q.photoAvailableSizesStr[m];d.url=a["url_"+b];d.width=parseInt(a["width_"+b]);d.height=parseInt(a["height_"+b]);
return d}function Zb(b,c){var a="",a="none"==p[b].GetID()?c.photos.photo:c.photoset.photo;switch(f.photoSorting){case "random":a=Ka(a);break;case "reversed":a=a.reverse();break;case "titleAsc":a.sort(function(a,b){var c="",d="";""!=f.thumbnailLabel.title?(c=N(a.url_sq),d=N(b.url_sq)):(c=a.title.toUpperCase(),d=b.title.toUpperCase());return c<d?-1:c>d?1:0});break;case "titleDesc":a.sort(function(a,b){var c="",d="";""!=f.thumbnailLabel.title?(c=N(a.url_sq),d=N(b.url_sq)):(c=a.title.toUpperCase(),d=
b.title.toUpperCase());return c>d?-1:c<d?1:0})}var d=p[b].GetID(),m=0;jQuery.each(a,function(a,b){var c=b.title,e=b.id,h=b.description._content,g=b.url_sq;for(a=Q.photoSize;0<=a;a--)if(void 0!=b["url_"+Q.photoAvailableSizesStr[a]]){g=b["url_"+Q.photoAvailableSizesStr[a]];break}for(var p in b)0==p.indexOf("height_")||0==p.indexOf("width_")||p.indexOf("url_");""!=f.thumbnailLabel.title&&(c=N(g));c=W(c,"",g,h,"","image","",e,d);c.imageNumber=m;void 0!==b.url_o?(c.width=b.width_o,c.height=b.height_o):
(c.width=b.width_z,c.height=b.height_z);e={url:{l1:{xs:"",sm:"",me:"",la:"",xl:""},lN:{xs:"",sm:"",me:"",la:"",xl:""}},width:{l1:{xs:0,sm:0,me:0,la:0,xl:0},lN:{xs:0,sm:0,me:0,la:0,xl:0}},height:{l1:{xs:0,sm:0,me:0,la:0,xl:0},lN:{xs:0,sm:0,me:0,la:0,xl:0}}};e=Sa(e,b,"l1");e=Sa(e,b,"lN");c.thumbs=e;m++;if(m>=fb)return!1});p[b].contentIsLoaded=!0;p[b].contentLength=m}function fa(b,c,a,d,m){var f=Math.ceil(a*h.scale)+m;"auto"==c?f=Math.ceil(a*h.scale)+m:"auto"==a?f=Math.ceil(c*h.scale)+d:c>a&&(f=Math.ceil(c*
h.scale)+d);0<b.length&&(b+=",");return b+f}function ub(b,c,a,d){Ra(b);if(p[b].contentIsLoaded)X(b,d);else{var m="",e="album",E;E=fa("",h.settings.width.l1.xs,h.settings.height.l1.xs,h.settings.width.l1.xsc,h.settings.height.l1.xsc);E=fa(E,h.settings.width.l1.sm,h.settings.height.l1.sm,h.settings.width.l1.smc,h.settings.height.l1.smc);E=fa(E,h.settings.width.l1.me,h.settings.height.l1.me,h.settings.width.l1.mec,h.settings.height.l1.mec);E=fa(E,h.settings.width.l1.la,h.settings.height.l1.la,h.settings.width.l1.lac,
h.settings.height.l1.lac);E=fa(E,h.settings.width.l1.xl,h.settings.height.l1.xl,h.settings.width.l1.xlc,h.settings.height.l1.xlc);E=fa(E,h.settings.width.lN.xs,h.settings.height.lN.xs,h.settings.width.lN.xsc,h.settings.height.lN.xsc);E=fa(E,h.settings.width.lN.sm,h.settings.height.lN.sm,h.settings.width.lN.smc,h.settings.height.lN.smc);E=fa(E,h.settings.width.lN.me,h.settings.height.lN.me,h.settings.width.lN.mec,h.settings.height.lN.mec);E=fa(E,h.settings.width.lN.la,h.settings.height.lN.la,h.settings.width.lN.lac,
h.settings.height.lN.lac);E=fa(E,h.settings.width.lN.xl,h.settings.height.lN.xl,h.settings.width.lN.xlc,h.settings.height.lN.xlc);if(0==p[b].GetID())m=zb.url()+"user/"+f.userID+"?alt=json&kind=album&thumbsize="+E+"&rnd="+(new Date).getTime();else{var g="";"undefined"!==typeof p[b].customData.authkey&&(g=p[b].customData.authkey);m=zb.url()+"user/"+f.userID+"/albumid/"+p[b].GetID()+"?alt=json&kind=photo"+g+"&thumbsize="+E+"&imgmax=d";e="image"}hb();jQuery.ajaxSetup({cache:!1});jQuery.support.cors=!0;
var k=setTimeout(function(){ea();R("Could not retrieve Picasa/Google+ data...")},6E4);jQuery.getJSON(m,"callback=?",function(m){clearTimeout(k);ea();ac(b,m,e);if(c)r(!1)||X(b,d);else if(-1!=a){m=-1;for(var f=p.length,h=0;h<f;h++)if("image"==p[h].kind&&p[h].GetID()==a){m=h;break}ta(m,!0)}else X(b,d)}).fail(function(a,b,c){clearTimeout(k);ea();var d="",f;for(f in a)d+=f+"="+a[f]+"<br>";R("Could not retrieve Picasa/Google+ data. Error: "+(b+", "+c+" "+d+"<br><br>URL:"+m))})}}function ac(b,c,a){var d=
0,m=p[b].GetID();c=c.feed.entry;var e=f.albumSorting;"image"==a&&(e=f.photoSorting);switch(e){case "random":c=Ka(c);break;case "reversed":c=c.reverse();break;case "titleAsc":c.sort(function(b,c){var d="",m="";"image"==a?""!=f.thumbnailLabel.title?(d=N(unescape(unescape(unescape(unescape(b.media$group.media$content[0].url))))),m=N(unescape(unescape(unescape(unescape(c.media$group.media$content[0].url)))))):(d=b.media$group.media$description.$t.toUpperCase(),m=c.media$group.media$description.$t.toUpperCase()):
(d=b.media$group.media$title.$t.toUpperCase(),m=c.media$group.media$title.$t.toUpperCase());return d<m?-1:d>m?1:0});break;case "titleDesc":c.sort(function(b,c){var d="",m="";"image"==a?""!=f.thumbnailLabel.title?(d=N(unescape(unescape(unescape(unescape(b.media$group.media$content[0].url))))),m=N(unescape(unescape(unescape(unescape(c.media$group.media$content[0].url)))))):(d=b.media$group.media$description.$t.toUpperCase(),m=c.media$group.media$description.$t.toUpperCase()):(d=b.media$group.media$title.$t.toUpperCase(),
m=c.media$group.media$title.$t.toUpperCase());return d>m?-1:d<m?1:0})}jQuery.each(c,function(b,c){var e=c.media$group.media$title.$t,u=c.media$group.media$thumbnail[0].url,h=c.gphoto$id.$t,g="",p=c.media$group.media$description.$t;"image"==a&&(g=e,e=p,p="");var k=c.media$group.media$content[0].url;"image"==a&&""!=f.thumbnailLabel.title&&(e=N(unescape(unescape(unescape(unescape(k))))));var r=!0;"album"==a&&(yb(e,h)||(r=!1));if(r&&(r="","album"==a?r=h:(k=k.substring(0,k.lastIndexOf("/")),k=k.substring(0,
k.lastIndexOf("/"))+"/",r=window.screen.width>window.screen.height?k+"w"+window.screen.width+"/"+g:k+"h"+window.screen.height+"/"+g),e=W(e,u,r,p,"",a,"",h,m),e.picasaThumbBaseURL="",e.imageNumber=d,"album"==a&&(e.author=c.author[0].name.$t,e.contentLength=c.gphoto$numphotos.$t),u={url:{l1:{xs:"",sm:"",me:"",la:"",xl:""},lN:{xs:"",sm:"",me:"",la:"",xl:""}},width:{l1:{xs:0,sm:0,me:0,la:0,xl:0},lN:{xs:0,sm:0,me:0,la:0,xl:0}},height:{l1:{xs:0,sm:0,me:0,la:0,xl:0},lN:{xs:0,sm:0,me:0,la:0,xl:0}}},u=Ab("l1",
0,u,c,a),u=Ab("lN",5,u,c,a),e.thumbs=u,"function"==typeof f.fnProcessData&&f.fnProcessData(e,"picasa",c),d++,d>=("album"==a?Pa:fb)))return!1});p[b].contentIsLoaded=!0;p[b].contentLength=d}function Ab(b,c,a,d,m){for(var f=["xs","sm","me","la","xl"],e=0;e<f.length;e++)if(a.url[b][f[e]]=d.media$group.media$thumbnail[c+e].url,"image"==m){a.width[b][f[e]]=d.media$group.media$thumbnail[c+e].width;a.height[b][f[e]]=d.media$group.media$thumbnail[c+e].height;var g=d.media$group.media$thumbnail[c+e].width,
p=d.media$group.media$thumbnail[c+e].height;if("auto"==h.settings.width[b][f[e]]&&p<h.settings.height[b][f[e]]){var k=g/p;a.width[b][f[e]]=g*k;a.height[b][f[e]]=p*k;k=a.url[b][f[e]].substring(0,a.url[b][f[e]].lastIndexOf("/"));k=k.substring(0,k.lastIndexOf("/"))+"/";a.url[b][f[e]]=k+"h"+h.settings.height[b][f[e]]+"/"}"auto"==h.settings.height[b][f[e]]&&g<h.settings.width[b][f[e]]&&(k=p/g,a.height[b][f[e]]=p*k,a.width[b][f[e]]=g*k,k=a.url[b][f[e]].substring(0,a.url[b][f[e]].lastIndexOf("/")),k=k.substring(0,
k.lastIndexOf("/"))+"/",a.url[b][f[e]]=k+"w"+h.settings.width[b][f[e]]+"/")}else"auto"!=h.settings.width[b][f[e]]?a.width[b][f[e]]=d.media$group.media$thumbnail[c+e].width:(k=a.url[b][f[e]].substring(0,a.url[b][f[e]].lastIndexOf("/")),k=k.substring(0,k.lastIndexOf("/"))+"/",a.url[b][f[e]]=k+"h"+h.settings.height[b][f[e]]+"/"),"auto"!=h.settings.height[b][f[e]]?a.height[b][f[e]]=d.media$group.media$thumbnail[c+e].height:(k=a.url[b][f[e]].substring(0,a.url[b][f[e]].lastIndexOf("/")),k=k.substring(0,
k.lastIndexOf("/"))+"/",a.url[b][f[e]]=k+"w"+h.settings.width[b][f[e]]+"/");return a}function W(b,c,a,d,m,f,e,h,g){b=new bc(b,h);b.thumbsrc=c;b.src=a;b.description=d;b.destinationURL=m;b.kind=f;b.albumID=g;b.tags=0==e.length?null:e.split(" ");p.push(b);return b}function yb(b,c){var a=b.toUpperCase();if(null!==Ja)for(var d=0;d<Ja.length;d++){if(a==Ja[d].toUpperCase()||c==Ja[d])return!0}else{var m=!1;if(null!==Na){for(d=0;d<Na.length;d++)-1!==a.indexOf(Na[d])&&(m=!0);if(!m)return!1}if(null!==Ma)for(d=
0;d<Ma.length;d++)if(-1!==a.indexOf(Ma[d]))return!1;return!0}}function X(b,c){"display"==f.lazyBuild?xa(e.conTnParent,f.lazyBuildTreshold)?ib(b,c):(Ta=b,Bb=c):ib(b,c)}function ib(b,c){f.lazyBuild="none";Qa=Ta=-1;S&&Da(!1);if(b!=gb){if(f.locationHash&&c){var a="nanogallery/"+ja+"/"+p[b].GetID();va="#"+a;top.location.hash=a}gb=p[b].GetID();Ra(b);a=0;0<p[b].paginationLastPage&&p[b].paginationLastWidth==e.conTnParent.width()&&(a=p[b].paginationLastPage);ya(b,a)}}function Cb(b){var c="folder";0==b&&(c=
"folderHome");c=jQuery('<div class="'+c+' oneFolder">'+p[b].title+"</div>").appendTo(e.conBC);jQuery(c).data("albumIdx",b);c.click(function(){var a=jQuery(this).data("albumIdx");jQuery(this).nextAll().remove();sa(a,!1,-1,!0)})}function Db(b){var c=jQuery('<div class="separator'+(f.RTL?"RTL":"")+'"></div>').appendTo(e.conBC);jQuery(c).data("albumIdx",b);c.click(function(){var a=jQuery(this).data("albumIdx");jQuery(this).nextAll().remove();jQuery(this).remove();sa(a,!1,-1,!0)})}function Ra(b){var c=
!1;if(1==f.displayBreadcrumb){0==e.conBC.children().length&&e.conNavBCon.css({opacity:0,"max-height":"0px"});c=!0;e.conBC.children().remove();Cb(0);if(0!=b){var a=p.length,d=[];for(d.push(b);0!=p[b].albumID;)for(i=1;i<a;i++)if(p[i].GetID()==p[b].albumID){b=i;d.push(b);break}Db(0);for(i=d.length-1;0<=i;i--)Cb(d[i]),0<i&&Db(d[i-1])}a=e.conBC.children().length;0==a?(ba="l1",f.breadcrumbAutoHideTopLevel&&(e.conNavBCon.css({opacity:0,"max-height":"0px"}),c=!1)):(ba=1==a?"l1":"lN",1==a&&f.breadcrumbAutoHideTopLevel?
e.conNavBCon.animate({opacity:"0","max-height":"0px"}):e.conNavBCon.animate({opacity:"1","max-height":"50px"}));ka=wa()}f.useTags&&(c=!0,null==Eb&&(Eb=jQuery('<div class="nanoGalleryTags"></div>').appendTo(e.conNavB)));f.galleryFullpageButton&&(c=!0);!Fb&&c&&(Fb=!0,e.conNavBCon.show())}function hb(){e.conLoadingB.css({visibility:"visible"})}function ea(){e.conLoadingB.css({visibility:"hidden"})}function sa(b,c,a,d){switch(f.kind){case "":X(b,d);break;case "flickr":sb(b,c,a,d);break;case "json":tb(b,
c,a,d);break;default:ub(b,c,a,d)}}function Ga(){"auto"==w()?cc():"auto"==l()?dc():ec();jb();if(f.galleryToolbarWidthAligned&&void 0!==e.conNavBCon){var b=e.conTn.outerWidth(!0);e.conNavBCon.width();e.conNavBCon.width(b)}}function cc(){var b=e.conTnParent.width(),c=0,a=0,d=0,m=[],h=wa(),g=0,k=f.thumbnailGutterHeight,r=H(),l=e.conTn.find(".nanoGalleryThumbnailContainer");"justified"==f.thumbnailAlignment?(h=Math.min(h,l.length),g=1==h?0:(b-h*r)/(h-1)):g=f.thumbnailGutterWidth;var x=0;l.each(function(){var b=
jQuery(this).data("index");if(void 0!==b){if(0==a)H(),m[c]=p[b].thumbFullHeight+k,c++,x++,c>=h&&(c=0,a++);else return!1;d++}});var aa=m.length*(r+g)-g,a=0;l.each(function(){var b=jQuery(this),e=b.data("index");if(void 0!==e){"onBottom"==f.thumbnailLabel.position&&kb(b,p[e]);var r=0,l=0;if(0==a)r=c*(H()+g),m[c]=p[e].thumbFullHeight+k,c++,c>=h&&(c=0,a++);else{var x=0,r=m[0];for(i=1;i<h;i++)if(m[i]+5<r){x=i;break}l=m[x];r=x*(H()+g);m[x]=l+p[e].thumbFullHeight+k}x=r;f.RTL&&(x=aa-r-H());b.css({top:l,left:x});
lb(b,p[e],d);d++}});b=m[0];for(i=1;i<x;i++)b=Math.max(b,m[i]);e.conTn.width(aa).height(b)}function dc(){var b=e.conTnParent.width(),c=0,a=0,d=0,m=[],u=0,g=[],k=!1,r=0,l=0,x=0,aa=0,v=f.thumbnailGutterWidth,P=f.thumbnailGutterHeight,t=0,q=0,y=!1,z=!1,s=e.conTn.find(".nanoGalleryThumbnailContainer");s.each(function(){var a=jQuery(this).data("index");if(void 0!==a&&void 0!=p[a])if(0<p[a].thumbImg().width){var d=p[a],e=Math.floor(d.thumbImg().width/d.thumbImg().height*w())+h.borderWidth+h.imgcBorderWidth;
f.thumbnailFeatured&&0==r&&(x=e*=2);k&&(k=!1,u++,c=0,z=y=!1,1==u&&0<x&&(c=x,x=0));d.thumbImg().height>d.thumbImg().width?y=!0:z=!0;c+e+v<b?(c+=e+v,g[u]=w(),d=Math.max(y?t:0,z?q:0),f.thumbnailAdjustLastRowHeight&&0<d&&(g[u]=Math.min(g[u],d)),m[u]=a):(c+=e,d=Math.floor(w()*b/c),g[u]=d,y&&(t=Math.max(t,d)),z&&(q=Math.max(q,d)),m[u]=a,k=!0);r++}else return!1});r=a=d=u=0;s.each(function(){var c=jQuery(this),e=c.data("index");if(void 0!==e&&void 0!=p[e])if(0<p[e].thumbImg().width){var k=p[e],x=Math.floor(k.thumbImg().width/
k.thumbImg().height*g[u]);0==r&&f.thumbnailFeatured&&(x*=2,l=1==g.length?2*parseInt(g[0]):parseInt(g[0])+parseInt(g[1])+h.borderHeight+h.imgcBorderHeight);e==m[u]&&(m.length!=u+1?x=b-a-h.borderWidth-h.imgcBorderWidth:a+x+h.borderWidth+h.imgcBorderWidth+v>b&&(x=b-a-h.borderWidth-h.imgcBorderWidth));var t=0;0==r&&f.thumbnailFeatured?(t=l,aa=x+h.borderWidth+h.imgcBorderWidth,k.customData.featured=!0,c.find("img").attr("src",k.thumbX2src)):t=g[u];t=parseInt(t);x=parseInt(x);c.width(x+h.imgcBorderWidth).height(t+
h.imgcBorderHeight+h.labelHeight);c.find(".imgContainer").height(t).width(x);c.find("img").css({"max-height":t+2,"max-width":x+2});c.find(".subcontainer").width(x+h.imgcBorderWidth).height(t+h.imgcBorderHeight+h.labelHeight);var q=a;f.RTL&&(q=b-a-(x+h.borderWidth+h.imgcBorderWidth));c.css({top:d,left:q});k.thumbFullWidth=x+h.borderWidth+h.imgcBorderWidth;k.thumbFullHeight=t+h.borderHeight+h.imgcBorderHeight+h.labelHeight;mb(c);lb(c,k,r);a+=x+h.borderWidth+h.imgcBorderWidth+v;e==m[u]&&(d+=g[u]+h.labelHeight+
P+h.imgcBorderHeight+h.borderHeight,u++,a=0,1==u&&0<aa&&(a=aa,aa=0));r++}else return!1});0<u&&(d-=P);l=l+da()+h.labelHeight;e.conTn.width(b).height(d>l?d:l)}function wa(){var b=l()+h.borderWidth+h.imgcBorderWidth,c=e.conTnParent.width(),a=0,a="justified"==f.thumbnailAlignment?Math.floor(c/b):Math.floor((c+f.thumbnailGutterWidth)/(b+f.thumbnailGutterWidth));0<f.maxItemsPerLine&&a>f.maxItemsPerLine&&(a=f.maxItemsPerLine);1>a&&(a=1);return a}function ec(){var b=0,c=0,a=0,d=f.thumbnailGutterHeight,m=
e.conTnParent.width(),h=wa(),g=0,k=0,r=0,x=[],l=0;wa();if(0<T&&0<H()&&h!=ka){ka=h;var t=e.conPagin.data("galleryIdx");ya(t,0)}else{var t=e.conTn.find(".nanoGalleryThumbnailContainer"),v=t.length;"justified"==f.thumbnailAlignment?(h=Math.min(h,v),a=1==h?0:(m-h*H())/(h-1)):a=f.thumbnailGutterWidth;f.RTL&&(t.each(function(){if(void 0!==jQuery(this).data("index")){if(0==c)b=l*(H()+a),r=x[l]=b;else return!1;l++;l>=h&&(l=0,c+=da()+d)}}),m=r+H(),l=c=0);t.each(function(){var e=jQuery(this),t=e.data("index");
if(void 0!==t){0==c?(b=l*(H()+a),r=x[l]=b):(b=x[l],k=c);var v=b;f.RTL&&(v=parseInt(m)-b-H());e.css({top:c,left:v});lb(e,p[t],g);l++;l>=h&&(l=0,c+=da()+d);g++}});e.conTn.width(r+H()).height(k+da())}}function lb(b,c,a){0==b.css("opacity")&&(b.removeClass("nanogalleryHideElement"),f.thumbnailDisplayTransition?"function"==typeof f.fnThumbnailDisplayEffect?f.fnThumbnailDisplayEffect(b,c,0):b.delay(a*h.displayInterval).fadeTo(150,1):b.css({opacity:1}))}function jb(){var b=e.conTn.find(".nanoGalleryThumbnailContainer").filter(function(){return Gb(jQuery(this),
h.lazyLoadTreshold)});jQuery(b).each(function(){var b=jQuery(this).find("img");if("data:image/gif;base64,R0lGODlhEAAQAIAAAP///////yH5BAEKAAEALAAAAAAQABAAAAIOjI+py+0Po5y02ouzPgUAOw=="==jQuery(b).attr("src")){var a=jQuery(this).data("index");void 0!=a&&void 0!=p[a]&&(jQuery(b).attr("src",""),jQuery(b).attr("src",p[a].thumbImg().src))}})}function fc(b,c){if(void 0!=e.conPagin)if(e.conPagin.children().remove(),0==T||"auto"==w()||"auto"==l())e.conPagin.hide();else{e.conPagin.show();e.conPagin.data("galleryIdx",
b);e.conPagin.data("currentPageNumber",c);var a=0,d=0;if(0<c){var m=jQuery('<div class="paginationPrev">'+O.paginationPrevious+"</div>").appendTo(e.conPagin),d=d+jQuery(m).outerWidth(!0);m.click(function(a){vb()})}m=0;0<T&&"auto"!=w()&&"auto"!=l()&&(a=Math.ceil(p[b].contentLength/(T*ka)));5<=c?(m=c-5,a>c+6&&(a=c+6)):10<a&&(a=10);if(1==a)e.conPagin.hide();else{for(;m<a;m++){var f="";m==c&&(f=" currentPage");f=jQuery('<div class="paginationItem'+f+'">'+(m+1)+"</div>").appendTo(e.conPagin);f.data("pageNumber",
m);d+=f.outerWidth(!0);f.click(function(a){a=e.conPagin.data("galleryIdx");var b=jQuery(this).data("pageNumber");xa(e.base,0)||$("html, body").animate({scrollTop:e.base.offset().top},200);ya(a,b)})}c+1<a&&(a=jQuery('<div class="paginationNext">'+O.paginationNext+"</div>").appendTo(e.conPagin),d+=a.outerWidth(!0),a.click(function(a){wb()}));e.conPagin.width(d)}}}function wb(){var b=e.conPagin.data("galleryIdx"),c=0;0<T&&(c=p[b].contentLength/(T*ka));n2=Math.ceil(c);c=e.conPagin.data("currentPageNumber");
c<n2-1?c++:c=0;xa(e.base,0)||$("html, body").animate({scrollTop:e.base.offset().top},200);ya(b,c)}function vb(){var b=e.conPagin.data("galleryIdx"),c=0;0<T&&(c=p[b].contentLength/(T*ka));n2=Math.ceil(c);c=e.conPagin.data("currentPageNumber");0<c?c--:c=n2-1;xa(e.base,0)||$("html, body").animate({scrollTop:e.base.offset().top},250);ya(b,c)}function ya(b,c){Ua=-1;e.conTn.parent().animate({opacity:0},100).promise().done(function(){e.conTn.hide(0).off().show(0).html("");for(var a=p.length,d=0;d<a;d++)p[d].hovered=
!1;e.conTnParent.css({left:0,opacity:1});jQuery(e.conTn[0]).css({left:0});gc(b,c,hc)})}function gc(b,c,a){if(-1!=b&&void 0!=p[b]){p[b].paginationLastPage=c;p[b].paginationLastWidth=e.conTnParent.width();var d=p.length,m=0,g=0,k=0;0<T&&"auto"!=w()&&"auto"!=l()&&(k=c*T*ka);ea();var r=!1,x=!1,t=0;(function(){for(var e=0;e<f.galleryRenderStep;e++){if(t>=d){a(b,c);return}var v=p[t];if(v.albumID==p[b].GetID()){g++;if(0<T&&"auto"!=w()&&"auto"!=l()&&m+1>T*ka){a(b,c);return}if(g>k){m++;var q=xb(v,t,!1),P=
q.e$;!f.thumbnailLazyLoad||q.cIS||r||(Gb(P,h.lazyLoadTreshold)?(P.find("img").attr("src",""),P.find("img").attr("src",v.thumbImg().src),x=!0):x&&(r=!0))}}t++}t<d?setTimeout(arguments.callee,2):a(b,c)})()}}function hc(b,c){Ga();fc(b,c);Ua=b}function xb(b,c,a){var d=[],m=0,h="",g=" nanogalleryHideElement";f.thumbnailLazyLoad&&"auto"==l()&&(h="top:0px;left:0px;",g="");d[m++]='<div class="nanoGalleryThumbnailContainer'+g+'" style="display:block;opacity:0;'+h+'" ><div class="subcontainer" style="display:block;">';
h=!1;g="data:image/gif;base64,R0lGODlhEAAQAIAAAP///////yH5BAEKAAEALAAAAAAQABAAAAIOjI+py+0Po5y02ouzPgUAOw==";if("auto"==w()&&0==p[c].thumbImg().height||"auto"==l()&&0==p[c].thumbImg().width)h=!0;if(!f.thumbnailLazyLoad||h)g=b.thumbImg().src;var k=ic(b),r=jc(b);"auto"==w()?d[m++]='<div class="imgContainer" style="width:'+l()+'px;"><img class="image" src="'+g+'" alt=" " style="max-width:'+l()+'px;"></div>':"auto"==l()?d[m++]='<div class="imgContainer" style="height:'+w()+'px;"><img class="image" src="'+
g+'" alt=" " style="max-height:'+w()+'px;" ></div>':d[m++]='<div class="imgContainer" style="width:'+l()+"px;height:"+w()+'px;"><img class="image" src="'+g+'" alt=" " style="max-width:'+l()+"px;max-height:"+w()+'px;" ></div>';if("album"==b.kind){if(1==f.thumbnailLabel.display){if(0<b.contentLength)switch(f.thumbnailLabel.itemsCount){case "title":k+=" "+O.thumbnailLabelItemsCountPart1+"<span>"+b.contentLength+"</span>"+O.thumbnailLabelItemsCountPart2;break;case "description":r+=" "+O.thumbnailLabelItemsCountPart1+
"<span>"+b.contentLength+"</span>"+O.thumbnailLabelItemsCountPart2}d[m++]='<div class="labelImage" style="width:'+l()+"px;"+(f.RTL?"direction:RTL;":"")+'"><div class="labelFolderTitle labelTitle" >'+k+'</div><div class="labelDescription" >'+r+"</div></div>"}}else 1==f.thumbnailLabel.display&&(a&&0==r.length&&"onBottom"==f.thumbnailLabel.position&&(r="&nbsp;"),d[m++]='<div class="labelImage" style="width:'+l()+"px;"+(f.RTL?"direction:RTL;":"")+'"><div class="labelImageTitle labelTitle" >'+k+'</div><div class="labelDescription" >'+
r+"</div></div>");d[m++]="</div></div>";a=jQuery(d.join("")).appendTo(e.conTnHid);b.$elt=a;a.data("index",c);a.find("img").data("index",c);kc(a,b);a.detach().appendTo(e.conTn);Hb(a);if(h)ngimagesLoaded(a).on("always",function(a){var b=p[jQuery(a.images[0].img).data("index")];if(void 0!=b&&"data:image/gif;base64,R0lGODlhEAAQAIAAAP///////yH5BAEKAAEALAAAAAAQABAAAAIOjI+py+0Po5y02ouzPgUAOw=="!=a.images[0].img.src){var c=!1;b.thumbImg().height!=a.images[0].img.naturalHeight&&(b.thumbSetImgHeight(a.images[0].img.naturalHeight),
b.thumbSetImgWidth(a.images[0].img.naturalWidth),c=!0);b.thumbImg().width!=a.images[0].img.naturalWidth&&(b.thumbSetImgHeight(a.images[0].img.naturalHeight),b.thumbSetImgWidth(a.images[0].img.naturalWidth),c=!0);c&&(kb(b.$elt,b),mb(b.$elt),Ga())}});else kb(a,b),mb(a);return{e$:a,cIS:h}}function ic(b){b=b.title;if(1==f.thumbnailLabel.display){if(void 0===b||0==b.length)b="&nbsp;";""!=O.thumbnailImageTitle&&(b=O.thumbnailImageTitle);3<f.thumbnailLabel.titleMaxLength&&b.length>f.thumbnailLabel.titleMaxLength&&
(b=b.substring(0,f.thumbnailLabel.titleMaxLength)+"...")}return b}function jc(b){var c="";1==f.thumbnailLabel.displayDescription&&(c="album"==b.kind?""!=O.thumbnailImageDescription?O.thumbnailAlbumDescription:b.description:""!=O.thumbnailImageDescription?O.thumbnailImageDescription:b.description,3<f.thumbnailLabel.descriptionMaxLength&&c.length>f.thumbnailLabel.descriptionMaxLength&&(c=c.substring(0,f.thumbnailLabel.descriptionMaxLength)+"..."));return c}function kb(b,c){if("auto"==w()){if(0<c.thumbImg().height){var a=
c.thumbImg().height/c.thumbImg().width;b.find(".imgContainer").height(l()*a);"onBottom"==f.thumbnailLabel.position?(c.thumbLabelHeight=b.find(".labelImage").outerHeight(!0),c.thumbFullHeight=l()*a+c.thumbLabelHeight+h.borderHeight+h.imgcBorderHeight,b.width(H()-h.borderWidth).height(c.thumbFullHeight-h.borderHeight),b.find(".labelImage").css({position:"absolute",top:"",bottom:"0px"})):(c.thumbFullHeight=l()*a+c.thumbLabelHeight+h.borderHeight+h.imgcBorderHeight,b.width(H()-h.borderWidth).height(c.thumbFullHeight-
h.borderHeight))}c.thumbFullWidth=H();b.find(".subcontainer").width(H()-h.borderWidth).height(c.thumbFullHeight-h.borderHeight)}else"auto"!=l()&&(c.thumbFullHeight=da(),c.thumbFullWidth=H(),b.width(c.thumbFullWidth-h.borderWidth).height(c.thumbFullHeight-h.borderHeight),b.find(".subcontainer").width(c.thumbFullWidth-h.borderWidth).height(c.thumbFullHeight-h.borderHeight))}function kc(b,c){if("function"==typeof f.fnThumbnailInit)f.fnThumbnailInit(b,c,s());else if(f.thumbnailLabel.display)switch(f.thumbnailLabel.position){case "onBottom":b.find(".labelImage").css({top:0,
position:"relative",left:0,right:0});"auto"==w()?(b.find(".labelImageTitle").css({"white-space":"normal"}),b.find(".labelFolderTitle").css({"white-space":"normal"}),b.find(".labelDescription").css({"white-space":"normal"})):(b.find(".labelImageTitle").css({"white-space":"nowrap"}),b.find(".labelFolderTitle").css({"white-space":"nowrap"}),b.find(".labelDescription").css({"white-space":"nowrap"}));break;case "overImageOnTop":b.find(".labelImage").css({top:0,bottom:0,left:0,right:0});break;case "overImageOnMiddle":b.find(".labelImage").css({top:0,
bottom:0,left:0,right:0});b.find(".labelFolderTitle").css({left:0,right:0,position:"absolute",bottom:"50%"});b.find(".labelImageTitle").css({left:0,right:0,position:"absolute",bottom:"50%"});b.find(".labelDescription").css({left:0,right:0,position:"absolute",top:"50%"});break;default:f.thumbnailLabel.position="overImageOnBottom",b.find(".labelImage").css({bottom:0,left:0,right:0})}}function Ia(){for(var b=p.length,c=0;c<b;c++)p[c].hovered&&Ha(p[c].$elt)}function Hb(b){var c=b.data("index");if(void 0!=
c){var a=p[c];"function"==typeof f.fnThumbnailHoverInit&&f.fnThumbnailHoverInit(b,a,s());for(var d in a.eltTransform)delete a.eltTransform[d];for(j=0;j<C.length;j++)switch(C[j].name){case "imageSplit4":d=b.find(".subcontainer");var c=b.find(".labelImage"),m=b.find(".imgContainer");b.find(".imgContainer").css({position:"absolute"});d.css({overflow:"hidden",position:"relative",width:"100%",height:"100%"});d.prepend(m.clone());d.prepend(b.find(".imgContainer").clone());m=b.find(".imgContainer");L("",
m);B(a,"imgContainer0",m.eq(0));y(a,"imgContainer0");B(a,"imgContainer1",m.eq(1));y(a,"imgContainer1");B(a,"imgContainer2",m.eq(2));y(a,"imgContainer2");B(a,"imgContainer3",m.eq(3));y(a,"imgContainer3");break;case "imageSplitVert":d=b.find(".subcontainer");m=b.find(".imgContainer");m.css({position:"absolute"});d.css({overflow:"hidden",position:"relative"});d.prepend(m.clone());m=b.find(".imgContainer");L("",m);B(a,"imgContainer0",m.eq(0));y(a,"imgContainer0");B(a,"imgContainer1",m.eq(1));y(a,"imgContainer1");
break;case "labelSplit4":d=b.find(".subcontainer");c=b.find(".labelImage").css({top:0,bottom:0});d.css({overflow:"hidden",position:"relative"});c.clone().appendTo(d);b.find(".labelImage").clone().appendTo(d);c=b.find(".labelImage");B(a,"labelImage0",c.eq(0));y(a,"labelImage0");B(a,"labelImage1",c.eq(1));y(a,"labelImage1");B(a,"labelImage2",c.eq(2));y(a,"labelImage2");B(a,"labelImage3",c.eq(3));y(a,"labelImage3");break;case "labelSplitVert":d=b.find(".subcontainer");c=b.find(".labelImage");d.css({overflow:"hidden",
position:"relative"});c.clone().appendTo(d);c=b.find(".labelImage");B(a,"labelImage0",c.eq(0));y(a,"labelImage0");B(a,"labelImage1",c.eq(1));y(a,"labelImage1");break;case "labelAppearSplit4":d=b.find(".subcontainer");c=b.find(".labelImage");c.css({left:0,top:0,right:0,bottom:0});d.css({overflow:"hidden",position:"relative"});c.clone().appendTo(d);b.find(".labelImage").clone().appendTo(d);c=b.find(".labelImage");d=B(a,"labelImage0",c.eq(0));d.translateX=-a.thumbFullWidth/2;d.translateY=-a.thumbFullHeight/
2;y(a,"labelImage0");d=B(a,"labelImage1",c.eq(1));d.translateX=a.thumbFullWidth/2;d.translateY=-a.thumbFullHeight/2;y(a,"labelImage1");d=B(a,"labelImage2",c.eq(2));d.translateX=a.thumbFullWidth/2;d.translateY=a.thumbFullHeight/2;y(a,"labelImage2");d=B(a,"labelImage3",c.eq(3));d.translateX=-a.thumbFullWidth/2;d.translateY=a.thumbFullHeight/2;y(a,"labelImage3");break;case "labelAppearSplitVert":d=b.find(".subcontainer");c=b.find(".labelImage");d.css({overflow:"hidden",position:"relative"});c.clone().appendTo(d);
c=b.find(".labelImage");B(a,"labelImage0",c.eq(0)).translateX=-a.thumbFullWidth/2;y(a,"labelImage0");B(a,"labelImage1",c.eq(1)).translateX=a.thumbFullWidth/2;y(a,"labelImage1");break;case "imageScale150Outside":e.base.css({overflow:"visible"});e.conTn.css({overflow:"visible"});b.css({overflow:"visible"});b.find(".subcontainer").css({overflow:"visible"});b.find(".imgContainer").css({overflow:"visible"});B(a,"img0",b.find("img"));y(a,"img0");L(b.find(".imgContainer"),b.find(".labelImage"));break;case "scale120":e.base.css({overflow:"visible"});
e.conTn.css({overflow:"visible"});B(a,"base",b);y(a,"base");break;case "scaleLabelOverImage":d=b.find(".imgContainer");c=b.find(".labelImage");L(d,c);b.find(".labelImage").css({opacity:0});B(a,"labelImage0",c).scale=50;y(a,"labelImage0");B(a,"imgContainer0",d);y(a,"imgContainer0");break;case "overScale":b.css({overflow:"hidden"});d=b.find(".imgContainer");c=b.find(".labelImage");L("",c);c.css({opacity:0});d.css({opacity:1});B(a,"labelImage0",c).scale=150;y(a,"labelImage0");B(a,"imgContainer0",d);
y(a,"imgContainer0");break;case "overScaleOutside":e.base.css({overflow:"visible"});e.conTn.css({overflow:"visible"});b.css({overflow:"visible"});d=b.find(".imgContainer");c=b.find(".labelImage");L("",c);c.css({opacity:0});d.css({opacity:1});B(a,"labelImage0",c).scale=150;y(a,"labelImage0");B(a,"imgContainer0",d);y(a,"imgContainer0");break;case "rotateCornerBL":b.css({overflow:"hidden"});d=b.find(".labelImage");d.css({opacity:1});d[0].style[K+"Origin"]="100% 100%";B(a,"labelImage0",d).rotateZ=-90;
y(a,"labelImage0");d=b.find(".imgContainer");d[0].style[K+"Origin"]="100% 100%";B(a,"imgContainer0",d);y(a,"imgContainer0");break;case "rotateCornerBR":b.css({overflow:"hidden"});d=b.find(".labelImage");d.css({opacity:1});d[0].style[K+"Origin"]="0% 100%";B(a,"labelImage0",d).rotateZ=90;y(a,"labelImage0");d=b.find(".imgContainer");d[0].style[K+"Origin"]="0 100%";B(a,"imgContainer0",d);y(a,"imgContainer0");break;case "imageRotateCornerBL":d=b.find(".imgContainer");L(b,d);b.css({overflow:"hidden"});
b.find(".labelImage").css({opacity:1});d[0].style[K+"Origin"]="bottom right";B(a,"imgContainer0",d);y(a,"imgContainer0");break;case "imageRotateCornerBR":d=b.find(".imgContainer");L(b,d);b.css({overflow:"hidden"});b.find(".labelImage").css({opacity:1});d[0].style[K+"Origin"]="0 100%";B(a,"imgContainer0",d);y(a,"imgContainer0");break;case "slideUp":b.css({overflow:"hidden"});d=b.find(".labelImage");d.css({opacity:1,top:0});B(a,"labelImage0",d).translateY=a.thumbFullHeight;y(a,"labelImage0");d=b.find(".imgContainer");
d.css({left:0,top:0});B(a,"imgContainer0",d);y(a,"imgContainer0");break;case "slideDown":b.css({overflow:"hidden"});d=b.find(".labelImage");d.css({opacity:1,top:0});B(a,"labelImage0",d).translateY=-a.thumbFullHeight;y(a,"labelImage0");d=b.find(".imgContainer");d.css({left:0,top:0});B(a,"imgContainer0",d);y(a,"imgContainer0");break;case "slideRight":b.css({overflow:"hidden"});d=b.find(".labelImage");d.css({opacity:1,top:0});B(a,"labelImage0",d).translateX=-a.thumbFullWidth;y(a,"labelImage0");d=b.find(".imgContainer");
d.css({left:0,top:0});B(a,"imgContainer0",d);y(a,"imgContainer0");break;case "slideLeft":b.css({overflow:"hidden"});d=b.find(".labelImage");d.css({opacity:1,top:0});B(a,"labelImage0",d).translateX=a.thumbFullWidth;y(a,"labelImage0");d=b.find(".imgContainer");d.css({left:0,top:0});B(a,"imgContainer0",d);y(a,"imgContainer0");break;case "imageSlideUp":case "imageSlideDown":case "imageSlideRight":case "imageSlideLeft":d=b.find(".imgContainer");L(b,d);b.css({overflow:"visible"});b.find(".labelImage").css({opacity:1});
d.css({left:0,top:0});B(a,"imgContainer0",d);y(a,"imgContainer0");break;case "labelAppear":case "labelAppear75":var g="rgb("+G.oldLabelRed+","+G.oldLabelGreen+","+G.oldLabelBlue+",0)";b.find(".labelImage").css({backgroundColor:g});b.find(".labelImageTitle").css({opacity:0});b.find(".labelFolderTitle").css({opacity:0});b.find(".labelDescription").css({opacity:0});break;case "descriptionAppear":b.find(".labelDescription").css({opacity:0});break;case "labelSlideUpTop":b.css({overflow:"hidden"});b.find(".labelImage").css({top:0,
bottom:0});B(a,"labelImage0",b.find(".labelImage")).translateY=a.thumbFullHeight;y(a,"labelImage0");break;case "labelSlideUp":b.css({overflow:"hidden"});B(a,"labelImage0",b.find(".labelImage")).translateY=a.thumbFullHeight;y(a,"labelImage0");break;case "labelSlideDown":b.css({overflow:"hidden"});B(a,"labelImage0",b.find(".labelImage")).translateY=-a.thumbFullHeight;y(a,"labelImage0");break;case "descriptionSlideUp":b.css({overflow:"hidden"});c="album"==a.kind?b.find(".labelFolderTitle").outerHeight(!0):
b.find(".labelImageTitle").outerHeight(!0);b.find(".labelDescription").css({opacity:0});b.find(".labelImage").css({height:c});B(a,"labelImage0",b.find(".labelImage"));y(a,"labelImage0");break;case "imageExplode":L("",b);L(b.find(".labelImage"),b.find(".imgContainer"));d=b.find(".subcontainer");for(var c=7,m=b.find(".imgContainer"),k=m.outerWidth(!0)/c,r=m.outerHeight(!0),r=m.outerHeight(!0)/c,l=0;l<c;l++)for(g=0;g<c;g++){var x="rect("+r*l+"px, "+k*(g+1)+"px, "+r*(l+1)+"px, "+k*g+"px)";m.clone().appendTo(d).css({top:0,
scale:1,clip:x,left:0,position:"absolute"}).data("ngScale",1)}m.remove();break;case "imageFlipHorizontal":switch(f.thumbnailLabel.position){case "overImageOnTop":b.find(".labelImage").css({top:-h.imgcBorderHeight/2,bottom:h.imgcBorderWidth/2,left:0,right:0});break;case "overImageOnMiddle":b.find(".labelImage").css({top:-h.imgcBorderHeight/2,bottom:h.imgcBorderWidth/2,left:0,right:0});break;default:b.find(".labelImage").css({bottom:h.imgcBorderWidth/2,left:0,right:0})}e.base.css({overflow:"visible"});
e.conTn.css({overflow:"visible"});b.css({overflow:"visible"});L("",b);L(b.find(".labelImage"),b.find(".imgContainer"));d=b.find(".subcontainer");d.css({overflow:"visible"});d[0].style[Ib]="preserve-3d";c=Math.round(1.2*a.thumbFullHeight)+"px";d[0].style[Va]=c;d=b.find(".imgContainer");d[0].style[za]="hidden";B(a,"imgContainer0",d);y(a,"imgContainer0");b.find(".image")[0].style[za]="hidden";d=b.find(".labelImage");d[0].style[za]="hidden";B(a,"labelImage0",d).rotateX=180;y(a,"labelImage0");break;case "imageFlipVertical":switch(f.thumbnailLabel.position){case "overImageOnTop":b.find(".labelImage").css({top:-h.imgcBorderHeight/
2,bottom:h.imgcBorderWidth/2,left:0,right:0});break;case "overImageOnMiddle":b.find(".labelImage").css({top:-h.imgcBorderHeight/2,bottom:h.imgcBorderWidth/2,left:0,right:0});break;default:b.find(".labelImage").css({bottom:h.imgcBorderWidth/2,left:0,right:0})}e.base.css({overflow:"visible"});e.conTn.css({overflow:"visible"});b.css({overflow:"visible"});L("",b);L(b.find(".labelImage"),b.find(".imgContainer"));d=b.find(".subcontainer");d.css({overflow:"visible"});d[0].style[Ib]="preserve-3d";c=Math.round(1.2*
a.thumbFullWidth)+"px";d[0].style[Va]=c;d=b.find(".imgContainer");d[0].style[za]="hidden";B(a,"imgContainer0",d);y(a,"imgContainer0");b.find(".image")[0].style[za]="hidden";d=b.find(".labelImage");d[0].style[za]="hidden";B(a,"labelImage0",d).rotateY=180;y(a,"labelImage0");break;case "imageScale150":b.css({overflow:"hidden"});B(a,"img0",b.find("img"));y(a,"img0");break;case "imageScaleIn80":b.css({overflow:"hidden"});B(a,"img0",b.find("img")).scale=120;y(a,"img0");break;case "imageSlide2Up":case "imageSlide2Down":case "imageSlide2Left":case "imageSlide2Right":case "imageSlide2UpRight":case "imageSlide2UpLeft":case "imageSlide2DownRight":case "imageSlide2DownLeft":b.css({overflow:"hidden"});
a.customData.hoverEffectRDir=C[j].name;nb(b,a);break;case "imageSlide2Random":b.css({overflow:"hidden"}),c="imageSlide2Up imageSlide2Down imageSlide2Left imageSlide2Left imageSlide2UpRight imageSlide2UpLeft imageSlide2DownRight imageSlide2DownLeft".split(" "),a.customData.hoverEffectRDir=c[Math.floor(Math.random()*c.length)],nb(b,a)}a.hoverInitDone=!0}}function nb(b,c){var a=c.thumbFullWidth,d=c.thumbFullHeight,e=B(c,"img0",b.find("img"));e.scale=140;switch(c.customData.hoverEffectRDir){case "imageSlide2Up":e.translateY=
c.thumbFullHeight<1.4*c.thumbImg().height?(1.4*c.thumbImg().height-c.thumbFullHeight)/2:0;e.translateX=c.thumbFullWidth<1.4*c.thumbImg().width?-(1.4*c.thumbImg().width-c.thumbFullWidth)/2:0;break;case "imageSlide2Down":d=c.thumbFullHeight<1.4*c.thumbImg().height?Math.min((1.4*c.thumbImg().height-c.thumbFullHeight)/2*.1,.1*d):0;e.translateY=-d;a=c.thumbFullWidth<1.4*c.thumbImg().width?Math.min((1.4*c.thumbImg().width-c.thumbFullWidth)/2*.1,.1*a):0;e.translateX=a;break;case "imageSlide2Left":e.translateY=
.1*-d;e.translateX=.1*a;break;case "imageSlide2Right":e.translateY=.1*-d;e.translateX=.1*-a;break;case "imageSlide2UpRight":e.translateY=.05*d;e.translateX=.05*-a;break;case "imageSlide2UpLeft":e.translateY=.05*d;e.translateX=.05*a;break;case "imageSlide2DownRight":e.translateY=.05*-d;e.translateX=.05*-a;break;case "imageSlide2DownLeft":e.translateY=.05*-d,e.translateX=.05*a}y(c,"img0")}function mb(b){var c=b.data("index");if(void 0!=c){var a=p[c];if(a.hoverInitDone)for("function"==typeof f.fnThumbnailHoverResize&&
f.fnThumbnailHoverResize(b,a,s()),j=0;j<C.length;j++)switch(C[j].name){case "imageSplit4":var c=a.thumbFullWidth-h.borderWidth-h.imgcBorderWidth,d=a.thumbFullHeight-h.borderHeight-h.imgcBorderHeight,e=b.find(".imgContainer"),g="rect(0px, "+Math.ceil(c/2)+"px, "+Math.ceil(d/2)+"px, 0px)";e.eq(0).css({clip:g});g="rect(0px, "+c+"px, "+Math.ceil(d/2)+"px, "+Math.ceil(c/2)+"px)";e.eq(1).css({clip:g});g="rect("+Math.ceil(d/2)+"px, "+c+"px, "+d+"px, "+Math.ceil(c/2)+"px)";e.eq(2).css({clip:g});g="rect("+
Math.ceil(d/2)+"px, "+Math.ceil(c/2)+"px, "+d+"px, 0px)";e.eq(3).css({clip:g});break;case "imageSplitVert":e=b.find(".imgContainer");c=a.thumbFullWidth-h.borderWidth-h.imgcBorderWidth;d=a.thumbFullHeight-h.borderHeight-h.imgcBorderHeight;g="rect(0px, "+Math.ceil(c/2)+"px, "+d+"px, 0px)";e.eq(0).css({clip:g});g="rect(0px, "+c+"px, "+d+"px, "+Math.ceil(c/2)+"px)";e.eq(1).css({clip:g});break;case "labelSplit4":c=a.thumbFullWidth-h.borderWidth-h.imgcBorderWidth;d=a.thumbFullHeight-h.borderHeight-h.imgcBorderHeight;
e=b.find(".labelImage");g="rect(0px, "+Math.ceil(c/2)+"px, "+Math.ceil(d/2)+"px, 0px)";e.eq(0).css({clip:g});g="rect(0px, "+c+"px, "+Math.ceil(d/2)+"px, "+Math.ceil(c/2)+"px)";e.eq(1).css({clip:g});g="rect("+Math.ceil(d/2)+"px, "+c+"px, "+d+"px, "+Math.ceil(c/2)+"px)";e.eq(2).css({clip:g});g="rect("+Math.ceil(d/2)+"px, "+Math.ceil(c/2)+"px, "+d+"px, 0px)";e.eq(3).css({clip:g});break;case "labelSplitVert":c=a.thumbFullWidth-h.borderWidth-h.imgcBorderWidth;d=a.thumbFullHeight-h.borderHeight-h.imgcBorderHeight;
e=b.find(".labelImage");g="rect(0px, "+Math.ceil(c/2)+"px, "+d+"px, 0px)";e.eq(0).css({clip:g});g="rect(0px, "+c+"px, "+d+"px, "+Math.ceil(c/2)+"px)";e.eq(1).css({clip:g});break;case "labelAppearSplit4":c=a.thumbFullWidth-h.borderWidth-h.imgcBorderWidth;d=a.thumbFullHeight-h.borderHeight-h.imgcBorderHeight;e=b.find(".labelImage");g="rect(0px, "+Math.ceil(c/2)+"px, "+Math.ceil(d/2)+"px, 0px)";e.eq(0).css({clip:g});g="rect(0px, "+c+"px, "+Math.ceil(d/2)+"px, "+Math.ceil(c/2)+"px)";e.eq(1).css({clip:g});
g="rect("+Math.ceil(d/2)+"px, "+c+"px, "+d+"px, "+Math.ceil(c/2)+"px)";e.eq(2).css({clip:g});g="rect("+Math.ceil(d/2)+"px, "+Math.ceil(c/2)+"px, "+d+"px, 0px)";e.eq(3).css({clip:g});a.eltTransform.labelImage0.translateX=-a.thumbFullWidth/2;a.eltTransform.labelImage0.translateY=-a.thumbFullHeight/2;y(a,"labelImage0");a.eltTransform.labelImage1.translateX=a.thumbFullWidth/2;a.eltTransform.labelImage1.translateY=-a.thumbFullHeight/2;y(a,"labelImage1");a.eltTransform.labelImage2.translateX=a.thumbFullWidth/
2;a.eltTransform.labelImage2.translateY=a.thumbFullHeight/2;y(a,"labelImage2");a.eltTransform.labelImage3.translateX=-a.thumbFullWidth/2;a.eltTransform.labelImage3.translateY=a.thumbFullHeight/2;y(a,"labelImage3");break;case "labelAppearSplitVert":c=a.thumbFullWidth-h.borderWidth-h.imgcBorderWidth;d=a.thumbFullHeight-h.borderHeight-h.imgcBorderHeight;e=b.find(".labelImage");g="rect(0px, "+Math.ceil(c/2)+"px, "+d+"px, 0px)";e.eq(0).css({clip:g});g="rect(0px, "+c+"px, "+d+"px, "+Math.ceil(c/2)+"px)";
e.eq(1).css({clip:g});a.eltTransform.labelImage0.translateX=-a.thumbFullWidth/2;y(a,"labelImage0");a.eltTransform.labelImage1.translateX=a.thumbFullWidth/2;y(a,"labelImage1");break;case "slideUp":a.eltTransform.labelImage0.translateY=a.thumbFullHeight;y(a,"labelImage0");break;case "slideDown":a.eltTransform.labelImage0.translateY=-a.thumbFullHeight;y(a,"labelImage0");break;case "slideRight":a.eltTransform.labelImage0.translateX=-a.thumbFullWidth;y(a,"labelImage0");break;case "slideLeft":a.eltTransform.labelImage0.translateX=
a.thumbFullWidth;y(a,"labelImage0");break;case "imageExplode":b.find(".subcontainer");e=b.find(".imgContainer");c=Math.sqrt(e.length);e.eq(0).outerWidth(!0);e.eq(0).outerHeight(!0);for(d=0;d<c;d++)for(e=0;e<c;e++);break;case "imageFlipHorizontal":d=b.find(".subcontainer");c=Math.round(1.2*a.thumbFullHeight)+"px";d[0].style[Va]=c;break;case "imageFlipVertical":d=b.find(".subcontainer");c=Math.round(1.2*a.thumbFullWidth)+"px";d[0].style[Va]=c;break;case "imageSlide2Up":case "imageSlide2Down":case "imageSlide2Left":case "imageSlide2Right":case "imageSlide2UpRight":case "imageSlide2UpLeft":case "imageSlide2DownRight":case "imageSlide2DownLeft":case "imageSlide2Random":nb(b,
a);break;case "slideUp":a.eltTransform.labelImage0.translateY=a.thumbFullHeight;y(a,"labelImage0");break;case "slideDown":a.eltTransform.labelImage0.translateY=-a.thumbFullHeight;y(a,"labelImage0");break;case "slideRight":a.eltTransform.labelImage0.translateX=-a.thumbFullWidth;y(a,"labelImage0");break;case "slideLeft":a.eltTransform.labelImage0.translateX=a.thumbFullWidth;y(a,"labelImage0");break;case "labelSlideUpTop":case "labelSlideUp":a.eltTransform.labelImage0.translateY=a.thumbFullHeight;y(a,
"labelImage0");break;case "labelSlideDown":b.css({overflow:"hidden"}),a.eltTransform.labelImage0.translateY=-a.thumbFullHeight,y(a,"labelImage0")}else Hb(b)}}function B(b,c,a){void 0==b.eltTransform[c]&&(b.eltTransform[c]={translateX:0,translateY:0,rotateX:0,rotateY:0,rotateZ:0,scale:100},b.eltTransform[c].$elt=a);return b.eltTransform[c]}function y(b,c){var a=b.eltTransform[c],d="translateX("+a.translateX+"px) translateY("+a.translateY+"px) scale("+a.scale/100+")",d=9>=Jb||lc?d+(" rotate("+a.rotateZ+
"deg)"):d+(" rotateX("+a.rotateX+"deg) rotateY("+a.rotateY+"deg) rotateZ("+a.rotateZ+"deg)");void 0!=a.$elt[0]&&(a.$elt[0].style[K]=d)}function t(b,c,a,d,e){var f="translateX translateY scale rotateX rotateY rotateZ".split(" ");if("animate"==F)for(var h=0;h<f.length;h++){var g=f[h];if(void 0!==a[g]){var k={v:parseInt(d.eltTransform[e][g]),item:d,tf:g,eltClass:e,to:parseInt(a[g])},p={v:parseInt(a[g])};0<C[c].delay?jQuery(k).delay(C[c].delay).animate(p,{duration:C[c].duration,easing:C[c].easing,queue:!1,
step:function(a){this.item.hovered&&(d.eltTransform[this.eltClass][this.tf]=a,y(this.item,this.eltClass))},complete:function(){this.item.hovered&&(d.eltTransform[this.eltClass][this.tf]=this.to,y(this.item,this.eltClass))}}):jQuery(k).animate(p,{duration:C[c].duration,easing:C[c].easing,queue:!1,step:function(a){this.item.hovered&&(d.eltTransform[this.eltClass][this.tf]=a,y(this.item,this.eltClass))},complete:function(){this.item.hovered&&(d.eltTransform[this.eltClass][this.tf]=this.to,y(this.item,
this.eltClass))}});delete a[g]}}if(0!=a.length)if(0<C[c].delay)if("transition"==F)b.delay(C[c].delay)[F](a,C[c].duration,C[c].easing);else b.delay(C[c].delay)[F](a,{duration:C[c].duration,easing:C[c].easing,queue:!1});else if("transition"==F)b[F](a,C[c].duration,C[c].easing);else b[F](a,{duration:C[c].duration,easing:C[c].easing,queue:!1})}function cb(b){var c=b.data("index");if(void 0!=c){"velocity"==F?b.find("*").velocity("stop",!0):b.find("*").stop(!0,!1);var a=p[c];a.hovered=!0;var d="animate"==
F?1:100;"function"==typeof f.fnThumbnailHover&&f.fnThumbnailHover(b,a,s());try{for(j=0;j<C.length;j++)switch(C[j].name){case "imageSplit4":var e=b.find(".imgContainer");t(e.eq(0),j,{translateX:-a.thumbFullWidth/2,translateY:-a.thumbFullHeight/2},a,"imgContainer0");t(e.eq(1),j,{translateX:a.thumbFullWidth/2,translateY:-a.thumbFullHeight/2},a,"imgContainer1");t(e.eq(2),j,{translateX:a.thumbFullWidth/2,translateY:a.thumbFullHeight/2},a,"imgContainer2");t(e.eq(3),j,{translateX:-a.thumbFullWidth/2,translateY:a.thumbFullHeight/
2},a,"imgContainer3");break;case "imageSplitVert":e=b.find(".imgContainer");t(e.eq(0),j,{translateX:-a.thumbFullWidth/2},a,"imgContainer0");t(e.eq(1),j,{translateX:a.thumbFullWidth/2},a,"imgContainer1");break;case "labelSplit4":e=b.find(".labelImage");t(e.eq(0),j,{translateX:-a.thumbFullWidth/2,translateY:-a.thumbFullHeight/2},a,"labelImage0");t(e.eq(1),j,{translateX:a.thumbFullWidth/2,translateY:-a.thumbFullHeight/2},a,"labelImage1");t(e.eq(2),j,{translateX:a.thumbFullWidth/2,translateY:a.thumbFullHeight/
2},a,"labelImage2");t(e.eq(3),j,{translateX:-a.thumbFullWidth/2,translateY:a.thumbFullHeight/2},a,"labelImage3");break;case "labelSplitVert":e=b.find(".labelImage");t(e.eq(0),j,{translateX:-a.thumbFullWidth/2},a,"labelImage0");t(e.eq(1),j,{translateX:a.thumbFullWidth/2},a,"labelImage1");break;case "labelAppearSplit4":e=b.find(".labelImage");t(e.eq(0),j,{translateX:0,translateY:0},a,"labelImage0");t(e.eq(1),j,{translateX:0,translateY:0},a,"labelImage1");t(e.eq(2),j,{translateX:0,translateY:0},a,"labelImage2");
t(e.eq(3),j,{translateX:0,translateY:0},a,"labelImage3");break;case "labelAppearSplitVert":e=b.find(".labelImage");t(e.eq(0),j,{translateX:0},a,"labelImage0");t(e.eq(1),j,{translateX:0},a,"labelImage1");break;case "scaleLabelOverImage":t(b.find(".labelImage"),j,{scale:100/d,opacity:1},a,"labelImage0");t(b.find(".imgContainer"),j,{scale:50/d},a,"imgContainer0");break;case "overScale":case "overScaleOutside":t(b.find(".labelImage"),j,{opacity:1,scale:100/d},a,"labelImage0");t(b.find(".imgContainer"),
j,{opacity:0,scale:50/d},a,"imgContainer0");break;case "imageInvisible":t(b.find(".imgContainer"),j,{opacity:0},a);break;case "rotateCornerBL":var h="transition"==F?{rotate:"0deg"}:{rotateZ:"0"};t(b.find(".labelImage"),j,h,a,"labelImage0");h="transition"==F?{rotate:"90deg"}:{rotateZ:"90"};t(b.find(".imgContainer"),j,h,a,"imgContainer0");break;case "rotateCornerBR":h="transition"==F?{rotate:"0deg"}:{rotateZ:"0"};t(b.find(".labelImage"),j,h,a,"labelImage0");h="transition"==F?{rotate:"-90deg"}:{rotateZ:"-90"};
t(b.find(".imgContainer"),j,h,a,"imgContainer0");break;case "imageRotateCornerBL":h="transition"==F?{rotate:"90deg"}:{rotateZ:"90"};t(b.find(".imgContainer"),j,h,a,"imgContainer0");break;case "imageRotateCornerBR":h="transition"==F?{rotate:"-90deg"}:{rotateZ:"-90"};t(b.find(".imgContainer"),j,h,a,"imgContainer0");break;case "slideUp":t(b.find(".imgContainer"),j,{translateY:-a.thumbFullHeight},a,"imgContainer0");t(b.find(".labelImage"),j,{translateY:0},a,"labelImage0");break;case "slideDown":t(b.find(".imgContainer"),
j,{translateY:a.thumbFullHeight},a,"imgContainer0");t(b.find(".labelImage"),j,{translateY:0},a,"labelImage0");break;case "slideRight":t(b.find(".imgContainer"),j,{translateX:a.thumbFullWidth},a,"imgContainer0");t(b.find(".labelImage"),j,{translateX:0},a,"labelImage0");break;case "slideLeft":t(b.find(".imgContainer"),j,{translateX:-a.thumbFullWidth},a,"imgContainer0");t(b.find(".labelImage"),j,{translateX:0},a,"labelImage0");break;case "imageSlideUp":t(b.find(".imgContainer"),j,{translateY:-a.thumbFullHeight},
a,"imgContainer0");break;case "imageSlideDown":t(b.find(".imgContainer"),j,{translateY:a.thumbFullHeight},a,"imgContainer0");break;case "imageSlideLeft":t(b.find(".imgContainer"),j,{translateX:-a.thumbFullWidth},a,"imgContainer0");break;case "imageSlideRight":t(b.find(".imgContainer"),j,{translateX:a.thumbFullWidth},a,"imgContainer0");break;case "labelAppear":if("velocity"==F)t(b.find(".labelImage"),j,{backgroundColorRed:G.oldLabelRed,backgroundColorGreen:G.oldLabelGreen,backgroundColorBlue:G.oldLabelBlue,
backgroundColorAlpha:1},a);else{var g="rgba("+G.oldLabelRed+","+G.oldLabelGreen+","+G.oldLabelBlue+",1)";t(b.find(".labelImage"),j,{backgroundColor:g},a)}t(b.find(".labelImageTitle"),j,{opacity:1},a);t(b.find(".labelFolderTitle"),j,{opacity:1},a);t(b.find(".labelDescription"),j,{opacity:1},a);break;case "labelAppear75":"velocity"==F?t(b.find(".labelImage"),j,{backgroundColorRed:G.oldLabelRed,backgroundColorGreen:G.oldLabelGreen,backgroundColorBlue:G.oldLabelBlue,backgroundColorAlpha:.75},a):(g="rgba("+
G.oldLabelRed+","+G.oldLabelGreen+","+G.oldLabelBlue+",0.75)",t(b.find(".labelImage"),j,{backgroundColor:g},a));t(b.find(".labelImageTitle"),j,{opacity:1},a);t(b.find(".labelFolderTitle"),j,{opacity:1},a);t(b.find(".labelDescription"),j,{opacity:1},a);break;case "descriptionAppear":t(b.find(".labelDescription"),j,{opacity:1},a);break;case "labelSlideDown":t(b.find(".labelImage"),j,{translateY:0},a,"labelImage0");break;case "labelSlideUpTop":case "labelSlideUp":t(b.find(".labelImage"),j,{translateY:0},
a,"labelImage0");break;case "descriptionSlideUp":var k="album"==a.kind?b.find(".labelFolderTitle").outerHeight(!0):b.find(".labelImageTitle").outerHeight(!0),r=b.find(".labelDescription").outerHeight(!0),l=a.thumbFullHeight-k-r;0>l&&(l=0);t(b.find(".labelImage"),j,{translateY:0,height:k+r},a,"labelImage0");t(b.find(".labelDescription"),j,{opacity:1},a);break;case "labelOpacity50":t(b.find(".labelImage"),j,{opacity:.5},a);break;case "imageOpacity50":t(b.find(".imgContainer"),j,{opacity:.5},a);break;
case "borderLighter":if("velocity"==F){var x=Wa(G.oldBorderColor,.5,!1),v=x.substring(x.indexOf("(")+1,x.lastIndexOf(")")).split(/,\s*/);t(b,j,{borderColorRed:v[0],borderColorGreen:v[1],borderColorBlue:v[2],colorAlpha:v[3]},a)}else t(b,j,{borderColor:Wa(G.oldBorderColor,.5,!1)},a);break;case "borderDarker":"velocity"==F?(x=Wa(G.oldBorderColor,.5,!0),v=x.substring(x.indexOf("(")+1,x.lastIndexOf(")")).split(/,\s*/),t(b,j,{borderColorRed:v[0],borderColorGreen:v[1],borderColorBlue:v[2],colorAlpha:v[3]},
a)):t(b,j,{borderColor:Wa(G.oldBorderColor,.5,!0)},a);break;case "imageScale150":t(b.find("img"),j,{scale:150/d},a,"img0");break;case "imageScaleIn80":t(b.find("img"),j,{scale:100/d},a,"img0");break;case "imageSlide2Up":case "imageSlide2Down":case "imageSlide2Left":case "imageSlide2Right":case "imageSlide2UpRight":case "imageSlide2UpLeft":case "imageSlide2DownRight":case "imageSlide2DownLeft":case "imageSlide2Random":switch(a.customData.hoverEffectRDir){case "imageSlide2Up":var q=a.thumbFullHeight<
1.4*a.imgHeight?(1.4*a.imgHeight-a.thumbFullHeight)/2:0;t(b.find("img"),j,{translateY:-q},a,"img0");break;case "imageSlide2Down":q=a.thumbFullHeight<1.4*a.imgHeight?(1.4*a.imgHeight-a.thumbFullHeight)/2:0;t(b.find("img"),j,{translateY:q},a,"img0");break;case "imageSlide2Left":t(b.find("img"),j,{translateX:.1*-a.thumbFullWidth},a,"img0");break;case "imageSlide2Right":t(b.find("img"),j,{translateX:.1*a.thumbFullWidth},a,"img0");break;case "imageSlide2UpRight":t(b.find("img"),j,{translateY:.05*-a.thumbFullHeight,
translateX:.05*a.thumbFullWidth},a,"img0");break;case "imageSlide2UpLeft":t(b.find("img"),j,{translateY:.05*-a.thumbFullHeight,translateX:.05*-a.thumbFullWidth},a,"img0");break;case "imageSlide2DownRight":t(b.find("img"),j,{translateY:.05*a.thumbFullHeight,translateX:.05*a.thumbFullWidth},a,"img0");break;case "imageSlide2DownLeft":t(b.find("img"),j,{translateY:.05*a.thumbFullHeight,translateX:.05*-a.thumbFullWidth},a,"img0")}break;case "imageScale150Outside":L("",b);t(b.find("img"),j,{scale:150/d},
a,"img0");break;case "scale120":L("",b);t(b,j,{scale:120/d},a,"base");break;case "imageExplode":L("",b);for(var P=b.find(".imgContainer"),c=Math.sqrt(P.length),y=[],z=0;z<=Math.PI;z+=Math.PI/(c-1))y.push(Math.sin(z));for(var w=P.outerWidth(!0)/c,N=P.outerHeight(!0)/c,h=z=0;h<c;h++)for(g=0;g<c;g++)t(P.eq(z++),j,{top:(-N*c/3+N*h-N)*y[g],left:(-w*c/3+w*g-w)*y[h],scale:1.5,opacity:0},a);break;case "imageFlipHorizontal":L("",b);t(b.find(".imgContainer"),j,{rotateX:180},a,"imgContainer0");t(b.find(".labelImage"),
j,{rotateX:360},a,"labelImage0");break;case "imageFlipVertical":L("",b),t(b.find(".imgContainer"),j,{rotateY:180},a,"imgContainer0"),t(b.find(".labelImage"),j,{rotateY:360},a,"labelImage0")}}catch(pa){R("error on hover "+pa.message)}}}function z(b,c,a,d,e){var f="translateX translateY scale rotateX rotateY rotateZ".split(" ");if("animate"==F)for(var h=0;h<f.length;h++){var g=f[h];if(void 0!==a[g]){var k={v:parseInt(d.eltTransform[e][g]),item:d,tf:g,eltClass:e,to:parseInt(a[g])},p={v:parseInt(a[g])};
0<C[c].delayBack?jQuery(k).delay(C[c].delayBack).animate(p,{duration:C[c].durationBack,easing:C[c].easingBack,queue:!1,step:function(a){d.eltTransform[this.eltClass][this.tf]=a;y(this.item,this.eltClass)},complete:function(){d.eltTransform[this.eltClass][this.tf]=this.to;y(this.item,this.eltClass)}}):jQuery(k).animate(p,{duration:C[c].durationBack,easing:C[c].easingBack,queue:!1,step:function(a){d.eltTransform[this.eltClass][this.tf]=a;y(this.item,this.eltClass)},complete:function(){d.eltTransform[this.eltClass][this.tf]=
this.to;y(this.item,this.eltClass)}});delete a[g]}}if(0!=a.length)if(0<C[c].delay)if("transition"==F)b.delay(C[c].delayBack)[F](a,C[c].durationBack,C[c].easingBack);else b.delay(C[c].delayBack)[F](a,{duration:C[c].durationBack,easing:C[c].easingBack,queue:!1});else if("transition"==F)b[F](a,C[c].durationBack,C[c].easingBack);else b[F](a,{duration:C[c].durationBack,easing:C[c].easingBack,queue:!1})}function Ha(b){if(!S){var c=b.data("index");if(void 0!=c){"velocity"==F?b.find("*").velocity("stop",
!0):b.find("*").filter(":animated").stop(!0,!1);var a=p[c];a.hovered=!1;var d="animate"==F?1:100;"function"==typeof f.fnThumbnailHoverOut&&f.fnThumbnailHoverOut(b,a,s());try{for(j=0;j<C.length;j++)switch(C[j].name){case "imageSplit4":var e=b.find(".imgContainer");z(e.eq(0),j,{translateX:0,translateY:0},a,"imgContainer0");z(e.eq(1),j,{translateX:0,translateY:0},a,"imgContainer1");z(e.eq(2),j,{translateX:0,translateY:0},a,"imgContainer2");z(e.eq(3),j,{translateX:0,translateY:0},a,"imgContainer3");break;
case "imageSplitVert":e=b.find(".imgContainer");z(e.eq(0),j,{translateX:0},a,"imgContainer0");z(e.eq(1),j,{translateX:0},a,"imgContainer1");break;case "labelSplit4":e=b.find(".labelImage");z(e.eq(0),j,{translateX:0,translateY:0},a,"labelImage0");z(e.eq(1),j,{translateX:0,translateY:0},a,"labelImage1");z(e.eq(2),j,{translateX:0,translateY:0},a,"labelImage2");z(e.eq(3),j,{translateX:0,translateY:0},a,"labelImage3");break;case "labelSplitVert":e=b.find(".labelImage");z(e.eq(0),j,{translateX:0},a,"labelImage0");
z(e.eq(1),j,{translateX:0},a,"labelImage1");break;case "labelAppearSplit4":e=b.find(".labelImage");z(e.eq(0),j,{translateX:-a.thumbFullWidth/2,translateY:-a.thumbFullHeight/2},a,"labelImage0");z(e.eq(1),j,{translateX:a.thumbFullWidth/2,translateY:-a.thumbFullHeight/2},a,"labelImage1");z(e.eq(2),j,{translateX:a.thumbFullWidth/2,translateY:a.thumbFullHeight/2},a,"labelImage2");z(e.eq(3),j,{translateX:-a.thumbFullWidth/2,translateY:a.thumbFullHeight/2},a,"labelImage3");break;case "labelAppearSplitVert":e=
b.find(".labelImage");z(e.eq(0),j,{translateX:-a.thumbFullWidth/2},a,"labelImage0");z(e.eq(1),j,{translateX:a.thumbFullWidth/2},a,"labelImage1");break;case "scaleLabelOverImage":z(b.find(".labelImage"),j,{opacity:0,scale:50/d},a,"labelImage0");z(b.find(".imgContainer"),j,{scale:100/d},a,"imgContainer0");break;case "overScale":case "overScaleOutside":z(b.find(".labelImage"),j,{opacity:0,scale:150/d},a,"labelImage0");z(b.find(".imgContainer"),j,{opacity:1,scale:100/d},a,"imgContainer0");break;case "imageInvisible":z(b.find(".imgContainer"),
j,{opacity:1});break;case "rotateCornerBL":var h="transition"==F?{rotate:"-90deg"}:{rotateZ:"-90"};z(b.find(".labelImage"),j,h,a,"labelImage0");h="transition"==F?{rotate:"0deg"}:{rotateZ:"0"};z(b.find(".imgContainer"),j,h,a,"imgContainer0");break;case "rotateCornerBR":h="transition"==F?{rotate:"90deg"}:{rotateZ:"90"};z(b.find(".labelImage"),j,h,a,"labelImage0");h="transition"==F?{rotate:"0deg"}:{rotateZ:"0"};z(b.find(".imgContainer"),j,h,a,"imgContainer0");break;case "imageRotateCornerBL":case "imageRotateCornerBR":h=
"transition"==F?{rotate:"0deg"}:{rotateZ:"0"};z(b.find(".imgContainer"),j,h,a,"imgContainer0");break;case "slideUp":z(b.find(".imgContainer"),j,{translateY:0},a,"imgContainer0");z(b.find(".labelImage"),j,{translateY:a.thumbFullHeight},a,"labelImage0");break;case "slideDown":z(b.find(".imgContainer"),j,{translateY:0},a,"imgContainer0");z(b.find(".labelImage"),j,{translateY:-a.thumbFullHeight},a,"labelImage0");break;case "slideRight":z(b.find(".imgContainer"),j,{translateX:0},a,"imgContainer0");z(b.find(".labelImage"),
j,{translateX:-a.thumbFullWidth},a,"labelImage0");break;case "slideLeft":z(b.find(".imgContainer"),j,{translateX:0},a,"imgContainer0");z(b.find(".labelImage"),j,{translateX:a.thumbFullWidth},a,"labelImage0");break;case "imageSlideUp":case "imageSlideDown":z(b.find(".imgContainer"),j,{translateY:0},a,"imgContainer0");break;case "imageSlideLeft":case "imageSlideRight":z(b.find(".imgContainer"),j,{translateX:0},a,"imgContainer0");break;case "labelAppear":case "labelAppear75":if("velocity"==F)z(b.find(".labelImage"),
j,{backgroundColorRed:G.oldLabelRed,backgroundColorGreen:G.oldLabelGreen,backgroundColorBlue:G.oldLabelBlue,backgroundColorAlpha:0});else{var g="rgb("+G.oldLabelRed+","+G.oldLabelGreen+","+G.oldLabelBlue+",0)";z(b.find(".labelImage"),j,{backgroundColor:g})}z(b.find(".labelImageTitle"),j,{opacity:0});z(b.find(".labelFolderTitle"),j,{opacity:0});z(b.find(".labelDescription"),j,{opacity:0});break;case "descriptionAppear":z(b.find(".labelDescription"),j,{opacity:0});break;case "labelSlideDown":z(b.find(".labelImage"),
j,{translateY:-a.thumbFullHeight},a,"labelImage0");break;case "labelSlideUpTop":case "labelSlideUp":z(b.find(".labelImage"),j,{translateY:a.thumbFullHeight},a,"labelImage0");break;case "descriptionSlideUp":var k="album"==a.kind?b.find(".labelFolderTitle").outerHeight(!0):b.find(".labelImageTitle").outerHeight(!0);z(b.find(".labelImage"),j,{translateY:0,height:k},a,"labelImage0");break;case "labelOpacity50":z(b.find(".labelImage"),j,{opacity:G.oldLabelOpacity});break;case "imageOpacity50":z(b.find(".imgContainer"),
j,{opacity:1});break;case "borderLighter":case "borderDarker":if("velocity"==F){var r=G.oldBorderColor,x=r.substring(r.indexOf("(")+1,r.lastIndexOf(")")).split(/,\s*/);z(b,j,{borderColorRed:x[0],borderColorGreen:x[1],borderColorBlue:x[2],colorAlpha:x[3]})}else z(b,j,{borderColor:G.oldBorderColor});break;case "imageScale150":case "imageScale150Outside":z(b.find("img"),j,{scale:100/d},a,"img0");break;case "imageScaleIn80":z(b.find("img"),j,{scale:120/d},a,"img0");break;case "imageSlide2Up":case "imageSlide2Down":case "imageSlide2Left":case "imageSlide2Right":case "imageSlide2UpRight":case "imageSlide2UpLeft":case "imageSlide2DownRight":case "imageSlide2DownLeft":case "imageSlide2Random":switch(a.customData.hoverEffectRDir){case "imageSlide2Up":var l=
a.thumbFullHeight<1.4*a.imgHeight?(1.4*a.imgHeight-a.thumbFullHeight)/2:0;z(b.find("img"),j,{translateY:l},a,"img0");break;case "imageSlide2Down":l=a.thumbFullHeight<1.4*a.imgHeight?(1.4*a.imgHeight-a.thumbFullHeight)/2:0;z(b.find("img"),j,{translateY:-l},a,"img0");break;case "imageSlide2Left":z(b.find("img"),j,{translateX:.1*a.thumbFullWidth},a,"img0");break;case "imageSlide2Right":z(b.find("img"),j,{translateX:.1*-a.thumbFullWidth},a,"img0");break;case "imageSlide2UpRight":z(b.find("img"),j,{translateY:.05*
a.thumbFullHeight,translateX:.05*-a.thumbFullWidth},a,"img0");break;case "imageSlide2UpLeft":z(b.find("img"),j,{translateY:.05*a.thumbFullHeight,translateX:.05*a.thumbFullWidth},a,"img0");break;case "imageSlide2DownRight":z(b.find("img"),j,{translateY:.05*-a.thumbFullHeight,translateX:.05*-a.thumbFullWidth},a,"img0");break;case "imageSlide2DownLeft":z(b.find("img"),j,{translateY:.05*-a.thumbFullHeight,translateX:.05*a.thumbFullWidth},a,"img0")}break;case "scale120":z(b,j,{scale:100/d},a,"base");break;
case "imageExplode":for(var t=b.find(".imgContainer"),c=Math.sqrt(t.length),v=0,h=0;h<c;h++)for(g=0;g<c;g++)z(t.eq(v++),j,{top:0,left:0,scale:1,opacity:1});break;case "imageFlipHorizontal":z(b.find(".imgContainer"),j,{rotateX:0},a,"imgContainer0");z(b.find(".labelImage"),j,{rotateX:180},a,"labelImage0");break;case "imageFlipVertical":z(b.find(".imgContainer"),j,{rotateY:0},a,"imgContainer0"),z(b.find(".labelImage"),j,{rotateY:180},a,"labelImage0")}}catch(q){R("error on hoverOut "+q.message)}}}}function ta(b){if("fancybox"==
f.viewer){var c=[],a=0;c[a]={};c[a].href=p[b].responsiveURL();c[a].title=p[b].title;for(var d=p.length,e=b+1;e<d;e++)"image"==p[e].kind&&p[e].albumID==p[b].albumID&&""==p[e].destinationURL&&(a++,c[a]={},c[a].href=p[e].responsiveURL(),c[a].title=p[e].title);for(e=0;e<b;e++)"image"==p[e].kind&&p[e].albumID==p[b].albumID&&""==p[e].destinationURL&&(a++,c[a]={},c[a].href=p[e].responsiveURL(),c[a].title=p[e].title);null!=f.fancyBoxOptions?jQuery.fancybox(c,f.fancyBoxOptions):jQuery.fancybox(c,{autoPlay:!1,
nextEffect:"fade",prevEffect:"fade",scrolling:"no",helpers:{buttons:{position:"bottom"}}})}else S?Xa(b,""):mc(b)}function mc(b){jQuery("body").css({overflow:"hidden"});S=!0;e.conVwCon=jQuery('<div  class="nanoGalleryViewerContainer" style="visibility:visible"></div>').appendTo("body");e.conVwCon.addClass("nanogallery_theme_"+f.theme);nc(e.conVwCon);e.conVw=jQuery('<div  id="nanoGalleryViewer" class="nanoGalleryViewer" style="visibility:visible" itemscope itemtype="http://schema.org/ImageObject"></div>').appendTo(e.conVwCon);
e.conVw.css({visibility:"visible",position:"fixed"});var c;c=""+('<img class="image" src="'+p[b].responsiveURL()+'" alt=" " style="visibility:visible;opacity:0;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;zoom:1;" itemprop="contentURL">');c+='<img class="image" src="'+p[b].responsiveURL()+'" alt=" " style="visibility:visible;opacity:0;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;zoom:1;" itemprop="contentURL">';c+='<img class="image" src="'+p[b].responsiveURL()+'" alt=" " style="visibility:visible;opacity:0;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;zoom:1;" itemprop="contentURL">';
e.vwContent=jQuery('<div class="content">'+c+'<div class="contentAreaPrevious"></div><div class="contentAreaNext"></div></div>').appendTo(e.conVw);e.vwImgP=e.conVw.find(".image").eq(0);e.vwImgC=e.conVw.find(".image").eq(1);e.vwImgN=e.conVw.find(".image").eq(2);e.conVwCon.find("*").attr("draggable","false").attr("unselectable","on");c=jQuery('<div class="closeButtonFloating"></div>').appendTo(e.conVw);c.on("touchstart click",function(a){a.preventDefault();a.stopPropagation();if(!(400>(new Date).getTime()-
ga))return Da(!0),!1});for(var a='<div class="toolbarContainer" style="visibility:'+(f.viewerToolbar.display?"visible":"hidden")+';"><div class="toolbar">',d=f.viewerToolbar.standard.split(","),h=0,g=d.length;h<g;h++)a+=Kb(d[h]);d=f.viewerToolbar.minimized.split(",");h=0;for(g=d.length;h<g;h++)-1==f.viewerToolbar.standard.indexOf(d[h])&&(a+=Kb(d[h]));e.conVwTb=jQuery(a+"</div></div>").appendTo(e.conVw);"min"==La||0<f.viewerToolbar.autoMinimize&&f.viewerToolbar.autoMinimize>=M().w?Lb():Mb();f.viewerDisplayLogo&&
(e.vwLogo=jQuery('<div class="nanoLogo"></div>').appendTo(e.conVw));L("",e.conVw);L(e.conVw,c);qa();ga=(new Date).getTime();e.conVwTb.find(".closeButton").on("touchstart click",function(a){a.preventDefault();a.stopPropagation();400>(new Date).getTime()-ga||Da(!0)});e.conVwTb.find(".playPauseButton").on("touchstart click",function(a){a.stopPropagation();bb()});e.conVwTb.find(".minimizeButton").on("touchstart click",function(a){a.stopPropagation();"std"==La?Lb():Mb()});e.conVwTb.find(".fullscreenButton").on("touchstart click",
function(a){a.stopPropagation();Nb()});e.conVwTb.find(".infoButton").on("touchstart click",function(a){a.stopPropagation();"function"==typeof f.fnViewerInfo&&f.fnViewerInfo(p[la],s())});e.conVwTb.find(".ngCustomBtn").on("touchstart click",function(a){a.stopPropagation();if("function"==typeof f.fnImgToolbarCustClick){for(a=a.target||a.srcElement;null==a||null==a.getAttribute("class")||-1==a.getAttribute("class").indexOf("ngCustomBtn");)a=a.parentNode;var b=a.getAttribute("class");if(0<=b.indexOf("ngCustomBtn"))for(var b=
b.split(" "),c=0,d=b.length;c<d;c++)0==b[c].indexOf("custom")&&f.fnImgToolbarCustClick(b[c],jQuery(a),p[la],s())}});e.conVwTb.find(".linkOriginalButton").on("touchstart click",function(a){a.stopPropagation();"picasa"==f.kind&&(a="https://plus.google.com/photos/"+f.userID+"/albums/"+p[la].albumID+"/"+p[la].GetID(),window.open(a,"_blank"));"flickr"==f.kind&&(a="https://www.flickr.com/photos/"+f.userID+"/"+p[la].GetID(),window.open(a,"_blank"))});e.conVwTb.find(".nextButton").on("touchstart click",function(a){a.stopPropagation();
Ea()});e.conVwTb.find(".previousButton").on("touchstart click",function(a){a.stopPropagation();Fa()});e.vwContent.find(".contentAreaNext").on("touchstart click",function(a){a.stopPropagation();Ea()});e.vwContent.find(".contentAreaPrevious").on("touchstart click",function(a){a.stopPropagation();Fa()});e.vwContent.on("click",function(a){if(!(400>(new Date).getTime()-ga))return a.preventDefault(),a.stopPropagation(),Da(!0),!1});e.conVw.find(".image").attr("draggable","false").attr("unselectable","on").css({"-moz-user-select":"none",
"-khtml-user-select":"none","-webkit-user-select":"none","-o-user-select":"none","user-select":"none"});Xa(b,"");null==Ya&&(Ya=new oc(e.conVwCon[0]));f.slideshowAutoStart&&(na=!0,e.conVwTb.find(".playPauseButton").removeClass("playButton").addClass("pauseButton"),Aa(),Ba=window.setInterval(function(){Aa()},Oa))}function Kb(b){var c="";b=b.replace(/^\s+|\s+$/g,"");switch(b){case "minimizeButton":c='<div class="ngbt minimizeButton hideToolbarButton"></div>';break;case "previousButton":c='<div class="ngbt previousButton"></div>';
break;case "pageCounter":c='<div class="pageCounter"></div>';break;case "nextButton":c='<div class="ngbt nextButton"></div>';break;case "playPauseButton":c='<div class="ngbt playButton playPauseButton"></div>';break;case "fullscreenButton":Ob&&(c='<div class="ngbt setFullscreenButton fullscreenButton"></div>');break;case "infoButton":"function"==typeof f.fnViewerInfo&&(c='<div class="ngbt infoButton"></div>');break;case "linkOriginalButton":if("flickr"==f.kind||"picasa"==f.kind)c='<div class="ngbt linkOriginalButton"></div>';
break;case "closeButton":c='<div class="ngbt closeButton"></div>';break;case "label":c='<div class="label"><div class="title" itemprop="name"></div><div class="description" itemprop="description"></div></div>';break;default:0==b.indexOf("custom")&&(c='<div class="ngbt ngCustomBtn '+b+'">'+("function"==typeof f.fnImgToolbarCustInit?f.fnImgToolbarCustInit(b):"")+"</div>")}return c}function oc(b){function c(b){S&&(b.preventDefault(),b.touches&&1<b.touches.length||(k=f(b),window.navigator.msPointerEnabled?
(document.addEventListener("MSPointerMove",a,!0),document.addEventListener("MSPointerUp",d,!0)):(document.addEventListener("touchmove",a,!0),document.addEventListener("touchend",d,!0),document.addEventListener("touchcancel",d,!0),document.addEventListener("mousemove",a,!0),document.addEventListener("mouseup",d,!0))))}function a(a){a.preventDefault();p=f(a);g||(g=!0,window.requestAnimationFrame(h))}function d(b){b.cancelable&&b.preventDefault();b.touches&&0<b.touches.length||(g=!1,window.navigator.msPointerEnabled?
(document.removeEventListener("MSPointerMove",a,!0),document.removeEventListener("MSPointerUp",d,!0)):(document.removeEventListener("touchmove",a,!0),document.removeEventListener("touchend",d,!0),document.removeEventListener("touchcancel",d,!0),document.removeEventListener("mousemove",a,!0),document.removeEventListener("mouseup",d,!0)),e())}function e(){if(null==p)r=0,k=null;else{var a=k.x-p.x;r-=a;-50>a&&Fa();50<a&&Ea();r=0;p=k=null;50>Math.abs(a)&&ob(r)}}function f(a){var b={};a.targetTouches?(b.x=
a.targetTouches[0].clientX,b.y=a.targetTouches[0].clientY):(b.x=a.clientX,b.y=a.clientY);return b}function h(){g&&(ob(r-(k.x-p.x)),g=!1)}var g=!1,k=null,p=null,r=0;this.handleGestureStartOLD=function(a){S&&(a.preventDefault(),a.touches&&1<a.touches.length||(k=f(a),window.navigator.msPointerEnabled?(document.addEventListener("MSPointerMove",this.handleGestureMove,!0),document.addEventListener("MSPointerUp",this.handleGestureEnd,!0)):(document.addEventListener("touchmove",this.handleGestureMove,!0),
document.addEventListener("touchend",this.handleGestureEnd,!0),document.addEventListener("touchcancel",this.handleGestureEnd,!0),document.addEventListener("mousemove",this.handleGestureMove,!0),document.addEventListener("mouseup",this.handleGestureEnd,!0))))}.bind(this);this.handleGestureMoveOLD=function(a){a.preventDefault();p=f(a);g||(g=!0,window.requestAnimationFrame(h))}.bind(this);this.handleGestureEndOLD=function(a){a.cancelable&&a.preventDefault();a.touches&&0<a.touches.length||(g=!1,window.navigator.msPointerEnabled?
(document.removeEventListener("MSPointerMove",this.handleGestureMove,!0),document.removeEventListener("MSPointerUp",this.handleGestureEnd,!0)):(document.removeEventListener("touchmove",this.handleGestureMove,!0),document.removeEventListener("touchend",this.handleGestureEnd,!0),document.removeEventListener("touchcancel",this.handleGestureEnd,!0),document.removeEventListener("mousemove",this.handleGestureMove,!0),document.removeEventListener("mouseup",this.handleGestureEnd,!0)),e(this))}.bind(this);
this.removeEventListeners=function(){window.navigator.msPointerEnabled?(b.removeEventListener("MSPointerDown",c,!0),document.removeEventListener("MSPointerMove",a,!0),document.removeEventListener("MSPointerUp",d,!0)):(b.removeEventListener("touchstart",c,!0),document.removeEventListener("touchmove",a,!0),document.removeEventListener("touchend",d,!0),document.removeEventListener("touchcancel",d,!0),document.removeEventListener("mousemove",a,!0),document.removeEventListener("mouseup",d,!0))};window.navigator.msPointerEnabled?
b.addEventListener("MSPointerDown",c,!0):b.addEventListener("touchstart",c,!0)}function ob(b){Za=b;if(null==K)e.vwImgC.css({left:b});else if(e.vwImgC[0].style[K]="translateX("+b+"px)","slide"==f.imageTransition)if(0<b){var c=M().w;e.vwImgP.css({visibility:"visible",left:0,opacity:1});e.vwImgP[0].style[K]="translateX("+(-c+b)+"px) ";e.vwImgN[0].style[K]="translateX("+-c+"px) "}else c=-M().w,e.vwImgN.css({visibility:"visible",left:0,opacity:1}),e.vwImgN[0].style[K]="translateX("+(-c+b)+"px) ",e.vwImgP[0].style[K]=
"translateX("+-c+"px) "}function Nb(){ngscreenfull.enabled&&(ngscreenfull.toggle(),$a?($a=!1,e.conVwTb.find(".fullscreenButton").removeClass("removeFullscreenButton").addClass("setFullscreenButton")):($a=!0,e.conVwTb.find(".fullscreenButton").removeClass("setFullscreenButton").addClass("removeFullscreenButton")))}function bb(){na?(window.clearInterval(Ba),na=!1,e.conVwTb.find(".playPauseButton").removeClass("pauseButton").addClass("playButton")):(na=!0,e.conVwTb.find(".playPauseButton").removeClass("playButton").addClass("pauseButton"),
Aa(),Ba=window.setInterval(function(){Aa()},Oa))}function Mb(){La="std";e.conVwTb.find(".minimizeButton").removeClass("viewToolbarButton").addClass("hideToolbarButton");Pb("std");qa()}function Lb(){La="min";e.conVwTb.find(".minimizeButton").removeClass("hideToolbarButton").addClass("viewToolbarButton");Pb("min");qa()}function Pb(b){var c=f.viewerToolbar,c="std"==b?f.viewerToolbar.standard:f.viewerToolbar.minimized,a="minimizeButton previousButton pageCounter nextButton playPauseButton fullscreenButton infoButton linkOriginalButton closeButton label".split(" ");
b=0;for(var d=a.length;b<d;b++)"label"==a[b]?""==e.conVwTb.find(".title").text()&&""==e.conVwTb.find(".description").text()?e.conVwTb.find("."+a[b]).css({display:"none"}):e.conVwTb.find("."+a[b]).css({display:0<=c.indexOf(a[b])?"table-cell":"none"}):e.conVwTb.find("."+a[b]).css({display:0<=c.indexOf(a[b])?"table-cell":"none"});e.conVwTb.find(".ngCustomBtn").css({display:"none"});c=c.split(",");b=0;for(d=c.length;b<d;b++)a=c[b].replace(/^\s+|\s+$/g,""),0==a.indexOf("custom")&&e.conVwTb.find("."+a).css({display:"table-cell"})}
function Ea(){na&&(window.clearInterval(Ba),Ba=window.setInterval(function(){Aa()},Oa));Aa()}function Aa(){if(!(Ca||300>(new Date).getTime()-ga)){var b=Qb(la);Xa(b,"nextImage")}}function Fa(){if(!(Ca||300>(new Date).getTime()-ga)){na&&bb();var b=Rb(la);Xa(b,"previousImage")}}function Xa(b,c){ga=(new Date).getTime();Ca=!0;if(f.locationHash){var a="nanogallery/"+ja+"/"+p[b].albumID+"/"+p[b].GetID();"#"+a!=location.hash?(va="#"+a,top.location.hash=a):va=top.location.hash}qa();window.cancelAnimationFrame(ab);
la=b;if(""==c)e.vwImgC.css({opacity:0,left:0,visibility:"visible"}).attr("src","data:image/gif;base64,R0lGODlhEAAQAIAAAP///////yH5BAEKAAEALAAAAAAQABAAAAIOjI+py+0Po5y02ouzPgUAOw==").attr("src",p[b].responsiveURL()),jQuery.when(e.vwImgC.animate({opacity:1},300)).done(function(){ra(b,c)});else switch(f.imageTransition){case "fade":var d="nextImage"==c?e.vwImgN:e.vwImgP;d.css({opacity:0,left:0,visibility:"visible"});jQuery.when(e.vwImgC.animate({opacity:0},500),d.animate({opacity:1},300)).done(function(){ra(b,
c)});break;case "slideBETA":d="nextImage"==c?e.vwImgN:e.vwImgP;d.css({opacity:1,left:0,visibility:"visible"});if(null==K)jQuery.when(e.vwImgC.animate({left:("nextImage"==c?-M().w:M().w)+"px",opacity:0},500),d.animate({opacity:1},300)).done(function(){ra(b,c)});else{var h="nextImage"==c?-M().w:M().w;d[0].style[K]="translateX("+-h+"px) ";var a={v:Za},g={v:"nextImage"==c?-M().w:M().w};jQuery(a).animate(g,{duration:500,step:function(a){e.vwImgC[0].style[K]="translateX("+a+"px)";e.vwImgC.css({opacity:1-
Math.abs(a/h)});d[0].style[K]="translateX("+(-h+a)+"px) "},complete:function(){e.vwImgC[0].style[K]="";e.vwImgC.css({opacity:0});ra(b,c)}})}break;case "slide":d="nextImage"==c?e.vwImgN:e.vwImgP;null==K?(d.css({opacity:0,left:0,visibility:"visible"}),jQuery.when(e.vwImgC.animate({left:("nextImage"==c?-M().w:M().w)+"px"},500),d.animate({opacity:1},300)).done(function(){ra(b,c)})):(d.css({opacity:1,left:0,visibility:"visible"}),h="nextImage"==c?-M().w:M().w,d[0].style[K]="translateX("+-h+"px) ",a={v:Za},
g={v:"nextImage"==c?-M().w:M().w},jQuery(a).animate(g,{duration:400,easing:"linear",step:function(a){window.requestAnimationFrame(function(){e.vwImgC[0].style[K]="translateX("+a+"px)";d[0].style[K]="translateX("+(-h+a)+"px) "})},complete:function(){window.requestAnimationFrame(function(){e.vwImgC[0].style[K]="";ra(b,c)})}}));break;default:h=M().w+"px",d=e.vwImgP,"nextImage"==c&&(h="-"+h,d=e.vwImgN),d.css({opacity:0,left:0,visibility:"visible"}),jQuery.when(e.vwImgC.animate({left:h,opacity:0},500),
d.animate({opacity:1},300)).done(function(){ob(0);ra(b,c)})}}function ra(b,c){pc(b);Za=0;e.vwImgC.off("click");e.vwImgC.removeClass("imgCurrent");var a=e.vwImgC;switch(c){case "nextImage":e.vwImgC=e.vwImgN;e.vwImgN=a;break;case "previousImage":e.vwImgC=e.vwImgP,e.vwImgP=a}e.vwImgC.addClass("imgCurrent");e.vwImgN.css({opacity:0,left:0,visibility:"hidden"}).attr("src","data:image/gif;base64,R0lGODlhEAAQAIAAAP///////yH5BAEKAAEALAAAAAAQABAAAAIOjI+py+0Po5y02ouzPgUAOw==").attr("src",p[Qb(b)].responsiveURL());
e.vwImgP.css({opacity:0,left:0,visibility:"hidden"}).attr("src","data:image/gif;base64,R0lGODlhEAAQAIAAAP///////yH5BAEKAAEALAAAAAAQABAAAAIOjI+py+0Po5y02ouzPgUAOw==").attr("src",p[Rb(b)].responsiveURL());e.vwImgC.on("click",function(a){a.stopPropagation();a.pageX<jQuery(window).width()/2?Fa():Ea()});qa();Ca=!1}function Qb(b){for(var c=p.length,a=-1,d=b+1;d<c;d++)if(p[d].albumID==p[b].albumID&&"image"==p[d].kind){a=d;break}if(-1==a)for(d=0;d<=b;d++)if(p[d].albumID==p[b].albumID&&"image"==p[d].kind){a=
d;break}return a}function Rb(b){for(var c=-1,a=b-1;0<=a;a--)if(p[a].albumID==p[b].albumID&&"image"==p[a].kind){c=a;break}if(-1==c)for(a=p.length-1;a>=b;a--)if(p[a].albumID==p[b].albumID&&"image"==p[a].kind){c=a;break}return c}function pc(b){if(f.viewerToolbar.display){e.conVwTb.css({visibility:"visible"});var c=!1;void 0!==p[b].title&&""!=p[b].title?(e.conVwTb.find(".title").html(p[b].title),c=!0):e.conVwTb.find(".title").html("");void 0!==p[b].description&&""!=p[b].description?(e.conVwTb.find(".description").html(p[b].description),
c=!0):e.conVwTb.find(".description").html("");var a=e.conVwTb.find(".ngCustomBtn");0<a.length&&"function"==typeof f.fnImgToolbarCustDisplay&&f.fnImgToolbarCustDisplay(a,p[b],s());c&&0<=("std"==La?f.viewerToolbar.standard:f.viewerToolbar.minimized).indexOf("label")?e.conVwTb.find(".label").show():e.conVwTb.find(".label").hide();for(var c=0,a=p.length,d=0;d<a;d++)p[d].albumID==p[b].albumID&&"image"==p[d].kind&&c++;0<c&&e.conVwTb.find(".pageCounter").html(p[b].imageNumber+1+"/"+c)}}function Da(b){Ca&&
e.vwContent.find("*").stop(!0,!0);Ca=!1;S&&(Ya.removeEventListeners(),Ya=null,window.cancelAnimationFrame(ab),na&&(window.clearInterval(Ba),na=!1),f.galleryFullpageButton&&e.base.hasClass("fullpage")||U(),$a&&Nb(),e.conVwCon.hide(0).off().show(0).html("").remove(),-1!=Qa?X(Qa,!0):(f.locationHash&&b&&(b="nanogallery/"+ja+"/"+p[la].albumID,va="#"+b,top.location.hash=b),Ia()),ga=(new Date).getTime(),S=!1)}function qa(){window.cancelAnimationFrame(ab);ab=window.requestAnimationFrame(qa);var b=e.conVw.width(),
c=e.conVw.height(),a=e.vwImgC,d=a.height(),h=a.width(),g=a.outerHeight(!0),k=a.outerHeight(!1),p=e.conVwTb.find(".toolbar"),r=p.outerHeight(!0);40>=d||!f.viewerToolbar.display?e.conVwTb.css({visibility:"hidden"}):e.conVwTb.css({visibility:"visible"});var x=Math.abs(e.vwContent.outerHeight(!0)-e.vwContent.height()),l=Math.abs(e.vwContent.outerWidth(!0)-e.vwContent.width()),t=k-a.innerHeight(),k=Math.abs(a.outerWidth(!1)-a.innerWidth()),v=Math.abs(a.innerHeight()-d),q=Math.abs(a.innerWidth()-h),a=t+
v,k=k+q,t=0;"innerImage"!=f.viewerToolbar.style&&(t=r);c=c-t-x;b-=l;switch(f.viewerToolbar.position){case "top":e.vwContent.css({height:c,width:b,top:t});l=0;"innerImage"==f.viewerToolbar.style&&(l=Math.abs(g-d)/2+5);"stuckImage"==f.viewerToolbar.style&&(l=Math.abs(g-d)/2-a);e.conVwTb.css({top:l});break;default:e.vwContent.css({height:c,width:b}),l=0,"innerImage"==f.viewerToolbar.style&&(l=Math.abs(g-d)/2+5),"stuckImage"==f.viewerToolbar.style&&(l=Math.abs(g-d)/2-a),e.conVwTb.css({bottom:l})}"innerImage"==
f.viewerToolbar.style&&p.css({"max-width":h});"fullWidth"==f.viewerToolbar.style&&p.css({width:b});e.conVwTb.css({height:r});e.vwContent.children("img").css({"max-width":b-k,"max-height":c-a})}function qc(b){var c=null;switch(V(f.colorScheme)){case "object":c=Sb;jQuery.extend(!0,c,f.colorScheme);g_colorSchemeLabel="nanogallery_colorscheme_custom_"+ja;break;case "string":switch(f.colorScheme){case "none":return;case "light":c=rc;g_colorSchemeLabel="nanogallery_colorscheme_light";break;case "lightBackground":c=
sc;g_colorSchemeLabel="nanogallery_colorscheme_lightBackground";break;case "darkRed":c=tc;g_colorSchemeLabel="nanogallery_colorscheme_darkred";break;case "darkGreen":c=uc;g_colorSchemeLabel="nanogallery_colorscheme_darkgreen";break;case "darkBlue":c=vc;g_colorSchemeLabel="nanogallery_colorscheme_darkblue";break;case "darkOrange":c=wc;g_colorSchemeLabel="nanogallery_colorscheme_darkorange";break;default:c=Sb,g_colorSchemeLabel="nanogallery_colorscheme_default"}break;default:R("Error in colorScheme parameter.");
return}var a="."+g_colorSchemeLabel+" ",d=a+".nanoGalleryNavigationbar { background:"+c.navigationbar.background+" !important; }\n";void 0!==c.navigationbar.border&&(d+=a+".nanoGalleryNavigationbar { border:"+c.navigationbar.border+" !important; }\n");void 0!==c.navigationbar.borderTop&&(d+=a+".nanoGalleryNavigationbar { border-top:"+c.navigationbar.borderTop+" !important; }\n");void 0!==c.navigationbar.borderBottom&&(d+=a+".nanoGalleryNavigationbar { border-bottom:"+c.navigationbar.borderBottom+
" !important; }\n");void 0!==c.navigationbar.borderRight&&(d+=a+".nanoGalleryNavigationbar { border-right:"+c.navigationbar.borderRight+" !important; }\n");void 0!==c.navigationbar.borderLeft&&(d+=a+".nanoGalleryNavigationbar { border-left:"+c.navigationbar.borderLeft+" !important; }\n");var d=d+(a+".nanoGalleryNavigationbar .oneFolder  { color:"+c.navigationbar.color+" !important; }\n"),d=d+(a+".nanoGalleryNavigationbar .separator  { color:"+c.navigationbar.color+" !important; }\n"),d=d+(a+".nanoGalleryNavigationbar .separatorRTL  { color:"+
c.navigationbar.color+" !important; }\n"),d=d+(a+".nanoGalleryNavigationbar .nanoGalleryTags { color:"+c.navigationbar.color+" !important; }\n"),d=d+(a+".nanoGalleryNavigationbar .setFullPageButton { color:"+c.navigationbar.color+" !important; }\n"),d=d+(a+".nanoGalleryNavigationbar .removeFullPageButton { color:"+c.navigationbar.color+" !important; }\n"),d=d+(a+".nanoGalleryNavigationbar .oneFolder:hover { color:"+c.navigationbar.colorHover+" !important; }\n"),d=d+(a+".nanoGalleryNavigationbar .separatorRTL:hover { color:"+
c.navigationbar.colorHover+" !important; }\n"),d=d+(a+".nanoGalleryNavigationbar .nanoGalleryTags:hover { color:"+c.navigationbar.colorHover+" !important; }\n"),d=d+(a+".nanoGalleryNavigationbar .setFullPageButton:hover { color:"+c.navigationbar.colorHover+" !important; }\n"),d=d+(a+".nanoGalleryNavigationbar .removeFullPageButton:hover { color:"+c.navigationbar.colorHover+" !important; }\n"),d=d+(a+".nanoGalleryContainer > .nanoGalleryThumbnailContainer { background:"+c.thumbnail.background+" !important; border:"+
c.thumbnail.border+" !important; }\n"),d=d+(a+".nanoGalleryContainer > .nanoGalleryThumbnailContainer .imgContainer { background:"+c.thumbnail.background+" !important; }\n"),d=d+(a+".nanoGalleryContainer > .nanoGalleryThumbnailContainer .labelImage{ background:"+c.thumbnail.labelBackground+" ; }\n"),d=d+(a+".nanoGalleryContainer > .nanoGalleryThumbnailContainer .labelImageTitle  { color:"+c.thumbnail.titleColor+" !important; Text-Shadow:"+c.thumbnail.titleShadow+" !important; }\n"),d=d+(a+".nanoGalleryContainer > .nanoGalleryThumbnailContainer .labelImageTitle:before { color:"+
c.thumbnail.titleColor+" !important; Text-Shadow:"+c.thumbnail.titleShadow+" !important; }\n"),d=d+(a+".nanoGalleryContainer > .nanoGalleryThumbnailContainer .labelFolderTitle { color:"+c.thumbnail.titleColor+" !important; Text-Shadow:"+c.thumbnail.titleShadow+" !important; }\n"),e=c.thumbnail.labelBackground;"transparent"==e&&(e="");d+=a+".nanoGalleryContainer > .nanoGalleryThumbnailContainer .labelFolderTitle > span { background-color:"+c.thumbnail.titleColor+" !important; color:"+e+" !important; }\n";
d+=a+".nanoGalleryContainer > .nanoGalleryThumbnailContainer .labelFolderTitle:before { color:"+c.thumbnail.titleColor+" !important; Text-Shadow:"+c.thumbnail.titleShadow+" !important; }\n";d+=a+".nanoGalleryContainer > .nanoGalleryThumbnailContainer .labelDescription { color:"+c.thumbnail.descriptionColor+" !important; Text-Shadow:"+c.thumbnail.descriptionShadow+" !important; }\n";d+=a+".nanoGalleryContainer > .nanoGalleryThumbnailContainer .labelDescription > span { background-color:"+c.thumbnail.titleColor+
" !important; color:"+e+" !important; }\n";c="nanogallery_galleryfullpage_bgcolor_"+ja;d+="."+c+".fullpage { background:"+f.galleryFullpageBgColor+" !important; }\n";jQuery("head").append("<style>"+d+"</style>");jQuery(b).addClass(g_colorSchemeLabel);jQuery(b).addClass(c)}function nc(b){var c=null;switch(V(f.colorSchemeViewer)){case "object":c=Tb;jQuery.extend(!0,c,f.colorSchemeViewer);g_colorSchemeLabel="nanogallery_colorschemeviewer_custom";break;case "string":switch(f.colorSchemeViewer){case "none":return;
case "light":c=xc;g_colorSchemeLabel="nanogallery_colorschemeviewer_light";break;case "darkRed":c=yc;g_colorSchemeLabel="nanogallery_colorschemeviewer_darkred";break;case "darkGreen":c=zc;g_colorSchemeLabel="nanogallery_colorschemeviewer_darkgreen";break;case "darkBlue":c=Ac;g_colorSchemeLabel="nanogallery_colorschemeviewer_darkblue";break;case "darkOrange":c=Bc;g_colorSchemeLabel="nanogallery_colorschemeviewer_darkorange";break;case "dark":c=Cc;g_colorSchemeLabel="nanogallery_colorschemeviewer_dark";
break;default:c=Tb,g_colorSchemeLabel="nanogallery_colorschemeviewer_default"}break;default:R("Error in colorSchemeViewer parameter.");return}var a="."+g_colorSchemeLabel+" ",d=a+".nanoGalleryViewer { background:"+c.background+" !important; }\n",d=d+(a+".nanoGalleryViewer .content img { border:"+c.imageBorder+" !important; box-shadow:"+c.imageBoxShadow+" !important; }\n"),d=d+(a+".nanoGalleryViewer .toolbar { background:"+c.barBackground+" !important; border:"+c.barBorder+" !important; color:"+c.barColor+
" !important; }\n"),d=d+(a+".nanoGalleryViewer .toolbar .previousButton:after { color:"+c.barColor+" !important; }\n"),d=d+(a+".nanoGalleryViewer .toolbar .nextButton:after { color:"+c.barColor+" !important; }\n"),d=d+(a+".nanoGalleryViewer .toolbar .closeButton:after { color:"+c.barColor+" !important; }\n"),d=d+(a+".nanoGalleryViewer .toolbar .label .title { color:"+c.barColor+" !important; }\n"),d=d+(a+".nanoGalleryViewer .toolbar .label .description { color:"+c.barDescriptionColor+" !important; }\n");
jQuery("head").append("<style>"+d+"</style>");jQuery(b).addClass(g_colorSchemeLabel)}function R(b,c){ma(b);null!=e.conConsole&&(e.conConsole.css({visibility:"visible",height:"auto"}),0==c?e.conConsole.append("<p>"+b+"</p>"):e.conConsole.append("<p>nanoGALLERY: "+b+" ["+ja+"]</p>"))}function ma(b){window.console&&console.log("nanoGALLERY: "+b+" ["+ja+"]")}function M(){var b=jQuery(window);return{l:b.scrollLeft(),t:b.scrollTop(),w:b.width(),h:b.height()}}function Gb(b,c){var a=M(),d=b.offset(),e=b.outerHeight(!0),
f=b.outerWidth(!0);return d.top>=a.t-c&&d.top+e<=a.t+a.h+c&&d.left>=a.l-c&&d.left+f<=a.l+a.w+c?!0:!1}function xa(b,c){var a=M(),d=b.offset(),e=b.outerHeight(!0);b.outerWidth(!0);return 0==a.t&&d.top<=a.t+a.h?!0:d.top>=a.t&&d.top+e<=a.t+a.h-c?!0:!1}function L(b,c){var a=0;""==b&&(b="*");jQuery(b).each(function(){var b=parseInt(jQuery(this).css("z-index"));a=b>a?b:a});a++;jQuery(c).css("z-index",a)}function Ka(b){for(var c,a,d=b.length;d;c=Math.floor(Math.random()*d),a=b[--d],b[d]=b[c],b[c]=a);return b}
this.N={v:1};var O={paginationPrevious:"Previous",paginationNext:"Next",breadcrumbHome:"List of Albums",thumbnailImageTitle:"",thumbnailAlbumTitle:"",thumbnailImageDescription:"",thumbnailAlbumDescription:""},f=null,p=[],e={base:null,conTnParent:null,conLoadingB:null,conConsole:null,conTn:null,conTnHid:null,conPagin:null,conBC:null,conNavB:null,conNavBCon:null,conNavBFullpage:null,conVwCon:null,conVw:null,conVwTb:null,vwImgP:null,vwImgN:null,vwImgC:null,vwContent:null,vwLogo:null},Y=null,ja=null,
Eb=null,Fb=!1,S=!1,h={displayInterval:30,lazyLoadTreshold:100,scale:1,borderWidth:0,borderHeight:0,imgcBorderHeight:0,imgcBorderWidth:0,labelHeight:0,outerWidth:{l1:{xs:0,sm:0,me:0,la:0,xl:0},lN:{xs:0,sm:0,me:0,la:0,xl:0}},outerHeight:{l1:{xs:0,sm:0,me:0,la:0,xl:0},lN:{xs:0,sm:0,me:0,la:0,xl:0}},settings:{width:{l1:{xs:0,sm:0,me:0,la:0,xl:0,xsc:"u",smc:"u",mec:"u",lac:"u",xlc:"u"},lN:{xs:0,sm:0,me:0,la:0,xl:0,xsc:"u",smc:"u",mec:"u",lac:"u",xlc:"u"}},height:{l1:{xs:0,sm:0,me:0,la:0,xl:0,xsc:"u",smc:"u",
mec:"u",lac:"u",xlc:"u"},lN:{xs:0,sm:0,me:0,la:0,xl:0,xsc:"u",smc:"u",mec:"u",lac:"u",xlc:"u"}}}},C=[],Ma=null,Na=null,Ja=null,La="std",na=!1,Ba=0,Oa=3E3,db=0,Ob=!1,$a=!1,ia="",ga=0,eb=0,ka=1,T=0,gb=-1,va="",Ca=!1,ab=-1,la=-1,Za=0,Qa=-1,G={},Ta=-1,Ua=-1,Bb=!1,Ya=null,F="animate",pb=0,qb=0,Pa=1E6,fb=1E6,ba="l1",ha="me",K=D(["transform","msTransform","MozTransform","WebkitTransform","OTransform"]),Ib=D(["transformStyle","msTransformStyle","MozTransformStyle","WebkitTransformStyle","OTransformStyle"]),
Va=D(["perspective","msPerspective","MozPerspective","WebkitPerspective","OPerspective"]),za=D(["backfaceVisibility","msBackfaceVisibility","MozBackfaceVisibility","WebkitBackfaceVisibility","OBackfaceVisibility"]);D(["transition","msTransition","MozTransition","WebkitTransition","OTransition"]);D(["animation","msAnimation","MozAnimation","WebkitAnimation","OAnimation"]);var Jb=function(){if(document.documentMode)return document.documentMode;for(var b=7;4<b;b--){var c=document.createElement("div");
c.innerHTML="\x3c!--[if IE "+b+"]><span></span><![endif]--\x3e";if(c.getElementsByTagName("span").length)return b}}();(function(){if(/iP(hone|od|ad)/.test(navigator.platform)){var b=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);return[parseInt(b[1],10),parseInt(b[2],10),parseInt(b[3]||0,10)]}})();var Wb=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),lc=/Android 2\.3\.[3-7]/i.test(navigator.userAgent),oa=!1,zb={url:function(){return f.picasaUseUrlCrossDomain?"https://photos.googleapis.com/data/feed/api/":
"https://picasaweb.google.com/data/feed/api/"},thumbSize:64,thumbAvailableSizes:[32,48,64,72,94,104,110,128,144,150,160,200,220,288,320,400,512,576,640,720,800,912,1024,1152,1280,1440,1600],thumbAvailableSizesCropped:" 32 48 64 72 104 144 150 160 "},Q={url:function(){return"https://api.flickr.com/services/rest/"},thumbSize:"sq",thumbSizeX2:"sq",thumbAvailableSizes:[75,100,150,240,500,640],thumbAvailableSizesStr:"sq t q s m z".split(" "),photoSize:"sq",photoAvailableSizes:[75,100,150,240,500,640,1024,
1024,1600,2048],photoAvailableSizesStr:"sq t q s m z b l h k".split(" "),ApiKey:"2f0e634b471fdb47446abcb9c5afebdc"},Sb={navigationbar:{background:"none",borderTop:"1px solid #555",borderBottom:"1px solid #555",borderRight:"",borderLeft:"",color:"#ccc",colorHover:"#fff"},thumbnail:{background:"#000",border:"1px solid #000",labelBackground:"rgba(34, 34, 34, 0.75)",titleColor:"#eee",titleShadow:"",descriptionColor:"#ccc",descriptionShadow:""}},tc={navigationbar:{background:"#a60000",border:"1px dotted #ff0000",
color:"#ccc",colorHover:"#fff"},thumbnail:{background:"#a60000",border:"1px solid #ff0000",labelBackground:"rgba(134, 0, 0, 0.75)",titleColor:"#eee",titleShadow:"",descriptionColor:"#ccc",descriptionShadow:""}},uc={navigationbar:{background:"#008500",border:"1px dotted #00cc00",color:"#ccc",colorHover:"#fff"},thumbnail:{background:"#008500",border:"1px solid #00cc00",labelBackground:"rgba(0, 105, 0, 0.75)",titleColor:"#eee",titleShadow:"",descriptionColor:"#ccc",descriptionShadow:""}},vc={navigationbar:{background:"#071871",
border:"1px dotted #162ea2",color:"#ccc",colorHover:"#fff"},thumbnail:{background:"#071871",border:"1px solid #162ea2",labelBackground:"rgba(7, 8, 81, 0.75)",titleColor:"#eee",titleShadow:"",descriptionColor:"#ccc",descriptionShadow:""}},wc={navigationbar:{background:"#a67600",border:"1px dotted #ffb600",color:"#ccc",colorHover:"#fff"},thumbnail:{background:"#a67600",border:"1px solid #ffb600",labelBackground:"rgba(134, 86, 0, 0.75)",titleColor:"#eee",titleShadow:"",descriptionColor:"#ccc",descriptionShadow:""}},
rc={navigationbar:{background:"none",borderTop:"1px solid #ddd",borderBottom:"1px solid #ddd",borderRight:"",borderLeft:"",color:"#777",colorHover:"#eee"},thumbnail:{background:"#fff",border:"1px solid #fff",labelBackground:"rgba(60, 60, 60, 0.75)",titleColor:"#fff",titleShadow:"none",descriptionColor:"#eee",descriptionShadow:"none"}},sc={navigationbar:{background:"none",border:"",color:"#000",colorHover:"#444"},thumbnail:{background:"#000",border:"1px solid #000",labelBackground:"rgba(34, 34, 34, 0.85)",
titleColor:"#fff",titleShadow:"",descriptionColor:"#eee",descriptionShadow:""}},Tb={background:"#000",imageBorder:"4px solid #000",imageBoxShadow:"#888 0px 0px 0px",barBackground:"rgba(4, 4, 4, 0.7)",barBorder:"0px solid #111",barColor:"#eee",barDescriptionColor:"#aaa"},Cc={background:"rgba(1, 1, 1, 0.75)",imageBorder:"4px solid #f8f8f8",imageBoxShadow:"#888 0px 0px 20px",barBackground:"rgba(4, 4, 4, 0.7)",barBorder:"0px solid #111",barColor:"#eee",barDescriptionColor:"#aaa"},yc={background:"rgba(1, 1, 1, 0.75)",
imageBorder:"4px solid #ffa3a3",imageBoxShadow:"#ff0000 0px 0px 20px",barBackground:"#a60000",barBorder:"2px solid #111",barColor:"#eee",barDescriptionColor:"#aaa"},zc={background:"rgba(1, 1, 1, 0.75)",imageBorder:"4px solid #97e697",imageBoxShadow:"#00cc00 0px 0px 20px",barBackground:"#008500",barBorder:"2px solid #111",barColor:"#eee",barDescriptionColor:"#aaa"},Ac={background:"rgba(1, 1, 1, 0.75)",imageBorder:"4px solid #a0b0d7",imageBoxShadow:"#162ea2 0px 0px 20px",barBackground:"#071871",barBorder:"2px solid #111",
barColor:"#eee",barDescriptionColor:"#aaa"},Bc={background:"rgba(1, 1, 1, 0.75)",imageBorder:"4px solid #ffd7b7",imageBoxShadow:"#ffb600 0px 0px 20px",barBackground:"#a67600",barBorder:"2px solid #111",barColor:"#eee",barDescriptionColor:"#aaa"},xc={background:"rgba(187, 187, 187, 0.75)",imageBorder:"none",imageBoxShadow:"#888 0px 0px 0px",barBackground:"rgba(4, 4, 4, 0.7)",barBorder:"0px solid #111",barColor:"#eee",barDescriptionColor:"#aaa"},bc=function(){function b(a,b){var e=0,e=void 0===b||null===
b?c++:b;this.GetID=function(){return e};this.title=a;this.src=this.description="";this.height=this.width=0;this.thumbX2src=this.thumbsrc=this.author=this.kind=this.destinationURL="";this.thumbLabelHeight=this.thumbLabelWidth=this.thumbFullHeight=this.thumbFullWidth=this.thumbImgHeight=this.thumbImgWidth=0;this.thumbSizes={};this.thumbs={url:{l1:{xs:"",sm:"",me:"",la:"",xl:""},lN:{xs:"",sm:"",me:"",la:"",xl:""}},width:{l1:{xs:0,sm:0,me:0,la:0,xl:0},lN:{xs:0,sm:0,me:0,la:0,xl:0}},height:{l1:{xs:0,sm:0,
me:0,la:0,xl:0},lN:{xs:0,sm:0,me:0,la:0,xl:0}}};this.picasaThumbs=null;this.hoverInitDone=this.hovered=!1;this.$elt=null;this.contentIsLoaded=!1;this.imageNumber=this.contentLength=0;this.eltTransform={};this.paginationLastWidth=this.paginationLastPage=this.albumID=0;this.customData={}}var c=1;b.get_nextId=function(){return c};b.prototype={thumbSetImgHeight:function(a){for(var b=["xs","sm","me","la","xl"],c=0;c<b.length;c++)h.settings.height.l1[b[c]]==w()&&h.settings.width.l1[b[c]]==l()&&(this.thumbs.height.l1[b[c]]=
a);for(c=0;c<b.length;c++)h.settings.height.lN[b[c]]==w()&&h.settings.width.l1[b[c]]==l()&&(this.thumbs.height.lN[b[c]]=a)},thumbSetImgWidth:function(a){for(var b=["xs","sm","me","la","xl"],c=0;c<b.length;c++)h.settings.height.l1[b[c]]==w()&&h.settings.width.l1[b[c]]==l()&&(this.thumbs.width.l1[b[c]]=a);for(c=0;c<b.length;c++)h.settings.height.lN[b[c]]==w()&&h.settings.width.l1[b[c]]==l()&&(this.thumbs.width.lN[b[c]]=a)},thumbImg:function(){var a={src:"",width:0,height:0};if("dummydummydummy"==this.title)return a.src=
"data:image/gif;base64,R0lGODlhEAAQAIAAAP///////yH5BAEKAAEALAAAAAAQABAAAAIOjI+py+0Po5y02ouzPgUAOw==",a;a.src=this.thumbs.url[ba][ha];a.width=this.thumbs.width[ba][ha];a.height=this.thumbs.height[ba][ha];return a},responsiveURL:function(){var a="";switch(f.kind){case "":a=this.src;break;case "flickr":a=this.src;break;default:a=this.src}return a}};return b}();this.Initiate=function(b,c){f=c;e.base=jQuery(b);ja=e.base.attr("id");jQuery("body").css("overflow");Function.prototype.bind||(Function.prototype.bind=
function(a){if("function"!==typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var b=Array.prototype.slice.call(arguments,1),c=this,d=function(){},e=function(){return c.apply(this instanceof d&&a?this:a,b.concat(Array.prototype.slice.call(arguments)))};d.prototype=this.prototype;e.prototype=new d;return e});String.prototype.replaceAll=function(a,b){return void 0===b?this.toString():this.split(a).join(b)};"object"==V(jQuery.velocity)?F="velocity":
"object"==V(jQuery.transit)&&(F="transition");jQuery(b).addClass("nanogallery_theme_"+f.theme);qc(b);if(f.thumbnailLabel.hideIcons){var a=".nanogallery_thumbnails_icons_off ",a=a+".nanoGalleryContainer .nanoGalleryThumbnailContainer .labelImageTitle:before { display:none !important; }\n"+(a+".nanoGalleryContainer .nanoGalleryThumbnailContainer .labelFolderTitle:before { display:none !important; }\n");jQuery("head").append("<style>"+a+"</style>");jQuery(b).addClass("nanogallery_thumbnails_icons_off")}f.galleryToolbarHideIcons&&
(a=".nanogallery_breadcrumb_icons_off ",a=a+".nanoGalleryNavigationbar .folderHome:before { display:none !important; }\n"+(a+".nanoGalleryNavigationbar .folder:before { display:none !important; }\n"),jQuery("head").append("<style>"+a+"</style>"),jQuery(b).addClass("nanogallery_breadcrumb_icons_off"));"right"==f.thumbnailLabel.align&&(a=".nanogallery_thumbnails_label_align_right .nanoGalleryContainer .nanoGalleryThumbnailContainer .labelImage { text-align : right !important; }\n",jQuery("head").append("<style>"+
a+"</style>"),jQuery(b).addClass("nanogallery_thumbnails_label_align_right"));"center"==f.thumbnailLabel.align&&(a=".nanogallery_thumbnails_label_align_center .nanoGalleryContainer .nanoGalleryThumbnailContainer .labelImage { text-align : center !important; }\n",jQuery("head").append("<style>"+a+"</style>"),jQuery(b).addClass("nanogallery_thumbnails_label_align_center"));"left"==f.thumbnailLabel.align&&(a=".nanogallery_thumbnails_label_align_left .nanoGalleryContainer .nanoGalleryThumbnailContainer .labelImage { text-align : left !important; }\n",
jQuery("head").append("<style>"+a+"</style>"),jQuery(b).addClass("nanogallery_thumbnails_label_align_left"));e.conNavBCon=jQuery('<div class="nanoGalleryNavigationbarContainer"></div>').appendTo(b);e.conNavBCon.hide();e.conNavB=jQuery('<div class="nanoGalleryNavigationbar"></div>').appendTo(e.conNavBCon);a="";f.RTL&&(a='style="text-align:right;direction:rtl;"');e.conBC=jQuery('<div class="nanoGalleryBreadcrumb" '+a+"></div>").appendTo(e.conNavB);e.conLoadingB=jQuery('<div class="nanoGalleryLBar" style="visibility:hidden;"><div></div><div></div><div></div><div></div><div></div></div>').appendTo(b);
e.conTnParent=jQuery('<div class="nanoGalleryContainerParent"></div>').appendTo(b);e.conTn=jQuery('<div class="nanoGalleryContainer"></div>').appendTo(e.conTnParent);e.conConsole=jQuery('<div class="nanoGalleryConsoleParent"></div>').appendTo(b);switch(f.thumbnailAlignment){case "left":e.conTnParent.css({"text-align":"left"});e.conNavBCon.css({"margin-left":0});break;case "right":e.conTnParent.css({"text-align":"right"}),e.conNavBCon.css({"margin-right":0})}jQuery("head").append("<style>.nanogalleryHideElement {position: absolute !important; top: -9999px !important; left: -9999px !important;}</style>");
a=jQuery('<div class="nanogalleryHideElement '+jQuery(b).attr("class")+'"></div>').appendTo("body");a=jQuery('<div class="nanoGalleryContainerParent"></div>').appendTo(a);e.conTnHid=jQuery('<div class="nanoGalleryContainer"></div>').appendTo(a);if(f.supportIE8)try{!window.addEventListener&&function(a,b,c,d,e,f,h){a[d]=b[d]=c[d]=function(a,b){var c=this;h.unshift([c,a,b,function(a){a.currentTarget=c;a.preventDefault=function(){a.returnValue=!1};a.stopPropagation=function(){a.cancelBubble=!0};a.target=
a.srcElement||c;b.call(c,a)}]);this.attachEvent("on"+a,h[0][3])};a[e]=b[e]=c[e]=function(a,b){for(var c=0,d;d=h[c];++c)if(d[0]==this&&d[1]==a&&d[2]==b)return this.detachEvent("on"+a,h.splice(c,1)[0][3])};a[f]=b[f]=c[f]=function(a){return this.fireEvent("on"+a.type,a)}}(Window.prototype,HTMLDocument.prototype,Element.prototype,"addEventListener","removeEventListener","dispatchEvent",[])}catch(d){return J(),!1}else if(8>=Jb)return J(),!1;q();a="";f.RTL&&(a='style="direction:rtl;"');e.conPagin=jQuery('<div class="nanoGalleryPagination" '+
a+"></div>").appendTo(e.conTnParent);e.conPagin.hide();new I(e.conTn[0]);x();document.fullscreenEnabled||document.webkitFullscreenEnabled||document.msFullscreenEnabled||document.mozFullScreenEnabled?Ob=!0:ma("Your browser does not support the fullscreen API. Fullscreen button will not be displayed.");P();wa();"loadData"!=f.lazyBuild&&A();var g=0;jQuery(window).resize(function(){g&&clearTimeout(g);S?qa():g=setTimeout(function(){var a=ca();-1==Ua||w()==h.settings.height[ba][a]&&l()==h.settings.width[ba][a]?
Ga():(ha=a,ya(Ua,0))},50)});jQuery(window).on("scroll",function(){pb&&clearTimeout(pb);pb=setTimeout(function(){"loadData"==f.lazyBuild&&xa(e.conTnParent,f.lazyBuildTreshold)&&(f.lazyBuild="none",A());-1!=Ta&&xa(e.conTnParent,f.lazyBuildTreshold)&&ib(Ta,Bb);jb()},200)});e.base.on("scroll",function(){qb&&clearTimeout(qb);qb=setTimeout(function(){jb()},200)})};(function(){for(var b=0,c=["ms","moz","webkit","o"],a=0;a<c.length&&!window.requestAnimationFrame;++a)window.requestAnimationFrame=window[c[a]+
"RequestAnimationFrame"],window.cancelAnimationFrame=window[c[a]+"CancelAnimationFrame"]||window[c[a]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(a,c){var e=(new Date).getTime(),f=Math.max(0,16-(e-b)),h=window.setTimeout(function(){a(e+f)},f);b=e+f;return h});window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})})();var V=function(b){return{}.toString.call(b).match(/\s([a-zA-Z]+)/)[1].toLowerCase()},Wa=function(b,
c,a){b=b.replace(/^\s*|\s*$/,"");b=b.replace(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i,"#$1$1$2$2$3$3");c=Math.round(256*c)*(a?-1:1);var d=b.match(/^rgba?\(\s*(\d|[1-9]\d|1\d{2}|2[0-4][0-9]|25[0-5])\s*,\s*(\d|[1-9]\d|1\d{2}|2[0-4][0-9]|25[0-5])\s*,\s*(\d|[1-9]\d|1\d{2}|2[0-4][0-9]|25[0-5])(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/i),e=d&&null!=d[4]?d[4]:null;b=d?[d[1],d[2],d[3]]:b.replace(/^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,function(a,b,c,d){return parseInt(b,16)+","+parseInt(c,16)+","+
parseInt(d,16)}).split(/,/);return d?"rgb"+(null!==e?"a":"")+"("+Math[a?"max":"min"](parseInt(b[0],10)+c,a?0:255)+", "+Math[a?"max":"min"](parseInt(b[1],10)+c,a?0:255)+", "+Math[a?"max":"min"](parseInt(b[2],10)+c,a?0:255)+(null!==e?", "+e:"")+")":["#",rb(Math[a?"max":"min"](parseInt(b[0],10)+c,a?0:255).toString(16),2),rb(Math[a?"max":"min"](parseInt(b[1],10)+c,a?0:255).toString(16),2),rb(Math[a?"max":"min"](parseInt(b[2],10)+c,a?0:255).toString(16),2)].join("")},rb=function(b,c){for(b+="";b.length<
c;)b="0"+b;return b}}
(function(s,J){function D(g,k,r){var l=w[k.type]||{};if(null==g)return r||!k.def?null:k.def;g=l.floor?~~g:parseFloat(g);return isNaN(g)?k.def:l.mod?(g+l.mod)%l.mod:0>g?0:l.max<g?l.max:g}function A(g){var x=k(),r=x._rgba=[];g=g.toLowerCase();v(q,function(k,v){var q,w=v.re.exec(g);q=w&&v.parse(w);w=v.space||"rgba";if(q)return q=x[w](q),x[l[w].cache]=q[l[w].cache],r=x._rgba=q._rgba,!1});return r.length?("0,0,0,0"===r.join()&&s.extend(r,ca.transparent),x):ca[g]}function U(g,k,r){r=(r+1)%1;return 1>6*
r?g+(k-g)*r*6:1>2*r?k:2>3*r?g+(k-g)*(2/3-r)*6:g}var I=/^([\-+])=\s*(\d+\.?\d*)/,q=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(g){return[g[1],g[2],g[3],g[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(g){return[2.55*g[1],2.55*g[2],2.55*g[3],g[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(g){return[parseInt(g[1],16),parseInt(g[2],
16),parseInt(g[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(g){return[parseInt(g[1]+g[1],16),parseInt(g[2]+g[2],16),parseInt(g[3]+g[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(g){return[g[1],g[2]/100,g[3]/100,g[4]]}}],k=s.Color=function(g,k,r,l){return new s.Color.fn.parse(g,k,r,l)},l={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},
hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},w={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},H=k.support={},da=s("<p>")[0],ca,v=s.each;da.style.cssText="background-color:rgba(1,1,1,.5)";H.rgba=-1<da.style.backgroundColor.indexOf("rgba");v(l,function(g,k){k.cache="_"+g;k.props.alpha={idx:3,type:"percent",def:1}});k.fn=s.extend(k.prototype,{parse:function(g,x,r,q){if(g===J)return this._rgba=[null,null,null,null],
this;if(g.jquery||g.nodeType)g=s(g).css(x),x=J;var w=this,N=s.type(g),I=this._rgba=[];x!==J&&(g=[g,x,r,q],N="array");if("string"===N)return this.parse(A(g)||ca._default);if("array"===N)return v(l.rgba.props,function(k,r){I[r.idx]=D(g[r.idx],r)}),this;if("object"===N)return g instanceof k?v(l,function(k,r){g[r.cache]&&(w[r.cache]=g[r.cache].slice())}):v(l,function(k,r){var l=r.cache;v(r.props,function(k,x){if(!w[l]&&r.to){if("alpha"===k||null==g[k])return;w[l]=r.to(w._rgba)}w[l][x.idx]=D(g[k],x,!0)});
w[l]&&0>s.inArray(null,w[l].slice(0,3))&&(w[l][3]=1,r.from&&(w._rgba=r.from(w[l])))}),this},is:function(g){var x=k(g),r=!0,q=this;v(l,function(g,k){var l,w=x[k.cache];w&&(l=q[k.cache]||k.to&&k.to(q._rgba)||[],v(k.props,function(g,k){if(null!=w[k.idx])return r=w[k.idx]===l[k.idx]}));return r});return r},_space:function(){var g=[],k=this;v(l,function(r,l){k[l.cache]&&g.push(r)});return g.pop()},transition:function(g,x){var r=k(g),q=r._space(),s=l[q],A=0===this.alpha()?k("transparent"):this,I=A[s.cache]||
s.to(A._rgba),H=I.slice(),r=r[s.cache];v(s.props,function(g,k){var l=k.idx,v=I[l],q=r[l],P=w[k.type]||{};null!==q&&(null===v?H[l]=q:(P.mod&&(q-v>P.mod/2?v+=P.mod:v-q>P.mod/2&&(v-=P.mod)),H[l]=D((q-v)*x+v,k)))});return this[q](H)},blend:function(g){if(1===this._rgba[3])return this;var l=this._rgba.slice(),r=l.pop(),v=k(g)._rgba;return k(s.map(l,function(g,k){return(1-r)*v[k]+r*g}))},toRgbaString:function(){var g="rgba(",k=s.map(this._rgba,function(g,k){return null==g?2<k?1:0:g});1===k[3]&&(k.pop(),
g="rgb(");return g+k.join()+")"},toHslaString:function(){var g="hsla(",k=s.map(this.hsla(),function(g,k){null==g&&(g=2<k?1:0);k&&3>k&&(g=Math.round(100*g)+"%");return g});1===k[3]&&(k.pop(),g="hsl(");return g+k.join()+")"},toHexString:function(g){var k=this._rgba.slice(),l=k.pop();g&&k.push(~~(255*l));return"#"+s.map(k,function(g){g=(g||0).toString(16);return 1===g.length?"0"+g:g}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}});k.fn.parse.prototype=k.fn;
l.hsla.to=function(g){if(null==g[0]||null==g[1]||null==g[2])return[null,null,null,g[3]];var k=g[0]/255,l=g[1]/255,v=g[2]/255;g=g[3];var q=Math.max(k,l,v),w=Math.min(k,l,v),s=q-w,A=q+w,I=.5*A,A=0===s?0:.5>=I?s/A:s/(2-A);return[Math.round(w===q?0:k===q?60*(l-v)/s+360:l===q?60*(v-k)/s+120:60*(k-l)/s+240)%360,A,I,null==g?1:g]};l.hsla.from=function(g){if(null==g[0]||null==g[1]||null==g[2])return[null,null,null,g[3]];var k=g[0]/360,l=g[1],v=g[2];g=g[3];l=.5>=v?v*(1+l):v+l-v*l;v=2*v-l;return[Math.round(255*
U(v,l,k+1/3)),Math.round(255*U(v,l,k)),Math.round(255*U(v,l,k-1/3)),g]};v(l,function(g,l){var r=l.props,q=l.cache,w=l.to,A=l.from;k.fn[g]=function(g){w&&!this[q]&&(this[q]=w(this._rgba));if(g===J)return this[q].slice();var l,x=s.type(g),I="array"===x||"object"===x?g:arguments,H=this[q].slice();v(r,function(g,k){var l=I["object"===x?g:k.idx];null==l&&(l=H[k.idx]);H[k.idx]=D(l,k)});return A?(l=k(A(H)),l[q]=H,l):k(H)};v(r,function(l,r){k.fn[l]||(k.fn[l]=function(k){var v=s.type(k),q="alpha"===l?this._hsla?
"hsla":"rgba":g,x=this[q](),w=x[r.idx];if("undefined"===v)return w;"function"===v&&(k=k.call(this,w),v=s.type(k));if(null==k&&r.empty)return this;"string"===v&&(v=I.exec(k))&&(k=w+parseFloat(v[2])*("+"===v[1]?1:-1));x[r.idx]=k;return this[q](x)})})});k.hook=function(g){g=g.split(" ");v(g,function(g,l){s.cssHooks[l]={set:function(g,v){var q,x="";if("transparent"!==v&&("string"!==s.type(v)||(q=A(v)))){v=k(q||v);if(!H.rgba&&1!==v._rgba[3]){for(q="backgroundColor"===l?g.parentNode:g;(""===x||"transparent"===
x)&&q&&q.style;)try{x=s.css(q,"backgroundColor"),q=q.parentNode}catch(w){}v=v.blend(x&&"transparent"!==x?x:"_default")}v=v.toRgbaString()}try{g.style[l]=v}catch(I){}}};s.fx.step[l]=function(g){g.colorInit||(g.start=k(g.elem,l),g.end=k(g.end),g.colorInit=!0);s.cssHooks[l].set(g.elem,g.start.transition(g.end,g.pos))}})};k.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor");s.cssHooks.borderColor=
{expand:function(g){var k={};v(["Top","Right","Bottom","Left"],function(l,v){k["border"+v+"Color"]=g});return k}};ca=s.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}})(jQuery);
(function(){function s(){}function J(q,k){for(var l=q.length;l--;)if(q[l].listener===k)return l;return-1}function D(q){return function(){return this[q].apply(this,arguments)}}var A=s.prototype,U=this,I=U.ngEventEmitter;A.getListeners=function(q){var k=this._getEvents(),l,w;if("object"===typeof q)for(w in l={},k)k.hasOwnProperty(w)&&q.test(w)&&(l[w]=k[w]);else l=k[q]||(k[q]=[]);return l};A.flattenListeners=function(q){var k=[],l;for(l=0;l<q.length;l+=1)k.push(q[l].listener);return k};A.getListenersAsObject=
function(q){var k=this.getListeners(q),l;k instanceof Array&&(l={},l[q]=k);return l||k};A.addListener=function(q,k){var l=this.getListenersAsObject(q),w="object"===typeof k,s;for(s in l)l.hasOwnProperty(s)&&-1===J(l[s],k)&&l[s].push(w?k:{listener:k,once:!1});return this};A.on=D("addListener");A.addOnceListener=function(q,k){return this.addListener(q,{listener:k,once:!0})};A.once=D("addOnceListener");A.defineEvent=function(q){this.getListeners(q);return this};A.defineEvents=function(q){for(var k=0;k<
q.length;k+=1)this.defineEvent(q[k]);return this};A.removeListener=function(q,k){var l=this.getListenersAsObject(q),w,s;for(s in l)l.hasOwnProperty(s)&&(w=J(l[s],k),-1!==w&&l[s].splice(w,1));return this};A.off=D("removeListener");A.addListeners=function(q,k){return this.manipulateListeners(!1,q,k)};A.removeListeners=function(q,k){return this.manipulateListeners(!0,q,k)};A.manipulateListeners=function(q,k,l){var w,s,A=q?this.removeListener:this.addListener;q=q?this.removeListeners:this.addListeners;
if("object"!==typeof k||k instanceof RegExp)for(w=l.length;w--;)A.call(this,k,l[w]);else for(w in k)k.hasOwnProperty(w)&&(s=k[w])&&("function"===typeof s?A.call(this,w,s):q.call(this,w,s));return this};A.removeEvent=function(q){var k=typeof q,l=this._getEvents(),w;if("string"===k)delete l[q];else if("object"===k)for(w in l)l.hasOwnProperty(w)&&q.test(w)&&delete l[w];else delete this._events;return this};A.removeAllListeners=D("removeEvent");A.emitEvent=function(q,k){var l=this.getListenersAsObject(q),
w,s,A,I;for(A in l)if(l.hasOwnProperty(A))for(s=l[A].length;s--;)w=l[A][s],!0===w.once&&this.removeListener(q,w.listener),I=w.listener.apply(this,k||[]),I===this._getOnceReturnValue()&&this.removeListener(q,w.listener);return this};A.trigger=D("emitEvent");A.emit=function(q){var k=Array.prototype.slice.call(arguments,1);return this.emitEvent(q,k)};A.setOnceReturnValue=function(q){this._onceReturnValue=q;return this};A._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:
!0};A._getEvents=function(){return this._events||(this._events={})};s.noConflict=function(){U.ngEventEmitter=I;return s};"function"===typeof define&&define.amd?define("ngEventEmitter/ngEventEmitter",[],function(){return s}):"object"===typeof module&&module.exports?module.exports=s:this.ngEventEmitter=s}).call(this);
(function(s){function J(A){var q=s.event;q.target=q.target||q.srcElement||A;return q}var D=document.documentElement,A=function(){};D.addEventListener?A=function(s,q,k){s.addEventListener(q,k,!1)}:D.attachEvent&&(A=function(s,q,k){s[q+k]=k.handleEvent?function(){var l=J(s);k.handleEvent.call(k,l)}:function(){var l=J(s);k.call(s,l)};s.attachEvent("on"+q,s[q+k])});var U=function(){};D.removeEventListener?U=function(s,q,k){s.removeEventListener(q,k,!1)}:D.detachEvent&&(U=function(s,q,k){s.detachEvent("on"+
q,s[q+k]);try{delete s[q+k]}catch(l){s[q+k]=void 0}});D={bind:A,unbind:U};"function"===typeof define&&define.amd?define("eventie/eventie",D):s.eventie=D})(this);
(function(s,J){"function"===typeof define&&define.amd?define(["ngEventEmitter/ngEventEmitter","eventie/eventie"],function(D,A){return J(s,D,A)}):"object"===typeof exports?module.exports=J(s,require("wolfy87-eventemitter"),require("eventie")):s.ngimagesLoaded=J(s,s.ngEventEmitter,s.eventie)})(window,function(s,J,D){function A(k,g){for(var l in g)k[l]=g[l];return k}function U(k){var g=[];if("[object Array]"===da.call(k))g=k;else if("number"===typeof k.length)for(var l=0,r=k.length;l<r;l++)g.push(k[l]);
else g.push(k);return g}function I(k,g,q){if(!(this instanceof I))return new I(k,g);"string"===typeof k&&(k=document.querySelectorAll(k));this.elements=U(k);this.options=A({},this.options);"function"===typeof g?q=g:A(this.options,g);if(q)this.on("always",q);this.getImages();l&&(this.jqDeferred=new l.Deferred);var r=this;setTimeout(function(){r.check()})}function q(k){this.img=k}function k(k){this.src=k;ca[k]=this}var l=s.jQuery,w=s.console,H="undefined"!==typeof w,da=Object.prototype.toString;I.prototype=
new J;I.prototype.options={};I.prototype.getImages=function(){this.images=[];for(var k=0,g=this.elements.length;k<g;k++){var l=this.elements[k];"IMG"===l.nodeName&&this.addImage(l);var r=l.nodeType;if(r&&(1===r||9===r||11===r))for(var l=l.querySelectorAll("img"),r=0,q=l.length;r<q;r++)this.addImage(l[r])}};I.prototype.addImage=function(k){k=new q(k);this.images.push(k)};I.prototype.check=function(){function k(q,v){g.options.debug&&H&&w.log("confirm",q,v);g.progress(q);l++;l===r&&g.complete();return!0}
var g=this,l=0,r=this.images.length;this.hasAnyBroken=!1;if(r)for(var q=0;q<r;q++){var s=this.images[q];s.on("confirm",k);s.check()}else this.complete()};I.prototype.progress=function(k){this.hasAnyBroken=this.hasAnyBroken||!k.isLoaded;var g=this;setTimeout(function(){g.emit("progress",g,k);g.jqDeferred&&g.jqDeferred.notify&&g.jqDeferred.notify(g,k)})};I.prototype.complete=function(){var k=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var g=this;setTimeout(function(){g.emit(k,g);g.emit("always",
g);if(g.jqDeferred)g.jqDeferred[g.hasAnyBroken?"reject":"resolve"](g)})};l&&(l.fn.ngimagesLoaded=function(k,g){return(new I(this,k,g)).jqDeferred.promise(l(this))});q.prototype=new J;q.prototype.check=function(){var l=ca[this.img.src]||new k(this.img.src);if(l.isConfirmed)this.confirm(l.isLoaded,"cached was confirmed");else if(this.img.complete&&void 0!==this.img.naturalWidth)this.confirm(0!==this.img.naturalWidth,"naturalWidth");else{var g=this;l.on("confirm",function(k,l){g.confirm(k.isLoaded,l);
return!0});l.check()}};q.prototype.confirm=function(k,g){this.isLoaded=k;this.emit("confirm",this,g)};var ca={};k.prototype=new J;k.prototype.check=function(){if(!this.isChecked){var k=new Image;D.bind(k,"load",this);D.bind(k,"error",this);k.src=this.src;this.isChecked=!0}};k.prototype.handleEvent=function(k){var g="on"+k.type;if(this[g])this[g](k)};k.prototype.onload=function(k){this.confirm(!0,"onload");this.unbindProxyEvents(k)};k.prototype.onerror=function(k){this.confirm(!1,"onerror");this.unbindProxyEvents(k)};
k.prototype.confirm=function(k,g){this.isConfirmed=!0;this.isLoaded=k;this.emit("confirm",this,g)};k.prototype.unbindProxyEvents=function(k){D.unbind(k.target,"load",this);D.unbind(k.target,"error",this)};return I});
(function(){var s="undefined"!==typeof module&&module.exports,J="undefined"!==typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element,D=function(){var s,A,q=["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "),"webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "),"webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "),
"mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "),"msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")],k=0;A=q.length;for(var l={};k<A;k++)if((s=q[k])&&s[1]in document){k=0;for(A=s.length;k<A;k++)l[q[0][k]]=s[k];return l}return!1}(),A={request:function(s){var A=D.requestFullscreen;s=s||document.documentElement;if(/5\.1[\.\d]* Safari/.test(navigator.userAgent))s[A]();
else s[A](J&&Element.ALLOW_KEYBOARD_INPUT)},exit:function(){document[D.exitFullscreen]()},toggle:function(s){this.isFullscreen?this.exit():this.request(s)},onchange:function(){},onerror:function(){},raw:D};D?(Object.defineProperties(A,{isFullscreen:{get:function(){return!!document[D.fullscreenElement]}},element:{enumerable:!0,get:function(){return document[D.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return!!document[D.fullscreenEnabled]}}}),document.addEventListener(D.fullscreenchange,
function(s){A.onchange.call(A,s)}),document.addEventListener(D.fullscreenerror,function(s){A.onerror.call(A,s)}),s?module.exports=A:window.ngscreenfull=A):s?module.exports=!1:window.ngscreenfull=!1})();
;(function($, window, document, undefined) {

	var pluginName = 'stellar',
		defaults = {
			scrollProperty: 'scroll',
			positionProperty: 'position',
			horizontalScrolling: true,
			verticalScrolling: true,
			horizontalOffset: 0,
			verticalOffset: 0,
			responsive: false,
			parallaxBackgrounds: true,
			parallaxElements: true,
			hideDistantElements: true,
			hideElement: function($elem) { $elem.hide(); },
			showElement: function($elem) { $elem.show(); }
		},

		scrollProperty = {
			scroll: {
				getLeft: function($elem) { return $elem.scrollLeft(); },
				setLeft: function($elem, val) { $elem.scrollLeft(val); },

				getTop: function($elem) { return $elem.scrollTop();	},
				setTop: function($elem, val) { $elem.scrollTop(val); }
			},
			position: {
				getLeft: function($elem) { return parseInt($elem.css('left'), 10) * -1; },
				getTop: function($elem) { return parseInt($elem.css('top'), 10) * -1; }
			},
			margin: {
				getLeft: function($elem) { return parseInt($elem.css('margin-left'), 10) * -1; },
				getTop: function($elem) { return parseInt($elem.css('margin-top'), 10) * -1; }
			},
			transform: {
				getLeft: function($elem) {
					var computedTransform = getComputedStyle($elem[0])[prefixedTransform];
					return (computedTransform !== 'none' ? parseInt(computedTransform.match(/(-?[0-9]+)/g)[4], 10) * -1 : 0);
				},
				getTop: function($elem) {
					var computedTransform = getComputedStyle($elem[0])[prefixedTransform];
					return (computedTransform !== 'none' ? parseInt(computedTransform.match(/(-?[0-9]+)/g)[5], 10) * -1 : 0);
				}
			}
		},

		positionProperty = {
			position: {
				setLeft: function($elem, left) { $elem.css('left', left); },
				setTop: function($elem, top) { $elem.css('top', top); }
			},
			transform: {
				setPosition: function($elem, left, startingLeft, top, startingTop) {
					$elem[0].style[prefixedTransform] = 'translate3d(' + (left - startingLeft) + 'px, ' + (top - startingTop) + 'px, 0)';
				}
			}
		},

		// Returns a function which adds a vendor prefix to any CSS property name
		vendorPrefix = (function() {
			var prefixes = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
				style = $('script')[0].style,
				prefix = '',
				prop;

			for (prop in style) {
				if (prefixes.test(prop)) {
					prefix = prop.match(prefixes)[0];
					break;
				}
			}

			if ('WebkitOpacity' in style) { prefix = 'Webkit'; }
			if ('KhtmlOpacity' in style) { prefix = 'Khtml'; }

			return function(property) {
				return prefix + (prefix.length > 0 ? property.charAt(0).toUpperCase() + property.slice(1) : property);
			};
		}()),

		prefixedTransform = vendorPrefix('transform'),

		supportsBackgroundPositionXY = $('<div />', { style: 'background:#fff' }).css('background-position-x') !== undefined,

		setBackgroundPosition = (supportsBackgroundPositionXY ?
			function($elem, x, y) {
				$elem.css({
					'background-position-x': x,
					'background-position-y': y
				});
			} :
			function($elem, x, y) {
				$elem.css('background-position', x + ' ' + y);
			}
		),

		getBackgroundPosition = (supportsBackgroundPositionXY ?
			function($elem) {
				return [
					$elem.css('background-position-x'),
					$elem.css('background-position-y')
				];
			} :
			function($elem) {
				return $elem.css('background-position').split(' ');
			}
		),

		requestAnimFrame = (
			window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(callback) {
				setTimeout(callback, 1000 / 60);
			}
		);

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype = {
		init: function() {
			this.options.name = pluginName + '_' + Math.floor(Math.random() * 1e9);

			this._defineElements();
			this._defineGetters();
			this._defineSetters();
			this._handleWindowLoadAndResize();
			this._detectViewport();

			this.refresh({ firstLoad: true });

			if (this.options.scrollProperty === 'scroll') {
				this._handleScrollEvent();
			} else {
				this._startAnimationLoop();
			}
		},
		_defineElements: function() {
			if (this.element === document.body) this.element = window;
			this.$scrollElement = $(this.element);
			this.$element = (this.element === window ? $('body') : this.$scrollElement);
			this.$viewportElement = (this.options.viewportElement !== undefined ? $(this.options.viewportElement) : (this.$scrollElement[0] === window || this.options.scrollProperty === 'scroll' ? this.$scrollElement : this.$scrollElement.parent()) );
		},
		_defineGetters: function() {
			var self = this,
				scrollPropertyAdapter = scrollProperty[self.options.scrollProperty];

			this._getScrollLeft = function() {
				return scrollPropertyAdapter.getLeft(self.$scrollElement);
			};

			this._getScrollTop = function() {
				return scrollPropertyAdapter.getTop(self.$scrollElement);
			};
		},
		_defineSetters: function() {
			var self = this,
				scrollPropertyAdapter = scrollProperty[self.options.scrollProperty],
				positionPropertyAdapter = positionProperty[self.options.positionProperty],
				setScrollLeft = scrollPropertyAdapter.setLeft,
				setScrollTop = scrollPropertyAdapter.setTop;

			this._setScrollLeft = (typeof setScrollLeft === 'function' ? function(val) {
				setScrollLeft(self.$scrollElement, val);
			} : $.noop);

			this._setScrollTop = (typeof setScrollTop === 'function' ? function(val) {
				setScrollTop(self.$scrollElement, val);
			} : $.noop);

			this._setPosition = positionPropertyAdapter.setPosition ||
				function($elem, left, startingLeft, top, startingTop) {
					if (self.options.horizontalScrolling) {
						positionPropertyAdapter.setLeft($elem, left, startingLeft);
					}

					if (self.options.verticalScrolling) {
						positionPropertyAdapter.setTop($elem, top, startingTop);
					}
				};
		},
		_handleWindowLoadAndResize: function() {
			var self = this,
				$window = $(window);

			if (self.options.responsive) {
				$window.bind('load.' + this.name, function() {
					self.refresh();
				});
			}

			$window.bind('resize.' + this.name, function() {
				self._detectViewport();

				if (self.options.responsive) {
					self.refresh();
				}
			});
		},
		refresh: function(options) {
			var self = this,
				oldLeft = self._getScrollLeft(),
				oldTop = self._getScrollTop();

			if (!options || !options.firstLoad) {
				this._reset();
			}

			this._setScrollLeft(0);
			this._setScrollTop(0);

			this._setOffsets();
			this._findParticles();
			this._findBackgrounds();

			// Fix for WebKit background rendering bug
			if (options && options.firstLoad && /WebKit/.test(navigator.userAgent)) {
				$(window).load(function() {
					var oldLeft = self._getScrollLeft(),
						oldTop = self._getScrollTop();

					self._setScrollLeft(oldLeft + 1);
					self._setScrollTop(oldTop + 1);

					self._setScrollLeft(oldLeft);
					self._setScrollTop(oldTop);
				});
			}

			this._setScrollLeft(oldLeft);
			this._setScrollTop(oldTop);
		},
		_detectViewport: function() {
			var viewportOffsets = this.$viewportElement.offset(),
				hasOffsets = viewportOffsets !== null && viewportOffsets !== undefined;

			this.viewportWidth = this.$viewportElement.width();
			this.viewportHeight = this.$viewportElement.height();

			this.viewportOffsetTop = (hasOffsets ? viewportOffsets.top : 0);
			this.viewportOffsetLeft = (hasOffsets ? viewportOffsets.left : 0);
		},
		_findParticles: function() {
			var self = this,
				scrollLeft = this._getScrollLeft(),
				scrollTop = this._getScrollTop();

			if (this.particles !== undefined) {
				for (var i = this.particles.length - 1; i >= 0; i--) {
					this.particles[i].$element.data('stellar-elementIsActive', undefined);
				}
			}

			this.particles = [];

			if (!this.options.parallaxElements) return;

			this.$element.find('[data-stellar-ratio]').each(function(i) {
				var $this = $(this),
					horizontalOffset,
					verticalOffset,
					positionLeft,
					positionTop,
					marginLeft,
					marginTop,
					$offsetParent,
					offsetLeft,
					offsetTop,
					parentOffsetLeft = 0,
					parentOffsetTop = 0,
					tempParentOffsetLeft = 0,
					tempParentOffsetTop = 0;

				// Ensure this element isn't already part of another scrolling element
				if (!$this.data('stellar-elementIsActive')) {
					$this.data('stellar-elementIsActive', this);
				} else if ($this.data('stellar-elementIsActive') !== this) {
					return;
				}

				self.options.showElement($this);

				// Save/restore the original top and left CSS values in case we refresh the particles or destroy the instance
				if (!$this.data('stellar-startingLeft')) {
					$this.data('stellar-startingLeft', $this.css('left'));
					$this.data('stellar-startingTop', $this.css('top'));
				} else {
					$this.css('left', $this.data('stellar-startingLeft'));
					$this.css('top', $this.data('stellar-startingTop'));
				}

				positionLeft = $this.position().left;
				positionTop = $this.position().top;

				// Catch-all for margin top/left properties (these evaluate to 'auto' in IE7 and IE8)
				marginLeft = ($this.css('margin-left') === 'auto') ? 0 : parseInt($this.css('margin-left'), 10);
				marginTop = ($this.css('margin-top') === 'auto') ? 0 : parseInt($this.css('margin-top'), 10);

				offsetLeft = $this.offset().left - marginLeft;
				offsetTop = $this.offset().top - marginTop;

				// Calculate the offset parent
				$this.parents().each(function() {
					var $this = $(this);

					if ($this.data('stellar-offset-parent') === true) {
						parentOffsetLeft = tempParentOffsetLeft;
						parentOffsetTop = tempParentOffsetTop;
						$offsetParent = $this;

						return false;
					} else {
						tempParentOffsetLeft += $this.position().left;
						tempParentOffsetTop += $this.position().top;
					}
				});

				// Detect the offsets
				horizontalOffset = ($this.data('stellar-horizontal-offset') !== undefined ? $this.data('stellar-horizontal-offset') : ($offsetParent !== undefined && $offsetParent.data('stellar-horizontal-offset') !== undefined ? $offsetParent.data('stellar-horizontal-offset') : self.horizontalOffset));
				verticalOffset = ($this.data('stellar-vertical-offset') !== undefined ? $this.data('stellar-vertical-offset') : ($offsetParent !== undefined && $offsetParent.data('stellar-vertical-offset') !== undefined ? $offsetParent.data('stellar-vertical-offset') : self.verticalOffset));

				// Add our object to the particles collection
				self.particles.push({
					$element: $this,
					$offsetParent: $offsetParent,
					isFixed: $this.css('position') === 'fixed',
					horizontalOffset: horizontalOffset,
					verticalOffset: verticalOffset,
					startingPositionLeft: positionLeft,
					startingPositionTop: positionTop,
					startingOffsetLeft: offsetLeft,
					startingOffsetTop: offsetTop,
					parentOffsetLeft: parentOffsetLeft,
					parentOffsetTop: parentOffsetTop,
					stellarRatio: ($this.data('stellar-ratio') !== undefined ? $this.data('stellar-ratio') : 1),
					width: $this.outerWidth(true),
					height: $this.outerHeight(true),
					isHidden: false
				});
			});
		},
		_findBackgrounds: function() {
			var self = this,
				scrollLeft = this._getScrollLeft(),
				scrollTop = this._getScrollTop(),
				$backgroundElements;

			this.backgrounds = [];

			if (!this.options.parallaxBackgrounds) return;

			$backgroundElements = this.$element.find('[data-stellar-background-ratio]');

			if (this.$element.data('stellar-background-ratio')) {
                $backgroundElements = $backgroundElements.add(this.$element);
			}

			$backgroundElements.each(function() {
				var $this = $(this),
					backgroundPosition = getBackgroundPosition($this),
					horizontalOffset,
					verticalOffset,
					positionLeft,
					positionTop,
					marginLeft,
					marginTop,
					offsetLeft,
					offsetTop,
					$offsetParent,
					parentOffsetLeft = 0,
					parentOffsetTop = 0,
					tempParentOffsetLeft = 0,
					tempParentOffsetTop = 0;

				// Ensure this element isn't already part of another scrolling element
				if (!$this.data('stellar-backgroundIsActive')) {
					$this.data('stellar-backgroundIsActive', this);
				} else if ($this.data('stellar-backgroundIsActive') !== this) {
					return;
				}

				// Save/restore the original top and left CSS values in case we destroy the instance
				if (!$this.data('stellar-backgroundStartingLeft')) {
					$this.data('stellar-backgroundStartingLeft', backgroundPosition[0]);
					$this.data('stellar-backgroundStartingTop', backgroundPosition[1]);
				} else {
					setBackgroundPosition($this, $this.data('stellar-backgroundStartingLeft'), $this.data('stellar-backgroundStartingTop'));
				}

				// Catch-all for margin top/left properties (these evaluate to 'auto' in IE7 and IE8)
				marginLeft = ($this.css('margin-left') === 'auto') ? 0 : parseInt($this.css('margin-left'), 10);
				marginTop = ($this.css('margin-top') === 'auto') ? 0 : parseInt($this.css('margin-top'), 10);

				offsetLeft = $this.offset().left - marginLeft - scrollLeft;
				offsetTop = $this.offset().top - marginTop - scrollTop;
				
				// Calculate the offset parent
				$this.parents().each(function() {
					var $this = $(this);

					if ($this.data('stellar-offset-parent') === true) {
						parentOffsetLeft = tempParentOffsetLeft;
						parentOffsetTop = tempParentOffsetTop;
						$offsetParent = $this;

						return false;
					} else {
						tempParentOffsetLeft += $this.position().left;
						tempParentOffsetTop += $this.position().top;
					}
				});

				// Detect the offsets
				horizontalOffset = ($this.data('stellar-horizontal-offset') !== undefined ? $this.data('stellar-horizontal-offset') : ($offsetParent !== undefined && $offsetParent.data('stellar-horizontal-offset') !== undefined ? $offsetParent.data('stellar-horizontal-offset') : self.horizontalOffset));
				verticalOffset = ($this.data('stellar-vertical-offset') !== undefined ? $this.data('stellar-vertical-offset') : ($offsetParent !== undefined && $offsetParent.data('stellar-vertical-offset') !== undefined ? $offsetParent.data('stellar-vertical-offset') : self.verticalOffset));

				self.backgrounds.push({
					$element: $this,
					$offsetParent: $offsetParent,
					isFixed: $this.css('background-attachment') === 'fixed',
					horizontalOffset: horizontalOffset,
					verticalOffset: verticalOffset,
					startingValueLeft: backgroundPosition[0],
					startingValueTop: backgroundPosition[1],
					startingBackgroundPositionLeft: (isNaN(parseInt(backgroundPosition[0], 10)) || -1!=backgroundPosition[0].indexOf('%') ? 0 : parseInt(backgroundPosition[0], 10)),
					startingBackgroundPositionTop: (isNaN(parseInt(backgroundPosition[1], 10)) || -1!=backgroundPosition[1].indexOf('%') ? 0 : parseInt(backgroundPosition[1], 10)),
					startingPositionLeft: $this.position().left,
					startingPositionTop: $this.position().top,
					startingOffsetLeft: offsetLeft,
					startingOffsetTop: offsetTop,
					parentOffsetLeft: parentOffsetLeft,
					parentOffsetTop: parentOffsetTop,
					stellarRatio: ($this.data('stellar-background-ratio') === undefined ? 1 : $this.data('stellar-background-ratio'))
				});
			});
		},
		_reset: function() {
			var particle,
				startingPositionLeft,
				startingPositionTop,
				background,
				i;

			for (i = this.particles.length - 1; i >= 0; i--) {
				particle = this.particles[i];
				startingPositionLeft = particle.$element.data('stellar-startingLeft');
				startingPositionTop = particle.$element.data('stellar-startingTop');

				this._setPosition(particle.$element, startingPositionLeft, startingPositionLeft, startingPositionTop, startingPositionTop);

				this.options.showElement(particle.$element);

				particle.$element.data('stellar-startingLeft', null).data('stellar-elementIsActive', null).data('stellar-backgroundIsActive', null);
			}

			for (i = this.backgrounds.length - 1; i >= 0; i--) {
				background = this.backgrounds[i];

				background.$element.data('stellar-backgroundStartingLeft', null).data('stellar-backgroundStartingTop', null);

				setBackgroundPosition(background.$element, background.startingValueLeft, background.startingValueTop);
			}
		},
		destroy: function() {
			this._reset();

			this.$scrollElement.unbind('resize.' + this.name).unbind('scroll.' + this.name);
			this._animationLoop = $.noop;

			$(window).unbind('load.' + this.name).unbind('resize.' + this.name);
		},
		_setOffsets: function() {
			var self = this,
				$window = $(window);

			$window.unbind('resize.horizontal-' + this.name).unbind('resize.vertical-' + this.name);

			if (typeof this.options.horizontalOffset === 'function') {
				this.horizontalOffset = this.options.horizontalOffset();
				$window.bind('resize.horizontal-' + this.name, function() {
					self.horizontalOffset = self.options.horizontalOffset();
				});
			} else {
				this.horizontalOffset = this.options.horizontalOffset;
			}

			if (typeof this.options.verticalOffset === 'function') {
				this.verticalOffset = this.options.verticalOffset();
				$window.bind('resize.vertical-' + this.name, function() {
					self.verticalOffset = self.options.verticalOffset();
				});
			} else {
				this.verticalOffset = this.options.verticalOffset;
			}
		},
		_repositionElements: function() {
			var scrollLeft = this._getScrollLeft(),
				scrollTop = this._getScrollTop(),
				horizontalOffset,
				verticalOffset,
				particle,
				fixedRatioOffset,
				background,
				bgLeft,
				bgTop,
				isVisibleVertical = true,
				isVisibleHorizontal = true,
				newPositionLeft,
				newPositionTop,
				newOffsetLeft,
				newOffsetTop,
				i;

			// First check that the scroll position or container size has changed
			if (this.currentScrollLeft === scrollLeft && this.currentScrollTop === scrollTop && this.currentWidth === this.viewportWidth && this.currentHeight === this.viewportHeight) {
				return;
			} else {
				this.currentScrollLeft = scrollLeft;
				this.currentScrollTop = scrollTop;
				this.currentWidth = this.viewportWidth;
				this.currentHeight = this.viewportHeight;
			}

			// Reposition elements
			for (i = this.particles.length - 1; i >= 0; i--) {
				particle = this.particles[i];

				fixedRatioOffset = (particle.isFixed ? 1 : 0);

				// Calculate position, then calculate what the particle's new offset will be (for visibility check)
				if (this.options.horizontalScrolling) {
					newPositionLeft = (scrollLeft + particle.horizontalOffset + this.viewportOffsetLeft + particle.startingPositionLeft - particle.startingOffsetLeft + particle.parentOffsetLeft) * -(particle.stellarRatio + fixedRatioOffset - 1) + particle.startingPositionLeft;
					newOffsetLeft = newPositionLeft - particle.startingPositionLeft + particle.startingOffsetLeft;
				} else {
					newPositionLeft = particle.startingPositionLeft;
					newOffsetLeft = particle.startingOffsetLeft;
				}

				if (this.options.verticalScrolling) {
					newPositionTop = (scrollTop + particle.verticalOffset + this.viewportOffsetTop + particle.startingPositionTop - particle.startingOffsetTop + particle.parentOffsetTop) * -(particle.stellarRatio + fixedRatioOffset - 1) + particle.startingPositionTop;
					newOffsetTop = newPositionTop - particle.startingPositionTop + particle.startingOffsetTop;
				} else {
					newPositionTop = particle.startingPositionTop;
					newOffsetTop = particle.startingOffsetTop;
				}

				// Check visibility
				if (this.options.hideDistantElements) {
					isVisibleHorizontal = !this.options.horizontalScrolling || newOffsetLeft + particle.width > (particle.isFixed ? 0 : scrollLeft) && newOffsetLeft < (particle.isFixed ? 0 : scrollLeft) + this.viewportWidth + this.viewportOffsetLeft;
					isVisibleVertical = !this.options.verticalScrolling || newOffsetTop + particle.height > (particle.isFixed ? 0 : scrollTop) && newOffsetTop < (particle.isFixed ? 0 : scrollTop) + this.viewportHeight + this.viewportOffsetTop;
				}

				if (isVisibleHorizontal && isVisibleVertical) {
					if (particle.isHidden) {
						this.options.showElement(particle.$element);
						particle.isHidden = false;
					}

					this._setPosition(particle.$element, newPositionLeft, particle.startingPositionLeft, newPositionTop, particle.startingPositionTop);
				} else {
					if (!particle.isHidden) {
						this.options.hideElement(particle.$element);
						particle.isHidden = true;
					}
				}
			}

			// Reposition backgrounds
			for (i = this.backgrounds.length - 1; i >= 0; i--) {
				background = this.backgrounds[i];

				fixedRatioOffset = (background.isFixed ? 0 : 1);
				bgLeft = (this.options.horizontalScrolling ? (scrollLeft + background.horizontalOffset - this.viewportOffsetLeft - background.startingOffsetLeft + background.parentOffsetLeft - background.startingBackgroundPositionLeft) * (fixedRatioOffset - background.stellarRatio) + 'px' : background.startingValueLeft);
				bgTop = (this.options.verticalScrolling ? (scrollTop + background.verticalOffset - this.viewportOffsetTop - background.startingOffsetTop + background.parentOffsetTop - background.startingBackgroundPositionTop) * (fixedRatioOffset - background.stellarRatio) + 'px' : background.startingValueTop);

				setBackgroundPosition(background.$element, bgLeft, bgTop);
			}
		},
		_handleScrollEvent: function() {
			var self = this,
				ticking = false;

			var update = function() {
				self._repositionElements();
				ticking = false;
			};

			var requestTick = function() {
				if (!ticking) {
					requestAnimFrame(update);
					ticking = true;
				}
			};
			
			this.$scrollElement.bind('scroll.' + this.name, requestTick);
			requestTick();
		},
		_startAnimationLoop: function() {
			var self = this;

			this._animationLoop = function() {
				requestAnimFrame(self._animationLoop);
				self._repositionElements();
			};
			this._animationLoop();
		}
	};

	$.fn[pluginName] = function (options) {
		var args = arguments;
		if (options === undefined || typeof options === 'object') {
			return this.each(function () {
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
				}
			});
		} else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			return this.each(function () {
				var instance = $.data(this, 'plugin_' + pluginName);
				if (instance instanceof Plugin && typeof instance[options] === 'function') {
					instance[options].apply(instance, Array.prototype.slice.call(args, 1));
				}
				if (options === 'destroy') {
					$.data(this, 'plugin_' + pluginName, null);
				}
			});
		}
	};

	$[pluginName] = function(options) {
		var $window = $(window);
		return $window.stellar.apply($window, Array.prototype.slice.call(arguments, 0));
	};

	// Expose the scroll and position property function hashes so they can be extended
	$[pluginName].scrollProperty = scrollProperty;
	$[pluginName].positionProperty = positionProperty;

	// Expose the plugin class so it can be modified
	window.Stellar = Plugin;
}(jQuery, this, document));
/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var cbpAnimatedHeader = (function () {

    var docElem = document.documentElement,
		header = document.querySelector('.cbp-af-header'),
		didScroll = false,
		changeHeaderOn = 300;

    function init() {
        window.addEventListener('scroll', function (event) {
            if (!didScroll) {
                didScroll = true;
                setTimeout(scrollPage, 250);
            }
        }, false);
    }

    function scrollPage() {
        var sy = scrollY();
        if (sy >= changeHeaderOn) {
            classie.add(header, 'cbp-af-header-shrink');
        }
        else {
            classie.remove(header, 'cbp-af-header-shrink');
        }
        didScroll = false;
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    init();

})();
/* NUGET: BEGIN LICENSE TEXT
 *
 * Microsoft grants you the right to use these script files for the sole
 * purpose of either: (i) interacting through your browser with the Microsoft
 * website or online service, subject to the applicable licensing or use
 * terms; or (ii) using the files as included with a Microsoft product subject
 * to that product's license terms. Microsoft reserves all other rights to the
 * files not expressly granted by Microsoft, whether by implication, estoppel
 * or otherwise. Insofar as a script file is dual licensed under GPL,
 * Microsoft neither took the code under GPL nor distributes it thereunder but
 * under the terms set out in this paragraph. All notices and licenses
 * below are for informational purposes only.
 *
 * NUGET: END LICENSE TEXT */

/**
* bootstrap.js v3.0.0 by @fat and @mdo
* Copyright 2013 Twitter Inc.
* http://www.apache.org/licenses/LICENSE-2.0
*/
if (!jQuery) throw new Error("Bootstrap requires jQuery"); +function (a) { "use strict"; function b() { var a = document.createElement("bootstrap"), b = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" }; for (var c in b) if (void 0 !== a.style[c]) return { end: b[c] } } a.fn.emulateTransitionEnd = function (b) { var c = !1, d = this; a(this).one(a.support.transition.end, function () { c = !0 }); var e = function () { c || a(d).trigger(a.support.transition.end) }; return setTimeout(e, b), this }, a(function () { a.support.transition = b() }) }(window.jQuery), +function (a) { "use strict"; var b = '[data-dismiss="alert"]', c = function (c) { a(c).on("click", b, this.close) }; c.prototype.close = function (b) { function c() { f.trigger("closed.bs.alert").remove() } var d = a(this), e = d.attr("data-target"); e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, "")); var f = a(e); b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one(a.support.transition.end, c).emulateTransitionEnd(150) : c()) }; var d = a.fn.alert; a.fn.alert = function (b) { return this.each(function () { var d = a(this), e = d.data("bs.alert"); e || d.data("bs.alert", e = new c(this)), "string" == typeof b && e[b].call(d) }) }, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function () { return a.fn.alert = d, this }, a(document).on("click.bs.alert.data-api", b, c.prototype.close) }(window.jQuery), +function (a) { "use strict"; var b = function (c, d) { this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d) }; b.DEFAULTS = { loadingText: "loading..." }, b.prototype.setState = function (a) { var b = "disabled", c = this.$element, d = c.is("input") ? "val" : "html", e = c.data(); a += "Text", e.resetText || c.data("resetText", c[d]()), c[d](e[a] || this.options[a]), setTimeout(function () { "loadingText" == a ? c.addClass(b).attr(b, b) : c.removeClass(b).removeAttr(b) }, 0) }, b.prototype.toggle = function () { var a = this.$element.closest('[data-toggle="buttons"]'); if (a.length) { var b = this.$element.find("input").prop("checked", !this.$element.hasClass("active")).trigger("change"); "radio" === b.prop("type") && a.find(".active").removeClass("active") } this.$element.toggleClass("active") }; var c = a.fn.button; a.fn.button = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.button"), f = "object" == typeof c && c; e || d.data("bs.button", e = new b(this, f)), "toggle" == c ? e.toggle() : c && e.setState(c) }) }, a.fn.button.Constructor = b, a.fn.button.noConflict = function () { return a.fn.button = c, this }, a(document).on("click.bs.button.data-api", "[data-toggle^=button]", function (b) { var c = a(b.target); c.hasClass("btn") || (c = c.closest(".btn")), c.button("toggle"), b.preventDefault() }) }(window.jQuery), +function (a) { "use strict"; var b = function (b, c) { this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this)) }; b.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0 }, b.prototype.cycle = function (b) { return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this }, b.prototype.getActiveIndex = function () { return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active) }, b.prototype.to = function (b) { var c = this, d = this.getActiveIndex(); return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid", function () { c.to(b) }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b])) }, b.prototype.pause = function (b) { return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition.end && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this }, b.prototype.next = function () { return this.sliding ? void 0 : this.slide("next") }, b.prototype.prev = function () { return this.sliding ? void 0 : this.slide("prev") }, b.prototype.slide = function (b, c) { var d = this.$element.find(".item.active"), e = c || d[b](), f = this.interval, g = "next" == b ? "left" : "right", h = "next" == b ? "first" : "last", i = this; if (!e.length) { if (!this.options.wrap) return; e = this.$element.find(".item")[h]() } this.sliding = !0, f && this.pause(); var j = a.Event("slide.bs.carousel", { relatedTarget: e[0], direction: g }); if (!e.hasClass("active")) { if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function () { var b = a(i.$indicators.children()[i.getActiveIndex()]); b && b.addClass("active") })), a.support.transition && this.$element.hasClass("slide")) { if (this.$element.trigger(j), j.isDefaultPrevented()) return; e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one(a.support.transition.end, function () { e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function () { i.$element.trigger("slid") }, 0) }).emulateTransitionEnd(600) } else { if (this.$element.trigger(j), j.isDefaultPrevented()) return; d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid") } return f && this.cycle(), this } }; var c = a.fn.carousel; a.fn.carousel = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.carousel"), f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c), g = "string" == typeof c ? c : f.slide; e || d.data("bs.carousel", e = new b(this, f)), "number" == typeof c ? e.to(c) : g ? e[g]() : f.interval && e.pause().cycle() }) }, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function () { return a.fn.carousel = c, this }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function (b) { var c, d = a(this), e = a(d.attr("data-target") || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "")), f = a.extend({}, e.data(), d.data()), g = d.attr("data-slide-to"); g && (f.interval = !1), e.carousel(f), (g = d.attr("data-slide-to")) && e.data("bs.carousel").to(g), b.preventDefault() }), a(window).on("load", function () { a('[data-ride="carousel"]').each(function () { var b = a(this); b.carousel(b.data()) }) }) }(window.jQuery), +function (a) { "use strict"; var b = function (c, d) { this.$element = a(c), this.options = a.extend({}, b.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle() }; b.DEFAULTS = { toggle: !0 }, b.prototype.dimension = function () { var a = this.$element.hasClass("width"); return a ? "width" : "height" }, b.prototype.show = function () { if (!this.transitioning && !this.$element.hasClass("in")) { var b = a.Event("show.bs.collapse"); if (this.$element.trigger(b), !b.isDefaultPrevented()) { var c = this.$parent && this.$parent.find("> .panel > .in"); if (c && c.length) { var d = c.data("bs.collapse"); if (d && d.transitioning) return; c.collapse("hide"), d || c.data("bs.collapse", null) } var e = this.dimension(); this.$element.removeClass("collapse").addClass("collapsing")[e](0), this.transitioning = 1; var f = function () { this.$element.removeClass("collapsing").addClass("in")[e]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse") }; if (!a.support.transition) return f.call(this); var g = a.camelCase(["scroll", e].join("-")); this.$element.one(a.support.transition.end, a.proxy(f, this)).emulateTransitionEnd(350)[e](this.$element[0][g]) } } }, b.prototype.hide = function () { if (!this.transitioning && this.$element.hasClass("in")) { var b = a.Event("hide.bs.collapse"); if (this.$element.trigger(b), !b.isDefaultPrevented()) { var c = this.dimension(); this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1; var d = function () { this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse") }; return a.support.transition ? (this.$element[c](0).one(a.support.transition.end, a.proxy(d, this)).emulateTransitionEnd(350), void 0) : d.call(this) } } }, b.prototype.toggle = function () { this[this.$element.hasClass("in") ? "hide" : "show"]() }; var c = a.fn.collapse; a.fn.collapse = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.collapse"), f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c); e || d.data("bs.collapse", e = new b(this, f)), "string" == typeof c && e[c]() }) }, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function () { return a.fn.collapse = c, this }, a(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function (b) { var c, d = a(this), e = d.attr("data-target") || b.preventDefault() || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""), f = a(e), g = f.data("bs.collapse"), h = g ? "toggle" : d.data(), i = d.attr("data-parent"), j = i && a(i); g && g.transitioning || (j && j.find('[data-toggle=collapse][data-parent="' + i + '"]').not(d).addClass("collapsed"), d[f.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), f.collapse(h) }) }(window.jQuery), +function (a) { "use strict"; function b() { a(d).remove(), a(e).each(function (b) { var d = c(a(this)); d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown")), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown")) }) } function c(b) { var c = b.attr("data-target"); c || (c = b.attr("href"), c = c && /#/.test(c) && c.replace(/.*(?=#[^\s]*$)/, "")); var d = c && a(c); return d && d.length ? d : b.parent() } var d = ".dropdown-backdrop", e = "[data-toggle=dropdown]", f = function (b) { a(b).on("click.bs.dropdown", this.toggle) }; f.prototype.toggle = function (d) { var e = a(this); if (!e.is(".disabled, :disabled")) { var f = c(e), g = f.hasClass("open"); if (b(), !g) { if ("ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b), f.trigger(d = a.Event("show.bs.dropdown")), d.isDefaultPrevented()) return; f.toggleClass("open").trigger("shown.bs.dropdown"), e.focus() } return !1 } }, f.prototype.keydown = function (b) { if (/(38|40|27)/.test(b.keyCode)) { var d = a(this); if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) { var f = c(d), g = f.hasClass("open"); if (!g || g && 27 == b.keyCode) return 27 == b.which && f.find(e).focus(), d.click(); var h = a("[role=menu] li:not(.divider):visible a", f); if (h.length) { var i = h.index(h.filter(":focus")); 38 == b.keyCode && i > 0 && i--, 40 == b.keyCode && i < h.length - 1 && i++, ~i || (i = 0), h.eq(i).focus() } } } }; var g = a.fn.dropdown; a.fn.dropdown = function (b) { return this.each(function () { var c = a(this), d = c.data("dropdown"); d || c.data("dropdown", d = new f(this)), "string" == typeof b && d[b].call(c) }) }, a.fn.dropdown.Constructor = f, a.fn.dropdown.noConflict = function () { return a.fn.dropdown = g, this }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function (a) { a.stopPropagation() }).on("click.bs.dropdown.data-api", e, f.prototype.toggle).on("keydown.bs.dropdown.data-api", e + ", [role=menu]", f.prototype.keydown) }(window.jQuery), +function (a) { "use strict"; var b = function (b, c) { this.options = c, this.$element = a(b), this.$backdrop = this.isShown = null, this.options.remote && this.$element.load(this.options.remote) }; b.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }, b.prototype.toggle = function (a) { return this[this.isShown ? "hide" : "show"](a) }, b.prototype.show = function (b) { var c = this, d = a.Event("show.bs.modal", { relatedTarget: b }); this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function () { var d = a.support.transition && c.$element.hasClass("fade"); c.$element.parent().length || c.$element.appendTo(document.body), c.$element.show(), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus(); var e = a.Event("shown.bs.modal", { relatedTarget: b }); d ? c.$element.find(".modal-dialog").one(a.support.transition.end, function () { c.$element.focus().trigger(e) }).emulateTransitionEnd(300) : c.$element.focus().trigger(e) })) }, b.prototype.hide = function (b) { b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one(a.support.transition.end, a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal()) }, b.prototype.enforceFocus = function () { a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function (a) { this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.focus() }, this)) }, b.prototype.escape = function () { this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function (a) { 27 == a.which && this.hide() }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal") }, b.prototype.hideModal = function () { var a = this; this.$element.hide(), this.backdrop(function () { a.removeBackdrop(), a.$element.trigger("hidden.bs.modal") }) }, b.prototype.removeBackdrop = function () { this.$backdrop && this.$backdrop.remove(), this.$backdrop = null }, b.prototype.backdrop = function (b) { var c = this.$element.hasClass("fade") ? "fade" : ""; if (this.isShown && this.options.backdrop) { var d = a.support.transition && c; if (this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(document.body), this.$element.on("click.dismiss.modal", a.proxy(function (a) { a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this)) }, this)), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return; d ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b() } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b).emulateTransitionEnd(150) : b()) : b && b() }; var c = a.fn.modal; a.fn.modal = function (c, d) { return this.each(function () { var e = a(this), f = e.data("bs.modal"), g = a.extend({}, b.DEFAULTS, e.data(), "object" == typeof c && c); f || e.data("bs.modal", f = new b(this, g)), "string" == typeof c ? f[c](d) : g.show && f.show(d) }) }, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function () { return a.fn.modal = c, this }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (b) { var c = a(this), d = c.attr("href"), e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")), f = e.data("modal") ? "toggle" : a.extend({ remote: !/#/.test(d) && d }, e.data(), c.data()); b.preventDefault(), e.modal(f, this).one("hide", function () { c.is(":visible") && c.focus() }) }), a(document).on("show.bs.modal", ".modal", function () { a(document.body).addClass("modal-open") }).on("hidden.bs.modal", ".modal", function () { a(document.body).removeClass("modal-open") }) }(window.jQuery), +function (a) { "use strict"; var b = function (a, b) { this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b) }; b.DEFAULTS = { animation: !0, placement: "top", selector: !1, template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1 }, b.prototype.init = function (b, c, d) { this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d); for (var e = this.options.trigger.split(" "), f = e.length; f--;) { var g = e[f]; if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)); else if ("manual" != g) { var h = "hover" == g ? "mouseenter" : "focus", i = "hover" == g ? "mouseleave" : "blur"; this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this)) } } this.options.selector ? this._options = a.extend({}, this.options, { trigger: "manual", selector: "" }) : this.fixTitle() }, b.prototype.getDefaults = function () { return b.DEFAULTS }, b.prototype.getOptions = function (b) { return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = { show: b.delay, hide: b.delay }), b }, b.prototype.getDelegateOptions = function () { var b = {}, c = this.getDefaults(); return this._options && a.each(this._options, function (a, d) { c[a] != d && (b[a] = d) }), b }, b.prototype.enter = function (b) { var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type); return clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? (c.timeout = setTimeout(function () { "in" == c.hoverState && c.show() }, c.options.delay.show), void 0) : c.show() }, b.prototype.leave = function (b) { var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type); return clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? (c.timeout = setTimeout(function () { "out" == c.hoverState && c.hide() }, c.options.delay.hide), void 0) : c.hide() }, b.prototype.show = function () { var b = a.Event("show.bs." + this.type); if (this.hasContent() && this.enabled) { if (this.$element.trigger(b), b.isDefaultPrevented()) return; var c = this.tip(); this.setContent(), this.options.animation && c.addClass("fade"); var d = "function" == typeof this.options.placement ? this.options.placement.call(this, c[0], this.$element[0]) : this.options.placement, e = /\s?auto?\s?/i, f = e.test(d); f && (d = d.replace(e, "") || "top"), c.detach().css({ top: 0, left: 0, display: "block" }).addClass(d), this.options.container ? c.appendTo(this.options.container) : c.insertAfter(this.$element); var g = this.getPosition(), h = c[0].offsetWidth, i = c[0].offsetHeight; if (f) { var j = this.$element.parent(), k = d, l = document.documentElement.scrollTop || document.body.scrollTop, m = "body" == this.options.container ? window.innerWidth : j.outerWidth(), n = "body" == this.options.container ? window.innerHeight : j.outerHeight(), o = "body" == this.options.container ? 0 : j.offset().left; d = "bottom" == d && g.top + g.height + i - l > n ? "top" : "top" == d && g.top - l - i < 0 ? "bottom" : "right" == d && g.right + h > m ? "left" : "left" == d && g.left - h < o ? "right" : d, c.removeClass(k).addClass(d) } var p = this.getCalculatedOffset(d, g, h, i); this.applyPlacement(p, d), this.$element.trigger("shown.bs." + this.type) } }, b.prototype.applyPlacement = function (a, b) { var c, d = this.tip(), e = d[0].offsetWidth, f = d[0].offsetHeight, g = parseInt(d.css("margin-top"), 10), h = parseInt(d.css("margin-left"), 10); isNaN(g) && (g = 0), isNaN(h) && (h = 0), a.top = a.top + g, a.left = a.left + h, d.offset(a).addClass("in"); var i = d[0].offsetWidth, j = d[0].offsetHeight; if ("top" == b && j != f && (c = !0, a.top = a.top + f - j), /bottom|top/.test(b)) { var k = 0; a.left < 0 && (k = -2 * a.left, a.left = 0, d.offset(a), i = d[0].offsetWidth, j = d[0].offsetHeight), this.replaceArrow(k - e + i, i, "left") } else this.replaceArrow(j - f, j, "top"); c && d.offset(a) }, b.prototype.replaceArrow = function (a, b, c) { this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "") }, b.prototype.setContent = function () { var a = this.tip(), b = this.getTitle(); a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right") }, b.prototype.hide = function () { function b() { "in" != c.hoverState && d.detach() } var c = this, d = this.tip(), e = a.Event("hide.bs." + this.type); return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, b).emulateTransitionEnd(150) : b(), this.$element.trigger("hidden.bs." + this.type), this) }, b.prototype.fixTitle = function () { var a = this.$element; (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "") }, b.prototype.hasContent = function () { return this.getTitle() }, b.prototype.getPosition = function () { var b = this.$element[0]; return a.extend({}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : { width: b.offsetWidth, height: b.offsetHeight }, this.$element.offset()) }, b.prototype.getCalculatedOffset = function (a, b, c, d) { return "bottom" == a ? { top: b.top + b.height, left: b.left + b.width / 2 - c / 2 } : "top" == a ? { top: b.top - d, left: b.left + b.width / 2 - c / 2 } : "left" == a ? { top: b.top + b.height / 2 - d / 2, left: b.left - c } : { top: b.top + b.height / 2 - d / 2, left: b.left + b.width } }, b.prototype.getTitle = function () { var a, b = this.$element, c = this.options; return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title) }, b.prototype.tip = function () { return this.$tip = this.$tip || a(this.options.template) }, b.prototype.arrow = function () { return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow") }, b.prototype.validate = function () { this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null) }, b.prototype.enable = function () { this.enabled = !0 }, b.prototype.disable = function () { this.enabled = !1 }, b.prototype.toggleEnabled = function () { this.enabled = !this.enabled }, b.prototype.toggle = function (b) { var c = b ? a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this; c.tip().hasClass("in") ? c.leave(c) : c.enter(c) }, b.prototype.destroy = function () { this.hide().$element.off("." + this.type).removeData("bs." + this.type) }; var c = a.fn.tooltip; a.fn.tooltip = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.tooltip"), f = "object" == typeof c && c; e || d.data("bs.tooltip", e = new b(this, f)), "string" == typeof c && e[c]() }) }, a.fn.tooltip.Constructor = b, a.fn.tooltip.noConflict = function () { return a.fn.tooltip = c, this } }(window.jQuery), +function (a) { "use strict"; var b = function (a, b) { this.init("popover", a, b) }; if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js"); b.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, { placement: "right", trigger: "click", content: "", template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>' }), b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), b.prototype.constructor = b, b.prototype.getDefaults = function () { return b.DEFAULTS }, b.prototype.setContent = function () { var a = this.tip(), b = this.getTitle(), c = this.getContent(); a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content")[this.options.html ? "html" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide() }, b.prototype.hasContent = function () { return this.getTitle() || this.getContent() }, b.prototype.getContent = function () { var a = this.$element, b = this.options; return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content) }, b.prototype.arrow = function () { return this.$arrow = this.$arrow || this.tip().find(".arrow") }, b.prototype.tip = function () { return this.$tip || (this.$tip = a(this.options.template)), this.$tip }; var c = a.fn.popover; a.fn.popover = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.popover"), f = "object" == typeof c && c; e || d.data("bs.popover", e = new b(this, f)), "string" == typeof c && e[c]() }) }, a.fn.popover.Constructor = b, a.fn.popover.noConflict = function () { return a.fn.popover = c, this } }(window.jQuery), +function (a) { "use strict"; function b(c, d) { var e, f = a.proxy(this.process, this); this.$element = a(c).is("body") ? a(window) : a(c), this.$body = a("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", f), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || (e = a(c).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = a([]), this.targets = a([]), this.activeTarget = null, this.refresh(), this.process() } b.DEFAULTS = { offset: 10 }, b.prototype.refresh = function () { var b = this.$element[0] == window ? "offset" : "position"; this.offsets = a([]), this.targets = a([]); var c = this; this.$body.find(this.selector).map(function () { var d = a(this), e = d.data("target") || d.attr("href"), f = /^#\w/.test(e) && a(e); return f && f.length && [[f[b]().top + (!a.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()), e]] || null }).sort(function (a, b) { return a[0] - b[0] }).each(function () { c.offsets.push(this[0]), c.targets.push(this[1]) }) }, b.prototype.process = function () { var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, d = c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget; if (b >= d) return g != (a = f.last()[0]) && this.activate(a); for (a = e.length; a--;) g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a]) }, b.prototype.activate = function (b) { this.activeTarget = b, a(this.selector).parents(".active").removeClass("active"); var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', d = a(c).parents("li").addClass("active"); d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate") }; var c = a.fn.scrollspy; a.fn.scrollspy = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.scrollspy"), f = "object" == typeof c && c; e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]() }) }, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function () { return a.fn.scrollspy = c, this }, a(window).on("load", function () { a('[data-spy="scroll"]').each(function () { var b = a(this); b.scrollspy(b.data()) }) }) }(window.jQuery), +function (a) { "use strict"; var b = function (b) { this.element = a(b) }; b.prototype.show = function () { var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.attr("data-target"); if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) { var e = c.find(".active:last a")[0], f = a.Event("show.bs.tab", { relatedTarget: e }); if (b.trigger(f), !f.isDefaultPrevented()) { var g = a(d); this.activate(b.parent("li"), c), this.activate(g, g.parent(), function () { b.trigger({ type: "shown.bs.tab", relatedTarget: e }) }) } } }, b.prototype.activate = function (b, c, d) { function e() { f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d() } var f = c.find("> .active"), g = d && a.support.transition && f.hasClass("fade"); g ? f.one(a.support.transition.end, e).emulateTransitionEnd(150) : e(), f.removeClass("in") }; var c = a.fn.tab; a.fn.tab = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.tab"); e || d.data("bs.tab", e = new b(this)), "string" == typeof c && e[c]() }) }, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function () { return a.fn.tab = c, this }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (b) { b.preventDefault(), a(this).tab("show") }) }(window.jQuery), +function (a) { "use strict"; var b = function (c, d) { this.options = a.extend({}, b.DEFAULTS, d), this.$window = a(window).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(c), this.affixed = this.unpin = null, this.checkPosition() }; b.RESET = "affix affix-top affix-bottom", b.DEFAULTS = { offset: 0 }, b.prototype.checkPositionWithEventLoop = function () { setTimeout(a.proxy(this.checkPosition, this), 1) }, b.prototype.checkPosition = function () { if (this.$element.is(":visible")) { var c = a(document).height(), d = this.$window.scrollTop(), e = this.$element.offset(), f = this.options.offset, g = f.top, h = f.bottom; "object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top()), "function" == typeof h && (h = f.bottom()); var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= c - h ? "bottom" : null != g && g >= d ? "top" : !1; this.affixed !== i && (this.unpin && this.$element.css("top", ""), this.affixed = i, this.unpin = "bottom" == i ? e.top - d : null, this.$element.removeClass(b.RESET).addClass("affix" + (i ? "-" + i : "")), "bottom" == i && this.$element.offset({ top: document.body.offsetHeight - h - this.$element.height() })) } }; var c = a.fn.affix; a.fn.affix = function (c) { return this.each(function () { var d = a(this), e = d.data("bs.affix"), f = "object" == typeof c && c; e || d.data("bs.affix", e = new b(this, f)), "string" == typeof c && e[c]() }) }, a.fn.affix.Constructor = b, a.fn.affix.noConflict = function () { return a.fn.affix = c, this }, a(window).on("load", function () { a('[data-spy="affix"]').each(function () { var b = a(this), c = b.data(); c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), c.offsetTop && (c.offset.top = c.offsetTop), b.affix(c) }) }) }(window.jQuery);

/*THIS AREA WAS ADDED TO CLOSE THE COLAPSE MENU FROM THE NAV: THIS IS FOR MOBILE*/
$(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a')) {
        $(this).collapse('hide');
    }
});





$(function () {


    function useEverywehreAjax(options, $form) {
        $.ajax(options).done(function (data) {
            var $target = $($form.attr("data-search-target"));
            var $newHtml = $(data);
            $target.replaceWith($newHtml);// we repalced whatever data is already in the div with the new data
            $newHtml.effect("highlight"); // this adds yellow when searching 
        });
    }


    var ajaxFormSubmitReset = function () {
        var $form = $(this);// this puts the form in a variable
        
        // this captures the url, type, data
        var options = {
            url: $form.attr("action"),
            type: "get",
            data: $form.serialize()
        };

        useEverywehreAjax(options, $form)

        return true;
    };
    //function reseting() {
    //    var $resetInput = $('#inputReset').val("");
    //}

    var ajaxFormSubmitTab = function () {
        var $event = $(this);// this puts the form in a variable
        // this captures the url, type, data
        var options = {
            url: $event.attr("action"),
            type: "get",
            //data: $form.serialize()
        };

        useEverywehreAjax(options, $event)

        return false;
    };


    var ajaxFormSubmit = function () {
        var $form = $(this);// this puts the form in a variable
        // this captures the url, type, data
        var options = {
            url: $form.attr("action"),
            type: $form.attr("method"),
            data: $form.serialize()
        };
        useEverywehreAjax(options, $form)

        return false;
    };
    // search input fild; this auto submits when select from the drop down or when entered is cliked
    var submitAutocompleteForm = function (event, ui) {

        var $input = $(this);
        //if ($input == null) {
        //    $form.submit();
        //}

        $input.val(ui.item.label);

        var $form = $input.parents("form:first");
        $form.submit();
    };
    // this is used in the search input field to autocomplete from the database. there is a css to customize the look
    var createAutocomplete = function () {
        var $input = $(this);
        
        var options = {
            source: $input.attr("data-search-autocomplete"),
            select: submitAutocompleteForm
        };

        $input.autocomplete(options);
    };

    // this is use to display the pager
    var getPage = function () {
        var $a = $(this);

        var options = {
            url: $a.attr("href"),
            data: $("form").serialize(),
            type: "get"
        };
        // this is use to display the pager
        $.ajax(options).done(function (data) {
            var target = $a.parents("div.pagedList").attr("data-search-target");
            var $newHtmlPage = $(data);
            $(target).replaceWith($newHtmlPage);
            $newHtmlPage.effect("highlight");// this adds the yellow effect when changing to the new page
        });
        return false;


    };

    //var autocomplete = function () {
    //    var $input = $(this);
    //    $input.autocomplete({
    //        source: $input.attr("data-search-autocomplete")
    //    });

    //};

    //$("input[data-search-autocomplete]").each(autocomplete);

    $("form[data-search-ajax='true']").submit(ajaxFormSubmit);// data - attribute is added to the input tag for the search this will start the ajax
    $("input[data-search-autocomplete]").each(createAutocomplete);
    //$("input[data-search-autocomplete]").change(submitAutocompleteForm);
    $(".main-content").on("click", ".pagedList a", getPage);// this event helps to display new page.. using a plugin called PagedList NugetPacg 
    $("a[data-tab-ajax='true']").click(ajaxFormSubmitTab);// ajax request for the tabs 
    $("button[data-searchReset-ajax='true']").click(ajaxFormSubmitReset);

});


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