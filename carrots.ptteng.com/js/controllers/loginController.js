angular.module('myApp')
    .controller('LoginController', ['$state', 'articleHttp', function ($state, articleHttp) {
        var vm = this;
        vm.loginCheck = function (user) {
            articleHttp.login_Http(user)
                .then(function (resp) {
                    if (resp.code === 0) {
                        console.log(resp.message);                 
                        $state.go('dashboard');
                    } else {
                        vm.showError = true;
                        vm.errorMessage = resp.message;
                    };
                }, function (resp) {
                    console.log(resp);
                });
        };
    }]);