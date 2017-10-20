sap.ui.define([
    'cs/stock/controller/BaseController',
    'sap/ui/model/json/JSONModel'

], function(BaseController, JSONModel){
    "use strict";

    return BaseController.extend('cs.stock.controller.Product.Add', {

        onInit: function() {

            var _oIvaTipo = new JSONModel({
                "iva_tipo": [
                    {"iva_tipo": "G", "nombre": "Gravado"},
                    {"iva_tipo": "E", "nombre": "Exento"}
                ]
            });
console.log(_oIvaTipo);
            this.getView().setModel(_oIvaTipo, "oIvaTipo");
            
        }

    });
});