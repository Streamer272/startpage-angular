export type Tile = any

export const TileTypes = {
    "Weather": newWeather,
    "Shortcut": newShortcut
}

export function newWeather(): Tile {
    return {
        "type": "Weather"
    }
}

export function newShortcut(
    link1: string = "http://example.com", title1: string = "Example", icon1: string = "",
    link2: string = "http://example.com", title2: string = "Example", icon2: string = ""
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
