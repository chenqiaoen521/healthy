$(document).ajaxStart(function(){

    //localStorage.clear();
    //exit;
})
$(document).ajaxError(function(event,data){
    var result = JSON.parse(data.responseText);
    console.log(result)
    var status = result.status;
    if(status == 500){
        layer.open({
            content: '服务器内部错误'
            ,skin: 'msg'
            ,time: 2
        });
    }else if(status == 408){
        layer.open({
            content: '网络错误'
            ,skin: 'msg'
            ,time: 2
        });
    }else if(status == 401){

    }else if(status == 422){

    }else {
        layer.open({
            content: '未知错误'
            ,skin: 'msg'
            ,time: 2
        });
    }
});