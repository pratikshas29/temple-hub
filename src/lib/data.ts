export interface Puja {
  id: string;
  title: string;
  description: string;
  date: string;
  price: number;
  category: string;
  image: string;
  tag?: string;
}

export interface ChadhavaItem {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  tag?: string;
}

export interface PrasadItem {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface DarshanSlot {
  id: string;
  title: string;
  description: string;
  type: "online" | "offline";
  price: number;
  time: string;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

// Single Temple Info
export const templeInfo = {
  name: "Shri Mahakaleshwar Jyotirlinga Temple",
  location: "Ujjain, Madhya Pradesh",
  deity: "Lord Shiva (Mahakaleshwar)",
  description:
    "One of the twelve Jyotirlingas, the most sacred abodes of Lord Shiva. The temple is situated on the banks of the holy river Shipra and is known for the famous Bhasma Aarti performed at dawn.",
  image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=1200",
  timings: "4:00 AM – 11:00 PM",
  phone: "+91 73400 50000",
  email: "info@mahakaleshwar.org",
  address: "Jaisinghpura, Ujjain, Madhya Pradesh 456006, India",
};

export const pujas: Puja[] = [
  {
    id: "1",
    title: "Maha Mrityunjaya Jaap",
    description: "Powerful mantra chanting for health, longevity, and protection from untimely death.",
    date: "5 April, Saturday",
    price: 1100,
    category: "Health & Protection",
    image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=600",
    tag: "Most Popular",
  },
  {
    id: "2",
    title: "Rudrabhishek Puja",
    description: "Sacred abhishek of Lord Shiva with milk, honey, and holy water for peace and prosperity.",
    date: "8 April, Tuesday",
    price: 2100,
    category: "Prosperity",
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=600",
    tag: "Special",
  },
  {
    id: "3",
    title: "Satyanarayan Katha",
    description: "Auspicious puja dedicated to Lord Vishnu for fulfillment of wishes and family well-being.",
    date: "12 April, Saturday",
    price: 1500,
    category: "Family Well-being",
    image: "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?w=600",
  },
  {
    id: "4",
    title: "Navgraha Shanti Puja",
    description: "Pacify all nine planets and remove planetary doshas for harmony in life.",
    date: "15 April, Tuesday",
    price: 3100,
    category: "Astrology",
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600",
    tag: "Recommended",
  },
  {
    id: "5",
    title: "Laghu Rudrabhishek",
    description: "A shorter version of Rudrabhishek for quick divine blessings and mental peace.",
    date: "18 April, Friday",
    price: 800,
    category: "Peace",
    image: "https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=600",
  },
  {
    id: "6",
    title: "Bhasma Aarti Special Puja",
    description: "Participate in the legendary Bhasma Aarti with special puja in your name.",
    date: "22 April, Tuesday",
    price: 5100,
    category: "Special Aarti",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600",
    tag: "Exclusive",
  },
];

export const chadhavaItems: ChadhavaItem[] = [
  {
    id: "c1",
    title: "Bilva Patra (108)",
    description: "Offer 108 sacred Bilva leaves to Lord Shiva for removal of sins and blessings.",
    price: 251,
    image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=400",
    tag: "Popular",
  },
  {
    id: "c2",
    title: "Panchamrit Abhishek",
    description: "Abhishek with milk, curd, honey, ghee, and sugar — the five nectars.",
    price: 501,
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=400",
  },
  {
    id: "c3",
    title: "Rudraksha Mala Offering",
    description: "Offer a 5-mukhi Rudraksha mala to Mahakaleshwar for spiritual growth.",
    price: 1100,
    image: "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?w=400",
    tag: "Special",
  },
  {
    id: "c4",
    title: "Flowers & Shringar",
    description: "Offer flowers, vermillion, and shringar items to the deity.",
    price: 351,
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=400",
  },
  {
    id: "c5",
    title: "Vastra Daan (Cloth Offering)",
    description: "Offer sacred cloth to Lord Shiva as an act of devotion.",
    price: 751,
    image: "https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=400",
  },
  {
    id: "c6",
    title: "Full Chadhava Combo",
    description: "Complete chadhava with bilva patra, flowers, panchamrit, vastra, and prasad.",
    price: 2100,
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400",
    tag: "Best Value",
  },
];

export const prasadItems: PrasadItem[] = [
  {
    id: "p1",
    title: "Mahakal Prasad Box",
    description: "Sacred prasad from Mahakaleshwar temple — includes laddu, pedha, and vibhuti.",
    price: 301,
    image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=400",
  },
  {
    id: "p2",
    title: "Vibhuti & Rudraksha Set",
    description: "Holy vibhuti (sacred ash) along with a blessed 5-mukhi Rudraksha.",
    price: 501,
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=400",
  },
  {
    id: "p3",
    title: "Premium Prasad Hamper",
    description: "Includes laddu, pedha, vibhuti, rudraksha, holy thread, and blessed water.",
    price: 1100,
    image: "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?w=400",
  },
];

export const darshanSlots: DarshanSlot[] = [
  {
    id: "d1",
    title: "Bhasma Aarti Live Darshan",
    description: "Watch the legendary Bhasma Aarti live from the sanctum sanctorum at dawn.",
    type: "online",
    price: 0,
    time: "4:00 AM – 5:30 AM",
    image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=600",
  },
  {
    id: "d2",
    title: "Morning Darshan (Online)",
    description: "Live morning darshan and aarti telecast for devotees worldwide.",
    type: "online",
    price: 0,
    time: "7:00 AM – 8:00 AM",
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=600",
  },
  {
    id: "d3",
    title: "VIP Offline Darshan",
    description: "Priority entry with guided darshan. Skip the queue for a peaceful experience.",
    type: "offline",
    price: 500,
    time: "6:00 AM – 10:00 PM",
    image: "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?w=600",
  },
  {
    id: "d4",
    title: "Evening Sandhya Aarti (Offline)",
    description: "Attend the beautiful evening Sandhya Aarti inside the temple premises.",
    type: "offline",
    price: 200,
    time: "6:30 PM – 7:30 PM",
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600",
  },
];

export const reviews: Review[] = [
  { id: "1", name: "Rahul Mehta", location: "Mumbai", rating: 5, text: "The puja was conducted beautifully. I received the video and prasad at home. Truly divine experience!", avatar: "RM" },
  { id: "2", name: "Sunita Devi", location: "Delhi", rating: 5, text: "Booking was so easy. The pandit ji performed the rituals with full devotion. Highly recommended.", avatar: "SD" },
  { id: "3", name: "Karthik Iyer", location: "Chennai", rating: 4, text: "Great platform to connect with Mahakaleshwar temple. The live darshan feature is amazing.", avatar: "KI" },
  { id: "4", name: "Meera Joshi", location: "Pune", rating: 5, text: "I've been using this for 6 months now. Every puja has brought peace to our family. Blessed!", avatar: "MJ" },
];

export const features = [
  { icon: "🕉️", title: "Online Puja Booking", description: "Book personalized pujas at Mahakaleshwar temple from your home." },
  { icon: "📿", title: "Chadhava Seva", description: "Offer sacred chadhava to Lord Mahakal with full Vedic rituals." },
  { icon: "🍃", title: "Prasad Delivery", description: "Receive blessed prasad from the temple delivered to your doorstep." },
  { icon: "📺", title: "Live Darshan", description: "Experience divine darshan of Mahakaleshwar through live streaming." },
  { icon: "🛕", title: "Offline Darshan", description: "Book VIP darshan passes for priority temple entry." },
  { icon: "📅", title: "Panchang & Calendar", description: "Get daily panchang, auspicious timings, and festival information." },
];

export const stats = [
  { value: "50K+", label: "Devotees Served" },
  { value: "1000+", label: "Pujas Completed" },
  { value: "4.9", label: "User Rating" },
  { value: "24/7", label: "Live Darshan" },
];
