var canvas = new fabric.Canvas("canvas");
document.getElementById("uploader").onchange = function (e) {
	var reader = new FileReader();
	reader.onload = function (e) {
		var image = new Image();
		image.src = e.target.result;
		image.onload = function () {
			var img = new fabric.Image(image);
			img.set({
				left: 30,
				top: 10,
			});
			img.scaleToWidth(400);
			canvas.add(img).setActiveObject(img).renderAll();
		};
	};
	reader.readAsDataURL(e.target.files[0]);
};

canvas.on("mouse:wheel", function (opt) {
	let upperCanvas = document.querySelector(".upper-canvas");

	upperCanvas.animate({
		// easing: "easeInOutQuad",
		duration: 15000,
	});
	var delta = opt.e.deltaY;
	var zoom = canvas.getZoom();
	zoom *= 0.999 ** delta;
	if (zoom > 20) zoom = 20;
	if (zoom < 1) zoom = 1;
	if (delta < 0) {
		canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
	} else {
		canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
		var vpt = this.viewportTransform;
		if (zoom === 1) {
			vpt[4] = 200 - (1000 * zoom * 0.4) / 2;
			vpt[5] = 200 - (1000 * zoom * 0.4) / 2;
		} else {
			if (vpt[4] >= 0) {
				vpt[4] = 0;
			} else if (vpt[4] < canvas.getWidth() - 1000 * zoom * 0.4) {
				vpt[4] = canvas.getWidth() - 1000 * zoom * 0.4;
			}
			if (vpt[5] >= 0) {
				vpt[5] = 0;
			} else if (vpt[5] < canvas.getHeight() - 1000 * zoom * 0.4) {
				vpt[5] = canvas.getHeight() - 1000 * zoom * 0.4;
			}
		}
	}

	opt.e.preventDefault();
	opt.e.stopPropagation();
});
