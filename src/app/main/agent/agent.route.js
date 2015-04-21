angular.module('app.main.agent.route', [])

.constant('AgentState', {
    VOICE: 'main.agent.voice',
    SMS: 'main.agent.sms',
    FAX: 'main.agent.fax',
    EMAIL: 'main.agent.email'
})

.config(function($stateProvider, AgentState) {
    $stateProvider
        .state(AgentState.VOICE, {
            url: '/voice'
        })
        .state(AgentState.SMS, {
            url: '/sms'
        })
        .state(AgentState.FAX, {
            url: '/fax'
        })
        .state(AgentState.EMAIL, {
            url: '/email'
        });
});
