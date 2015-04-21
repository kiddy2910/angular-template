angular.module('app.open.route', [])

.constant('OpenState', {
    MAIN: 'open'
})

.config(function($stateProvider, OpenState) {

    $stateProvider
        .state(OpenState.MAIN, {
            url: '/open',
            templateUrl: 'open/open.tpl.html',
            controller: 'OpenCtrl',
            resolve: {
                AppData: function(appDataService) {
                    return appDataService.get();
                }
            }
        });
});
