angular.module('app.main.staff.route', [])

.constant('StaffState', {
    VOICE: 'main.staff.voice',
    SMS: 'main.staff.sms',
    FAX: 'main.staff.fax',
    EMAIL: 'main.staff.email'
})

.config(function($stateProvider, StaffState) {
    $stateProvider
        .state(StaffState.VOICE, {
            url: '/voice'
        })
        .state(StaffState.SMS, {
            url: '/sms'
        })
        .state(StaffState.FAX, {
            url: '/fax'
        })
        .state(StaffState.EMAIL, {
            url: '/email'
        });
});
