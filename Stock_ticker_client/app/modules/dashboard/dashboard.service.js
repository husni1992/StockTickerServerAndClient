(function(){
    'use strict';
    
    angular
        .module('dashboard.module')
        .factory('DashboardService', DashboardService);
    
    DashboardService.$inject = ['LocalStorageService', 'StockResource', 'StockTickerService'] ;
    /* @ngInject */
    function DashboardService(LocalStorageService, StockResource, StockTickerService){
        var service = {
            getAllStocks: getAllStocks,
            getPreference: getPreference,
            savePreference: savePreferences
        }
        
        function getAllStocks(){
            //to get only names of stocks, but cannot show image      
            //var myStocksResource = StockResource.getStockNameList().$promise;
            var myStocksResource = StockResource.getAllStocks().$promise;
            
//            var myStocksResource = StockTickerService.getAllStockData();
            
            return myStocksResource;
        }                
        
        function getPreference(){
            return LocalStorageService.getPreferences();
        }
        
        function savePreferences(selectedStocks){
            LocalStorageService.savePreference(selectedStocks);
        }
        
        return service;
    }
})();