import * as fs from 'node:fs/promises'
import * as fsPath from 'node:path'

import commandLineArgs from 'command-line-args'
import yaml from 'js-yaml'

import { cliSpec } from './cli-spec'
import { commandLineDocumentation } from '../lib/command-line-documentation'
import { convertCLISpecTypes } from '../lib/convert-cli-spec-types'

const cld = async({ argv = process.argv, stderr = process.stderr, stdout = process.stdout } = {}) => {
  const options = commandLineArgs(cliSpec.arguments, { argv })
  const filePath = options['cli-spec-path']
  const { 'section-depth': sectionDepth = 2, title = 'CLI reference' } = options

  if (filePath === undefined) {
    stderr.write('Missing required CLI spec path.\n')
    return 1
  }

  const ext = fsPath.extname(filePath).toLowerCase()

  let nativeCLISpec
  if (ext === '.yaml' || ext === '.yml' || ext === '.json') {
    let fileContents
    try {
      fileContents = await fs.readFile(filePath, { encoding : 'utf8' })
    }
    catch (e) {
      if (e.code === 'ENOENT') {
        stderr.write(`No such file '${'./' + filePath}'.\n`)
        return 2
      }
      stderr.write(e.message + '\n')
      return 10
    }

    let rawCLISpec
    try {
      rawCLISpec = yaml.load(fileContents)
    }
    catch (e) {
      stderr.write(`Cannot parse '${filePath}' as YAML or JSON file; ${e.message}\n`)
      return 3
    }

    try {
      nativeCLISpec = convertCLISpecTypes(rawCLISpec)
    }
    catch (e) {
      stderr.write('Invalid CLI spec; ' + e.message + '\n')
      return 4
    }
  }
  else { // if (ext === '.js' || ext === '.mjs') {
    const absPath = fsPath.resolve(filePath)
    nativeCLISpec = (await import(absPath)).cliSpec
  } /*
  else {
    process.stderr.write(`Unknown file type '${ext}'. File must be either yaml, json, or a Javascript module file.`)
    return 11
  } */

  const doc = commandLineDocumentation(nativeCLISpec, { sectionDepth, title })

  stdout.write(doc)
  return 0
}

export { cld, cliSpec }
