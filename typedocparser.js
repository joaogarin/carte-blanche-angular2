'use strict';

/**
 * Use typedoc to read information about the component
 */
var fs = require('fs');

var typedoc = require('typedoc');
var options = {
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
    getComponentData: function getComponentData(sourceData, callback) {
        let app = new typedoc.Application(options),
        files_array = ['./node_modules/carte-blanche-angular2/tmp/component.ts'];
        try {
            var content = fs.writeFileSync('./node_modules/carte-blanche-angular2/tmp/component.ts', sourceData);
        } catch (exception) {
            console.error(exception);
        }
        // lauch typedoc
        app.generateJson(files_array, './node_modules/carte-blanche-angular2/tmp/out.json');
        return fs.readFileSync('./node_modules/carte-blanche-angular2/tmp/out.json', 'utf8');
    }
};
