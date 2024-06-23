import { documentCommandArgs } from './document-command-args'
import { sectionMark } from './helpers'

const documentUsage = ({ depth, mainCommand, args }) => {
  let usage = sectionMark({ depth : depth + 1, header : 'Usage' })

  usage += '`' + mainCommand

  usage += documentCommandArgs({ allOptions : args }) + '`\n\n'

  return usage
}

export { documentUsage }
