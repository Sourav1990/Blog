'use strict';
 
app.controller('FriendController', ['UserService','$scope', 'FriendService','$location',
   '$rootScope','$route',function(UserService,$scope, FriendService,$location,$routeParams,$rootScope,$route) {
	console.log("FriendController...")
          var self = this;
          self.friend={id:'',userID:'',friendID:'',status:'',errorMessage : '',errorCode:''};
          self.friends=[];
          $scope.myVar = false;
          self.user = {	id : '', name : '',	password : '',	mobile : '',
  				address : '',email : '', isOnline:'',role : '',
  				errorMessage : ''
  			};
  			self.users = [];
  			
  			
  			
  			  				

  		         self.getMyFriendRequests = function(){
  		        	 
  		              FriendService.getMyFriendRequests()
  		                      .then(
  		                             function(d)
  		                             {
  		                            	 self.friends = d;
  		                            	 console.log("Got the friend request list"+ d);
  		                            	/* $location.path="/viewFriendRequest";*/
  		                            	 
  		                             },
  		                              function(errResponse){
  		                                   console.error('Error while updating Friend.');
  		                              } 
  		                  );
  		          };
  		 
  		          
  		        self.getMyFriendcount = function(){
 		        	 
		              FriendService.getMyFriendcount()
		                      .then(
		                             function(d)
		                             {
		                            	 self.friends = d;
		                            	 console.log("Got the friend count list"+ d);
		                            	/* $location.path="/viewFriendRequest";*/
		                            	 
		                             },
		                              function(errResponse){
		                                   console.error('Error while updating Friend.');
		                              } 
		                  );
		          };
		 
          
         self.sendFriendRequest=sendFriendRequest
         
         function sendFriendRequest(friendID)
         {

       	  console.log("->sendFriendRequest :"+friendID)
             FriendService.sendFriendRequest(friendID)
                 .then(
                              function(d) {
                                   self.friend = d;
                                   
                                  alert("Friend Request : " + self.friend.errorMessage)
                              },
                               function(errResponse){
                                   console.error('Error while sending friend request');
                               }
                      );
         
        	 
         }
          
             
          self.getMyFriends = function(){
        	  console.log("Getting my friends")
              FriendService.getMyFriends()
                  .then(
                               function(d) {
                                    self.friends = d;
                                    console.log("Got the friends list changed is"+ d);
                                     	 /*$location.path('/view_friend');*/
                               },
                                function(errResponse){
                                    console.error('Error while fetching Friends');
                                }
                       );
          };
            
       
         self.updateFriendRequest = function(friend, id){
              FriendService.updateFriendRequest(friend, id)
                      .then(
                              self.myFriends, 
                              function(errResponse){
                                   console.error('Error while updating Friend.');
                              } 
                  );
          };
 
         self.acceptFriendRequest = function(userID){
        	 alert("I am in your friend list now"+userID);
              FriendService.acceptFriendRequest(userID)
             
                      .then(
                              self.myFriends, 
                              function(errResponse){
                                   console.error('Error while acceptFriendRequest');
                              } 
                  );
          };
          
          self.rejectFriendRequest = function(userID){
        	  alert("Seems it was a stranger!!!");
              FriendService.rejectFriendRequest(userID)
             
                      .then(
                              self.myFriends, 
                              function(errResponse){
                                   console.error('Error while rejectFriendRequest');
                              } 
                  );
          };
          
          self.unFriend = function(userID){
        	  alert("Successfully removed from your friend list");
              FriendService.unFriend(userID).then(function(errResponse){
            	  console.error('Error while unFriend ');
            	  });
              
          };
          
          self.listAllUsersNotFriends = function() {
				UserService.listAllUsersNotFriends().then(function(d) {
					self.users = d;
				}, function(errResponse) {
					console.error('Error while fetching Users');
				});
			};     
 
      }]);