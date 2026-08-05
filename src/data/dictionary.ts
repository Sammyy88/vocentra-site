export const CATEGORIES = [
  'Random',
  'Technology',
  'Society & Current Issues',
  'Opinion & Abstract Topics',
  'Personal Development',
  'Everyday Life',
] as const;

export type Category = typeof CATEGORIES[number];

export interface WordEntry {
  word: string;
  definition: string;
  category: Category;
  pronunciation: string;
}

export const DICTIONARY: WordEntry[] = [
  { word: "My daily routine", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Everyday Life", pronunciation: "Level 1" },
  { word: "My morning habits", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Everyday Life", pronunciation: "Level 1" },
  { word: "My favorite meal", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Everyday Life", pronunciation: "Level 1" },
  { word: "My hometown", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Everyday Life", pronunciation: "Level 1" },
  { word: "My family", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Everyday Life", pronunciation: "Level 1" },
  { word: "My best friend", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Everyday Life", pronunciation: "Level 1" },
  { word: "My dream house", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Everyday Life", pronunciation: "Level 1" },
  { word: "My workspace", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Everyday Life", pronunciation: "Level 1" },
  { word: "My favorite season", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Everyday Life", pronunciation: "Level 1" },
  { word: "My hobbies", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Everyday Life", pronunciation: "Level 1" },
  { word: "A memorable birthday", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Everyday Life", pronunciation: "Level 1" },
  { word: "My favorite movie", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Everyday Life", pronunciation: "Level 1" },
  { word: "My favorite book", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Everyday Life", pronunciation: "Level 1" },
  { word: "My favorite app", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Everyday Life", pronunciation: "Level 1" },
  { word: "My smartphone", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Everyday Life", pronunciation: "Level 1" },
  { word: "Weekend activities", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Everyday Life", pronunciation: "Level 1" },
  { word: "My school/college life", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Everyday Life", pronunciation: "Level 1" },
  { word: "My first job", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Everyday Life", pronunciation: "Level 1" },
  { word: "A typical Sunday", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Everyday Life", pronunciation: "Level 1" },
  { word: "My favorite place to relax", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Everyday Life", pronunciation: "Level 1" },
  { word: "Time management", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Personal Development", pronunciation: "Level 2" },
  { word: "Discipline vs motivation", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Personal Development", pronunciation: "Level 2" },
  { word: "Success", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Personal Development", pronunciation: "Level 2" },
  { word: "Failure", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Personal Development", pronunciation: "Level 2" },
  { word: "Confidence", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Personal Development", pronunciation: "Level 2" },
  { word: "Building habits", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Personal Development", pronunciation: "Level 2" },
  { word: "Learning new skills", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Personal Development", pronunciation: "Level 2" },
  { word: "Setting goals", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Personal Development", pronunciation: "Level 2" },
  { word: "Productivity", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Personal Development", pronunciation: "Level 2" },
  { word: "Managing stress", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Personal Development", pronunciation: "Level 2" },
  { word: "Importance of sleep", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Personal Development", pronunciation: "Level 2" },
  { word: "Healthy lifestyle", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Personal Development", pronunciation: "Level 2" },
  { word: "Exercise and fitness", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Personal Development", pronunciation: "Level 2" },
  { word: "Reading books", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Personal Development", pronunciation: "Level 2" },
  { word: "Lifelong learning", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Personal Development", pronunciation: "Level 2" },
  { word: "Creativity", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Personal Development", pronunciation: "Level 2" },
  { word: "Leadership", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Personal Development", pronunciation: "Level 2" },
  { word: "Teamwork", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Personal Development", pronunciation: "Level 2" },
  { word: "Communication skills", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Personal Development", pronunciation: "Level 2" },
  { word: "Public speaking", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Personal Development", pronunciation: "Level 2" },
  { word: "Artificial Intelligence", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Technology", pronunciation: "Level 3" },
  { word: "Social media", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Technology", pronunciation: "Level 3" },
  { word: "Smartphones", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Technology", pronunciation: "Level 3" },
  { word: "Cybersecurity", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Technology", pronunciation: "Level 3" },
  { word: "Cloud computing", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Technology", pronunciation: "Level 3" },
  { word: "Virtual reality", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Technology", pronunciation: "Level 3" },
  { word: "Future of technology", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Technology", pronunciation: "Level 3" },
  { word: "Online education", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Technology", pronunciation: "Level 3" },
  { word: "Remote work", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Technology", pronunciation: "Level 3" },
  { word: "Programming", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Technology", pronunciation: "Level 3" },
  { word: "UI/UX Design", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Technology", pronunciation: "Level 3" },
  { word: "Graphic design", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Technology", pronunciation: "Level 3" },
  { word: "Video editing", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Technology", pronunciation: "Level 3" },
  { word: "YouTube as a career", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Technology", pronunciation: "Level 3" },
  { word: "Content creation", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Technology", pronunciation: "Level 3" },
  { word: "Automation", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Technology", pronunciation: "Level 3" },
  { word: "Robotics", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Technology", pronunciation: "Level 3" },
  { word: "Blockchain", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Technology", pronunciation: "Level 3" },
  { word: "Data privacy", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Technology", pronunciation: "Level 3" },
  { word: "Technology addiction", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Technology", pronunciation: "Level 3" },
  { word: "Climate change", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Society & Current Issues", pronunciation: "Level 4" },
  { word: "Pollution", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Society & Current Issues", pronunciation: "Level 4" },
  { word: "Recycling", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Society & Current Issues", pronunciation: "Level 4" },
  { word: "Education system", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Society & Current Issues", pronunciation: "Level 4" },
  { word: "Healthcare", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Society & Current Issues", pronunciation: "Level 4" },
  { word: "Mental health awareness", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Society & Current Issues", pronunciation: "Level 4" },
  { word: "Gender equality", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Society & Current Issues", pronunciation: "Level 4" },
  { word: "Poverty", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Society & Current Issues", pronunciation: "Level 4" },
  { word: "Unemployment", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Society & Current Issues", pronunciation: "Level 4" },
  { word: "Inflation", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Society & Current Issues", pronunciation: "Level 4" },
  { word: "Globalization", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Society & Current Issues", pronunciation: "Level 4" },
  { word: "Tourism", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Society & Current Issues", pronunciation: "Level 4" },
  { word: "Public transport", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Society & Current Issues", pronunciation: "Level 4" },
  { word: "Work-life balance", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Society & Current Issues", pronunciation: "Level 4" },
  { word: "Volunteering", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Society & Current Issues", pronunciation: "Level 4" },
  { word: "Cultural diversity", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Society & Current Issues", pronunciation: "Level 4" },
  { word: "Festivals", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Society & Current Issues", pronunciation: "Level 4" },
  { word: "Rural vs urban life", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Society & Current Issues", pronunciation: "Level 4" },
  { word: "The importance of voting", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Society & Current Issues", pronunciation: "Level 4" },
  { word: "Digital payments", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Society & Current Issues", pronunciation: "Level 4" },
  { word: "What is happiness?", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Opinion & Abstract Topics", pronunciation: "Level 5" },
  { word: "Is money everything?", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Opinion & Abstract Topics", pronunciation: "Level 5" },
  { word: "Success vs satisfaction", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Opinion & Abstract Topics", pronunciation: "Level 5" },
  { word: "Freedom", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Opinion & Abstract Topics", pronunciation: "Level 5" },
  { word: "Honesty", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Opinion & Abstract Topics", pronunciation: "Level 5" },
  { word: "Kindness", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Opinion & Abstract Topics", pronunciation: "Level 5" },
  { word: "The meaning of life", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Opinion & Abstract Topics", pronunciation: "Level 5" },
  { word: "Should everyone learn English?", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Opinion & Abstract Topics", pronunciation: "Level 5" },
  { word: "Should AI replace teachers?", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Opinion & Abstract Topics", pronunciation: "Level 5" },
  { word: "Can technology make us lonely?", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Opinion & Abstract Topics", pronunciation: "Level 5" },
  { word: "Is failure necessary for success?", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Opinion & Abstract Topics", pronunciation: "Level 5" },
  { word: "Books vs videos", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Opinion & Abstract Topics", pronunciation: "Level 5" },
  { word: "Quality vs quantity", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Opinion & Abstract Topics", pronunciation: "Level 5" },
  { word: "The power of consistency", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Opinion & Abstract Topics", pronunciation: "Level 5" },
  { word: "Why people procrastinate", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Opinion & Abstract Topics", pronunciation: "Level 5" },
  { word: "Dreams and ambitions", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Opinion & Abstract Topics", pronunciation: "Level 5" },
  { word: "What makes a good leader?", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Opinion & Abstract Topics", pronunciation: "Level 5" },
  { word: "If I could change one thing in the world", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Opinion & Abstract Topics", pronunciation: "Level 5" },
  { word: "My future in 10 years", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Opinion & Abstract Topics", pronunciation: "Level 5" },
  { word: "Advice I would give to my younger self", definition: "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).", category: "Opinion & Abstract Topics", pronunciation: "Level 5" },
];

export const PROMPTS = [
  "Define the topic, explain with 3 main points/reasons, and share your final takeaway.",
  "What is the first thing that comes to mind when you hear this?",
  "Share a personal story related to this topic.",
  "Why do you think this topic is important today?"
];

export const getRandomWord = (category: Category = 'Random'): WordEntry => {
  let filtered = DICTIONARY;
  if (category !== 'Random') {
    filtered = DICTIONARY.filter(w => w.category === category);
  }
  if (filtered.length === 0) filtered = DICTIONARY;
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
};

export const getRandomPrompt = (): string => {
  const randomIndex = Math.floor(Math.random() * PROMPTS.length);
  return PROMPTS[randomIndex];
};

