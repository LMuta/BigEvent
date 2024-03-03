$(function() {
    var layer = layui.layer;
    var indexAdd = null;

    initArtCateList();

    $('#btnCateAdd').on("click", function(e) {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '文章类别添加',
            content: $('#dialog-add').html(),
        });
    })

    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status != 0) {
                    return layer.msg('添加文章类别失败');
                }
                layer.msg('添加文章类别成功');
                initArtCateList();
                layer.open(indexAdd);
            }
        })
    })
    
    var indexEdit = null;
    $('body').on('click', '.btn-edit', function(e) {
        indexEdit = layer.open({
            type: 1,
            are: ['500px', '250px'],
            title: '翁总类别编辑',
            content: $('#dialog-edit').html(),
        })
        
        var id = $(this).attr('data-id');
        $.ajax({
            method: 'GET',
            url: '/my/article/cates' + id,
            success: function(res) {
                form.val('form-edit', res.data);
            },
        })
    })

    $('#form-edit').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('文章类别修改失败');
                }
                layer.msg('文章类别修改成功');
                layer.close(indexEdit);
                initArtCateList();
            },
        })
    })

    $('body').on('click', '.btn-delete', function(e) {
        var id = $(this).attr(data-id);
        layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate' + id,
                success: function(res) {
                    if (res.status != 0) {
                        return layer.msg('文章类别删除失败');
                    }
                    layer.msg('文章类别删除成功');
                    layer.close(index);
                    initArtCateList();
                },
            })            
        });
    });
})


function initArtCateList() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function(res) {
            var htmlStr = template('tpl-table', res);
            $('tbody').html(htmlStr);
        },
    })
}