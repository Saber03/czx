angular.module('myApp')
.directive('carrotsNav', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/dashboard/carrots-nav.html'
    }
})
.directive('articlesFliter', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/dashboard/articles-fliter.html'
    }
})
.directive('articlesList', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/dashboard/articles-list.html'
    }
});