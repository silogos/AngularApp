var bookmark;
    
$(document).ready(function(){ 
    
    //datatable
    bookmark = $('#bookmark').DataTable({
        ajax: 'bookmark_data',
        columns: [
            {'data': 'no'},
            {'data': 'title'},
            {'data': 'url'},
            {'data': 'id'}
        ]
    });
    
});

function reload(){
    bookmark.ajax.reload();
}

function mod_view(id){
    $('#detail_bookmark').modal('show');
    $.ajax({
        type: 'GET',
        url: '../crudbookmark/edit/'+id,
        dataType: 'JSON',
        success: function(data){
            $('#form-detail-bookmark input[name=title]').val(data.title);
            $('#form-detail-bookmark input[name=url]').val(data.url);
            $('#form-detail-bookmark textarea[name=description]').val(data.description);
        }
    });
}

function mod_tambah(){
    $('#tambah_bookmark').modal('show');
    $('#title').focus();
    
}

function tambah(){
    var data = $('#form-tambah-bookmark').serialize();
    $.ajax({
        type: 'POST',
        url: '../crudbookmark/tambah_aksi',
        dataType: 'JSON', 
        data: data,
        beforeSend: function(){
            $('.progress').show();
            $('.progress-bar').animate({width: '60%'}, 0);
        },
        success: function(response){
            $('.progress-bar').animate({width: '100%'}, 500);
            $('.progress').css('display','none');
            $('#title,#url,#description').val('');
            remove_notif();
            $('.eror_detail').text(response.msg);
            if(response.error == true){
                $('#notif').addClass('alert-warning'); 
                $('#notif_icon').addClass('fa-info');
            }else{
                $('#notif').addClass('alert-success');
                $('#notif_icon').addClass('fa-plus');
            }
            $('#notif').fadeIn(1000);
            setTimeout( 
            function(){
                $('#tambah_bookmark').modal('hide');
                reload();
            },1000); 
        }
    });
}

function mod_edit(id){
    $('#edit_bookmark').modal('show');
    $.ajax({
        type: 'GET',
        url: '../crudbookmark/edit/'+id,
        dataType: 'JSON',
        success: function(data){
            $('#form-edit-bookmark input[name=id]').val(data.id);
            $('#form-edit-bookmark input[name=title]').val(data.title);
            $('#form-edit-bookmark input[name=url]').val(data.url);
            $('#form-edit-bookmark textarea[name=description]').val(data.description);
            $('#title').focus();
        }
    });
}

function edit(){
    var data = $('#form-edit-bookmark').serialize();
    $.ajax({
        type: 'POST',
        url: '../crudbookmark/edit_aksi',
        dataType: 'JSON', 
        data: data,
        beforeSend: function(){
            $('.progress').show();
            $('.progress-bar').animate({width: '60%'}, 0);
        },
        success: function(response){
            $('.progress-bar').animate({width: '100%'}, 500);
            $('.progress').css('display','none');
            $('#title,#url,#description').val('');
            remove_notif();
            $('.eror_detail').text(response.msg);
            if(response.error == true){
                $('#notif').addClass('alert-warning'); 
                $('#notif_icon').addClass('fa-info');
            }else{
                $('#notif').addClass('alert-success');
                $('#notif_icon').addClass('fa-plus');
            }
            $('#notif').fadeIn(1000);
            setTimeout( 
            function(){
                $('#edit_bookmark').modal('hide');
                reload();
            },1000); 
        }
    });
}

function mod_delete(id){
    $('#hapus').modal('show');
    $('#delete_user').focus();
    $('#delete_user').attr('onclick','deleted('+id+')');
}

function deleted(id){  
    
    $.ajax({
        url: '../crudbookmark/delete/'+id,
        type: 'GET',
        dataType: 'JSON',
        success: function(response){
            $(this).parent().remove();
            $('#hapus').modal('hide');
            remove_notif();
            $('.eror_detail').text(response.msg);
            if(response.error==true){
                $('#notif_icon').addClass('fa-info'); 
                $('#notif').addClass('alert-warning'); 
            }else{
                $('#notif_icon').addClass('fa-trash'); 
                $('#notif').addClass('alert-danger');
            }
            $('#notif').fadeIn(3000);
            reload();
        }
    });
    
}

function remove_notif(){
    
    $('#notif').fadeOut('fast');
    $('#notif').removeClass('alert-danger alert-success alert-warning');
    $('#notif_icon').removeClass('fa-info fa-plus fa-trash');
    
}