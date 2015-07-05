(function($){
	$.fn.drag3d = function (options){
		var options = $.extend($.fn.drag3d.defaults,options);
		var $dragEle = $(this);
		// --------------------
		var x = 0;
		var lastX = 0;
		var speed = 0;
		var timer = null;
		
		// 预加载
		var preload = function (){
			for(var i=0;i<options.amount;i++){
				$(".img-onload").append("<div class='imgbg'></div>");
				$(".imgbg").eq(i).css({
					"background-image":"url("+options.imgUrl+"/"+i+"."+options.suffix+")"
				});
			}
		}();

		function move(){
			if(speed > 0){
				speed--;
			}else{
				speed++;
			}
			if(speed == 0){
				clearInterval(timer);
			}

			var count = parseInt(-x/10);
			if(count > 0){
				count = count%options.amount;
			}else{
				count += -Math.floor(count/options.amount)*options.amount;
			}
			$dragEle.css({
				"background-image":"url("+options.imgUrl+"/"+count+"."+options.suffix+")"
			});
		}

		var phone = navigator.userAgent.indexOf('Mobile') != -1 ? true : false;
		var downEvent = phone ? "touchstart" : "mousedown";
		var moveEvent = phone ? "touchmove" : "mousemove";
		var upEvent = phone ? "touchend" : "mouseup";

		var drag = function (){
			$dragEle.bind(downEvent, function (e){
				var _event = e || event;
				if(phone){
					_event.preventDefault();
					var eClienX = _event.touches[0].clientX;
				}else{
					var eClienX = _event.clientX;
				}
				var mouseX = eClienX - x; // 鼠标位置
				$dragEle.css({cursor:"move"});
				clearInterval(timer);
				$(document).bind(moveEvent, function (e){
					var _event = e || event;
					if(phone){
						_event.preventDefault();
						var eClienX = _event.touches[0].clientX;
					}else{
						var eClienX = _event.clientX;
					}
					x = eClienX - mouseX;
					move();

					speed = x - lastX;
					lastX = x;

					return false;
				}).bind(upEvent, function (){
					$(document).unbind(moveEvent);
					$(document).unbind(upEvent);
					$dragEle.css({cursor:"auto"});

					timer = setInterval(function (){
						x += speed;
						move();
					},30);
				});

				return false;
			});
		}();
		return $dragEle;
	};
	$.fn.drag3d.defaults = {
		amount:8,	              // 数量
		imgUrl:"images",          // 图片存放路径
		suffix:"png"              // 图片后缀名
	}
})(Zepto);