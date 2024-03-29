import { documentCommands } from './lib/document-commands'
import { documentOptions } from './lib/document-options'
import { documentUsage } from './lib/document-usage'
import { sectionMark } from './lib/helpers'

const commandLineDocumentation = (
  cliSpec = throw new Error("Missing required parameter 'cliSpec'."),
  { mainCommand, sectionDepth = 1, title } = {}
) => {
  mainCommand = mainCommand || cliSpec.mainCommand
  if (mainCommand === undefined) {
    throw new Error("Must define the main command in call to 'commandLineDocumentation' or the CLI spec.")
  }

  title = title || `\`${mainCommand}\` Command Reference`

  let content = ''
  const depth = sectionDepth
  const { mainOptions } = cliSpec
  const { commands } = cliSpec

  content = sectionMark({ depth, header : title }) //  section/page title

  content += documentUsage({ depth, mainCommand, mainOptions })

  if (mainOptions !== undefined) {
    const mainOptionsHeader = commands === undefined ? 'Options' : 'Main options'
    content += documentOptions({ depth, header : mainOptionsHeader, allOptions : mainOptions })
  }

  if (commands !== undefined) {
    content += documentCommands({ commands, context : mainCommand, depth, header : 'Commands' })
  }

  return content
}

export { commandLineDocumentation }
