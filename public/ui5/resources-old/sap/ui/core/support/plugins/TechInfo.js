/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','../Plugin','../Support','../ToolsAPI','jquery.sap.encoder','jquery.sap.script'],function(q,P,S,T){"use strict";var a=P.extend("sap.ui.core.support.plugins.TechInfo",{constructor:function(o){P.apply(this,["sapUiSupportTechInfo","Technical Information",o]);this._aEventIds=this.runsAsToolPlugin()?[this.getId()+"Data",this.getId()+"FinishedE2ETrace"]:[this.getId()+"ToggleDebug",this.getId()+"SetReboot",this.getId()+"Refresh",this.getId()+"StartE2ETrace",this.getId()+"ToggleStatistics"];if(this.runsAsToolPlugin()){this.e2eLogLevel="medium";this.e2eTraceStarted=false;}}});a.prototype.onsapUiSupportTechInfoData=function(E){var t=this;var d=E.getParameter("data");d.modules.sort();this.e2eTraceStarted=d["e2e-trace"].isStarted;var h=["<div class='sapUiSupportToolbar'>","<a href='#' id='",t.getId(),"-Refresh' class='sapUiSupportLink'>Refresh</a>","<div><div class='sapUiSupportTechInfoCntnt'>","<table border='0' cellpadding='3'>"];function f(c,g){var i=[];if(c){var j=/^(\d{4})(\d{2})(\d{2})-?(\d{2})(\d{2})$/.exec(c);if(j){c=j[1]+'-'+j[2]+'-'+j[3]+'T'+j[4]+":"+j[5];}i.push("built at "+e(c));}if(g){i.push("last change "+e(g));}return i.length===0?"":" ("+i.join(", ")+")";}var p="SAPUI5";var V="not available";try{var o=sap.ui.getVersionInfo();p=o.name;V="<a href='"+sap.ui.resource("","sap-ui-version.json")+"' target='_blank' title='Open Version Info'>"+e(o.version)+"</a>"+f(o.buildTimestamp,o.scmRevision);}catch(b){}l(h,true,true,p,function(c){c.push(V);});if(!/openui5/i.test(p)){l(h,true,true,"OpenUI5 Version",function(c){c.push(e(d.version)+f(d.build,d.change));});}l(h,true,true,"Loaded jQuery Version",function(c){return d.jquery;});l(h,true,true,"User Agent",function(c){return d.useragent+(d.docmode?", Document Mode '"+d.docmode+"'":"");});l(h,true,true,"Debug Sources",function(c){c.push((d.debug?"ON":"OFF"),"<a href='#' id='",t.getId(),"-tggleDbgSrc' class='sapUiSupportLink'>Toggle</a>");});l(h,true,true,"Application",d.appurl);m(h,true,true,"Configuration (bootstrap)",d.bootconfig);m(h,true,true,"Configuration (computed)",d.config);if(!q.isEmptyObject(d.libraries)){m(h,true,true,"Libraries",d.libraries);}m(h,true,true,"Loaded Libraries",d.loadedLibraries);l(h,true,true,"Loaded Modules",function(c){q.each(d.modules,function(i,v){if(v.indexOf("sap.ui.core.support")<0){c.push("<span>",e(v),"</span>");if(i<d.modules.length-1){c.push(", ");}}});});m(h,true,true,"URI Parameters",d.uriparams);l(h,true,true,"E2E Trace",function(c){c.push("<label class='sapUiSupportLabel'>Trace Level:</label>","<select id='",t.getId(),"-logLevelE2ETrace' class='sapUiSupportTxtFld' style='margin-left:10px'>","<option value='low'"+(t.e2eLogLevel==='low'?" selected":"")+">LOW</option>","<option value='medium'"+(t.e2eLogLevel==='medium'?" selected":"")+">MEDIUM</option>","<option value='high'"+(t.e2eLogLevel==='hight'?" selected":"")+">HIGH</option>","</select>");c.push("<button id='"+t.getId()+"-startE2ETrace' class='sapUiSupportBtn "+(d["e2e-trace"].isStarted?" active":"")+"' style='margin-left: 10px;'>"+(d["e2e-trace"].isStarted?"Running...":"Start")+"</button>");c.push("<div style='margin-top:5px'>");c.push("<label class='sapUiSupportLabel'>XML Output:</label>");c.push("<textarea id='"+t.getId()+"-outputE2ETrace' style='width:100%;height:50px;margin-top:5px;resize:none;box-sizing:border-box'></textarea>");c.push("</div>");});h.push("</table></div>");this.$().html(h.join(""));this.$("tggleDbgSrc").bind("click",function(E){E.preventDefault();S.getStub().sendEvent(t.getId()+"ToggleDebug",{});});this.$("Refresh").bind("click",function(E){E.preventDefault();S.getStub().sendEvent(t.getId()+"Refresh",{});});this.$("outputE2ETrace").bind("click",function(){this.focus();this.select();});this.$("startE2ETrace").bind("click",function(){if(!t.e2eTraceStarted){t.e2eLogLevel=t.$("logLevelE2ETrace").val();t.$("startE2ETrace").addClass("active").text("Running...");t.$("outputE2ETrace").text("");S.getStub().sendEvent(t.getId()+"StartE2ETrace",{level:t.e2eLogLevel});t.e2eTraceStarted=true;}});document.title="SAPUI5 Diagnostics - "+d.title;};a.prototype.onsapUiSupportTechInfoToggleDebug=function(E){q.sap.debug(!q.sap.debug());s(this);};a.prototype.onsapUiSupportTechInfoSetReboot=function(E){q.sap.setReboot(E.getParameter("rebootUrl"));};a.prototype.onsapUiSupportTechInfoStartE2ETrace=function(E){var t=this,L=E.getParameter("level");sap.ui.require(['sap/ui/core/support/trace/E2eTraceLib'],function(b){b.start(L,function(c){S.getStub().sendEvent(t.getId()+"FinishedE2ETrace",{trace:c});});});};a.prototype.onsapUiSupportTechInfoFinishedE2ETrace=function(E){this.$("startE2ETrace").removeClass("active").text("Start");this.$("outputE2ETrace").text(E.getParameter("trace"));this.e2eTraceStarted=false;};a.prototype.onsapUiSupportTechInfoRefresh=function(E){s(this);};a.prototype.onsapUiSupportTechInfoToggleStatistics=function(E){q.sap.statistics(!q.sap.statistics());s(this);};a.prototype.init=function(o){P.prototype.init.apply(this,arguments);if(!this.runsAsToolPlugin()){s(this);return;}this.$().html("No Information available");};function s(p){var c=T.getFrameworkInformation();var d={version:c.commonInformation.version,build:c.commonInformation.buildTime,change:c.commonInformation.lastChange,jquery:c.commonInformation.jquery,useragent:c.commonInformation.userAgent,docmode:c.commonInformation.documentMode,debug:c.commonInformation.debugMode,bootconfig:c.configurationBootstrap,config:c.configurationComputed,libraries:c.libraries,loadedLibraries:c.loadedLibraries,modules:c.loadedModules,uriparams:c.URLParameters,appurl:c.commonInformation.applicationHREF,title:c.commonInformation.documentTitle,statistics:c.commonInformation.statistics};var E=sap.ui.require('sap/ui/core/support/trace/E2eTraceLib');d["e2e-trace"]={isStarted:E?E.isStarted():false};S.getStub().sendEvent(p.getId()+"Data",{data:d});}function e(b){return b==null?"":q.sap.encodeHTML(String(b));}function l(b,r,c,d,f){b.push("<tr><td ",r?"align='right' ":"","valign='top'>","<label class='sapUiSupportLabel'>",e(d),"</label></td><td",c?" class='sapUiSupportTechInfoBorder'":"",">");var g=f;if(typeof f==='function'){g=f(b);}b.push(e(g));b.push("</td></tr>");}function m(b,r,c,d,f){l(b,r,c,d,function(b){b.push("<table border='0' cellspacing='0' cellpadding='3'>");q.each(f,function(i,v){var g="";if(v){if(typeof(v)==="string"||typeof(v)==="string"||typeof(v)==="boolean"){g=v;}else if((Array.isArray(v)||q.isPlainObject(v))&&window.JSON){g=window.JSON.stringify(v);}}l(b,false,false,i,""+g);});b.push("</table>");});}return a;});
