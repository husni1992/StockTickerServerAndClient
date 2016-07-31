(function(){
    'use strict'; 
    
    angular
        .module('app', [
            'ui.router',
            'ngCookies',
            'ngResource',
            'ngMaterial',
        
            'seller.module',
            'stock.module',
            'buyer.module',
            'dashboard.module'
        ])
        .run(AppRun);
    
    function AppRun($rootScope, $state, AuthService) {
        
        AuthService.tryRestoreSession();
        
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams){
            var loggedin = AuthService.isLoggedIn();
            if (toState.freeAccess !== true && !loggedin) {
                event.preventDefault();
                $state.go('login');
            }
            if(loggedin && toState.name == "login"){
                AuthService.logout();
            }
        })

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams){
            $rootScope.currentUiState = $state.current.name;
        });
    }
    
})();