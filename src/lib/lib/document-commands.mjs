import { chalkTemplateToMd } from './chalk-template-to-md'
import { commandTOC } from './command-toc'
import { documentCommandArgs } from './document-command-args'
import { documentOptions } from './document-options'
import { internalRef, sectionMark } from './helpers'

const documentCommands = ({ commands, context, depth, header }) => {
  // make a copy so we don't change the order of the original input; yes, this is duplicated in 'commandTOC', but the
  // way commands are passed, there's not a unified place to do this. It's fine for now.
  commands = [...commands].sort((a, b) => a.name.localeCompare(b.name))
  let content = '\n' + sectionMark({ depth : depth + 1, header })

  content += commandTOC({ commands, context })

  commands.forEach(({ arguments: args, commands: subCommands, description, name, summary }, i, arr) => {
    content += '\n<span id="' + internalRef(context + ' ' + name) + '"></span>\n'
    content += sectionMark({
      depth  : depth + 2,
      header : `\`${name}\``
    })

    content += `\`${context} ${name}` + documentCommandArgs({ allOptions : args }) + '`\n'

    content += description !== undefined
      ? '\n' + chalkTemplateToMd(description) + '\n'
      : summary !== undefined
        ? '\n' + chalkTemplateToMd(summary) + '\n'
        : ''

    content += documentOptions({ depth : depth + 2, header : '`' + name + '` options', allOptions : args })

    if (subCommands !== undefined && subCommands.length > 0) {
      const subCommandContext = context + ' ' + name
      content += documentCommands({
        commands : subCommands,
        context  : subCommandContext,
        depth    : depth + 2,
        header   : 'Subcommands'
      })
    }
  })

  return content
}

export { documentCommands }
