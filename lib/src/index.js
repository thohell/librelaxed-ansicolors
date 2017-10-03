"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ansicolors;
var ansicolors;
(function (ansicolors) {
    let color;
    (function (color) {
        color[color["normal"] = 39] = "normal";
        color[color["black"] = 30] = "black";
        color[color["red"] = 31] = "red";
        color[color["green"] = 32] = "green";
        color[color["yellow"] = 33] = "yellow";
        color[color["blue"] = 34] = "blue";
        color[color["magenta"] = 35] = "magenta";
        color[color["cyan"] = 36] = "cyan";
        color[color["lightGrey"] = 37] = "lightGrey";
        color[color["darkGrey"] = 90] = "darkGrey";
        color[color["lightRed"] = 91] = "lightRed";
        color[color["lightGreen"] = 92] = "lightGreen";
        color[color["lightYellow"] = 93] = "lightYellow";
        color[color["lightBlue"] = 94] = "lightBlue";
        color[color["lightMagenta"] = 95] = "lightMagenta";
        color[color["lightCyan"] = 96] = "lightCyan";
        color[color["white"] = 97] = "white";
    })(color = ansicolors.color || (ansicolors.color = {}));
    (function (color) {
        function index(idx) { return 0x1000000 + (idx & 0xff); }
        color.index = index;
        function rgb(value) {
            return (typeof (value) === 'number' ?
                0x2000000 + (value & 0xffffff) :
                0x2000000 + ((value[0] & 0xff) << 16) + ((value[1] & 0xff) << 8) + (value[2] & 0xff));
        }
        color.rgb = rgb;
    })(color = ansicolors.color || (ansicolors.color = {}));
    let attr;
    (function (attr) {
        attr[attr["none"] = 0] = "none";
        attr[attr["bold"] = 1] = "bold";
        attr[attr["dim"] = 2] = "dim";
        attr[attr["italic"] = 3] = "italic";
        attr[attr["underline"] = 4] = "underline";
        attr[attr["blink"] = 5] = "blink";
        attr[attr["invert"] = 7] = "invert";
        attr[attr["invisible"] = 8] = "invisible";
        attr[attr["strikethrough"] = 9] = "strikethrough";
        attr[attr["noBoldOrDim"] = 22] = "noBoldOrDim";
        attr[attr["noItalic"] = 23] = "noItalic";
        attr[attr["noUnderline"] = 24] = "noUnderline";
        attr[attr["noBlink"] = 25] = "noBlink";
        attr[attr["noInvert"] = 27] = "noInvert";
        attr[attr["noInvisible"] = 28] = "noInvisible";
        attr[attr["noStrikethrough"] = 29] = "noStrikethrough";
        attr[attr["overline"] = 53] = "overline";
        attr[attr["noOverline"] = 55] = "noOverline";
    })(attr = ansicolors.attr || (ansicolors.attr = {}));
    function render(colors, swap = false) {
        const bg = swap;
        const fg = !bg;
        let options = [];
        switch (typeof (colors.attr)) {
            case 'object':
            case 'number':
                options = [].concat(colors.attr);
                break;
            default:
                break;
        }
        const makeColor = (c, fg) => {
            if (c < 0x1000000) {
                return (fg ? c : c + 10);
            }
            if (c < 0x2000000) {
                return [(fg ? 38 : 48), 5, c & 0xff];
            }
            return [(fg ? 38 : 48), 2, (c >> 16) & 0xff, (c >> 8) & 0xff, c & 0xff];
        };
        if (typeof (colors.fg) === 'number') {
            options = options.concat(makeColor(colors.fg, fg));
        }
        if (typeof (colors.bg) === 'number') {
            options = options.concat(makeColor(colors.bg, bg));
        }
        return (options.length ? `\x1b[${options.join(';')}m` : '');
    }
    ansicolors.render = render;
})(ansicolors = exports.ansicolors || (exports.ansicolors = {}));
