export type Question = {
  id: string;
  text: string;
  category: 'fun' | 'romantic' | 'deep' | 'practical';
};

export const questions: Question[] = [
  // Fun Questions (Pastel Yellow)
  { id: 'f1', text: "Pineapple belongs on pizza", category: "fun" },
  { id: 'f2', text: "Camping is better than staying in a hotel", category: "fun" },
  { id: 'f3', text: "Board games are more fun than video games", category: "fun" },
  { id: 'f4', text: "Dancing in the rain is romantic", category: "fun" },
  { id: 'f5', text: "Karaoke nights should be a monthly tradition", category: "fun" },
  { id: 'f6', text: "Morning people are better than night owls", category: "fun" },
  { id: 'f7', text: "Beach vacations are better than city trips", category: "fun" },
  { id: 'f8', text: "Ice cream is a valid breakfast food", category: "fun" },
  { id: 'f9', text: "Reality TV shows are genuinely entertaining", category: "fun" },
  { id: 'f10', text: "Dogs are better pets than cats", category: "fun" },

  // Romantic Questions (Pastel Pink)
  { id: 'r1', text: "Love at first sight exists", category: "romantic" },
  { id: 'r2', text: "Surprise dates are the best dates", category: "romantic" },
  { id: 'r3', text: "Long-distance relationships can work", category: "romantic" },
  { id: 'r4', text: "Public displays of affection are sweet", category: "romantic" },
  { id: 'r5', text: "Romantic movies reflect real relationships", category: "romantic" },
  { id: 'r6', text: "Valentine's Day is important", category: "romantic" },
  { id: 'r7', text: "Date nights should be weekly", category: "romantic" },
  { id: 'r8', text: "Love letters are better than text messages", category: "romantic" },
  { id: 'r9', text: "Small gestures matter more than grand ones", category: "romantic" },
  { id: 'r10', text: "Couples should have nicknames for each other", category: "romantic" },

  // Deep Questions (Pastel Blue)
  { id: 'd1', text: "Social media affects relationships negatively", category: "deep" },
  { id: 'd2', text: "Past relationships shape current ones", category: "deep" },
  { id: 'd3', text: "Marriage is necessary for commitment", category: "deep" },
  { id: 'd4', text: "Having children changes relationships", category: "deep" },
  { id: 'd5', text: "Religion matters in relationships", category: "deep" },
  { id: 'd6', text: "Politics affect relationships", category: "deep" },
  { id: 'd7', text: "Trust needs to be earned", category: "deep" },
  { id: 'd8', text: "People can change for love", category: "deep" },
  { id: 'd9', text: "Compromise is key to relationships", category: "deep" },
  { id: 'd10', text: "Communication solves most problems", category: "deep" },

  // Practical Questions (Pastel Purple)
  { id: 'p1', text: "Joint bank accounts are necessary", category: "practical" },
  { id: 'p2', text: "Living together before marriage is important", category: "practical" },
  { id: 'p3', text: "Splitting bills 50/50 is fair", category: "practical" },
  { id: 'p4', text: "Shared passwords show trust", category: "practical" },
  { id: 'p5', text: "Regular budget discussions are necessary", category: "practical" },
  { id: 'p6', text: "Housework should be shared equally", category: "practical" },
  { id: 'p7', text: "Career should come before relationship", category: "practical" },
  { id: 'p8', text: "Saving for the future is essential", category: "practical" },
  { id: 'p9', text: "Prenuptial agreements are important", category: "practical" },
  { id: 'p10', text: "Both partners should work", category: "practical" },
];