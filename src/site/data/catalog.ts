/**
 * The mock catalogue. Prices are placeholders in Saudi riyals.
 *
 * Colourways use the Brand Starter's collection colours, which it reserves
 * for the swimsuits themselves (plus Coral, which is already a brand colour).
 * They show up only on the products and their swatches, never in the UI.
 */

export type ColourId = "coral" | "tropical" | "cerulean" | "powder" | "cherry" | "palm" | "willow" | "amber";

export const COLOURS: Record<ColourId, { name: string; hex: string }> = {
  coral: { name: "Coral", hex: "#F07167" },
  tropical: { name: "Tropical", hex: "#17BEBB" },
  cerulean: { name: "Cerulean", hex: "#0E79B2" },
  powder: { name: "Powder blue", hex: "#6699CC" },
  cherry: { name: "Cherry", hex: "#B40421" },
  palm: { name: "Palm", hex: "#337155" },
  willow: { name: "Willow", hex: "#93C186" },
  amber: { name: "Amber", hex: "#C8692E" },
};

export type Category = "sets" | "one-pieces" | "shorts" | "extras";

export const CATEGORIES: Array<{ id: Category; label: string; blurb: string }> = [
  { id: "sets", label: "Sets", blurb: "A one-piece and its shorts" },
  { id: "one-pieces", label: "One-pieces", blurb: "The suit on its own" },
  { id: "shorts", label: "Shorts", blurb: "To match, or to mix" },
  { id: "extras", label: "Extras", blurb: "For the walk to the water" },
];

export interface Product {
  id: string;
  name: string;
  category: Category;
  kind: string;
  price: number;
  colours: ColourId[];
  /** The colour shown first. */
  hero: ColourId;
  badge?: string;
  blurb: string;
  highlights: string[];
  details: string[];
  fabric: string;
  /** A Pexels photo id for the gallery, if there is one. */
  photo?: string;
}

const SWIM: ColourId[] = ["coral", "tropical", "cerulean", "powder", "cherry", "palm", "willow"];

export const PRODUCTS: Product[] = [
  {
    id: "flounce-set",
    name: "The Flounce Set",
    category: "sets",
    kind: "One-piece + matching shorts",
    price: 319,
    colours: SWIM,
    hero: "coral",
    badge: "New",
    blurb:
      "Our first set: a scoop-back one-piece with flower straps, and loose swim shorts cut from the same fabric. Wear them together for full coverage, or the suit alone at home.",
    highlights: ["Matching one-piece and shorts", "Fully lined, never see-through", "UPF 50+ fabric that dries fast"],
    details: ["Scoop neck and back", "Soft flower straps", "Shorts with an elastic waist and drawcord", "Mesh-lined shorts with side pockets"],
    fabric: "Recycled nylon and elastane, with a soft opaque lining. Rinse in cool water after the pool or the sea, and dry in the shade.",
    photo: "4271771",
  },
  {
    id: "flounce-one-piece",
    name: "The Flounce One-Piece",
    category: "one-pieces",
    kind: "One-piece",
    price: 229,
    colours: SWIM,
    hero: "powder",
    blurb: "The suit from our set, on its own: a scoop-back one-piece with soft flower straps that stay put when you swim.",
    highlights: ["Fully lined, never see-through", "Straps that stay put", "UPF 50+ fabric that dries fast"],
    details: ["Scoop neck and back", "Soft flower straps", "Moderate leg line, made to sit under shorts"],
    fabric: "Recycled nylon and elastane, with a soft opaque lining. Rinse in cool water after the pool or the sea, and dry in the shade.",
    photo: "4271771",
  },
  {
    id: "boardwalk-short",
    name: "The Boardwalk Short",
    category: "shorts",
    kind: "Swim shorts",
    price: 99,
    colours: SWIM,
    hero: "cerulean",
    blurb: "Easy swim shorts with a mesh lining and real pockets. Made to match every one-piece we make, and to go from the water to lunch.",
    highlights: ["Mid-thigh length", "Mesh lining and side pockets", "Quick-dry and chlorine-resistant"],
    details: ["Elastic waist with a drawcord", "Mid-thigh length", "Two side pockets", "Mesh brief lining"],
    fabric: "Quick-dry recycled polyester with a mesh lining. Rinse in cool water and dry in the shade.",
  },
  {
    id: "sun-club-sunnies",
    name: "The Sun Club Sunnies",
    category: "extras",
    kind: "Sunglasses",
    price: 79,
    colours: ["coral", "amber"],
    hero: "coral",
    blurb: "Rounded frames in a colour that goes with every set. UV400 lenses, and a soft pouch for the beach bag.",
    highlights: ["UV400 lenses", "Lightweight frames", "Comes with a soft pouch"],
    details: ["Rounded oval frames", "UV400 tinted lenses", "Pouch included"],
    fabric: "Recycled acetate frames. Wipe the lenses with the pouch.",
  },
];

export const SIZES = ["XS", "S", "M", "L", "XL"] as const;
export type Size = (typeof SIZES)[number];

export const FREE_SHIPPING = 300;

export function getProduct(id: string | undefined) {
  return PRODUCTS.find((p) => p.id === id);
}

const base = import.meta.env.BASE_URL;

export interface Art {
  top?: string;
  bottom?: string;
}

/** The sticker images that make up a product's picture in one colour. */
export function productArt(p: Product, colour: ColourId): Art {
  const s = (f: string) => `${base}img/stickers/${f}.webp`;
  switch (p.category) {
    case "sets":
      return { top: s(`suit-flounce-${colour}`), bottom: s(`shorts-${colour}`) };
    case "one-pieces":
      return { top: s(`suit-flounce-${colour}`) };
    case "shorts":
      return { bottom: s(`shorts-${colour}`) };
    case "extras":
      return { bottom: s(colour === "amber" ? "sunglasses" : "sunglasses-coral") };
  }
}

export function sticker(name: string) {
  return `${base}img/stickers/${name}.webp`;
}

/** A free-licence stand-in photo from Pexels. */
export function photo(id: string, w = 1200) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}

export const sar = (n: number) => `SAR ${n.toLocaleString("en-US")}`;

/** Pale backdrops rotate through the three brand hues so a grid never looks flat. */
export const TINTS = ["coral", "lagoon", "sunshine"] as const;
export function tintFor(colour: ColourId): (typeof TINTS)[number] {
  const map: Record<ColourId, (typeof TINTS)[number]> = {
    coral: "sunshine",
    tropical: "coral",
    cerulean: "sunshine",
    powder: "coral",
    cherry: "lagoon",
    palm: "sunshine",
    willow: "lagoon",
    amber: "lagoon",
  };
  return map[colour];
}
