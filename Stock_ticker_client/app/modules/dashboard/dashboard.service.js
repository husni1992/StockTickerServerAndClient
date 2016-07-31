(function(){
    'use strict';
    
    angular
        .module('dashboard.module')
        .factory('DashboardService', DashboardService);
    
    DashboardService.$inject = ['LocalStorageService', 'StockResource'] ;
    /* @ngInject */
    function DashboardService(LocalStorageService, StockResource){
        var service = {
            getAllStocks: getAllStocks,
            getPreference: getPreference,
            savePreference: savePreferences
        }
        
        function getAllStocks(){
            var myStocksResource = StockResource.getAllStocks().$promise;
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