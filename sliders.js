c('.slider').forEach(function (slider) {

var sliderWidth = 16;
var sliderHeight = 144;

var track = c(slider).appendChild('rect').unwrap();
var highlight = c(slider).appendChild('rect').unwrap();
var thumb = c(slider).appendChild('rect').unwrap();

c(track).setClassName('track');
c(highlight).setClassName('highlight');
c(thumb).setClassName('thumb');

var trackWidth = 8;
var trackHeight = 144;
var trackBorder = 1;

var thumbWidth = 16;
var thumbHeight = 16;
var thumbBorder = 1;

c(track).setAttributes({
  x: (sliderWidth - trackWidth) / 2 + (trackBorder / 2),
  y: trackBorder / 2,
  width: trackWidth - trackBorder,
  height: trackHeight - trackBorder,
  rx: trackWidth / 2,
  ry: trackWidth / 2,
  fill: '#ccc',
  stroke: '#999',
  'stroke-width': trackBorder
});

c(highlight).setAttributes({
  x: (sliderWidth - trackWidth) / 2 + (trackBorder / 2),
  width: trackWidth - trackBorder,
  rx: trackWidth / 2,
  ry: trackWidth / 2,
  fill: '#999',
  stroke: '#666',
  'stroke-width': trackBorder
});

c(thumb).setAttributes({
  x: thumbBorder / 2,
  width: thumbWidth - thumbBorder,
  height: thumbHeight - thumbBorder,
  rx: thumbWidth / 2,
  ry: thumbHeight / 2,
  fill: '#333',
  stroke: '#333',
  'stroke-width': thumbBorder
});

var minValue = 0;
var maxValue = 255;

var step = 1;

var initValue = 51;

var minPosition = 0;
var maxPosition = trackHeight - thumbHeight;

function positionToValue(position) {
  if (position <= minPosition) return minValue;
  if (position >= maxPosition) return maxValue;

  var percentOfMax = position / maxPosition;
  var value = percentOfMax * maxValue;

  return Math.round(value / step) * step;
}

function valueToPosition(value) {
  if (value <= minValue) return minPosition;
  if (value >= maxValue) return maxPosition;

  var percentOfMax = value / maxValue;
  var position = percentOfMax * maxPosition;

  return Math.round(position);
}

function updatePosition(newPosition) {
  if (newPosition < minPosition) newPosition = minPosition;
  if (newPosition > maxPosition) newPosition = maxPosition;

  c(thumb).setAttributes({
    y: trackHeight - newPosition - thumbHeight + (thumbBorder / 2)
  });

  c(highlight).setAttributes({
    height: newPosition + (thumbHeight / 2) - trackBorder
  });

  c(highlight).setAttributes({
    y: trackHeight - newPosition - (thumbHeight / 2) + (trackBorder / 2)
  });
}

function updateValue(newValue) {
  if (newValue < minValue) newValue = minValue;
  if (newValue > maxValue) newValue = maxValue;

  c(slider).setCustomDataAttributes({
    value: newValue
  });
}

updateValue(initValue);
updatePosition(valueToPosition(initValue));

thumb.addEventListener('mousedown', function (event) {
  var thumbRect = thumb.getBoundingClientRect();
  var mousePositionInThumb = thumbRect.bottom - event.clientY;

  function dragThumb(event) {
    var trackRect = track.getBoundingClientRect();
    var mousePositionInTrack = trackRect.bottom - event.clientY;

    var newPosition = mousePositionInTrack - mousePositionInThumb;

    updatePosition(newPosition);
    updateValue(positionToValue(newPosition));
  }

  document.addEventListener('mousemove', dragThumb);

  document.addEventListener('mouseup', function () {
    document.removeEventListener('mousemove', dragThumb);
  });
});

function nudgeThumb(event) {
  var down = 40;
  var up = 38;

  var currentValue = Number(slider.getAttribute('data-value'));

  if (event.keyCode === down) {
    var newValue = Math.max(currentValue - step, minValue);
  } else if (event.keyCode === up) {
    var newValue = Math.min(currentValue + step, maxValue);
  } else {
    return;
  }

  updateValue(newValue);
  updatePosition(valueToPosition(newValue));
}

document.addEventListener('mousedown', function (event) {
  document.removeEventListener('keydown', nudgeThumb);

  if (event.target === track ||
      event.target === thumb ||
      event.target === highlight) {

    document.addEventListener('mouseup', function enableNudge() {
      document.addEventListener('keydown', nudgeThumb);
      document.removeEventListener('mouseup', enableNudge);
    });
  }
});

function moveThumb(event) {
  var trackRect = track.getBoundingClientRect();
  var mousePositionInTrack = trackRect.bottom - event.clientY;

  var newPosition = mousePositionInTrack - (thumbHeight / 2);

  updatePosition(newPosition);
  updateValue(positionToValue(newPosition));
}

track.addEventListener('click', moveThumb);
highlight.addEventListener('click', moveThumb);

});
