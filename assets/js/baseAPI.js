// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // 判断是否需要权限的请求
    if( options.url.indexOf('/my/') != -1){
      // 统一拼接headers请求头
      options.headers = { Authorization: localStorage.getItem('token') || ''};
      // 统一设置complete函数
      options.complete = function(res){
        // console.log(res);
        // 当没有登录访问或直接错误登录时
        if(res.responseJSON.status != 0 && res.responseJSON.message == '身份认证失败！'){
        //  强制清空token
          localStorage.removeItem('token');
          // 返回登录界面
          location.href = '/大事件/login.html';
        }
      }
    }
  })