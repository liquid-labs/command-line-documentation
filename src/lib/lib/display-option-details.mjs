const displayOptionDetails = ({ default: def, required, type, typeDesc }) => {
  typeDesc = typeDesc 
    || (type === Boolean && 'bool')
    || (type === Number && 'number')
    || ((type === String || type === undefined) && 'string')
    || throw new Error(`Unknown type and no typeDesc (${type}).`)

  let detail = '(_' + typeDesc + '_, _' + (required === true ? 'req' : 'opt') + '_'
  if (def !== undefined) {
    detail += ', default: ' + def
  }
  detail += ') '

  return detail
}

export { displayOptionDetails }