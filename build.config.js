/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
     * The `build_dir` folder is where our projects are compiled during
     * development and the `compile_dir` folder is where our app resides once it's
     * completely built.
     */
    build_dir: 'build',
    compile_dir: 'bin',

    /**
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `src/`). These file paths are used in the configuration of
     * build tasks. `js` is all project javascript, less tests. `ctpl` contains
     * our reusable components' (`src/common`) template HTML files, while
     * `atpl` contains the same, but for our app's code. `html` is just our
     * main HTML file, `less` is our main stylesheet, and `unit` contains our
     * app's unit tests.
     */
    app_files: {
        js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
        jsunit: [ 'src/**/*.spec.js' ],

        atpl: [ 'src/app/**/*.tpl.html' ],
        ctpl: [ 'src/common/**/*.tpl.html' ],

        html: [ 'src/index.html' ],
        less: 'src/less/main.less'
    },

    /**
     * This is a collection of files used during testing only.
     */
    test_files: {
        js: [
            'vendor/angular-mocks/angular-mocks.js'
        ]
    },

    /**
     * This is the same as `app_files`, except it contains patterns that
     * reference vendor code (`vendor/`) that we need to place into the build
     * process somewhere. While the `app_files` property ensures all
     * standardized files are collected for compilation, it is the user's job
     * to ensure non-standardized (i.e. vendor-related) files are handled
     * appropriately in `vendor_files.js`.
     *
     * The `vendor_files.js` property holds files to be automatically
     * concatenated and minified with our project source files.
     *
     * The `vendor_files.css` property holds any CSS files to be automatically
     * included in our app.
     *
     * The `vendor_files.assets` property holds any assets to be copied along
     * with our app's assets. This structure is flattened, so it is not
     * recommended that you use wildcards.
     */
    vendor_files: {
        js: [
            'vendor/jquery/jquery.js',
            'vendor/angular/angular.js',
            'vendor/angular-resource/angular-resource.js',
            'vendor/angular-sanitize/angular-sanitize.js',
            'vendor/angular-animate/angular-animate.js',
            'vendor/angular-ui-router/release/angular-ui-router.js',

            'vendor/bootstrap/dist/js/bootstrap.js',
            'vendor/fineuploader-s3/custom.fineuploader.js',
            'vendor/momentjs/moment.js',
            'vendor/pickadate/lib/picker.js',
            'vendor/pickadate/lib/picker.date.js',
            'vendor/pickadate/lib/picker.time.js',
            'vendor/lodash/lodash.js',
            'vendor/restangular/dist/restangular.js',
            'vendor/hoiio-sdk-core/hoiio-sdk-core.js',
            'vendor/hoiio-sdk-bootstrap/hoiio-sdk-bootstrap.js'
        ],
        css: [
            'vendor/pickadate/lib/themes/classic.css',
            'vendor/pickadate/lib/themes/classic.date.css',
            'vendor/pickadate/lib/themes/classic.time.css',
            'vendor/fineuploader-s3/custom.fineuploader.css',
            'vendor/hoiio-sdk-bootstrap/hoiio-sdk-bootstrap.css',
            'vendor/hoiio-sdk-core/hoiio-sdk-core.css'
        ],
        assets: [
            'vendor/font-awesome/fonts/*'
        ],
        external_js: [
            'vendor/html5shiv/dist/html5shiv.js',
            'vendor/respond/respond.min.js',
            'vendor/es5-shim/es5-shim.min.js'
        ]
    },
    server: {
        listenPort: 4000,                                   // The port on which the server is to listen (means that the app is at http://localhost:3000 for instance)
        distFolder: __dirname + '/build'
    }
};
