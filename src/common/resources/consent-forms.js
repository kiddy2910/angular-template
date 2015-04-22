angular.module('resources.consentForms', [])

.factory('consentFormService', function(r) {
    var ConsentForms = r('/consentforms');

    return ConsentForms;
});
