"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OverlayProps {
  isOpen: boolean;
  body: React.ReactNode;
  setIsOpen?: (value: boolean) => void;
}

export default function OverlayModal({
  isOpen,
  body,
  setIsOpen,
}: OverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="
            fixed inset-0 
            bg-black/60 
            backdrop-blur-[1px] 
            flex items-center justify-center
            z-[9999]
          "
          onClick={() => {
            setIsOpen?.(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 35 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.55,
                ease: [0.15, 0.85, 0.25, 1],
                type: "spring",
                damping: 22,
                stiffness: 180,
              },
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
              y: 20,
              transition: { duration: 0.55, ease: "easeInOut" },
            }}
            className="
              rounded-2xl 
              p-6 
              shadow-2xl 
              flex items-center justify-center 
            "
          >
            {body}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
