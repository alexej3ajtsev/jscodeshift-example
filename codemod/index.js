import fixObjects from './i18n-objects.js';
import fixArrays from './i18n-arrays.js';

// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = 'babel'

module.exports = function(file, api, options) {
    const fixes = [fixObjects, fixArrays];
    let src = file.source;
    fixes.forEach(fix => {
        if (typeof(src) === "undefined") { return; }
        src = fix({ ...file, source:src }, api, options);
    });
    return src;
};