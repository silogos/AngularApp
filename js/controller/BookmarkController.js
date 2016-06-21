app.controller('BookmarkController', DataReloadWithAjaxCtrl);

function DataReloadWithAjaxCtrl($scope, $http, $compile, DTOptionsBuilder, DTColumnBuilder) {
    
    var vm = this;
    $scope.data={};
    vm.message = '';
    vm.edit = edit;
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
        DTColumnBuilder.newColumn('url').withTitle('URL'),
        DTColumnBuilder.newColumn(null).withTitle('AKSI').notSortable().renderWith(actionshtml)
    ];
    
    function reloadData(){
        var resetPaging = false;
        vm.dtInstance.reloadData(callback, resetPaging);
    }
    
    function callback(json){
        console.log(json);
    }
    
    function edit(person){
        vm.message = 'You are trying to edit : '+ JSON.stringify(person);
        
        vm.dtInstance.reloadData();
    }
    
    function deleteRow(person){
        var deleted = confirm('Anda yakin ingin menghapus data ini '+ person.title +' ?');
        if(deleted){
            $http.delete('http://localhost/TugasCI-GIT/index.php/crudbookmark/delete/'+person.id)
            .success(function(response){
                reloadData();
                vm.message = response.msg;
            })
            .error(function(){
                vm.message = 'Gagal Terhapus';
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