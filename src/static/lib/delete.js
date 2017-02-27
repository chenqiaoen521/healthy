
function shanchu(src){
    //alert(11)
    $.ajax({
        url:HOST+'/api/delImg',
        type:'GET',
        headers:{
            Authorization:localStorage.getItem('Authorization')
        },
        data:{path:src},
        success:function(result){
            console.log('访问到了')               
        },
        error:function(e){
                                
        }
    },"json");
}