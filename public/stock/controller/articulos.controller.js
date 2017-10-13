sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	], function(jQuery, Controller, JSONModel) {
	"use strict";
 
	var articulosController = Controller.extend("cs.stock.controller.articulos", {
 
		onInit : function (evt) {
			
			//var oModel = new JSONModel(this.getOwnerComponent().getModel("articulo"));
            var oModel = new JSONModel("http://nsstock.app/api/articulo/");
            console.log(oModel.loadData());

            this.getView().setModel(oModel);
            //console.log(oModel.getData());
		}
	});
 
 
	return articulosController;
 
});