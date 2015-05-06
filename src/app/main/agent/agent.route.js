angular.module('app.main.agent.route', [])

.constant('AgentState', {
    BWL: 'main.agent.bwl'
})

.config(function($stateProvider, AgentState) {
    $stateProvider
        .state(AgentState.BWL, {
            url: '/bwl',
            templateUrl: 'main/shared/bwl.tpl.html',
            controller: 'AgentBwlCtrl',
            resolve: {
                blackWhiteList: function(BlackWhiteList, Medium) {
                    return BlackWhiteList.forMediumAndNumber(Medium.VOICE, '', 1);
                }
            }
        });
});
