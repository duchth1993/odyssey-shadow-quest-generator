export interface QuestInput {
  level: number;
  interests: string[];
  goal: string;
}

export interface Quest {
  id: number;
  title: string;
  description: string;
  steps: string[];
  reward: string;
  rewardPoints: number;
  badge: string;
  publicEcho: string;
}

const questTemplates = [
  {
    interests: ["Invite Friends"],
    lowLevel: {
      title: "Silent Inviter",
      description: "Quietly recruit allies to your cause. The shadows reward those who bring strength in numbers.",
      steps: ["Invite 3 friends using your personal referral link", "Have at least 1 friend reach Level 5", "Post a cryptic message on X hinting at your quest"],
      reward: "Unlock Hidden Nessy Badge + 500 Odyssey Points",
      badge: "🐋 Shadow Recruiter",
      echo: "I just completed a secret shadow quest... the shadows are watching. Who's joining Odyssey?",
    },
    highLevel: {
      title: "The Phantom Network",
      description: "Master recruiters operate in silence. Build a network so vast even Nessy is impressed.",
      steps: ["Invite 10 friends to Odyssey", "Form a squad of 5 active users", "Achieve 'Network Legend' status"],
      reward: "Legendary Nessy Crown + 2000 Odyssey Points",
      badge: "👑 Phantom Networker",
      echo: "A phantom quest completed in the shadows... my network grows stronger. #OdysseyQuest",
    },
  },
  {
    interests: ["Earn Points"],
    lowLevel: {
      title: "Point Harvester",
      description: "Every point counts in the shadows. Collect them like stardust across the Odyssey realm.",
      steps: ["Complete 5 daily tasks", "Earn 200 points in a single session", "Maintain a 3-day streak"],
      reward: "Rare Nessy Starlight Skin + 750 Odyssey Points",
      badge: "⭐ Stardust Collector",
      echo: "Harvesting points in the dark... my quest continues. Join the Odyssey!",
    },
    highLevel: {
      title: "The Grand Accumulator",
      description: "Legends speak of those who amassed fortunes in the Odyssey shadows. Become that legend.",
      steps: ["Earn 5000 points total", "Complete the weekly challenge", "Reach top 10% of point earners"],
      reward: "Mythic Nessy Golden Aura + 3000 Odyssey Points",
      badge: "💰 Grand Accumulator",
      echo: "The grand accumulation is complete. My shadow quest rewards are legendary. #Endless",
    },
  },
  {
    interests: ["Explore Luffa"],
    lowLevel: {
      title: "Luffa Scout",
      description: "The Luffa ecosystem hides secrets for those brave enough to explore its depths.",
      steps: ["Visit 3 Luffa features", "Complete your first Luffa interaction", "Share a Luffa discovery"],
      reward: "Explorer Nessy Badge + 400 Odyssey Points",
      badge: "🔍 Luffa Scout",
      echo: "Exploring hidden corners of the Luffa universe... secrets everywhere! #OdysseyQuest",
    },
    highLevel: {
      title: "Luffa Archaeologist",
      description: "Deep within Luffa lie ancient artifacts of power. Only master explorers can unearth them.",
      steps: ["Discover 10 Luffa features", "Complete the Luffa mastery challenge", "Mentor a new Luffa explorer"],
      reward: "Ancient Nessy Artifact + 2500 Odyssey Points",
      badge: "🏛️ Luffa Archaeologist",
      echo: "I've unearthed something ancient in Luffa... the shadows reveal their treasures. #Endless",
    },
  },
  {
    interests: ["Build Mini-App"],
    lowLevel: {
      title: "Code Whisperer",
      description: "The shadows favor builders. Create something small but powerful within the ecosystem.",
      steps: ["Sketch a mini-app concept", "Build a simple prototype", "Submit it for community feedback"],
      reward: "Builder Nessy Badge + 600 Odyssey Points",
      badge: "🛠️ Code Whisperer",
      echo: "Building in the shadows... my first mini-app is taking shape. #EndlessDev",
    },
    highLevel: {
      title: "The Architect's Shadow",
      description: "Great architects build empires from the shadows. Your mini-app could change everything.",
      steps: ["Design a full mini-app spec", "Implement core functionality", "Launch to 50+ users", "Gather feedback and iterate"],
      reward: "Architect Nessy Hologram + 4000 Odyssey Points",
      badge: "🏗️ Shadow Architect",
      echo: "An architect works in silence... my shadow creation is now live. #EndlessDev #Odyssey",
    },
  },
];

const fallbackQuest = {
  lowLevel: {
    title: "The Awakening",
    description: "Every legend begins with a single step into the unknown. Your shadow quest awaits.",
    steps: ["Complete your profile setup", "Explore 3 Odyssey features", "Connect with 1 community member"],
    reward: "Starter Nessy Glow Badge + 300 Odyssey Points",
    badge: "✨ Awakened One",
    echo: "My shadow quest has begun... the journey into the unknown starts now. #Odyssey",
  },
  highLevel: {
    title: "The Ascendant",
    description: "You've risen through the ranks. Now the shadows call you to transcend all limits.",
    steps: ["Achieve a 7-day activity streak", "Help 5 newcomers", "Complete all weekly objectives", "Unlock a hidden achievement"],
    reward: "Transcendent Nessy Wings + 3500 Odyssey Points",
    badge: "🦋 The Ascendant",
    echo: "Transcendence achieved in the shadows... my quest is complete. Who dares follow? #Endless",
  },
};

export function generateQuest(input: QuestInput): Quest {
  const isHighLevel = input.level >= 25;

  // Find matching template
  let template = questTemplates.find((t) =>
    input.interests.some((i) => t.interests.includes(i))
  );

  const questData = template
    ? isHighLevel ? template.highLevel : template.lowLevel
    : isHighLevel ? fallbackQuest.highLevel : fallbackQuest.lowLevel;

  const questId = Math.floor(Math.random() * 900) + 100;
  const points = isHighLevel
    ? Math.floor(Math.random() * 2000) + 1500
    : Math.floor(Math.random() * 500) + 300;

  return {
    id: questId,
    title: questData.title,
    description: questData.description,
    steps: questData.steps,
    reward: questData.reward,
    rewardPoints: points,
    badge: questData.badge,
    publicEcho: questData.echo,
  };
}
