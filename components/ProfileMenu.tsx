"use client";
import { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Icon (Visible Everywhere) */}
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer text-black dark:text-white"
      >
        <User />
      </button>

      {open && (
        <div
          className="absolute right-0 top-8 bg-white dark:bg-neutral-900 
                     p-4 rounded-md shadow-md w-40 z-50 transition-all"
        >
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <p className="py-2 cursor-pointer hover:text-blue-600 dark:text-gray-200">
              Profile
            </p>
            <p className="py-2 cursor-pointer hover:text-blue-600 dark:text-gray-200">
              Settings
            </p>
            <p className="py-2 cursor-pointer hover:text-red-500 dark:text-red-400">
              Logout
            </p>
          </div>

          {/* Mobile Menu → Only Logout */}
          <div className="md:hidden">
            <p className="py-2 cursor-pointer hover:text-red-500 dark:text-red-400 text-center">
              Logout
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
