export interface Question {
  id: number;
  text: string;
  answers: {
    A: string;
    B: string;
    C?: string;
  };
}

export const glimmerQuestions: Question[] = [
  // --- Core Values ---
  {
    id: 1,
    text: "In a partner, I'm most drawn to:",
    answers: {
      A: "Their ambition and career drive.",
      B: "Their kindness and empathy.",
      C: "Their sense of humor and wit.",
    },
  },
  {
    id: 2,
    text: "My relationship with my family is best described as:",
    answers: {
      A: "Very close-knit; we're involved in each other's daily lives.",
      B: "Independent, but we're always there for each other.",
      C: "It's complicated.",
    },
  },
  {
    id: 3,
    text: "When it comes to money, I'm more of a:",
    answers: {
      A: "Saver. I'm focused on the future.",
      B: "Spender. I believe in enjoying the present.",
      C: "A balance of both.",
    },
  },
  {
    id: 4,
    text: "A key ingredient in a successful relationship is:",
    answers: {
      A: "Constant communication.",
      B: "Mutual trust and personal space.",
      C: "Shared goals.",
    },
  },
  {
    id: 5,
    text: "Regarding spirituality/religion, I consider myself:",
    answers: {
      A: "Deeply spiritual or religious.",
      B: "Private about my beliefs.",
      C: "More secular or agnostic.",
    },
  },
  {
    id: 6,
    text: "My political views are:",
    answers: {
      A: "Something I'm passionate about.",
      B: "Something I prefer not to discuss.",
      C: "Generally flexible.",
    },
  },
  {
    id: 7,
    text: "The statement that best describes me is:",
    answers: { A: "'I live to work.'", B: "'I work to live.'" },
  },
  // --- Core Personality ---
  {
    id: 8,
    text: "After a long week, my ideal way to recharge is:",
    answers: {
      A: "A lively night out with friends.",
      B: "A quiet evening at home.",
      C: "A relaxed dinner with a few close friends.",
    },
  },
  {
    id: 9,
    text: "When planning a weekend trip to Pondicherry, I'm the one who:",
    answers: {
      A: "Creates a detailed itinerary.",
      B: "Books a place and figures out the rest there.",
    },
  },
  {
    id: 10,
    text: "At a social gathering, I tend to:",
    answers: {
      A: "Introduce myself and start conversations.",
      B: "Stick with the people I know.",
      C: "Find a quiet corner and observe.",
    },
  },
  {
    id: 11,
    text: "If a friend and I disagree, my first instinct is to:",
    answers: {
      A: "Address it directly and talk it through.",
      B: "Give it some space and time to cool off.",
    },
  },
  {
    id: 12,
    text: "When I'm feeling stressed, I prefer to:",
    answers: { A: "Talk it out with someone.", B: "Have quiet time alone." },
  },
  {
    id: 13,
    text: "My energy is highest:",
    answers: {
      A: "In the morning (an early bird).",
      B: "In the evening (a night owl).",
    },
  },
  {
    id: 14,
    text: "When trying a new restaurant, I tend to:",
    answers: {
      A: "Order the most interesting thing on the menu.",
      B: "Stick to my favorite classic dish.",
    },
  },
  // --- Practical Dynamics ---
  {
    id: 15,
    text: "My primary role in the world of food is:",
    answers: {
      A: "The Foodie (I love exploring).",
      B: "The Cook (I love experimenting).",
      C: "The Appreciator (I love a good meal).",
    },
  },
  {
    id: 16,
    text: "My living space is typically:",
    answers: { A: "Neat and organized.", B: "Comfortably lived-in." },
  },
  {
    id: 17,
    text: "When meeting friends, I'm usually:",
    answers: {
      A: "Always 10 minutes early.",
      B: "Right on time.",
      C: "Fashionably late (IST!).",
    },
  },
  {
    id: 18,
    text: "My texting style is generally:",
    answers: { A: "Fast and frequent replies.", B: "Thoughtful but slower." },
  },
  {
    id: 19,
    text: "A pet in the house is:",
    answers: {
      A: "A wonderful source of joy!",
      B: "A lot of responsibility.",
      C: "I'm neutral about them.",
    },
  },
  {
    id: 20,
    text: "My fitness routine is:",
    answers: {
      A: "A consistent part of my week.",
      B: "Spontaneous, when I feel like it.",
      C: "Mostly non-existent.",
    },
  },
  {
    id: 21,
    text: "When it comes to household chores:",
    answers: {
      A: "I like to get them done immediately.",
      B: "I'll get to them eventually.",
    },
  },
  // --- Interests & Leisure ---
  {
    id: 22,
    text: "My go-to choice for a movie night is:",
    answers: {
      A: "A big-budget blockbuster.",
      B: "A thoughtful indie film.",
      C: "A comfort-watch TV series.",
    },
  },
  {
    id: 23,
    text: "The music I listen to most is:",
    answers: {
      A: "The latest chart-toppers.",
      B: "Classic hits.",
      C: "Niche or independent artists.",
    },
  },
  {
    id: 24,
    text: "My ideal vacation is:",
    answers: {
      A: "A relaxing beach holiday.",
      B: "An adventurous trek in the mountains.",
      C: "Exploring a new city and its culture.",
    },
  },
  {
    id: 25,
    text: "When it comes to reading, I prefer:",
    answers: {
      A: "Thrilling fiction novels.",
      B: "Insightful non-fiction.",
      C: "I'm not a big reader.",
    },
  },
  {
    id: 26,
    text: "My favorite way to enjoy a Sunday in Chennai is:",
    answers: {
      A: "A long drive on the ECR.",
      B: "Shopping in T. Nagar.",
      C: "A quiet walk on Besant Nagar beach.",
    },
  },
  {
    id: 27,
    text: "My relationship with social media is:",
    answers: {
      A: "I'm an active user.",
      B: "I'm more of a lurker.",
      C: "I barely use it.",
    },
  },
  {
    id: 28,
    text: "When it comes to sports, I am:",
    answers: {
      A: "A passionate fan (especially CSK!).",
      B: "A casual watcher.",
      C: "Someone who prefers playing.",
    },
  },
  {
    id: 29,
    text: "My sense of humor is best described as:",
    answers: {
      A: "Sarcastic and witty.",
      B: "Silly and pun-filled.",
      C: "Observational.",
    },
  },
  {
    id: 30,
    text: "The most important thing for me on a first date is:",
    answers: {
      A: "Deep, meaningful conversation.",
      B: "Lighthearted fun and laughter.",
      C: "Seeing if there's a physical chemistry.",
    },
  },
];
