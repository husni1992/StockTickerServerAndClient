(function(){
    'use strict';
    
    angular
        .module('stock.module')
        .factory('StockService', StockService);
    
    StockService.$inject = ['StockResource'];
    /* @ngInject */
    function StockService(StockResource){
        var service = {
            getMyFavoriteStocks: getMyFavoriteStocks
        };        
        
        function getMyFavoriteStocks(selections){
            var myStocksResource = StockResource.getAllStocks(selections).$promise;
            return myStocksResource;
        }
        
        return service;
    }
})();