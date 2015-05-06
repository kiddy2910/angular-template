angular.module('app.main.staff.route', [])

.constant('StaffState', {
    BWL: 'main.staff.bwl',
    BWL_IMPORT: 'main.staff.bwl.import',
    BWL_EXPORT: 'main.staff.bwl.export',
    FORMS: 'main.staff.forms',
    HISTORY: 'main.staff.history',
    HISTORY_LOG: 'main.staff.history.log'
})

.config(function($stateProvider, StaffState, Medium) {
    $stateProvider
        .state(StaffState.BWL, {
            url: '/bwl',
            templateUrl: 'main/shared/bwl.tpl.html',
            controller: 'StaffBwlCtrl'
        })
        .state(StaffState.BWL_IMPORT, {
            url: '/import',
            onEnter: function($stateParams, $state, modal, StaffState) {
                modal({
                    templateUrl: 'main/staff/import-consent/import-consent.tpl.html',
                    controller: 'ImportConsentCtrl'
                }).show().finally(function() {
                    $state.go(StaffState.BWL);
                });
            }
        })
        .state(StaffState.BWL_EXPORT, {
            url: '/export',
            onEnter: function($stateParams, $state, modal, StaffState) {
                modal({
                    templateUrl: 'main/staff/export-consent/export-consent.tpl.html',
                    controller: 'ExportConsentCtrl'
                }).show().finally(function() {
                    $state.go(StaffState.BWL);
                });
            }
        })
        .state(StaffState.FORMS, {
            url: '/form',
            templateUrl: 'main/staff/consentform/consentform.tpl.html',
            controller: 'ConsentFormCtrl'
        })
        .state(StaffState.HISTORY, {
            url: '/history',
            templateUrl: 'main/staff/history/history.tpl.html',
            controller: 'HistoryCtrl'
        })
        .state(StaffState.HISTORY_LOG, {
            url: '/:destination/logs',
            onEnter: function($stateParams, $state, modal, StaffState) {
                modal({
                    templateUrl: 'main/staff/history/history-log.tpl.html',
                    controller: 'HistoryLogCtrl',
                    data: {
                        destination: $stateParams.destination
                    }
                }).show().finally(function() {
                    $state.go(StaffState.HISTORY);
                });
            }
        });
});
