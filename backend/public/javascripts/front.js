function httpGetAsync(theUrl, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			callback(xmlHttp.responseText);
	};
	xmlHttp.open('GET', theUrl, true);
	xmlHttp.send(null);
}

function httpPostAsync(url, message, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			callback(xmlHttp.responseText);
	};
	xmlHttp.open('POST', url, true);
	xmlHttp.setRequestHeader(
		'Content-type',
		'application/x-www-form-urlencoded'
	);
	xmlHttp.send(message);
}
