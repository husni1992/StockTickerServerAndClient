(function(){
    'use strict';
    
    angular
        .module('app')
        .factory('AuthService', AuthService);
    
    AuthService.$inject = ['$rootScope', '$cookies'];
    /* @ngInject */
    function AuthService($rootScope, $cookies){
        
        var LOGIN_STATE = 'login';
        var USER_KEY = 'user';
        
        var service = {
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            tryRestoreSession: tryRestoreSession
        }
        
        function login(username, password, shouldRemember){ 
            if(username=='test' && password=='test1'){
                var store = shouldRemember ? $cookies : sessionStore();
                setCurrentUser(username);
                persistSession(store);            
                return true;
            }else{
                return false;            
            }
        };
        
        function sessionStore(){
            return {
                'get': function(key) {
                    var value = sessionStorage.getItem(key);
                    return value ? JSON.parse(value) : undefined;
                },

                'put': function(key, value) {
                    sessionStorage.setItem(key, JSON.stringify(value));
                },

                remove: function(key) {
                    sessionStorage.removeItem(key);
                }
            }
        }
        
        
        function persistSession(storage) {
            storage.put(USER_KEY, getCurrentUser());
        }
        
        function setCurrentUser(username) {
            $rootScope.username = username;
        }
        
        function getCurrentUser(){
            return $rootScope.username;
        }
        
        function logout(){
            setCurrentUser(null);
            [$cookies, sessionStore()].forEach(function(store) {
                store.remove(USER_KEY);
            });
        };
        
        function restoreFromStorage(storage){
            var user = storage.get(USER_KEY);
            if(!user) {
                return false;
            }else{
                setCurrentUser(user)
                return true;
            }
        }
        
        function tryRestoreSession(){
            var restored = restoreFromStorage($cookies);
            if(restored){
                return restored;
            }else{
                return restoreFromStorage(sessionStore());
            }
        }
        
        function isLoggedIn(){
            return angular.isDefined(getCurrentUser()) && getCurrentUser() !== null;
        }
        
        return service;
    }
})();