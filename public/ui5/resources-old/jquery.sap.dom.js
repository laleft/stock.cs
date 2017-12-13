/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/Device'],function(q,D){"use strict";q.sap.domById=function domById(i,w){return i?(w||window).document.getElementById(i):null;};q.sap.byId=function byId(i,C){var e="";if(i){e="#"+i.replace(/(:|\.)/g,'\\$1');}return q(e,C);};q.sap.focus=function focus(o){if(!o){return;}try{o.focus();}catch(e){var i=(o&&o.id)?" (ID: '"+o.id+"')":"";q.sap.log.warning("Error when trying to focus a DOM element"+i+": "+e.message);return false;}return true;};q.fn.cursorPos=function cursorPos(P){var l=arguments.length,t,L,T,s;T=this.prop("tagName");s=this.prop("type");if(this.length===1&&((T=="INPUT"&&(s=="text"||s=="password"||s=="search"))||T=="TEXTAREA")){var o=this.get(0);if(l>0){if(typeof(o.selectionStart)=="number"){o.focus();o.selectionStart=P;o.selectionEnd=P;}else if(o.createTextRange){t=o.createTextRange();var m=o.value.length;if(P<0||P>m){P=m;}if(t){t.collapse();t.moveEnd("character",P);t.moveStart("character",P);t.select();}}return this;}else{if(typeof(o.selectionStart)=="number"){return o.selectionStart;}else if(o.createTextRange){t=window.document.selection.createRange();var C=t.duplicate();if(o.tagName=="TEXTAREA"){C.moveToElementText(o);var e=C.duplicate();L=C.text.length;e.moveStart("character",L);var S=0;if(e.inRange(t)){S=L;}else{var i=L;while(L>1){i=Math.round(L/2);S=S+i;e=C.duplicate();e.moveStart("character",S);if(e.inRange(t)){L=L-i;}else{S=S-i;L=i;}}}return S;}else if(C.parentElement()===o){C.collapse();var L=o.value.length;C.moveStart('character',-L);return C.text.length;}}return-1;}}else{return this;}};q.fn.selectText=function selectText(s,E){var o=this.get(0);try{if(typeof(o.selectionStart)==="number"){o.setSelectionRange(s>0?s:0,E);}else if(o.createTextRange){var t=o.createTextRange();t.collapse();t.moveStart('character',s);t.moveEnd('character',E-s);t.select();}}catch(e){}return this;};q.fn.getSelectedText=function(){var o=this.get(0);try{if(typeof o.selectionStart==="number"){return o.value.substring(o.selectionStart,o.selectionEnd);}if(document.selection){return document.selection.createRange().text;}}catch(e){}return"";};q.fn.outerHTML=function outerHTML(){var o=this.get(0);if(o&&o.outerHTML){return q.trim(o.outerHTML);}else{var e=this[0]?this[0].ownerDocument:document;var i=e.createElement("div");i.appendChild(o.cloneNode(true));return i.innerHTML;}};q.sap.containsOrEquals=function containsOrEquals(o,e){if(e&&o&&e!=document&&e!=window){return(o===e)||q.contains(o,e);}return false;};q.fn.rect=function rect(){var o=this.get(0);if(o){if(o.getBoundingClientRect){var C=o.getBoundingClientRect();var r={top:C.top,left:C.left,width:C.right-C.left,height:C.bottom-C.top};var w=q.sap.ownerWindow(o);r.left+=q(w).scrollLeft();r.top+=q(w).scrollTop();return r;}else{return{top:10,left:10,width:o.offsetWidth,height:o.offsetWidth};}}return null;};q.fn.rectContains=function rectContains(P,i){var r=this.rect();if(r){return P>=r.left&&P<=r.left+r.width&&i>=r.top&&i<=r.top+r.height;}return false;};function h(e){var t=q.prop(e,"tabIndex");return t!=null&&t>=0&&(!q.attr(e,"disabled")||q.attr(e,"tabindex"));}q.fn.hasTabIndex=function(){return h(this.get(0));};function a(e){return(e.offsetWidth<=0&&e.offsetHeight<=0)||q.css(e,'visibility')==='hidden';}function f(C,F){var o=F?C.firstChild:C.lastChild,e;while(o){if(o.nodeType==1&&!a(o)){if(h(o)){return o;}e=f(o,F);if(e){return e;}}o=F?o.nextSibling:o.previousSibling;}return null;}q.fn.firstFocusableDomRef=function firstFocusableDomRef(){var C=this.get(0);if(!C||a(C)){return null;}return f(C,true);};q.fn.lastFocusableDomRef=function lastFocusableDomRef(){var C=this.get(0);if(!C||a(C)){return null;}return f(C,false);};q.fn.scrollLeftRTL=function scrollLeftRTL(P){var o=this.get(0);if(o){if(P===undefined){if(D.browser.msie||D.browser.edge){return o.scrollWidth-o.scrollLeft-o.clientWidth;}else if(D.browser.webkit){return o.scrollLeft;}else if(D.browser.firefox){return o.scrollWidth+o.scrollLeft-o.clientWidth;}else{return o.scrollLeft;}}else{o.scrollLeft=q.sap.denormalizeScrollLeftRTL(P,o);return this;}}};q.fn.scrollRightRTL=function scrollRightRTL(){var o=this.get(0);if(o){if(D.browser.msie){return o.scrollLeft;}else if(D.browser.webkit){return o.scrollWidth-o.scrollLeft-o.clientWidth;}else if(D.browser.firefox){return(-o.scrollLeft);}else{return o.scrollLeft;}}};q.sap.denormalizeScrollLeftRTL=function(n,o){if(o){if(D.browser.msie){return o.scrollWidth-o.clientWidth-n;}else if(D.browser.webkit){return n;}else if(D.browser.firefox){return o.clientWidth+n-o.scrollWidth;}else{return n;}}};q.sap.denormalizeScrollBeginRTL=function(n,o){if(o){if(D.browser.msie){return n;}else if(D.browser.webkit){return o.scrollWidth-o.clientWidth-n;}else if(D.browser.firefox){return-n;}else{return n;}}};
/*
	 * The following methods are taken from jQuery UI core but modified.
	 *
	 * jQuery UI Core
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/category/ui-core/
	 */
q.support.selectstart="onselectstart"in document.createElement("div");q.fn.extend({disableSelection:function(){return this.on((q.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault();});},enableSelection:function(){return this.off(".ui-disableSelection");}});
/*!
	 * The following functions are taken from jQuery UI 1.8.17 but modified
	 *
	 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 * http://jquery.org/license
	 *
	 * http://docs.jquery.com/UI
	 */
function v(e){var o=q(e).offsetParent();var O=false;var $=q(e).parents().filter(function(){if(this===o){O=true;}return O;});return!q(e).add($).filter(function(){return q.css(this,"visibility")==="hidden"||q.expr.filters.hidden(this);}).length;}function b(e,i){var n=e.nodeName.toLowerCase();if(n==="area"){var m=e.parentNode,k=m.name,l;if(!e.href||!k||m.nodeName.toLowerCase()!=="map"){return false;}l=q("img[usemap='#"+k+"']")[0];return!!l&&v(l);}return(/input|select|textarea|button|object/.test(n)?!e.disabled:n=="a"?e.href||i:i)&&v(e);}if(!q.expr[":"].focusable){
/*!
		 * The following function is taken from jQuery UI 1.8.17
		 *
		 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
		 * Dual licensed under the MIT or GPL Version 2 licenses.
		 * http://jquery.org/license
		 *
		 * http://docs.jquery.com/UI
		 *
		 * But since visible is modified, focusable is different too the jQuery UI version too.
		 */
q.extend(q.expr[":"],{focusable:function(e){return b(e,!isNaN(q.attr(e,"tabindex")));}});}if(!q.expr[":"].sapTabbable){
/*!
		 * The following function is taken from
		 * jQuery UI Core 1.11.1
		 * http://jqueryui.com
		 *
		 * Copyright 2014 jQuery Foundation and other contributors
		 * Released under the MIT license.
		 * http://jquery.org/license
		 *
		 * http://api.jqueryui.com/category/ui-core/
		 */
q.extend(q.expr[":"],{sapTabbable:function(e){var t=q.attr(e,"tabindex"),i=isNaN(t);return(i||t>=0)&&b(e,!i);}});}if(!q.expr[":"].sapFocusable){q.extend(q.expr[":"],{sapFocusable:function(e){return b(e,!isNaN(q.attr(e,"tabindex")));}});}if(!q.fn.zIndex){q.fn.zIndex=function(z){if(z!==undefined){return this.css("zIndex",z);}if(this.length){var e=q(this[0]),i,k;while(e.length&&e[0]!==document){i=e.css("position");if(i==="absolute"||i==="relative"||i==="fixed"){k=parseInt(e.css("zIndex"),10);if(!isNaN(k)&&k!==0){return k;}}e=e.parent();}}return 0;};}q.fn.parentByAttribute=function parentByAttribute(A,V){if(this.length>0){if(V){return this.first().parents("["+A+"='"+V+"']").get(0);}else{return this.first().parents("["+A+"]").get(0);}}};q.sap.ownerWindow=function ownerWindow(o){if(o.ownerDocument.parentWindow){return o.ownerDocument.parentWindow;}return o.ownerDocument.defaultView;};var _={};q.sap.scrollbarSize=function(C,F){if(typeof C==="boolean"){F=C;C=null;}var k=C||"#DEFAULT";if(F){if(C){delete _[C];}else{_={};}}if(_[k]){return _[k];}if(!document.body){return{width:0,height:0};}var A=q("<DIV/>").css("visibility","hidden").css("height","0").css("width","0").css("overflow","hidden");if(C){A.addClass(C);}A.prependTo(document.body);var $=q("<div style=\"visibility:visible;position:absolute;height:100px;width:100px;overflow:scroll;opacity:0;\"></div>");A.append($);var o=$.get(0);var w=o.offsetWidth-o.scrollWidth;var H=o.offsetHeight-o.scrollHeight;A.remove();if(w===0||H===0){return{width:w,height:H};}_[k]={width:w,height:H};return _[k];};var c;function g(){return c||(c=sap.ui.require('sap/ui/core/Control'));}q.sap.syncStyleClass=function(s,S,e){if(!s){return e;}var C=g();if(C&&S instanceof C){S=S.$();}else if(typeof S==="string"){S=q.sap.byId(S);}else if(!(S instanceof q)){return e;}var i=!!S.closest("."+s).length;if(e instanceof q){e.toggleClass(s,i);}else if(C&&e instanceof C){e.toggleStyleClass(s,i);}else{}return e;};function d(A,V,P){var s=this.attr(A);if(!s){return this.attr(A,V);}var e=s.split(" ");if(e.indexOf(V)==-1){P?e.unshift(V):e.push(V);this.attr(A,e.join(" "));}return this;}function j(A,V){var s=this.attr(A)||"",e=s.split(" "),i=e.indexOf(V);if(i==-1){return this;}e.splice(i,1);if(e.length){this.attr(A,e.join(" "));}else{this.removeAttr(A);}return this;}q.fn.addAriaLabelledBy=function(i,P){return d.call(this,"aria-labelledby",i,P);};q.fn.removeAriaLabelledBy=function(i){return j.call(this,"aria-labelledby",i);};q.fn.addAriaDescribedBy=function(i,P){return d.call(this,"aria-describedby",i,P);};q.fn.removeAriaDescribedBy=function(i){return j.call(this,"aria-describedby",i);};function p(o,n){if(o.childElementCount!=n.childElementCount||o.tagName!=n.tagName){o.parentNode.replaceChild(n,o);return false;}if(o.isEqualNode(n)){return true;}var O=o.attributes;for(var i=0,e=O.length;i<e;i++){var A=O[i].name;if(n.getAttribute(A)===null){o.removeAttribute(A);e=e-1;i=i-1;}}var N=n.attributes;for(var i=0,e=N.length;i<e;i++){var A=N[i].name,k=o.getAttribute(A),l=n.getAttribute(A);if(k===null||k!==l){o.setAttribute(A,l);}}var m=n.childNodes.length;if(!m&&!o.hasChildNodes()){return true;}if(!n.childElementCount){if(!m){o.textContent="";}else if(m==1&&n.firstChild.nodeType==3){o.textContent=n.textContent;}else{o.innerHTML=n.innerHTML;}return true;}for(var i=0,r=0,e=m;i<e;i++){var s=o.childNodes[i],t=n.childNodes[i-r];if(t.nodeType==1){if(!p(s,t)){r=r+1;}}else{s.nodeValue=t.nodeValue;}}return true;}q.sap.replaceDOM=function(o,n,C){var N;if(typeof n==="string"){N=q.parseHTML(n)[0];}else{N=n;}if(C){q.cleanData([o]);q.cleanData(o.getElementsByTagName("*"));}return p(o,N);};return q;});
