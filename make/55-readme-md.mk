README:=README.md
README_INPUTS:=$(SRC)/docs/README.01.md $(SRC)/docs/README.02.md $(SRC)/docs/README.03.md
CLD_SPEC:=$(SRC)/cli/cli-spec.mjs
EXAMPLE_CLD_SPEC:=$(SRC)/cli/test/data/example-data-structure.yaml 
README_SRC:=$(SRC)/cli/cli-spec.mjs $(SDLC_COMMAND_LINE_DOCUMENTATION_EXEC_JS) $(SDLC_TEST_PASS_MARKER) $(README_INPUTS) $(EXAMPLE_CLD_SPEC)

$(README): $(README_SRC)
	cp $(SRC)/docs/README.01.md $@
	$(SDLC_COMMAND_LINE_DOCUMENTATION_EXEC_JS) $(EXAMPLE_CLD_SPEC) >> $@
	cat $(SRC)/docs/README.02.md >> $@
	cat $(EXAMPLE_CLD_SPEC) >> $@
	cat $(SRC)/docs/README.03.md >> $@
	$(SDLC_COMMAND_LINE_DOCUMENTATION_EXEC_JS) $(CLD_SPEC) --section-depth 3 --title 'CLI reference' >> $@

BUILD_TARGETS+=$(README)