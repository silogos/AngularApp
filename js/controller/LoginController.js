var app = angular.module('FirstApp',[]);
app.controller('LoginController', userLogin);

function userLogin($scope, $http, $compile, $location){
    $http.get("http://localhost/TugasCI-GIT/index.php/login/cek_sesi")
    .success(function(response){
        (response.status) ? window.location='http://localhost/AngularApp/template.html#/user': "";
    })
    
    var vm = this;
    vm.login = login;
    vm.messageStat = true;
    function login(){
        var data = JSON.stringify({username:$scope.username, password:$scope.password});
        $http.post("http://localhost/TugasCI-GIT/index.php/login/login",data)
        .success(function(response){
            (response.status) ? window.location='http://localhost/AngularApp/template.html#/user' : vm.message = 'Password Salah...!';
            vm.messageStat = response.status;
            $scope.data= {};
        })
        .error(function(){
            vm.message = 'Gagal di tambahkan..!';
            vm.messageStat = false;
        })
        
    };
        
    function logout(){
        $http.get("http://localhost/TugasCI-GIT/index.php/home/logout")
        .success(function(response){
            (response.status) ? vm.message = '...!' : vm.message = 'Password Salah...!';
            $scope.data= {};
        })
        .error(function(){
            vm.messageAdd = 'Gagal di tambahkan..!';
            vm.messageAddStat = true;
        })
        
    };
    
}