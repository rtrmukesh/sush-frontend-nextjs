"use client";

import { useEffect, useRef, useState } from "react";

interface AdsLayoutProps {
  adSlot: string;
  className?: string;
  testing?: boolean;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}
/* ✴---
Top
Bottom
Middle
---✴ */
export default function AdsTBMLayout({
  adSlot,
  className = "",
  testing = false,
}: AdsLayoutProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (testing) return;
    if (!adRef.current || loaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          try {
            window.adsbygoogle = window.adsbygoogle || [];
            window.adsbygoogle.push({});
            setLoaded(true);
            observer.disconnect();
          } catch (err) {
            console.warn("Adsense error:", err);
          }
        }
      },
      { rootMargin: "300px" } // preload ads earlier for better visibility
    );

    observer.observe(adRef.current);
    return () => observer.disconnect();
  }, [loaded, testing]);

  return (
    <div
      className={`flex justify-center my-8 ${className}`}
      aria-label="Advertisement"
    >
      <div ref={adRef} className="w-full max-w-[1200px] text-center">
        {testing ? (
          <div className="h-[120px] sm:h-[150px] w-full rounded-xl border border-dashed border-gray-400 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
            AdSense Placeholder (Testing Mode)
          </div>
        ) : (
          <ins
            className="adsbygoogle"
            style={{ display: "block", minHeight: "120px" }}
            data-ad-client="ca-pub-7493262026277368"
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
      </div>
    </div>
  );
}
