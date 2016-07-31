(function(){
    'use strict';
    
    angular
        .module('app')
        .config(AppConfig);
    
    AppConfig.$inject = ['$urlRouterProvider', '$stateProvider'];
    /* @ngInject */
    function AppConfig($urlRouterProvider, $stateProvider){
        
        $stateProvider
        
        .state('stock', {
            url: '/stock',
            templateUrl: 'app/modules/stock/stock.tmpl.html',
            controller: 'StockController',
            controllerAs: 'vm'
        })
        .state('seller', {
            url: '/seller',
            templateUrl: 'app/modules/seller/seller.tmpl.html',
            controller: 'SellerController',
            controllerAs: 'vm'
        })
        .state('buyer', {
            url: '/buyer',
            templateUrl: 'app/modules/buyer/buyer.tmpl.html',
            controller: 'BuyerController',
            controllerAs: 'vm'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'app/modules/dashboard/dashboard.tmpl.html',
            controller: 'DashboardController',
            controllerAs: 'vm'
        })
        .state('login', {
            url:'/login',
            templateUrl: 'app/common/modules/authentication/login.tmpl.html',
            controller: 'LoginController',
            controllerAs: 'vm',
            freeAccess: true
        })
        
        $urlRouterProvider.otherwise('/dashboard')
    }
    
})();