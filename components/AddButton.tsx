import React from "react";
import { motion } from "framer-motion";

type AddButtonProps = {
  label?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

export default function AddButton({
  label = "Button",
  onClick = () => {},
  variant = "primary",
  loading = false,
  icon = null,
  disabled = false,
  className = "",
  ...props
}: AddButtonProps) {
  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-md",
    secondary:
      "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 focus:ring-gray-300",
    ghost:
      "bg-transparent text-indigo-600 hover:bg-indigo-50 border-transparent",
  };

  // responsive padding + text size
  const responsiveSizes =
    "px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base md:px-5 md:py-2.5 md:text-lg lg:px-6 lg:py-3 lg:text-xl";

  const base = `inline-flex items-center gap-2 rounded-2xl font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed ${responsiveSizes}`;

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      className={`${base} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <svg
          className="w-5 h-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      ) : (
        icon && <span className="flex items-center">{icon}</span>
      )}

      <span>{label}</span>
    </motion.button>
  );
}
