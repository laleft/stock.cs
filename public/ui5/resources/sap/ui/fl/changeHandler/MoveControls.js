/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./Base","sap/ui/fl/Utils"],function(q,B,F){"use strict";var M={};M.CHANGE_TYPE="moveControls";M.SOURCE_ALIAS="source";M.TARGET_ALIAS="target";M.MOVED_ELEMENTS_ALIAS="movedElements";M._checkConditions=function(c,m,v,a){if(!c){throw new Error("No change instance");}var C=c.getContent();if(!C||!C.movedElements||C.movedElements.length===0){throw new Error("Change format invalid");}if(!C.source||!C.source.selector){throw new Error("No source supplied for move");}if(!C.target||!C.target.selector){throw new Error("No target supplied for move");}if(!m.bySelector(C.source.selector,a,v)){throw new Error("Move source parent not found");}if(!m.bySelector(C.target.selector,a,v)){throw new Error("Move target parent not found");}if(!C.source.selector.aggregation){throw new Error("No source aggregation supplied for move");}if(!C.target.selector.aggregation){throw new Error("No target aggregation supplied for move");}};M._getElementControlOrThrowError=function(m,o,a,v){if(!m.selector&&!m.id){throw new Error("Change format invalid - moveElements element has no id attribute");}if(typeof m.targetIndex!=="number"){throw new Error("Missing targetIndex for element with id '"+m.selector.id+"' in movedElements supplied");}return o.bySelector(m.selector||m.id,a,v);};M._checkCompleteChangeContentConditions=function(s){if(!s.movedElements){throw new Error("mSpecificChangeInfo.movedElements attribute required");}if(s.movedElements.length===0){throw new Error("MovedElements array is empty");}s.movedElements.forEach(function(e){if(!e.id){throw new Error("MovedControls element has no id attribute");}if(typeof(e.sourceIndex)!=="number"){throw new Error("SourceIndex attribute at MovedElements element is no number");}if(typeof(e.targetIndex)!=="number"){throw new Error("TargetIndex attribute at MovedElements element is no number");}});};M._getSpecificChangeInfo=function(m,s,a){delete s.source.publicAggregation;delete s.target.publicAggregation;var S=s.source.parent||m.bySelector(s.source.id,a);var t=s.target.parent||m.bySelector(s.target.id,a);var b=s.source.aggregation;var T=s.target.aggregation;var A={aggregation:s.source.aggregation,type:m.getControlType(S)};var c={aggregation:s.target.aggregation,type:m.getControlType(t)};var d={source:{id:S.getId(),aggregation:b,type:A.type,selector:m.getSelector(s.source.id,a,A)},target:{id:t.getId(),aggregation:T,type:c.type,selector:m.getSelector(s.target.id,a,c)},movedElements:s.movedElements};return d;};M.applyChange=function(c,r,p){var m=p.modifier;var v=p.view;var a=p.appComponent;this._checkConditions(c,m,v,a);var C=c.getContent();var s=m.bySelector(C.source.selector,a,v);var t=m.bySelector(C.target.selector,a,v);var S=C.source.selector.aggregation;var T=C.target.selector.aggregation;C.movedElements.forEach(function(b){var o=this._getElementControlOrThrowError(b,m,a,v);if(!o){F.log.warning("Element to move not found");return;}var i;var A=m.getAllAggregations(s);Object.keys(A).some(function(k){var d=m.getAggregation(s,k);if(Array.isArray(d)){i=d.indexOf(o);if(i>-1){S=k;return true;}}});m.removeAggregation(s,S,o,v);m.insertAggregation(t,T,o,b.targetIndex,v);},this);return true;};M.completeChangeContent=function(c,s,p){this._checkCompleteChangeContentConditions(s);var m=p.modifier;var a=p.appComponent;var C=c.getDefinition();s=this._getSpecificChangeInfo(m,s,a);C.changeType=M.CHANGE_TYPE;C.content={movedElements:[],source:{selector:s.source.selector},target:{selector:s.target.selector}};s.movedElements.forEach(function(e){var E=e.element||m.bySelector(e.id,a);C.content.movedElements.push({selector:m.getSelector(E,a),sourceIndex:e.sourceIndex,targetIndex:e.targetIndex});});c.addDependentControl(s.source.id,M.SOURCE_ALIAS,p);c.addDependentControl(s.target.id,M.TARGET_ALIAS,p);c.addDependentControl(s.movedElements.map(function(e){return e.id;}),M.MOVED_ELEMENTS_ALIAS,p);};return M;},true);
