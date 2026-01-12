import HomePageClient from "./Homepage";


export default function Home() {
  return (
    <>
      <h1 className="sr-only">
        Mukesh Murugaiyan – Full Stack Developer & Software Engineer
      </h1>

      <p className="sr-only">
        Mukesh Murugaiyan, widely known as themukesh, is a Full Stack Software
        Developer from India. He builds scalable, high-performance web and mobile
        applications using React, Next.js, Node.js, and React Native for iOS and
        Android platforms | Java | Python | Nest js.
      </p>

      <HomePageClient />
    </>
  );
}
