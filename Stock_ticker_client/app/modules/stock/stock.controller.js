(function(){
    'use strict'; 
    
    angular
        .module('stock.module')
        .controller('StockController', StockController);
    
    StockController.$inject = ['$scope', 'StockService', 'LocalStorageService', 'StockResource', 'config', '$mdToast'];
    /* @ngInject */
    function StockController($scope, StockService, LocalStorageService, StockResource, config, $mdToast){
        
        var vm = this;
        vm.stocksList = [];
        var selections = null;
        var stringSelections = null;
        var updateTimer = null;
        var initialRun = null;
        vm.getStockData = getStockData;
        init();

        function init() {
            getStockData();
        }
        
        // Get all feields of the selected stocks from node server (Id, Name, ImageUrl, Price)
        function getStockData() {
            selections = LocalStorageService.getPreferences();
            stringSelections = selections.toString();
            if (selections.length > 0) {
                StockService.getMyFavoriteStocks({
                        selectedList: stringSelections
                    })
                    .then(function(data) {
                        vm.stocksList = data;
                        if(data.length == 0){      
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent('Selected stocks are not found in database')  
                                    .position('bottom right')
                                    .hideDelay(3000)
                                );
                        }
                    }, function(error) {
                        $mdToast.show(
                         $mdToast.simple()
                            .textContent('Error fetching data. please contact admin!')  
                            .position('bottom right')
                            .hideDelay(3000)
                        );
                    }).finally(function() {

                    });
            }
        }
        
        var errorCount = 0;
        // Get only Id,Price of the selected stocks from node server
        function getLiveStockUpdates() {
                
                StockResource.getLiveStockUpdates({
                    selectedList: stringSelections
                }).$promise
                .then(function(data) {
                    errorCount = 0;
                    updateDirectives(data);
                }, function(error) {
                     if(errorCount == 0){
                         $mdToast.show(
                            $mdToast.simple()
                                .textContent('Server went down')  
                                .position('bottom right')
                                .hideDelay(3000)
                            );
                         errorCount = 1;
                     }
                }).finally(function() {

                });
        }

        function updateDirectives(liveData) {
            liveData.forEach(function(data) {
                vm.stocksList.forEach(function(x) {
                    if (x.Id == data.Id) {
                        x.Price = data.Price;
                    }
                })
            })
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        }

        if(!initialRun){
            initialRun = setInterval(function() {
                if (vm.stocksList.length > 0) {
                    getLiveStockUpdates();
                    clearInterval(initialRun);
                    startLiveUpdate();
                } else {
                    clearInterval(initialRun);
                }
            }, 1000);
        }
        
        function startLiveUpdate() {
            var count = 0;
            //getLiveStockUpdates(); to call livestockupdate on start
            updateTimer = setInterval(function() {
                if(vm.stocksList.length > 0){
                    count++;
                    getLiveStockUpdates();
                    if (count == config.stockUpdateCountBeforeInterval) {
                        clearInterval(updateTimer);
                        setTimeout(startLiveUpdate, config.stokUpdateInterval * 1000);
                    }
                }else{
                    clearInterval(updateTimer);
                }
                
            }, config.stockUpdateFrequency * 1000);
        }        

        $scope.$on('$destroy', function() {
            clearInterval(updateTimer);
            clearInterval(initialRun);
        });
                
    }
    
})();