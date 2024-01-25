$(function() {
    var layer = layui.layer;
    getUserInfo();
    // 退出提示弹窗
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录？',{icon: 3,title: '提示'},
        function(index) {
            localStorage.clear();
            location.href = '/login.html';
            layer.close(index);
        })
    });
});
// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status!=0) {
                return layui.layer.msg('获取用户信息失败');
            }
            renderAvatar(res.data);
        },  
    })
}
// 渲染用户头像
function renderAvatar(user) {
    var name = user.nicname || user.username;
    $('#welcom').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic != null) {
        $('text-avater').hide();
        $('layui-nav-img').attr('src',user.user_pic).show();
    }
    else {
        var first = name[0].toUpperCase();
        $('text-avater').html(first).show();
        $('layui-nav-img').hide();
    }
}