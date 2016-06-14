var amount_of_windows = 1;
var urlArr = ["block"];

var skipCamera = [7, 8, 10, 18, 28, 41, 43, 47, 59, 83, 84,
				  64, 66, 67, 68, 69, 71, 73, 97, 111,
				  112, 113, 117, 128, 137, 144, 151,
				  154, 155, 156, 159, 160, 161, 162,
				  168, 100, 121, 140, 163, 174, 178, 
				  185, 188, 189, 190, 195, 196, 197,
				  198, 199, 200, 201, 202, 203, 204, 
				  205, 206, 207, 208, 209, 210, 211, 
				  212, 213, 216, 217, 218, 231, 232,
				  233, 236, 237, 238, 245, 246, 259,
				  260, 261, 262, 263, 218, 281, 296,
				  297, 298, 299, 300, 301, 310, 315,
				  318, 326, 327, 290, 332, 337, 338,
				  339, 340, 341, 342, 343, 345, 352,
				  354, 355, 292];

var row = 0;
var col = 0;

function containing(array, needle) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] == needle)
			return true;
	}
	return false;
}

function AddWindow(inp, text = "", index = 0) {
	row++;
	var style;
	if ( amount_of_windows <= 7) {
		style = "top: " + (row * 2);
	} else {
		style = "left: " + (354 * col) + "; top: " + ((-1678 * col) + (row * 2));
	}
	$('<div>', {
		id: amount_of_windows + '_div',
		width: "400px",
		style: style
	}).appendTo('body');
	$('#' + amount_of_windows + '_div').draggable();
	var src;
	if (text !== "") {
		src = text;
		console.log(index + ' -> ' + amount_of_windows + '_div');
	} else {
		src = document.getElementById(inp).value;
	}
	$('<img>', {
		src: src,
		id: amount_of_windows,
		width: "352px",
		height: "240px",
		alt: index,
		onerror: "this.src='http://2.bp.blogspot.com/-oY-N3_OE7PM/U285xXW7QDI/AAAAAAAABHQ/xaYFTkE-27Y/s1600/Traffic_Camera.jpg';",
		frameborder: 0
	}).appendTo('#' + amount_of_windows + '_div');
	urlArr.push(src);
	amount_of_windows += 1;
	if (row >= 7) {
		row = 0;
		col++;
	}
}

function ReloadImages() {
	for (var i = 1; i <= amount_of_windows; i++) {
		$('#' + i).attr("src", urlArr[i] + "?rand=" + Math.random());
	}
}

function loadJson() {
	$.get("https://gist.githubusercontent.com/kuanb/dbe19ce4e8ef317ee3fc/raw/8dd002cc26f7076eed84f0104bbc70eb1117b9f9/traffic-cameras.json", function(data) {
		var jsonObj = JSON.parse(data);
		for (var i = 0; i < 356; i++) {
			if (containing(skipCamera, i)) continue;
			AddWindow('', jsonObj[i].camera, i);
		}
		console.log(jsonObj);
	});
}

setInterval(ReloadImages, 10000);
setTimeout(loadJson, 2500);
