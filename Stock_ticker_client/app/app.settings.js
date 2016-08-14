(function(){
    'use strict';
    
    angular
        .module('app')
        // please set stock update time settings in seconds
        .constant('config', {
            stockUpdateFrequency: 1,
            stockUpdateCountBeforeInterval: 5,
            stokUpdateInterval: 8,
            stop_live_update_on_leaving_live_view: true,
            work_offline: false
        })
    
})();