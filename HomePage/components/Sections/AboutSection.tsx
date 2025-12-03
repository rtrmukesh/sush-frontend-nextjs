export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-[#1e1e1f] p-6 border border-[#1e1f21] shadow-lg rounded-t-2xl"
    >
      <h2 className="text-3xl font-bold">Digital Identity</h2>
      <div className="w-20 h-[3px] bg-blue-400 mt-2 rounded-full" />

      <p className="text-gray-300 mt-4 leading-relaxed">
        I'm Mukesh, a Software Engineer based in Bangalore, India.
        Passionate about programming, web development, and building scalable
        solutions to solve real-world problems.
      </p>

      <p className="text-gray-300 mt-4 leading-relaxed">
        I hold a postgraduate degree from the National Institute of Technology,
        Tiruchirappalli, and have worked as a Software Development Engineer since
        2018.
      </p>
    </section>
  );
}
