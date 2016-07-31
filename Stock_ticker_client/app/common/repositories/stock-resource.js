(function () {
    "use strict";
    angular
        .module('app')
        .factory("StockResource", StockResource);

    function StockResource($resource) {
        var apiUrl = 'http://localhost:1335';
        var Resource = $resource(apiUrl, {},
            {         
                'getAllStocks': { method: 'GET', url: apiUrl + "/getallstocks", isArray: true},
                'getLiveStockUpdates': { method: 'GET', url: apiUrl + "/getLiveStockUpdates", isArray: true},
                'getStockNameList': { method: 'GET', url: apiUrl + "/getallstockNames", isArray: true, cache : true},
                'addNewStock': { method: 'POST', url: apiUrl + "/addnewstock"}
            }
        );
        return Resource;
    };
}());