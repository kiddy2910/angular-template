angular.module('service.confirmModal', [])

.factory('confirmModal', function(modal) {

    function CM(opts) {
        var self = this;
        this.$$modal = modal({
            templateUrl: 'services/templates/confirm-modal.tpl.html',
            data: opts,
            controller: function($scope) {
                self.$$scope = $scope;
                $scope.icon = $scope.icon || '';
                $scope.color = $scope.color || '';
                $scope.yesLabel = $scope.yesLabel || 'Yes';
                $scope.noLabel = $scope.noLabel || 'No';
                $scope.isConfirming = false;
                $scope.reject = ($scope.onRejected || angular.noop);
                $scope.confirm = function() {
                    $scope.isConfirming = true;
                    ($scope.onConfirmed || angular.noop)(self);
                };
                $scope.isNoIcon = function() {
                    return $scope.icon === '';
                };
            }
        });
    }

    CM.prototype.show = function() {
        this.$$modal.show();
    };

    CM.prototype.hide = function() {
        this.$$modal.hide();
    };

    CM.prototype.stopConfirming = function() {
        this.$$scope.isConfirming = false;
    };

    return function(opts) {
        return new CM(opts);
    };
});
