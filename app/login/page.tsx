import LeftSection from "./components/LeftSection";
import RightSection from "./components/RightSection";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT SIDE – IMAGE */}
      <LeftSection />

      {/* RIGHT SIDE – FORM */}
      <RightSection />
    </div>
  );
}
