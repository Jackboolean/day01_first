$(function(){
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
      // 纵横比
      aspectRatio: 1,
      // 指定预览区域
      preview: '.img-preview'
    }
  
    // 1.3 创建裁剪区域
    $image.cropper(options)
    
    //2.选择文件
    $('#btnChooseImage').on('click',function(){
      $('#file').click()
    })

    //3.修改裁剪图片
    var layer=layui.layer
    $('#file').on('change',function(e){
      //console.log(e);
      var file=e.target.files[0]
      if(file===undefined){
        return layer.msg('请选择图片')
      }

      var newImgURL=URL.createObjectURL(file)
      $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
    })

    //4.上传头像
    $('#btnUpload').on('click',function(){
    //将上传的头像转换成base64 类型头像（字符串）
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      console.log(dataURL);
      console.log(typeof dataURL);
      $.ajax({
        type:'POST',
        url:'/my/update/avatar',
        data:{
          avatar:dataURL
        },
        success:function(res){
          if(res.status!==0){
            return layui.layer.msg(res.message)
          }
          layui.layer.msg('更换头像成功')
          //左上角头像进行同步更新
          window.parent.getUserInfo()
        }
      })
    })





})
