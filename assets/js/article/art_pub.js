$(function(){
    var layer=layui.layer
    var form=layui.form

    initCate()
    initEditor()
    function  initCate() {
     $.ajax({
         type:'get',
         url:'/my/article/cates',
         success:function(res){
         if(res.status!==0){
             return layer.msg(res.message)
         }
         var htmlStr=template("tpl-cate",res)
         $('[name=cate_id]').html(htmlStr)
         //一开始执行的时候是空的，然后加入数据之后局部渲染一下
         form.render()
     }
    })
    }

      // 1. 初始化图片裁剪器
        var $image = $('#image')
        
        // 2. 裁剪选项
        var options = {
          aspectRatio: 400 / 280,
          preview: '.img-preview'
        }
        
        // 3. 初始化裁剪区域
        $image.cropper(options)

        $('#btnChooseImage').on('click',function(){
            $('#coverFile').click()
        })

        $('#coverFile').change(function(e){
            //拿到用户选择的文件
            var file=e.target.files[0]//结果出来是数组吗？自己写的时候打印一下
            //非空校验，URL.createObjectURL()里面传入的参数不能为空
            if(file==undefined){
                return
            }
            //根据选择的文件，临时给该文件创建一个url地址
            var newImgURL = URL.createObjectURL(file)
            //先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域
            $image
              .cropper('destroy')      // 销毁旧的裁剪区域
              .attr('src', newImgURL)  // 重新设置图片路径
              .cropper(options)        // 重新初始化裁剪区域
        })

        //6.设置状态
        var state="已发布"

        // $('#btnSave1').on('click',function(){
        //     state="已发布"
        // })

        $('#btnSave2').on('click',function(){
            state="草稿"
        })

        //7.添加文章
        $('#form-pub').on('submit',function(e){
            e.preventDefault()
            //创建new FormData对象
            var fd=new FormData(this)
            fd.append('state',state)
            //生成图片是一个异步操作，生成图片之后才进行ajax请求
            $image
                .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                  width: 400,
                  height: 280
                })
                .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                  // 得到文件对象后，进行后续的操作
                  fd.append('cover_img',blob)
                  publishArticle(fd)
                  //拓展运算符，得出的数据是数组,使用遍历也行
                  //console.log(...fd);
                })
        })

        function publishArticle(fd){
            $.ajax({
                type:'POST',
                url:'/my/article/add',
                data:fd,
                processData:false,
                contentType:false,
                success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg('文章发布成功')
                //location.href="/article/art_list.html"
                setTimeout(function(){
                    window.parent.document.getElementById('art_list').click()
                },1500)
            }
                
            })
        }
       
})