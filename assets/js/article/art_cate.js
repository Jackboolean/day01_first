$(function(){
    var layer=layui.layer
    var form=layui.form

    //初始化文章列表展示,从后台获得数据将已经存储的文章列表渲染到页面
     initArtCateList()
    function initArtCateList(){
    $.ajax({
        type:'GET',
         url:'/my/article/cates',
         success:function(res){
         // console.log(res);
         //传入的是对象，占坑的是对象里面的属性
        var str =template("tpl-art-cate",res)
        //console.log(str);
        $('tbody').html(str)
             }
    })
}

//点击添加弹出弹出层
var indexAdd=null//为了后面关闭弹出层
$('#btnAddCate').on('click',function(){
    indexAdd= layer.open({//全局的
        type:1,
        area: ['500px', '260px'],
        title: '添加文章分类',
        content: $('#dialog-add').html()
      });     
        
})

//弹出添加文章弹出层，提交文章分类添加（事件委托）

$('body').on('submit','#form-add',function(e){
    e.preventDefault()
    $.ajax({
        type:'POST',
        url:'/my/article/addcates',
        data:$(this).serialize(),
        success:function(res){
          if(res.status!==0){
              return layer.msg(res.message)
          } 
          //添加成功之后再次获取后台更新之后的数据渲染到页面
          initArtCateList()
          layui.layer.msg('添加成功')
          //关闭弹出层
          layui.layer.close(indexAdd)
          

        }
    })

})

//修改文章分类添加（事件委托）。弹出修改文章弹出层
//点击编辑弹出修改文章弹出层
var indexEdit=null
$('tbody').on('click','.btn-edit',function(){
    indexEdit= layer.open({//全局的
        type:1,
        area: ['500px', '260px'],
        title: '修改文章分类',
        content: $('#dialog-edit').html()
      }); 
      //获取当前点击编辑按钮获得当前分类Id
      var Id=$(this).attr('data-id')
     $.ajax({
         type:'get',
         url:'/my/article/cates/'+Id,
         success:function(res){
             //打印Id会发现返回的Id是大写的
            //console.log(res);
             form.val('form-edit',res.data)
         }
})
        
})

//当修改对应的文章，之后进行提交
$('body').on('submit','#form-edit',function(e){
    e.preventDefault()
    $.ajax({
        type:'POST',
        url:'/my/article/updatecate',
        data:$(this).serialize(),
        success:function(res){
          if(res.status!==0){
              return layer.msg(res.message)
          } 
          //添加成功之后再次获取后台更新之后的数据渲染到页面
          initArtCateList()
          layui.layer.msg('修改成功')
          //关闭弹出层
          layui.layer.close(indexEdit)
          

        }
    })

})

//删除文章
$('tbody').on('click','.btn-delete',function(){
   var Id=$(this).attr('data-id')
   layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
    $.ajax({
        type:'get',
        url:'/my/article/deletecate/'+Id,
        data:$(this).serialize(),
        success:function(res){
          if(res.status!==0){
              return layer.msg(res.message)
          } 
          //删除成功之后再次获取后台更新之后的数据渲染到页面
          initArtCateList()
          layui.layer.msg('删除成功')
          //关闭弹出层
          layui.layer.close(index)
          

        }
    })

    
   
  });
    
})





})









