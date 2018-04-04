/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Button','./Dialog','./Text','./FormattedText','./Link','./VBox','sap/ui/core/IconPool'],function(q,B,D,T,F,L,V,I){"use strict";var M={};M.Action={OK:"OK",CANCEL:"CANCEL",YES:"YES",NO:"NO",ABORT:"ABORT",RETRY:"RETRY",IGNORE:"IGNORE",CLOSE:"CLOSE",DELETE:"DELETE"};M.Icon={NONE:undefined,INFORMATION:"INFORMATION",WARNING:"WARNING",ERROR:"ERROR",SUCCESS:"SUCCESS",QUESTION:"QUESTION"};(function(){var A=M.Action,a=M.Icon,c={"INFORMATION":"sapMMessageBoxInfo","WARNING":"sapMMessageBoxWarning","ERROR":"sapMMessageBoxError","SUCCESS":"sapMMessageBoxSuccess","QUESTION":"sapMMessageBoxQuestion","STANDARD":"sapMMessageBoxStandard"},m={"INFORMATION":I.getIconURI("message-information"),"WARNING":I.getIconURI("message-warning"),"ERROR":I.getIconURI("message-error"),"SUCCESS":I.getIconURI("message-success"),"QUESTION":I.getIconURI("question-mark")};var _=function(){if(M._rb!==sap.ui.getCore().getLibraryResourceBundle("sap.m")){M._rb=sap.ui.getCore().getLibraryResourceBundle("sap.m");}};M.show=function(v,o){var d,b,e,r=null,t=this,f=[],i,s,g,h,C,j,k,l={id:sap.ui.core.ElementMetadata.uid("mbox"),initialFocus:null,textDirection:sap.ui.core.TextDirection.Inherit,verticalScrolling:true,horizontalScrolling:true,details:"",contentWidth:null};_();if(typeof o==="string"||arguments.length>2){s=arguments[1];g=arguments[2];h=arguments[3];C=arguments[4];j=arguments[5];k=arguments[6];o={icon:s,title:g,actions:h,onClose:C,id:j,styleClass:k};}if(o&&o.hasOwnProperty("details")){l.icon=sap.m.MessageBox.Icon.INFORMATION;l.actions=[A.OK,A.CANCEL];o=q.extend({},l,o);}o=q.extend({},l,o);if(typeof o.actions!=="undefined"&&!q.isArray(o.actions)){o.actions=[o.actions];}if(!o.actions||o.actions.length===0){o.actions=[A.OK];}function n(y){var z;if(M.Action.hasOwnProperty(y)){z=t._rb.getText("MSGBOX_"+y);}var E=new B({id:sap.ui.core.ElementMetadata.uid("mbox-btn-"),text:z||y,press:function(){r=y;d.close();}});return E;}for(i=0;i<o.actions.length;i++){f.push(n(o.actions[i]));}function p(o,b){if(typeof o.details=='object'){o.details="<pre>"+JSON.stringify(o.details,null,'\t').replace(/{/gi,"\\{")+"</pre>";}var y=new F({htmlText:o.details}).setVisible(false);var S=new L({text:t._rb.getText("MSGBOX_LINK_TITLE"),press:function(){y.setVisible(true);this.setVisible(false);d._setInitialFocus();}});S.addStyleClass("sapMMessageBoxLinkText");y.addStyleClass("sapMMessageBoxDetails");return new V({items:[b,S,y]});}function u(){if(typeof o.onClose==="function"){o.onClose(r);}d.detachAfterClose(u);d.destroy();}function w(){var i=0;var y=null;if(o.initialFocus){if(o.initialFocus instanceof sap.ui.core.Control){y=o.initialFocus;}if(typeof o.initialFocus==="string"){for(i=0;i<f.length;i++){if(M.Action.hasOwnProperty(o.initialFocus)){if(t._rb.getText("MSGBOX_"+o.initialFocus).toLowerCase()===f[i].getText().toLowerCase()){y=f[i];break;}}else{if(o.initialFocus.toLowerCase()===f[i].getText().toLowerCase()){y=f[i];break;}}}}}return y;}if(typeof(v)==="string"){e=new T({textDirection:o.textDirection}).setText(v).addStyleClass("sapMMsgBoxText");b=e;}else if(v instanceof sap.ui.core.Control){e=v.addStyleClass("sapMMsgBoxText");}if(o&&o.hasOwnProperty("details")&&o.details!==""){e=p(o,e);}function x(){if(sap.ui.getCore().getConfiguration().getAccessibility()){d.$().attr("role","alertdialog");}}d=new D({id:o.id,type:sap.m.DialogType.Message,title:o.title,content:e,icon:m[o.icon],initialFocus:w(),verticalScrolling:o.verticalScrolling,horizontalScrolling:o.horizontalScrolling,afterOpen:x,afterClose:u,buttons:f,ariaLabelledBy:b?b.getId():undefined,contentWidth:o.contentWidth});if(c[o.icon]){d.addStyleClass(c[o.icon]);}else{d.addStyleClass(c.STANDARD);}if(o.styleClass){d.addStyleClass(o.styleClass);}d.open();};M.alert=function(v,o){_();var d={icon:a.NONE,title:this._rb.getText("MSGBOX_TITLE_ALERT"),actions:A.OK,id:sap.ui.core.ElementMetadata.uid("alert"),initialFocus:null},C,t,s,S;if(typeof o==="function"||arguments.length>2){C=arguments[1];t=arguments[2];s=arguments[3];S=arguments[4];o={onClose:C,title:t,id:s,styleClass:S};}o=q.extend({},d,o);return M.show(v,o);};M.confirm=function(v,o){_();var d={icon:a.QUESTION,title:this._rb.getText("MSGBOX_TITLE_CONFIRM"),actions:[A.OK,A.CANCEL],id:sap.ui.core.ElementMetadata.uid("confirm"),initialFocus:null},C,t,s,S;if(typeof o==="function"||arguments.length>2){C=arguments[1];t=arguments[2];s=arguments[3];S=arguments[4];o={onClose:C,title:t,id:s,styleClass:S};}o=q.extend({},d,o);return M.show(v,o);};M.error=function(v,o){_();var d={icon:a.ERROR,title:this._rb.getText("MSGBOX_TITLE_ERROR"),actions:[A.CLOSE],id:sap.ui.core.ElementMetadata.uid("error"),initialFocus:null};o=q.extend({},d,o);return M.show(v,o);};M.information=function(v,o){_();var d={icon:a.INFORMATION,title:this._rb.getText("MSGBOX_TITLE_INFO"),actions:[A.OK],id:sap.ui.core.ElementMetadata.uid("info"),initialFocus:null};o=q.extend({},d,o);return M.show(v,o);};M.warning=function(v,o){_();var d={icon:a.WARNING,title:this._rb.getText("MSGBOX_TITLE_WARNING"),actions:[A.OK],id:sap.ui.core.ElementMetadata.uid("warning"),initialFocus:null};o=q.extend({},d,o);return M.show(v,o);};M.success=function(v,o){_();var d={icon:a.SUCCESS,title:this._rb.getText("MSGBOX_TITLE_SUCCESS"),actions:[A.OK],id:sap.ui.core.ElementMetadata.uid("success"),initialFocus:null};o=q.extend({},d,o);return M.show(v,o);};}());return M;},true);