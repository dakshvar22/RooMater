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
  $http({url:'https://accomodateme.mybluemix.net/profile/Daksh',method:"GET"}).success(function(response){
		console.log(response);
		//listings = response;
		$scope.profile = response.user[0];
	});
	$scope.showVisualization = function()
	{
		var widgetId = 'vizcontainer',
		widgetWidth = 700, widgetHeight = 700, // Default width and height
		personImageUrl = 'images/app.png', // Can be blank
		language = 'en';
		console.log('showVisualiztion');
		  $('#' + widgetId).empty();
		  var d3vis = d3.select('#vizcontainer').append('svg:svg');
		  var widget = {
			d3vis: d3vis,
			data: $scope.profile.personality,
			loadingDiv: 'dummy',
			switchState: function() {
			  console.log('[switchState]');
			},
			_layout: function() {
			  console.log('[_layout]');
			},
			showTooltip: function() {
			  console.log('[showTooltip]');
			},
			id: 'SystemUWidget',
			COLOR_PALLETTE: ['#1b6ba2', '#488436', '#d52829', '#F53B0C', '#972a6b', '#8c564b', '#dddddd'],
			expandAll: function() {
			  this.vis.selectAll('g').each(function() {
				var g = d3.select(this);
				if (g.datum().parent && // Isn't the root g object.
				  g.datum().parent.parent && // Isn't the feature trait.
				  g.datum().parent.parent.parent) { // Isn't the feature dominant trait.
				  g.attr('visibility', 'visible');
				}
			  });
			},
			collapseAll: function() {
			  this.vis.selectAll('g').each(function() {
				var g = d3.select(this);
				if (g.datum().parent !== null && // Isn't the root g object.
				  g.datum().parent.parent !== null && // Isn't the feature trait.
				  g.datum().parent.parent.parent !== null) { // Isn't the feature dominant trait.
				  g.attr('visibility', 'hidden');
				}
			  });
			},
			addPersonImage: function(url) {
			  if (!this.vis || !url) {
				return;
			  }
			  var icon_defs = this.vis.append('defs');
			  var width = this.dimW,
				height = this.dimH;

			  // The flower had a radius of 640 / 1.9 = 336.84 in the original, now is 3.2.
			  var radius = Math.min(width, height) / 16.58; // For 640 / 1.9 -> r = 65
			  var scaled_w = radius * 2.46; // r = 65 -> w = 160

			  var id = 'user_icon_' + this.id;
			  icon_defs.append('pattern')
				.attr('id', id)
				.attr('height', 1)
				.attr('width', 1)
				.attr('patternUnits', 'objectBoundingBox')
				.append('image')
				.attr('width', scaled_w)
				.attr('height', scaled_w)
				.attr('x', radius - scaled_w / 2) // r = 65 -> x = -25
				.attr('y', radius - scaled_w / 2)
				.attr('xlink:href', url)
				.attr('opacity', 1.0)
				.on('dblclick.zoom', null);
			  this.vis.append('circle')
				.attr('r', radius)
				.attr('stroke-width', 0)
				.attr('fill', 'url(#' + id + ')');
			}
		  };

		  widget.dimH = widgetHeight;
		  widget.dimW = widgetWidth;
		  widget.d3vis.attr('width', widget.dimW).attr('height', widget.dimH);
		  widget.d3vis.attr('viewBox', "0 0 " + widget.dimW + ", " + widget.dimH);
		  renderChart.call(widget);
		  widget.expandAll.call(widget);
		  if (personImageUrl)
			widget.addPersonImage.call(widget, personImageUrl);
			}
});
app.controller('ListingController', function($scope,$http,$window,currentUser, $cookies, $cookieStore) {
	var listings = "";
	$http({url:'https://accomodateme.mybluemix.net/getListings',method:"GET"}).success(function(response){
		console.log(response);
		//listings = response;
		$scope.listings = response.Listings;
	});
	$scope.showProfile = function(name)
	{
		console.log(name);
		$cookieStore.put('profView',name);
	}
	$scope.showTradeOff = function()
	{
		$window.open("https://tradeoffhelper.mybluemix.net");
	}
});
app.controller('ProfileController', function($scope,$http,$window,currentUser, $cookies, $cookieStore) {
	var profile = "";
	$scope.profName = $cookieStore.get('profView');
	$http({url:'https://accomodateme.mybluemix.net/profile/'+ $scope.profName,method:"GET"}).success(function(response){
		console.log(response);
		//listings = response;
		$scope.profile = response.user[0];
	});
	$scope.showVisualization = function()
	{
		var widgetId = 'vizcontainer',
		widgetWidth = 700, widgetHeight = 700, // Default width and height
		personImageUrl = 'images/app.png', // Can be blank
		language = 'en';
		console.log('showVisualiztion');
		  $('#' + widgetId).empty();
		  var d3vis = d3.select('#vizcontainer').append('svg:svg');
		  var widget = {
			d3vis: d3vis,
			data: $scope.profile.personality,
			loadingDiv: 'dummy',
			switchState: function() {
			  console.log('[switchState]');
			},
			_layout: function() {
			  console.log('[_layout]');
			},
			showTooltip: function() {
			  console.log('[showTooltip]');
			},
			id: 'SystemUWidget',
			COLOR_PALLETTE: ['#1b6ba2', '#488436', '#d52829', '#F53B0C', '#972a6b', '#8c564b', '#dddddd'],
			expandAll: function() {
			  this.vis.selectAll('g').each(function() {
				var g = d3.select(this);
				if (g.datum().parent && // Isn't the root g object.
				  g.datum().parent.parent && // Isn't the feature trait.
				  g.datum().parent.parent.parent) { // Isn't the feature dominant trait.
				  g.attr('visibility', 'visible');
				}
			  });
			},
			collapseAll: function() {
			  this.vis.selectAll('g').each(function() {
				var g = d3.select(this);
				if (g.datum().parent !== null && // Isn't the root g object.
				  g.datum().parent.parent !== null && // Isn't the feature trait.
				  g.datum().parent.parent.parent !== null) { // Isn't the feature dominant trait.
				  g.attr('visibility', 'hidden');
				}
			  });
			},
			addPersonImage: function(url) {
			  if (!this.vis || !url) {
				return;
			  }
			  var icon_defs = this.vis.append('defs');
			  var width = this.dimW,
				height = this.dimH;

			  // The flower had a radius of 640 / 1.9 = 336.84 in the original, now is 3.2.
			  var radius = Math.min(width, height) / 16.58; // For 640 / 1.9 -> r = 65
			  var scaled_w = radius * 2.46; // r = 65 -> w = 160

			  var id = 'user_icon_' + this.id;
			  icon_defs.append('pattern')
				.attr('id', id)
				.attr('height', 1)
				.attr('width', 1)
				.attr('patternUnits', 'objectBoundingBox')
				.append('image')
				.attr('width', scaled_w)
				.attr('height', scaled_w)
				.attr('x', radius - scaled_w / 2) // r = 65 -> x = -25
				.attr('y', radius - scaled_w / 2)
				.attr('xlink:href', url)
				.attr('opacity', 1.0)
				.on('dblclick.zoom', null);
			  this.vis.append('circle')
				.attr('r', radius)
				.attr('stroke-width', 0)
				.attr('fill', 'url(#' + id + ')');
			}
		  };

		  widget.dimH = widgetHeight;
		  widget.dimW = widgetWidth;
		  widget.d3vis.attr('width', widget.dimW).attr('height', widget.dimH);
		  widget.d3vis.attr('viewBox', "0 0 " + widget.dimW + ", " + widget.dimH);
		  renderChart.call(widget);
		  widget.expandAll.call(widget);
		  if (personImageUrl)
			widget.addPersonImage.call(widget, personImageUrl);
			}
});

