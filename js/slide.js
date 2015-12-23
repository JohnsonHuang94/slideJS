var slide = (function(){
	function hasClass( elements,cName ){    
	    return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") );   
	};    
	function addClass( elements,cName ){    
	    if( !hasClass( elements,cName ) ){    
	        elements.className += " " + cName;    
	    };    
	};    
	function removeClass( elements,cName ){    
	    if( hasClass( elements,cName ) ){    
	        elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ), " " );  
	    };    
	}; 
	
	function index(a,p){
		for (var i = 0; i < p.length; i++) {
				if(p[i]===a){
					var pos =  i;
				}
		};
		return pos;
	}
	var slideFn = function(id,t){
		var nowIndex = 0;
		var time = 0;
		var imgDiv = document.querySelector(id);
		var btn = imgDiv.getElementsByTagName("div");
		var pre = imgDiv.querySelector("#slide-pre-btn");
		var next = imgDiv.querySelector("#slide-next-btn");
		var imgs = imgDiv.getElementsByTagName('img');
		var imgWidth = imgs[0].offsetWidth;
		var imgHeight = imgs[0].offsetHeight;
		imgDiv.style.width = imgWidth + "px";
		imgDiv.style.height = imgHeight + "px";
		function init(){
			for (var i = 0; i < imgs.length; i++) {
				(function(i){
					imgs[i].style.left = imgWidth*i +"px";
				})(i)
			};
			addClass(imgs[0],"on");
		}
		function reverseInit(){
			for (var i = 0; i < imgs.length; i++) {
				(function(i){
					imgs[i].style.left = imgWidth*(i-(imgs.length-1)) +"px";
				})(i)
			};
			var imgOn = imgDiv.querySelector(".on");
			removeClass(imgOn,"on");
			addClass(imgs[imgs.length-1],"on");
		}
		init();
		function junper(){
			nowIndex++;
			var imgOn = imgDiv.querySelector(".on");
			if(nowIndex>imgs.length-1){
				nowIndex =0;
				for (var i = 0; i < imgs.length; i++) {
					(function(i){
						imgs[i].style.left = imgWidth*i +"px";
					})(i)
				};
				removeClass(imgOn,"on");
				addClass(imgs[0],"on");
			}else{
				for (var i = 0; i < imgs.length; i++) {
						(function(i){
							var nowLeft = parseInt(imgs[i].style.left,10);
							imgs[i].style.left = nowLeft - imgWidth +"px";
							if(nowLeft === imgWidth){
								removeClass(imgOn,"on");
								addClass(imgs[i],"on");
							}
						})(i)
					};
			}
		}
		time = setInterval(junper,3000);
		imgDiv.onmouseover = function(){	
			clearInterval(time);		
			for (var i = 0; i < btn.length; i++) {
				(function(i){
					btn[i].style.display = "block";
				})(i)
			};
		}
		imgDiv.onmouseout = function(){
			time = setInterval(junper,3000)
			for (var i = 0; i < btn.length; i++) {
				(function(i){
					btn[i].style.display = "none";
				})(i)
			};
		}
		if(pre.attachEvent){
			pre.attachEvent("click",function(){
				var imgOn = imgDiv.querySelector(".on");
				var imgOnIndex = index(imgOn,imgs);
				if(imgOnIndex === 0){
					reverseInit();
				}else{
					for (var i = 0; i < imgs.length; i++) {
						(function(i){
							var nowLeft = parseInt(imgs[i].style.left,10);
							imgs[i].style.left = nowLeft + imgWidth +"px";
							if(nowLeft === -imgWidth){
								removeClass(imgOn,"on");
								addClass(imgs[i],"on");
							}
						})(i)
					};
				}
			})
			next.attachEvent("click",junper)
		}else{
			pre.addEventListener("click",function(){
				var imgOn = imgDiv.querySelector(".on");
				var imgOnIndex = index(imgOn,imgs);
				if(imgOnIndex === 0){
					reverseInit();
				}else{
					for (var i = 0; i < imgs.length; i++) {
						(function(i){
							var nowLeft = parseInt(imgs[i].style.left,10);
							imgs[i].style.left = nowLeft + imgWidth +"px";
							if(nowLeft === -imgWidth){
								removeClass(imgOn,"on");
								addClass(imgs[i],"on");
							}
						})(i)
					};
				}
			})
			next.addEventListener("click",junper);
		}
	}
	return {
		slideFn: slideFn
	}
})()