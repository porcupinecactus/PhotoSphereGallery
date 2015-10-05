/**
 * Navigation bar fullscreen button class
 * @param psv (PhotoSphereViewer) A PhotoSphereViewer object
 */
var PSVNavBarFullscreenButton = function(psv) {
  PSVNavBarButton.call(this, psv);
  this.create();
};

PSVNavBarFullscreenButton.prototype = Object.create(PSVNavBarButton.prototype);
PSVNavBarFullscreenButton.prototype.constructor = PSVNavBarFullscreenButton;

/**
 * Creates the button
 * @return (void)
 */
PSVNavBarFullscreenButton.prototype.create = function() {
  this.button = document.createElement('div');
  this.button.className = 'psv-button psv-fullscreen-button';
  this.button.title = this.psv.config.lang.fullscreen;

  this.button.appendChild(document.createElement('div'));
  this.button.appendChild(document.createElement('div'));

  PSVUtils.addEvent(this.button, 'click', this.psv.toggleFullscreen.bind(this.psv));
  this.psv.on('fullscreen-updated', this.toggleActive.bind(this));
};