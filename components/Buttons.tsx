"use client";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  type?: "button" | "submit";
}

export function PrimaryButton({ children, onClick, className = "", type = "button" }: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={"primary-btn ff-body " + className}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <span>{children}</span>
    </motion.button>
  );
}

export function GhostButton({ children, onClick, className = "" }: ButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={"ghost-btn ff-body " + className}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  );
}
