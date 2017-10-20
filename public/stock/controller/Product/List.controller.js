sap.ui.define([
    'cs/stock/controller/BaseController',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast'
], function(BaseController, JSONModel, MessageToast){
    "use strict";

    return BaseController.extend("cs.stock.controller.Product.List", {
        
        onInit: function() {
            var oModel = new JSONModel();
            oModel.loadData('http://nsstock.app/api/articulo/ultimos')
            this.getView().setModel(oModel);
            
        },

        onSearch : function( oInput ) {
            var oModel = this.getView().getModel();
            var busqueda = oInput.getSource().getValue();
            if(busqueda != '')
            {
                if(busqueda.length < 3 )
                {
                    MessageToast.show('Escriba al menos tres caracteres para realizar la búsqueda');
                }
                else
                {
                    oModel.loadData('http://nsstock.app/api/articulo/buscar/' + oInput.getSource().getValue());
                }                
            }
            else
            {
                oModel.setData(null);
            }
                
            //oModel.setData(result);
            //sap.ui.getCore().byId(this.getView().sId).getModel().loadData('http://nsstock.app/api/articulo/' + oInput.getSource().getValue()).refresh(true);
        },

        onNavToAdd: function(oEvent) {
            this.getRouter().navTo("productAdd");
        },

        onExit : function () {
			if (this._oDialog) {
				this._oDialog.destroy();
			}
		},

		handleSelectDialogPress: function (oEvent) {

            console.log(oEvent);
            
            var _oDialogConfig = new JSONModel({
               title: "Seleccionar Marca" 
            });

            this.getView().setModel(_oDialogConfig, 'config');

			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("cs.stock.view.Product.SelectDialog", this);
				this._oDialog.setModel(this.getView().getModel());
			}

			// Multi-select if required
			var bMultiSelect = !!oEvent.getSource().data("multi");
			this._oDialog.setMultiSelect(bMultiSelect);

			// Remember selections if required
			var bRemember = !!oEvent.getSource().data("remember");
			this._oDialog.setRememberSelections(bRemember);

			// clear the old search filter
			this._oDialog.getBinding("items").filter([]);

			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
		},
    });
});