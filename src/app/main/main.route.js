angular.module('app.main.route', [])

.config(function($stateProvider) {

    $stateProvider
        .state('main', {
            templateUrl: 'main/main.tpl.html',
            controller: 'MainCtrl',
            resolve: {
                AppData: function(appDataService) {
                    return appDataService.get();
                },

                ConsentForms: function(consentFormService) {
                    return consentFormService.list();
                }
            }
        });
});
