 
 
var markdown = angular.module('markdown', ['ngSanitize']);

markdown.controller('markdownController', ['$scope', function($scope) {
  $scope.RAW = true;
  $scope.updateHtml = function() {
    $scope.html = $scope.RAW ? encode(marked($scope.markdown)) : marked($scope.markdown);
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
