export default ansicolors;
export declare module ansicolors {
    enum color {
        normal = 39,
        black = 30,
        red = 31,
        green = 32,
        yellow = 33,
        blue = 34,
        magenta = 35,
        cyan = 36,
        lightGrey = 37,
        darkGrey = 90,
        lightRed = 91,
        lightGreen = 92,
        lightYellow = 93,
        lightBlue = 94,
        lightMagenta = 95,
        lightCyan = 96,
        white = 97,
    }
    namespace color {
        function index(idx: number): number;
        function rgb(value: number | number[]): number;
    }
    enum attr {
        none = 0,
        bold = 1,
        dim = 2,
        italic = 3,
        underline = 4,
        blink = 5,
        invert = 7,
        invisible = 8,
        strikethrough = 9,
        noBoldOrDim = 22,
        noItalic = 23,
        noUnderline = 24,
        noBlink = 25,
        noInvert = 27,
        noInvisible = 28,
        noStrikethrough = 29,
        overline = 53,
        noOverline = 55,
    }
    type attributes_t = number | number[];
    type color_t = number;
    type ANSIColors_t = {
        attr?: attributes_t;
        fg?: color_t;
        bg?: color_t;
    };
    function render(colors: ANSIColors_t, swap?: boolean): string;
}
