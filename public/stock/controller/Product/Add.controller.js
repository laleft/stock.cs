sap.ui.define([
    'cs/stock/controller/BaseController',
    'sap/ui/model/json/JSONModel'

], function (BaseController, JSONModel) {
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
                'stock': 0,
                'id_marca': 0,
                'marca': '',
                'id_categoria': 0,
                'categoria': ''
            });

            this.getView().setModel(this._data);

            var _oMarcas = new JSONModel();
            _oMarcas.loadData('http://nsstock.app/api/marca');

            this.getView().setModel(_oMarcas, "marcas");

            var _oCategorias = new JSONModel();
            _oCategorias.loadData('http://nsstock.app/api/categoria');

            this.getView().setModel(_oCategorias, "categorias");

        },

        _buscarNombreCategoria: function (id_marca) {

            var _oModel = new JSONModel();

            _oModel.attachRequestCompleted(function () {

                _oModel.loadData('http://nsstock.app/api/categoria', { 'id_marca': id_marca });

            });

            return _oModel.getProperty('/categoria');
        },

        handleSuggest: function (oEvent) {

            var _id_marca = this.getView().byId('id_marca').getSelectedKey();

            if (_id_marca) {
                var _oModel = new JSONModel();
                _oModel.loadData('http://nsstock.app/api/categoria', { 'id_marca': _id_marca });
                _oModel.attachRequestCompleted(function () {
                    this._data.setProperty('/id_categoria',  _oModel.getProperty('/id_categoria'));
                    //this.getView().byId('id_categoria').setValue(_oModel.getProperty('/categoria'));
                }, this);
            } else {
                this._data.setProperty('/marca', this.getView().byId('id_marca').getValue());
            }

        },

        handleSavePress: function (oEvent) {

                this._data.setProperty('/marca', this.getView().byId('id_marca').getValue());
                this._data.setProperty('/categoria', this.getView().byId('id_categoria').getValue());

            var _oModel = new JSONModel();
            var _parameters = this._data.getJSON();
            _oModel.loadData('http://nsstock.app/api/articulo/create', JSON.parse(_parameters));

        }

    });
});