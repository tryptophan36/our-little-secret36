import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface FinaleProps {
  onAnswer: (answer: "yes" | "absolutely") => void;
}

export const Finale = ({ onAnswer }: FinaleProps) => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [bloomingFlowers, setBloomingFlowers] = useState<number[]>([]);

  useEffect(() => {
    // Sequentially bloom flowers
    const flowerCount = 12;
    for (let i = 0; i < flowerCount; i++) {
      setTimeout(() => {
        setBloomingFlowers((prev) => [...prev, i]);
      }, i * 200);
    }

    // Show question after flowers bloom
    setTimeout(() => {
      setShowQuestion(true);
    }, flowerCount * 200 + 500);
  }, []);

  // Console easter egg
  useEffect(() => {
    console.log(
      "%c💕 This is the moment...",
      "font-size: 16px; color: #d4a5b9; font-weight: bold;"
    );
    console.log(
      "%cYou made it through all the puzzles.",
      "font-size: 12px; color: #6b8f71;"
    );
    console.log(
      "%cNow there's just one question left to answer.",
      "font-size: 12px; color: #6b8f71; font-style: italic;"
    );
  }, []);

  const flowerPositions = [
    { x: 10, y: 20, size: 40, delay: 0 },
    { x: 85, y: 15, size: 35, delay: 0.1 },
    { x: 5, y: 60, size: 45, delay: 0.2 },
    { x: 90, y: 55, size: 38, delay: 0.3 },
    { x: 15, y: 85, size: 42, delay: 0.4 },
    { x: 80, y: 80, size: 36, delay: 0.5 },
    { x: 25, y: 10, size: 30, delay: 0.6 },
    { x: 70, y: 25, size: 32, delay: 0.7 },
    { x: 8, y: 40, size: 28, delay: 0.8 },
    { x: 88, y: 38, size: 34, delay: 0.9 },
    { x: 30, y: 90, size: 40, delay: 1.0 },
    { x: 65, y: 88, size: 38, delay: 1.1 },
  ];

  return (
    <div className="min-h-screen bg-gradient-nature relative overflow-hidden flex items-center justify-center">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blush-light/20 to-cream/40" />

      {/* Blooming flowers */}
      {flowerPositions.map((flower, i) => (
        <AnimatePresence key={i}>
          {bloomingFlowers.includes(i) && (
            <motion.div
              className="absolute"
              style={{
                left: `${flower.x}%`,
                top: `${flower.y}%`,
              }}
              initial={{ scale: 0, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: flower.delay,
              }}
            >
              <svg
                width={flower.size}
                height={flower.size}
                viewBox="0 0 100 100"
                className="drop-shadow-lg"
              >
                {/* Petals */}
                {[0, 72, 144, 216, 288].map((angle, j) => (
                  <ellipse
                    key={j}
                    cx="50"
                    cy="30"
                    rx="15"
                    ry="25"
                    fill={j % 2 === 0 ? "hsl(var(--blush))" : "hsl(var(--petal))"}
                    transform={`rotate(${angle} 50 50)`}
                    opacity="0.9"
                  />
                ))}
                {/* Center */}
                <circle cx="50" cy="50" r="12" fill="hsl(var(--gold))" />
                <circle cx="50" cy="50" r="8" fill="hsl(var(--cream))" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      ))}

      {/* Floating butterflies */}
      {showQuestion && (
        <>
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute text-3xl"
              style={{
                left: `${20 + i * 25}%`,
                top: "30%",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: [0, -20, 0],
                x: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              🦋
            </motion.div>
          ))}
        </>
      )}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Heart animation before question */}
        <AnimatePresence>
          {!showQuestion && (
            <motion.div
              className="flex justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <Heart className="w-24 h-24 text-blush-dark fill-blush" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Question */}
        <AnimatePresence>
          {showQuestion && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Decorative line */}
              <motion.div
                className="flex justify-center mb-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-blush-dark to-transparent" />
              </motion.div>

              {/* Question text */}
              <motion.h1
                className="font-serif text-4xl md:text-6xl lg:text-7xl text-forest leading-tight mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Would you go on
                <br />
                <span className="text-gradient-romantic">a date with me?</span>
              </motion.h1>

              {/* Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <motion.button
                  onClick={() => onAnswer("yes")}
                  className="px-12 py-4 bg-blush-dark text-cream rounded-full font-body text-xl tracking-wide shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Yes 💕
                </motion.button>

                <motion.button
                  onClick={() => onAnswer("absolutely")}
                  className="px-12 py-4 bg-forest text-cream rounded-full font-body text-xl tracking-wide shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Absolutely! 💝
                </motion.button>
              </motion.div>

              {/* Subtle note */}
              <motion.p
                className="mt-12 text-muted-foreground/60 font-body text-sm italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                (There's no wrong answer here)
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
