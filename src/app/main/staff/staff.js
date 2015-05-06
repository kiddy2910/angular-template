angular.module('app.main.staff', ['app.main.staff.route',
    'app.main.staff.header', 'app.main.staff.sidebar',
    'app.main.staff.history', 'app.main.staff.bwl',
    'app.main.staff.importConsent', 'app.main.staff.exportConsent',
    'app.main.staff.consentForm'
])

.controller('StaffCtrl', function($state, StaffState) {
    $state.go(StaffState.BWL);
});
