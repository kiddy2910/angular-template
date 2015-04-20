angular.module('app.main', ['app.main.route', 'app.main.header'])

.controller('MainCtrl', function($scope, AppData, ConsentForms) {
    $scope.appData = AppData;
    $scope.consentForms = ConsentForms;
});
