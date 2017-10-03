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
export default ansicolors;

export module ansicolors {

	// Named colors
	export enum color {
		normal = 39,
		black = 30, red, green, yellow, blue, magenta, cyan, lightGrey,
		darkGrey = 90, lightRed, lightGreen, lightYellow, lightBlue, lightMagenta, lightCyan, white,
	}

	// Overlay namespace 'color' over enum 'color' to mix functions into enum.
	export namespace color {
		// Indexed colors for 88-color and 256-color terminals
		// Foreground '\x1b[38;5;{index}m'
		// Background '\x1b[48;5;{index}m'
		export function index(idx: number) { return 0x1000000 + (idx & 0xff); }

		// True color defined as 24-bit `rgb` or `[red, green, blue]`
		// Foreground '\x1b[38;2;{red};{green};{blue}m'
		// Background '\x1b[48;2;{red};{green};{blue}m'
		export function rgb(value: number | number[]) {
			return (typeof (value) === 'number' ?
				0x2000000 + (value & 0xffffff) :
				0x2000000 + ((value[0] & 0xff) << 16) + ((value[1] & 0xff) << 8) + (value[2] & 0xff)
			);
		}
	}

	// Attributes
	export enum attr {
		none = 0,
		bold,
		dim,
		italic,
		underline,
		blink,
		invert = 7,
		invisible,
		strikethrough,
		noBoldOrDim = 22,
		noItalic,
		noUnderline,
		noBlink,
		noInvert = 27,
		noInvisible,
		noStrikethrough,
		overline = 53,
		noOverline = 55,
	}

	// Type definitions
	export type attributes_t = number | number[];
	export type color_t = number;
	export type ANSIColors_t = {
		attr?: attributes_t,
		fg?: color_t,
		bg?: color_t,
	};

	// Set parameter 'swap' to 'true' to swap bg/fg colors in output
	export function render(colors: ANSIColors_t, swap = false): string {
		const bg = swap;
		const fg = !bg;
		let options: number[] = [];
		switch (typeof (colors.attr)) {
			case 'object':		// Array, really...
			case 'number':
				options = [].concat(colors.attr);
				break;
			default:
				break;
		}

		const makeColor = (c, fg) => {
			if (c < 0x1000000) { return (fg ? c : c + 10); }							// Simple color
			if (c < 0x2000000) { return [(fg ? 38 : 48), 5, c & 0xff]; }				// Indexed color
			return [(fg ? 38 : 48), 2, (c >> 16) & 0xff, (c >> 8) & 0xff, c & 0xff];	// True color
		};

		if (typeof (colors.fg) === 'number') { options = options.concat(makeColor(colors.fg, fg)); }
		if (typeof (colors.bg) === 'number') { options = options.concat(makeColor(colors.bg, bg)); }

		return (options.length ? `\x1b[${options.join(';')}m` : '');
	}
}
