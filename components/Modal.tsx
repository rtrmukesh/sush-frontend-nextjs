"use client";
import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function ResponsiveDrawer({
  isOpen,
  onClose,
  children,
}: DrawerProps) {
  // Close on ESC key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            className={`
              fixed top-0 right-0 bottom-0 z-50 bg-white dark:bg-gray-900 shadow-lg
              w-full sm:w-[50%] max-w-full p-6 flex flex-col
            `}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="self-end text-gray-500 hover:text-gray-700 dark:hover:text-white mb-4"
            >
              ✕
            </button>

            {/* Drawer Content */}
            <div className="overflow-y-auto flex-1">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
