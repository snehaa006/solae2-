import type { SVGProps } from "react";

/* 24px line icons, drawn for Solae at a 1.5 stroke so they sit with Jost. */
const paths = {
  bag: "M5.5 8.5h13l-1 11.5h-11zM9 8.5V7a3 3 0 0 1 6 0v1.5",
  search: "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.3 15.3 20 20",
  heart: "M12 19.5s-7-4.3-7-9.4A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.1c0 5.1-7 9.4-7 9.4z",
  menu: "M4 9h16M4 15h16",
  close: "M6 6l12 12M18 6 6 18",
  arrowRight: "M4 12h15M14 7l5 5-5 5",
  arrowLeft: "M20 12H5M10 7l-5 5 5 5",
  arrowUpRight: "M7 17 17 7M9 7h8v8",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  check: "M5 12.5l4.2 4.2L19 7",
  chevronDown: "M6 9l6 6 6-6",
  sun: "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4",
  wave: "M2.5 9c2 0 2-1.5 4-1.5S8.5 9 10.5 9s2-1.5 4-1.5S16.5 9 18.5 9s2-1.5 3-1.5M2.5 15c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 3-1.5",
  shield: "M12 3.5 5 6v5.5c0 4.2 3 7.6 7 9 4-1.4 7-4.8 7-9V6zM9 12l2 2 4-4",
  layers: "M12 4 3.5 8.5 12 13l8.5-4.5zM3.5 12.5 12 17l8.5-4.5M3.5 16.5 12 21l8.5-4.5",
  set: "M8.5 3v4.2c0 1.6-2 2.6-2 5L7 18.5c2.2.2 3.7 1.2 5 2.5 1.3-1.3 2.8-2.3 5-2.5l.5-6.3c0-2.4-2-3.4-2-5V3M8.5 7.2c1 1.6 6 1.6 7 0",
  pin: "M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  truck: "M3 6.5h11v10H3zM14 10h4l3 3v3.5h-7M7 19a1.8 1.8 0 1 0 0-3.6A1.8 1.8 0 0 0 7 19zM17.5 19a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z",
  refresh: "M19.5 12a7.5 7.5 0 1 1-2.2-5.3M19.5 4.5v4h-4",
  needle: "M4 20 16.5 7.5M14.5 5.5l4 4M17 3l4 4-2 2-4-4zM6 14c3 0 3 3 6 3",
  ruler: "M3 15.5 15.5 3 21 8.5 8.5 21zM7 13l2 2M10 10l2 2M13 7l2 2",
  mail: "M3.5 6h17v12h-17zM4 6.5l8 6.5 8-6.5",
  instagram: "M7.5 3.5h9a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4v-9a4 4 0 0 1 4-4zM12 15.8a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6zM17.2 6.8h.01",
  tiktok: "M14 3.5v11.2a3.8 3.8 0 1 1-3.8-3.8M14 3.5c.5 2.6 2.4 4.3 5 4.5",
  sparkle: "M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z",
} as const;

export type IconName = keyof typeof paths;
export const iconNames = Object.keys(paths) as IconName[];

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  name: IconName;
  /** CSS size; defaults to 1.25em so icons scale with the text beside them. */
  size?: string | number;
  /** Accessible label. Without one the icon is decorative and hidden from assistive tech. */
  label?: string;
}

export function Icon({ name, size = "1.25em", label, style, ...rest }: IconProps) {
  const filled = name === "sparkle";
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      style={{ flexShrink: 0, ...style }}
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  );
}
