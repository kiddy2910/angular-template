angular.module('constant.appEnums', [])

.constant('AppMode', {
    DEV: 'dev',
    BETA: 'beta',
    PROD: 'prod'
})

.constant('Medium', {
    VOICE: 'VOICE',
    SMS: 'SMS',
    FAX: 'FAX',
    EMAIL: 'EMAIL',
    MAIL: 'MAIL'
})

.constant('Notification', {
    VOICE: 'VOICE',
    SMS: 'SMS',
    EMAIL: 'EMAIL'
})

.constant('AllowStatus', {
    ALLOWED: 'ALLOWED',
    BLOCKED: 'BLOCKED',
    UNREGISTERED: 'UNREGISTERED'
});
