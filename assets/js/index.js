$(function () {
    getuser();
    $('#btnLogout').on('click',function(){
        console.log(111);
        layui.layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
            //  强制清空token
          localStorage.removeItem('token');
          // 返回登录界面
          location.href = '/大事件/login.html';
            layer.close(index);
          });
    })
})

function getuser() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            if (res.status == 1) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data);
        }
    })
}
function renderAvatar(user){
    var name = user.nickname || user.username;
    $('.welcome').html('欢迎&nbsp;&nbsp' + name);
    if(user.user_pic != null){
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide();
    }else {
        $('.text-avatar').text(name[0].toUpperCase()).show();
        $('.layui-nav-img').hide();
    }
    
    
}