$(function() {
    var layer = layui.layer
    getuserDate()

    $('.logout').click(function() {
        layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token')
            location.href = 'login.html'

            layer.close(index);
        });
    })
})

// 函数写在外面，才会被iframe标签内window.parent调用到
function getuserDate() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            console.log(res);
            if (res.status !== 1) {
                renderAvata(res.data)
            } else {
                layer.msg(res.message)
            }

        }
    })

}

function renderAvata(user) {
    var name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.text-avatar').html(name[0].toUpperCase()).show()
        $('.layui-nav-img').hide()
    }



}