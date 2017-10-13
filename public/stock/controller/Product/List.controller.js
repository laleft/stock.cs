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
        }
    });
});