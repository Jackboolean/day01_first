//开发环境地址
var baseUrl='http://ajax.frontend.itheima.net'
//测试环境地址
//生产环境地址

$.ajaxPrefilter(function(options){
    options.url=baseUrl+options.url
    //console.log(  options.url);
})