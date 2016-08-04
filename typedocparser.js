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

function checkChildren(object) {
    let analyzedObject = {
        elements: [],
    };
    // go through every child and fetch component decorators
    if (typeof object.children != 'undefined') {
        object.children.forEach(val => {
            let componentDecorators = getChildComponentDecorators(val);
            let componentInputs = getChildComponentInputs(val);
            let componentInfo = getComponentInfo(val);

            // Create the element and put it in the array
            let element = {
                componentInfo: componentInfo,
                componentDecorators: componentDecorators,
                inputs: componentInputs,
            };
            analyzedObject.elements = [...analyzedObject.elements, element];
            //checkChildren(val);
        });
    }
    return analyzedObject;
}

/**
 * Get some basic info on the component like name, children properties etc.
 */
function getComponentInfo(object) {
    if (typeof object.children != 'undefined' && object.children.length > 0) {
        // Go throguh each children and return the class that has a component decorator (the component)
        // right now only works if the decorator is right on top of the component !
        let componentArray = object.children.filter(val => {
            return val.kindString == 'Class' && (typeof val.decorators.length != 'undefined' && val.decorators[0].name == 'Component');
        });
        if (componentArray.length > 0) {
            // Return the first component. There shouldn't be multiple components in one file.
            return componentArray[0];
        }
    }
}

/**
 * Get the component decorators
 * This will be used to render the component in the frontend dynamically.
 */
function getChildComponentDecorators(object) {
    let componentDecorators = [];
    if (typeof object.children[0].decorators != 'undefied' && object.children[0].decorators.length > 0) {
        object.children[0].decorators.forEach((val) => {
            if (val.name = 'Component') {
                componentDecorators = [...componentDecorators, val];
            }
        });
    }
    return componentDecorators;
}

function getChildComponentInputs(object) {
    let componentInputs = [];

    if (typeof object.children[0].children != 'undefied' && object.children[0].children.length > 0) {
        let objectChildren = object.children[0].children.filter((item) => {
            return item.kindString == 'Property' && typeof (item.decorators != 'undefined' && item.decorators.length > 0);
        }).forEach((input) => {
            componentInputs = [...componentInputs, input];
        });
    };
    return componentInputs;
}

function resolveComponentInfo(data) {
    return checkChildren(data);
}

function getComponentData(sourceData, callback) {
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

// export functions
module.exports.getComponentData = getComponentData;
module.exports.resolveComponentInfo = resolveComponentInfo;