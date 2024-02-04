$(function() {
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须为6到12位，且不能出现空格'],
        samePwd: function(value) {
            if (value != $('[name=oldPwd]').val()) {
                return '新旧密码不一致';
            }
        },
        rePwd: function(value) {
            if (value != $('[name=newPwd]').val()) {
                return '两次密码输入不一致';
            }
        },
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/uploadpwd',
            data: $(this).serilaize(),
            success: function(res) {
                if (res.status != 0) {
                    return layui.layer.msg('密码修改失败');
                }
                layui.layer.msg('密码修改成功');
                // 重置表单
                $('layui-form')[0].reset();
            }
        })
    })
})