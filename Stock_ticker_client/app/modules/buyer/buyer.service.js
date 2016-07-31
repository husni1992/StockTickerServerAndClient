(function(){
    'use strict';
    
    angular
        .module('buyer.module')
        .factory('BuyerService', BuyerService);
    
    BuyerService.$inject = [];
    /* @ngInject */
    function BuyerService(){
        var service = {
            getData: getData,
            setData: setData
        }
        
        function getData(){
            
        };
        
        function setData(){
            
        };
    }
})();