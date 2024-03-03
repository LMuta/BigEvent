$(function() {
    var layer = layui.layer;
    var form = layui.form;
    var $image = $('#image')

    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
        }

    $image.cropper(options)
    initCate();
    initEditor();

    $('#btnChooseImage').on('click', function(e) {
        $('#coverFile').click();
    })

    $('#coverFile').change('click', function(e) {
        var files = e.target.files;
        if (files.length == 0) {
            return;
        }
        var newImgURL = URL.createObjectURL(files[0]);
        $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', newImgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
 
    })

    var art_state = '已发布';

    $('#btnSave2').on('click', function() {
        art_state = '草稿';
    })

    $('#form-pub').on('submit', function(e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append('state', art_state);
        $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
        })
        .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
            fd.append('cover_img', blob);
        })
    })
})


function initCate() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function(res) {
            if (res.status != 0) {
                return layer.open('初始化文章类别失败');
            }
            var htmlStr = tmplate('tpl-cate', res);
            $('[name=cate_id').html(htmlStr);
            form.render();
        },
    })
}

function publishArticle(fd) {
    $.ajax({
        method: 'POST',
        url: '/my/article/add',
        data: fd,
        contentType: false,
        processDate: false,
        success: function(res) {
            if (res.status != 0) {
                return layer.msg('发布文章失败');
            }
            layer.msg('发布文章成功');
            location.href = /article/art_list.html;
        }
    })
}