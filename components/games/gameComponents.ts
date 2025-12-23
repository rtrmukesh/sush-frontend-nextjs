"use client";

import dynamic from "next/dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const gameComponentMap: Record<string, any> = {
  "image-puzzle": dynamic(() => import("./ImagePuzzleGame"), {
    ssr: false,
  }),
};
