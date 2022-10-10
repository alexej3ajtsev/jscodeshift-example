// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = 'babel'

/**
 * Replace i18n arrays with arrow functions
 * 
 * before:
 * const config = [
 *  i18n('bar'),
 *  i18n('qux')
 * ]
 * 
 * after:
 * const config = () => ([
 *  i18n('bar'),
 *  i18n('qux')
 * ])
 * @param {*} file 
 * @param {*} api 
 * @returns 
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source).find(j.ArrayExpression).forEach(path => {
 
    const is18n = path.value.elements.some((prop) => {
    	return prop.type === 'CallExpression' && prop.callee.name === 'i18n'
    });
    const validParents = ['ArrowFunctionExpression', 'ReturnStatement']
  	
    if (is18n && !validParents.includes(path.parentPath.value.type)) {
      	console.log(path)
    	path = j(path).replaceWith(
          j.arrowFunctionExpression([], j.arrayExpression(path.value.elements))
        )
    }
  }).toSource();
}
