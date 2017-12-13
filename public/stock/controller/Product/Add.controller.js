sap.ui.define([
    'cs/stock/controller/BaseController',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast'

], function (BaseController, JSONModel, MessageToast) {
    "use strict";

    return BaseController.extend('cs.stock.controller.Product.Add', {

        onInit: function () {

            this._data = new JSONModel({
                "codigo": "",
                "descripcion": "",
                "iva_tipo": "G",
                "iva_valor": 21,
                "costo": 0,
                "coeficiente_ganancia_1": 0,
                "coeficiente_ganancia_2": 0,
                'stock_actual': 0,
                'id_marca': 0,
                'marca': '',
                'id_categoria': 0,
                'categoria': ''
            });

            this.getView().setModel(this._data);

            this.getView().byId('codigo').focus();

            // var _oMarcas = new JSONModel();
            // _oMarcas.setSizeLimit(2000);
            // _oMarcas.loadData('http://nsstock.dev/api/marca');

            // this.getView().setModel(_oMarcas, "marcas");

            var _oCategorias = new JSONModel();
            _oCategorias.setSizeLimit(2000);
            _oCategorias.loadData('http://nsstock.dev/api/categoria');

            this.getView().setModel(_oCategorias, "categorias");

            var oMessageManager = sap.ui.getCore().getMessageManager();
            oMessageManager.registerObject(this.getView(), true);

        },

        searchMarcaSuggest: function (oEvent) {

            if (oEvent.getSource().getValue().length > 2) {
                var _oMarcas = new JSONModel();
                _oMarcas.setSizeLimit(2000);
                _oMarcas.loadData('http://nsstock.dev/api/marca');
                this.getView().setModel(_oMarcas, "marcas");
            }
        },

        _buscarNombreCategoria: function (id_marca) {

            var _oModel = new JSONModel();

            _oModel.attachRequestCompleted(function () {

                _oModel.loadData('http://nsstock.dev/api/categoria', { 'id_marca': id_marca });

            });

            return _oModel.getProperty('/categoria');
        },

        handleSuggest: function (oEvent) {

            var _id_marca = this.getView().byId('id_marca').getSelectedKey();

            if (_id_marca) {
                var _oModel = new JSONModel();
                _oModel.loadData('http://nsstock.dev/api/categoria', { 'id_marca': _id_marca });
                _oModel.attachRequestCompleted(function () {
                    this._data.setProperty('/id_categoria', _oModel.getProperty('/id_categoria'));
                    //this.getView().byId('id_categoria').setValue(_oModel.getProperty('/categoria'));
                }, this);
            } else {
                this._data.setProperty('/marca', this.getView().byId('id_marca').getValue());
            }

        },

        handleSavePress: function (oEvent) {

            var aInputs = [
                this.getView().byId('codigo'),
                this.getView().byId('descripcion'),
            ];

            var bAllValid = true;

            jQuery.each(aInputs, function(i, oInput){
                var oBinding = oInput.getBinding('value');
                try {
                    oBinding.getType().validateValue(oInput.getValue());
                    oInput.setValueState(sap.ui.core.ValueState.Default);
                } catch(oException) {
                    bAllValid = false;
                    oInput.setValueState(sap.ui.core.ValueState.Error);
                    MessageToast.show(oException.message);
                }
            });

            var oMarca = this.getView().byId('id_marca');

            if(oMarca.getValue() == 0) {
                bAllValid = false;
                oMarca.setValueState(sap.ui.core.ValueState.Error);
            } else {
                oMarca.setValueState(sap.ui.core.ValueState.Default);
            }
            
            if(bAllValid) {
                this._data.setProperty('/marca', this.getView().byId('id_marca').getValue());
                this._data.setProperty('/categoria', this.getView().byId('id_categoria').getValue());
    
                var _oModel = new JSONModel();
                var _parameters = this._data.getJSON();
                _oModel.loadData('http://nsstock.dev/api/articulo/create', JSON.parse(_parameters));
            }

        }

    });
});