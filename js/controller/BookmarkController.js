app.controller('BookmarkController', DataReloadWithAjaxCtrl);

function DataReloadWithAjaxCtrl($scope, $http, $compile, DTOptionsBuilder, DTColumnBuilder) {
    
    $http.get("http://localhost/TugasCI-GIT/index.php/login/cek_sesi")
    .success(function(response){
        (!response.status) ? window.location='http://localhost/AngularApp/login.html': "";
    })

    var vm = this;
    $scope.data={};
    vm.tambah = tambah;
    vm.tambah_aksi = tambah_aksi;
    vm.view = view;
    vm.edit = edit;
    vm.edit_aksi = edit_aksi;
    vm.delete = deleteRow;
    vm.dtInstance = {};
    vm.persons = {};
    vm.reloadData = reloadData;
    vm.dtOptions = DTOptionsBuilder.fromSource('http://localhost/TugasCI-GIT/index.php/home/angular_bookmark_data')
        .withPaginationType('full_numbers')
        .withOption('stateSave', true)
        .withOption('createdRow', createdRow);
    vm.dtColumns = [
        DTColumnBuilder.newColumn('no').withTitle('NO'),
        DTColumnBuilder.newColumn('title').withTitle('TITLE'),
        DTColumnBuilder.newColumn(null).withTitle('URL').renderWith(actionshtmllink),
        DTColumnBuilder.newColumn(null).withTitle('AKSI').notSortable().renderWith(actionshtml)
    ];
    
    function reloadData(){
        var resetPaging = false;
        vm.dtInstance.reloadData(callback, resetPaging);
    }
    
    function callback(json){
        console.log(json);
    }
    
    function tambah(){
        $scope.data= {};
        $('#tambah_bookmark').modal('show');
    }
    
    function tambah_aksi(){
        var data = JSON.stringify({title:$scope.data.title, url:$scope.data.url, description:$scope.data.description});
        
        $http.post("http://localhost/TugasCI-GIT/index.php/crudbookmark/tambah_aksi/ang",data)
        .success(function(response){
            reloadData();
            vm.messageAdd = response.msg;
            vm.messageAddStat = response.error;
            $scope.data= {};
        })
        .error(function(){
            vm.messageAdd = 'Gagal di tambahkan..!';
            vm.messageAddStat = true;
        })
    }
    
    function view(person){
        
        $http.post("http://localhost/TugasCI-GIT/index.php/crudbookmark/edit/"+person.id)
        .success(function(response){
            $scope.data = response;
        })
        .error(function(){
            vm.messageEdit = 'Gagal di tambahkan..!';
            vm.messageEditStat = true;
        })
    
        $('#view_bookmark').modal('show');
        
    }
    
    function edit(person){
        
        $http.post("http://localhost/TugasCI-GIT/index.php/crudbookmark/edit/"+person.id)
        .success(function(response){
            $scope.data = response;
        })
        .error(function(){
            vm.messageEdit = 'Gagal di tambahkan..!';
            vm.messageEditStat = true;
        })
    
        $('#edit_bookmark').modal('show');
        
    }
    
    function edit_aksi(){
        var data = JSON.stringify({id:$scope.data.id, title:$scope.data.title, url:$scope.data.url, description:$scope.data.description});
        
        $http.post("http://localhost/TugasCI-GIT/index.php/crudbookmark/edit_aksi/ang",data)
        .success(function(response){
            reloadData();
            vm.messageEdit = response.msg;
            vm.messageEditStat = response.error;
        })
        .error(function(){
            vm.messageEdit = 'Gagal di tambahkan..!';
            vm.messageEditStat = true;
        })
    }
    
    function deleteRow(person){
        var deleted = confirm('Anda yakin ingin menghapus data ini '+ person.title +' ?');
        if(deleted){
            $http.delete('http://localhost/TugasCI-GIT/index.php/crudbookmark/delete/'+person.id)
            .success(function(response){
                reloadData();
                vm.messageDel = response.msg;
                vm.messageDelStat = response.error;
            })
            .error(function(){
                vm.messageDel = 'Gagal Terhapus';
                vm.messageDelStat = true;
            })
            
        }
        
    }
    
    function createdRow(row, data, dataIndex){
        $compile(angular.element(row).contents())($scope);
    }
    
    function actionshtml(data){  
        vm.persons[data.id] = data;
        return '<button ng-click="showCase.view(showCase.persons['+ data.id +'])" id='+ data.id +' class="btn btn-primary">' +
                    '<i class="fa fa-eye"></i>' +
               '</button>&nbsp;<button ng-click="showCase.edit(showCase.persons['+ data.id +'])" id='+ data.id +' class="btn btn-warning">' +
                    '<i class="fa fa-edit"></i>' + 
               '</button>&nbsp;<button ng-click="showCase.delete(showCase.persons['+ data.id +'])" id='+ data.id +' class="btn btn-danger">' +
                    '<i class="fa fa-trash"></i>' + 
               '</button>';            
    }
    
    function actionshtmllink(data){  
        vm.persons[data.id] = data;
        return '<a target="_blank" href="'+ data.url +'">'+ data.url +'</a>';            
    }
    
}