angular.module('app', [
    'ngSanitize', 'ngResource', 'ngAnimate', 'ui.router', 'restangular',
    'templates-app', 'templates-common',
    'com.hoiio.sdk.core', 'com.hoiio.sdk.bootstrap',
    'constants', 'directives', 'filters', 'services', 'resources',
    'app.main', 'app.open'
])

.config(function($httpProvider, $sceDelegateProvider, hoiioHttpProvider, hoiioResourceProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['self']);
    $httpProvider.defaults.withCredentials = true;
    hoiioHttpProvider.initialize();
    hoiioResourceProvider.initialize();
})

.config(function(hoiioHttpProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl(hoiioHttpProvider.getUrlParameter(hoiioHttpProvider.URL_PARAMETER.API_URL));
    RestangularProvider.setDefaultHeaders({
        'X-HOIIO-AUTHCODE': hoiioHttpProvider.getUrlParameter(hoiioHttpProvider.URL_PARAMETER.CODE)
    });
})

.run(function(hoiioInit, hoiioHttp) {
    hoiioInit.init(hoiioHttp.getUrlParameter('portal_url'));
})

.controller('AppCtrl', function($scope, $state, MainState) {
    $scope.isPageLoaded = false;

    $scope.$on('$stateChangeSuccess', function() {
        $scope.isPageLoaded = true;
    });

    $state.go(MainState.MAIN);
});
