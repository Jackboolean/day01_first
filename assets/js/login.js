$(function() {
    //1.点击
    $('#link_reg').on('click',function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //2.
    $('#link_login').on('click',function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //3.自定义验证规则
    var form=layui.form
   
    //引用layui.all.js，form是layui.all.js封装的方法，打印出来的是对象
    // console.log(layui);
    form.verify({//verify是form对象里面的属性
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          repwd:function(value){
              var pwd=$('.reg-box input[name=password]').val()
             
              if(value!==pwd){
                 return alert('2次密码输入不一致')
              }
          }
    })
   //注册
    var layer=layui.layer
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/api/reguser',
            data:{
                username:$('.reg-box input[name=username]').val(),
                password:$('.reg-box input[name=password]').val()
            },
            success:function(res){
                if(res.status!=0){
                     return layer.msg(res.message)
                }
               layer.msg('注册成功请登录')
               //注册介绍，自动触发登录页面，让登录页面显示
               $('#link_login').click()
               //再清空注册内容，reset() 是原生方法
               $('#form_reg')[0].reset()

            }
        })
    })
    //登录
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
              
                if(res.status!=0){
                     return layer.msg(res.message)
                }
               layer.msg('恭喜你，登录成功')
               //保存token，未来使用接口需要这个信息来判断是否给权限
               localStorage.setItem('token',res.token)
               //保存接口权限之后跳转到主界面
               location.href="/index.html"
               
      

            }
        })
    })











})