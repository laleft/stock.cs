/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/model/ChangeReason','sap/ui/model/ClientListBinding'],function(q,C,a){"use strict";var J=a.extend("sap.ui.model.json.JSONListBinding");J.prototype.getContexts=function(s,l){this.iLastStartIndex=s;this.iLastLength=l;if(!s){s=0;}if(!l){l=Math.min(this.iLength,this.oModel.iSizeLimit);}var c=this._getContexts(s,l),b=[];if(this.bUseExtendedChangeDetection){try{for(var i=0;i<c.length;i++){b.push(this.getContextData(c[i]));}if(this.aLastContextData&&s<this.iLastEndIndex){c.diff=q.sap.arraySymbolDiff(this.aLastContextData,b);}this.iLastEndIndex=s+l;this.aLastContexts=c.slice(0);this.aLastContextData=b.slice(0);}catch(e){this.bUseExtendedChangeDetection=false;q.sap.log.warning("JSONListBinding: Extended change detection has been disabled as JSON data could not be serialized.");}}return c;};J.prototype.getCurrentContexts=function(){if(this.bUseExtendedChangeDetection){return this.aLastContexts||[];}else{return this.getContexts(this.iLastStartIndex,this.iLastLength);}};J.prototype.updateIndices=function(){var i;this.aIndices=[];if(Array.isArray(this.oList)){for(i=0;i<this.oList.length;i++){this.aIndices.push(i);}}else{for(i in this.oList){this.aIndices.push(i);}}};J.prototype.update=function(){var l=this.oModel._getObject(this.sPath,this.oContext);if(l){if(Array.isArray(l)){if(this.bUseExtendedChangeDetection){this.oList=q.extend(true,[],l);}else{this.oList=l.slice(0);}}else{this.oList=q.extend(this.bUseExtendedChangeDetection,{},l);}this.updateIndices();this.applyFilter();this.applySort();this.iLength=this._getLength();}else{this.oList=[];this.aIndices=[];this.iLength=0;}};J.prototype.checkUpdate=function(f){if(this.bSuspended&&!this.bIgnoreSuspend&&!f){return;}if(!this.bUseExtendedChangeDetection){var l=this.oModel._getObject(this.sPath,this.oContext);if(!q.sap.equal(this.oList,l)||f){this.update();this._fireChange({reason:C.Change});}}else{var c=false;var t=this;var l=this.oModel._getObject(this.sPath,this.oContext);if(l&&this.oList.length!=l.length){c=true;}if(!q.sap.equal(this.oList,l)){this.update();}var b=this._getContexts(this.iLastStartIndex,this.iLastLength);if(this.aLastContexts){if(this.aLastContexts.length!=b.length){c=true;}else{q.each(this.aLastContextData,function(i,L){var o=t.getContextData(b[i]);if(o!==L){c=true;return false;}});}}else{c=true;}if(c||f){this._fireChange({reason:C.Change});}}};return J;});
