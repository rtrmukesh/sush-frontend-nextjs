"use client";

import { gameComponentMap } from "./gameComponents";

export default function GameLoader({ slug }: { slug: string }) {
  const GameComponent = gameComponentMap[slug];

  if (!GameComponent) {
    return <p className="opacity-60">🚧 Game coming soon...</p>;
  }

  return <GameComponent />;
}
