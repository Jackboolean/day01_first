$(function(){
    var form=layui.form 
    form.verify({
        //密码正则判断
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        samePwd:function(value){
            if(value===$('[name=oldPwd]').val()){
                return '新旧密码不能相同'
            }
        },
          //确认密码需要和新密码一致
          rePwd:function(value){
            if(value!==$('[name=newPwd]').val()){
                return '2次密码输入不一致'
            }
        }

    })


    //表单提交
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})