"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaInstagram, FaFacebookF, FaGithub } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import mukesh from "@/assets/images/mukesh.png";

export default function ProfileCard({
  isMobile = false,
}: {
  isMobile?: boolean;
}) {
  const [showContacts, setShowContacts] = useState(false);

  return (
    <div className="relative w-full">
      {/* MAIN CARD */}
      <div
        className={`
        bg-[#1e1e1f] text-white
        p-6 lg:p-8
        ${
          isMobile && !showContacts
            ? "rounded-2xl lg:rounded-3xl"
            : "rounded-t-2xl lg:rounded-t-3xl"
        }
        border border-gray-800
        flex gap-5 lg:gap-8
        flex-row lg:flex-col
        items-center
        transition-all duration-700
        w-full lg:w-[236px]
      `}
      >
        {/* Toggle button → Mobile Only */}
        <button
          onClick={() => setShowContacts(!showContacts)}
          className="
          absolute top-0 right-0
          w-24 h-8  
          flex items-center justify-center 
          text-xs font-medium
          rounded-tr-[1.25rem] rounded-bl-[1.25rem]
          bg-gradient-to-r
          from-[hsl(190,82%,72%)] to-black
          border border-[hsl(190,82%,72%)]
          text-[hsl(190,82%,72%)]
          hover:text-white
          hover:bg-[#0f2c33]
          duration-300
          lg:hidden
  "
        >
          {showContacts ? "Close" : "Contacts"}
        </button>

        {/* Profile Image */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-xl border border-gray-600 overflow-hidden">
          <Image
            src={mukesh}
            alt="Mukesh M"
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Name + Profession */}
        <div className="text-center">
          <h1
            className="font-semibold text-lg sm:text-xl lg:text-2xl"
            style={{ fontFamily: "Amaze Script" }}
          >
            Mukesh M
          </h1>

          <p
            className="
              text-gray-300 text-[10px] sm:text-xs mt-2
              bg-gray-800/60
              inline-block px-3 py-1
              rounded-full border border-gray-700
              backdrop-blur-sm
            "
          >
            Software Developer
          </p>
        </div>
      </div>

      {/* CONTACT PANEL */}
      <AnimatePresence>
        {(showContacts || !isMobile) && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20, borderRadius: 40 }}
            animate={{ opacity: 1, height: "auto", y: 0, borderRadius: 16 }}
            exit={{ opacity: 0, height: 0, y: -20, borderRadius: 40 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 80,
              damping: 18,
            }}
            className="
              bg-[#1e1e1f]
              border border-gray-800
              shadow-2xl
              overflow-hidden
              lg:block lg:w-[236px]
            "
          >
            <div className="p-6 flex flex-col gap-5">
              {/* EMAIL */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#202020] border border-gray-700">
                  <MdEmail
                    className="text-lg"
                    style={{ color: "hsl(190, 82%, 72%)" }}
                  />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">EMAIL</p>
                  <p className="text-xs font-medium break-all">
                    contact@themukesh.com
                  </p>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#202020] border border-gray-700">
                  <MdLocationOn
                    className="text-lg"
                    style={{ color: "hsl(190, 82%, 72%)" }}
                  />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">LOCATION</p>
                  <p className="text-xs font-medium">Bangalore, IN</p>
                </div>
              </div>

              {/* SOCIAL */}
              <div className="flex justify-center gap-4 text-lg">
                <FaLinkedin className="hover:text-blue-500 duration-200 cursor-pointer" />
                <FaInstagram className="hover:text-pink-500 duration-200 cursor-pointer" />
                <FaFacebookF className="hover:text-blue-400 duration-200 cursor-pointer" />
                <FaGithub className="hover:text-gray-400 duration-200 cursor-pointer" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
