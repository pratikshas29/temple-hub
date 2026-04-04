export interface Puja {
  id: string;
  title: string;
  description: string;
  date: string;
  price: number;
  category: string;
  image: string;
  tag?: string;
  isCustomAmount?: boolean;
  minAmount?: number;
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
  isCustomAmount?: boolean;
  minAmount?: number;
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

export interface TempleEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  price: number;
  image: string;
  tag?: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

// Single Temple Info — Mahalaxmi Mandir, Kolhapur (Ambabai)
export const templeInfo = {
  name: "Shri Mahalaxmi Mandir, Kolhapur",
  location: "Kolhapur, Maharashtra",
  deity: "Goddess Mahalaxmi (Ambabai)",
  description:
    "One of the most sacred Shakti Peethas in India, Shri Mahalaxmi Mandir in Kolhapur is dedicated to Goddess Mahalaxmi (Ambabai). The temple is renowned for its ancient heritage, spiritual significance, and the powerful deity who blesses devotees with prosperity and well-being.",
  image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=1200",
  timings: "5:00 AM – 9:30 PM",
  phone: "+91 98765 43210",
  email: "info@mahalaxmikolhapur.com",
  address: "Mahalaxmi Temple Road, Kolhapur, Maharashtra 416012, India",
  history: "The Mahalaxmi Temple of Kolhapur is one of the oldest and most significant temples in India. It is believed to have been originally built during the Chalukya period (7th century CE). The temple has been renovated and expanded over centuries by various dynasties including the Shilahara, Yadava, and Maratha rulers. It is one of the 51 Shakti Peethas and holds immense importance in Hindu tradition.",
  architecture: "The temple showcases a blend of Hemadpanthi and Chalukyan architectural styles. The main sanctum houses the idol of Goddess Mahalaxmi adorned with precious ornaments. The temple complex includes multiple shrines, a large courtyard, and beautifully carved pillars and ceilings.",
  festivals: "Navratri (Ghatasthapana to Dussehra) is the grandest festival celebrated here with immense devotion. Lalita Panchami, Ashtami, and Khande Navami are especially significant. Other major festivals include Kojagiri Pournima, Diwali, and the annual Kirnotsav (rays of sun falling directly on the deity).",
  significance: "The idol of Mahalaxmi is believed to be self-manifested (Swayambhu). The temple is one of the six Mahalaxmi temples and is considered the most important. The annual Kirnotsav, where the rays of the setting sun fall directly on the face of the idol, is a unique natural phenomenon observed in January and November.",
};

// Festival period: 22 September to 7 October
export const festivalDays = [
  "Ghatasthapana",
  "Lalita Panchami",
  "Ashtami",
  "Khande Navami",
  "Dasara / Dussehra",
];

export const festivalStartDate = new Date(2026, 8, 22); // 22 Sep 2026
export const festivalEndDate = new Date(2026, 9, 7);    // 7 Oct 2026

// CATEGORY: Pooja Services
export const pujas: Puja[] = [
  {
    id: "ps1",
    title: "Kumkumarchan",
    description: "Performed on silver paduka in devotee name",
    date: "22 Sep – 7 Oct",
    price: 551,
    category: "Pooja Services",
    image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=600",
    tag: "Popular",
  },
  {
    id: "ps2",
    title: "Padya Puja",
    description: "Performed on silver paduka in devotee name",
    date: "22 Sep – 7 Oct",
    price: 551,
    category: "Pooja Services",
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=600",
  },
  {
    id: "ps3",
    title: "Panchamrut Abhishek",
    description: "One person can sit (sovale/dhoti), family can attend",
    date: "22 Sep – 7 Oct",
    price: 751,
    category: "Pooja Services",
    image: "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?w=600",
  },
  {
    id: "ps4",
    title: "Kulachar",
    description: "Panchamrut Abhishek + Naivedya + Savashna + Brahman + Kumarika Bhojan + 1 Saptashati Path",
    date: "22 Sep – 7 Oct",
    price: 5001,
    category: "Pooja Services",
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600",
    tag: "Special",
  },
  {
    id: "ps5",
    title: "Sahastra Namavali Puja",
    description: "Mahapuja + Abhishek + Laxmi Sahastra Namavali + Kumkumarchan",
    date: "22 Sep – 7 Oct",
    price: 7001,
    category: "Pooja Services",
    image: "https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=600",
  },
  {
    id: "ps6",
    title: "Shreesukta Havan",
    description: "Abhishek + Puja + Kumkumarchan + 16 Path Shreesukta Havan",
    date: "22 Sep – 7 Oct",
    price: 11001,
    category: "Pooja Services",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600",
    tag: "Premium",
  },
  {
    id: "ps7",
    title: "Navachandi Havan & Path",
    description: "Durga Saptashati 10 Path + Abhishek + Kumkumarchan + 1 Path Havan",
    date: "22 Sep – 7 Oct",
    price: 25001,
    category: "Pooja Services",
    image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=600",
    tag: "Grand",
  },
];

// CATEGORY: Chadhava / Arpan
export const chadhavaItems: ChadhavaItem[] = [
  {
    id: "c1",
    title: "Regular Otee",
    description: "Nariyal, Halad, Kunkum, Khaan, Tandul, Phutane offered in devotee name",
    price: 351,
    image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=400",
    tag: "Popular",
  },
  {
    id: "c2",
    title: "Saree Otee",
    description: "Saree + Regular Otee offered in devotee name",
    price: 1201,
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=400",
    tag: "Special",
  },
];

// CATEGORY: Naivedya / Bhog
export const prasadItems: PrasadItem[] = [
  {
    id: "p1",
    title: "Puranpoli Naivedya",
    description: "Naivedya offered in devotee name",
    price: 300,
    image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=400",
  },
  {
    id: "p2",
    title: "Brahman, Suwasini, Kumarika Bhojan",
    description: "Bhojan for Brahman, Kumarika, and Suwasini",
    price: 1201,
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=400",
  },
];

// CATEGORY: Other Services
export const otherServices: PrasadItem[] = [
  {
    id: "o1",
    title: "Annadan",
    description: "Friday prasad (sakhar phutane / sweet upma / sabudana khichadi)",
    price: 10,
    image: "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?w=400",
    isCustomAmount: true,
    minAmount: 10,
  },
  {
    id: "o2",
    title: "Gou Seva",
    description: "Gou seva offering",
    price: 10,
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=400",
    isCustomAmount: true,
    minAmount: 10,
  },
  {
    id: "o3",
    title: "Courier Charges",
    description: "Prasad delivery courier",
    price: 100,
    image: "https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=400",
  },
];

export const darshanSlots: DarshanSlot[] = [
  {
    id: "d1",
    title: "Online Darshan (Live)",
    description: "Watch live aarti and darshan from anywhere. No temple visit needed.",
    type: "online",
    price: 0,
    time: "5:00 AM – 9:30 PM",
    image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=600",
  },
  {
    id: "d2",
    title: "Offline Darshan (Temple Visit)",
    description: "Visit the temple with priority VIP darshan pass. Skip the queue.",
    type: "offline",
    price: 500,
    time: "5:00 AM – 9:30 PM",
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=600",
  },
];

export const templeEvents: TempleEvent[] = [
  { id: "e1", title: "Ghatasthapana", description: "Auspicious beginning of Navratri festival with Kalash Sthapana.", date: "22 September 2026", price: 1100, image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=600", tag: "Navratri" },
  { id: "e2", title: "Lalita Panchami", description: "Special puja and celebration on the fifth day of Navratri.", date: "27 September 2026", price: 1100, image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=600", tag: "Navratri" },
  { id: "e3", title: "Ashtami", description: "Grand Ashtami celebrations with havan, puja, and prasad.", date: "30 September 2026", price: 2100, image: "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?w=600", tag: "Navratri" },
  { id: "e4", title: "Khande Navami", description: "Powerful Navami celebrations with special Shakti puja.", date: "1 October 2026", price: 2100, image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600", tag: "Navratri" },
  { id: "e5", title: "Dasara / Dussehra", description: "Grand Vijaya Dashami celebrations — triumph of good over evil.", date: "7 October 2026", price: 3100, image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600", tag: "Grand Festival" },
];

export const reviews: Review[] = [
  { id: "1", name: "Rahul Mehta", location: "Mumbai", rating: 5, text: "The puja was conducted beautifully by the hereditary Shreepujak. I received the video and prasad at home. Truly divine experience!", avatar: "RM" },
  { id: "2", name: "Sunita Devi", location: "Pune", rating: 5, text: "Booking was so easy. The Shreepujak performed the rituals with full devotion. Highly recommended.", avatar: "SD" },
  { id: "3", name: "Karthik Iyer", location: "Chennai", rating: 4, text: "Great platform to connect with Mahalaxmi Mandir. The online darshan feature is amazing.", avatar: "KI" },
  { id: "4", name: "Meera Joshi", location: "Kolhapur", rating: 5, text: "I've been using this for 6 months now. Every puja has brought peace to our family. Blessed by Ambabai!", avatar: "MJ" },
];

export const features = [
  { icon: "🕉️", title: "Online Puja Booking", description: "Book personalized pujas at Mahalaxmi Mandir performed by hereditary Shreepujak." },
  { icon: "📿", title: "Chadhava / Arpan", description: "Offer Otee, Saree, and sacred items to Goddess Mahalaxmi in your name." },
  { icon: "🍃", title: "Naivedya / Bhog", description: "Offer Puranpoli Naivedya and Bhojan in the name of the devotee." },
  { icon: "📺", title: "Online Darshan", description: "Experience divine darshan of Ambabai through live streaming from anywhere." },
  { icon: "🛕", title: "Offline Darshan Pass", description: "Book VIP darshan passes for priority temple entry at Kolhapur." },
  { icon: "🙏", title: "Annadan & Gou Seva", description: "Contribute to Annadan and Gou Seva with any amount you wish." },
];

export const stats = [
  { value: "50K+", label: "Devotees Served" },
  { value: "1000+", label: "Pujas Completed" },
  { value: "4.9", label: "User Rating" },
  { value: "24/7", label: "Online Darshan" },
];
