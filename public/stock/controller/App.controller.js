sap.ui.define([
		'cs/stock/controller/BaseController',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		'sap/m/MessageToast'
	], function (BaseController, jQuery, Fragment, Controller, JSONModel, ResponsivePopover, MessagePopover, ActionSheet, Button, Link, Bar, VerticalLayout, NotificationListItem, MessagePopoverItem,CustomData, MessageToast, History) {
		"use strict";

		return BaseController.extend("cs.stock.controller.App", {

			onInit: function() {
				//this._setToggleButtonTooltip(!sap.ui.Device.system.desktop);
				this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
				this.getOwnerComponent().getRouter().attachRouteMatched(this.onRouteMatched, this);

				var viewId = this.getView().getId();
				var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
	
				toolPage.setSideExpanded(false);
			},

			onRouteMatched: function () {
				// Initiate The Notification Counter
				var oModel = this.getView().getModel("alerts");
				var iNotificationCounter =  oModel.getProperty("/alerts/notifications").length;
				oModel.setProperty("/alerts/notificationCounter", iNotificationCounter);
			},

			onNavToProductList: function(oEvent) {
				this.getRouter().navTo("productList");
			},

			onNavToHome: function(oEvent) {
				this.getRouter().navTo('home');
			},

			/**
			 * Convenience method for accessing the router.
			 * @public
			 * @returns {sap.ui.core.routing.Router} the router for this component
			 */
			onItemSelect: function(oEvent) {
				var oItem = oEvent.getParameter('item');
				var sKey = oItem.getKey();
				// if(sKey !== "home" && sKey !=="systemSettings" && sKey!== "statistics") {
				// 	MessageToast.show(sKey);
				// }
				// else {
				// 	this.getRouter().navTo(sKey);
				// }
                this.getRouter().navTo(sKey);
			},

			onSideNavButtonPress : function() {
				var viewId = this.getView().getId();
				var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
				var sideExpanded = toolPage.getSideExpanded();
	
				toolPage.setSideExpanded(!toolPage.getSideExpanded());
			},

		});
});
