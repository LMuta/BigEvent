$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if(value.length > 6) {
                return "昵称长度必须再 1 ~ 6 个字符之间"
            }
        }
    })
    initUserInfo();
    // 重置按钮事件
    $('#btnReset').on('click',function(e) {
        e.preventDefault();
        initUserInfo();
    })
    // 表单提交事件
    $('.layui-form').on('submit', function() {
        e.preventDefault();
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('提交用户信息失败');
                }
                window.parent.getUserInfo();
            }
        })
    })
})
// 初始化用户信息
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status != 0) {
                return layer.msg('获取用户信息失败')
            }
            // 为表单赋值
            form.val('formUserInfo', res.data);
        }
    })
}