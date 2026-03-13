import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, Lock, Share2, Check, Github, Zap } from "lucide-react";
import nessyImg from "@/assets/nessy-moscow.png";
import { generateQuest, type Quest, type QuestInput } from "@/lib/questGenerator";
import Confetti from "./Confetti";

const INTERESTS = [
  "Invite Friends",
  "Earn Points",
  "Explore Luffa",
  "Build Mini-App",
  "Community Events",
  "Content Creation",
];

type AppState = "input" | "loading" | "reveal" | "accepted";

export default function ShadowQuestApp() {
  const [state, setState] = useState<AppState>("input");
  const [level, setLevel] = useState(10);
  const [interests, setInterests] = useState<string[]>([]);
  const [goal, setGoal] = useState("");
  const [quest, setQuest] = useState<Quest | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleGenerate = () => {
    if (interests.length === 0) return;
    setState("loading");
    const input: QuestInput = { level, interests, goal };
    setTimeout(() => {
      setQuest(generateQuest(input));
      setState("reveal");
    }, 2500);
  };

  const handleAccept = () => {
    setState("accepted");
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const handleShare = () => {
    if (!quest) return;
    const text = encodeURIComponent(quest.publicEcho + "\n\n#Odyssey #Endless #ShadowQuest");
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  const handleReset = () => {
    setState("input");
    setQuest(null);
    setShowConfetti(false);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Confetti active={showConfetti} />

      {/* Hero */}
      <header className="relative z-10 pt-12 pb-8 px-4 text-center">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          <motion.img
            src={nessyImg}
            alt="Nessy mascot"
            className="w-28 h-28 md:w-36 md:h-36 drop-shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <h1 className="font-display text-3xl md:text-5xl font-bold neon-text gradient-text leading-tight">
            Odyssey Shadow Quest Generator
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl">
            Unlock secret quests tailored just for you – private, fun, and rewarding
          </p>
          <div className="privacy-badge">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-foreground/80">Encrypted &amp; Private – Only You Know Your Quest</span>
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-2xl mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          {/* INPUT STATE */}
          {state === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-6 md:p-8 space-y-6"
            >
              {/* Level Slider */}
              <div>
                <label className="flex items-center justify-between text-sm font-medium mb-3">
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    Current Odyssey Level
                  </span>
                  <span className="font-display text-accent text-lg">{level}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={level}
                  onChange={(e) => setLevel(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted accent-primary"
                  style={{
                    background: `linear-gradient(to right, hsl(265 85% 60%) ${(level / 50) * 100}%, hsl(260 20% 15%) ${(level / 50) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1</span>
                  <span>50</span>
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Your Interests
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {INTERESTS.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                        interests.includes(interest) ? "chip-active" : "chip-inactive"
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal */}
              <div>
                <label className="text-sm font-medium mb-2 block">Your Personal Goal</label>
                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="I want to level up faster and get rare Nessy items"
                  rows={3}
                  className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none transition-all"
                />
              </div>

              {/* Generate Button */}
              <motion.button
                onClick={handleGenerate}
                disabled={interests.length === 0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full neon-btn text-primary-foreground font-bold text-lg py-4 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed animate-pulse-glow transition-all"
              >
                Generate Shadow Quest
              </motion.button>
            </motion.div>
          )}

          {/* LOADING STATE */}
          {state === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card p-10 md:p-14 flex flex-col items-center gap-6 text-center"
            >
              <motion.img
                src={nessyImg}
                alt="Nessy loading"
                className="w-24 h-24"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <div className="space-y-2">
                <p className="font-display text-lg text-accent">Nessy is crafting your secret quest...</p>
                <p className="text-sm text-muted-foreground">Encrypting with E2EE + DID protocols</p>
              </div>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-accent"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* REVEAL STATE */}
          {(state === "reveal" || state === "accepted") && quest && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="glass-card p-6 md:p-8 space-y-5 relative overflow-hidden"
            >
              {/* Nessy peeking */}
              <motion.img
                src={nessyImg}
                alt="Nessy peek"
                className="absolute -right-4 -top-4 w-20 h-20 opacity-60"
                initial={{ x: 40, opacity: 0 }}
                animate={state === "accepted" 
                  ? { x: 0, opacity: 0.8, rotate: [0, 15, -15, 0] }
                  : { x: 0, opacity: 0.6 }
                }
                transition={state === "accepted" 
                  ? { rotate: { duration: 0.5, repeat: 3 } }
                  : { delay: 0.3 }
                }
              />

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-display tracking-wider uppercase">
                  Shadow Quest #{quest.id}
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-bold gradient-text">
                  {quest.title}
                </h2>
              </div>

              <p className="text-foreground/80 leading-relaxed">{quest.description}</p>

              {/* Steps */}
              <div className="space-y-2">
                <p className="text-sm font-semibold flex items-center gap-2">
                  <Lock className="w-3 h-3 text-accent" />
                  Quest Steps
                  <span className="text-xs text-muted-foreground font-normal">(Only you can see this)</span>
                </p>
                {quest.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="flex items-start gap-3 bg-muted/30 rounded-lg px-4 py-2.5 text-sm"
                  >
                    <span className="font-display text-accent text-xs mt-0.5">{i + 1}</span>
                    <span>{step}</span>
                  </motion.div>
                ))}
              </div>

              {/* Reward */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="rounded-xl p-4"
                style={{
                  background: "linear-gradient(135deg, hsl(265 85% 60% / 0.1), hsl(45 90% 55% / 0.1))",
                  border: "1px solid hsl(45 90% 55% / 0.2)",
                }}
              >
                <p className="text-sm font-semibold text-gold mb-1">🏆 Reward Preview</p>
                <p className="text-sm text-foreground/80">{quest.reward}</p>
                <p className="text-xs text-muted-foreground mt-1">Badge: {quest.badge}</p>
              </motion.div>

              {/* Buttons */}
              {state === "reveal" && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAccept}
                    className="flex-1 success-btn text-success-foreground font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    <Check className="w-5 h-5" /> Accept Quest
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleShare}
                    className="flex-1 neon-btn text-primary-foreground font-bold py-3 rounded-xl flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" /> Share Public Echo
                  </motion.button>
                </div>
              )}

              {state === "accepted" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="rounded-xl p-4 text-center"
                    style={{
                      background: "linear-gradient(135deg, hsl(145 70% 45% / 0.15), hsl(145 70% 35% / 0.1))",
                      border: "1px solid hsl(145 70% 45% / 0.3)",
                    }}
                  >
                    <p className="font-display text-success text-lg">Quest Accepted! 🎉</p>
                    <p className="text-sm text-muted-foreground mt-1">Your shadow quest is now active. Good luck, agent.</p>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleShare}
                      className="flex-1 neon-btn text-primary-foreground font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-4 h-4" /> Share Echo
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleReset}
                      className="flex-1 bg-muted text-foreground font-semibold py-3 rounded-xl transition-all hover:bg-muted/80"
                    >
                      New Quest
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 px-4 border-t border-border/30">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            PoC for Endless Monthly Contribution Program | Privacy via E2EE + DID | #EndlessDev
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
          >
            <Github className="w-4 h-4" /> View on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
