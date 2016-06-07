/**
 * carte blanche implementation for angular2
 */

/**
 * Initial plugin function
 * 
 * @params {Object} options
 * The options the user sends to the plugin
 * 
 * We should get from the user : 
 * 
 * hostname - hostname for the server
 * port - Port where the server will run
 * variationFolderName - The folder where the variants area
 * files - Files where to look for components? * question
 * 
 */
function carteBlancheAngular2(options) {
    // Make sure the plugin was instantiated as a constructor, i.e. new carteBlancheAngular2()
    if (!(this instanceof carteBlancheAngular2)) {
        throw new Error(
            'The carteBlancheAngular2 must be instantiated with the "new" keyword, i.e. "new carteBlancheAngular2()"\n\n'
        );
    }

    this.options = options || {};

    // The hostname option must be a string
    if (this.options.hostname && !isString(this.options.hostname)) {
        throw new Error('The "hostname" option of the carteBlancheAngular2 must be a string!\n\n');
    }

    const parsedPort = parseFloat(this.options.port);
    // The port option must be something that can be made a number
    if (this.options.port && isNaN(parsedPort)) {
        throw new Error('The "port" option of the carteBlancheAngular2 must be a number!\n\n');
    }

    // If the port can be interpreted as a number, it must be above 0 and below 65535
    if (parsedPort < 0 || parsedPort > 65535) {
        throw new Error('The "port" must be between 0 and 65535 (inc)!\n\n');
    }

    // The variationFolderName option must be a string
    if (this.options.variationFolderName && !isString(this.options.variationFolderName)) {
        throw new Error(
            'The "variationFolderName" option of the carteBlancheAngular2 must be a string!\n\n'
        );
    }

    // The files option must be an Array or a String
    if (this.options.files
        && !isString(this.options.files)
        && (!Array.isArray(this.options.files))) {
        throw new Error(
            'The "files" option of the carteBlancheAngular2 must be an array!\n\n'
        );
    }
}

/**
 * Initializes the plugin, called after the main function above
 */
carteBlancheAngular2.prototype.apply = function apply(compiler) {
    // Setting Default options for the plugin
    const options = defaults({}, this.options, {
        hostname: 'localhost',
        files: [],
        injectTags: [],
        port: 8082,
        variationFolderName: 'variations',
    });

    compiler.plugin('compilation', function (compilation) {
        // Called before processing the components, mutate data to pass it around
        compilation.plugin('carte-blanche-plugin-before-processing', function (data) {

        });
        // Called after the processing, gets the renderToClient API to visually
        // render something in the client area
        compilation.plugin('carte-blanche-plugin-processing', function (renderToClient) {
            renderToClient({
                name: 'carteBlancheAngular2',
                frontendData: { options: options },
                frontendPlugin: `${require.resolve('./frontend/frontend.js')}`,
            });
        });
    });
};

export default carteBlancheAngular2;
