export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isBestSeller: boolean;
  stock: number;
  rating: number;
  reviews: number;
}

export const categories = [
  "Protein",
  "Pre-Workout",
  "Vitamins",
  "Creatine",
  "Fat Burners",
  "Recovery"
];

export const products: Product[] = [
  {
    id: "1",
    name: "Whey Protein Isolate",
    description: "Premium whey protein isolate with 25g protein per serving. Perfect for muscle building and recovery.",
    price: 49.99,
    category: "Protein",
    image: "https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg",
    isBestSeller: true,
    stock: 50,
    rating: 4.8,
    reviews: 324
  },
  {
    id: "2",
    name: "Pre-Workout Extreme",
    description: "High-energy pre-workout formula with caffeine, beta-alanine, and citrulline for maximum performance.",
    price: 34.99,
    category: "Pre-Workout",
    image: "https://images.pexels.com/photos/6551415/pexels-photo-6551415.jpeg",
    isBestSeller: true,
    stock: 30,
    rating: 4.6,
    reviews: 189
  },
  {
    id: "3",
    name: "Multivitamin Complex",
    description: "Complete daily multivitamin with essential vitamins and minerals for optimal health.",
    price: 24.99,
    category: "Vitamins",
    image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg",
    isBestSeller: false,
    stock: 75,
    rating: 4.4,
    reviews: 156
  },
  {
    id: "4",
    name: "Creatine Monohydrate",
    description: "Pure creatine monohydrate for increased strength, power, and muscle mass.",
    price: 19.99,
    category: "Creatine",
    image: "https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg",
    isBestSeller: true,
    stock: 40,
    rating: 4.7,
    reviews: 278
  },
  {
    id: "5",
    name: "Thermogenic Fat Burner",
    description: "Advanced fat burning formula with natural ingredients to boost metabolism.",
    price: 39.99,
    category: "Fat Burners",
    image: "https://images.pexels.com/photos/5938567/pexels-photo-5938567.jpeg",
    isBestSeller: false,
    stock: 25,
    rating: 4.2,
    reviews: 98
  },
  {
    id: "6",
    name: "BCAA Recovery",
    description: "Branched-chain amino acids for muscle recovery and reduced fatigue.",
    price: 29.99,
    category: "Recovery",
    image: "https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg",
    isBestSeller: true,
    stock: 35,
    rating: 4.5,
    reviews: 142
  },
  {
    id: "7",
    name: "Casein Protein",
    description: "Slow-digesting protein perfect for nighttime recovery and muscle preservation.",
    price: 44.99,
    category: "Protein",
    image: "https://images.pexels.com/photos/6551415/pexels-photo-6551415.jpeg",
    isBestSeller: false,
    stock: 20,
    rating: 4.3,
    reviews: 87
  },
  {
    id: "8",
    name: "Vitamin D3",
    description: "High-potency Vitamin D3 for bone health and immune system support.",
    price: 14.99,
    category: "Vitamins",
    image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg",
    isBestSeller: false,
    stock: 60,
    rating: 4.6,
    reviews: 203
  },
  {
    id: "9",
    name: "Pre-Workout Pump",
    description: "Stimulant-free pre-workout focused on muscle pumps and vascularity.",
    price: 32.99,
    category: "Pre-Workout",
    image: "https://images.pexels.com/photos/5938567/pexels-photo-5938567.jpeg",
    isBestSeller: true,
    stock: 28,
    rating: 4.4,
    reviews: 124
  },
  {
    id: "10",
    name: "Glutamine Powder",
    description: "Pure L-Glutamine for enhanced recovery and immune system support.",
    price: 22.99,
    category: "Recovery",
    image: "https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg",
    isBestSeller: false,
    stock: 45,
    rating: 4.1,
    reviews: 76
  },
  {
    id: "11",
    name: "Mass Gainer Pro",
    description: "High-calorie mass gainer with protein, carbs, and essential nutrients for muscle growth.",
    price: 59.99,
    category: "Protein",
    image: "https://images.pexels.com/photos/6551415/pexels-photo-6551415.jpeg",
    isBestSeller: true,
    stock: 22,
    rating: 4.7,
    reviews: 195
  },
  {
    id: "12",
    name: "Omega-3 Fish Oil",
    description: "Premium fish oil capsules with EPA and DHA for heart and brain health.",
    price: 18.99,
    category: "Vitamins",
    image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg",
    isBestSeller: true,
    stock: 80,
    rating: 4.5,
    reviews: 267
  }
];

export const faqs = [
  {
    question: "What is the best protein powder for beginners?",
    answer: "For beginners, we recommend starting with our Whey Protein Isolate. It's easily digestible, has a complete amino acid profile, and mixes well with water or milk. It's perfect for post-workout recovery and can help you reach your daily protein goals."
  },
  {
    question: "When should I take pre-workout supplements?",
    answer: "Pre-workout supplements should be taken 15-30 minutes before your workout on an empty stomach for best results. This allows enough time for the ingredients to be absorbed and take effect during your training session."
  },
  {
    question: "Are your supplements third-party tested?",
    answer: "Yes, all our supplements undergo rigorous third-party testing for purity, potency, and safety. We ensure that every product meets the highest quality standards and is free from banned substances."
  },
  {
    question: "Can I stack different supplements together?",
    answer: "Many supplements can be safely combined, but it's important to understand potential interactions. Common safe combinations include protein with creatine, or BCAAs with pre-workout. Always consult with a healthcare professional before starting any new supplement regimen."
  },
  {
    question: "What's your return policy?",
    answer: "We offer a 30-day money-back guarantee on all unopened products. If you're not satisfied with your purchase, you can return it within 30 days for a full refund. Opened products can be returned within 14 days if you're not completely satisfied."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we ship within the United States and Canada. We're working on expanding our shipping options to serve customers internationally. Sign up for our newsletter to be notified when international shipping becomes available."
  }
];