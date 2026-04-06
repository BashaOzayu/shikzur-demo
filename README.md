# The Shikzur of Zaken — Web Demo

A manuscript restoration game. Rebuild the library, one Arabic fragment at a time.

## Setup

```bash
npm install
npm run dev
```

## Tile Assets

Place your tile PNG files inside `public/tiles/`:

```
public/
└── tiles/
    ├── tile_alif.png
    ├── tile_ba.png
    ├── tile_ta.png
    ├── tile_dal.png
    ├── tile_ra.png
    ├── tile_sin.png
    ├── tile_lam.png
    ├── tile_kaf.png
    └── tile_mim.png
```

Tiles should ideally be square (80×80px or larger), PNG with transparency.

## Demo Levels

| Level | Word      | Meaning   | Letters              | Decoys        |
|-------|-----------|-----------|----------------------|---------------|
| 1     | سَلَام    | peace     | sin, lam, alif, mim  | none          |
| 2     | دَرَسَ    | to study  | dal, ra, sin, alif   | ba            |
| 3     | كِتَاب    | book      | kaf, ta, alif, ba    | dal, mim      |

## Deploy

```bash
npm run build
```

Output goes to `dist/` — deploy to Vercel, Netlify, or GitHub Pages.

For Vercel: connect your GitHub repo and it will auto-detect Vite.

## Color Palette

| Name         | Value     |
|--------------|-----------|
| Deep indigo  | `#1a1a4e` |
| Purple       | `#3d2a5e` |
| Bronze glow  | `#c9973a` |
| Parchment    | `#e8dfc8` |
| Ink black    | `#0d0d1a` |

## Architecture Notes

- `src/data/fragments.js` — all level data as JS objects; add/edit levels here
- `src/components/GameBoard.jsx` — drag-and-drop logic, win detection
- `src/components/DropZone.jsx` — RTL reconstruction slots
- `src/components/TileBank.jsx` — shuffled tile pool
- All tiles load from `/public/tiles/` at runtime (no import needed)

---

DreadKnot Juice Press · Education. Unfiltered.
