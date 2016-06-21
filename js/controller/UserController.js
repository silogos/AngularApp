app.controller('UserController', DataReloadWithAjaxCtrl);

function DataReloadWithAjaxCtrl($scope, $http, $compile, DTOptionsBuilder, DTColumnBuilder) {
    
    var vm = this;
    $scope.data = {};
    vm.tambah = tambah;
    vm.tambah_aksi = tambah_aksi;
    vm.edit = edit;
    vm.edit_aksi = edit_aksi;
    vm.delete = deleteRow;
    vm.dtInstance = {};
    vm.persons = {};
    vm.reloadData = reloadData;
    vm.dtOptions = DTOptionsBuilder.fromSource('http://localhost/TugasCI-GIT/index.php/home/angular_user_data')
        .withPaginationType('full_numbers')
        .withOption('stateSave', true)
        .withOption('createdRow', createdRow);
    vm.dtColumns = [
        DTColumnBuilder.newColumn('no').withTitle('NO'),
        DTColumnBuilder.newColumn('username').withTitle('USERNAME'),
        DTColumnBuilder.newColumn(null).withTitle('AKSI').notSortable().renderWith(actionshtml)
    ];
    
    function reloadData(reset){
        if(reset){
            vm.message = '';
        }
        var resetPaging = false;
        vm.dtInstance.reloadData(callback, resetPaging);
    }
    
    function callback(json){
        console.log(json);
    }
    
    function tambah(){
        $scope.data= {};
        $('#tambah_user').modal('show');
    }
    
    function tambah_aksi(){
        
        var data = JSON.stringify({username:$scope.data.username, password:$scope.data.password});
        
        $http.post("http://localhost/TugasCI-GIT/index.php/cruduser/tambah_aksi/ang",data)
        .success(function(response){
            reloadData();
            vm.messageAdd = response.msg;
            vm.messageAddStat = response.error;
            console.log(response.error);
            $scope.data= {};
        })
        .error(function(){
            vm.messageAdd = 'Gagal di tambahkan..!';
            vm.messageAddStat = true;
        })
        
        console.log($scope.data);
    }
    
    function edit(person){
        $('#edit_user').modal('show');
        $scope.data = person;
    }
    
    function edit_aksi(){
        
        var data = JSON.stringify({id:$scope.data.id,username:$scope.data.username, pass_word:$scope.data.pass_word, password:$scope.data.password});
        
        $http.post("http://localhost/TugasCI-GIT/index.php/cruduser/edit_aksi/ang",data)
        .success(function(response){
            reloadData();
            vm.messageEdit = response.msg;
            vm.messageEditStat = response.error;
            console.log(response.error);
        })
        .error(function(){
            vm.messageEdit = 'Gagal di ubah..!';
            vm.messageEditStat = true;
        })
        
    }
    
    function deleteRow(person){
        var deleted = confirm('Anda yakin ingin menghapus data ini '+ person.username +' ?');
        if(deleted){
            $http.delete('http://localhost/TugasCI-GIT/index.php/cruduser/delete/'+person.id)
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
        return '<button ng-click="showCase.edit(showCase.persons['+ data.id +'])" id='+ data.id +' class="btn btn-warning">' +
                    '<i class="fa fa-edit"></i>' +
               '</button>&nbsp;<button ng-click="showCase.delete(showCase.persons['+ data.id +'])" id='+ data.id +' class="btn btn-danger">' +
                    '<i class="fa fa-trash"></i>' + 
               '</button>';            
    }
    
}