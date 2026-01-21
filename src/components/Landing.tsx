import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { CherryBlossoms } from "./CherryBlossoms";

interface LandingProps {
  onStart: () => void;
}

export const Landing = ({ onStart }: LandingProps) => {
  return (
    <div className="min-h-screen bg-gradient-nature relative overflow-hidden flex items-center justify-center">
      <CherryBlossoms count={25} />
      
      {/* Ambient gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blush/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sage/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cream/30 rounded-full blur-3xl" />

      <motion.div
        className="relative z-20 text-center px-6 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Decorative element */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <div className="w-20 h-20 rounded-full bg-blush/30 flex items-center justify-center backdrop-blur-sm border border-blush/20">
            <Sparkles className="w-10 h-10 text-blush-dark" />
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="font-serif text-5xl md:text-7xl font-light text-forest mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          A Challenge
          <br />
          <span className="text-gradient-romantic font-medium">Awaits You</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-body text-xl md:text-2xl text-muted-foreground mb-4 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Someone left you a puzzle...
        </motion.p>

        <motion.p
          className="font-body text-lg text-muted-foreground/80 mb-12 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          ...if you're brave enough to solve it
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={onStart}
          className="group relative px-10 py-4 bg-forest text-cream rounded-full font-body text-lg tracking-wide overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-forest/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 flex items-center gap-3">
            Accept Challenge
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </span>
          <motion.div
            className="absolute inset-0 bg-sage-dark"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Secret hint for developers */}
        <motion.p
          className="mt-16 text-xs text-muted-foreground/40 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          {/* Easter egg hint */}
          {'// hint: developers always check the console ;)'}
        </motion.p>
      </motion.div>

      {/* Console Easter Egg */}
      <ConsoleEasterEgg />
    </div>
  );
};

// Hidden console messages
const ConsoleEasterEgg = () => {
  if (typeof window !== "undefined") {
    console.log(
      "%c🌸 Oh, you found me! 🌸",
      "font-size: 24px; color: #d4a5b9; font-family: Georgia;"
    );
    console.log(
      "%cA developer who checks the console... I like that about you.",
      "font-size: 14px; color: #6b8f71; font-style: italic;"
    );
    console.log(
      "%cThere are more secrets hidden in this app. Keep your eyes open 👀",
      "font-size: 12px; color: #888;"
    );
    console.log(
      "%cTry the Konami code if you're feeling nostalgic...",
      "font-size: 11px; color: #aaa;"
    );
  }
  return null;
};
