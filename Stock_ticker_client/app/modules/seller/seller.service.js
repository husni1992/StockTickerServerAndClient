(function(){
    'use strict';
    
    angular
        .module('seller.module')
        .factory('SellerService', SellerService);
    
    SellerService.$inject = [];
    /* @ngInject */
    function SellerService(){
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