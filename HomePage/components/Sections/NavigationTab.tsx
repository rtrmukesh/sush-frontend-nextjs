"use client";
import { FaUser, FaBriefcase, FaFolder, FaEnvelope } from "react-icons/fa";

export default function NavigationTab() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#111] border-t border-[#222] py-3 flex justify-around text-xl z-50">
      <FaUser />
      <FaBriefcase />
      <FaFolder />
      <FaEnvelope />
    </nav>
  );
}
