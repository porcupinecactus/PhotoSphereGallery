/**
 * Navigation bar zoom button class
 * @param psv (PhotoSphereViewer) A PhotoSphereViewer object
 */
var PSVNavBarZoomButton = function(psv) {
  PSVNavBarButton.call(this, psv);

  this.zoom_range = null;
  this.zoom_value = null;
  this.mousedown = false;

  this.create();
};

PSVNavBarZoomButton.prototype = Object.create(PSVNavBarButton.prototype);
PSVNavBarZoomButton.prototype.constructor = PSVNavBarZoomButton;

/**
 * Creates the button
 * @return (void)
 */
PSVNavBarZoomButton.prototype.create = function() {
  this.button = document.createElement('div');
  this.button.className = 'psv-button psv-zoom-button';

  var zoom_minus = document.createElement('div');
  zoom_minus.className = 'psv-zoom-minus';
  zoom_minus.title = this.psv.config.lang.zoomOut;
  this.button.appendChild(zoom_minus);

  var zoom_range_bg = document.createElement('div');
  zoom_range_bg.className = 'psv-zoom-range';
  this.button.appendChild(zoom_range_bg);

  this.zoom_range = document.createElement('div');
  this.zoom_range.className = 'psv-zoom-range-line';
  this.zoom_range.title = this.psv.config.lang.zoom;
  zoom_range_bg.appendChild(this.zoom_range);

  this.zoom_value = document.createElement('div');
  this.zoom_value.className = 'psv-zoom-range-handle';
  this.zoom_value.title = this.psv.config.lang.zoom;
  this.zoom_range.appendChild(this.zoom_value);

  var zoom_plus = document.createElement('div');
  zoom_plus.className = 'psv-zoom-plus';
  zoom_plus.title = this.psv.config.lang.zoomIn;
  this.button.appendChild(zoom_plus);

  PSVUtils.addEvent(this.zoom_range, 'mousedown', this._initZoomChangeWithMouse.bind(this));
  PSVUtils.addEvent(this.zoom_range, 'touchstart', this._initZoomChangeByTouch.bind(this));
  PSVUtils.addEvent(document, 'mousemove', this._changeZoomWithMouse.bind(this));
  PSVUtils.addEvent(document, 'touchmove', this._changeZoomByTouch.bind(this));
  PSVUtils.addEvent(document, 'mouseup', this._stopZoomChange.bind(this));
  PSVUtils.addEvent(document, 'touchend', this._stopZoomChange.bind(this));
  PSVUtils.addEvent(zoom_minus, 'click', this.psv.zoomOut.bind(this.psv));
  PSVUtils.addEvent(zoom_plus, 'click', this.psv.zoomIn.bind(this.psv));
  this.psv.on('zoom-updated', this._moveZoomValue.bind(this));

  var self = this;
  setTimeout(function() {
    self._moveZoomValue(self.psv.prop.zoom_lvl);
  }, 0);
};

/**
 * Moves the zoom cursor
 * @param level (integer) Zoom level (between 0 and 100)
 * @return (void)
 */
PSVNavBarZoomButton.prototype._moveZoomValue = function(level) {
  this.zoom_value.style.left = (level / 100 * this.zoom_range.offsetWidth - this.zoom_value.offsetWidth / 2) + 'px';
};

/**
 * The user wants to zoom
 * @param evt (Event) The event
 * @return (void)
 */
PSVNavBarZoomButton.prototype._initZoomChangeWithMouse = function(evt) {
  this._initZoomChange(parseInt(evt.clientX));
};

/**
 * The user wants to zoom (mobile version)
 * @param evt (Event) The event
 * @return (void)
 */
PSVNavBarZoomButton.prototype._initZoomChangeByTouch = function(evt) {
  var touch = evt.changedTouches[0];
  if (touch.target == this.zoom_range || touch.target == this.zoom_value) {
    this._initZoomChange(parseInt(touch.clientX));
  }
};

/**
 * Initializes a zoom change
 * @param x (integer) Horizontal coordinate
 * @return (void)
 */
PSVNavBarZoomButton.prototype._initZoomChange = function(x) {
  this.mousedown = true;
  this._changeZoom(x);
};

/**
 * The user wants to stop zooming
 * @param evt (Event) The event
 * @return (void)
 */
PSVNavBarZoomButton.prototype._stopZoomChange = function(evt) {
  this.mousedown = false;
};

/**
 * The user moves the zoom cursor
 * @param evt (Event) The event
 * @return (void)
 */
PSVNavBarZoomButton.prototype._changeZoomWithMouse = function(evt) {
  evt.preventDefault();
  this._changeZoom(parseInt(evt.clientX));
};

/**
 * The user moves the zoom cursor (mobile version)
 * @param evt (Event) The event
 * @return (void)
 */
PSVNavBarZoomButton.prototype._changeZoomByTouch = function(evt) {
  var touch = evt.changedTouches[0];
  if (touch.target == this.zoom_range || touch.target == this.zoom_value) {
    evt.preventDefault();
    this._changeZoom(parseInt(touch.clientX));
  }
};

/**
 * Zoom change
 * @param x (integer) Horizontal coordinate
 * @return (void)
 */
PSVNavBarZoomButton.prototype._changeZoom = function(x) {
  if (this.mousedown) {
    var user_input = x - this.zoom_range.getBoundingClientRect().left;
    var zoom_level = user_input / this.zoom_range.offsetWidth * 100;
    this.psv.zoom(zoom_level);
  }
};