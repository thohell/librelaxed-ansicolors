#!/bin/bash
# Copyright (C) 2017 Thomas Hellström <rel@xed.se>
#
# This file is part of %PROJECT%.
#
# %PROJECT% is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# %PROJECT% is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with %PROJECT%.  If not, see <http://www.gnu.org/licenses/>.
#

# Allow .envrc
direnv allow

# Initialize project with package name
PROJECT="$(basename $(realpath .))"

for i in README.md Makefile package.json src/* test/* ; do
	sed -e "s|%PROJECT%|${PROJECT}|g" -i $i
done

# Initialize new git repo
git init
git add '*' '.*'
git commit -m "Initial commit. Naked base module for project '${PROJECT}'' created."

# Install all npm modules
npm install
