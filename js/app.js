 
 
var markdown = angular.module('markdown', ['ngSanitize']);

markdown.controller('markdownController', ['$scope', function($scope) {
  $scope.RAW = true;
  $scope.updateHtml = function() {
    $scope.html = marked($scope.markdown);
  };
}]);




function encode(text) {
  var newText = text.replace(/</g, "&lt;");
  return newText.replace(/>/g, "&gt;");
}

function decode(text) {
  var newText = text.replace("&lt;", "<");
  return newText.replace("&gt;", ">");
}