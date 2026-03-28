import { useState } from "react";
import { motion } from "framer-motion";
import { pujas } from "@/lib/data";
import PujaCard from "@/components/PujaCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["All", "Health & Protection", "Prosperity", "Family Well-being", "Astrology", "Wealth", "Protection"];

const PujasPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? pujas : pujas.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Sacred <span className="text-gradient-sacred">Pujas</span>
          </h1>
          <p className="text-muted-foreground">Book personalized pujas at India's most revered temples.</p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-gradient-sacred text-primary-foreground shadow-warm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((puja, i) => (
            <motion.div
              key={puja.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <PujaCard puja={puja} />
            </motion.div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">No pujas found in this category.</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PujasPage;
