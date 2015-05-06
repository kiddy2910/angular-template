angular.module('app.main.route', [])

.constant('MainState', {
    MAIN: 'main',
    AGENT: 'main.agent',
    STAFF: 'main.staff',
    ERROR: 'main.error'
})

.config(function($urlRouterProvider, $stateProvider, MainState) {
    $urlRouterProvider.otherwise('/main/500');
    $stateProvider
        .state(MainState.MAIN, {
            url: '/main',
            templateUrl: 'main/main.tpl.html',
            controller: 'MainCtrl',
            resolve: {
                user: function(InitData) {
                    return InitData.getUser();
                }
            }
        })
        .state(MainState.AGENT, {
            url: '/agent',
            templateUrl: 'main/agent/agent.tpl.html',
            controller: 'AgentCtrl'
        })
        .state(MainState.STAFF, {
            url: '/staff',
            template: '<div ui-view></div>',
            controller: 'StaffCtrl'
        })
        .state(MainState.ERROR, {
            url: '/500',
            template: '<div ui-view>Unexpected error</div>'
        });
});
