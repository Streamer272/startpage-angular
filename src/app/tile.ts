export type Tile = any

export function newWeather(): Tile {
    return {
        "type": "Weather"
    }
}

export function newShortcut(
    link1?: string, title1?: string, icon1?: string,
    link2?: string, title2?: string, icon2?: string
): Tile {
    return {
        "type": "Shortcut",
        "link1": link1,
        "title1": title1,
        "icon1": icon1,
        "link2": link2,
        "title2": title2,
        "icon2": icon2,
    }
}
