import { SEO_KEYWORDS } from "./seo";

export const games = [
  {
    id: 1,
    slug: "image-puzzle",
    title: "Image Puzzle Game",
    description: "Solve the puzzle by rearranging image tiles.",
    status: "Available",
    seo: {
      title: "Image Puzzle Game | GameZone",
      description: "Play Image Puzzle Game online for free.",
      keywords: [
        ...SEO_KEYWORDS,
        "puzzle game",
        "image puzzle",
        "brain game",
        "mukesh puzzle game",
        "mukesh image puzzle",
        "mukesh brain game",
      ],
      image: "/gamingbanner.png",
    },
  },
];
