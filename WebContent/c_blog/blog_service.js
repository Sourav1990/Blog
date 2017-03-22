'use strict';
 
app.factory('BlogService', ['$http', '$q','$rootScope', function($http, $q,$rootScope){
	
	console.log("BlogService...")
	
	var BASE_URL='http://localhost:8081/BlogMiddleEnd';
    return {
         
            fetchAllBlogs: function() {
                    return $http.get(BASE_URL+'/getblogs')
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching Blogs');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
            
            fetchAllNewBlogs: function() {
                return $http.get(BASE_URL+'/getnewblogs')
                        .then(
                                function(response){
                                    return response.data;
                                }, 
                                function(errResponse){
                                    console.error('Error while fetching Blogs');
                                    return $q.reject(errResponse);
                                }
                        );
        },
             
            createBlog: function(blog){
                    return $http.post(BASE_URL+'/blog', blog)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating blog');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateBlog: function(blog, id){
                    return $http.put(BASE_URL+'/blog/'+id, blog)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating blog');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
            
            accept: function(id) {
            	console.log("calling approve ")
                    return $http.put(BASE_URL+'/tApproveBlog/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while accept blog');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
            
            reject: function(id, reason) {
            	console.log("calling reject ")
                    return $http.put(BASE_URL+'/tRejectBlog/'+id+'/'+reason)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while reject blog');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            
            getBlog: function(id){
                return $http.get  (BASE_URL+'/blog/'+id)
                        .then(
                                function(response){
                                	$rootScope.selectedBlog = response.data
                                    return response.data;
                                }, 
                                function(errResponse){
                                    console.error('Error while getting blog');
                                    return $q.reject(errResponse);
                                }
                        );
        },
            
            getBlogs: function(userID){
                return $http.get  (BASE_URL+'/blogger/'+userID)
                        .then(
                                function(response){
                                	$rootScope.selectedBlogger = response.data
                                    return response.data;
                                }, 
                                function(errResponse){
                                    console.error('Error while getting blog');
                                    return $q.reject(errResponse);
                                }
                        );
        }
         
    };
 
}]);