import { motion } from "framer-motion";
import { templeInfo, stats } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Clock, Phone } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const AboutPage = () => (
  <div className="min-h-screen">
    <Navbar />

    {/* Hero */}
    <section className="relative h-[50vh] min-h-[350px] flex items-end overflow-hidden">
      <img src={templeInfo.image} alt={templeInfo.name} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
      <div className="container relative z-10 pb-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-2"
        >
          {templeInfo.name}
        </motion.h1>
        <div className="flex items-center gap-2 text-primary-foreground/80">
          <MapPin className="w-4 h-4" /> {templeInfo.location}
        </div>
      </div>
    </section>

    {/* About Content */}
    <section className="container py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl font-bold mb-4">
              About the <span className="text-gradient-sacred">Temple</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground leading-relaxed mb-6">
              {templeInfo.description}
            </motion.p>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground leading-relaxed mb-6">
              The Mahakaleshwar Temple is one of the most revered pilgrimage sites in India. The lingam at the Mahakal is believed to be Swayambhu (born of itself), deriving currents of power from within itself as against the other Jyotirlingas which are ritually established. The idol of Mahakaleshwar is known to be dakshinamurti — facing the south — unique among the twelve Jyotirlingas.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="text-muted-foreground leading-relaxed">
              The Bhasma Aarti, performed during the early morning hours, is the most famous ritual of this temple. The deity is smeared with fresh ash from the funeral pyre, accompanied by chanting of mantras, creating a profoundly spiritual atmosphere.
            </motion.p>
          </motion.div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl bg-card p-6 shadow-card">
            <h3 className="font-heading font-semibold mb-4">Temple Information</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">{templeInfo.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Timings</p>
                  <p className="text-muted-foreground">{templeInfo.timings}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Contact</p>
                  <p className="text-muted-foreground">{templeInfo.phone}</p>
                  <p className="text-muted-foreground">{templeInfo.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-card p-6 shadow-card">
            <h3 className="font-heading font-semibold mb-3">Deity</h3>
            <p className="text-primary font-semibold">{templeInfo.deity}</p>
            <p className="text-sm text-muted-foreground mt-1">One of the twelve sacred Jyotirlingas</p>
          </div>
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

    <Footer />
  </div>
);

export default AboutPage;
