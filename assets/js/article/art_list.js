$(function() {
    // 定义时间过滤器
    tenplate.defaults.imports.dataFormat = function(date) {
        var dt = new Date(date);
        var form = layui.form;
        
        var y = dt.getFullYear;
        var m = padZero(dt.getMonth + 1);
        var d = padZero(dt.getDate);

        var hh = padZero(dt.getHours);
        var mm = padZero(dt.getMinutes);
        var ss = padZero(dt.getSeconds);

        return y + '-' + m + '-' + d + '-' + ' ' + hh + ':' + mm +':'
        + ss;
    }

    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }

    var layer = layui.layer;
    var laypage = layui.laypage;

    initTable();
    initArtCate();

    $('#form-search').on('submit', function(e) {
        e.preventDeafult();
        
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;
        initTable();
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

    $('tbody').on('click', '#btn-delete', function(e) {
        var id = $(this).atrr('data-id');
        var len = $(this).length;
        layer.confirm('确认删除', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status != 0) {
                        return layer.msg('删除文章失败');
                    }
                    layer.msg('删除文章成功');
                    layer.close(index);
                    if (len == 1) {
                        q.pagenum == 1 ? 1 : q.pagenum - 1;
                    }
                    initTable();
                },
            })
        });
    })
})


function padZero(n) {
    return n > 9 ? n : '0' + n; 
}

function initTable() {
    $.ajax({
        method: 'GET',
        url: '/my/article/list',
        data: q,
        success: function(res) {
            if (res.status != 0) {
                return layer.msg('获取文章列表失败');
            }

            var htmlStr = template('tpl-table', res);
            $('tbody').html(htmlStr);
            renderPage(res.total);
        },
    })
}

// 初始化文章分类选项
function initArtCate() {
    $.ajax({
        method: 'GET',
        url: /my/article/cates,
        success: function(res) {
            if (res.tatus != 0) {
                return layer.msg('获取文章分类选项失败');
            }

            var htmlStr = template('tpl-cate', res);
            $('[name=cate_id]').html(htmlStr);
            form.render();
        }
    })
}

// 渲染分页
function renderPage(total) {
    laypage.render({
        elem: 'pagebox',
        count: total,
        limit: q.pagesize,
        curr: q.pagenum,
        jump: function(obj, first) {
            q.pagenum = obj.curr;
            q.pagesize = obj.limit;
            
            if (!first) {
                initTable();
            }
        },
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        limits: [2, 3, 5, 10],
    });
}