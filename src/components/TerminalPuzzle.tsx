import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalPuzzleProps {
  onComplete: () => void;
}

const COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  decode <filename>  - Decode a secret file",
    "  ls                 - List available files",
    "  cat <filename>     - Read a file",
    "  clear              - Clear terminal",
    "  hint               - Get a hint",
    "",
    "Start by typing: ls",
  ],
  ls: [
    "📁 secrets/",
    "   ├── feelings.txt",
    "   ├── reasons.js",
    "   ├── confession.md",
    "   └── final_key.enc",
  ],
  "cat feelings.txt": [
    "Error: File is encrypted.",
    "Try: decode feelings.txt",
  ],
  "cat reasons.js": [
    "Error: File is encrypted.",
    "Try: decode reasons.js",
  ],
  "cat confession.md": [
    "Error: File is encrypted.",
    "Try: decode confession.md",
  ],
  "decode feelings.txt": [
    "Decrypting feelings.txt...",
    "████████████████████ 100%",
    "",
    "/* feelings.txt */",
    "",
    "Every time you walk into the room,",
    "my heart compiles a little faster.",
    "",
    "You're like a perfectly written function—",
    "elegant, efficient, and I can't stop",
    "thinking about how you work.",
    "",
    "✓ File decoded successfully",
    "✓ Progress: 1/3 files decoded",
  ],
  "decode reasons.js": [
    "Decrypting reasons.js...",
    "████████████████████ 100%",
    "",
    "// reasons.js",
    "",
    "const reasonsILikeYou = [",
    "  'Your laugh debugging my worst days',",
    "  'How your eyes light up solving problems',",
    "  'The way you make complexity simple',",
    "  'Your brilliant, beautiful mind',",
    "  // ... array too long to display",
    "];",
    "",
    "console.log(reasonsILikeYou.length);",
    "// Output: ∞",
    "",
    "✓ File decoded successfully",
    "✓ Progress: 2/3 files decoded",
  ],
  "decode confession.md": [
    "Decrypting confession.md...",
    "████████████████████ 100%",
    "",
    "# confession.md",
    "",
    "I didn't build this app because I had to.",
    "I built it because I wanted to show you",
    "something words couldn't capture.",
    "",
    "Every pixel, every animation, every hidden",
    "message—they're all for you.",
    "",
    "But the real secret?",
    "It's not in any of these files.",
    "",
    "Type: decode final_key.enc",
    "",
    "✓ Progress: 3/3 files decoded",
    "✓ Final key unlocked!",
  ],
  "decode final_key.enc": [
    "Decrypting final_key.enc...",
    "",
    "🔐 FINAL KEY DECODED 🔐",
    "",
    "The key was never a password.",
    "It was a question I've been too scared to ask.",
    "",
    "But not anymore.",
    "",
    "Proceed to the next challenge to find out...",
    "",
    "✓ Terminal challenge complete!",
    "",
    "[Press Enter to continue...]",
  ],
  hint: [
    "💡 Hint: Files need to be decoded before reading.",
    "Try: decode feelings.txt",
  ],
  clear: ["CLEAR"],
};

export const TerminalPuzzle = ({ onComplete }: TerminalPuzzleProps) => {
  const [lines, setLines] = useState<string[]>([
    "╔════════════════════════════════════════════════╗",
    "║         SECRET TERMINAL v1.0.0                 ║",
    "║   Someone left you encrypted messages...       ║",
    "╚════════════════════════════════════════════════╝",
    "",
    "Type 'help' to see available commands.",
    "",
  ]);
  const [input, setInput] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [decodedFiles, setDecodedFiles] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newLines = [...lines, `> ${cmd}`];

    if (trimmedCmd === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    // Track decoded files
    if (trimmedCmd.startsWith("decode ")) {
      const file = trimmedCmd.replace("decode ", "");
      if (!decodedFiles.includes(file) && COMMANDS[trimmedCmd]) {
        setDecodedFiles([...decodedFiles, file]);
      }
    }

    const response = COMMANDS[trimmedCmd] || [
      `Command not found: ${cmd}`,
      "Type 'help' for available commands.",
    ];

    // Check if final key is decoded
    if (trimmedCmd === "decode final_key.enc") {
      setIsComplete(true);
    }

    setLines([...newLines, ...response, ""]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (isComplete) {
        onComplete();
      } else {
        handleCommand(input);
      }
    }
  };

  return (
    <div className="min-h-screen bg-terminal-bg flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-3xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Terminal header */}
        <div className="bg-[hsl(180,10%,15%)] rounded-t-lg px-4 py-2 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[hsl(180,10%,50%)] font-mono text-sm ml-4">
            secret-terminal — bash
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={terminalRef}
          onClick={() => inputRef.current?.focus()}
          className="bg-terminal-bg border border-[hsl(180,10%,20%)] rounded-b-lg p-4 h-[500px] overflow-y-auto font-mono text-sm cursor-text"
        >
          <AnimatePresence>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1 }}
                className={`${
                  line.startsWith(">")
                    ? "text-sage"
                    : line.startsWith("✓")
                    ? "text-green-400"
                    : line.startsWith("Error")
                    ? "text-red-400"
                    : line.includes("//") || line.includes("/*")
                    ? "text-[hsl(180,10%,50%)]"
                    : "text-terminal-green"
                } terminal-glow whitespace-pre-wrap`}
              >
                {line}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Input line */}
          <div className="flex items-center text-terminal-green terminal-glow">
            <span className="text-sage mr-2">{">"}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-terminal-green font-mono caret-terminal-green"
              autoFocus
              spellCheck={false}
            />
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-5 bg-terminal-green ml-1"
            />
          </div>
        </div>

        {/* Progress indicator */}
        <motion.div
          className="mt-4 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {["feelings.txt", "reasons.js", "confession.md", "final_key.enc"].map(
            (file, i) => (
              <div
                key={file}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  decodedFiles.includes(file)
                    ? "bg-terminal-green shadow-[0_0_10px_hsl(var(--terminal-green))]"
                    : "bg-[hsl(180,10%,25%)]"
                }`}
                title={file}
              />
            )
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
