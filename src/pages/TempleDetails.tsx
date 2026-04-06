import { motion } from "framer-motion";
import { templeInfo } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const TempleDetails = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-12 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            About <span className="text-gradient-sacred">Temple</span>
          </h1>
          <p className="text-muted-foreground">Shri Mahalaxmi Mandir, Kolhapur — One of the sacred Shakti Peethas</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} className="rounded-xl overflow-hidden">
              <img src={templeInfo.image} alt={templeInfo.name} className="w-full h-64 md:h-80 object-cover" />
            </motion.div>
            <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
              <h2 className="font-heading text-2xl font-bold mb-3">{templeInfo.name}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{templeInfo.description}</p>
            </motion.div>
            <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp}>
              <h3 className="font-heading text-lg font-semibold mb-2">History</h3>
              <p className="text-muted-foreground leading-relaxed">{templeInfo.history}</p>
            </motion.div>
            <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp}>
              <h3 className="font-heading text-lg font-semibold mb-2">Architecture</h3>
              <p className="text-muted-foreground leading-relaxed">{templeInfo.architecture}</p>
            </motion.div>
            <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp}>
              <h3 className="font-heading text-lg font-semibold mb-2">Significance</h3>
              <p className="text-muted-foreground leading-relaxed">{templeInfo.significance}</p>
            </motion.div>
            <motion.div initial="hidden" animate="visible" custom={5} variants={fadeUp}>
              <h3 className="font-heading text-lg font-semibold mb-2">Major Festivals</h3>
              <p className="text-muted-foreground leading-relaxed">{templeInfo.festivals}</p>
            </motion.div>
          </div>
          <div className="space-y-6">
            <div className="rounded-xl bg-card p-6 shadow-card sticky top-24">
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
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">{templeInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">{templeInfo.email}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm font-medium mb-1">Deity</p>
                <p className="text-primary font-semibold">{templeInfo.deity}</p>
                <p className="text-xs text-muted-foreground mt-1">One of the sacred Shakti Peethas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TempleDetails;
