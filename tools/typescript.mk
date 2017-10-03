# Copyright (C) 2017 Thomas Hellström <rel@xed.se>
#
# This file is part of librelaxed-ansicolors.
#
# librelaxed-ansicolors is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# librelaxed-ansicolors is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with librelaxed-ansicolors.  If not, see <http://www.gnu.org/licenses/>.
#

# =====================================================================================================================
# Configurations
# =====================================================================================================================

# Paths
APP_SRC	       ?= src
TEST_SRC       ?= test
DIST           ?= lib
COVERAGE       ?= coverage

# Programs - Mocha
MOCHA          ?= ./node_modules/.bin/mocha
MOCHAFLAGS     ?= --reporter list
MOCHA_COLORFIX ?= --color 2>&1 |sed -e 's/\x1b\[90m/\x1b[92m/g'

# Programs - Istanbul
ISTANBUL       ?= ./node_modules/.bin/istanbul

# Programs - Typescript compiler
TSC            ?= ./node_modules/.bin/tsc
TSCFLAGS       ?= --target es6 --lib es6 --module commonjs --pretty --moduleResolution node --removeComments
#TSCFLAGS       += --listfiles --listEmittedFiles

#
# make init              Initialize module
# make build             Create module
# make test              Run test
# make coverage          Create coverage report
# make clean             Remove build artifacts
# make distclean         Remove except sources and config
#
# =====================================================================================================================
# Init environment
# =====================================================================================================================
.PHONY: init
init:
	@tools/init.sh

# =====================================================================================================================
# Define some standard locations for app
# =====================================================================================================================
APP_TS      := $(shell find $(APP_SRC)/ -name '*.ts' -a -not -name '*.d.ts')
APP_D_TS    := $(patsubst $(APP_SRC)%.ts, $(DIST)/$(APP_SRC)%.d.ts, $(APP_TS))
APP_JS      := $(patsubst $(APP_SRC)%.ts, $(DIST)/$(APP_SRC)%.js, $(APP_TS))
APP_JS_MAP  := $(patsubst $(APP_SRC)%.ts, $(DIST)/$(APP_SRC)%.js.map, $(APP_TS))
APP_TYPINGS := $(DIST)/typings.d.ts

# ---------------------------------------------------------------------------------------------------------------------
# Compile app files
.PHONY: build
build: $(APP_JS) $(APP_D_TS)
$(DIST)/$(APP_SRC)/%.d.ts $(DIST)/$(APP_SRC)/%.js: $(APP_SRC)/%.ts
	@echo "[+] Compiling app file : '$<'"
	@touch .basedir.ts
	@$(TSC) $(TSCFLAGS) --declaration .basedir.ts --outdir $(DIST) $<
	@rm -f .basedir.ts $(DIST)/.basedir.*

# ---------------------------------------------------------------------------------------------------------------------
# Clean build
.PHONY: build-clean
build-clean:
	@rm -rfv "$(DIST)"




# =====================================================================================================================
# Define some standard locations for tests
# =====================================================================================================================
TEST_TS      := $(shell find $(TEST_SRC)/ -name '*.ts')
TEST_JS      := $(patsubst $(TEST_SRC)%.ts, $(DIST)/$(TEST_SRC)%.js, $(TEST_TS))

# ---------------------------------------------------------------------------------------------------------------------
# Compile test files
$(DIST)/$(TEST_SRC)/%.js: $(TEST_SRC)/%.ts
	@echo "[+] Compiling test file: '$<'"
	@touch .basedir.ts
	@$(TSC) $(TSCFLAGS) .basedir.ts --outdir $(DIST) $<
	@rm -f .basedir.ts $(DIST)/.basedir.*

# ---------------------------------------------------------------------------------------------------------------------
# Run tests
.PHONY: test
test: $(TEST_JS) build
	@$(MOCHA) $(MOCHAFLAGS) $(TEST_JS) $(MOCHA_COLORFIX)

# ---------------------------------------------------------------------------------------------------------------------
# Clean test
.PHONY: test-clean
test-clean:
	@rm -rfv "$(DIST)/$(TEST_SRC)"

# =====================================================================================================================
# Coverage
# =====================================================================================================================

# ---------------------------------------------------------------------------------------------------------------------
# Create coverage report
.PHONY: coverage
coverage: $(COVERAGE)/index.html
$(COVERAGE)/index.html: $(APP_JS) $(TEST_JS)
	@echo "[+] Running tests"
	@$(MOCHA) -b $(TEST_JS) 2>&1 >/dev/null || { $(MAKE) --no-print-directory test; /bin/false; }
	@test -d $(COVERAGE) || mkdir -p $(COVERAGE)
	@echo "[+] Checking coverage"
	@$(ISTANBUL) instrument --output $(DIST)/$(APP_SRC)-cov $(DIST)/$(APP_SRC) 2>&1 >/dev/null
	@mv $(DIST)/$(APP_SRC) $(DIST)/$(APP_SRC)-orig && mv $(DIST)/$(APP_SRC)-cov $(DIST)/$(APP_SRC)
	@ISTANBUL_REPORTERS=lcovonly $(MOCHA) -R mocha-istanbul $(TEST_JS)
	@mv lcov.info $(COVERAGE)/
	@rm -rf $(DIST)/$(APP_SRC)
	@mv $(DIST)/$(APP_SRC)-orig $(DIST)/$(APP_SRC)
	@genhtml $(COVERAGE)/lcov.info --highlight --output-directory $(COVERAGE)/|egrep "(lines|functions)"|sed -e 's/^ /[>]/g'

# ---------------------------------------------------------------------------------------------------------------------
# Create coverage report
.PHONY: coverage-show
coverage-show: $(COVERAGE)/index.html
	@xdg-open $<

# ---------------------------------------------------------------------------------------------------------------------
# Cleanup
.PHONY: coverage-clean
coverage-clean:
	@rm -rf $(COVERAGE)

.PHONY: clean
clean:
	@$(MAKE) coverage-clean
	@$(MAKE) test-clean
	@$(MAKE) build-clean
	@rm -f *.log

.PHONY: distclean
distclean: Makefile
	@$(MAKE) clean
	@rm -rfv node_modules package-lock.json
