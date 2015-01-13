var after = 0;
var container = null;
var fetching = false;

function blah(color) {
	var r = 255, g = 255, b = 255;
	var groups = color.match(/#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})/)

	return { r: r - parseInt(groups[1], 16), g: g - parseInt(groups[2], 16), b: b - parseInt(groups[3], 16) }
}

function percentWhite(color) {
	var groups = color.match(/#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})/)
	return ((parseInt(groups[1], 16) + parseInt(groups[2], 16) + parseInt(groups[3], 16)) / (255 * 3) * 100)
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
			author.addClass("author-info");
			author.text(element.author.name);
			if (percentWhite(element.photo.color) < 50) author.css("color", "white");

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