import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-temple.jpg";
import { stats, features, reviews, pujas } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PujaCard from "@/components/PujaCard";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Sacred temple" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Divine Blessings,{" "}
              <span className="text-gradient-sacred">Delivered Home</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
              Book personalized Vedic pujas at 100+ sacred temples across India. Seek divine grace for health, prosperity, and peace — from anywhere in the world.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/pujas"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-sacred px-8 py-3.5 font-semibold text-primary-foreground shadow-warm transition-transform hover:scale-105"
              >
                Explore Pujas
              </Link>
              <Link
                to="/temples"
                className="inline-flex items-center justify-center rounded-lg border border-primary-foreground/30 px-8 py-3.5 font-semibold text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/10"
              >
                View Temples
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-gradient-sacred py-3 overflow-hidden">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex gap-12 items-center">
              <span className="text-primary-foreground font-semibold">🛡️ 100% Secure</span>
              <span className="text-primary-foreground/60">•</span>
              <span className="text-primary-foreground font-semibold">🙏 Trusted by 10K+ Devotees</span>
              <span className="text-primary-foreground/60">•</span>
              <span className="text-primary-foreground font-semibold">🕉️ 100+ Sacred Temples</span>
              <span className="text-primary-foreground/60">•</span>
              <span className="text-primary-foreground font-semibold">📿 Authentic Vedic Rituals</span>
              <span className="text-primary-foreground/60">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Pujas */}
      <section className="container py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
          <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-gradient-sacred">Pujas</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-muted-foreground max-w-xl mx-auto">
            Book sacred pujas performed in your name at India's most powerful temples.
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pujas.slice(0, 3).map((puja, i) => (
            <motion.div key={puja.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <PujaCard puja={puja} />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/pujas" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
            View All Pujas →
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Your Complete <span className="text-gradient-sacred">Devotional</span> Platform
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="rounded-xl bg-card p-6 shadow-card hover:shadow-warm transition-shadow"
              >
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="font-heading text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-divine py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-1">{s.value}</div>
                <div className="text-sm text-primary-foreground/70">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="container py-20">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
          What Devotees <span className="text-gradient-sacred">Say</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="rounded-xl bg-card p-6 shadow-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-sacred flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {r.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.location}</div>
                </div>
              </div>
              <div className="text-gold mb-3">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
