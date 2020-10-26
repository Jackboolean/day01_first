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


    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'http://ajax.frontend.itheima.net/api/reguser',
            data:{
                username:$('.reg-box input[name=username]').val(),
                password:$('.reg-box input[name=password]').val()
            },
            success:function(res){
                if(res.status!=0){
                     return alert(res.message)
                }
                alert(res.message)
            }
        })
    })
})