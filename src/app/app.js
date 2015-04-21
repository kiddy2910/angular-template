angular.module('app', [
    'ngSanitize', 'ngResource', 'ui.router',
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

.run(function($location, $state, hoiioInit, hoiioHttp, State) {
    hoiioInit.init(hoiioHttp.getUrlParameter('portal_url'));

    var isCorrupted = (function checkIfCorruptedUrl() {
        return $location.absUrl().indexOf('type=error&code=error_internal_server_error') > 0;
    })();

    if (isCorrupted) {
        // $state.go(State.INTERNAL_SERVER_ERROR);
        return;
    }
})

.controller('AppCtrl', function($scope, $state, MainState, OpenState) {
    $scope.isPageLoaded = false;

    $scope.$on('$stateChangeSuccess', function() {
        $scope.isPageLoaded = true;
    });
    
    $state.go(MainState.MAIN);
});
