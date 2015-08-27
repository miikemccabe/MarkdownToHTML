 
 
var markdown = angular.module('markdown', ['ngSanitize']);

markdown.controller('markdownController', ['$scope', function($scope) {
  $scope.RAW = true;
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
renderer.paragraph = function(text) {
  return '<p>' + text + '</p>\n\n';
};

marked.setOptions({ 
  renderer: renderer, 
  gfm: true 
});
