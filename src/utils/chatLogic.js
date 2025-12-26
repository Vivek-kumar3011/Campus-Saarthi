import { CONTACT_DATA } from '../data/contactData';

const isSimilar = (query, target) => {
  const q = query.toLowerCase().trim();
  const t = target.toLowerCase().trim();
  
  // Only match partial words if they are 3+ characters (prevents "hi" matching "IIIT")
  if (q.length >= 3 && t.includes(q)) return true;
  
  return false;
};

export const getBotResponse = (userInput) => {
  const cleanInput = userInput.toLowerCase().trim();
  const words = cleanInput.split(/\s+/); // Split by any whitespace

  // --- STEP 1: KEYWORD PRIORITY (Mess, Schedule, Safety) ---
  if (words.some(w => isSimilar(w, "mess") || isSimilar(w, "menu") || isSimilar(w, "food"))) {
    return "🍴 You can check the **Mess Menu** section for today's breakfast, lunch, and dinner!";
  }
  
  if (words.some(w => isSimilar(w, "ragging") || isSimilar(w, "anti") || isSimilar(w, "help"))) {
    return "🚨 **Anti-Ragging Helpline:** +91-1800-180-5522. You can also find campus squad contacts in the **Contacts** section.";
  }

  if (words.some(w => isSimilar(w, "class") || isSimilar(w, "schedule") || isSimilar(w, "time"))) {
    return "📅 Go to the **Class Schedule** section to see your lectures and room numbers.";
  }

  // --- STEP 2: CONTACT SEARCH (Only if no keyword matched) ---
  const allContacts = [
    ...CONTACT_DATA.office, 
    ...CONTACT_DATA.faculty, 
    ...CONTACT_DATA.gymkhana
  ];

  for (let contact of allContacts) {
    // Check if any word in user input matches name or role
    const match = words.some(w => 
      (w.length >= 3 && contact.name.toLowerCase().includes(w)) || 
      (w.length >= 3 && contact.role.toLowerCase().includes(w))
    );

    if (match) {
      return `I think you're asking about **${contact.name}** (${contact.role}). Contact: **${contact.email}**`;
    }
  }

  // --- STEP 3: DEFAULT RESPONSE ---
  if (cleanInput === "hi" || cleanInput === "hello") {
    return "Hello! How can I help you with campus information today?";
  }

  return "I'm not quite sure about that. Try asking about 'mess', 'ragging', or a specific teacher's name.";
};