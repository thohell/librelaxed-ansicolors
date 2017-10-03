// Copyright (C) 2017 Thomas Hellström <rel@xed.se>
//
// This file is part of librelaxed-ansicolors.
//
// librelaxed-ansicolors is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// librelaxed-ansicolors is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with librelaxed-ansicolors.  If not, see <http://www.gnu.org/licenses/>.
//

import { ansicolors } from '../src/index';

import chai = require('chai');
const should = chai.should();
const expect = chai.expect;

// Setup types and testcases
type expected_t = string;
type testcase_t = [ansicolors.ANSIColors_t, expected_t];
type testcases_t = testcase_t[];

const testcases: testcases_t = [

	// These are all our testcases for ansicolor

	// Single attribute
	[{ attr: ansicolors.attr.none }, '[0m'],

	// Single attribute in array
	[{ attr: [ansicolors.attr.none] }, '[0m'],

	// All attributes
	[{
		attr: [
			ansicolors.attr.none,
			ansicolors.attr.bold,
			ansicolors.attr.dim,
			ansicolors.attr.italic,
			ansicolors.attr.underline,
			ansicolors.attr.blink,
			ansicolors.attr.invert,
			ansicolors.attr.invisible,
			ansicolors.attr.strikethrough,
			ansicolors.attr.overline,
			ansicolors.attr.noBoldOrDim,
			ansicolors.attr.noItalic,
			ansicolors.attr.noUnderline,
			ansicolors.attr.noBlink,
			ansicolors.attr.noInvert,
			ansicolors.attr.noInvisible,
			ansicolors.attr.noStrikethrough,
			ansicolors.attr.noOverline,
		],
	}, '[0;1;2;3;4;5;7;8;9;53;22;23;24;25;27;28;29;55m'],

	// Default colors. bg value for all simple colors should be fg + 10.
	// If this test passes, all other simple background colors will pass implicitly.
	[{ fg: ansicolors.color.normal }, '[39m'],
	[{ bg: ansicolors.color.normal }, '[49m'],

	// Simple color (0-7)
	[{ fg: ansicolors.color.black }, '[30m'],
	[{ fg: ansicolors.color.red }, '[31m'],
	[{ fg: ansicolors.color.green }, '[32m'],
	[{ fg: ansicolors.color.yellow }, '[33m'],
	[{ fg: ansicolors.color.blue }, '[34m'],
	[{ fg: ansicolors.color.magenta }, '[35m'],
	[{ fg: ansicolors.color.cyan }, '[36m'],
	[{ fg: ansicolors.color.lightGrey }, '[37m'],

	// Light colors (8-15)
	[{ fg: ansicolors.color.darkGrey }, '[90m'],
	[{ fg: ansicolors.color.lightRed }, '[91m'],
	[{ fg: ansicolors.color.lightGreen }, '[92m'],
	[{ fg: ansicolors.color.lightYellow }, '[93m'],
	[{ fg: ansicolors.color.lightBlue }, '[94m'],
	[{ fg: ansicolors.color.lightMagenta }, '[95m'],
	[{ fg: ansicolors.color.lightCyan }, '[96m'],
	[{ fg: ansicolors.color.white }, '[97m'],

	// Indexed colors
	[{ fg: ansicolors.color.index(123) }, '[38;5;123m'],
	[{ bg: ansicolors.color.index(123) }, '[48;5;123m'],

	// RGB colors using array
	[{ fg: ansicolors.color.rgb([1, 2, 3]) }, '[38;2;1;2;3m'],
	[{ bg: ansicolors.color.rgb([1, 2, 3]) }, '[48;2;1;2;3m'],

	// RGB colors using 24bit value
	[{ fg: ansicolors.color.rgb(0xff8000) }, '[38;2;255;128;0m'],
	[{ bg: ansicolors.color.rgb(0xff8000) }, '[48;2;255;128;0m'],

	// Attributes and colors
	[{ attr: ansicolors.attr.none, fg: ansicolors.color.rgb(0xff8000), bg: ansicolors.color.rgb(0xff8000) }, '[0;38;2;255;128;0;48;2;255;128;0m'],

];


describe('librelaxed-ansicolors:', () => {

	// Test factory
	function factory(testcase: testcase_t) {
		describe(`'${JSON.stringify(testcase[0])}'`, () => {
			it(`should return '${testcase[1]}'`, () => {
				// We run each test with option 'noescape: true' to omit escape char '\x1b'
				ansicolors.render(testcase[0]).replace('\x1b', '').should.be.equal(testcase[1]);
			});
		});
	}

	// Run all tests
	testcases.forEach((testcase) => {
		factory(testcase);
	});
});


