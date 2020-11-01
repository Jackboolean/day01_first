$(function(){
    var layer=layui.layer
    var form=layui.form

    //3.template定义时间过滤器,有点不熟悉
    template.defaults.imports.dateFormat=function(dtStr){
        var dt=new Date(dtStr)

        var y=dt.getFullYear()
        var m=padZero(dt.getMonth()+1)
        var d=padZero(dt.getDate())

        var hh=padZero(dt.getHours())
         var mm=padZero(dt.getMinutes())
         var ss=padZero(dt.getSeconds())

         return y+'-'+m+'-'+d+'  '+hh+':'+mm+':'+ss
        
    }
    //补0
    function padZero(n){
        return n>9? n:'0'+n
    }
    

    //1.定义提交参数q是query的意思
    var q={
        pagenum:1,//页码值
        pagesize:2,//	每页显示多少条数据
        cate_id:'',//	文章分类的 Id
        state:'' //	文章的状态，可选值有：已发布、草稿
    }
 //2.初始化文章列表
   initTable()
   function initTable(){
    $.ajax({
        type:'get',
        url:'/my/article/list',
        data:q,
        success:function(res){
           // console.log(res);
        if(res.status!=0){
             return layer.msg(res.message)
        }
         var str=template('tpl-table',res)
         //console.log(str);
        $('tbody').html(str)
        renderPage(res.total)
    }
   })
   }

   //4.渲染文章类别
   initCate()
   function  initCate() {
    $.ajax({
        type:'get',
        url:'/my/article/cates',
        success:function(res){
        if(res.status!=0){
            return layer.msg(res.message)
        }
        var htmlStr=template("tpl-cate",res)
        $('[name=cate_id]').html(htmlStr)
        //一开始执行的时候是空的，然后加入数据之后局部渲染一下
        form.render()
    }
   })
   }

   //5.筛选功能
   $('#form-search').on('submit',function(e){
          e.preventDefault()
          //获取填入的值
          var cate_id=$('[name=cate_id]').val()
          var state=$('[name=state]').val()
          //给q重新赋值
          q.cate_id=cate_id
          q.state=state
          //初始化文章列表
           initTable()
   })
   //6.分页
   var laypage=layui.laypage
   function renderPage(total){
       //console.log(total);
        //执行一个laypage里面的方法render
       laypage.render({
        elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
        count: total ,//数据总数，从服务端得到
        limit:q.pagesize,//每页显示的条数
        curr:q.pagenum,//	起始页
        layout:	['count','limit','prev', 'page', 'next','skip'],
        limits:[2, 3, 5, 10, 15],
        //触发jump：分页初始化的时候，页面改变的时候
        jump: function(obj, first){
            //obj包含了当前分页的所有参数，比如：
            console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            console.log(obj.limit); //得到每页显示的条数
            
            //首次不执行,这个需要看一下，不是太理解
            if(!first){
                q.pagenum=obj.curr
                q.pagesize=obj.limit
                initTable()
            }
          }

      });

   }

   //7.删除
   $('tbody').on('click','.btn-delete',function(){
       //获取当前点击的id
       var id=$(this).attr('data-id')
       layer.confirm('确定删除吗?', {icon: 3, title:'提示'}, function(index){
        $.ajax({
            type:'GET',
            url:'/my/article/delete/'+id,
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                //删除，前端并不是真的删除，而是使用ajax进行数据覆盖
                //当前最后一个删除是1个，页面码大于1的时候
                if($('.btn-delete').length==1&&q.pagenum>1){
                    q.pagenum--
                }
                initTable()
                layer.msg('删除文章成功')
                layer.close(index);
           }
      });
   })
})




















})
