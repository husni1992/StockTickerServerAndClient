(function(){
    'use strict';
    
    angular
        .module('app')
        .factory('StockTickerService', StockTickerService);
    
    StockTickerService.$inject = [];
    /* @ngInject */
    function StockTickerService(){
        var service = {
            getAllStockData: getAllStockData
        }
        
         
        var stocksList = [{
                            "ID": 1,
                            "Name": "Pepsi",
                            "Price": "400",
                            "NewPrice": "0",
                            "ImageUrl": "https://upload.wikimedia.org/wikipedia/en/9/9d/Pepsilogo.png"
                        }, {
                            "ID": 2,
                            "Name": "Nissan",
                            "Price": "400",
                            "NewPrice": "0",
                            "ImageUrl": "http://www.insidercarnews.com/wp-content/uploads/2015/07/nissan_brand_logo_cropped.jpg"
                        }, {
                            "ID": 3,
                            "Name": "Facebook",
                            "Price": "999",
                            "NewPrice": "0",
                            "ImageUrl": "http://static.dnaindia.com/sites/default/files/2015/05/03/333140-facbook.jpg"
                        }, {
                            "ID": 4,
                            "Name": "Google",
                            "Price": "320",
                            "NewPrice": "0",
                            "ImageUrl": "https://lh3.googleusercontent.com/-IhVc_Wxy6dY/AAAAAAAAAAI/AAAAAAAAAAA/fl45Fty4PEI/photo.jpg"
                        }, {
                            "ID": 5,
                            "Name": "Yahoo",
                            "Price": "110",
                            "NewPrice": "0",
                            "ImageUrl": "https://3.bp.blogspot.com/-T7lUxjtcb9o/V148VnnAo2I/AAAAAAAAB8Q/f8L-46fUHGweKwAhnh7xxO3KFU_nh1JwQCLcB/s1600/1.jpg"
                        }];
        
        function getAllStockData(){
            return stocksList;
        }
        
        return service;
        
    }
})();