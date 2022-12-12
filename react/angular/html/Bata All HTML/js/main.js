$(document).ready(function(){
	$(".post-reply a").click(function(e){
		e.preventDefault();
		$(this).parents(".post-count").siblings(".reply-box").slideToggle();
	})

});

