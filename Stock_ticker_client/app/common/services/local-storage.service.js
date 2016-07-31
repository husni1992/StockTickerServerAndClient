(function(){
    'use strict';
    
    angular
        .module('app')
        .factory('LocalStorageService', LocalStorageService);
    
    LocalStorageService.$inject = [];
    /* @ngInject */
    function LocalStorageService(){
        
        var service = {
            getPreferences: getPreferences,
            savePreference: savePreference,
            syncWithLocalStorage: syncWithLocalStorage
        };
        
        var storageName = 'localdb';
        
        function savePreference(preference){
            if(localStorage != null && JSON != null){
                localStorage[storageName] = JSON.stringify(preference);
            }
        }
        
        function getPreferences(){
            var rawData = localStorage != null ? localStorage[storageName] : null;
            var convertedData = [];
            
            if(!(rawData == "null" || angular.isUndefined(rawData))){
                convertedData = JSON.parse(rawData);
            }
            
            return convertedData;
        }
        
        function syncWithLocalStorage(){            
        }
        
        return service;
    }
})();