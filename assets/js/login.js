$(function() {
    // 切换按钮
    $('#link_reg').on('click',function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click',function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    // 自定义表单验证
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}/, '密码必须为6到12位，并且不包含空格'],
        repwd: function(value) {
            if ($('.reg-box [name=password]').val() != value)
            {
                return '两次密码输入不一致';
            }
        },
    })
    // 调用注册API接口
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val(),
        }
        $.post('/api/reguser',
        data, function(res){
            if (res.status!=0) {
                return layer.msg(res.message);
            }
            $('#link_login').click();
            layer.msg('注册成功');
        })
    })
    // 调用登录API接口
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status!=0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                location.href = '/inedx.html'
            },
        })
    })
})