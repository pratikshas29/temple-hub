import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pujas, chadhavaItems, prasadItems, otherServices, darshanSlots, templeEvents, templeInfo, reviews } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Clock, Star, ChevronDown, ChevronUp, Play } from "lucide-react";
import { toast } from "sonner";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

const PujaDetails = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const item = useMemo(() => {
    if (!type || !id) return null;
    switch (type) {
      case "puja": return pujas.find(p => p.id === id);
      case "chadhava": return chadhavaItems.find(c => c.id === id);
      case "naivedya": return prasadItems.find(p => p.id === id);
      case "other": return otherServices.find(o => o.id === id);
      case "darshan": return darshanSlots.find(d => d.id === id);
      case "event": return templeEvents.find(e => e.id === id);
      default: return null;
    }
  }, [type, id]);

  if (!item) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-24 text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">Service Not Found</h1>
          <Link to="/pujas" className="inline-flex items-center justify-center rounded-lg bg-gradient-sacred px-6 py-3 text-sm font-semibold text-primary-foreground">Back to Services</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const itemTitle = 'title' in item ? item.title : "";
  const itemDesc = 'description' in item ? item.description : "";
  const itemPrice = 'price' in item ? item.price : 0;
  const itemImage = 'image' in item ? item.image : "";
  const isCustom = 'isCustomAmount' in item ? item.isCustomAmount : false;
  const minAmt = 'minAmount' in item ? item.minAmount : undefined;
  const benefits = 'benefits' in item ? (item as any).benefits : null;
  const process = 'process' in item ? (item as any).process : null;
  const faqs = 'faqs' in item ? (item as any).faqs : null;
  const category = 'category' in item ? (item as any).category : type;
  const tag = 'tag' in item ? (item as any).tag : null;

  const handleBookNow = () => {
    if (!user) {
      setPhoneModal(true);
      return;
    }
    // Already logged in, set name from user
    const userName = user.user_metadata?.full_name || "";
    setName(userName);
    setPhoneModal(true);
  };

  const handlePhoneNext = () => {
    if (!name.trim()) { toast.error("Please enter your name"); return; }
    if (!user && (!phone.trim() || phone.length < 10)) { toast.error("Please enter a valid mobile number"); return; }
    setPhoneModal(false);
    // Navigate to booking page with pre-filled data
    const params = new URLSearchParams();
    params.set("name", name.trim());
    if (phone.trim()) params.set("phone", phone.trim());
    window.location.href = `/book/${type}/${id}?${params.toString()}`;
  };

  // Get related reviews (show all for now)
  const relatedReviews = reviews.slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-12 pt-24 max-w-4xl mx-auto">
        <Link to="/pujas" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>

        {/* Hero section */}
        <motion.div initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <motion.div variants={fadeUp} custom={0} className="rounded-xl overflow-hidden">
            <img src={itemImage} alt={itemTitle} className="w-full h-64 md:h-80 object-cover" />
          </motion.div>
          <motion.div variants={fadeUp} custom={1} className="flex flex-col justify-center">
            {tag && <span className="inline-flex self-start bg-gradient-sacred text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-3">{tag}</span>}
            <span className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">{category}</span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">{itemTitle}</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">{itemDesc}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span>🛕 {templeInfo.name}</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              {!isCustom ? (
                <span className="font-heading text-3xl font-bold text-primary">₹{itemPrice.toLocaleString()}</span>
              ) : (
                <span className="text-muted-foreground">Custom amount (min ₹{minAmt})</span>
              )}
            </div>
            <Button onClick={handleBookNow} size="lg" className="w-full md:w-auto bg-gradient-sacred text-primary-foreground font-semibold text-lg px-10 py-3 hover:scale-105 transition-transform">
              Book Now
            </Button>
          </motion.div>
        </motion.div>

        {/* Benefits */}
        {benefits && benefits.length > 0 && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl font-bold mb-6">
              Benefits of <span className="text-gradient-sacred">{itemTitle}</span>
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b: string, i: number) => (
                <motion.div key={i} variants={fadeUp} custom={i} className="flex items-start gap-3 rounded-xl bg-card p-4 shadow-card">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{b}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Process */}
        {process && process.length > 0 && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl font-bold mb-6">
              Puja <span className="text-gradient-sacred">Process</span>
            </motion.h2>
            <div className="space-y-4">
              {process.map((p: string, i: number) => (
                <motion.div key={i} variants={fadeUp} custom={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-sacred flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                    {i + 1}
                  </div>
                  <div className="rounded-xl bg-card p-4 shadow-card flex-1">
                    <p className="text-sm">{p}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Reviews */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
          <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl font-bold mb-6">
            Devotee <span className="text-gradient-sacred">Reviews</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedReviews.map((r, i) => (
              <motion.div key={r.id} variants={fadeUp} custom={i} className="rounded-xl bg-card p-5 shadow-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-sacred flex items-center justify-center text-sm font-bold text-primary-foreground">{r.avatar}</div>
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.location}</div>
                  </div>
                </div>
                <div className="text-accent mb-2">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                <p className="text-sm text-muted-foreground">{r.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQs */}
        {faqs && faqs.length > 0 && (
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-2xl font-bold mb-6">
              Frequently Asked <span className="text-gradient-sacred">Questions</span>
            </motion.h2>
            <div className="space-y-3">
              {faqs.map((faq: { q: string; a: string }, i: number) => (
                <motion.div key={i} variants={fadeUp} custom={i} className="rounded-xl bg-card shadow-card overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="font-medium text-sm">{faq.q}</span>
                    {expandedFaq === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </button>
                  {expandedFaq === i && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Bottom CTA */}
        <div className="rounded-2xl bg-gradient-sacred p-8 text-center mb-10">
          <h3 className="font-heading text-2xl font-bold text-primary-foreground mb-3">Ready to Book {itemTitle}?</h3>
          <p className="text-primary-foreground/80 mb-6">Experience divine blessings from Shri Mahalaxmi Mandir, Kolhapur</p>
          <Button onClick={handleBookNow} size="lg" className="bg-card text-foreground font-semibold hover:scale-105 transition-transform">
            Book Now — {isCustom ? `Min ₹${minAmt}` : `₹${itemPrice.toLocaleString()}`}
          </Button>
        </div>
      </div>

      {/* Phone / Name popup */}
      <Dialog open={phoneModal} onOpenChange={setPhoneModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-heading">Enter Your Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label htmlFor="book_name">Full Name *</Label>
              <Input id="book_name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" className="mt-1" />
            </div>
            {!user && (
              <div>
                <Label htmlFor="book_phone">Mobile Number *</Label>
                <Input id="book_phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter 10-digit mobile number" className="mt-1" maxLength={10} />
              </div>
            )}
            <Button onClick={handlePhoneNext} className="w-full bg-gradient-sacred text-primary-foreground font-semibold">
              Next →
            </Button>
            {!user && (
              <p className="text-xs text-center text-muted-foreground">
                Already have an account?{" "}
                <button onClick={() => { setPhoneModal(false); setAuthOpen(true); }} className="text-primary font-medium hover:underline">Sign In</button>
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      <Footer />
    </div>
  );
};

export default PujaDetails;
