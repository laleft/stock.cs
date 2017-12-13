/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','../Device','../Global','../base/Object','./Locale','sap/ui/thirdparty/URI','jquery.sap.script'],function(q,D,G,B,L,U){"use strict";var C,a;var b=B.extend("sap.ui.core.Configuration",{constructor:function(o){this._oCore=o;function i(){function e(){if(D.os.android){var m=navigator.userAgent.match(/\s([a-z]{2}-[a-z]{2})[;)]/i);if(m){return m[1];}}return navigator.language;}return c((navigator.languages&&navigator.languages[0])||e()||navigator.userLanguage||navigator.browserLanguage)||new L("en");}var j={"theme":{type:"string",defaultValue:"base"},"language":{type:"Locale",defaultValue:i()},"formatLocale":{type:"Locale",defaultValue:null},"calendarType":{type:"string",defaultValue:null},"accessibility":{type:"boolean",defaultValue:true},"autoAriaBodyRole":{type:"boolean",defaultValue:true,noUrl:true},"animation":{type:"boolean",defaultValue:true},"rtl":{type:"boolean",defaultValue:null},"debug":{type:"boolean",defaultValue:false},"inspect":{type:"boolean",defaultValue:false},"originInfo":{type:"boolean",defaultValue:false},"noConflict":{type:"boolean",defaultValue:false,noUrl:true},"noDuplicateIds":{type:"boolean",defaultValue:true},"trace":{type:"boolean",defaultValue:false,noUrl:true},"modules":{type:"string[]",defaultValue:[],noUrl:true},"areas":{type:"string[]",defaultValue:null,noUrl:true},"onInit":{type:"code",defaultValue:undefined,noUrl:true},"uidPrefix":{type:"string",defaultValue:"__",noUrl:true},"ignoreUrlParams":{type:"boolean",defaultValue:false,noUrl:true},"preload":{type:"string",defaultValue:"auto"},"rootComponent":{type:"string",defaultValue:"",noUrl:true},"preloadLibCss":{type:"string[]",defaultValue:[]},"application":{type:"string",defaultValue:""},"appCacheBuster":{type:"string[]",defaultValue:[]},"bindingSyntax":{type:"string",defaultValue:"default",noUrl:true},"versionedLibCss":{type:"boolean",defaultValue:false},"manifestFirst":{type:"boolean",defaultValue:false},"whitelistService":{type:"string",defaultValue:null,noUrl:true},"frameOptions":{type:"string",defaultValue:"default",noUrl:true},"frameOptionsConfig":{type:"object",defaultValue:undefined,noUrl:true},"support":{type:"string[]",defaultValue:null},"xx-rootComponentNode":{type:"string",defaultValue:"",noUrl:true},"xx-appCacheBusterMode":{type:"string",defaultValue:"sync"},"xx-appCacheBusterHooks":{type:"object",defaultValue:undefined,noUrl:true},"xx-disableCustomizing":{type:"boolean",defaultValue:false,noUrl:true},"xx-loadAllMode":{type:"boolean",defaultValue:false,noUrl:true},"xx-viewCache":{type:"boolean",defaultValue:true},"xx-test-mobile":{type:"boolean",defaultValue:false},"xx-domPatching":{type:"boolean",defaultValue:false},"xx-libraryPreloadFiles":{type:"string[]",defaultValue:[]},"xx-componentPreload":{type:"string",defaultValue:""},"xx-designMode":{type:"boolean",defaultValue:false},"xx-supportedLanguages":{type:"string[]",defaultValue:[]},"xx-bootTask":{type:"function",defaultValue:undefined,noUrl:true},"xx-suppressDeactivationOfControllerCode":{type:"boolean",defaultValue:false},"xx-lesssupport":{type:"boolean",defaultValue:false},"xx-handleValidation":{type:"boolean",defaultValue:false},"xx-fiori2Adaptation":{type:"string[]",defaultValue:[]},"xx-cache-use":{type:"boolean",defaultValue:true},"xx-cache-excludedKeys":{type:"string[]",defaultValue:[]},"xx-cache-serialization":{type:"boolean",defaultValue:false},"xx-nosync":{type:"string",defaultValue:""},"xx-waitForTheme":{type:"boolean",defaultValue:false},"statistics":{type:"boolean",defaultValue:false}};var k={"xx-test":"1.15","flexBoxPolyfill":"1.14","sapMeTabContainer":"1.14","sapMeProgessIndicator":"1.14","sapMGrowingList":"1.14","sapMListAsTable":"1.14","sapMDialogWithPadding":"1.14","sapCoreBindingSyntax":"1.24"};this.oFormatSettings=new b.FormatSettings(this);var l=this;function p(e,V){if(typeof V==="undefined"||V===null){return;}switch(j[e].type){case"boolean":if(typeof V==="string"){if(j[e].defaultValue){l[e]=V.toLowerCase()!="false";}else{l[e]=V.toLowerCase()==="true"||V.toLowerCase()==="x";}}else{l[e]=!!V;}break;case"string":l[e]=""+V;break;case"code":l[e]=typeof V==="function"?V:String(V);break;case"function":if(typeof V!=="function"){throw new Error("unsupported value");}l[e]=V;break;case"string[]":if(Array.isArray(V)){l[e]=V;}else if(typeof V==="string"){l[e]=V.split(/[ ,;]/).map(function(s){return s.trim();});}else{throw new Error("unsupported value");}break;case"object":if(typeof V!=="object"){throw new Error("unsupported value");}l[e]=V;break;case"Locale":var E=c(V);if(E||j[e].defaultValue==null){l[e]=E;}else{throw new Error("unsupported value");}break;default:throw new Error("illegal state");}}function r(F){var m,s;try{m=new U(F,window.location.href).normalize();s=m.path();return s+(s.slice(-1)==='/'?'':'/')+"UI5/";}catch(e){}}for(var n in j){l[n]=j[n].defaultValue;}var u=window["sap-ui-config"]||{};u.oninit=u.oninit||u["evt-oninit"];for(var n in j){if(u.hasOwnProperty(n.toLowerCase())){p(n,u[n.toLowerCase()]);}else if(!/^xx-/.test(n)&&u.hasOwnProperty("xx-"+n.toLowerCase())){p(n,u["xx-"+n.toLowerCase()]);}}if(u.libs){l.modules=u.libs.split(",").map(function(e){return e.trim()+".library";}).concat(l.modules);}var P="compatversion";var w=u[P];var x=q.sap.Version("1.14");this._compatversion={};function _(e){var v=!e?w||x.toString():u[P+"-"+e.toLowerCase()]||w||k[e]||x.toString();v=q.sap.Version(v.toLowerCase()==="edge"?G.version:v);return q.sap.Version(v.getMajor(),v.getMinor());}this._compatversion._default=_();for(var n in k){this._compatversion[n]=_(n);}function y(s){var m=document.querySelector("META[name='"+s+"']"),e=m&&m.getAttribute("content");if(e){return e;}}if(!l.ignoreUrlParams){var z="sap-ui-";var A=q.sap.getUriParameters();if(A.mParams['sap-language']){var V=l.sapLogonLanguage=A.get('sap-language');var E=V&&c(M[V.toUpperCase()]||V);if(E){l.language=E;}else if(V&&!A.get('sap-locale')&&!A.get('sap-ui-language')){q.sap.log.warning("sap-language '"+V+"' is not a valid BCP47 language tag and will only be used as SAP logon language");}}if(A.mParams['sap-locale']){p("language",A.get('sap-locale'));}if(A.mParams['sap-rtl']){var V=A.get('sap-rtl');if(V==="X"||V==="x"){p('rtl',true);}else{p('rtl',false);}}if(A.mParams['sap-theme']){var V=A.get('sap-theme');if(V===""){l['theme']=j['theme'].defaultValue;}else{p('theme',V);}}if(A.mParams['sap-statistics']){var V=A.get('sap-statistics');p('statistics',V);}for(var n in j){if(j[n].noUrl){continue;}var V=A.get(z+n);if(V==null&&!/^xx-/.test(n)){V=A.get(z+"xx-"+n);}if(V===""){l[n]=j[n].defaultValue;}else{p(n,V);}}if(A.mParams['sap-ui-legacy-date-format']){this.oFormatSettings.setLegacyDateFormat(A.get('sap-ui-legacy-date-format'));}if(A.mParams['sap-ui-legacy-time-format']){this.oFormatSettings.setLegacyTimeFormat(A.get('sap-ui-legacy-time-format'));}if(A.mParams['sap-ui-legacy-number-format']){this.oFormatSettings.setLegacyNumberFormat(A.get('sap-ui-legacy-number-format'));}}l.sapparams=l.sapparams||{};l.sapparams['sap-language']=this.getSAPLogonLanguage();['sap-client','sap-server','sap-system'].forEach(function(s){if(!l.ignoreUrlParams&&A.get(s)){l.sapparams[s]=A.get(s);}else{l.sapparams[s]=y(s);}});this.derivedRTL=L._impliesRTL(l.language);var T=l.theme;var F;var I=T.indexOf("@");if(I>=0){F=r(T.slice(I+1));if(F){l.theme=T.slice(0,I);l.themeRoot=F;}else{l.theme=(u.theme&&u.theme!==T)?u.theme:"base";I=-1;}}l.theme=this._normalizeTheme(l.theme,F);var H=l['languagesDeliveredWithCore']=L._coreI18nLocales;var J=l['xx-supportedLanguages'];if(J.length===0||(J.length===1&&J[0]==='*')){J=[];}else if(J.length===1&&J[0]==='default'){J=H||[];}l['xx-supportedLanguages']=J;var K=l['xx-fiori2Adaptation'];if(K.length===0||(K.length===1&&K[0]==='false')){K=false;}else if(K.length===1&&K[0]==='true'){K=true;}l['xx-fiori2Adaptation']=K;if(l["bindingSyntax"]==="default"){l["bindingSyntax"]=(l.getCompatibilityVersion("sapCoreBindingSyntax").compareTo("1.26")<0)?"simple":"complex";}if(!l["whitelistService"]){var N=y('sap.whitelistService');if(N){l["whitelistService"]=N;if(l["frameOptions"]==="default"){l["frameOptions"]="trusted";}}}if(l["frameOptions"]==="default"||(l["frameOptions"]!=="allow"&&l["frameOptions"]!=="deny"&&l["frameOptions"]!=="trusted")){l["frameOptions"]="allow";}var O=l['preloadLibCss'];if(O.length>0){O.appManaged=O[0].slice(0,1)==="!";if(O.appManaged){O[0]=O[0].slice(1);}if(O[0]==="*"){O.shift();l.modules.forEach(function(e){var m=e.match(/^(.*)\.library$/);if(m){O.unshift(m[1]);}});}}for(var n in j){if(l[n]!==j[n].defaultValue){q.sap.log.info("  "+n+" = "+l[n]);}}},getVersion:function(){if(this._version){return this._version;}this._version=new q.sap.Version(G.version);return this._version;},getCompatibilityVersion:function(F){if(typeof(F)==="string"&&this._compatversion[F]){return this._compatversion[F];}return this._compatversion._default;},getTheme:function(){return this.theme;},_setTheme:function(T){this.theme=T;return this;},_normalizeTheme:function(T,s){if(T&&s==null&&T.match(/^sap_corbu$/i)){return"sap_goldreflection";}return T;},getLanguage:function(){return this.language.sLocaleId;},getLanguageTag:function(){return this.language.toString();},getSAPLogonLanguage:function(){return this.sapLogonLanguage||this.language.getSAPLogonLanguage();},setLanguage:function(l,s){var o=c(l),O=this.getRTL(),m;h(o,"Configuration.setLanguage: sLanguage must be a valid BCP47 language tag");h(s==null||(typeof s==='string'&&/[A-Z0-9]{2,2}/i.test(s)),"Configuration.setLanguage: sSAPLogonLanguage must be null or be a string of length 2, consisting of digits and latin characters only",true);if(o.toString()!=this.getLanguageTag()||s!==this.sapLogonLanguage){this.language=o;this.sapLogonLanguage=s||undefined;this.sapparams['sap-language']=this.getSAPLogonLanguage();m=this._collect();m.language=this.getLanguageTag();this.derivedRTL=L._impliesRTL(o);if(O!=this.getRTL()){m.rtl=this.getRTL();}this._endCollect();}return this;},getLocale:function(){return this.language;},getSAPParam:function(n){return this.sapparams&&this.sapparams[n];},isUI5CacheOn:function(){return this["xx-cache-use"];},setUI5CacheOn:function(o){this["xx-cache-use"]=o;return this;},isUI5CacheSerializationSupportOn:function(){return this["xx-cache-serialization"];},setUI5CacheSerializationSupport:function(o){this["xx-cache-serialization"]=o;return this;},getUI5CacheExcludedKeys:function(){return this["xx-cache-excludedKeys"];},getCalendarType:function(){var n;if(!C){G.getCore().loadLibrary('sap.ui.core');C=sap.ui.require("sap/ui/core/library").CalendarType;}if(!a){a=sap.ui.requireSync("sap/ui/core/LocaleData");}if(this.calendarType){for(n in C){if(n.toLowerCase()===this.calendarType.toLowerCase()){this.calendarType=n;return this.calendarType;}}q.sap.log.warning("Parameter 'calendarType' is set to "+this.calendarType+" which isn't a valid value and therefore ignored. The calendar type is determined from format setting and current locale");}var l=this.oFormatSettings.getLegacyDateFormat();switch(l){case"A":case"B":return C.Islamic;case"7":case"8":case"9":return C.Japanese;}return a.getInstance(this.getLocale()).getPreferredCalendarType();},setCalendarType:function(s){var m;if(this.calendarType!==s){m=this._collect();this.calendarType=m.calendarType=s;this._endCollect();}return this;},getFormatLocale:function(){return(this.formatLocale||this.language).toString();},setFormatLocale:function(F){var o=c(F),m;h(F==null||typeof F==="string"&&o,"sFormatLocale must be a BCP47 language tag or Java Locale id or null");if(t(o)!==t(this.formatLocale)){this.formatLocale=o;m=this._collect();m.formatLocale=t(o);this._endCollect();}return this;},getLanguagesDeliveredWithCore:function(){return this["languagesDeliveredWithCore"];},getSupportedLanguages:function(){return this["xx-supportedLanguages"];},getAccessibility:function(){return this.accessibility;},getAutoAriaBodyRole:function(){return this.autoAriaBodyRole;},getAnimation:function(){return this.animation;},getRTL:function(){return this.rtl===null?this.derivedRTL:this.rtl;},getFiori2Adaptation:function(){return this["xx-fiori2Adaptation"];},setRTL:function(r){h(r===null||typeof r==="boolean","bRTL must be null or a boolean");var o=this.getRTL(),m;this.rtl=r;if(o!=this.getRTL()){m=this._collect();m.rtl=this.getRTL();this._endCollect();}return this;},getDebug:function(){return this.debug;},getInspect:function(){return this.inspect;},getOriginInfo:function(){return this.originInfo;},getNoDuplicateIds:function(){return this.noDuplicateIds;},getTrace:function(){return this.trace;},getUIDPrefix:function(){return this.uidPrefix;},getDesignMode:function(){return this["xx-designMode"];},getSuppressDeactivationOfControllerCode:function(){return this["xx-suppressDeactivationOfControllerCode"];},getControllerCodeDeactivated:function(){return this.getDesignMode()&&!this.getSuppressDeactivationOfControllerCode();},getApplication:function(){return this.application;},getRootComponent:function(){return this.rootComponent;},getAppCacheBuster:function(){return this.appCacheBuster;},getAppCacheBusterMode:function(){return this["xx-appCacheBusterMode"];},getAppCacheBusterHooks:function(){return this["xx-appCacheBusterHooks"];},getDisableCustomizing:function(){return this["xx-disableCustomizing"];},getViewCache:function(){return this["xx-viewCache"];},getDomPatching:function(){return this["xx-domPatching"];},getPreload:function(){return this.preload;},getManifestFirst:function(){return this.manifestFirst;},getComponentPreload:function(){return this['xx-componentPreload']||this.preload;},getFormatSettings:function(){return this.oFormatSettings;},getFrameOptions:function(){return this.frameOptions;},getWhitelistService:function(){return this.whitelistService;},getSupportMode:function(){return this.support;},_collect:function(){var m=this.mChanges||(this.mChanges={__count:0});m.__count++;return m;},_endCollect:function(){var m=this.mChanges;if(m&&(--m.__count)===0){delete m.__count;this._oCore&&this._oCore.fireLocalizationChanged(m);delete this.mChanges;}},getStatistics:function(){var r=this.statistics;try{r=r||window.localStorage.getItem("sap-ui-statistics")=="X";}catch(e){}return r;},getNoNativeScroll:function(){return false;},getHandleValidation:function(){return this["xx-handleValidation"];},applySettings:function(s){function e(i,m){var n,j;for(n in m){j="set"+n.slice(0,1).toUpperCase()+n.slice(1);if(n==='formatSettings'&&i.oFormatSettings){e(i.oFormatSettings,m[n]);}else if(typeof i[j]==='function'){i[j](m[n]);}else{q.sap.log.warning("Configuration.applySettings: unknown setting '"+n+"' ignored");}}}this._collect();e(this,s);this._endCollect();return this;}});function c(l){try{if(l&&typeof l==='string'){return new L(l);}}catch(e){}}function t(l){return l?l.toString():null;}var M={"ZH":"zh-Hans","ZF":"zh-Hant","1Q":"en-US-x-saptrc","2Q":"en-US-x-sappsd"};var d={"":{pattern:null},"1":{pattern:"dd.MM.yyyy"},"2":{pattern:"MM/dd/yyyy"},"3":{pattern:"MM-dd-yyyy"},"4":{pattern:"yyyy.MM.dd"},"5":{pattern:"yyyy/MM/dd"},"6":{pattern:"yyyy-MM-dd"},"7":{pattern:"Gyy.MM.dd"},"8":{pattern:"Gyy/MM/dd"},"9":{pattern:"Gyy-MM-dd"},"A":{pattern:"yyyy/MM/dd"},"B":{pattern:"yyyy/MM/dd"},"C":{pattern:"yyyy/MM/dd",ignore:true}};var f={"":{"short":null,medium:null,dayPeriods:null},"0":{"short":"HH:mm",medium:"HH:mm:ss",dayPeriods:null},"1":{"short":"hh:mm a",medium:"hh:mm:ss a",dayPeriods:["AM","PM"]},"2":{"short":"hh:mm a",medium:"hh:mm:ss a",dayPeriods:["am","pm"]},"3":{"short":"KK:mm a",medium:"KK:mm:ss a",dayPeriods:["AM","PM"]},"4":{"short":"KK:mm a",medium:"KK:mm:ss a",dayPeriods:["am","pm"]}};var g={"":{groupingSeparator:null,decimalSeparator:null}," ":{groupingSeparator:".",decimalSeparator:","},"X":{groupingSeparator:",",decimalSeparator:"."},"Y":{groupingSeparator:" ",decimalSeparator:","}};function h(e,m){if(!e){throw new Error(m);}}B.extend("sap.ui.core.Configuration.FormatSettings",{constructor:function(o){this.oConfiguration=o;this.mSettings={};this.sLegacyDateFormat=undefined;this.sLegacyTimeFormat=undefined;this.sLegacyNumberFormatSymbolSet=undefined;},getFormatLocale:function(){function e(i){var o=i.oConfiguration.language;if(!q.isEmptyObject(i.mSettings)){var l=o.toString();if(l.indexOf("-x-")<0){l=l+"-x-sapufmt";}else if(l.indexOf("-sapufmt")<=l.indexOf("-x-")){l=l+"-sapufmt";}o=new L(l);}return o;}return this.oConfiguration.formatLocale||e(this);},_set:function(k,v){var o=this.mSettings[k];if(v!=null){this.mSettings[k]=v;}else{delete this.mSettings[k];}if((o==null!=v==null)||!q.sap.equal(o,v)){var m=this.oConfiguration._collect();m[k]=v;this.oConfiguration._endCollect();}},getDatePattern:function(s){return this.mSettings["dateFormats-"+s];},setDatePattern:function(s,p){h(s=="short"||s=="medium"||s=="long"||s=="full","sStyle must be short, medium, long or full");this._set("dateFormats-"+s,p);return this;},getTimePattern:function(s){return this.mSettings["timeFormats-"+s];},setTimePattern:function(s,p){h(s=="short"||s=="medium"||s=="long"||s=="full","sStyle must be short, medium, long or full");this._set("timeFormats-"+s,p);return this;},getNumberSymbol:function(T){return this.mSettings["symbols-latn-"+T];},setNumberSymbol:function(T,s){h(T=="decimal"||T=="group"||T=="plusSign"||T=="minusSign","sType must be decimal, group, plusSign or minusSign");this._set("symbols-latn-"+T,s);return this;},setFirstDayOfWeek:function(v){h(typeof v=="number"&&v>=0&&v<=6,"iValue must be an integer value between 0 and 6");this._set("weekData-firstDay",v);return this;},_setDayPeriods:function(w,T){this._set("dayPeriods-format-"+w,T);return this;},getLegacyDateFormat:function(){return this.sLegacyDateFormat||undefined;},setLegacyDateFormat:function(F){F=F?String(F).toUpperCase():"";h(!F||d.hasOwnProperty(F),"sFormatId must be one of ['1','2','3','4','5','6','7','8','9','A','B','C'] or empty");if(d[F].ignore){q.sap.log.warning("The ABAP date format '"+F+"' ("+d[F].pattern+") is not supported yet. Falling back to locale specific date formats.");F="";}var m=this.oConfiguration._collect();this.sLegacyDateFormat=m.legacyDateFormat=F;this.setDatePattern("short",d[F].pattern);this.setDatePattern("medium",d[F].pattern);this.oConfiguration._endCollect();return this;},getLegacyTimeFormat:function(){return this.sLegacyTimeFormat||undefined;},setLegacyTimeFormat:function(F){h(!F||f.hasOwnProperty(F),"sFormatId must be one of ['0','1','2','3','4'] or empty");var m=this.oConfiguration._collect();this.sLegacyTimeFormat=m.legacyTimeFormat=F=F||"";this.setTimePattern("short",f[F]["short"]);this.setTimePattern("medium",f[F]["medium"]);this._setDayPeriods("abbreviated",f[F].dayPeriods);this.oConfiguration._endCollect();return this;},getLegacyNumberFormat:function(){return this.sLegacyNumberFormat||undefined;},setLegacyNumberFormat:function(F){F=F?F.toUpperCase():"";h(!F||g.hasOwnProperty(F),"sFormatId must be one of [' ','X','Y'] or empty");var m=this.oConfiguration._collect();this.sLegacyNumberFormat=m.legacyNumberFormat=F;this.setNumberSymbol("group",g[F].groupingSeparator);this.setNumberSymbol("decimal",g[F].decimalSeparator);this.oConfiguration._endCollect();return this;},setLegacyDateCalendarCustomizing:function(m){h(Array.isArray(m),"aMappings must be an Array");var e=this.oConfiguration._collect();this.aLegacyDateCalendarCustomizing=e.legacyDateCalendarCustomizing=m;this.oConfiguration._endCollect();return this;},getLegacyDateCalendarCustomizing:function(){return this.aLegacyDateCalendarCustomizing;},getCustomLocaleData:function(){return this.mSettings;}});return b;});
