export type Tile = Weather | Shortcut

export class Weather {
}

export class Shortcut {
    constructor(
        public link1?: string,
        public title1?: string,
        public icon1?: string,
        public link2?: string,
        public title2?: string,
        public icon2?: string
    ) {}
}
