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
        var int20;
        vm.getStockData = getStockData;
        init();

        function init() {
            getStockData();
        }

        function getLiveStockUpdates() {
            StockResource.getLiveStockUpdates({
                    selectedList: stringSelections
                }).$promise
                .then(function(data) {
                    updateDirectives(data);
                }, function(error) {
                     $mdToast.show(
                        $mdToast.simple()
                            .textContent('Server went down')  
                            .position('bottom right')
                            .hideDelay(3000)
                        );
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

        var initialRun = setInterval(function() {
            if (vm.stocksList.length > 0) {
                getLiveStockUpdates();
                clearInterval(initialRun);
                start();
            } else {
                clearInterval(initialRun);
            }
        }, 1000);


        function start() {
            var count = 0;
            //                updateStock();
            int20 = setInterval(function() {
                count++;
                getLiveStockUpdates();
                if (count == config.stockUpdateCountBeforeInterval) {
                    clearInterval(int20);
                    setTimeout(start, config.stokUpdateInterval * 1000);
                }
            }, config.stockUpdateFrequency * 1000);
        }

        function getStockData() {
            selections = LocalStorageService.getPreferences();
            stringSelections = selections.toString();
            if (selections.length > 0) {
                StockService.getMyStocks({
                        selectedList: stringSelections
                    })
                    .then(function(data) {
                        vm.stocksList = data;
                        if(data.length == 0){
                            $mdToast.show(
                            $mdToast.simple()
                                .textContent('No stocks found in database.')  
                                .position('bottom right')
                                .hideDelay(3000)
                            );
                        }
                    }, function(error) {
//                        console.info('error: ' + error);
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

        $scope.$on('$destroy', function() {
            clearInterval(int20);
        });
                
    }
    
})();