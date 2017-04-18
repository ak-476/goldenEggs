$.extend({'queryByName':function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
		var r = window.location.search.substr(1).match(reg); 
		return  r==null ? null : unescape(r[2]); 
	}
});

$.extend({'setCookie':function(key,value){
		$.cookie(key,value,{expires:1,path:'/'});
	}
});