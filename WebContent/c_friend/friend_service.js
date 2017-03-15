'use strict';
 
app.factory('FriendService', ['$http', '$q','$rootScope', function($http, $q,$rootScope){
	
	console.log("FriendService...")
	
	var BASE_URL='http://localhost:8081/BlogMiddleEnd'
    return {
         
		getMyFriends: function() {
                    return $http.get(BASE_URL+'/myFriends')
                            .then(
                                    function(response){
                                    	if(response.data.errorCode==404)
                                    	{
                                    		alert(response.data.errorMessage)
                                    	}
                                        return response.data;
                                    }, 
                                   null
                            );
            },
             
            sendFriendRequest: function(friendID){
                    return $http.put(BASE_URL+'/addFriend/'+friendID)
                            .then(
                                    function(response){
                                    	if(response.data.errorCode==404)
                                    	{
                                    		alert(response.data.errorMessage)
                                    	}
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating friend');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
            
            getMyFriendRequests: function(){
            	console.log("Starting of the method getMyFriendRequests")
                return $http.get(BASE_URL+'/getMyFriendRequests/')
                        .then(
                                function(response){
                                    return response.data;
                                }, 
                                function(errResponse){
                                    console.error('Error while creating friend');
                                    return $q.reject(errResponse);
                                }
                        );
        },
        
        getMyFriendcount: function(){
        	console.log("Starting of the method getMyFriendRequests Count")
            return $http.get(BASE_URL+'/getMyFriendcount')
                    .then(
                            function(response){
                                return response.data;
                            }, 
                            function(errResponse){
                                console.error('Error while getting friend count');
                                return $q.reject(errResponse);
                            }
                    );
    },
        
        acceptFriendRequest: function(userID){
        	console.log("Starting of the method acceptFriendRequest")
            return $http.put(BASE_URL+'/accepttFriend/'+userID)
                    .then(
                            function(response){
                                return response.data;
                            }, 
                            function(errResponse){
                                console.error('Error while creating acceptFriendRequest');
                                return $q.reject(errResponse);
                            }
                    );
    },
         
    rejectFriendRequest: function(userID){
    	console.log("Starting of the method rejectFriendRequest")
        return $http.put(BASE_URL+'/rejectFriend/'+userID)
                .then(
                        function(response){
                            return response.data;
                        }, 
                        function(errResponse){
                            console.error('Error while rejectFriendRequest');
                            return $q.reject(errResponse);
                        }
                );
},
     
unFriend: function(userID){
	console.log("Starting of the method unFriend"+userID)
    return $http.put(BASE_URL+'/unFriend/'+userID)
    
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error while unFriend ');
                        return $q.reject(errResponse);
                    }
            );
},
 
             
         
    };
 
}]);