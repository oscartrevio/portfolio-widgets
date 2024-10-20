"use client";

import { cn } from "@/lib/utils";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useMemo } from "react";

type TextMorphProps = {
  children: string;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
};

export function TextMorph({ children, as: Component = "p", className, style }: TextMorphProps) {
  const uniqueId = useId();

  const characters = useMemo(() => {
    const charCounts: Record<string, number> = {};

    return Array.from(children).map((char, index) => {
      // Preserve spaces and use a non-breaking space for rendering spaces
      const label = char === " " ? "\u00A0" : char; // Preserve original case

      charCounts[label] = (charCounts[label] || 0) + 1;

      return {
        id: `${uniqueId}-${label}${charCounts[label]}`,
        label,
      };
    });
  }, [children, uniqueId]);

  return (
    <Component aria-label={children} style={style}>
      <AnimatePresence mode="popLayout" initial={false}>
        {characters.map((character) => (
          <motion.span
            key={character.id}
            layoutId={character.id}
            className={cn("inline-block", className)}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 18,
              mass: 0.3,
            }}
          >
            {character.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </Component>
  );
}
