"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const testcases = [
    [{ attr: index_1.ansicolors.attr.none }, '[0m'],
    [{ attr: [index_1.ansicolors.attr.none] }, '[0m'],
    [{
            attr: [
                index_1.ansicolors.attr.none,
                index_1.ansicolors.attr.bold,
                index_1.ansicolors.attr.dim,
                index_1.ansicolors.attr.italic,
                index_1.ansicolors.attr.underline,
                index_1.ansicolors.attr.blink,
                index_1.ansicolors.attr.invert,
                index_1.ansicolors.attr.invisible,
                index_1.ansicolors.attr.strikethrough,
                index_1.ansicolors.attr.overline,
                index_1.ansicolors.attr.noBoldOrDim,
                index_1.ansicolors.attr.noItalic,
                index_1.ansicolors.attr.noUnderline,
                index_1.ansicolors.attr.noBlink,
                index_1.ansicolors.attr.noInvert,
                index_1.ansicolors.attr.noInvisible,
                index_1.ansicolors.attr.noStrikethrough,
                index_1.ansicolors.attr.noOverline,
            ],
        }, '[0;1;2;3;4;5;7;8;9;53;22;23;24;25;27;28;29;55m'],
    [{ fg: index_1.ansicolors.color.normal }, '[39m'],
    [{ bg: index_1.ansicolors.color.normal }, '[49m'],
    [{ fg: index_1.ansicolors.color.black }, '[30m'],
    [{ fg: index_1.ansicolors.color.red }, '[31m'],
    [{ fg: index_1.ansicolors.color.green }, '[32m'],
    [{ fg: index_1.ansicolors.color.yellow }, '[33m'],
    [{ fg: index_1.ansicolors.color.blue }, '[34m'],
    [{ fg: index_1.ansicolors.color.magenta }, '[35m'],
    [{ fg: index_1.ansicolors.color.cyan }, '[36m'],
    [{ fg: index_1.ansicolors.color.lightGrey }, '[37m'],
    [{ fg: index_1.ansicolors.color.darkGrey }, '[90m'],
    [{ fg: index_1.ansicolors.color.lightRed }, '[91m'],
    [{ fg: index_1.ansicolors.color.lightGreen }, '[92m'],
    [{ fg: index_1.ansicolors.color.lightYellow }, '[93m'],
    [{ fg: index_1.ansicolors.color.lightBlue }, '[94m'],
    [{ fg: index_1.ansicolors.color.lightMagenta }, '[95m'],
    [{ fg: index_1.ansicolors.color.lightCyan }, '[96m'],
    [{ fg: index_1.ansicolors.color.white }, '[97m'],
    [{ fg: index_1.ansicolors.color.index(123) }, '[38;5;123m'],
    [{ bg: index_1.ansicolors.color.index(123) }, '[48;5;123m'],
    [{ fg: index_1.ansicolors.color.rgb([1, 2, 3]) }, '[38;2;1;2;3m'],
    [{ bg: index_1.ansicolors.color.rgb([1, 2, 3]) }, '[48;2;1;2;3m'],
    [{ fg: index_1.ansicolors.color.rgb(0xff8000) }, '[38;2;255;128;0m'],
    [{ bg: index_1.ansicolors.color.rgb(0xff8000) }, '[48;2;255;128;0m'],
    [{ attr: index_1.ansicolors.attr.none, fg: index_1.ansicolors.color.rgb(0xff8000), bg: index_1.ansicolors.color.rgb(0xff8000) }, '[0;38;2;255;128;0;48;2;255;128;0m'],
];
describe('librelaxed-ansicolors:', () => {
    function factory(testcase) {
        describe(`'${JSON.stringify(testcase[0])}'`, () => {
            it(`should return '${testcase[1]}'`, () => {
                index_1.ansicolors.render(testcase[0]).replace('\x1b', '').should.be.equal(testcase[1]);
            });
        });
    }
    testcases.forEach((testcase) => {
        factory(testcase);
    });
});
