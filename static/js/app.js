var after = 0;
var container = null;
var fetching = false;
var print = console.log

function percentWhiteHex(color) {
	var groups = color.match(/#?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})/)
	return ((parseInt(groups[1], 16) + parseInt(groups[2], 16) + parseInt(groups[3], 16)) / (255 * 3) * 100)
}

function percentWhiteRGB(color) {
	var groups = color.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})(, ?\d)?\)/)
	console.log(groups)
	return ((parseInt(groups[1]) + parseInt(groups[2]) + parseInt(groups[3])) / (255 * 3) * 100)
}

function fetchPhotos() {
	if (fetching) return;
	fetching = true;

	//$.get("http://localhost:5000/photos/v1.0/list?count=5&after=" + after)
	$.get("https://splashapi.herokuapp.com/photos/v1.0/list?count=5&after=" + after)
	 .success(function(data) {
		$.each(data, function(index, element) {
			var image_container = $("<div></div>");
			image_container.addClass("image-container");
			image_container.css({ background: element.photo.color });

			var fader = $("<div></div>");
			fader.addClass("fader");
			fader.css({ background: element.photo.color });

			var author = $("<div></div>");
			var author_name = $("<div></div>"), author_url = $("<a></a>");

			author.addClass("author-info");
			author_name.text(element.author.name);
			author_url.text(element.author.url);
			author_url.attr("href", "https://unsplash.com" + element.author.url);

			if (percentWhiteHex(element.photo.color) < 55) {
				author_name.css("color", "floralwhite");
				author_url.css("color", "floralwhite");

				author_url.css("border-bottom", "1px dotted floralwhite");
			} else {
				author_name.css("color", "#2B303B");
				author_url.css("color", "#2B303B");

				author_url.css("border-bottom", "1px dotted #2b303b");
			}

			author.append(author_name);
			author.append(author_url);

			var image = $("<img>");

			image.addClass("image");
			image.attr("id", element.id);
			image.attr("src", element.photo.url);
			image.load(function() { $(this).css({ opacity: 1 }); });
			
			image_container.append(fader);
			image_container.append(author);
			image_container.append(image);

			container.append(image_container);
		});

		after = data[data.length - 1].id;
		fetching = false;	
	 }).error(function() {
	 	console.log("error");
	 	fetching = false;
	 });
}

$(document).ready(function() { container = $("body"); fetchPhotos(); });
$(document).scroll(function() {
	var offset = document.body.offsetHeight - window.pageYOffset - window.innerHeight;
	if (offset < 750) fetchPhotos(); 
});