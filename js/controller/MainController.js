app.controller('MainController', MainControl);

function MainControl($scope){
    
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
        href: "login.html",
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
    ];
    
}