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
   

})