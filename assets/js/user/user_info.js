$(function(){
    //1.使用正则表达式验证用户更改的信息是否符合要求
    var form=layui.form
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return "昵称长度为 1~6 位之间"
            }
        }
    })

    //2.获取用户信息
    initUserInfo()
    function initUserInfo(){
        // var form=layui.form
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            success:function(res){
                console.log(res);
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                //将用户信息渲染到form表单中
                //console.log(res);
              //渲染位置，渲染数据
                form.val('formUserInfo',res.data)
            }
        })
    }
    //重置按钮
    $('#btnReset').on('click',function(e){
        //阻止重置
        //重新用户渲染
        e.preventDefault()
        initUserInfo()

    })

    //修改用户信息
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('用户信息修改失败')
                }
                //调用父页面中更新用户的信息和头像的方法
                window.parent.getUserInfo()
            }
        })
    })






})