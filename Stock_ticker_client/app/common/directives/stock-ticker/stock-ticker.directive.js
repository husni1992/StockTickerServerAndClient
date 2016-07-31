(function(){
    'use strict';
//    ss
    angular
        .module('app')
        .directive('myCustomer', function(config, StockResource) {
          return {
              restrict: 'E',
              replace: true,
              scope: {
                  item: '='
              },
              templateUrl: 'app/common/directives/stock-ticker/stock-ticker.tmpl.html',
              link: link
          };
        
        function link(scope){
                        
            var stockMinValue = 50;
            var stockMaxValue = 500;
            scope.rising = true;
            
            function getRandomNumber(){
                return Math.floor(Math.random() * stockMaxValue) + stockMinValue
            }                                                
                                    
            function updateStock(){
                scope.item.Price = getRandomNumber();
                scope.$apply();
                console.info(new Date().toLocaleTimeString() + ' Publishing stocks...' )
            }
            
            scope.$watch('item.Price', function(newValue, oldValue) {
                if (newValue)
                    scope.showVariation = newValue != oldValue;
                    scope.rising = newValue > oldValue ? true : false;
                
                
                scope.percentage = newValue > oldValue ? (((newValue - oldValue)/oldValue) * 100) : (((oldValue - newValue)/newValue) * 100);
                    
//                if(newValue>oldValue){
//                    scope.percentage = (((newValue - oldValue)/oldValue) * 100);
//                }else{
//                    scope.percentage = (((oldValue - newValue)/oldValue) * 100);
//                }
                
                    
            });
        }
        
        });
    
})();