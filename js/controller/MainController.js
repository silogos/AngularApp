app.controller('MainController',['$scope', function($scope){
    $scope.navs = [
    {
        title: "ABOUT",
        href: "#/about",
        icon: "fa fa-user",
        logged: false,
        clas: ""
    },
    {
        title: "USER",
        href: "#/user",
        icon: "fa fa-user",
        logged: true,
        clas: ""
    },
    {
        title: "HOME",
        href: "#/home",
        icon: "fa fa-home",
        logged: false,
        clas: "hidden-xs"
    },
    {
        title: "BOOKMARK",
        href: "#/bookmark",
        icon: "fa fa-bookmark",
        logged: true,
        clas: ""
    },
    {
        title: "LOGIN",
        href: "#/login",
        icon: "fa fa-sign-in",
        logged: false,
        clas: ""
    },
    {
        title: "LOGOUT",
        href: "#/logout",
        icon: "fa fa-sign-out",
        logged: true
    }
    ]
    $scope.title = "Macam macam Lele";
    $scope.leles = [
    {
        nama: 'Lele Jumbo',
        berat: '5 Kg',
        harga: 5000,
        stok: 100
    },
    {
        nama: 'Lele Solokan',
        berat: '1 Kg',
        harga: 1500,
        stok: 44
    },
    {
        nama: 'Lele Balong',
        berat: '3 Kg',
        harga: 4000,
        stok: 120
    }
    ];
    $scope.beli=function(index){
        $scope.leles[index].stok-=1;
        
    }
    $scope.logToConsole=function(index){
        console.log($scope.title);
    }
}]);