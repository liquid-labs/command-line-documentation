const cliSpec = {
  mainCommand : 'cld',
  arguments   : [
    {
      name          : 'cli-spec-path',
      type : String,
      description   : 'The path to the YAML/JSON CLI spec file or Javascript file exporting `cliSpec`.',
      defaultOption : true,
      required : true
    },
    {
      name        : 'section-depth',
      type        : Number,
      description : "A depth of 1 (the default) makes the initial section a title (H1/'#') heading. A depth of 2 would generate an H2/'##' heading, etc.",
      typeDesc : 'integer',
      default : 1,
      validations : {
        'min-value' : 1,
        'max-value' : 6,
        'match-re'  : /^\s*\d\s*$/
      }
    },
    {
      name        : 'title',
      type  : String,
      description : 'Specifies the primary section heading (title). By default, this is the `mainCommand` + " Command Reference".',
      default : 'see description'
    }
  ]
}

export { cliSpec }