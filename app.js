var canvas = new fabric.Canvas("canvas");
document.getElementById("uploader").onchange = function (e) {
	var reader = new FileReader();
	reader.onload = function (e) {
		var image = new Image();
		image.src = e.target.result;
		image.onload = function () {
			var img = new fabric.Image(image);
			img.set({
				left: 50,
				top: 0,
			});
			img.scaleToWidth(400);
			canvas.add(img).setActiveObject(img).renderAll();
		};
	};
	reader.readAsDataURL(e.target.files[0]);
};

canvas.on("mouse:wheel", function (opt) {
	var delta = opt.e.deltaY;
	var zoom = canvas.getZoom();
	zoom *= 0.999 ** delta;
	if (zoom > 20) zoom = 20;
	if (zoom < 0.01) zoom = 0.01;
	canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
	opt.e.preventDefault();
	opt.e.stopPropagation();
});
