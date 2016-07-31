(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController(AuthService, $state) {
//        $state, auth, config, $mdToast, $filter
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
                $state.go('stock');
            }else{
                alert("Login failed");
            }
//                .then(onLoginSuccess.bind(this), onLoginError.bind(this))
//                .finally(function(){                   
//                    vm.isLoading = false
//                })
        }
        
        function onLoginSuccess(){                          
            $mdToast.show({
                template: '<md-toast class="md-toast success">' + $filter('translate')('LOGIN.MESSAGES.ACCESS_GRANTED') + '</md-toast>',
                hideDelay: 3000,
                position: 'top right'
            })
            $state.go(config.DEFAULT_STARTUP_STATE);
        }
        
        function onLoginError(data) {
            this.responseError = data && data.error_description ? data.error_description :
                $filter('translate')('LOGIN.MESSAGES.ACCESS_DENIED');
            $mdToast.show({
                template: '<md-toast class="md-toast error">' + this.responseError + '</md-toast>',
                hideDelay: 3500,
                position: 'top right'
            })
        }
        
        function signupClick(){
            $state.go('authentication.signup');         
        }
    }
})();