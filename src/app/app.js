angular.module('ngBoilerplate', [
    'ngResource',
    'templates-app',
    'templates-common',
    'ngBoilerplate.home',
    'ngBoilerplate.about',
    'ui.router',
    'ui.bootstrap'
])

.config(function myAppConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
})

.run(function run() {})

.controller('AppCtrl', function AppCtrl($scope, $location, $resource) {
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        if (angular.isDefined(toState.data)) {
            $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate';
        }
    });
    
    var Theme = $resource('http://localhost:8080/sample/themes/');
    var theme = Theme.save({}, function (a,b,c,d,e,f) {
        console.log(JSON.stringify(theme));
    });
    
})

;