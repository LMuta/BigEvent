$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    if (options.url.indexOf('/my/') != -1) {
        options.url.header = {
            Authorization: localStorage.getItem('token') || '',
        }
    };
    option.complete = function(res) {
        // 判断响应状态
        console.log(res)
        if (res.responseJSON.status == 1 && 
            res.responseJSON.mesage === '身份验证失败！') {
            localStorage.removeItem('token');
            location.href('/login.html');
        }            
    };
})