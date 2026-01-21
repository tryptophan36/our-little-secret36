import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Landing } from "@/components/Landing";
import { TerminalPuzzle } from "@/components/TerminalPuzzle";
import { ConstellationPuzzle } from "@/components/ConstellationPuzzle";
import { GardenMaze } from "@/components/GardenMaze";
import { Finale } from "@/components/Finale";
import { Celebration } from "@/components/Celebration";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { toast } from "@/hooks/use-toast";

type Stage = "landing" | "terminal" | "constellation" | "maze" | "finale" | "celebration";

const Index = () => {
  const [stage, setStage] = useState<Stage>("landing");
  const [answer, setAnswer] = useState<"yes" | "absolutely">("yes");

  // Konami code Easter egg
  useKonamiCode(
    useCallback(() => {
      toast({
        title: "🎮 Konami Code Activated!",
        description: "You found the secret! A true developer at heart 💕",
      });
      console.log(
        "%c🎮 KONAMI CODE UNLOCKED! 🎮",
        "font-size: 20px; color: #ffd700; font-weight: bold; text-shadow: 2px 2px #ff69b4;"
      );
      console.log(
        "%cYou're amazing. I knew you'd try this.",
        "font-size: 14px; color: #6b8f71;"
      );
    }, [])
  );

  const handleAnswer = (ans: "yes" | "absolutely") => {
    setAnswer(ans);
    setStage("celebration");
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {stage === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Landing onStart={() => setStage("terminal")} />
          </motion.div>
        )}

        {stage === "terminal" && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <TerminalPuzzle onComplete={() => setStage("constellation")} />
          </motion.div>
        )}

        {stage === "constellation" && (
          <motion.div
            key="constellation"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <ConstellationPuzzle onComplete={() => setStage("maze")} />
          </motion.div>
        )}

        {stage === "maze" && (
          <motion.div
            key="maze"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <GardenMaze onComplete={() => setStage("finale")} />
          </motion.div>
        )}

        {stage === "finale" && (
          <motion.div
            key="finale"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Finale onAnswer={handleAnswer} />
          </motion.div>
        )}

        {stage === "celebration" && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <Celebration answer={answer} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
