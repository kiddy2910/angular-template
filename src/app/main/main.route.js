angular.module('app.main.route', [])

.constant('MainState', {
    MAIN: 'main',
    AGENT: 'main.agent',
    STAFF: 'main.staff'
})

.config(function($stateProvider, MainState) {

    $stateProvider
        .state(MainState.MAIN, {
            url: '/main',
            templateUrl: 'main/main.tpl.html',
            controller: 'MainCtrl',
            resolve: {
                initData: function(InitData) {
                    return InitData.info();
                }
            }
        })
        .state(MainState.AGENT, {
            url: '/agent',
            templateUrl: 'main/agent/agent.tpl.html',
            controller: 'AgentCtrl',
            resolve: {
                blackWhiteList: function() {

                }
            }
        })
        .state(MainState.STAFF, {
            url: '/staff',
            templateUrl: 'main/staff/staff.tpl.html',
            controller: 'StaffCtrl',
            resolve: {
                blackWhiteList: function() {

                }
            }
        });
});
