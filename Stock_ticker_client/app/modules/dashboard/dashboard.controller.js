(function(){
    'use strict';
    
    angular
        .module('dashboard.module')
        .controller('DashboardController', DashboardController);
    
    DashboardController.$inject = ['StockTickerService', 'DashboardService', '$rootScope', '$scope', '$state', '$mdToast'];
    /* @ngInject */
    function DashboardController(StockTickerService, DashboardService, $rootScope, $scope, $state, $mdToast){
        var vm = this;           
        
//        vm.selection = [];
        
        var selectionIdList = []
        vm.stocksList = null;
        var pendingChanges = false;
        
        vm.toggleSelection = toggleSelection;
        vm.savePreferences = savePreferences;
        
        init();
            
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams){            
            if(pendingChanges == true){
                event.preventDefault();
                $('#myModal').modal('show');

                $('#okay-button').click(function() {
                    $('#myModal').modal('hide');
                    pendingChanges = false;                    
                    $state.go(toState.name);
                });
                $('#cancel-button').click(function() {
                    $('#myModal').modal('hide');
                });
            }
        });
                        
        function init(){
//            vm.stocksList = DashboardService.getAllStocks();
            
            DashboardService.getAllStocks()            
               .then(function (data) {
                    vm.stocksList = data;
                    if(data.length == 0){
                        $mdToast.show(
                         $mdToast.simple()
                            .textContent('No stocks found in database.')  
                            .position('bottom right')
                            .hideDelay(3000)
                        );
                    }else{
                        syncPreferences();
                    }
                    
                }, function (error) {
                    $mdToast.show(
                         $mdToast.simple()
                            .textContent('Error fetching data. please contact admin!')  
                            .position('bottom right')
                            .hideDelay(3000)
                        );
//                    console.info('error: ' + error.data);
                }).finally(function () {
                    
                });
            
            getPreference();        
        }
        
        function getPreference(){
            selectionIdList = DashboardService.getPreference();
        }
        
        function syncPreferences(){
            if(selectionIdList != null){
                selectionIdList.forEach(function(x){
                    var selectedId = x;
                    vm.stocksList.forEach(function(x){
                        if(x.Id == selectedId){
                            x.isChecked = true;
                        }
                    })
                })
            }
        }        
        
        function savePreferences(){
            selectionIdList = [];
            vm.stocksList.forEach(function(x){
                if(x.isChecked){
                    selectionIdList.push(x.Id);
                }
            })
            
            pendingChanges = false;
            DashboardService.savePreference(selectionIdList);
                $mdToast.show(
                     $mdToast.simple()
                        .textContent('Settings saved!')  
                        .position('bottom right')
                        .hideDelay(3000)
                  );
        }                
        
        function toggleSelection() {          
            pendingChanges = true;            
        };
        
    }
})();