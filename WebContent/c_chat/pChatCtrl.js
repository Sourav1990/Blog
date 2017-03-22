app.controller("pChatCtrl", function($scope, pChatService,$rootScope) {
  $scope.messages = [];
  $scope.message = "";
  $scope.max = 140;
  $scope.addfriendID = function(friendID){
	
	  $rootScope.friendID = friendID;
	  console.log("Friend ID :::"+friendID);
	  
  };
  $scope.addMessage = function() {
    pChatService.send($scope.message);
    $scope.message = "";
  };

  pChatService.receive().then(null, null, function(message) {
    $scope.messages.push(message);
  });
});