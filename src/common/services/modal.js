angular.module('service.modal', [])

.factory('modal', function($rootScope, $compile, $templateCache, $controller) {

    function Modal(options) {
        this.parentScope = options.parentScope;
        this.templateUrl = options.templateUrl;
        this.controller = options.controller;
        this.$$data = angular.extend({}, options.data);
    }

    Modal.prototype.show = function() {
        if (!this.templateUrl) {
            throw 'Modal must have property [templateUrl]';
        }

        var modalScope = this.parentScope ? this.parentScope.$new(false) : $rootScope.$new(false);
        modalScope = angular.extend(modalScope, this.$$data);
        modalScope.$$modal = this;

        if (this.controller != null) {
            $controller(this.controller, {
                $scope: modalScope
            });
        }

        this.modalElement = $($templateCache.get(this.templateUrl));
        $('body').append(this.modalElement);
        $compile(this.modalElement)(modalScope);

        var self = this;
        this.modalElement.on('hidden.bs.modal', function() {
            if (modalScope != null) {
                // destroy scope of modal every time close modal
                modalScope.$destroy();
            }
            self.modalElement.remove();
        });

        this.modalElement.modal('show');
    };

    Modal.prototype.hide = function() {
        if (this.modalElement != null) {
            this.modalElement.modal('hide');
        }
    };

    return function(options) {
        return new Modal(options);
    };
});
