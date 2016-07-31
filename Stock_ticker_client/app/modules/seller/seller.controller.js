(function(){
    'use strict';
    
    angular
        .module('seller.module')
        .controller('SellerController', SellerController);
    
    SellerController.$inject = ['StockResource', '$mdToast', '$scope'];
    /* @ngInject */
    function SellerController(StockResource, $mdToast, $scope){
        var vm = this;
        vm.addProduct = addProduct;
        vm.clearForm = clearForm;
        
        loadNewStock();
        function loadNewStock() {        
            vm.stock = new StockResource();
        }
        
        function addProduct(){
            vm.saving = true;
            vm.stock.$addNewStock().then(function (data) {
                    $mdToast.show(
                         $mdToast.simple()
                            .textContent('Save success!')  
                            .position('bottom right')
                            .hideDelay(3000)
                      );
                    clearForm();
                }, function (error) {
                    console.warn(error)
                }).finally(function () {
                    vm.saving = false;                        
                });
        }
        
        function clearForm(){
            vm.stock = {};
            
            $scope.stockForm.$setUntouched();
            $scope.stockForm = false;
            
            loadNewStock();
        }
    }
})();