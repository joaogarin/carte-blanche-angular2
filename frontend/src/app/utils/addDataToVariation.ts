/* eslint-disable no-param-reassign */
import * as _ from 'lodash';

/**
 * Adds some data to a variation string
 *
 * @param  {String} variation The variation string
 * @param  {Object} data      The data we want to add
 *
 * @return {String}           The variation with the added data
 */
export function addDataToVariation(variation, data) {
  let variationWithData = variation;
  _.map(data, (value, key) => {
    // Match the first curly brace, and replace it with a curly brace
    // and the added data
    variationWithData = variationWithData.replace(/^(\s*){/, `$1{\n  "${key}": "${value}",`);
  });
  return variationWithData;
};