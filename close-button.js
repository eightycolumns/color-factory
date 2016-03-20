(function () {

var closeButton = document.querySelector('#closeButton');

var border = c(closeButton).appendChild('rect').unwrap();

c(border).setAttributes({
  x: 0.5,
  y: 0.5,
  width: 23,
  height: 23,
  fill: 'transparent',
  stroke: '#fff',
  'stroke-width': 1
});

closeButton.addEventListener('mouseover', function () {
  border.setAttribute('stroke', '#333');
});

closeButton.addEventListener('mouseout', function () {
  border.setAttribute('stroke', '#fff');
});

c(closeButton).appendChild('path').setAttributes({
  d: 'M  8  8 ' +
     'L 16 16 ' +
     'M 16  8 ' +
     'L  8 16',

  fill: 'transparent',
  stroke: '#333',
  'stroke-width': 2,
  'stroke-linecap': 'round'
});

closeButton.addEventListener('click', function () {
  location = document.referrer;
});

})();
