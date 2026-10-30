import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import { getProduct, type ColourId, type Size } from "../data/catalog";

export interface CartLine {
  productId: string;
  colour: ColourId;
  size: Size | null;
  qty: number;
}

type Action =
  | { type: "add"; line: CartLine }
  | { type: "qty"; key: string; qty: number }
  | { type: "remove"; key: string }
  | { type: "clear" };

export const lineKey = (l: Pick<CartLine, "productId" | "colour" | "size">) => `${l.productId}|${l.colour}|${l.size ?? "-"}`;

function reducer(lines: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "add": {
      const key = lineKey(action.line);
      const found = lines.find((l) => lineKey(l) === key);
      if (found) return lines.map((l) => (l === found ? { ...l, qty: Math.min(10, l.qty + action.line.qty) } : l));
      return [...lines, action.line];
    }
    case "qty":
      return lines.map((l) => (lineKey(l) === action.key ? { ...l, qty: action.qty } : l));
    case "remove":
      return lines.filter((l) => lineKey(l) !== action.key);
    case "clear":
      return [];
  }
}

const STORAGE = "solae-bag";

function load(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE);
    const parsed = raw ? (JSON.parse(raw) as CartLine[]) : [];
    return parsed.filter((l) => getProduct(l.productId));
  } catch {
    return [];
  }
}

interface CartContext {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (line: CartLine) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
}

const Ctx = createContext<CartContext | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, undefined, load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE, JSON.stringify(lines));
    } catch {
      /* private mode: the bag just won't survive a reload */
    }
  }, [lines]);

  const add = useCallback((line: CartLine) => {
    dispatch({ type: "add", line });
    setOpen(true);
  }, []);
  const setQty = useCallback((key: string, qty: number) => dispatch({ type: "qty", key, qty }), []);
  const remove = useCallback((key: string) => dispatch({ type: "remove", key }), []);

  const value = useMemo(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + (getProduct(l.productId)?.price ?? 0) * l.qty, 0);
    return { lines, count, subtotal, open, setOpen, add, setQty, remove };
  }, [lines, open, add, setQty, remove]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
