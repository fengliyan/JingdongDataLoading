$(function(){
  var $ul=$("ul.product-list");
  var num=0;
  /*从文件中读取数据，要开个服务器*/
  loadData($ul,num);

	/*点击菜单图标隐藏和展现*/
	$("header .menu").click(function(){
		$("header .nav").toggleClass("hide");
	});
	/*点击回到顶部图标*/
	$("div.back-top").click(function(){
		$(window).scrollTop(0);
	});

    
  /*绑定scroll事件*/
  $(window).on("scroll",function(){
    	/*如果鼠标滚动位置大于100，隐藏header，出现back-top*/
    	if($(window).scrollTop()>400){
    		$("header").addClass("hide");
    		$("div.back-top").removeClass("hide");
    	}
    	/*如果鼠标滚动位置小于100，header出现，不出现back-top*/
    	else{
    		$("header").removeClass("hide");
    		$("div.back-top").addClass("hide");
    	}
    	/*鼠标滚动位置在此高度时，滚动到底端，加载数据；
        $(document).height()整个页面的高度；$(window).height()可视区域的高度*/
    	if($(window).scrollTop()>=$(document).height()-$(window).height()){
    		if(++num<3)
    			loadData($ul,num);
    		else{
          console.log("数据加载完毕"+$("ul").find("li").length);
    		}
    	}
  })


	function loadData($ele,num){
	/*开始加载的时候loading出现*/
  $(".loading").removeClass("hide");
	 $.ajax({
		url:'json_data/data'+num+'.json',
		success:function(data){
			/*console.log(data);*/
            var str="";
            /*遍历处理data,function()的两个参数：index item*/
            $.each(data,function(index,item){
            	/*console.log(item);*/
            	str+=[
                   '<li class="col-xs-6"><a href="http://www.baidu.com">',
                   '<div>',
                   '<img src="'+item.url+'" style="width:200px;height:200px;">',
                   '</div>',
                  '<div class="price">',
                 '<p>'+item.price+'</p>',
                 '</div>',
                 '<div class="desc">',
                 '<p>'+item.desc+'</p>',
                 '</div>',
                 '<div class="pingjia">',
                 '<p>'+item.pingjia+'</p>',
                 '</div>',
                '</a>',
                 '</li>'
            	].join('');
           
            });
           $ele.append(str);
           /*有个加载时间，500ms后loading效果消失*/
           setTimeout(function(){
           	$(".loading").addClass("hide");
           },500);
		},
		error:function(){
			alert("error");
		}
	});
	}

});