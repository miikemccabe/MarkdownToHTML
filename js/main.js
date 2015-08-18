chrome.app.runtime.onLaunched.addListener(function() {
  // Center window on screen.
  var screenWidth = screen.availWidth;
  var screenHeight = screen.availHeight;
  var width = 750;
  var height = 410;

  chrome.app.window.create('index.html', {
	  id: "ListMaker",
    innerBounds: {
	    width: width,
	    height: height,
      left: Math.round((screenWidth-width)/2),
      top: Math.round((screenHeight-height)/2),
	    minHeight: 410,
	    minWidth: 640
    },
    frame: {
      type: "chrome",
      color: "#339933",
      inactiveColor: "#cccccc"
    },
    state: "maximized"
  });
});