var baseURL = "https://splashapi.herokuapp.com";
var randomURL = "/photos/v1.0/random";
var listURL = "/photos/v1.0/list?count={%count}&after={%after}";
var imageURL = "/photos/v1.0/image/{%id}";

function SplashAPI() {}

SplashAPI.prototype.getRandomPhoto = function(success) {
	var httpRequest = new XMLHttpRequest();
	var url = baseURL + randomURL;

	httpRequest.addEventListener("load", function() {
		if (this.status == 200 && success) success(JSON.parse(this.responseText));
	}, false);

	httpRequest.open("GET", url, true);
	httpRequest.send();
};

SplashAPI.prototype.getPhoto = function(imageId, success) {
	var httpRequest = new XMLHttpRequest();
	var url = baseURL + imageURL.replace("{%id}", imageId);

	httpRequest.addEventListener("load", function() {
		if (this.status == 200 && success) success(JSON.parse(this.responseText));
	}, false);

	httpRequest.open("GET", url, true);
	httpRequest.send();
};

SplashAPI.prototype.getPhotos = function(count, after, success) {
	var httpRequest = new XMLHttpRequest();
	var url = baseURL + listURL.replace("{%count}", count)
								 .replace("{%after}", after);

	httpRequest.addEventListener("load", function() {
		if (this.status == 200 && success) success(JSON.parse(this.responseText));
	}, false);

	httpRequest.open("GET", url, true);
	httpRequest.send();
};