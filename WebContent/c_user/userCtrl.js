'use strict';

app.controller(	'UserController', [	'$scope', 'UserService', '$location','$rootScope','$cookieStore',
						'$http',
						function($scope, UserService, $location, $rootScope,
								$cookieStore,$http) {
							console.log("UserController...")
							var self = this;
/*							$scope.updateTime = Date.now();*/
							this.user = {id:'',name:'',address:'',email:'',password:'',mobile:'',role:'',is_online:''
							};
							this.currentUser = {id : '',name : '', password : '',	mobile : '',
									address : '', email : '',is_online : '',	role : ''
									
								};
							
							this.users = []; //json array
							
							 $scope.orderByMe = function(x) {
							        $scope.myOrderBy = x;
							    };
					

							 self.getAll = function() {
								console.log("getAll users...")
								UserService
										.getAll()
										.then(
												function(d) {
													self.users = d;
												},
												function(errResponse) {
													console
															.error('Error while fetching Users');
												});
							};
							self.listAllUsersNotFriends = function() {
								console.log("listAllUsersNotFriends users...")
								UserService
										.listAllUsersNotFriends()
										.then(
												function(d) {
													self.users = d;
												},
												function(errResponse) {
													console
															.error('Error while fetching Users');
												});
							};
							
							//self.getAll();

							self.createUser = function(user) {
								console.log("createUser...")
								UserService
										.createUser(user)
										.then(
												function(d)
												{
													alert("Thank you for registration")
													$location.path("/")
												},
												function(errResponse) {
													console
															.error('Error while creating User.');
												});
							};
							
							self.myProfile = function() {
								console.log("myProfile...")
								UserService
										.myProfile()
										.then(
												function(d) {
													self.user = d;
													$location.path("/myProfile")
												},
												function(errResponse) {
													console
															.error('Error while fetch profile.');
												});
							};
							
							self.accept = function(id) {
								console.log("accept...")
								UserService
										.accept(id)
										.then(
												function(d) {
													self.user = d;
													self.getAll
													$location.path("/manage_users")
													alert(self.user.errorMessage)
													
												},
												
												function(errResponse) {
													console
															.error('Error while updating User.');
												});
							};
							
							self.reject = function( id) {
								console.log("reject...")
								var reason = prompt("Please enter the reason");
								UserService
										.reject(id,reason)
										.then(
												function(d) {
													self.user = d;
													self.getAll
													$location.path("/manage_users")
													alert(self.user.errorMessage)
													
												},
												null );
							};

							self.updateUser = function(currentUser) {
								console.log("updateUser...")
								UserService
										.updateUser(currentUser)
										.then(
												self.getAll,
												null);
							};
							
							self.update = function() {
								{
									console.log('Update the user details',$rootScope.currentUser);
									self.updateUser($rootScope.currentUser);
								}
								self.reset();
							};
							

							self.authenticate = function(user) {
								console.log("authenticate...")
								UserService
										.authenticate(user)
										.then(

												function(d) {

													self.user = d;
													console
															.log("user.errorCode: "
																	+ self.user.errorCode)
													if (self.user.errorCode == "404")

													{
														alert(self.user.errorMessage)

														self.user.id = "";
														self.user.password = "";

													} else { //valid credentials
														console
																.log("Valid credentials. Navigating to home page")
																
																self.getAll(); 
														
														console.log('Current user : '+self.user)
														$rootScope.currentUser = self.user
                                                     	$cookieStore.put('currentUser', self.user);
														
														$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.currentUser; 
														$location.path('/');

													}

												},
												function(errResponse) {

													console
															.error('Error while authenticate Users');
												});
							};

							self.logout = function() {
								console.log("logout")
								$rootScope.currentUser = {};
								$cookieStore.remove('currentUser');
								UserService.logout()
								$location.path('/');

							}

						

							//self.fetchAllUsers();  //calling the method
							
							//better to call fetchAllUsers -> after login ???

							self.login = function() {
								{
									console.log('->-->--->login validation',
											self.user);
									self.authenticate(self.user);
								}

							};

							self.submit = function() {
								{
									console.log('Saving New User', self.user);
									self.createUser(self.user);
								}
								self.reset();
							};

							self.reset = function() {
								self.user = {
										id:'',name:'',address:'',email:'',password:'',mobile:'',reason:'',role:'',is_online:''
								};
								$scope.myForm.$setPristine(); // reset Form
							};

						} ]);













