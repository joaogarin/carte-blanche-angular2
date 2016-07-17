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
        try {
            var content = fs.writeFileSync('./node_modules/carte-blanche-angular2/tmp/component.ts', sourceData);
        } catch (exception) {
            console.error(exception);
        }
        
        var files_array = [];
        files_array.push('./node_modules/carte-blanche-angular2/tmp/component.ts');
        // lauch typedoc
        var app = new typedoc.Application(options);
        var written = app.generateJson(files_array, './node_modules/carte-blanche-angular2/tmp/out.json');
        return component = fs.readFileSync('./node_modules/carte-blanche-angular2/tmp/out.json', 'utf8');
    }
}
