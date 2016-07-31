(function(){
    'use strict';
    
    angular
        .module('app')
        // please set stock update time settings in seconds
        .constant('config', {
            stockUpdateFrequency: 20,
            stockUpdateCountBeforeInterval: 5,
            stokUpdateInterval: 60,
            stop_live_update_on_leaving_live_view: false,
            work_offline: false
        })
    
})();