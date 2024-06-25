```

## User reference

### Library API

#### `commandLineDocumentation(<cliSpec>, [options])`

Generates Markdown documentation based on the [CLI spec data structure](#cli-spec-data-structure). The documentation is in a self-contained "section" whose initial header determined by the `depth` option.

__Arguments__:
- `cliSpec`: (_object_) a [CLI spec data structure](#cli-spec-data-structure).
- `options.mainCommand`: (_string_) the name of the command being documented. This will override the `mainCommand` field in the [CLI spec](#cli-spec-data-structure) (if defined).
- `options.sectionDepth`: (_integer_, default: 1) a depth of '1' (the default) makes the initial section a title ('#') heading. A depth of two would generate an H1/## heading, etc.
- `options.title`: (_string_, default: _dynamic_) specifies the primary section heading (title). If not specified, will default to "\`${mainCommand}\` Command Reference".

#### `convertCLISpecTypes(<cliSpec>)`

Converts a file-based CLI spec (which is pure YAML/JSON) to a [CLI spec data structure](#cli-spec-data-structure) by converting string types like 'Boolean' to the actual function `Boolean`. Accepts types 'Boolean', 'Number', and 'String'. Any other 'type' value will raise an exception.

__Arguments__:
- `cliSpec`: (_object_) a [CLI spec data structure](#cli-spec-data-structure) except that the 'types' are represented by strings rather than functions.

### CLI spec data structure

The following is a comprehensive CLI spec example. It results in the [example output](#example-output) above.

```yaml
