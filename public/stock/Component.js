sap.ui.define([
	'sap/ui/core/UIComponent',
	"sap/ui/model/json/JSONModel"
	],
	function(UIComponent, JSONModel) {
	"use strict";

	var Component = UIComponent.extend("cs.stock.Component", {

		metadata : {
			manifest: "json",			
		},

		init: function() {

			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
			
		},

		getContentDensityClass : function() {
			if (!this._sContentDensityClass) {
				if (!sap.ui.Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}
	});

	return Component;

});
