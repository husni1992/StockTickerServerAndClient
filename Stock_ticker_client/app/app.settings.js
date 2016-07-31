(function(){
    'use strict';
    
    angular
        .module('app')
        // please set stock update time settings in seconds
        .constant('config', {
            stockUpdateFrequency: 2,
            stockUpdateCountBeforeInterval: 5,
            stokUpdateInterval: 5,
            work_offline: false
        })
    
})();