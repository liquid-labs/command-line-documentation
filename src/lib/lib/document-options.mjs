import { chalkTemplateToMd } from './chalk-template-to-md'
import { displayArg } from './display-arg'
import { displayOptionDetails } from './display-option-details'
import { sectionMark, separateOptions } from './helpers'

const documentOptions = ({ depth, header, allOptions }) => {
  const { defaultOption, options } = separateOptions(allOptions)
  if ((!options || options.length === 0) && defaultOption === undefined) {
    return ''
  }

  let content = '\n' + sectionMark({ depth : depth + 1, header })

  content += '|Option|Description|\n|------|------|\n'

  if (defaultOption !== undefined) {
    const { description, required } = defaultOption
    content += '|`' + displayArg(defaultOption)
      + `\`|(_main argument_, _${required === true ? 'req' : 'opt'}_) ` + description + '|\n'
  }

  for (const option of options) {
    const { alias, name, description } = option
    content += '|`--' + name + '`'
    if (alias !== undefined) {
      content += ', `-' + alias + '`'
    }
    content += '|' + displayOptionDetails(option) + chalkTemplateToMd(description) + '|\n'
  }

  return content
}

export { documentOptions }
