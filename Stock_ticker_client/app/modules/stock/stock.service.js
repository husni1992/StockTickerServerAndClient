(function(){
    'use strict';
    
    angular
        .module('stock.module')
        .factory('StockService', StockService);
    
    StockService.$inject = ['LocalStorageService', 'StockResource', 'StockTickerService'];
    /* @ngInject */
    function StockService(LocalStorageService, StockResource, StockTickerService){
        var service = {
            getMyStocks: getMyStocks,
            getData: getData,
            setData: setData
        }        
        
        function getMyStocks(selections){
//            var myStocksResource = StockResource.post(favouriteStockListIDs).$promise;
            var myStocksResource = StockResource.getAllStocks(selections).$promise;
            return myStocksResource;
        }
        
//        function getMyStocks(){
//            
//            var allStocks = StockTickerService.getAllStockData();
//            
//            var selections = LocalStorageService.getPreferences();
//            
//            var favouriteStocks = [];
//            
//            if(selections != null){
//                selections.forEach(function(x){
//                    var id = x;
//                    allStocks.forEach(function(x){
//                        if(x.id == id){
//                            favouriteStocks.push(x);
//                        }
//                    })
//                })
//            }            
//            
//            return favouriteStocks;
//        }
        
        function getData(){
            
        };
        
        function setData(){
            
        };
        
        return service;
    }
})();