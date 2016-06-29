var app = angular.module('FirstApp',[]);
app.controller('LoginController', userLogin);

function userLogin($scope, $http, $compile){
    var vm = this;
    vm.login = login;
    $scope.elle = 'sdasd';
    
    function login(){
        var data = JSON.stringify({username:$scope.username, password:$scope.password});
        $http.post("http://localhost/TugasCI-GIT/index.php/login/login",data)
        .success(function(response){
            (response.status) ? vm.message = 'Silahkan Masuk...!' : vm.message = 'Password Salah...!';
            $scope.data= {};
        })
        .error(function(){
            vm.messageAdd = 'Gagal di tambahkan..!';
            vm.messageAddStat = true;
        })
        
    };
    
}