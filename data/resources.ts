export interface Resource {
  title: string;
  slug: string;
  description: string;
  category: string;
  downloadUrl: string;
}

export const resources: Resource[] = [
  {
    title: "React Interview Questions PDF",
    slug: "react-interview-questions",
    description: "Top React interview questions with answers.",
    category: "PDF",
    downloadUrl: "/files/react-interview.pdf",
  },
  {
    title: "Node.js Notes",
    slug: "nodejs-notes",
    description: "Beginner to advanced Node.js notes.",
    category: "PDF",
    downloadUrl: "/files/nodejs-notes.pdf",
  },
];
