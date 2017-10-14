sap.ui.define([
		'cs/stock/controller/BaseController'
	], function (BaseController) {
		"use strict";
		return BaseController.extend("cs.stock.controller.Home", {

			onInit: function () {

				//var sPath = jQuery.sap.getModulePath("sap.m.sample.TileContainer", "/data.json");
				//var oModel = new JSONModel(sPath);
				//	this.getView().setModel(oModel);

			}
		});
});