var s = new SplashAPI();

$(document).ready(function() {
	s.getRandomPhoto(function(photo) {
		var container = $(".image-container");
		container.css("background-image", "url(" + photo.url + ")");
		container.attr("photo-id", photo.id);
	});

	$("#tag").keydown(function() {
		var field = $(this);
		if (event.keyCode == 13) {
			$.post("", { photo_id: $(".image-container").attr("photo-id"), photo_tag: field.val() })
			 .success(function(data) {
			 	field.val("");
			 	s.getRandomPhoto(function(photo) {
					var container = $(".image-container");
					container.css("background-image", "url(" + photo.url + ")");
					container.attr("photo-id", photo.id);
				});
			 });
		}
	});
});