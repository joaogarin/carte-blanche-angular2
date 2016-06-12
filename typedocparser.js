/**
 * Use typedoc to read information about the component
 */
var fs = require('fs');

var typedoc = require('typedoc');
const options = {
    'mode': 'modules',
    'theme': 'default',
    'ignoreCompilerErrors': 'true',
    'experimentalDecorators': 'true',
    'emitDecoratorMetadata': 'true',
    'target': 'ES5',
    'moduleResolution': 'node',
    'preserveConstEnums': 'true',
    'stripInternal': 'true',
    'suppressExcessPropertyErrors': 'true',
    'suppressImplicitAnyIndexErrors': 'true',
    'module': 'commonjs'
};

module.exports = {
    getComponentData: function (sourceData, callback) {
        // write source in files
        console.log('Start reading the component with typedoc');
        /**
         * Write temprarily the component and return a string of component paths (what typedoc expects)
         * 
         * @return {Array} 
         * An array of paths for the components to be analyzed
         */
        function writeTmpComponent(cb) {
            console.log('Writing files');
            fs.writeFile('./node_modules/carte-blanche-angular2/tmp/component.ts', sourceData, err => {
                if (err) {
                    return console.error(err);
                }
                var files_array = [];
                files_array.push('./node_modules/carte-blanche-angular2/tmp/component.ts');
                cb(files_array);
            });
        }

        function readTmpComponent(cb) {
            console.log('Reading files');
            fs.readFile('./node_modules/carte-blanche-angular2/tmp/out.json', 'utf8', (err, data) => {
                if (err) {
                    return console.error(err);
                }
                cb(JSON.parse(data));
            });
        }

        // Get the path to the component and analyze via typedoc
        writeTmpComponent(files => {
            var app = new typedoc.Application(options);
            app.generateJson(files, './node_modules/carte-blanche-angular2/tmp/out.json');

            // Read the component
            var json_output = readTmpComponent(jsonComponent => {
                // Return the json
                callback(jsonComponent);
            });
        });
    }
}