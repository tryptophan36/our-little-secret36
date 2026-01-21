import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConstellationPuzzleProps {
  onComplete: () => void;
}

interface Star {
  id: number;
  x: number;
  y: number;
  word: string;
}

// Stars form a heart shape when connected in order
const STARS: Star[] = [
  { id: 1, x: 50, y: 35, word: "Every" },
  { id: 2, x: 35, y: 25, word: "moment" },
  { id: 3, x: 20, y: 35, word: "with" },
  { id: 4, x: 25, y: 50, word: "you" },
  { id: 5, x: 35, y: 65, word: "feels" },
  { id: 6, x: 50, y: 75, word: "like" },
  { id: 7, x: 65, y: 65, word: "magic" },
  { id: 8, x: 75, y: 50, word: "✨" },
  { id: 9, x: 80, y: 35, word: "" },
  { id: 10, x: 65, y: 25, word: "" },
];

const CORRECT_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1];

export const ConstellationPuzzle = ({ onComplete }: ConstellationPuzzleProps) => {
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [revealedWords, setRevealedWords] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);

  // Show hint after a few incorrect attempts
  useEffect(() => {
    if (incorrectAttempts >= 3) {
      setShowHint(true);
    }
  }, [incorrectAttempts]);

  const handleStarClick = (starId: number) => {
    if (isComplete) return;

    const newSelection = [...selectedStars, starId];
    const expectedIndex = selectedStars.length;
    const expectedStar = CORRECT_ORDER[expectedIndex];

    if (starId === expectedStar) {
      setSelectedStars(newSelection);
      
      // Add word to revealed
      const star = STARS.find((s) => s.id === starId);
      if (star?.word) {
        setRevealedWords([...revealedWords, star.word]);
      }

      // Check if complete
      if (newSelection.length === CORRECT_ORDER.length) {
        setIsComplete(true);
        setTimeout(onComplete, 2000);
      }
    } else {
      // Wrong star - reset
      setIncorrectAttempts((prev) => prev + 1);
      setSelectedStars([]);
      setRevealedWords([]);
    }
  };

  const getLineCoordinates = () => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    for (let i = 0; i < selectedStars.length - 1; i++) {
      const star1 = STARS.find((s) => s.id === selectedStars[i]);
      const star2 = STARS.find((s) => s.id === selectedStars[i + 1]);
      if (star1 && star2) {
        lines.push({ x1: star1.x, y1: star1.y, x2: star2.x, y2: star2.y });
      }
    }
    return lines;
  };

  return (
    <div className="min-h-screen bg-gradient-sky relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Twinkling background stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Title */}
      <motion.div
        className="text-center mb-8 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-serif text-4xl md:text-5xl text-cream mb-2">
          Connect the Stars
        </h2>
        <p className="text-sky/80 font-body text-lg">
          Find the hidden shape in the constellation
        </p>
        {showHint && (
          <motion.p
            className="text-gold text-sm mt-2 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            💡 Hint: Start from the top center and trace a heart shape
          </motion.p>
        )}
      </motion.div>

      {/* Constellation area */}
      <div className="relative w-full max-w-lg aspect-square">
        {/* SVG for lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
          {getLineCoordinates().map((line, i) => (
            <motion.line
              key={i}
              x1={`${line.x1}%`}
              y1={`${line.y1}%`}
              x2={`${line.x2}%`}
              y2={`${line.y2}%`}
              stroke="hsl(var(--gold))"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="drop-shadow-[0_0_8px_hsl(var(--gold))]"
            />
          ))}
        </svg>

        {/* Stars */}
        {STARS.map((star) => {
          const isSelected = selectedStars.includes(star.id);
          const isNext = CORRECT_ORDER[selectedStars.length] === star.id;

          return (
            <motion.button
              key={star.id}
              onClick={() => handleStarClick(star.id)}
              className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 z-30 ${
                isSelected
                  ? "bg-gold scale-125"
                  : "bg-cream/80 hover:bg-gold/80 hover:scale-110"
              }`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
              }}
              animate={
                isSelected
                  ? {
                      boxShadow: [
                        "0 0 10px hsl(45, 70%, 55%)",
                        "0 0 30px hsl(45, 70%, 55%)",
                        "0 0 10px hsl(45, 70%, 55%)",
                      ],
                    }
                  : isNext && showHint
                  ? {
                      scale: [1, 1.2, 1],
                    }
                  : {}
              }
              transition={{
                repeat: isSelected || (isNext && showHint) ? Infinity : 0,
                duration: 1.5,
              }}
              whileHover={{ scale: isSelected ? 1.25 : 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Star {star.id}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Revealed message */}
      <motion.div
        className="mt-8 text-center h-20 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <AnimatePresence mode="popLayout">
          {revealedWords.length > 0 && (
            <motion.p
              className="font-serif text-2xl md:text-3xl text-cream"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {revealedWords.join(" ")}
            </motion.p>
          )}
        </AnimatePresence>

        {isComplete && (
          <motion.p
            className="text-gold mt-4 font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            ✨ Beautiful! You found the hidden heart ✨
          </motion.p>
        )}
      </motion.div>

      {/* Progress */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {CORRECT_ORDER.slice(0, -1).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i < selectedStars.length
                ? "bg-gold shadow-[0_0_8px_hsl(var(--gold))]"
                : "bg-cream/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
