import { useState } from "react";
import { motion } from "framer-motion";
import { pujas, chadhavaItems, prasadItems, darshanSlots, templeEvents, templeInfo } from "@/lib/data";
import type { ChadhavaItem, PrasadItem, DarshanSlot, TempleEvent } from "@/lib/data";
import PujaCard from "@/components/PujaCard";
import BookingModal from "@/components/BookingModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, MapPin, Calendar, Clock, Phone, Mail } from "lucide-react";

const categories = ["All", "Health & Protection", "Prosperity", "Family Well-being", "Astrology", "Peace", "Special Aarti"];

const PujasPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [darshanFilter, setDarshanFilter] = useState<"all" | "online" | "offline">("all");
  const [selectedChadhava, setSelectedChadhava] = useState<ChadhavaItem | null>(null);
  const [selectedPrasad, setSelectedPrasad] = useState<PrasadItem | null>(null);
  const [selectedDarshan, setSelectedDarshan] = useState<DarshanSlot | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TempleEvent | null>(null);

  const filteredPujas = activeCategory === "All" ? pujas : pujas.filter((p) => p.category === activeCategory);
  const filteredDarshan = darshanFilter === "all" ? darshanSlots : darshanSlots.filter((s) => s.type === darshanFilter);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-12 pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Puja <span className="text-gradient-sacred">Booking</span>
          </h1>
          <p className="text-muted-foreground">Book all temple services at Shri Mahakaleshwar Jyotirlinga Temple.</p>
        </motion.div>

        <Tabs defaultValue="pujas" className="w-full">
          <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1 rounded-xl mb-8">
            <TabsTrigger value="pujas" className="flex-1 min-w-[100px]">🕉️ Pujas</TabsTrigger>
            <TabsTrigger value="chadhava" className="flex-1 min-w-[100px]">📿 Chadhava</TabsTrigger>
            <TabsTrigger value="prasad" className="flex-1 min-w-[100px]">🍃 Prasad</TabsTrigger>
            <TabsTrigger value="darshan" className="flex-1 min-w-[100px]">🛕 Darshan</TabsTrigger>
            <TabsTrigger value="events" className="flex-1 min-w-[100px]">📅 Events</TabsTrigger>
            <TabsTrigger value="temple" className="flex-1 min-w-[100px]">🏛️ Temple Details</TabsTrigger>
          </TabsList>

          {/* Pujas Tab */}
          <TabsContent value="pujas">
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
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
              {filteredPujas.map((puja, i) => (
                <motion.div key={puja.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <PujaCard puja={puja} />
                </motion.div>
              ))}
            </div>
            {filteredPujas.length === 0 && <div className="text-center py-20 text-muted-foreground">No pujas found in this category.</div>}
          </TabsContent>

          {/* Chadhava Tab */}
          <TabsContent value="chadhava">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chadhavaItems.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="group rounded-xl overflow-hidden bg-card shadow-card hover:shadow-warm transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    {item.tag && <span className="absolute top-3 left-3 bg-gradient-sacred text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">{item.tag}</span>}
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xl font-bold text-primary">₹{item.price}</span>
                      <button onClick={() => setSelectedChadhava(item)}
                        className="inline-flex items-center justify-center rounded-lg bg-gradient-sacred px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
                        Offer Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Prasad Tab */}
          <TabsContent value="prasad">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prasadItems.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="group rounded-xl overflow-hidden bg-card shadow-card hover:shadow-warm transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xl font-bold text-primary">₹{item.price}</span>
                      <button onClick={() => setSelectedPrasad(item)}
                        className="inline-flex items-center justify-center rounded-lg bg-gradient-sacred px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
                        Order Prasad
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Darshan Tab */}
          <TabsContent value="darshan">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Online Darshan:</strong> Watch live from anywhere. <strong>Offline Darshan:</strong> Visit the temple with priority entry.
              </p>
              <div className="flex gap-2 mb-6">
                {(["all", "online", "offline"] as const).map((t) => (
                  <button key={t} onClick={() => setDarshanFilter(t)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                      darshanFilter === t ? "bg-gradient-sacred text-primary-foreground shadow-warm" : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}>
                    {t === "all" ? "All Darshan" : t === "online" ? "🖥️ Online" : "🛕 Offline (Visit Temple)"}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDarshan.map((slot, i) => (
                <motion.div key={slot.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="group rounded-xl overflow-hidden bg-card shadow-card hover:shadow-warm transition-all">
                  <div className="relative h-56 overflow-hidden">
                    <img src={slot.image} alt={slot.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        slot.type === "online" ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground"
                      }`}>
                        {slot.type === "online" ? <Monitor className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                        {slot.type === "online" ? "Live Online" : "In-Person Visit"}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-semibold mb-2">{slot.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{slot.description}</p>
                    <p className="text-xs text-muted-foreground mb-4">🕐 {slot.time}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xl font-bold text-primary">{slot.price === 0 ? "Free" : `₹${slot.price}`}</span>
                      <button onClick={() => setSelectedDarshan(slot)}
                        className="inline-flex items-center justify-center rounded-lg bg-gradient-sacred px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
                        {slot.type === "online" ? "Watch Live" : "Book Pass"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templeEvents.map((event, i) => (
                <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="group rounded-xl overflow-hidden bg-card shadow-card hover:shadow-warm transition-all">
                  <div className="relative h-56 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    {event.tag && <span className="absolute top-3 left-3 bg-gradient-sacred text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">{event.tag}</span>}
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-semibold mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span className="font-medium text-foreground">{event.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xl font-bold text-primary">₹{event.price.toLocaleString()}</span>
                      <button onClick={() => setSelectedEvent(event)}
                        className="inline-flex items-center justify-center rounded-lg bg-gradient-sacred px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
                        Book Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Temple Details Tab */}
          <TabsContent value="temple">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="rounded-xl overflow-hidden">
                  <img src={templeInfo.image} alt={templeInfo.name} className="w-full h-64 md:h-80 object-cover" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold mb-3">{templeInfo.name}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">{templeInfo.description}</p>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-2">History</h3>
                  <p className="text-muted-foreground leading-relaxed">{templeInfo.history}</p>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-2">Architecture</h3>
                  <p className="text-muted-foreground leading-relaxed">{templeInfo.architecture}</p>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-2">Significance</h3>
                  <p className="text-muted-foreground leading-relaxed">{templeInfo.significance}</p>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-2">Major Festivals</h3>
                  <p className="text-muted-foreground leading-relaxed">{templeInfo.festivals}</p>
                </div>
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
                    <p className="text-xs text-muted-foreground mt-1">One of the twelve sacred Jyotirlingas</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Booking Modals */}
      {selectedChadhava && (
        <BookingModal open={!!selectedChadhava} onOpenChange={(o) => !o && setSelectedChadhava(null)}
          bookingType="chadhava" itemName={selectedChadhava.title} amount={selectedChadhava.price} />
      )}
      {selectedPrasad && (
        <BookingModal open={!!selectedPrasad} onOpenChange={(o) => !o && setSelectedPrasad(null)}
          bookingType="prasad" itemName={selectedPrasad.title} amount={selectedPrasad.price} />
      )}
      {selectedDarshan && selectedDarshan.type === "offline" && (
        <BookingModal open={!!selectedDarshan} onOpenChange={(o) => !o && setSelectedDarshan(null)}
          bookingType="darshan" itemName={selectedDarshan.title} amount={selectedDarshan.price} />
      )}
      {selectedEvent && (
        <BookingModal open={!!selectedEvent} onOpenChange={(o) => !o && setSelectedEvent(null)}
          bookingType="puja" itemName={selectedEvent.title} amount={selectedEvent.price} />
      )}

      <Footer />
    </div>
  );
};

export default PujasPage;
