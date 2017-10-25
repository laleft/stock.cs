sap.ui.define([
    'cs/stock/controller/BaseController',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast',
    'sap/ui/model/Filter'
], function (BaseController, JSONModel, MessageToast, Filter) {
    "use strict";

    return BaseController.extend("cs.stock.controller.Product.List", {

        onInit: function () {
            var oModel = new JSONModel();
            //oModel.loadData('http://nsstock.app/api/articulo/ultimos')
            //this.getView().setModel(oModel);

        },

        _filtrarArticulos: function (oParametros) {

            //this.getView().setBusy(true);
            //this.getView().setBusy(false);
            var oModel = new JSONModel();

            oModel.loadData('http://nsstock.app/api/articulo/filtrar/', oParametros);

            this.getView().setModel(oModel);

        },

        onSearch: function (oInput) {
            var oModel = this.getView().getModel();
            var busqueda = oInput.getSource().getValue();
            if (busqueda != '') {
                if (busqueda.length < 3) {
                    MessageToast.show('Escriba al menos tres caracteres para realizar la búsqueda');
                }
                else {
                    oModel.loadData('http://nsstock.app/api/articulo/buscar/' + oInput.getSource().getValue());
                }
            }
            else {
                oModel.setData(null);
            }

            //oModel.setData(result);
            //sap.ui.getCore().byId(this.getView().sId).getModel().loadData('http://nsstock.app/api/articulo/' + oInput.getSource().getValue()).refresh(true);
        },

        onNavToAdd: function (oEvent) {
            this.getRouter().navTo("productAdd");
        },

        onExit: function () {
            if (this._oDialog) {
                this._oDialog.destroy();
            }
        },

        handleSelectDialogPress: function (oEvent) {

            var _oDialogConfig = new JSONModel({
                title: "Seleccionar una Categoría"
            });

            var oModel = new JSONModel();
            oModel.loadData('http://nsstock.app/api/categoria');

            if (!this._oDialog) {
                this._oDialog = sap.ui.xmlfragment("cs.stock.view.Product.SelectDialog", this);

                // var oCategoriaList = new  sap.m.StandardListItem();
                // oCategoriaList.setTitle("Seleccione una categoria");
                // oCategoriaList.

                this._oDialog.setModel(_oDialogConfig, 'config');
                this._oDialog.setModel(oModel, 'data');
            }

            // // Multi-select if required
            // var bMultiSelect = !!oEvent.getSource().data("multi");
            // this._oDialog.setMultiSelect(bMultiSelect);

            // // Remember selections if required
            // var bRemember = !!oEvent.getSource().data("remember");
            // this._oDialog.setRememberSelections(bRemember);

            // // clear the old search filter
            this._oDialog.getBinding("items").filter([]);

            // toggle compact style
            jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
            this._oDialog.open();
        },

        handleSelectMarcaDialogPress: function (oEvent) {

            var _oDialogConfig = new JSONModel({
                title: "Seleccionar una Marca"
            });

            var oModel = new JSONModel();
            oModel.loadData('http://nsstock.app/api/marca');

            if (!this._oMarcaDialog) {
                this._oMarcaDialog = sap.ui.xmlfragment("cs.stock.view.Product.SelectDialog", this);
                this._oMarcaDialog.setModel(_oDialogConfig, 'config');
                this._oMarcaDialog.setModel(oModel, 'data');
            }

            // // Multi-select if required
            // var bMultiSelect = !!oEvent.getSource().data("multi");
            // this._oDialog.setMultiSelect(bMultiSelect);

            // // Remember selections if required
            // var bRemember = !!oEvent.getSource().data("remember");
            // this._oDialog.setRememberSelections(bRemember);

            // // clear the old search filter
            this._oMarcaDialog.getBinding("items").filter([]);

            // toggle compact style
            jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oMarcaDialog);
            this._oMarcaDialog.open();
        },

        handleSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("categoria", sap.ui.model.FilterOperator.Contains, sValue);
            var oBinding = oEvent.getSource().getBinding("items");
            oBinding.filter([oFilter]);
        },

        handleClose: function (oEvent) {
            var aContexts = oEvent.getParameter("selectedContexts");
            var _sCategoria = aContexts.map(function (oContext) { return oContext.getObject().categoria });
            var _sIdCategoira = aContexts.map(function (oContext) { return oContext.getObject().id_categoria.toString() });

            if (aContexts.length) {
                this.getView().byId('inputCategoria').setValue(_sCategoria);
                this._filtrarArticulos({ "id_categoria": _sIdCategoira });
                this.getView().byId('inputMarca').setEditable(true);
            }
            oEvent.getSource().getBinding("items").filter([]);



        }
    });
});