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

# -----------------------------------------------------------------------------
#
# Usage: tools/@remove-reference-path.sh [path]source.ts [path]dest.d.ts
#
# Description
# -----------
#
# This script strips any <reference path="..." /> from the typings files
# (.d.ts) if the tag '@remove-reference-path' is present anywhere in the
# corresponding typescript file (.ts).
#
# Why is this script needed?
# --------------------------
#
# Typescript does not allow for modules to import/export anything and extending
# classes in the same file. To get around this limitation, it is possible to
# reference a typings file where the interface is extended. This will let you
# implement the extension using regular prototyping without getting the error
# 'Property 'X' does not exist on type 'Y'.
#
# In order to make this work, copy the bare minimum needed to declare your
# extension to a typings file, reference to it from your source file and
# add the tag '@remove-reference-path' to remove the reference after you have
# compiled your typescript source file.
#
# Example
# -------
#
#
#
# -----------------------------------------------------------------------------
# Source file (example.ts)
# -----------------------------------------------------------------------------
#
# /*
#  * @remove-reference-path hack-of-the-day.d.ts
#  *
#  * The tag above with remove the reference for file 'hack-of-the-day.d.ts' but
#  * not the reference for 'super-duper-library.d.ts'
#  *
#  */
#
# /// <reference path='./hack-of-the-day.d.ts' />
# /// <reference path='./super-duper-library.d.ts' />
#
# // We need to extend the interface here
# interface String {
# 	aNewFunction(aValue: aModule.aType): string;
# }
#
# // !!! The following line is not possible without 'example.d.ts' !!!
# String.prototype.aNewFunction = (aValue: aModule.aType): string => { return "" }
#
# export module aModule {
#
#   // [... more code ...]
#
#   // This is the type i want to use as a parameter to the extension.
# 	export type aType = {
# 		anOption: string;
# 		anotherOption: string;
# 	}
#
#   // [... probably even more code ...]
# }
#
# -----------------------------------------------------------------------------

# -----------------------------------------------------------------------------
# Typings file (hack-of-the-day.d.ts)
# -----------------------------------------------------------------------------
#
# // We NEED to extend the interface here or this will not work.
# interface String {
# 	aNewFunction(x: aModule.aType): string;
# }
#
# // We also want to declare the bare minimum to reference the type aModule.aType.
# // !! It is important to not use 'export' anywhere in this file. !!
# declare module aModule {
# 	type aType = {
# 		anOption: string;
# 		anotherOption: string;
# 	}
# }
# -----------------------------------------------------------------------------

grep '@remove-reference-path' "$1" | while read -r line; do
	for file in ${line//*@remove-reference-path /}; do
		echo "[>] Removing reference: '$file' from $2 (@remove-reference-path)"
		sed -e "s|^.*<.*reference.*path.*=.*/${file}.*$||" -i "$2"
	done
done
