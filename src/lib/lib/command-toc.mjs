import { internalRef, sectionMark } from './helpers'

const commandTOC = ({ commands, context, depth, header }) => {
  // make a copy so we don't change the order of the original input
  commands = [...commands].sort((a, b) => a.name.localeCompare(b.name))
  let content = header === undefined ? '' : sectionMark({ depth : depth + 1, header })

  for (const { description, name, summary } of commands) {
    content += `- [\`${name}\`](#${internalRef(context + ' ' + name)})`
    let shortDescription = summary
    if (shortDescription === undefined) { // then we take the first sentence of the description
      const indexOfFirstPeriod = description.indexOf('.')
      shortDescription = indexOfFirstPeriod === -1 ? description : description.slice(0, indexOfFirstPeriod + 1)
    }
    if (shortDescription !== undefined) {
      content += `: ${shortDescription}`
    }
    content += '\n'
  }

  content += '\n'

  return content
}

export { commandTOC }
