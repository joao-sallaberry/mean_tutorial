var app = angular.module('meanApp', ['ui.router']);

// Setting routes
app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		})
		.state('posts', {
			url: '/posts/{id}',
			templateUrl: '/posts.html',
			controller: 'PostsCtrl'
		});

		$urlRouterProvider.otherwise('home');
	}]);

// Create posts service
app.factory('posts', [function(){
	var o = {
		posts: []
	};
	return o;
}]);

// Main Controller
app.controller('MainCtrl', ['$scope', 'posts',
	function($scope, posts) {

		// Bind posts to service
		$scope.posts = posts.posts;

		// Add post
		$scope.addPost = function(){
			if(!$scope.title || $scope.title === '') { return; }
			$scope.posts.push({
				title: $scope.title,
				link: $scope.link,
				upvotes: 1,
				comments: [
				{author: 'Joe', body: 'Cool post!', upvotes: 0},
				{author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
				]
			});
			$scope.title = '';
			$scope.link = '';
		};

		// Upvote
		$scope.incrementUpvotes = function(post) {
			post.upvotes += 1;
		};

	}]);

app.controller('PostsCtrl', [
	'$scope',
	'$stateParams',
	'posts',
	function($scope, $stateParams, posts){

		$scope.post = posts.posts[$stateParams.id];

	}]);