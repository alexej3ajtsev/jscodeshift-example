export const parser = 'babel'

/**
 * Replace i18n objects with arrow functions
 * 
 * before:
 * const config = {
 *  foo: i18n('bar'),
 *  baz: i18n('qux')
 * }
 * 
 * after:
 * const config = () => ({
 *  foo: i18n('bar'),
 *  baz: i18n('qux')
 * })
 * @param {*} file 
 * @param {*} api 
 * @returns 
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source).find(j.ObjectExpression).forEach(path => {
  	
    const is18n = path.value.properties.some((prop) => {
    	return prop.value.type === 'CallExpression' && prop.value.callee.name === 'i18n'
    });
    const validParents = ['ArrowFunctionExpression', 'ReturnStatement']
  	
    if (is18n && !validParents.includes(path.parentPath.value.type)) {
      	console.log(path)
    	path = j(path).replaceWith(
          j.arrowFunctionExpression([], j.objectExpression(path.value.properties))
        )
    }
  }).toSource();
}