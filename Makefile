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

# Paths
APP_SRC	       ?= src
TEST_SRC       ?= test
DIST           ?= lib
COVERAGE       ?= coverage

all: build test coverage

include tools/typescript.mk


