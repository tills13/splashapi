var after = 0;
var container = null;
var fetching = false;
var s = new SplashAPI();

function percentWhiteHex(color) {
	var groups = color.match(/#?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})/)
	return ((parseInt(groups[1], 16) + parseInt(groups[2], 16) + parseInt(groups[3], 16)) / (255 * 3) * 100)
}

function percentWhiteRGB(color) {
	var groups = color.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})(, ?\d)?\)/)
	return ((parseInt(groups[1]) + parseInt(groups[2]) + parseInt(groups[3])) / (255 * 3) * 100)
}

function fetchPhotos() {
	if (fetching) return;
	fetching = true;

	s.getPhotos(5, after, function(photos) {
<<<<<<< HEAD
		$.each(photos, function(index, photo) {
			var image_container = $("<div></div>");
			image_container.addClass("image-container");
			image_container.attr("id", photo.id);
			image_container.css({ background: photo.color });

			var fader = $("<div></div>"), image_info = $("<span></span>");
			fader.addClass("fader");
			fader.css({ background: photo.color });
			image_info.addClass("image-info");
			image_info.text("#" + photo.id);

			var author = $("<div></div>");
			var author_name = $("<div></div>"), author_url = $("<a></a>");

			author.addClass("author-info");
			author_name.text(photo.author.name);
			author_url.text(photo.author.url);
			author_url.attr("href", "https://unsplash.com" + photo.author.url);

			if (percentWhiteHex(photo.color) < 55) {
				author_name.css("color", "floralwhite");
				author_url.css("color", "floralwhite");
				image_info.css("color", "floralwhite");

				author_url.css("border-bottom", "1px dotted floralwhite");
			} else {
				author_name.css("color", "#2B303B");
				author_url.css("color", "#2B303B");
				image_info.css("color", "#2B303B");

				author_url.css("border-bottom", "1px dotted #2b303b");
			}

			author.append(author_name);
			author.append(author_url);

			var image = $("<img>");

			image.addClass("image");
			image.attr("src", photo.url);
			image.load(function() { $(this).css({ opacity: 1 }); });
			
			image_container.append(fader);
			image_container.append(image_info);
			image_container.append(author);
			image_container.append(image);

			container.append(image_container);
=======
		$("#loader").fadeOut("slow", function() {
			$.each(photos, function(index, photo) {
				var image_container = $("<div></div>");
				image_container.addClass("image-container");
				image_container.attr("id", photo.id);
				image_container.css({ background: photo.color });

				var fader = $("<div></div>"), image_info = $("<span></span>");
				fader.addClass("fader");
				fader.css({ background: photo.color });
				image_info.addClass("image-info");
				image_info.text("#" + photo.id);

				var author = $("<div></div>");
				var author_name = $("<div></div>"), author_url = $("<a></a>");

				author.addClass("author-info");
				author_name.text(photo.author.name);
				author_url.text(photo.author.url);
				author_url.attr("href", "https://unsplash.com" + photo.author.url);

				if (percentWhiteHex(photo.color) < 55) {
					author_name.css("color", "floralwhite");
					author_url.css("color", "floralwhite");
					image_info.css("color", "floralwhite");

					author_url.css("border-bottom", "1px dotted floralwhite");
				} else {
					author_name.css("color", "#2B303B");
					author_url.css("color", "#2B303B");
					image_info.css("color", "#2B303B");

					author_url.css("border-bottom", "1px dotted #2b303b");
				}

				author.append(author_name);
				author.append(author_url);

				var image = $("<img>");

				image.addClass("image");
				image.attr("src", photo.url);
				image.load(function() { $(this).css({ opacity: 1 }); });
				
				image_container.append(fader);
				image_container.append(image_info);
				image_container.append(author);
				image_container.append(image);

				container.append(image_container);
			});
>>>>>>> 5e6840e5b8de1e1a4f07cd435191f45f5ec9d5c5
		});

		after = photos[photos.length - 1].id;
		fetching = false;
	});
}

$(document).ready(function() { 
	container = $("body");
	fetchPhotos();
});

$(document).scroll(function() {
	var offset = document.body.offsetHeight - window.pageYOffset - window.innerHeight;
	if (offset < 750) fetchPhotos(); 
});