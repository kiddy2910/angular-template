angular.module('service.modal', [])

.factory('modal', function($rootScope, $compile, $templateCache, $controller) {

    function Modal(opts) {
        this.parentScope = opts.parentScope;
        this.templateUrl = opts.templateUrl;
        this.controller = opts.controller;
        this.data = angular.extend({}, opts.data);
        this.finally = angular.noop;
    }

    Modal.prototype.show = function() {
        if (!this.templateUrl) {
            throw 'Modal must have property [templateUrl]';
        }

        var modalScope = angular.extend(this.parentScope ? this.parentScope.$new(false) : $rootScope.$new(false), this.data, {
            $$modal: this
        });

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
            self.finally();
        });

        this.modalElement.modal('show');
        return this;
    };

    Modal.prototype.hide = function() {
        if (this.modalElement != null) {
            this.modalElement.modal('hide');
        }
    };

    Modal.prototype.finally = function(fn) {
        this.finally = fn || angular.noop;
    };

    return function(opts) {
        return new Modal(opts);
    };
});
