export const CONFIG = {
  displayName: "Kanyin",
  fullName: "Adetona Kanyinsola Folarera",
  // 🔐 Change this to something only she would know
  secretCode: "143",
  codeHint: "",
  // Optional: set a URL or path like "/audio/song.mp3" to enable music
  musicUrl: "https://res.cloudinary.com/dhmqhless/video/upload/f_mp3,q_auto/v1780527339/CHRISTINA_PERRI_-_A_THOUSAND_YEARS_INSTRUMENTAL_i7qngn.mp3",
};

export interface StorySection {
  id: string;
  kicker: string;
  emoji: string;
  title: string;
  paras: string[];
  quote?: string;
  parasAfter?: string[];
  quote2?: string;
  photos?: { caption: string; src?: string }[];
  photoNote?: string;
  wishlist?: string[];
  blessing?: string[];
  closing?: string;
}

export const STORY: StorySection[] = [
  {
    id: "welcome",
    kicker: "welcome",
    emoji: "💖",
    title: "",
    paras: [
      "This little corner of the internet was made just for you.",
      "A place filled with memories, laughter, growth, and all the things I never want you to forget.",
      "So take your time scrolling through… every word here comes from a heart that is incredibly grateful for you.",
    ],
    photoNote: "Look at you…",
    photos: [
      { caption: "Little star ⭐", src: "https://res.cloudinary.com/dhmqhless/image/upload/v1780325529/kanyin-3_icftxf.jpg" },
      { caption: "Twin Energy 🐒", src: "https://res.cloudinary.com/dhmqhless/image/upload/v1780325529/kanyin-1_rydd4j.jpg" },
      { caption: "Purrfect Match 😭", src: "https://res.cloudinary.com/dhmqhless/image/upload/v1780325529/kanyin-4_r41lv8.jpg" },
      { caption: "my favourite person", src: "https://res.cloudinary.com/dhmqhless/image/upload/v1780325536/kanyin-7_c8sapn.jpg" },
    ],
  },
  {
    id: "story",
    kicker: "our story",
    emoji: "🌸",
    title: "How it started",
    paras: [
      "It started simple — a few texts, school gist, sharing life updates.",
      "But somewhere between all the voice notes, the stickers we kept sending each other, the calls that lasted longer than they were supposed to, and the random check-ins… you became someone I genuinely cannot imagine doing life without.",
      "Sometimes I wonder how different my life would have been if our paths never crossed.",
    ],
    parasAfter: [
      "Out of all the people I could have met, somehow I got you. Through different phases of life, changing dreams, new experiences, and unexpected challenges, our friendship has remained one of the most constant things in my life.",
      "And that's something I will never take for granted.",
    ],
    photos: [
      { caption: "Signing out ✍🏾", src: "https://res.cloudinary.com/dhmqhless/image/upload/f_auto,q_auto/v1780325617/kanyin-13.jpeg.HEIC.jpeg_cneo1r.heic" },
      { caption: "Fully certified 🎓", src: "https://res.cloudinary.com/dhmqhless/image/upload/f_auto,q_auto/v1780325530/kanyin-12.jpeg.HEIC_fhkelc.jpg" },
    ],
    photoNote: "Some things are just meant to be…",
  },
  {
    id: "good",
    kicker: "the good",
    emoji: "☀️",
    title: "My favourite memories have your name on them",
    paras: [
      "The random conversations that started with “Are you awake?” and somehow turned into a two-hour call about everything and nothing.",
      "The laughter that made our stomachs hurt — the kind where you forget what you were even laughing about.",
      "You've been there for my wins. You've celebrated me loudly. You've believed in me even when I wasn't sure of myself.",
      "And every single time life gave us a reason to smile, we found a way to enjoy it together.",
    ],
    photos: [
      { caption: "This was the day I realized you're special", src: "https://res.cloudinary.com/dhmqhless/image/upload/f_auto,q_auto/v1780326113/kanyin-15_igtdmc.heic" },
      { caption: "Still one of my favourite memories", src: "https://res.cloudinary.com/dhmqhless/image/upload/f_auto,q_auto/v1780325534/kanyin-10.jpeg_xp0jda.heic" },
    ],
    photoNote: "These pictures say more than I can…",
  },
  {
    id: "bad",
    kicker: "the bad & the ugly",
    emoji: "🌧️",
    title: "Not every chapter was easy",
    paras: [
      "Life hasn't always been kind to either of us.",
      "There were moments in our friendship that weren't easy — moments when we disappointed each other, misunderstood each other, or simply couldn't show up the way we needed to. We are human, after all.",
      "One of those moments taught me something important about us: we don't pretend we're perfect. We make mistakes, we learn, we grow… and somehow, we always find our way back to each other.",
      "I've joked so many times that you're lucky I love you this much… but if I'm being honest, it's because my love for you has never been based on perfection.",
      "I've seen your best days and your difficult days. The version of you that's confident and the one that doubts herself. The parts of you that are easy to love and the parts that are still growing.",
      "And through it all… I've loved you the same. Not because you're perfect — but because you're you.",
    ],
    photos: [
      { caption: "still her, through it all 🤍", src: "https://res.cloudinary.com/dhmqhless/image/upload/v1780325534/kanyin-8_qi1bpv.jpg" },
    ],
  },
  {
    id: "wishes",
    kicker: "everything I want for you this year",
    emoji: "🎂",
    title: "I just want you to be okay. Truly okay.",
    paras: [
      "I want you to be happy — not the kind you show people or force when you're around others, but the quiet kind. The kind that sits comfortably in your chest and shows up on a random Tuesday when nothing special is happening.",
      "I want your health to be strong. After everything you've pushed through, I just want your body to cooperate with you this year. No constant worries, just strength and ease.",
      "I want you to feel loved in a real way. Not just spoken. Not just assumed. But felt — in the little things, in the way people show up for you.",
      "And honestly… I want more of us. More long calls that don't feel rushed. More random messages. More shared moments that don't need to be planned.",
    ],
    wishlist: [
      "Peace where things have been heavy.",
      "Joy where things have felt empty.",
      "Clarity where everything has been confusing.",
      "Blessings that don't just meet your expectations… but exceed them.",
    ],
    blessing: [
      "May every one of your dreams come true",
      "May your heart stay soft, even when life tries to harden it.",
      "May your smile stay real.",
    ],
    closing: "And may you never forget how deeply you are loved. 💖",
  },
];

export const QUIZ = {
  question: "Quick one… who's the best person ever?",
  options: ["You 😌", "Also you 😂"],
};
