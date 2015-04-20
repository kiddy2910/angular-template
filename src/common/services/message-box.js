angular.module('service.messageBox', [])

.factory('messageBox', function($rootScope, $timeout, $compile, $templateCache, $location, $window) {

    var success = 'success',
        warn = 'warn',
        templateUrl = 'services/templates/message-box.tpl.html';

    function MessageBox() {
        this.isLocal = $location.host().indexOf('localhost') === 0;
    }

    MessageBox.prototype.showSuccess = function(msg, title) {
        if ($window.Hoiio && !this.isLocal) {
            $window.Hoiio.showSuccess(msg);
        } else {
            showMB(success, msg, title);
        }
    };

    MessageBox.prototype.showWarn = function(msg, title) {
        if ($window.Hoiio && !this.isLocal) {
            $window.Hoiio.showWarn(msg);
        } else {
            showMB(warn, msg, title);
        }
    };

    function showMB(type, msg, title) {
        var ele = $($templateCache.get(templateUrl)),
            scope = createScope(msg, type);

        $compile(ele)(scope);
        $('body').append(ele);

        $timeout(function() {
            ele.fadeOut('slow', function() {
                scope.$destroy();
                ele.remove();
            });
        }, 3000);
    }

    function createScope(msg, type) {
        return angular.extend($rootScope.$new(true), {
            message: msg,
            isSuccess: type === success
        });
    }

    return new MessageBox();
});
