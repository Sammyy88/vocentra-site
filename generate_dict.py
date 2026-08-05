import json

raw_data = """
🟢 Level 1: Everyday Life (1–20)
My daily routine
My morning habits
My favorite meal
My hometown
My family
My best friend
My dream house
My workspace
My favorite season
My hobbies
A memorable birthday
My favorite movie
My favorite book
My favorite app
My smartphone
Weekend activities
My school/college life
My first job
A typical Sunday
My favorite place to relax
🟡 Level 2: Personal Development (21–40)
Time management
Discipline vs motivation
Success
Failure
Confidence
Building habits
Learning new skills
Setting goals
Productivity
Managing stress
Importance of sleep
Healthy lifestyle
Exercise and fitness
Reading books
Lifelong learning
Creativity
Leadership
Teamwork
Communication skills
Public speaking
🔵 Level 3: Technology (41–60)
Artificial Intelligence
Social media
Smartphones
Cybersecurity
Cloud computing
Virtual reality
Future of technology
Online education
Remote work
Programming
UI/UX Design
Graphic design
Video editing
YouTube as a career
Content creation
Automation
Robotics
Blockchain
Data privacy
Technology addiction
🟣 Level 4: Society & Current Issues (61–80)
Climate change
Pollution
Recycling
Education system
Healthcare
Mental health awareness
Gender equality
Poverty
Unemployment
Inflation
Globalization
Tourism
Public transport
Work-life balance
Volunteering
Cultural diversity
Festivals
Rural vs urban life
The importance of voting
Digital payments
🔴 Level 5: Opinion & Abstract Topics (81–100)
What is happiness?
Is money everything?
Success vs satisfaction
Freedom
Honesty
Kindness
The meaning of life
Should everyone learn English?
Should AI replace teachers?
Can technology make us lonely?
Is failure necessary for success?
Books vs videos
Quality vs quantity
The power of consistency
Why people procrastinate
Dreams and ambitions
What makes a good leader?
If I could change one thing in the world
My future in 10 years
Advice I would give to my younger self
"""

lines = raw_data.strip().split('\n')
current_category = ""
current_level = ""
entries = []

for line in lines:
    line = line.strip()
    if not line: continue
    
    if "Level" in line:
        # e.g. "🟢 Level 1: Everyday Life (1–20)"
        parts = line.split(':')
        current_level = parts[0].strip().split(' ', 1)[1] # "Level 1"
        current_category = parts[1].split('(')[0].strip() # "Everyday Life"
    else:
        entries.append({
            "word": line,
            "definition": "Structure your answer: Intro (20-30s), 3 Main Points (60-90s), Conclusion (20s).",
            "category": current_category,
            "pronunciation": current_level
        })

print("export const CATEGORIES = [")
print("  'Random',")
categories = list(set([e['category'] for e in entries]))
for c in categories:
    print(f"  '{c}',")
print("] as const;\n")

print("export type Category = typeof CATEGORIES[number];\n")

print("export interface WordEntry {")
print("  word: string;")
print("  definition: string;")
print("  category: Category;")
print("  pronunciation: string;")
print("}\n")

print("export const DICTIONARY: WordEntry[] = [")
for e in entries:
    print(f"  {{ word: {json.dumps(e['word'])}, definition: {json.dumps(e['definition'])}, category: {json.dumps(e['category'])}, pronunciation: {json.dumps(e['pronunciation'])} }},")
print("];\n")

print("""export const PROMPTS = [
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
""")
