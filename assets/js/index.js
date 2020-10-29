$(function(){
    getUserInfo()
    //点击退出退出主页面
    var layer=layui.layer//倒不倒无所谓，本来就有
    $('#btnLogout').on('click',function(){
        layer.confirm('是否退出?', {icon: 3, title:'提示'}, function(index){
           //清空本地的token
           localStorage.removeItem('token')
            //页面跳转到登录页面
            location.href="/login.html"
            //关闭询问框
            layer.close(index);
          });
    })
})







//获取用户信息必须封装成全局函数，写在入口函数之外
//后需要用这个函数，所以是全局
function getUserInfo(){
   $.ajax({
       url:'/my/userinfo',
    //    headers:{
    //     Authorization:localStorage.getItem('token')||""//''是啥意思？
    //    },
       success:function(res){
       //console.log(res);
       //判断状态
       if(res.status!==0){
           return layui.layer.msg(res.message)
       }
       //请求成功,渲染用户头像
       renderAvatar(res.data)
       }
   })
}

//封装用户头像渲染函数
function renderAvatar(user){
    //1.用户名，先渲染昵称，没有的话渲染用户名
  var name=user.nickname||user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;'+name) 
  //2.用户头像
  if(user.user_pic!==null){
      //2.1 如果头像不为空，是有头像的，则渲染头像，一旦渲染头像完成之后文本头像就不能再次使用了
      $('.layui-nav-img').show().attr('src',user.user_pic)
      $('.user-avater').hide()
  } else {
      //如果头像为空，那么文本头像显示，图片头像隐藏
    $('.layui-nav-img').hide()
    var text=name[0].toUpperCase()
    $('.user-avater').show().html(text)
  }
}