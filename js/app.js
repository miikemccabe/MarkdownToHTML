
 
var markdown = angular.module('markdown', ['ngSanitize']);

markdown.controller('markdownController', ['$scope', function($scope) {
  $scope.RAW = true;
  $scope.html = "";
  $scope.markdown = "";
  $scope.updateHtml = function() {
    $scope.html = $scope.RAW ? encode(marked($scope.markdown)) : marked($scope.markdown);
  };
  
  $scope.clearAll = function() {
    $scope.markdown = "";
    $scope.updateHtml();
  };
  
  $scope.copyToClipboard = function() {
    $scope.RAW = true;
    $scope.updateHtml();
	  var range = document.createRange();
	  range.selectNodeContents(document.querySelector('#result'));
	  var sel = window.getSelection();
	  sel.removeAllRanges();
	  sel.addRange(range);
	  document.execCommand('copy', false, null);
	  window.getSelection().removeAllRanges();
	  
	  var notification = document.querySelector('#notification');
	  notification.className = "fade";
	  
	  if($scope.notifyTimeout !== undefined) {
	    clearTimeout($scope.notifyTimeout);
	  }
	  $scope.notifyTimeout = setTimeout(function() {
	    notification.className = "";
	  }, 5000);
  };
  
}]);

function encode(text) {
  var newText = text.replace(/</g, "&lt;");
  return newText.replace(/>/g, "&gt;");
}


/*
* Marked options
*
* https://github.com/chjj/marked
*/

var renderer = new marked.Renderer();
// <p>
renderer.paragraph = function(text) {
  return '<p>' + text + '</p>\n\n';
};

// <li>
renderer.listitem = function(text) {
  return '  <li>' + text + '</li>\n';
};

// <h1>...<h5>
renderer.heading = function(text, level) {
  return '<h' + level + '>' + text + '</h' + level + '>\n';
};

marked.setOptions({ 
  renderer: renderer, 
  gfm: true 
});
