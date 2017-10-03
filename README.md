librelaxed-ansicolors
===================================================

Copyright 2017 Thomas Hellström.

https://github.com/thohell/librelaxed-ansicolors

Overview
--------

This is a **very** simple and lightweight module that provides ansi escape codes suitable for output to text terminal/console. It only supports setting text attributes, foreground color and background color. The capabilities of the terminal limits which attributes and/or colors will render.

Installation
------------

To use this module in a project:<br>
`npm install --save librelaxed-ansicolors`

Quick Start
-----------

```typescript
import { ansicolors } from 'librelaxed-ansicolors';


console.log(ansicolors.render(
	{
		attr: [ ansicolors.attr.underline, ansicolors.attr.bold ],
		fg: ansicolors.color.white,
		bg: ansicolors.color.rgb(0xff0000)
	}) + 'Underlined, bold & white text on red background.');
```

Documentation
-------------

### Usage
```typescript
import { ansicolors } from 'librelaxed-ansicolors';

const ansiFormat: ansicolors.ANSIColors_t = {
	attr: [ attribute1, ..., attributeN ],  // (Optional) attribute(s). See attributes below.
	fg: colorspec,                          // (Optional) foreground color. See colorspec below.
	bg: colorspec                           // (Optional) background color
};

const escapeString = ansicodes.render(
	ansiFormat,                             // (Required) ansicolor format
	false                                   // (Optional) swap fg/bg colors in output
	);

some.function.use(escapeString);

```
### attributes

Below is a list of all settable attributes. **Note that not all terminals will render all attributes!**

`ansicolors.attr.none` Reset all attributes<br>
`ansicolors.attr.bold`/`colorspec.attr.dim`/`colorspec.attr.noBoldOrDim` Bold text **or** Dim text **on/off**<br>
`ansicolors.attr.italic`/`colorspec.attr.noItalic` Italics **on/off**<br>
`ansicolors.attr.underline`/`colorspec.attr.noUnderline` Underlined text **on/off**<br>
`ansicolors.attr.blink`/`colorspec.attr.noBlink` Binking text **on/off**<br>
`ansicolors.attr.invert`/`colorspec.attr.noInvert` Inverted text (swap fg/bg) **on/off**<br>
`ansicolors.attr.invisible`/`colorspec.attr.noInvisible` Invisible text **on/off**<br>
`ansicolors.attr.strikethrough`/`colorspec.attr.noStrikethrough` Crossed out text **on/off**<br>
`ansicolors.attr.overline`/`colorspec.attr.noOverline` Overlined text **on/off**<br>


### colorspec
You can describe colors in three ways. **Note that not all terminals will render all colors!**
* By using names for simple colors (8/16 colors)
* By using index for indexed colors (88/256 colors)
* By using rgb for true color (24-bit colors)

##### Default color
`ansicolors.color.normal` Use default color.<br>

##### Named colors 0 through 7
`ansicolors.color.black`<br>
`ansicolors.color.red`<br>
`ansicolors.color.green`<br>
`ansicolors.color.yellow`<br>
`ansicolors.color.blue`<br>
`ansicolors.color.magenta`<br>
`ansicolors.color.cyan`<br>
`ansicolors.color.lightGrey`<br>
##### Named colors 7 through 15 (Normally light version of colors 0-7)
`ansicolors.color.darkGrey`<br>
`ansicolors.color.lightRed`<br>
`ansicolors.color.lightGreen`<br>
`ansicolors.color.lightYellow`<br>
`ansicolors.color.lightBlue`<br>
`ansicolors.color.lightMagenta`<br>
`ansicolors.color.lightCyan`<br>
`ansicolors.color.white`<br>
##### Indexed colors (88 or 256 colors, depending on terminal)
`ansicolor.color.index(i)` where **i** is index number **0-255**
##### True colors (24-bit colors)
`ansicolor.color.rgb([ r, g, b ])` where **r**, **g** & **b** are between **0-255**<br>
`ansicolor.color.rgb(c)` where **c** is a 24 bit color between **0-0xffffff** *(0-16777215)*

License information
-------------------

See [LICENSE.md](LICENSE.md) for information.
