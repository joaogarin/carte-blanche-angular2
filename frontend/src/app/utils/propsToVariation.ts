import * as _ from 'lodash';

export function propsToVariation(rawProps) {
    const functionStore = {};
    const props = rawProps;
    const extractAndReplaceFunctions = (object) => {
        _.forEach(object, (value, key) => {
            if (_.isFunction(value)) {
                const id = _.uniqueId('CARTE_BLANCHE_FUNCTION_');
                functionStore[id] = value.toString();
                object[key] = id; // eslint-disable-line no-param-reassign
            } else if (_.isObject(value)) {
                extractAndReplaceFunctions(value);
            }
        });
    };

    extractAndReplaceFunctions(props);
    let stringifiedProps = `${JSON.stringify({ props }, null, 2)};`;
    _.forEach(functionStore, (functionSource:any, id) => {
        var re = new RegExp(id);
        stringifiedProps = stringifiedProps.replace(re, functionSource);
    });
    return stringifiedProps;
};