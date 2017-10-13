/*
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/Device","sap/ui/core/util/MockServer"],function(q,D,M){"use strict";return{_oDraftMetadata:{},_oConstants:{COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT:"com.sap.vocabularies.Common.v1.DraftRoot",COM_SAP_VOCABULARIES_COMMON_V1_DRAFTNODE:"com.sap.vocabularies.Common.v1.DraftNode",COM_SAP_VOCABULARIES_COMMON_V1_SEMANTICKEY:"com.sap.vocabularies.Common.v1.SemanticKey",EMPTY_GUID:"00000000-0000-0000-0000-000000000000",SIBLINGENTITY_NAVIGATION:"SiblingEntity",DRAFT_ADMINISTRATIVE_DATA:"DraftAdministrativeData",DRAFT_ADMINISTRATIVE_DATA_UUID:"DraftAdministrativeDataUUID",ACTIVATION_ACTION:"ActivationAction",EDIT_ACTION:"EditAction",VALIDATE_ACTION:"ValidationFunction",PREPARE_ACTION:"PreparationAction"},handleDraft:function(a,m){var n=function(b){var N=b.getParameter("oEntity");N.IsActiveEntity=false;N.HasActiveEntity=false;N.HasDraftEntity=false;};var d=function(b){var x=b.getParameter("oXhr");var c=q.sap.sjax({url:x.url,dataType:"json"}).data.d;for(var i=0;i<this._oDraftMetadata.draftNodes.length;i++){for(var f in this._mEntitySets[this._oDraftMetadata.draftRootName].navprops){if(this._mEntitySets[this._oDraftMetadata.draftRootName].navprops[f].to.entitySet===this._oDraftMetadata.draftNodes[i]){var r=q.sap.sjax({url:c[f].__deferred.uri,dataType:"json"});if(r.data&&r.data.d&&r.data.d.results){var N;for(var j=0;j<r.data.d.results.length;j++){N=r.data.d.results[j];q.sap.sjax({url:N.__metadata.uri,type:"DELETE"});}}}}}};if(a&&a.EntityContainer){var e=a.EntityContainer[Object.keys(a.EntityContainer)[0]];for(var E in e){var o=e[E];if(o[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT]){this._oDraftMetadata.draftRootName=E;this._oDraftMetadata.annotations=a;this._oDraftMetadata.mockServerRootUri=m.getRootUri();this._oDraftMetadata.draftRootActivationName=o[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT][this._oConstants.ACTIVATION_ACTION].String;if(this._oDraftMetadata.draftRootActivationName){this._oDraftMetadata.draftRootActivationName=this._oDraftMetadata.draftRootActivationName.substring(this._oDraftMetadata.draftRootActivationName.lastIndexOf("/")+1);}this._oDraftMetadata.draftRootEditName=o[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT][this._oConstants.EDIT_ACTION];this._oDraftMetadata.draftRootEditName=this._oDraftMetadata.draftRootEditName?this._oDraftMetadata.draftRootEditName.String:undefined;if(this._oDraftMetadata.draftRootEditName){this._oDraftMetadata.draftRootEditName=this._oDraftMetadata.draftRootEditName.substring(this._oDraftMetadata.draftRootEditName.lastIndexOf("/")+1);}this._oDraftMetadata.draftRootValidationName=o[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT][this._oConstants.VALIDATE_ACTION];this._oDraftMetadata.draftRootValidationName=this._oDraftMetadata.draftRootValidationName?this._oDraftMetadata.draftRootValidationName.String:undefined;if(this._oDraftMetadata.draftRootValidationName){this._oDraftMetadata.draftRootValidationName=this._oDraftMetadata.draftRootValidationName.substring(this._oDraftMetadata.draftRootValidationName.lastIndexOf("/")+1);}this._oDraftMetadata.draftRootPreparationtionName=o[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT][this._oConstants.PREPARE_ACTION];this._oDraftMetadata.draftRootPreparationtionName=this._oDraftMetadata.draftRootPreparationtionName?this._oDraftMetadata.draftRootPreparationtionName.String:undefined;if(this._oDraftMetadata.draftRootPreparationtionName){this._oDraftMetadata.draftRootPreparationtionName=this._oDraftMetadata.draftRootPreparationtionName.substring(this._oDraftMetadata.draftRootPreparationtionName.lastIndexOf("/")+1);}q.extend(m,this);m.attachAfter(M.HTTPMETHOD.POST,n,this._oDraftMetadata.draftRootName);m.attachBefore(M.HTTPMETHOD.DELETE,d,this._oDraftMetadata.draftRootName);m.attachAfter(M.HTTPMETHOD.GET,this._fnDraftAdministrativeData,this._oDraftMetadata.draftRootName);}}}},_calcSemanticKeys:function(e,E){var s=[];for(var a in this._oDraftMetadata.annotations){if(a.lastIndexOf(E[e].type)>-1){s=this._oDraftMetadata.annotations[a][this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_SEMANTICKEY]||[];break;}}var S=[];var b;for(var i=0;i<s.length;i++){b=s[i];for(var k in b){S.push(b[k]);}}return S;},_prepareDraftMetadata:function(e){var t=this;this._oDraftMetadata.draftNodes=[];this._oDraftMetadata.draftRootKey=q.grep(e[this._oDraftMetadata.draftRootName].keys,function(x){return q.inArray(x,t._calcSemanticKeys(t._oDraftMetadata.draftRootName,e))<0;})[0];var a=t._oDraftMetadata.annotations;var E=a.EntityContainer[Object.keys(a.EntityContainer)[0]];for(var s in E){var o=E[s];if(o[t._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTNODE]){this._oDraftMetadata.draftNodes.push(s);}}for(var j=0;j<this._oDraftMetadata.draftNodes.length;j++){this.attachAfter(M.HTTPMETHOD.GET,this._fnDraftAdministrativeData,this._oDraftMetadata.draftNodes[j]);}},_fnDraftAdministrativeData:function(e){var E={};var d=e.getParameter("oFilteredData");if(!d){E=e.getParameter("oEntry");if(E.IsActiveEntity&&!E.HasDraftEntity){E[this._oConstants.DRAFT_ADMINISTRATIVE_DATA]=null;}}else{if(d.results){d=d.results;}else{if(q.isEmptyObject(d)){d=null;return;}}for(var i=0;i<d.length;i++){E=d[i];if(E.IsActiveEntity&&!E.HasDraftEntity){E[this._oConstants.DRAFT_ADMINISTRATIVE_DATA]=null;}}}},_handleDraftArtifacts:function(e){var t=this;var m=this._oMockdata;var d=m[this._oDraftMetadata.draftRootName];var g=function(c,C){return q.grep(c,function(x){return q.inArray(x,C)<0;})[0];};if(d.length===100){for(var i=0;i<d.length;i++){var E=d[i];if(i<25){E.IsActiveEntity=true;E.HasActiveEntity=false;E.HasDraftEntity=false;E[this._oDraftMetadata.draftRootKey]=this._oConstants.EMPTY_GUID;if(E[this._oConstants.DRAFT_ADMINISTRATIVE_DATA_UUID]){E[this._oConstants.DRAFT_ADMINISTRATIVE_DATA_UUID]=null;}var a=[];var s=[];for(var j=0;j<this._oDraftMetadata.draftNodes.length;j++){s=this._calcSemanticKeys(this._oDraftMetadata.draftNodes[j],e);a=m[this._oDraftMetadata.draftNodes[j]];var o=e[this._oDraftMetadata.draftRootName];for(var n in o.navprops){var N=o.navprops[n];if(N.to.entitySet===this._oDraftMetadata.draftNodes[j]){var p=N.from.propRef.length;for(var k=0;k<p;k++){a[i][N.to.propRef[k]]=E[N.from.propRef[k]];}}}a[i].IsActiveEntity=true;a[i].HasActiveEntity=false;a[i].HasDraftEntity=false;a[i][this._oDraftMetadata.draftRootKey]=this._oConstants.EMPTY_GUID;if(a[i][this._oConstants.DRAFT_ADMINISTRATIVE_DATA_UUID]){a[i][this._oConstants.DRAFT_ADMINISTRATIVE_DATA_UUID]=null;}var b=g(e[this._oDraftMetadata.draftNodes[j]].keys,s);a[i][b]=this._oConstants.EMPTY_GUID;}}else if(i<50){E.IsActiveEntity=false;E.HasActiveEntity=false;E.HasDraftEntity=false;a=[];s=[];for(var j=0;j<this._oDraftMetadata.draftNodes.length;j++){s=this._calcSemanticKeys(this._oDraftMetadata.draftNodes[j],e);a=m[this._oDraftMetadata.draftNodes[j]];var o=e[this._oDraftMetadata.draftRootName];for(var n in o.navprops){var N=o.navprops[n];if(N.to.entitySet===this._oDraftMetadata.draftNodes[j]){var p=N.from.propRef.length;for(var k=0;k<p;k++){a[i][N.to.propRef[k]]=E[N.from.propRef[k]];}}}a[i].IsActiveEntity=false;a[i].HasActiveEntity=false;a[i].HasDraftEntity=false;b=g(e[this._oDraftMetadata.draftNodes[j]].keys,s);}}else if(i<75){var S=q.extend(true,{},E);E.IsActiveEntity=true;E.HasActiveEntity=false;E.HasDraftEntity=true;E[this._oDraftMetadata.draftRootKey]=this._oConstants.EMPTY_GUID;a=[];s=[];for(var j=0;j<this._oDraftMetadata.draftNodes.length;j++){s=this._calcSemanticKeys(this._oDraftMetadata.draftNodes[j],e);a=m[this._oDraftMetadata.draftNodes[j]];var o=e[this._oDraftMetadata.draftRootName];for(var n in o.navprops){var N=o.navprops[n];if(N.to.entitySet===this._oDraftMetadata.draftNodes[j]){var p=N.from.propRef.length;for(var k=0;k<p;k++){a[i][N.to.propRef[k]]=E[N.from.propRef[k]];}}}a[i].IsActiveEntity=true;a[i].HasActiveEntity=false;a[i].HasDraftEntity=true;b=g(e[this._oDraftMetadata.draftNodes[j]].keys,s);a[i][b]=this._oConstants.EMPTY_GUID;}S.IsActiveEntity=false;S.HasActiveEntity=true;S.HasDraftEntity=false;d[i+25]=S;}}}var r=this._getRootUri();q.each(e,function(c,o){q.each(m[c],function(I,f){f.__metadata=f.__metadata||{};f.__metadata.uri=r+c+"("+t._createKeysString(o,f)+")";f.__metadata.type=o.schema+"."+o.type;q.each(o.navprops,function(K){f[K]={__deferred:{uri:r+c+"("+t._createKeysString(o,f)+")/"+K}};});});});},_activate:function(e){var r;var g=function(c,C){return q.grep(c,function(x){return q.inArray(x,C)<0;})[0];};for(var i=0;i<this._oDraftMetadata.draftNodes.length;i++){for(var n in this._mEntitySets[this._oDraftMetadata.draftRootName].navprops){if(this._mEntitySets[this._oDraftMetadata.draftRootName].navprops[n].to.entitySet===this._oDraftMetadata.draftNodes[i]){r=q.sap.sjax({url:e[n].__deferred.uri,dataType:"json"});if(r.success&&r.data&&r.data.d&&r.data.d.results){var N;for(var j=0;j<r.data.d.results.length;j++){N=r.data.d.results[j];N.IsActiveEntity=true;N.HasActiveEntity=false;N.HasDraftEntity=false;N[this._oDraftMetadata.draftRootKey]=this._oConstants.EMPTY_GUID;var s=this._calcSemanticKeys(this._oDraftMetadata.draftNodes[i],this._mEntitySets);var d=g(this._mEntitySets[this._oDraftMetadata.draftNodes[i]].keys,s);N[d]=this._oConstants.EMPTY_GUID;q.sap.sjax({url:N.__metadata.uri,type:"PATCH",data:JSON.stringify(N)});}}}}}e.IsActiveEntity=true;e.HasActiveEntity=false;e.HasDraftEntity=false;e[this._oDraftMetadata.draftRootKey]=this._oConstants.EMPTY_GUID;q.sap.sjax({url:e.__metadata.uri,type:"PATCH",data:JSON.stringify(e)});return e;},setRequests:function(r){var t=this;r.push({method:"POST",path:new RegExp(t._oDraftMetadata.draftRootActivationName),response:function(x){var R=JSON.parse(x.requestBody);var f=[];for(var p in R){f.push(p+" eq "+R[p]);}var o=q.sap.sjax({url:t._oDraftMetadata.mockServerRootUri+t._oDraftMetadata.draftRootName+"?$filter="+f.join(" and "),dataType:"json"});if(!o.success||!o.data.d.results[0]){x.respond(404);}var e=o.data.d.results[0];if(e.IsActiveEntity){x.respond(400);}if(e.HasActiveEntity){var s=e.SiblingEntity.__deferred.uri;o=q.sap.sjax({url:s,dataType:"json"});if(o.success&&o.data&&o.data.d.__metadata){var S=o.data.d;o=q.sap.sjax({url:S.__metadata.uri,type:"DELETE"});}}e=t._activate(e);x.respondJSON(200,{},JSON.stringify({d:e}));return true;}});if(t._oDraftMetadata.draftRootEditName){r.push({method:"POST",path:new RegExp(t._oDraftMetadata.draftRootEditName+"(\\?(.*))?"),response:function(x,u){var f=[];var R=JSON.parse(x.requestBody);if(R&&!q.isEmptyObject(R)){for(var p in R){f.push(p+" eq "+R[p]);}}else{var U=decodeURIComponent(u).replace("?","&").split("&");for(var a in U){var P=U[a];var b=new RegExp("(.*)=(.*)");var c;if(P){c=b.exec(P);f.push(c[1]+" eq "+c[2]);}}}var o=q.sap.sjax({url:t._oDraftMetadata.mockServerRootUri+t._oDraftMetadata.draftRootName+"?$filter="+f.join(" and "),dataType:"json"});if(!o.success||!o.data.d.results[0]){x.respond(404);}var e=o.data.d.results[0];if(!e.IsActiveEntity||e.HasDraftEntity){x.respond(400);}var d=q.extend(true,{},e);d.IsActiveEntity=false;d.HasActiveEntity=true;d.HasDraftEntity=false;d[t._oDraftMetadata.draftRootKey]=t._generatePropertyValue(t._oDraftMetadata.draftRootKey,"Guid");var s=t._getRootUri();var E=t._mEntitySets[t._oDraftMetadata.draftRootName];d.__metadata=d.__metadata||{};d.__metadata.uri=s+t._oDraftMetadata.draftRootName+"("+t._createKeysString(E,d)+")";d.__metadata.type=E.schema+"."+E.type;q.each(E.navprops,function(k){d[k]={__deferred:{uri:s+t._oDraftMetadata.draftRootName+"("+t._createKeysString(E,d)+")/"+k}};});t._oMockdata[t._oDraftMetadata.draftRootName].push(d);o=q.sap.sjax({url:e.__metadata.uri,type:"PATCH",data:JSON.stringify({HasDraftEntity:true})});x.respondJSON(200,{},JSON.stringify({d:d}));return true;}});}if(t._oDraftMetadata.draftRootValidationName){r.push({method:"GET",path:new RegExp(t._oDraftMetadata.draftRootValidationName+"(\\?(.*))?"),response:function(x,u){var v=t._oDraftMetadata.draftRootValidationName;t.fireEvent(M.HTTPMETHOD.GET+v+":before",{oXhr:x,sUrlParams:u});t.fireEvent(M.HTTPMETHOD.GET+":before",{oXhr:x,sUrlParams:u});var R={d:{}};R.d[v]={"__metadata":{"type":"ValidationResult"},"IsValid":true};t.fireEvent(M.HTTPMETHOD.GET+v+":after",{oXhr:x,oResult:R});t.fireEvent(M.HTTPMETHOD.GET+":after",{oXhr:x,oResult:R});x.respondJSON(200,{},JSON.stringify(R));return true;}});}if(t._oDraftMetadata.draftRootPreparationtionName){r.push({method:"POST",path:new RegExp(t._oDraftMetadata.draftRootPreparationtionName),response:function(x){t.fireEvent(M.HTTPMETHOD.POST+t._oDraftMetadata.draftRootPreparationtionName+":before",{oXhr:x});t.fireEvent(M.HTTPMETHOD.POST+":before",{oXhr:x});var R=JSON.parse(x.requestBody);var f=[];for(var p in R){f.push(p+" eq "+R[p]);}var o=q.sap.sjax({url:t._oDraftMetadata.mockServerRootUri+t._oDraftMetadata.draftRootName+"?$filter="+f.join(" and "),dataType:"json"});if(!o.success||!o.data.d.results[0]){x.respond(404);}var e=o.data.d.results[0];t.fireEvent(M.HTTPMETHOD.POST+t._oDraftMetadata.draftRootPreparationtionName+":after",{oXhr:x,oEntry:e});t.fireEvent(M.HTTPMETHOD.POST+":after",{oXhr:x,oEntry:e});x.respondJSON(200,{},JSON.stringify({d:e}));return true;}});}M.prototype.setRequests.apply(this,[r]);},_generateMockdata:function(e,b){M.prototype._generateMockdata.apply(this,[e,b]);this._handleDraftArtifacts(e);},_loadMockdata:function(e,b){M.prototype._loadMockdata.apply(this,[e,b]);this._handleDraftArtifacts(e);},_resolveNavigation:function(e,f,n,E){var a=M.prototype._resolveNavigation.apply(this,[e,f,n,E]);if(n===this._oConstants.SIBLINGENTITY_NAVIGATION){if(E&&E.IsActiveEntity){a.splice(0,1);}else{a.length>1?a.splice(1,1):a.splice(0,1);}}else if(n===this._oConstants.DRAFT_ADMINISTRATIVE_DATA){if(E){if(E.IsActiveEntity&&!E.HasDraftEntity){a[0]=null;}}else{a[0]=null;}}return a;},_findEntitySets:function(m){var e=M.prototype._findEntitySets.apply(this,[m]);this._prepareDraftMetadata(e);return e;},getEntitySetData:function(e){var E=M.prototype.getEntitySetData.apply(this,[e]);var g=function(){return E;};if(e===this._oDraftMetadata.draftRootName){this._fnDraftAdministrativeData({getParameter:g});return E;}for(var j=0;j<this._oDraftMetadata.draftNodes.length;j++){if(e===this._oDraftMetadata.draftNodes[j]){this._fnDraftAdministrativeData({getParameter:g});return E;}}return E;}};},true);
