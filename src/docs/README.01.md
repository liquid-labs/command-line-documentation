# command-line-documentation
[![coverage: 95%](./.readme-assets/coverage.svg)](https://github.com/liquid-labs/command-line-documentation/pulls?q=is%3Apr+is%3Aclosed)

Generates Markdown "user guide" based off CLI spec compatible with [command-line-args]() and [command-line-usage]().

___ALPHA status software___: The main documentaiton feature is working but we expect to add significant new functionality and improve ease of use before GA.

- [Install](#install)
- [Usage](#usage)
  - [Library usage](#library-usage)
  - [`cld` usage](#cld-usage)
- [Example output](#example-output)
- [User reference](#user-reference)
  - [Library API](#library-api)
  - [CLI spec data structure](#cli-spec-data-structure)
  - [CLI reference](#cli-reference)

## Install

```bash
npm i command-line-documentation
```

## Usage

### Library usage

To create self-documenting CLIs.

```javascript
// for ESM
import { commandLineDocumentation/*, convertCLISpecTypes */ } from 'command-line-documentation'
import commandLineArgs from 'command-line-args'
// for CJS
// const { commandLineDocumentation } = require('command-line-documentation')
// const commandLineArgs = require('command-line-args')

const mainCommand = 'do-it'
const cliSpec = {
  mainCommand,
  arguments: [
    { name: 'verbose', alias: 'v', type: Boolean, description: 'Makes the output chatty.'},
    { name: 'document', type: Boolean, description: `Generates Markdown documentation for '${mainCommand}'.`}
  ]
}

const options = commandLineArgs(cliSpec.arguments)

if (options.document === true) {
  commandLineDocumentation(cliSpec)
  process.exit(0)
}
```

### `cld` usage

To generate documentation from a YAML or JSON spec file:

```bash
npx cld path/to/cli-spec.yaml
```

To append CLI documentation to `README.md`:

```bash
npx cld src/cli-spec.mjs --section-depth 2 --titles 'Command line reference'
```

## Example output

You can see this package's `cld` documentation [here](#cli-reference).

Processing the [example CLI spec](#cli-spec-data-structure) would generate:
```markdown
