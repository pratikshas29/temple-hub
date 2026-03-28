import { motion } from "framer-motion";
import { temples } from "@/lib/data";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TemplesPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="container py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
          Sacred <span className="text-gradient-sacred">Temples</span>
        </h1>
        <p className="text-muted-foreground">Explore renowned temples across India where we perform authentic Vedic rituals.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {temples.map((temple, i) => (
          <motion.div
            key={temple.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-xl overflow-hidden bg-card shadow-card hover:shadow-warm transition-all"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={temple.image}
                alt={temple.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="font-heading text-xl font-bold text-primary-foreground">{temple.name}</h3>
                <div className="flex items-center gap-1 text-sm text-primary-foreground/80 mt-1">
                  <MapPin className="w-3.5 h-3.5" /> {temple.location}
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  {temple.deity}
                </span>
                <span className="text-xs text-muted-foreground">{temple.pujaCount} pujas available</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{temple.description}</p>
              <Link
                to="/pujas"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                View Pujas →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default TemplesPage;
