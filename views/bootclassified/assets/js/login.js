var app = angular.module('myApp', ['ngCookies']);

app.service('currentUser', function(){
	this.userDetails="";
	return{
		addUser:function(newObj){
			this.userDetails = newObj;
		},
		getUser:function(){
			return this.userDetails;
		},
	};
	/*return {
		addUser:addUser,
		getUser:getUser,
	};*/
});
app.controller('MainCtrl', function($scope,$http,$window,currentUser,$cookieStore) {
  $scope.name = 'World';
    console.log('initialized');
  //currentUser.addUser("hello");
  //console.log(currentUser.getUser());
  $scope.func = currentUser;
    console.log(window.location.href);
  $scope.submit=function()
  {
      console.log('func called');
      console.log($scope.username);
      console.log($scope.password);
      
     $http({url:'https://accomodateme.mybluemix.net/login',method:"GET",params:{email:$scope.username,pwd:$scope.password}}).success(function(response){
		 console.log(response);
		 $scope.credentials = response.user;
		 //console.log($scope.credentials[0]['EmailId']);
		 if($scope.credentials.length == 0)
		 {
			 alert("Invalid Login");
		 }
		 else if($scope.username == $scope.credentials[0]['email'] && $scope.password == $scope.credentials[0]['password'])
		 {
			var user=$scope.username;
			var pass=$scope.password;
			//$scope.func.addUser($scope.credentials[0]);
			$cookieStore.put('user',$scope.credentials[0]);
			$cookieStore.put('name',$scope.credentials[0]['Name']);
             console.log("success");
			//console.log($scope.func.getUser());
			//alert("welcome "+user);
			//$scope.myusers.push({username:user,password:pass});
			//$http({url:'/dashboard',method:"Get"}).success();
			//$window.location.href = '/dashboard';
             console.log(window.location.href);
             window.location.href = 'account-home.html';
		 }
	});
		 
	 //console.log($scope.credentials);
     
  }
});
app.controller('DashboardCtrl', function($scope,$http,$window,currentUser, $cookies, $cookieStore) {
  //$scope.name = 'World';
  //$scope.credentials = currentUser.getUser();
  //console.log($scope.credentials);
  $scope.name = $cookieStore.get('name');
    console.log($scope.name);
  $scope.list = ['Nearby','Avadi','Arumbakham','Ambattur']
  //$scope.showDetails=false;
    console.log('came herer');
     /*if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }

             $scope.latitude = position.coords.latitude; 
             $scope.longitude = position.coords.longitude;
      */
    $scope.search = function()
    {
    	console.log($scope.dish);
        $http({
         url: '/getRestaurantsByDish',
         method: "GET",
         params: {
             dish: $scope.dish,
             local: $scope.locality
             
         }
     }).success(function (response) {
             var a = [],b=[];
             var temp = response.restaurants;
             console.log(temp);
             for (var i = 0; i < temp.length; i++) {
                 a.push(temp[i]["name"]);
                 b.push({"name":temp[i]["name"],"latitude":temp[i]["location"]["latitude"],"longitude":temp[i]["location"]["longitude"]});
             }
             $scope.restaurants = a;
             $scope.dishName=$scope.dish;
            console.log($scope.restaurants);

			google.maps.event.addDomListener(window, 'load', initialize(b));
			if(temp.length == 0)
			{
				swal("Damnit! No restaurants found", "Why don't you start serving "+$scope.dish+"? ;)")
			}
        });
    
    }
    $scope.searchRestaurant = function(eatery)
    {
    	//$scope.showDetails = ! $scope.showDetails;
    	console.log(eatery);
    	//$scope.clickCheck = true;
    	$http({
         url: '/getRestaurantByName',
         method: "GET",
         params: {
        name: eatery
         }
     }).success(function (response) {
             var a = [];
          console.log(response);
             var restaurant = response.restaurant[0];

          $scope.cuisine = restaurant.cuisine;
          console.log($scope.cuisine);  
          $scope.menu = [];
          $scope.menu = restaurant.menu;
          $scope.city = restaurant["location"]["city"];
          $scope.local = restaurant["location"]["locality"];
          $scope.address = restaurant["location"]["address"];
            console.log(response.restaurant);
    });
    
    //$http({url:
  
	}
});

