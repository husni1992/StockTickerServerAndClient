(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AuthService', '$state', '$mdToast'];
    /* @ngInject */
    function LoginController(AuthService, $state, $mdToast) {
        var vm = this;
        
        vm.loginClick = loginClick;
        vm.signupClick = signupClick;
        
        vm.user = {
            username: '',
            password: '',
            shouldRemember: false
        };

        function loginClick() {
            vm.isLoading = true;
            var success = AuthService.login(vm.user.username, vm.user.password, vm.user.shouldRemember);
            if(success){
                onLoginSuccess();
            }else{
                onLoginError();
            }
        }
        
        function onLoginSuccess(){                          
            $mdToast.show(
            $mdToast.simple()
                .textContent('Login success')  
                .position('bottom right')
                .hideDelay(3000)
            );
            
            $state.go('stock');
        }
        
        function onLoginError(data) {
            $mdToast.show(
            $mdToast.simple()
                .textContent('Login failed')  
                .position('bottom right')
                .hideDelay(3000)
            );
        }
        
        function signupClick(){
                   
        }
    }
})();