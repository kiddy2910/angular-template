angular.module('service.confirmModal', [])

.factory('confirmModal', function($rootScope, $compile, $templateCache) {

    function ConfirmModal(options) {
        this.options = options;
    }

    ConfirmModal.prototype.open = function() {
        var self = this;

        self.modalElement = $($templateCache.get('services/templates/confirm-modal.tpl.html'));
        $('body').append(self.modalElement);

        // create new isolated scope every time open modal
        self.modalScope = createScope(self, self.options);

        // link template to new isolated scope of modal
        $compile(self.modalElement)(self.modalScope);

        self.modalElement.on('hidden.bs.modal', function() {
            if (self.modalScope != null) {
                // destroy scope of modal every time close modal
                self.modalScope.$destroy();
            }
            self.modalElement.remove();
        });

        self.modalElement.modal();
    };

    ConfirmModal.prototype.close = function() {
        if (this.modalElement != null) {
            this.modalElement.modal('hide');
        }
    };

    ConfirmModal.prototype.stop = function() {
        if (this.modalScope != null) {
            this.modalScope.isConfirming = false;
        }
    };

    function createScope(instanceOfModal, options) {
        var title = options.title,
            content = options.content,
            confirmLabel = options.confirmLabel || 'Yes',
            rejectLabel = options.rejectLabel || 'No',
            confirmedCallback = options.confirmed || function() {},
            rejectedCallback = options.rejected || function() {};

        var modalScope = $rootScope.$new(true);
        modalScope.title = title;
        modalScope.content = content;
        modalScope.confirmLabel = confirmLabel;
        modalScope.rejectLabel = rejectLabel;
        modalScope.isConfirming = false;
        modalScope.confirmedCallback = function() {
            this.isConfirming = true;
            confirmedCallback(instanceOfModal);
        };
        modalScope.rejectedCallback = rejectedCallback;

        return modalScope;
    }

    return function(options) {
        return new ConfirmModal(options);
    };
});
