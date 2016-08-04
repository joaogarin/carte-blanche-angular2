/**
 * carte blanche implementation for angular2
 */
const path = require('path');
const isString = require('lodash/isString');
const isNaN = require('lodash/isNaN');
const defaults = require('lodash/defaults');


const typedocparse = require('./typedocparser.js');
const type_doc_parser = typedocparse.getComponentData;
const type_doc_analyzer = typedocparse.resolveComponentInfo;

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
function Angular2Plugin(options) {
    // Make sure the plugin was instantiated as a constructor, i.e. new Angular2Plugin()
    if (!(this instanceof Angular2Plugin)) {
        throw new Error(
            'The Angular2Plugin must be instantiated with the "new" keyword, i.e. "new Angular2Plugin()"\n\n'
        );
    }

    this.options = options || {};

    // The hostname option must be a string
    if (this.options.hostname && !isString(this.options.hostname)) {
        throw new Error('The "hostname" option of the Angular2Plugin must be a string!\n\n');
    }

    const parsedPort = parseFloat(this.options.port);
    // The port option must be something that can be made a number
    if (this.options.port && isNaN(parsedPort)) {
        throw new Error('The "port" option of the Angular2Plugin must be a number!\n\n');
    }

    // If the port can be interpreted as a number, it must be above 0 and below 65535
    if (parsedPort < 0 || parsedPort > 65535) {
        throw new Error('The "port" must be between 0 and 65535 (inc)!\n\n');
    }

    // The variationFolderName option must be a string
    if (this.options.variationFolderName && !isString(this.options.variationFolderName)) {
        throw new Error(
            'The "variationFolderName" option of the Angular2Plugin must be a string!\n\n'
        );
    }

    // The files option must be an Array or a String
    if (this.options.files
        && !isString(this.options.files)
        && (!Array.isArray(this.options.files))) {
        throw new Error(
            'The "files" option of the Angular2Plugin must be an array!\n\n'
        );
    }
}

/**
 * Initializes the plugin, called after the main function above
 */
Angular2Plugin.prototype.apply = function apply(compiler) {
    // Setting Default options for the plugin
    const options = defaults({}, this.options, {
        hostname: 'localhost',
        files: [],
        injectTags: [],
        port: 8082,
        variationFolderName: 'variations',
    });

    // Variations folder path
    const projectBasePath = compiler.options.context;
    const variationBasePath = path.join(projectBasePath, options.variationFolderName);
    options.variationBasePath = variationBasePath;

    // TODO - Run the server to get list and save variations
    compiler.plugin('compilation', (compilation) => {
        // Called before processing the components, mutate data to pass it around
        compilation.plugin('carte-blanche-plugin-before-processing', function (data) {
            // Read the data from this component
            let AngularSource = type_doc_parser(data.source);
            data.AngularSouce = AngularSource;
            data.AngularSourceParsed = type_doc_analyzer(JSON.parse(AngularSource));
        });
        compilation.plugin('carte-blanche-plugin-assets-processing', function (assets) {
            assets.push(path.join(__dirname, './frontend/polyfills.js'));
        });
        // Called after the processing, gets the renderToClient API to visually
        compilation.plugin(
            'carte-blanche-plugin-processing',
            (renderToClient) => {
                renderToClient({
                    // TODO the name is used in the iframe & playground list
                    // best to pass it in there instead of hardcoding it
                    name: 'angular2',
                    frontendData: { options },
                    frontendPlugin: `${require.resolve('./frontend/index.js')}`, // eslint-disable-line global-require,max-len
                });
            }
        );
    });

};

module.exports = Angular2Plugin;
