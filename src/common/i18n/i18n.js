angular.module('i18nMessages', [])

.config(function(i18nProvider, COMMON_EN) {
    i18nProvider.setDebugMode(true);
    i18nProvider.add('en', ['COMMON_EN']);
})

.constant('COMMON_EN', {
    common: {
        error: {
            unexpected: 'An unexpected error has occurred. Please try again. <br/>If the problem continues, please contact us via email <a href="mailto:app.team.vn@hoiio.com">app.team.vn@hoiio.com</a>'
        }
    }
});
