"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/**
 * Dark-only mode — forces dark theme always.
 * Light mode has been intentionally removed per design decision.
 */
export function ThemeProvider({ children }: Props) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      disableTransitionOnChange={false}
      storageKey="nft-theme"
    >
      {children}
    </NextThemeProvider>
  );
}
