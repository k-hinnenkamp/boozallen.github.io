/*!
* jQuery Cycle2; version: 2.1.6 build: 20141007
* http://jquery.malsup.com/cycle2/
* Copyright (c) 2014 M. Alsup; Dual licensed: MIT/GPL
*/
!function(e){"use strict";function t(e){return(e||"").toLowerCase()}var i="2.1.6";e.fn.cycle=function(i){var n;return 0!==this.length||e.isReady?this.each(function(){var n,o,s,l,r=e(this),c=e.fn.cycle.log;if(!r.data("cycle.opts")){(r.data("cycle-log")===!1||i&&i.log===!1||o&&o.log===!1)&&(c=e.noop),c("--c2 init--"),n=r.data();for(var a in n)n.hasOwnProperty(a)&&/^cycle[A-Z]+/.test(a)&&(l=n[a],s=a.match(/^cycle(.*)/)[1].replace(/^[A-Z]/,t),c(s+":",l,"("+typeof l+")"),n[s]=l);o=e.extend({},e.fn.cycle.defaults,n,i||{}),o.timeoutId=0,o.paused=o.paused||!1,o.container=r,o._maxZ=o.maxZ,o.API=e.extend({_container:r},e.fn.cycle.API),o.API.log=c,o.API.trigger=function(e,t){return o.container.trigger(e,t),o.API},r.data("cycle.opts",o),r.data("cycle.API",o.API),o.API.trigger("cycle-bootstrap",[o,o.API]),o.API.addInitialSlides(),o.API.preInitSlideshow(),o.slides.length&&o.API.initSlideshow()}}):(n={s:this.selector,c:this.context},e.fn.cycle.log("requeuing slideshow (dom not ready)"),e(function(){e(n.s,n.c).cycle(i)}),this)},e.fn.cycle.API={opts:function(){return this._container.data("cycle.opts")},addInitialSlides:function(){var t=this.opts(),i=t.slides;t.slideCount=0,t.slides=e(),i=i.jquery?i:t.container.find(i),t.random&&i.sort(function(){return Math.random()-.5}),t.API.add(i)},preInitSlideshow:function(){var t=this.opts();t.API.trigger("cycle-pre-initialize",[t]);var i=e.fn.cycle.transitions[t.fx];i&&e.isFunction(i.preInit)&&i.preInit(t),t._preInitialized=!0},postInitSlideshow:function(){var t=this.opts();t.API.trigger("cycle-post-initialize",[t]);var i=e.fn.cycle.transitions[t.fx];i&&e.isFunction(i.postInit)&&i.postInit(t)},initSlideshow:function(){var t,i=this.opts(),n=i.container;i.API.calcFirstSlide(),"static"==i.container.css("position")&&i.container.css("position","relative"),e(i.slides[i.currSlide]).css({opacity:1,display:"block",visibility:"visible"}),i.API.stackSlides(i.slides[i.currSlide],i.slides[i.nextSlide],!i.reverse),i.pauseOnHover&&(i.pauseOnHover!==!0&&(n=e(i.pauseOnHover)),n.hover(function(){i.API.pause(!0)},function(){i.API.resume(!0)})),i.timeout&&(t=i.API.getSlideOpts(i.currSlide),i.API.queueTransition(t,t.timeout+i.delay)),i._initialized=!0,i.API.updateView(!0),i.API.trigger("cycle-initialized",[i]),i.API.postInitSlideshow()},pause:function(t){var i=this.opts(),n=i.API.getSlideOpts(),o=i.hoverPaused||i.paused;t?i.hoverPaused=!0:i.paused=!0,o||(i.container.addClass("cycle-paused"),i.API.trigger("cycle-paused",[i]).log("cycle-paused"),n.timeout&&(clearTimeout(i.timeoutId),i.timeoutId=0,i._remainingTimeout-=e.now()-i._lastQueue,(i._remainingTimeout<0||isNaN(i._remainingTimeout))&&(i._remainingTimeout=void 0)))},resume:function(e){var t=this.opts(),i=!t.hoverPaused&&!t.paused;e?t.hoverPaused=!1:t.paused=!1,i||(t.container.removeClass("cycle-paused"),0===t.slides.filter(":animated").length&&t.API.queueTransition(t.API.getSlideOpts(),t._remainingTimeout),t.API.trigger("cycle-resumed",[t,t._remainingTimeout]).log("cycle-resumed"))},add:function(t,i){var n,o=this.opts(),s=o.slideCount,l=!1;"string"==e.type(t)&&(t=e.trim(t)),e(t).each(function(t){var n,s=e(this);i?o.container.prepend(s):o.container.append(s),o.slideCount++,n=o.API.buildSlideOpts(s),i?o.slides=e(s).add(o.slides):o.slides=o.slides.add(s),o.API.initSlide(n,s,--o._maxZ),s.data("cycle.opts",n),o.API.trigger("cycle-slide-added",[o,n,s])}),o.API.updateView(!0),l=o._preInitialized&&2>s&&o.slideCount>=1,l&&(o._initialized?o.timeout&&(n=o.slides.length,o.nextSlide=o.reverse?n-1:1,o.timeoutId||o.API.queueTransition(o)):o.API.initSlideshow())},calcFirstSlide:function(){var e,t=this.opts();e=parseInt(t.startingSlide||0,10),(e>=t.slides.length||0>e)&&(e=0),t.currSlide=e,t.reverse?(t.nextSlide=e-1,t.nextSlide<0&&(t.nextSlide=t.slides.length-1)):(t.nextSlide=e+1,t.nextSlide==t.slides.length&&(t.nextSlide=0))},calcNextSlide:function(){var e,t=this.opts();t.reverse?(e=t.nextSlide-1<0,t.nextSlide=e?t.slideCount-1:t.nextSlide-1,t.currSlide=e?0:t.nextSlide+1):(e=t.nextSlide+1==t.slides.length,t.nextSlide=e?0:t.nextSlide+1,t.currSlide=e?t.slides.length-1:t.nextSlide-1)},calcTx:function(t,i){var n,o=t;return o._tempFx?n=e.fn.cycle.transitions[o._tempFx]:i&&o.manualFx&&(n=e.fn.cycle.transitions[o.manualFx]),n||(n=e.fn.cycle.transitions[o.fx]),o._tempFx=null,this.opts()._tempFx=null,n||(n=e.fn.cycle.transitions.fade,o.API.log('Transition "'+o.fx+'" not found.  Using fade.')),n},prepareTx:function(e,t){var i,n,o,s,l,r=this.opts();return r.slideCount<2?void(r.timeoutId=0):(!e||r.busy&&!r.manualTrump||(r.API.stopTransition(),r.busy=!1,clearTimeout(r.timeoutId),r.timeoutId=0),void(r.busy||(0!==r.timeoutId||e)&&(n=r.slides[r.currSlide],o=r.slides[r.nextSlide],s=r.API.getSlideOpts(r.nextSlide),l=r.API.calcTx(s,e),r._tx=l,e&&void 0!==s.manualSpeed&&(s.speed=s.manualSpeed),r.nextSlide!=r.currSlide&&(e||!r.paused&&!r.hoverPaused&&r.timeout)?(r.API.trigger("cycle-before",[s,n,o,t]),l.before&&l.before(s,n,o,t),i=function(){r.busy=!1,r.container.data("cycle.opts")&&(l.after&&l.after(s,n,o,t),r.API.trigger("cycle-after",[s,n,o,t]),r.API.queueTransition(s),r.API.updateView(!0))},r.busy=!0,l.transition?l.transition(s,n,o,t,i):r.API.doTransition(s,n,o,t,i),r.API.calcNextSlide(),r.API.updateView()):r.API.queueTransition(s))))},doTransition:function(t,i,n,o,s){var l=t,r=e(i),c=e(n),a=function(){c.animate(l.animIn||{opacity:1},l.speed,l.easeIn||l.easing,s)};c.css(l.cssBefore||{}),r.animate(l.animOut||{},l.speed,l.easeOut||l.easing,function(){r.css(l.cssAfter||{}),l.sync||a()}),l.sync&&a()},queueTransition:function(t,i){var n=this.opts(),o=void 0!==i?i:t.timeout;return 0===n.nextSlide&&0===--n.loop?(n.API.log("terminating; loop=0"),n.timeout=0,o?setTimeout(function(){n.API.trigger("cycle-finished",[n])},o):n.API.trigger("cycle-finished",[n]),void(n.nextSlide=n.currSlide)):void 0!==n.continueAuto&&(n.continueAuto===!1||e.isFunction(n.continueAuto)&&n.continueAuto()===!1)?(n.API.log("terminating automatic transitions"),n.timeout=0,void(n.timeoutId&&clearTimeout(n.timeoutId))):void(o&&(n._lastQueue=e.now(),void 0===i&&(n._remainingTimeout=t.timeout),n.paused||n.hoverPaused||(n.timeoutId=setTimeout(function(){n.API.prepareTx(!1,!n.reverse)},o))))},stopTransition:function(){var e=this.opts();e.slides.filter(":animated").length&&(e.slides.stop(!1,!0),e.API.trigger("cycle-transition-stopped",[e])),e._tx&&e._tx.stopTransition&&e._tx.stopTransition(e)},advanceSlide:function(e){var t=this.opts();return clearTimeout(t.timeoutId),t.timeoutId=0,t.nextSlide=t.currSlide+e,t.nextSlide<0?t.nextSlide=t.slides.length-1:t.nextSlide>=t.slides.length&&(t.nextSlide=0),t.API.prepareTx(!0,e>=0),!1},buildSlideOpts:function(i){var n,o,s=this.opts(),l=i.data()||{};for(var r in l)l.hasOwnProperty(r)&&/^cycle[A-Z]+/.test(r)&&(n=l[r],o=r.match(/^cycle(.*)/)[1].replace(/^[A-Z]/,t),s.API.log("["+(s.slideCount-1)+"]",o+":",n,"("+typeof n+")"),l[o]=n);l=e.extend({},e.fn.cycle.defaults,s,l),l.slideNum=s.slideCount;try{delete l.API,delete l.slideCount,delete l.currSlide,delete l.nextSlide,delete l.slides}catch(c){}return l},getSlideOpts:function(t){var i=this.opts();void 0===t&&(t=i.currSlide);var n=i.slides[t],o=e(n).data("cycle.opts");return e.extend({},i,o)},initSlide:function(t,i,n){var o=this.opts();i.css(t.slideCss||{}),n>0&&i.css("zIndex",n),isNaN(t.speed)&&(t.speed=e.fx.speeds[t.speed]||e.fx.speeds._default),t.sync||(t.speed=t.speed/2),i.addClass(o.slideClass)},updateView:function(e,t,i){var n=this.opts();if(n._initialized){var o=n.API.getSlideOpts(),s=n.slides[n.currSlide];!e&&t!==!0&&(n.API.trigger("cycle-update-view-before",[n,o,s]),n.updateView<0)||(n.slideActiveClass&&n.slides.removeClass(n.slideActiveClass).eq(n.currSlide).addClass(n.slideActiveClass),e&&n.hideNonActive&&n.slides.filter(":not(."+n.slideActiveClass+")").css("visibility","hidden"),0===n.updateView&&setTimeout(function(){n.API.trigger("cycle-update-view",[n,o,s,e])},o.speed/(n.sync?2:1)),0!==n.updateView&&n.API.trigger("cycle-update-view",[n,o,s,e]),e&&n.API.trigger("cycle-update-view-after",[n,o,s]))}},getComponent:function(t){var i=this.opts(),n=i[t];return"string"==typeof n?/^\s*[\>|\+|~]/.test(n)?i.container.find(n):e(n):n.jquery?n:e(n)},stackSlides:function(t,i,n){var o=this.opts();t||(t=o.slides[o.currSlide],i=o.slides[o.nextSlide],n=!o.reverse),e(t).css("zIndex",o.maxZ);var s,l=o.maxZ-2,r=o.slideCount;if(n){for(s=o.currSlide+1;r>s;s++)e(o.slides[s]).css("zIndex",l--);for(s=0;s<o.currSlide;s++)e(o.slides[s]).css("zIndex",l--)}else{for(s=o.currSlide-1;s>=0;s--)e(o.slides[s]).css("zIndex",l--);for(s=r-1;s>o.currSlide;s--)e(o.slides[s]).css("zIndex",l--)}e(i).css("zIndex",o.maxZ-1)},getSlideIndex:function(e){return this.opts().slides.index(e)}},e.fn.cycle.log=function(){window.console&&console.log&&console.log("[cycle2] "+Array.prototype.join.call(arguments," "))},e.fn.cycle.version=function(){return"Cycle2: "+i},e.fn.cycle.transitions={custom:{},none:{before:function(e,t,i,n){e.API.stackSlides(i,t,n),e.cssBefore={opacity:1,visibility:"visible",display:"block"}}},fade:{before:function(t,i,n,o){var s=t.API.getSlideOpts(t.nextSlide).slideCss||{};t.API.stackSlides(i,n,o),t.cssBefore=e.extend(s,{opacity:0,visibility:"visible",display:"block"}),t.animIn={opacity:1},t.animOut={opacity:0}}},fadeout:{before:function(t,i,n,o){var s=t.API.getSlideOpts(t.nextSlide).slideCss||{};t.API.stackSlides(i,n,o),t.cssBefore=e.extend(s,{opacity:1,visibility:"visible",display:"block"}),t.animOut={opacity:0}}},scrollHorz:{before:function(e,t,i,n){e.API.stackSlides(t,i,n);var o=e.container.css("overflow","hidden").width();e.cssBefore={left:n?o:-o,top:0,opacity:1,visibility:"visible",display:"block"},e.cssAfter={zIndex:e._maxZ-2,left:0},e.animIn={left:0},e.animOut={left:n?-o:o}}}},e.fn.cycle.defaults={allowWrap:!0,autoSelector:".cycle-slideshow[data-cycle-auto-init!=false]",delay:0,easing:null,fx:"fade",hideNonActive:!0,loop:0,manualFx:void 0,manualSpeed:void 0,manualTrump:!0,maxZ:100,pauseOnHover:!1,reverse:!1,slideActiveClass:"cycle-slide-active",slideClass:"cycle-slide",slideCss:{position:"absolute",top:0,left:0},slides:"> img",speed:500,startingSlide:0,sync:!0,timeout:4e3,updateView:0},e(document).ready(function(){e(e.fn.cycle.defaults.autoSelector).cycle()})}(jQuery),/*! Cycle2 autoheight plugin; Copyright (c) M.Alsup, 2012; version: 20130913 */
function(e){"use strict";function t(t,n){var o,s,l,r=n.autoHeight;if("container"==r)s=e(n.slides[n.currSlide]).outerHeight(),n.container.height(s);else if(n._autoHeightRatio)n.container.height(n.container.width()/n._autoHeightRatio);else if("calc"===r||"number"==e.type(r)&&r>=0){if(l="calc"===r?i(t,n):r>=n.slides.length?0:r,l==n._sentinelIndex)return;n._sentinelIndex=l,n._sentinel&&n._sentinel.remove(),o=e(n.slides[l].cloneNode(!0)),o.removeAttr("id name rel").find("[id],[name],[rel]").removeAttr("id name rel"),o.css({position:"static",visibility:"hidden",display:"block"}).prependTo(n.container).addClass("cycle-sentinel cycle-slide").removeClass("cycle-slide-active"),o.find("*").css("visibility","hidden"),n._sentinel=o}}function i(t,i){var n=0,o=-1;return i.slides.each(function(t){var i=e(this).height();i>o&&(o=i,n=t)}),n}function n(t,i,n,o,s){var l=e(o).outerHeight();i.container.animate({height:l},i.autoHeightSpeed,i.autoHeightEasing)}function o(i,s){s._autoHeightOnResize&&(e(window).off("resize orientationchange",s._autoHeightOnResize),s._autoHeightOnResize=null),s.container.off("cycle-slide-added cycle-slide-removed",t),s.container.off("cycle-destroyed",o),s.container.off("cycle-before",n),s._sentinel&&(s._sentinel.remove(),s._sentinel=null)}e.extend(e.fn.cycle.defaults,{autoHeight:0,autoHeightSpeed:250,autoHeightEasing:null}),e(document).on("cycle-initialized",function(i,s){function l(){t(i,s)}var r,c=s.autoHeight,a=e.type(c),d=null;("string"===a||"number"===a)&&(s.container.on("cycle-slide-added cycle-slide-removed",t),s.container.on("cycle-destroyed",o),"container"==c?s.container.on("cycle-before",n):"string"===a&&/\d+\:\d+/.test(c)&&(r=c.match(/(\d+)\:(\d+)/),r=r[1]/r[2],s._autoHeightRatio=r),"number"!==a&&(s._autoHeightOnResize=function(){clearTimeout(d),d=setTimeout(l,50)},e(window).on("resize orientationchange",s._autoHeightOnResize)),setTimeout(l,30))})}(jQuery),/*! caption plugin for Cycle2;  version: 20130306 */
function(e){"use strict";e.extend(e.fn.cycle.defaults,{caption:"> .cycle-caption",captionTemplate:"{{slideNum}} / {{slideCount}}",overlay:"> .cycle-overlay",overlayTemplate:"<div>{{title}}</div><div>{{desc}}</div>",captionModule:"caption"}),e(document).on("cycle-update-view",function(t,i,n,o){if("caption"===i.captionModule){e.each(["caption","overlay"],function(){var e=this,t=n[e+"Template"],s=i.API.getComponent(e);s.length&&t?(s.html(i.API.tmpl(t,n,i,o)),s.show()):s.hide()})}}),e(document).on("cycle-destroyed",function(t,i){var n;e.each(["caption","overlay"],function(){var e=this,t=i[e+"Template"];i[e]&&t&&(n=i.API.getComponent("caption"),n.empty())})})}(jQuery),/*! command plugin for Cycle2;  version: 20140415 */
function(e){"use strict";var t=e.fn.cycle;e.fn.cycle=function(i){var n,o,s,l=e.makeArray(arguments);return"number"==e.type(i)?this.cycle("goto",i):"string"==e.type(i)?this.each(function(){var r;return n=i,s=e(this).data("cycle.opts"),void 0===s?void t.log('slideshow must be initialized before sending commands; "'+n+'" ignored'):(n="goto"==n?"jump":n,o=s.API[n],e.isFunction(o)?(r=e.makeArray(l),r.shift(),o.apply(s.API,r)):void t.log("unknown command: ",n))}):t.apply(this,arguments)},e.extend(e.fn.cycle,t),e.extend(t.API,{next:function(){var e=this.opts();if(!e.busy||e.manualTrump){var t=e.reverse?-1:1;e.allowWrap===!1&&e.currSlide+t>=e.slideCount||(e.API.advanceSlide(t),e.API.trigger("cycle-next",[e]).log("cycle-next"))}},prev:function(){var e=this.opts();if(!e.busy||e.manualTrump){var t=e.reverse?1:-1;e.allowWrap===!1&&e.currSlide+t<0||(e.API.advanceSlide(t),e.API.trigger("cycle-prev",[e]).log("cycle-prev"))}},destroy:function(){this.stop();var t=this.opts(),i=e.isFunction(e._data)?e._data:e.noop;clearTimeout(t.timeoutId),t.timeoutId=0,t.API.stop(),t.API.trigger("cycle-destroyed",[t]).log("cycle-destroyed"),t.container.removeData(),i(t.container[0],"parsedAttrs",!1),t.retainStylesOnDestroy||(t.container.removeAttr("style"),t.slides.removeAttr("style"),t.slides.removeClass(t.slideActiveClass)),t.slides.each(function(){var n=e(this);n.removeData(),n.removeClass(t.slideClass),i(this,"parsedAttrs",!1)})},jump:function(e,t){var i,n=this.opts();if(!n.busy||n.manualTrump){var o=parseInt(e,10);if(isNaN(o)||0>o||o>=n.slides.length)return void n.API.log("goto: invalid slide index: "+o);if(o==n.currSlide)return void n.API.log("goto: skipping, already on slide",o);n.nextSlide=o,clearTimeout(n.timeoutId),n.timeoutId=0,n.API.log("goto: ",o," (zero-index)"),i=n.currSlide<n.nextSlide,n._tempFx=t,n.API.prepareTx(!0,i)}},stop:function(){var t=this.opts(),i=t.container;clearTimeout(t.timeoutId),t.timeoutId=0,t.API.stopTransition(),t.pauseOnHover&&(t.pauseOnHover!==!0&&(i=e(t.pauseOnHover)),i.off("mouseenter mouseleave")),t.API.trigger("cycle-stopped",[t]).log("cycle-stopped")},reinit:function(){var e=this.opts();e.API.destroy(),e.container.cycle()},remove:function(t){for(var i,n,o=this.opts(),s=[],l=1,r=0;r<o.slides.length;r++)i=o.slides[r],r==t?n=i:(s.push(i),e(i).data("cycle.opts").slideNum=l,l++);n&&(o.slides=e(s),o.slideCount--,e(n).remove(),t==o.currSlide?o.API.advanceSlide(1):t<o.currSlide?o.currSlide--:o.currSlide++,o.API.trigger("cycle-slide-removed",[o,t,n]).log("cycle-slide-removed"),o.API.updateView())}}),e(document).on("click.cycle","[data-cycle-cmd]",function(t){t.preventDefault();var i=e(this),n=i.data("cycle-cmd"),o=i.data("cycle-context")||".cycle-slideshow";e(o).cycle(n,i.data("cycle-arg"))})}(jQuery),/*! hash plugin for Cycle2;  version: 20130905 */
function(e){"use strict";function t(t,i){var n;return t._hashFence?void(t._hashFence=!1):(n=window.location.hash.substring(1),void t.slides.each(function(o){if(e(this).data("cycle-hash")==n){if(i===!0)t.startingSlide=o;else{var s=t.currSlide<o;t.nextSlide=o,t.API.prepareTx(!0,s)}return!1}}))}e(document).on("cycle-pre-initialize",function(i,n){t(n,!0),n._onHashChange=function(){t(n,!1)},e(window).on("hashchange",n._onHashChange)}),e(document).on("cycle-update-view",function(e,t,i){i.hash&&"#"+i.hash!=window.location.hash&&(t._hashFence=!0,window.location.hash=i.hash)}),e(document).on("cycle-destroyed",function(t,i){i._onHashChange&&e(window).off("hashchange",i._onHashChange)})}(jQuery),/*! loader plugin for Cycle2;  version: 20131121 */
function(e){"use strict";e.extend(e.fn.cycle.defaults,{loader:!1}),e(document).on("cycle-bootstrap",function(t,i){function n(t,n){function s(t){var s;"wait"==i.loader?(r.push(t),0===a&&(r.sort(l),o.apply(i.API,[r,n]),i.container.removeClass("cycle-loading"))):(s=e(i.slides[i.currSlide]),o.apply(i.API,[t,n]),s.show(),i.container.removeClass("cycle-loading"))}function l(e,t){return e.data("index")-t.data("index")}var r=[];if("string"==e.type(t))t=e.trim(t);else if("array"===e.type(t))for(var c=0;c<t.length;c++)t[c]=e(t[c])[0];t=e(t);var a=t.length;a&&(t.css("visibility","hidden").appendTo("body").each(function(t){function l(){0===--c&&(--a,s(d))}var c=0,d=e(this),u=d.is("img")?d:d.find("img");return d.data("index",t),u=u.filter(":not(.cycle-loader-ignore)").filter(':not([src=""])'),u.length?(c=u.length,void u.each(function(){this.complete?l():e(this).load(function(){l()}).on("error",function(){0===--c&&(i.API.log("slide skipped; img not loaded:",this.src),0===--a&&"wait"==i.loader&&o.apply(i.API,[r,n]))})})):(--a,void r.push(d))}),a&&i.container.addClass("cycle-loading"))}var o;i.loader&&(o=i.API.add,i.API.add=n)})}(jQuery),/*! pager plugin for Cycle2;  version: 20140415 */
function(e){"use strict";function t(t,i,n){var o,s=t.API.getComponent("pager");s.each(function(){var s=e(this);if(i.pagerTemplate){var l=t.API.tmpl(i.pagerTemplate,i,t,n[0]);o=e(l).appendTo(s)}else o=s.children().eq(t.slideCount-1);o.on(t.pagerEvent,function(e){t.pagerEventBubble||e.preventDefault(),t.API.page(s,e.currentTarget)})})}function i(e,t){var i=this.opts();if(!i.busy||i.manualTrump){var n=e.children().index(t),o=n,s=i.currSlide<o;i.currSlide!=o&&(i.nextSlide=o,i._tempFx=i.pagerFx,i.API.prepareTx(!0,s),i.API.trigger("cycle-pager-activated",[i,e,t]))}}e.extend(e.fn.cycle.defaults,{pager:"> .cycle-pager",pagerActiveClass:"cycle-pager-active",pagerEvent:"click.cycle",pagerEventBubble:void 0,pagerTemplate:"<span>&bull;</span>"}),e(document).on("cycle-bootstrap",function(e,i,n){n.buildPagerLink=t}),e(document).on("cycle-slide-added",function(e,t,n,o){t.pager&&(t.API.buildPagerLink(t,n,o),t.API.page=i)}),e(document).on("cycle-slide-removed",function(t,i,n,o){if(i.pager){var s=i.API.getComponent("pager");s.each(function(){var t=e(this);e(t.children()[n]).remove()})}}),e(document).on("cycle-update-view",function(t,i,n){var o;i.pager&&(o=i.API.getComponent("pager"),o.each(function(){e(this).children().removeClass(i.pagerActiveClass).eq(i.currSlide).addClass(i.pagerActiveClass)}))}),e(document).on("cycle-destroyed",function(e,t){var i=t.API.getComponent("pager");i&&(i.children().off(t.pagerEvent),t.pagerTemplate&&i.empty())})}(jQuery),/*! prevnext plugin for Cycle2;  version: 20140408 */
function(e){"use strict";e.extend(e.fn.cycle.defaults,{next:"> .cycle-next",nextEvent:"click.cycle",disabledClass:"disabled",prev:"> .cycle-prev",prevEvent:"click.cycle",swipe:!1}),e(document).on("cycle-initialized",function(e,t){if(t.API.getComponent("next").on(t.nextEvent,function(e){e.preventDefault(),t.API.next()}),t.API.getComponent("prev").on(t.prevEvent,function(e){e.preventDefault(),t.API.prev()}),t.swipe){var i=t.swipeVert?"swipeUp.cycle":"swipeLeft.cycle swipeleft.cycle",n=t.swipeVert?"swipeDown.cycle":"swipeRight.cycle swiperight.cycle";t.container.on(i,function(e){t._tempFx=t.swipeFx,t.API.next()}),t.container.on(n,function(){t._tempFx=t.swipeFx,t.API.prev()})}}),e(document).on("cycle-update-view",function(e,t,i,n){if(!t.allowWrap){var o=t.disabledClass,s=t.API.getComponent("next"),l=t.API.getComponent("prev"),r=t._prevBoundry||0,c=void 0!==t._nextBoundry?t._nextBoundry:t.slideCount-1;t.currSlide==c?s.addClass(o).prop("disabled",!0):s.removeClass(o).prop("disabled",!1),t.currSlide===r?l.addClass(o).prop("disabled",!0):l.removeClass(o).prop("disabled",!1)}}),e(document).on("cycle-destroyed",function(e,t){t.API.getComponent("prev").off(t.nextEvent),t.API.getComponent("next").off(t.prevEvent),t.container.off("swipeleft.cycle swiperight.cycle swipeLeft.cycle swipeRight.cycle swipeUp.cycle swipeDown.cycle")})}(jQuery),/*! progressive loader plugin for Cycle2;  version: 20130315 */
function(e){"use strict";e.extend(e.fn.cycle.defaults,{progressive:!1}),e(document).on("cycle-pre-initialize",function(t,i){if(i.progressive){var n,o,s=i.API,l=s.next,r=s.prev,c=s.prepareTx,a=e.type(i.progressive);if("array"==a)n=i.progressive;else if(e.isFunction(i.progressive))n=i.progressive(i);else if("string"==a){if(o=e(i.progressive),n=e.trim(o.html()),!n)return;if(/^(\[)/.test(n))try{n=e.parseJSON(n)}catch(d){return void s.log("error parsing progressive slides",d)}else n=n.split(new RegExp(o.data("cycle-split")||"\n")),n[n.length-1]||n.pop()}c&&(s.prepareTx=function(e,t){var o,s;return e||0===n.length?void c.apply(i.API,[e,t]):void(t&&i.currSlide==i.slideCount-1?(s=n[0],n=n.slice(1),i.container.one("cycle-slide-added",function(e,t){setTimeout(function(){t.API.advanceSlide(1)},50)}),i.API.add(s)):t||0!==i.currSlide?c.apply(i.API,[e,t]):(o=n.length-1,s=n[o],n=n.slice(0,o),i.container.one("cycle-slide-added",function(e,t){setTimeout(function(){t.currSlide=1,t.API.advanceSlide(-1)},50)}),i.API.add(s,!0)))}),l&&(s.next=function(){var e=this.opts();if(n.length&&e.currSlide==e.slideCount-1){var t=n[0];n=n.slice(1),e.container.one("cycle-slide-added",function(e,t){l.apply(t.API),t.container.removeClass("cycle-loading")}),e.container.addClass("cycle-loading"),e.API.add(t)}else l.apply(e.API)}),r&&(s.prev=function(){var e=this.opts();if(n.length&&0===e.currSlide){var t=n.length-1,i=n[t];n=n.slice(0,t),e.container.one("cycle-slide-added",function(e,t){t.currSlide=1,t.API.advanceSlide(-1),t.container.removeClass("cycle-loading")}),e.container.addClass("cycle-loading"),e.API.add(i,!0)}else r.apply(e.API)})}})}(jQuery),/*! tmpl plugin for Cycle2;  version: 20121227 */
function(e){"use strict";e.extend(e.fn.cycle.defaults,{tmplRegex:"{{((.)?.*?)}}"}),e.extend(e.fn.cycle.API,{tmpl:function(t,i){var n=new RegExp(i.tmplRegex||e.fn.cycle.defaults.tmplRegex,"g"),o=e.makeArray(arguments);return o.shift(),t.replace(n,function(t,i){var n,s,l,r,c=i.split(".");for(n=0;n<o.length;n++)if(l=o[n]){if(c.length>1)for(r=l,s=0;s<c.length;s++)l=r,r=r[c[s]]||i;else r=l[i];if(e.isFunction(r))return r.apply(l,o);if(void 0!==r&&null!==r&&r!=i)return r}return i})}})}(jQuery),/*!
 * jQuery Smooth Scroll - v1.6.1 - 2015-12-26
 * https://github.com/kswedberg/jquery-smooth-scroll
 * Copyright (c) 2015 Karl Swedberg
 * Licensed MIT
 */
function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof module&&module.exports?require("jquery"):jQuery)}(function(e){function t(e){return e.replace(/(:|\.|\/)/g,"\\$1")}var i="1.6.1",n={},o={exclude:[],excludeWithin:[],offset:0,direction:"top",delegateSelector:null,scrollElement:null,scrollTarget:null,beforeScroll:function(){},afterScroll:function(){},easing:"swing",speed:400,autoCoefficient:2,preventDefault:!0},s=function(t){var i=[],n=!1,o=t.dir&&"left"===t.dir?"scrollLeft":"scrollTop";return this.each(function(){var t=e(this);if(this!==document&&this!==window)return!document.scrollingElement||this!==document.documentElement&&this!==document.body?void(t[o]()>0?i.push(this):(t[o](1),n=t[o]()>0,n&&i.push(this),t[o](0))):(i.push(document.scrollingElement),!1)}),i.length||this.each(function(){"BODY"===this.nodeName&&(i=[this])}),"first"===t.el&&i.length>1&&(i=[i[0]]),i};e.fn.extend({scrollable:function(e){var t=s.call(this,{dir:e});return this.pushStack(t)},firstScrollable:function(e){var t=s.call(this,{el:"first",dir:e});return this.pushStack(t)},smoothScroll:function(i,n){if(i=i||{},"options"===i)return n?this.each(function(){var t=e(this),i=e.extend(t.data("ssOpts")||{},n);e(this).data("ssOpts",i)}):this.first().data("ssOpts");var o=e.extend({},e.fn.smoothScroll.defaults,i),s=function(i){var n=this,s=e(this),l=e.extend({},o,s.data("ssOpts")||{}),r=o.exclude,c=l.excludeWithin,a=0,d=0,u=!0,p={},f=e.smoothScroll.filterPath(location.pathname),h=e.smoothScroll.filterPath(n.pathname),g=location.hostname===n.hostname||!n.hostname,m=l.scrollTarget||h===f,y=t(n.hash);if(l.scrollTarget||g&&m&&y){for(;u&&a<r.length;)s.is(t(r[a++]))&&(u=!1);for(;u&&d<c.length;)s.closest(c[d++]).length&&(u=!1)}else u=!1;u&&(l.preventDefault&&i.preventDefault(),e.extend(p,l,{scrollTarget:l.scrollTarget||y,link:n}),e.smoothScroll(p))};return null!==i.delegateSelector?this.undelegate(i.delegateSelector,"click.smoothscroll").delegate(i.delegateSelector,"click.smoothscroll",s):this.unbind("click.smoothscroll").bind("click.smoothscroll",s),this}}),e.smoothScroll=function(t,i){if("options"===t&&"object"==typeof i)return e.extend(n,i);var o,s,l,r,c,a=0,d="offset",u="scrollTop",p={},f={};"number"==typeof t?(o=e.extend({link:null},e.fn.smoothScroll.defaults,n),l=t):(o=e.extend({link:null},e.fn.smoothScroll.defaults,t||{},n),o.scrollElement&&(d="position","static"===o.scrollElement.css("position")&&o.scrollElement.css("position","relative"))),u="left"===o.direction?"scrollLeft":u,o.scrollElement?(s=o.scrollElement,/^(?:HTML|BODY)$/.test(s[0].nodeName)||(a=s[u]())):s=e("html, body").firstScrollable(o.direction),o.beforeScroll.call(s,o),l="number"==typeof t?t:i||e(o.scrollTarget)[d]()&&e(o.scrollTarget)[d]()[o.direction]||0,p[u]=l+a+o.offset,r=o.speed,"auto"===r&&(c=Math.abs(p[u]-s[u]()),r=c/o.autoCoefficient),f={duration:r,easing:o.easing,complete:function(){o.afterScroll.call(o.link,o)}},o.step&&(f.step=o.step),s.length?s.stop().animate(p,f):o.afterScroll.call(o.link,o)},e.smoothScroll.version=i,e.smoothScroll.filterPath=function(e){return e=e||"",e.replace(/^\//,"").replace(/(?:index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")},e.fn.smoothScroll.defaults=o}),$("#hamburger, .header a").click(function(){$("html").toggleClass("nav-open")}),$("header a").smoothScroll();