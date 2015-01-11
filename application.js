(function(sprite, color){
	var model = new sprite.editor.Model(20, 30);

	var canvas = document.getElementById('pixel-editor');
	var view = new sprite.editor.View(model, canvas);

	var controller = sprite.editor.controllerFor(model, view, canvas);
	canvas.addEventListener('mousedown', controller.startDrawing.bind(controller));
	canvas.addEventListener('mouseup', controller.stopDrawing.bind(controller));

	var preview  = document.getElementById('pixel-preview');
	var previewView = new sprite.preview.View(model, preview);

	var usage = new color.Usage();
	model.forEachPixel(function(x, y, color){ usage.register(color); });
	model.on('paint', function(x, y, color){
		usage.register(color);
	});

	var usageContainer = document.getElementById('color-usage');
	new color.UsageView(usage, usageContainer, function(element){
		element.classList.add('used', 'color');
		element.style.backgroundColor = element.getAttribute('data-entry');
	    element.addEventListener('click', function(){
		console.log('called');
		model.changeBrushColor(element.getAttribute('data-entry'));
	    });
	});
})(sprite, color);
