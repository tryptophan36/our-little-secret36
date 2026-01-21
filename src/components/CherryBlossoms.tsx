import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export const CherryBlossoms = ({ count = 20 }: { count?: number }) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const newPetals: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 7,
      size: 10 + Math.random() * 15,
      rotation: Math.random() * 360,
    }));
    setPetals(newPetals);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: -30,
          }}
          initial={{ y: -30, rotate: petal.rotation, opacity: 0 }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, 30, -20, 40, -10, 20],
            rotate: [petal.rotation, petal.rotation + 360],
            opacity: [0, 1, 1, 1, 0.5, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            className="drop-shadow-sm"
          >
            <ellipse
              cx="12"
              cy="12"
              rx="8"
              ry="10"
              fill="hsl(var(--petal))"
              opacity="0.8"
            />
            <ellipse
              cx="12"
              cy="10"
              rx="5"
              ry="6"
              fill="hsl(var(--blush-light))"
              opacity="0.6"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
