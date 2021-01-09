$(function() {
    $('#link_reg').click(function() {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    $('#link_login').click(function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            if (value !== $('.reg-box [name=password]').val()) {
                return '两次密码不一致'
            }
        }
    })

    $('#form-reg').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val()
        }
        $.ajax({
            type: "POST",
            url: '/api/reguser',
            data: data,
            success: function(res) {
                if (res.status !== 1) {
                    layer.msg(res.message)
                    $('#link_login').click()
                } else {
                    layer.msg(res.message)
                }
            }
        })
    })

    $('#form-login').on('submit', function(e) {
        e.preventDefault()

        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 1) {
                    layer.msg(res.message)
                    localStorage.setItem('token', res.token)
                    location.href = '/index.html'
                } else {
                    layer.msg(res.message)
                }
            }
        })
    })





})