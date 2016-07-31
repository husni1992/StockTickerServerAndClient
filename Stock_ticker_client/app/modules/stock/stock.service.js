(function(){
    'use strict';
    
    angular
        .module('stock.module')
        .factory('StockService', StockService);
    
    StockService.$inject = ['StockResource'];
    /* @ngInject */
    function StockService(StockResource){
        var service = {
            getMyStocks: getMyStocks
        };        
        
        function getMyStocks(selections){
            var myStocksResource = StockResource.getAllStocks(selections).$promise;
            return myStocksResource;
        }
        
        return service;
        
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
       
    }
})();