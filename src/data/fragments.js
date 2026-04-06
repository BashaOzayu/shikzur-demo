// Fragment data for The Shikzur of Zaken demo
// Each fragment represents one puzzle level

export const fragments = [
  {
    id: 1,
    word: "سَلَام",
    romanization: "salaam",
    meaning: "peace",
    hint: "A greeting carried across centuries of scholarship",
    fragment: "fragment_1.png",
    tiles: [
      { id: "seen",  file: "tile_sin.png",  letter: "س", name: "seen", position: 0 },
      { id: "lam",   file: "tile_lam.png",  letter: "ل", name: "lam", position: 1 },
      { id: "alif",  file: "tile_alif.png", letter: "ا", name: "alif", position: 2 },
      { id: "mim",   file: "tile_mim.png",  letter: "م", name: "meem", position: 3 },
    ],
    decoys: [],
  },
  {
    id: 2,
    word: "دَرَسَ",
    romanization: "darasa",
    meaning: "to study",
    hint: "The act that built every library ever raised",
    fragment: "fragment_2.png",
    tiles: [
      { id: "dal",   file: "tile_dal.png",  letter: "د", name: "dal", position: 0 },
      { id: "ra",    file: "tile_ra.png",   letter: "ر", name: "ra", position: 1 },
      { id: "seen2", file: "tile_sin.png",  letter: "س", name: "seen", position: 2 },
      { id: "alif2", file: "tile_alif.png", letter: "ا", name: "alif", position: 3 },
    ],
    decoys: [
      { id: "decoy_ba",  file: "tile_ba.png",  letter: "ب", name: "ba" },
    ],
  },
  {
    id: 3,
    word: "كِتَاب",
    romanization: "kitab",
    meaning: "book",
    hint: "What the scholars came here to preserve",
    fragment: "fragment_1.png",
    tiles: [
      { id: "kaf",   file: "tile_kaf.png",  letter: "ك", name: "kaf", position: 0 },
      { id: "ta",    file: "tile_ta.png",   letter: "ت", name: "ta", position: 1 },
      { id: "alif3", file: "tile_alif.png", letter: "ا", name: "alif", position: 2 },
      { id: "ba",    file: "tile_ba.png",   letter: "ب", name: "ba", position: 3 },
    ],
    decoys: [
      { id: "decoy_dal", file: "tile_dal.png", letter: "د", name: "dal" },
      { id: "decoy_mim", file: "tile_mim.png", letter: "م", name: "meem" },
    ],
  },
  {
    id: 4,
    word: "قَلَم",
    romanization: "qalam",
    meaning: "pen",
    hint: "The instrument that made this library possible",
    fragment: "fragment_2.png",
    tiles: [
      { id: "qaf",  file: "tile_qaf.png", letter: "ق", name: "qaf", position: 0 },
      { id: "lam2", file: "tile_lam.png", letter: "ل", name: "lam", position: 1 },
      { id: "mim2", file: "tile_mim.png", letter: "م", name: "meem", position: 2 },
    ],
    decoys: [
      { id: "decoy_kaf2", file: "tile_kaf.png", letter: "ك", name: "kaf" },
      { id: "decoy_dal2", file: "tile_dal.png", letter: "د", name: "dal" },
    ],
  },
  {
    id: 5,
    word: "نُور",
    romanization: "nur",
    meaning: "light",
    hint: "What every scholar works by",
    fragment: "fragment_1.png",
    tiles: [
      { id: "nun",  file: "tile_nun.png", letter: "ن", name: "nun", position: 0 },
      { id: "waw",  file: "tile_waw.png", letter: "و", name: "waw", position: 1 },
      { id: "ra2",  file: "tile_ra.png",  letter: "ر", name: "ra", position: 2 },
    ],
    decoys: [
      { id: "decoy_ba2",  file: "tile_ba.png",  letter: "ب", name: "ba" },
      { id: "decoy_dal3", file: "tile_dal.png",  letter: "د", name: "dal" },
    ],
  },
  {
    id: 6,
    word: "حِكْمَة",
    romanization: "hikmah",
    meaning: "wisdom",
    hint: "The reason this library was built",
    fragment: "fragment_2.png",
    tiles: [
      { id: "ha",   file: "tile_ha.png",  letter: "ح", name: "ha", position: 0 },
      { id: "kaf2", file: "tile_kaf.png", letter: "ك", name: "kaf", position: 1 },
      { id: "mim3", file: "tile_mim.png", letter: "م", name: "meem", position: 2 },
      { id: "ta_marbuta",  file: "tile_ta_marbuta.png",  letter: "ة", name: "ta marbuta", position: 3 },
    ],
    decoys: [
      { id: "decoy_sin2", file: "tile_sin.png", letter: "س", name: "seen" },
      { id: "decoy_lam2", file: "tile_lam.png", letter: "ل", name: "lam" },
      { id: "decoy_dal4", file: "tile_dal.png", letter: "د", name: "dal" },
    ],
  },
];
