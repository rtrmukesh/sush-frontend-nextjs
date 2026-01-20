"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

export default function PagePreloader({ children }: { children?: ReactNode }) {

    const pathname = usePathname();
  const isHome = pathname === "/";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     if (!isHome) return;
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, [isHome]);

   if (!isHome) {
    return <>{children}</>;
  }

  return (
    <>
      {loading ?(
        <div className="preloader-container">
          <motion.svg
            className="loader-svg"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Hexagon Shape Border */}
            <motion.polygon
              points="50,5 90,27 90,72 50,95 10,72 10,27"
              stroke="#00FFF0"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />

            {/* MS Letter */}
            <motion.text
              x="50%"
              y="55%"
              textAnchor="middle"
              fill="#00FFF0"
              fontSize="28"
              fontWeight="700"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              MS
            </motion.text>
          </motion.svg>
        </div>
      ):(
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{
            opacity: loading ? 0 : 1,
            y: loading ? 40 : 0,
            scale: loading ? 0.96 : 1,
          }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
