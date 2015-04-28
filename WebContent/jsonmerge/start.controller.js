sap.ui.controller("jsonmerge.start", {

    // base Northwind URL - note the "V2"!
    sUrl : "http://services.odata.org/V2/Northwind/Northwind.svc/Employees",

    // JSON Models
    oJsonModel1: null,
    oJsonModel2: null,
    oJsonModel3: null,

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf jsonmerge.start
     */
    onInit: function () {
        // load data into client-side model
        this.oJsonModel1 = new sap.ui.model.json.JSONModel();
        // select only some fields of the Employees entity set
        this.oJsonModel1.loadData(this.sUrl, {"$select": "EmployeeID,LastName,FirstName"});

        // set data to view
        this.getView().setModel(this.oJsonModel1);
    },

    mergeRemote: function (oEvent) {
        this.oJsonModel2 = new sap.ui.model.json.JSONModel();
        // select different fields of the Employees entity set
        // synchronous request for better debugging capabilities
        this.oJsonModel2.loadData(this.sUrl, {"$select": "TitleOfCourtesy,Title"}, false);

        // merge the data into first JSON model
        this.oJsonModel1.setData(this.oJsonModel2.getData(), true);
    },

    mergeLocal: function (oEvent) {
        // setting data to the model locally
        this.oJsonModel3 = new sap.ui.model.json.JSONModel();
        // note the /d/results structure - OData JSON standard!
        var oJson  = {
            d : {
                results: [
                    { "LocalID" : "4711"},
                    { "LocalID" : "4712"},
                    { "LocalID" : "4713"}
                ]
            }
        };
        this.oJsonModel3.setData(oJson);

        // merge it into first JSON model
        this.oJsonModel1.setData(this.oJsonModel3.getData(), true);
    },

    mergeReset: function(oEvent) {
        this.onInit();
    }

    /**
     * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
     * (NOT before the first rendering! onInit() is used for that one!).
     * @memberOf jsonmerge.start
     */
//	onBeforeRendering: function() {
//
//	},

    /**
     * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
     * This hook is the same one that SAPUI5 controls get after being rendered.
     * @memberOf jsonmerge.start
     */
//	onAfterRendering: function() {
//
//	},

    /**
     * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
     * @memberOf jsonmerge.start
     */
//	onExit: function() {
//
//	}

});