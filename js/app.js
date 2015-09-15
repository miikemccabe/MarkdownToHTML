
 
var markdown = angular.module('markdown', ['ngSanitize', 'ngMessages']);

markdown.controller('markdownController', ['$scope', function($scope) {
  var notificationTimeout;
  $scope.RAW = true;
  $scope.html = "";
  $scope.markdown = "";
  $scope.header = "HTML";
  $scope.htmlCopied = false;
  $scope.notifications = {
    "copied": false
  };
  
  // If notifications is updated we need to display notifications
  $scope.$watch('notifications', function() {
      console.info('notifications changed');
      angular.forEach($scope.notifications, function(val, key) {
        if(val === true) {
          startNotificationTimeout();
        }
          return;
      });
  }, true);
  
  
  $scope.updateHtml = function() {
    if($scope.RAW) {
      $scope.html = encode(marked($scope.markdown));
      $scope.header = "HTML";
    } else {
      $scope.html = marked($scope.markdown);
      $scope.header = "Preview";
    }
  };
  
  $scope.handleClearAll = function() {
    $scope.markdown = "";
    $scope.updateHtml();
	  $scope.notifications.cleared = true;
  };
  
  $scope.handleCopyClick = function() {
    $scope.updateHtml();
    $scope.RAW = true;
    
    copyToClipboard();
    
	  $scope.notifications.copied = true;
  };
  
  function startNotificationTimeout() {
      clearTimeout(notificationTimeout);
      notificationTimeout = setTimeout(function() {
          resetNotifications();
          $scope.$apply();
	     }, 5000);
  }
  
  // Reset all notifications to false
  function resetNotifications() {
      angular.forEach($scope.notifications, function(val, key) {
        $scope.notifications[key] = false;
      });
  }
  
  
}]);

function copyToClipboard() {
	  var range = document.createRange();
	  range.selectNodeContents(document.querySelector('#result'));
	  var sel = window.getSelection();
	  sel.removeAllRanges();
	  sel.addRange(range);
	  document.execCommand('copy', false, null);
	  window.getSelection().removeAllRanges();
}

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
