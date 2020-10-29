//开发环境地址
var baseUrl='http://ajax.frontend.itheima.net'
//测试环境地址
//生产环境地址

$.ajaxPrefilter(function(options){
    options.url=baseUrl+options.url
    //console.log(  options.url);


//对需要权限的接口配置头信息
//必须以my开头才行
    if(options.url.indexOf('/my/')!==-1){
        options.headers={
            Authorization:localStorage.getItem('token')||""//''是啥意思？
           }
    }
   //拦截所有响应，判断身份认证信息
   options.complete=function(res){
       //console.log(res);
      var obj=res.responseJSON
       if(obj.status==1&&obj.message=="身份认证失败！"){
           //清空本地token
           localStorage.removeItem('token')
           //页面跳转
           location.href="/login.html"
       }
   }
})