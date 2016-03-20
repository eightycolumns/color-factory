(function () {

var body = document.querySelector('body');

var rValue = document.querySelector('#rValue');
var gValue = document.querySelector('#gValue');
var bValue = document.querySelector('#bValue');

var rHexValue = document.querySelector('#rHexValue');
var gHexValue = document.querySelector('#gHexValue');
var bHexValue = document.querySelector('#bHexValue');

(function paintBackground() {
  window.requestAnimationFrame(paintBackground);

  var rDataset = {
    value: rSlider.getAttribute('data-value')
  };

  var rComponent = (rDataset.value < 16) ? '0' : '';
  rComponent += Number(rDataset.value).toString(16);

  var gDataset = {
    value: gSlider.getAttribute('data-value')
  };

  var gComponent = (gDataset.value < 16) ? '0' : '';
  gComponent += Number(gDataset.value).toString(16);

  var bDataset = {
    value: bSlider.getAttribute('data-value')
  };

  var bComponent = (bDataset.value < 16) ? '0' : '';
  bComponent += Number(bDataset.value).toString(16);

  rValue.textContent = rDataset.value;
  gValue.textContent = gDataset.value;
  bValue.textContent = bDataset.value;

  rHexValue.textContent = rComponent.toUpperCase();
  gHexValue.textContent = gComponent.toUpperCase();
  bHexValue.textContent = bComponent.toUpperCase();

  body.style.backgroundColor = '#' + rComponent + gComponent + bComponent;
})();

})();
