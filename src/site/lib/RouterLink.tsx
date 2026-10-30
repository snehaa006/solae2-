import type { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router";

/** Lets library components that render <a href> use client-side routing instead. */
export function RouterLink({ href, ...rest }: Omit<ComponentPropsWithoutRef<typeof Link>, "to"> & { href: string }) {
  return <Link to={href} {...rest} />;
}
