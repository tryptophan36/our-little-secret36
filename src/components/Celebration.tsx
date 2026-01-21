import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, PartyPopper } from "lucide-react";

interface CelebrationProps {
  answer: "yes" | "absolutely";
}

interface Confetti {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  rotation: number;
  size: number;
}

export const Celebration = ({ answer }: CelebrationProps) => {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    const colors = [
      "hsl(var(--blush))",
      "hsl(var(--sage))",
      "hsl(var(--gold))",
      "hsl(var(--petal))",
      "hsl(var(--cream))",
    ];

    const newConfetti: Confetti[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      rotation: Math.random() * 720 - 360,
      size: 8 + Math.random() * 12,
    }));
    setConfetti(newConfetti);

    // Console celebration
    console.log(
      "%c🎉🎉🎉 SHE SAID " + answer.toUpperCase() + "! 🎉🎉🎉",
      "font-size: 24px; color: #d4a5b9; font-weight: bold;"
    );
    console.log(
      "%cThis was built with love, every line of code. ❤️",
      "font-size: 14px; color: #6b8f71;"
    );
    console.log(
      "%cGood luck on your date! You've got this.",
      "font-size: 12px; color: #888; font-style: italic;"
    );
  }, [answer]);

  return (
    <div className="min-h-screen bg-gradient-nature relative overflow-hidden flex items-center justify-center">
      {/* Confetti */}
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute top-0 rounded-sm"
          style={{
            left: `${piece.x}%`,
            width: piece.size,
            height: piece.size * 0.6,
            backgroundColor: piece.color,
          }}
          initial={{ y: -50, rotate: 0, opacity: 1 }}
          animate={{
            y: "110vh",
            rotate: piece.rotation,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-blush/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sage/30 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Celebration icon */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <motion.div
            className="relative"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <PartyPopper className="w-20 h-20 text-gold" />
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              <Sparkles className="w-8 h-8 text-blush-dark" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Main message */}
        <motion.h1
          className="font-serif text-5xl md:text-7xl text-forest mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {answer === "absolutely" ? "I knew it!" : "You made my day!"}
        </motion.h1>

        <motion.div
          className="flex justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: i * 0.2,
              }}
            >
              <Heart className="w-10 h-10 text-blush-dark fill-blush" />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="font-body text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          I can't wait to see you.
          <br />
          <span className="text-blush-dark font-medium">
            This is just the beginning of something beautiful.
          </span>
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-sage-dark to-transparent" />
        </motion.div>

        {/* Call to action placeholder */}
        <motion.div
          className="glass-card rounded-2xl p-8 max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <p className="font-body text-lg text-foreground mb-4">
            Now that you've said yes...
          </p>
          <p className="font-serif text-2xl text-forest mb-6">
            Let's make it happen! 💫
          </p>
          <p className="text-muted-foreground text-sm font-body">
            (Add your contact info here or a special meeting place)
          </p>
        </motion.div>

        {/* Secret message */}
        <motion.p
          className="mt-16 text-xs text-muted-foreground/40 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          {'// P.S. You passed all the puzzles. You\'re officially amazing. 💕'}
        </motion.p>
      </motion.div>
    </div>
  );
};
