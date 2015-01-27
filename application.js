(function(sprite, color){
  var model = new sprite.editor.Model(16, 16);

  [
    { 'id': 'decrease-row', 'callback': function(){ model.decreaseRows() } },
    { 'id': 'increase-row', 'callback': function(){ model.increaseRows() } },
    { 'id': 'decrease-column', 'callback': function(){ model.decreaseColumns() } },
    { 'id': 'increase-column', 'callback': function(){ model.increaseColumns() } },
  ].forEach(function(data){
    var element = document.getElementById(data.id);
    element.addEventListener('click', data.callback);
  });

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

  var picker = new color.picker.Model(0,0,0);

  picker.addWatch(document.getElementById('red'), 'red');

  picker.addWatch(document.getElementById('green'), 'green');

  picker.addWatch(document.getElementById('blue'), 'blue');

  picker.addWatch(document.getElementById('alpha'), 'alpha');

  picker.on('colorPicked', function(color){
    document.getElementById('color').style.backgroundColor = color;
    model.changeBrushColor(color);
    var gradientRange = picker.getColorRangeFor('red');
    document.getElementById('red').style.backgroundImage = '-moz-linear-gradient(left, ' + gradientRange.low + ', ' + gradientRange.high + ')';
    gradientRange = picker.getColorRangeFor('green');
    document.getElementById('green').style.backgroundImage = '-moz-linear-gradient(left, ' + gradientRange.low + ', ' + gradientRange.high + ')';
    gradientRange = picker.getColorRangeFor('blue');
    document.getElementById('blue').style.backgroundImage = '-moz-linear-gradient(left, ' + gradientRange.low + ', ' + gradientRange.high + ')';
    gradientRange = picker.getColorRangeFor('alpha');
    document.getElementById('alpha').style.backgroundImage = '-moz-linear-gradient(left, ' + gradientRange.low + ', ' + gradientRange.high + ')';

  });

})(sprite, color);
