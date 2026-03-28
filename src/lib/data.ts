export interface Puja {
  id: string;
  title: string;
  description: string;
  temple: string;
  location: string;
  date: string;
  price: number;
  category: string;
  image: string;
  tag?: string;
}

export interface Temple {
  id: string;
  name: string;
  location: string;
  deity: string;
  description: string;
  image: string;
  pujaCount: number;
}

export interface Booking {
  id: string;
  userName: string;
  pujaTitle: string;
  temple: string;
  date: string;
  amount: number;
  status: "confirmed" | "pending" | "completed" | "cancelled";
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

export const pujas: Puja[] = [
  {
    id: "1",
    title: "Maha Mrityunjaya Jaap",
    description: "Powerful mantra chanting for health, longevity, and protection from untimely death.",
    temple: "Mahakaleshwar Temple",
    location: "Ujjain, Madhya Pradesh",
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
    temple: "Kashi Vishwanath Temple",
    location: "Varanasi, Uttar Pradesh",
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
    temple: "Tirupati Balaji Temple",
    location: "Tirupati, Andhra Pradesh",
    date: "12 April, Saturday",
    price: 1500,
    category: "Family Well-being",
    image: "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?w=600",
  },
  {
    id: "4",
    title: "Navgraha Shanti Puja",
    description: "Pacify all nine planets and remove planetary doshas for harmony in life.",
    temple: "Navagraha Temple",
    location: "Kumbakonam, Tamil Nadu",
    date: "15 April, Tuesday",
    price: 3100,
    category: "Astrology",
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600",
    tag: "Recommended",
  },
  {
    id: "5",
    title: "Lakshmi Puja",
    description: "Invoke Goddess Lakshmi's blessings for wealth, abundance, and financial growth.",
    temple: "Mahalakshmi Temple",
    location: "Kolhapur, Maharashtra",
    date: "18 April, Friday",
    price: 1800,
    category: "Wealth",
    image: "https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=600",
  },
  {
    id: "6",
    title: "Hanuman Chalisa Path",
    description: "Recitation of Hanuman Chalisa 108 times for courage, strength, and obstacle removal.",
    temple: "Sankat Mochan Temple",
    location: "Varanasi, Uttar Pradesh",
    date: "22 April, Tuesday",
    price: 900,
    category: "Protection",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600",
  },
];

export const temples: Temple[] = [
  {
    id: "1",
    name: "Kashi Vishwanath Temple",
    location: "Varanasi, Uttar Pradesh",
    deity: "Lord Shiva",
    description: "One of the 12 Jyotirlingas, this ancient temple is the spiritual heart of India.",
    image: "https://images.unsplash.com/photo-1609766856923-7e0a0c06d5e6?w=600",
    pujaCount: 15,
  },
  {
    id: "2",
    name: "Tirupati Balaji Temple",
    location: "Tirupati, Andhra Pradesh",
    deity: "Lord Venkateswara",
    description: "The richest and most visited Hindu temple in the world.",
    image: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=600",
    pujaCount: 12,
  },
  {
    id: "3",
    name: "Mahakaleshwar Temple",
    location: "Ujjain, Madhya Pradesh",
    deity: "Lord Shiva",
    description: "Famous Jyotirlinga known for the powerful Bhasma Aarti.",
    image: "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?w=600",
    pujaCount: 8,
  },
  {
    id: "4",
    name: "Somnath Temple",
    location: "Somnath, Gujarat",
    deity: "Lord Shiva",
    description: "The first among the twelve Jyotirlinga shrines of Lord Shiva.",
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600",
    pujaCount: 10,
  },
];

export const bookings: Booking[] = [
  { id: "B001", userName: "Rajesh Kumar", pujaTitle: "Maha Mrityunjaya Jaap", temple: "Mahakaleshwar Temple", date: "2026-04-05", amount: 1100, status: "confirmed" },
  { id: "B002", userName: "Priya Sharma", pujaTitle: "Rudrabhishek Puja", temple: "Kashi Vishwanath Temple", date: "2026-04-08", amount: 2100, status: "pending" },
  { id: "B003", userName: "Amit Patel", pujaTitle: "Satyanarayan Katha", temple: "Tirupati Balaji Temple", date: "2026-04-12", amount: 1500, status: "completed" },
  { id: "B004", userName: "Sneha Gupta", pujaTitle: "Navgraha Shanti Puja", temple: "Navagraha Temple", date: "2026-04-15", amount: 3100, status: "confirmed" },
  { id: "B005", userName: "Vikram Singh", pujaTitle: "Lakshmi Puja", temple: "Mahalakshmi Temple", date: "2026-04-18", amount: 1800, status: "cancelled" },
  { id: "B006", userName: "Anita Verma", pujaTitle: "Hanuman Chalisa Path", temple: "Sankat Mochan Temple", date: "2026-04-22", amount: 900, status: "pending" },
];

export const reviews: Review[] = [
  { id: "1", name: "Rahul Mehta", location: "Mumbai", rating: 5, text: "The puja was conducted beautifully. I received the video and prasad at home. Truly divine experience!", avatar: "RM" },
  { id: "2", name: "Sunita Devi", location: "Delhi", rating: 5, text: "Booking was so easy. The pandit ji performed the rituals with full devotion. Highly recommended.", avatar: "SD" },
  { id: "3", name: "Karthik Iyer", location: "Chennai", rating: 4, text: "Great platform to connect with temples across India. The live darshan feature is amazing.", avatar: "KI" },
  { id: "4", name: "Meera Joshi", location: "Pune", rating: 5, text: "I've been using this for 6 months now. Every puja has brought peace to our family. Blessed!", avatar: "MJ" },
];

export const features = [
  { icon: "🕉️", title: "Online Puja Booking", description: "Book personalized pujas at sacred temples across India from your home." },
  { icon: "🛕", title: "Temple Darshan", description: "Experience divine darshan of famous temples with live streaming." },
  { icon: "📿", title: "Chadhava Seva", description: "Offer sacred chadhava to your beloved deity at renowned temples." },
  { icon: "📅", title: "Panchang & Calendar", description: "Get daily panchang, auspicious timings, and festival information." },
  { icon: "🎵", title: "Devotional Content", description: "Access mantras, bhajans, aartis, and spiritual literature." },
  { icon: "⭐", title: "Horoscope", description: "Get daily, weekly, and monthly horoscope readings and guidance." },
];

export const stats = [
  { value: "10K+", label: "Devotees Served" },
  { value: "100+", label: "Sacred Temples" },
  { value: "500+", label: "Pujas Completed" },
  { value: "4.8", label: "User Rating" },
];
