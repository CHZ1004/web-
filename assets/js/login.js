$(function () {
    // 去注册点击事件
    $('#to_reg').on('click', function () {
        $('.login').hide();
        $('.reg').show();
    })
    // 去登陆点击事件
    $('#to_login').on('click', function () {
        $('.login').show();
        $('.reg').hide();
    })
    // 添加表演验证
    layui.form.verify({
        pas: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repas: function (value) {
            var pas = $('.reg [name=password]').val();
            if (value !== pas) {
                return '两次密码不一致!'
            }
        }
    })
    //注册form表单监听事件
    $('.reg .layui-form').on('submit', function (e) {
        // 取消form表单的默认跳转
        e.preventDefault();
        // 注册点击事件
        $('#reg_btn').on('click', function () {
            var username = $('.reg [name=username]').val().trim();
            var password = $('.reg [name=password]').val().trim();
            if (username.length === 0) {
                return
            }
            $.ajax({
                type: 'post',
                url: '/api/reguser',
                data: {
                    username: username,
                    password: password
                },
                success: function (res) {
                    console.log(res);
                    if (res.status != 0) {
                        $('.reg [name=username]').val('');
                        return layer.msg('该用户名已被占用');
                    }
                    $('.reg [name=username]').val('');
                    $('.reg [name=password]').val('');
                    $('.reg [name=repassword]').val('');
                    $('#to_login').click();
                }
            })
        })
    })
    $('.login .layui-form').on('submit', function (e) {
        // 取消form表单的默认跳转
        e.preventDefault();
        // 注册登陆事件
        $('#login_btn').on('click', function () {
            var username = $('.login [name=username]').val().trim();
            var password = $('.login [name=password]').val().trim();
            $.ajax({
                type:'post',
                url:'/api/login',
                data:{
                    username:username,
                    password:password
                },
                success:function(res){
                    if(res.status != 0){
                        return layer.msg('账号或密码有误!')
                    }
                    $('.login [name=username]').val('');
                    $('.login [name=password]').val('');
                    layer.msg('登录成功啦!')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                    // localStorage.setItem('token', res.token);
                    // 跳转到后台主页
                    location.href = '/大事件/index.html'
                    
                }
            })
        })
    })

})