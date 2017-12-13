/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control'],function(q,l,C){"use strict";var I=C.extend("sap.m.Image",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{src:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},decorative:{type:"boolean",group:"Accessibility",defaultValue:true},alt:{type:"string",group:"Accessibility",defaultValue:null},useMap:{type:"string",group:"Misc",defaultValue:null},densityAware:{type:"boolean",group:"Misc",defaultValue:true},activeSrc:{type:"sap.ui.core.URI",group:"Data",defaultValue:""},mode:{type:"sap.m.ImageMode",group:"Misc",defaultValue:"Image"},backgroundSize:{type:"string",group:"Appearance",defaultValue:"cover"},backgroundPosition:{type:"string",group:"Appearance",defaultValue:"initial"},backgroundRepeat:{type:"string",group:"Appearance",defaultValue:"no-repeat"}},aggregations:{detailBox:{type:'sap.m.LightBox',multiple:false,bindable:"bindable"}},events:{tap:{},press:{},load:{},error:{}},designTime:true}});I._currentDevicePixelRatio=(function(){var r=(window.devicePixelRatio===undefined?1:window.devicePixelRatio);if(r<=1){r=1;}else{r*=2;r=Math.round(r);r/=2;}if(r>2){r=2;}return r;}());I.prototype.onload=function(e){var w,h;if(!this._defaultEventTriggered){this._defaultEventTriggered=true;}this._bVersion2Tried=false;var d=this.$(),D=d[0];if(this.getMode()===sap.m.ImageMode.Background){d.css("background-image","url(\""+this._oImage.src+"\")");}if(!this._isWidthOrHeightSet()){if(this._iLoadImageDensity>1){w=Math.round(D.getBoundingClientRect().width);h=Math.round(D.getBoundingClientRect().height);if((w===D.naturalWidth)&&(h===D.naturalHeight)){d.width(w/this._iLoadImageDensity);}}}d.removeClass("sapMNoImg");this.fireLoad();};I.prototype.onerror=function(e){if(!this._defaultEventTriggered){this._defaultEventTriggered=true;}var D=this.$(),m=this.getMode(),s=(m===sap.m.ImageMode.Image)?D.attr("src"):this._oImage.src,d=I._currentDevicePixelRatio,c=this._isActiveState?this.getActiveSrc():this.getSrc();D.addClass("sapMNoImg");if(!s||this._iLoadImageDensity===1){D.removeClass("sapMNoImg");this.fireError();return;}if(d===2||d<1){this._iLoadImageDensity=1;this._updateDomSrc(this._generateSrcByDensity(c,1));}else if(d===1.5){if(this._bVersion2Tried){setTimeout(q.proxy(function(){this._iLoadImageDensity=1;this._updateDomSrc(this._generateSrcByDensity(c,1));},this),0);}else{setTimeout(q.proxy(function(){this._iLoadImageDensity=2;this._updateDomSrc(this._generateSrcByDensity(c,2));this._bVersion2Tried=true;},this),0);}}};I.prototype.onBeforeRendering=function(){this._defaultEventTriggered=false;if(!this._fnLightBoxOpen){var L=this.getDetailBox();if(L){this._fnLightBoxOpen=L.open;this.attachPress(this._fnLightBoxOpen.bind(L));}}};I.prototype.onAfterRendering=function(){var d=this.$(),m=this.getMode(),D;if(m===sap.m.ImageMode.Image){d.on("load",q.proxy(this.onload,this));d.on("error",q.proxy(this.onerror,this));D=d[0];}if(m===sap.m.ImageMode.Background){D=this._oImage;}if(D&&D.complete&&!this._defaultEventTriggered){if(D.naturalWidth>0){this.onload({});}else{this.onerror({});}}};I.prototype.exit=function(){if(this._oImage){q(this._oImage).off("load",this.onload).off("error",this.onerror);this._oImage=null;}else{this.$().off("load",this.onload).off("error",this.onerror);}if(this._fnLightBoxOpen){this._fnLightBoxOpen=null;}};I.prototype.ontouchstart=function(e){if(e.srcControl.mEventRegistry["press"]||e.srcControl.mEventRegistry["tap"]){e.setMarked();}if(e.targetTouches.length===1&&this.getActiveSrc()){this._updateDomSrc(this._getDensityAwareActiveSrc());this._isActiveState=true;}};I.prototype.ontouchend=function(e){if(e.targetTouches.length===0&&this.getActiveSrc()){this._isActiveState=false;this._updateDomSrc(this._getDensityAwareSrc());this.$().removeClass("sapMNoImg");}};I.prototype.setSrc=function(s){if(s===this.getSrc()){return this;}this.setProperty("src",s,true);var d=this.getDomRef();if(d){this._updateDomSrc(this._getDensityAwareSrc());}return this;};I.prototype.setActiveSrc=function(a){if(!a){a="";}return this.setProperty("activeSrc",a,true);};I.prototype.attachPress=function(){Array.prototype.unshift.apply(arguments,["press"]);sap.ui.core.Control.prototype.attachEvent.apply(this,arguments);if(this.hasListeners("press")){this.$().attr("tabindex","0");this.$().attr("role","button");}return this;};I.prototype.detachPress=function(){Array.prototype.unshift.apply(arguments,["press"]);sap.ui.core.Control.prototype.detachEvent.apply(this,arguments);if(!this.hasListeners("press")){this.$().removeAttr("tabindex");if(this.getDecorative()){this.$().attr("role","presentation");}else{this.$().removeAttr("role");}}return this;};I.prototype.ontap=function(e){this.fireTap({});this.firePress({});};I.prototype.onkeyup=function(e){if(e.which===q.sap.KeyCodes.SPACE||e.which===q.sap.KeyCodes.ENTER){this.firePress({});e.stopPropagation();}};I.prototype._updateDomSrc=function(s){var d=this.$(),m=this.getMode();if(d.length){if(m===sap.m.ImageMode.Image){d.attr("src",s);}else{d.addClass("sapMNoImg");q(this._oImage).attr("src",s);}}};I.prototype._preLoadImage=function(s){if(this.getMode()!==sap.m.ImageMode.Background){return;}var i=q(this._oImage);if(!this._oImage){this._oImage=new window.Image();i=q(this._oImage);i.on("load",q.proxy(this.onload,this)).on("error",q.proxy(this.onerror,this));}this._oImage.src=s;};I.prototype._isWidthOrHeightSet=function(){return(this.getWidth()&&this.getWidth()!=='')||(this.getHeight()&&this.getHeight()!=='');};I.prototype._getDensityAwareSrc=function(){var s=this.getSrc(),D=this.getDensityAware(),d=D?I._currentDevicePixelRatio:1;this._iLoadImageDensity=d;if(d===1){return s;}return this._generateSrcByDensity(s,d);};I.prototype._getDensityAwareActiveSrc=function(){var a=this.getActiveSrc(),D=this.getDensityAware(),d=D?I._currentDevicePixelRatio:1;this._iLoadImageDensity=d;if(d===1){return a;}return this._generateSrcByDensity(a,d);};I.prototype._generateSrcByDensity=function(s,d){if(!s){return"";}if(this._isDataUri(s)){this._iLoadImageDensity=1;return s;}if(d===1){return s;}var L=s.lastIndexOf("."),i=s.lastIndexOf("/"),n=s.substring(0,L),e=s.substring(L);if(L===-1||(i>L)){return s+"@"+d;}n=n+"@"+d;return n+e;};I.prototype._isDataUri=function(s){return s?s.indexOf("data:")===0:false;};I.prototype.getAccessibilityInfo=function(){var h=this.hasListeners("press");if(this.getDecorative()&&!this.getUseMap()&&!h){return null;}return{role:h?"button":"img",type:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText(h?"ACC_CTR_TYPE_BUTTON":"ACC_CTR_TYPE_IMAGE"),description:this.getAlt()||this.getTooltip_AsString()||"",focusable:h};};I.prototype.getFormDoNotAdjustWidth=function(){return true;};return I;},true);
