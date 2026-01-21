import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flower2 } from "lucide-react";

interface GardenMazeProps {
  onComplete: () => void;
}

// Maze grid: 0 = path, 1 = wall, 2 = flower (collectible), 3 = end
const MAZE = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 2, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 2, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 2, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 2, 0, 3, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const START = { x: 1, y: 1 };
const FLOWER_MESSAGES = [
  "You're doing great!",
  "Almost there...",
  "Keep going!",
  "So close!",
  "Beautiful!",
];

export const GardenMaze = ({ onComplete }: GardenMazeProps) => {
  const [position, setPosition] = useState(START);
  const [collectedFlowers, setCollectedFlowers] = useState<string[]>([]);
  const [visitedCells, setVisitedCells] = useState<Set<string>>(new Set(["1,1"]));
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState("");

  const movePlayer = useCallback(
    (dx: number, dy: number) => {
      if (isComplete) return;

      const newX = position.x + dx;
      const newY = position.y + dy;

      // Check bounds and walls
      if (
        newX >= 0 &&
        newX < MAZE[0].length &&
        newY >= 0 &&
        newY < MAZE.length &&
        MAZE[newY][newX] !== 1
      ) {
        const cellKey = `${newX},${newY}`;
        setPosition({ x: newX, y: newY });
        setVisitedCells((prev) => new Set([...prev, cellKey]));

        // Check for flower
        if (MAZE[newY][newX] === 2 && !collectedFlowers.includes(cellKey)) {
          setCollectedFlowers((prev) => [...prev, cellKey]);
          setMessage(FLOWER_MESSAGES[collectedFlowers.length % FLOWER_MESSAGES.length]);
          setTimeout(() => setMessage(""), 2000);
        }

        // Check for end
        if (MAZE[newY][newX] === 3) {
          setIsComplete(true);
          setTimeout(onComplete, 1500);
        }
      }
    },
    [position, isComplete, collectedFlowers, onComplete]
  );

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          movePlayer(0, -1);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          movePlayer(0, 1);
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          movePlayer(-1, 0);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          movePlayer(1, 0);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [movePlayer]);

  // Easter egg console message
  useEffect(() => {
    console.log(
      "%c🌸 Garden Secret: There are 5 flowers hidden in the maze!",
      "color: #d4a5b9; font-size: 12px;"
    );
    console.log(
      "%cCollect them all for a special feeling... or just find the exit!",
      "color: #6b8f71; font-size: 11px;"
    );
  }, []);

  const cellSize = 40;

  return (
    <div className="min-h-screen bg-gradient-nature flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-blush/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-sage/15 rounded-full blur-3xl" />

      {/* Title */}
      <motion.div
        className="text-center mb-6 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-serif text-4xl md:text-5xl text-forest mb-2">
          The Secret Garden
        </h2>
        <p className="text-muted-foreground font-body">
          Find your way through • Use arrow keys or WASD
        </p>
      </motion.div>

      {/* Floating message */}
      <AnimatePresence>
        {message && (
          <motion.div
            className="absolute top-32 z-20 px-6 py-3 bg-blush/90 text-forest rounded-full font-body text-lg shadow-lg"
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
          >
            🌸 {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Maze */}
      <motion.div
        className="relative bg-card/80 rounded-2xl p-4 shadow-xl backdrop-blur-sm border border-sage/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="grid gap-0.5"
          style={{
            gridTemplateColumns: `repeat(${MAZE[0].length}, ${cellSize}px)`,
          }}
        >
          {MAZE.map((row, y) =>
            row.map((cell, x) => {
              const cellKey = `${x},${y}`;
              const isPlayer = position.x === x && position.y === y;
              const isVisited = visitedCells.has(cellKey);
              const isFlower = cell === 2 && !collectedFlowers.includes(cellKey);
              const isEnd = cell === 3;
              const isWall = cell === 1;
              const isCollectedFlower = collectedFlowers.includes(cellKey);

              return (
                <motion.div
                  key={cellKey}
                  className={`relative flex items-center justify-center transition-all duration-300 ${
                    isWall
                      ? "bg-forest/80 rounded-sm"
                      : isEnd
                      ? "bg-gold/30 rounded-lg"
                      : isVisited
                      ? "bg-sage-light/50"
                      : "bg-cream"
                  }`}
                  style={{ width: cellSize, height: cellSize }}
                  initial={false}
                  animate={isCollectedFlower ? { scale: [1, 1.1, 1] } : {}}
                >
                  {/* Wall decoration */}
                  {isWall && (
                    <div className="absolute inset-0 bg-gradient-to-br from-forest/60 to-sage-dark/80 rounded-sm" />
                  )}

                  {/* Flower */}
                  {isFlower && (
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                      }}
                    >
                      <Flower2 className="w-6 h-6 text-blush-dark" />
                    </motion.div>
                  )}

                  {/* Collected flower sparkle */}
                  {isCollectedFlower && (
                    <motion.div
                      className="absolute text-gold text-xl"
                      initial={{ opacity: 1, scale: 1 }}
                      animate={{ opacity: 0, scale: 2, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      ✨
                    </motion.div>
                  )}

                  {/* End marker */}
                  {isEnd && !isPlayer && (
                    <motion.div
                      className="text-2xl"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                      }}
                    >
                      💝
                    </motion.div>
                  )}

                  {/* Player */}
                  {isPlayer && (
                    <motion.div
                      className="absolute w-7 h-7 bg-blush rounded-full flex items-center justify-center shadow-lg z-10"
                      layoutId="player"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <span className="text-sm">🦋</span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>

      {/* Flower counter */}
      <motion.div
        className="mt-6 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className={`transition-all duration-300 ${
              i < collectedFlowers.length ? "text-blush-dark scale-110" : "text-muted-foreground/30"
            }`}
            animate={i < collectedFlowers.length ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ delay: i * 0.1 }}
          >
            <Flower2 className="w-6 h-6" />
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile controls */}
      <div className="mt-6 grid grid-cols-3 gap-2 md:hidden">
        <div />
        <motion.button
          onClick={() => movePlayer(0, -1)}
          className="w-14 h-14 bg-sage/20 rounded-lg flex items-center justify-center text-2xl active:bg-sage/40"
          whileTap={{ scale: 0.95 }}
        >
          ↑
        </motion.button>
        <div />
        <motion.button
          onClick={() => movePlayer(-1, 0)}
          className="w-14 h-14 bg-sage/20 rounded-lg flex items-center justify-center text-2xl active:bg-sage/40"
          whileTap={{ scale: 0.95 }}
        >
          ←
        </motion.button>
        <motion.button
          onClick={() => movePlayer(0, 1)}
          className="w-14 h-14 bg-sage/20 rounded-lg flex items-center justify-center text-2xl active:bg-sage/40"
          whileTap={{ scale: 0.95 }}
        >
          ↓
        </motion.button>
        <motion.button
          onClick={() => movePlayer(1, 0)}
          className="w-14 h-14 bg-sage/20 rounded-lg flex items-center justify-center text-2xl active:bg-sage/40"
          whileTap={{ scale: 0.95 }}
        >
          →
        </motion.button>
      </div>

      {/* Completion overlay */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            className="absolute inset-0 bg-cream/80 flex items-center justify-center z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <p className="font-serif text-4xl text-forest mb-4">
                You found the way! 💝
              </p>
              <p className="text-muted-foreground font-body">
                One more step awaits...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
