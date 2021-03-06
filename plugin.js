/**
 * carte blanche implementation for angular2
 */
const fork = require('child_process').fork;
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
 * Kill a Node.js process
 */
function killProcess(proc, err) {
    proc.kill('SIGINT');
    if (err) {
        console.log('Uncaught Exception...'); // eslint-disable-line no-console
        console.log(err.stack); // eslint-disable-line no-console
        process.exit(1);
    } else {
        process.exit();
    }
}


/**
 * Initializes the plugin, called after the main function above
 */
Angular2Plugin.prototype.apply = function apply(compiler) {
    // Setting Default options for the plugin
    const options = defaults({}, this.options, {
        hostname: 'localhost',
        bundle: 'main.js',
        files: [],
        injectTags: [],
        port: 8082,
        variationFolderName: 'variations',
    });

    // Variations folder path
    const projectBasePath = compiler.options.context;
    const variationBasePath = path.join(projectBasePath, options.variationFolderName);
    options.variationBasePath = variationBasePath;

    const server = fork(path.join(__dirname, './server/run.js'), [
        projectBasePath, // process.argv[2]
        JSON.stringify(options), // process.argv[3]
    ]);

    // Prevent the process from exiting immediately
    process.stdin.resume();

    // When the plugin exits for any reason, kill the forked Node.js process
    // with the server. (exit = process.exit(), SIGINT = CTRL+C, uncaughtException =
    // error in the code)
    process.on('exit', killProcess.bind(null, server));
    process.on('SIGINT', killProcess.bind(null, server));
    process.on('uncaughtException', killProcess.bind(null, server));

    compiler.plugin('compilation', (compilation) => {
        // Called before processing the components, mutate data to pass it around
        compilation.plugin('carte-blanche-plugin-before-processing', function (data) {
            // Read the data from this component
            let AngularSource = type_doc_parser(data.source);
            data.AngularSouce = AngularSource;
            // @TODO - Support common chunks
            data.bundle = options.bundle;
            data.basePath = compiler.options.devServer ? `http://${compiler.options.devServer.host}:${compiler.options.devServer.port}` : `${options.hostname}:${options.port}`;
            data.AngularSourceParsed = type_doc_analyzer(JSON.parse(AngularSource));
        });
        compilation.plugin('carte-blanche-plugin-assets-processing', function (assets) {
            // Polyfills and vendor file for Carteblanche angular2 plugin
            assets.push(path.join(__dirname, './frontend/polyfills.js'));
            assets.push(path.join(__dirname, './frontend/vendor.js'));
        });
        // Called after the processing, gets the renderToClient API to visually
        compilation.plugin(
            'carte-blanche-plugin-processing',
            (renderToClient) => {
                renderToClient({
                    // @TODO the name is used in the iframe & playground list
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
