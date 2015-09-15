
 
var markdown = angular.module('markdown', ['ngSanitize', 'ngMessages']);

markdown.controller('markdownController', ['$scope', '$timeout', function($scope, $timeout) {
  var notificationTimeout;
  $scope.RAW = true;
  $scope.html = "";
  $scope.markdown = "";
  $scope.header = "HTML";
  $scope.notifications = {
    "copied": false
  };
  
  // If notifications is updated we need to display notifications
  $scope.$watch('notifications', function() {
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
  
  $scope.handleClearAllClick = function() {
    $scope.markdown = "";
    $scope.updateHtml();
  };
  
  $scope.handleCopyClick = function() {
    $scope.RAW = true;
    $scope.updateHtml();
	  $scope.notifications.copied = true;
    
    // Marked in updateHtml is async so we delay
    // this slightly to ensure we have the latest
    // HTML before copying
    $timeout(copyToClipboard, 500);
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
  
  
}])
.directive('resultswitch', function() {
  return {
    templateUrl: 'resultswitch.html'
  };
});

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
