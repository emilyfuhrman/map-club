
/**
 * This class provides access to the device media, interfaces to both sound and video
 * @constructor
 */
function Media(src) {
	this.src = src;
}

Media.prototype.play = function() {
}

Media.prototype.pause = function() {
}

Media.prototype.stop = function() {
}


/**
 * This class contains information about any Media errors.
 * @constructor
 */
function MediaError() {
	this.code = null,
	this.message = "";
}

MediaError.MEDIA_ERR_ABORTED 		= 1;
MediaError.MEDIA_ERR_NETWORK 		= 2;
MediaError.MEDIA_ERR_DECODE 		= 3;
MediaError.MEDIA_ERR_NONE_SUPPORTED = 4;


//if (typeof navigator.audio == "undefined") navigator.audio = new Media(src);
