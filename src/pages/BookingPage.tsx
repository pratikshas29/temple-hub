import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { pujas, chadhavaItems, prasadItems, otherServices, darshanSlots, templeEvents, festivalStartDate, festivalEndDate, templeInfo } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalendarIcon, Loader2, Minus, Plus, CheckCircle2, ArrowLeft, Package } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Step = 1 | 2 | 3 | 4 | "done";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const BookingPage = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

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

  const [step, setStep] = useState<Step>(1);
  const [date, setDate] = useState<Date>(festivalStartDate);
  const [serviceType, setServiceType] = useState<"online" | "offline">("online");
  const [devoteeName, setDevoteeName] = useState(searchParams.get("name") || "");
  const [gotra, setGotra] = useState("");
  const [address, setAddress] = useState("");
  const [whatsappPhone, setWhatsappPhone] = useState(searchParams.get("phone") || "");
  const [quantity, setQuantity] = useState(1);
  const [customAmount, setCustomAmount] = useState(item && 'price' in item ? item.price : 0);
  const [submitting, setSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  // Chadhava addon
  const [selectedChadhava, setSelectedChadhava] = useState<string[]>([]);

  // Aashirwad box
  const [wantsAashirwad, setWantsAashirwad] = useState<boolean | null>(null);
  const [aashirwadAddress, setAashirwadAddress] = useState("");
  const [aashirwadPhone, setAashirwadPhone] = useState("");
  const [aashirwadGotra, setAashirwadGotra] = useState("");

  // Summary modal
  const [showSummary, setShowSummary] = useState(false);

  const isCustomAmount = item && 'isCustomAmount' in item ? item.isCustomAmount : false;
  const minAmount = item && 'minAmount' in item ? item.minAmount : undefined;
  const itemPrice = item && 'price' in item ? item.price : 0;
  const itemName = item && 'title' in item ? item.title : "";

  useEffect(() => {
    if (item && 'price' in item) setCustomAmount(item.price);
  }, [item]);

  useEffect(() => {
    if (user) {
      if (!devoteeName) {
        const name = user.user_metadata?.full_name || "";
        if (name) setDevoteeName(name);
      }
      supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle().then(({ data }) => {
        if (data) {
          if (!address && data.address) setAddress([data.address, data.city, data.state, data.pincode].filter(Boolean).join(", "));
          if (!whatsappPhone && data.phone) setWhatsappPhone(data.phone);
        }
      });
    }
  }, [user]);

  // Load Razorpay
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

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

  const unitPrice = isCustomAmount ? customAmount : itemPrice;
  const chadhavaTotal = selectedChadhava.reduce((sum, cid) => {
    const ci = chadhavaItems.find(c => c.id === cid);
    return sum + (ci?.price || 0);
  }, 0);
  const totalAmount = (unitPrice * quantity) + chadhavaTotal;

  const bookingType = type === "naivedya" ? "prasad" : type === "other" ? "prasad" : type === "event" ? "puja" : (type as "puja" | "chadhava" | "darshan");

  const handleRazorpayPayment = () => {
    if (!window.Razorpay) {
      toast.error("Payment gateway loading. Please try again.");
      return;
    }
    const options = {
      key: "rzp_test_1234567890",
      amount: totalAmount * 100,
      currency: "INR",
      name: templeInfo.name,
      description: `${itemName} - ${format(date, "PPP")}`,
      handler: async (response: any) => {
        await saveBooking(response.razorpay_payment_id);
      },
      prefill: { name: devoteeName, email: user?.email || "", contact: whatsappPhone },
      theme: { color: "#E85D04" },
      method: { upi: true, card: true, netbanking: true, wallet: true },
      modal: { ondismiss: () => toast.info("Payment cancelled") },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const saveBooking = async (paymentId?: string) => {
    if (!user) return;
    setSubmitting(true);
    const chadhavaNames = selectedChadhava.map(cid => chadhavaItems.find(c => c.id === cid)?.title).filter(Boolean);
    const { data, error } = await supabase.from("bookings").insert({
      user_id: user.id,
      booking_type: bookingType,
      item_name: itemName,
      devotee_name: devoteeName.trim(),
      gotra: (wantsAashirwad ? aashirwadGotra : gotra).trim() || null,
      date: format(date, "yyyy-MM-dd"),
      amount: totalAmount,
      quantity,
      delivery_address: (wantsAashirwad ? aashirwadAddress : address).trim() || null,
      notes: [
        serviceType === "offline" ? "Offline (Temple Visit)" : "Online",
        paymentId ? `Payment: ${paymentId}` : "Payment pending",
        whatsappPhone ? `WhatsApp: ${whatsappPhone}` : "",
        wantsAashirwad ? "Aashirwad Box: Yes" : "",
        chadhavaNames.length > 0 ? `Add-ons: ${chadhavaNames.join(", ")}` : "",
      ].filter(Boolean).join(" | "),
    }).select("id").single();

    setSubmitting(false);
    if (error) {
      toast.error("Booking failed. Please try again.");
    } else {
      setBookingId(data?.id || null);
      setStep("done");
      toast.success("Booking confirmed! 🙏");
    }
  };

  const handleContinueToSummary = () => {
    if (!devoteeName.trim()) { toast.error("Please enter devotee name"); return; }
    setShowSummary(true);
  };

  const handleConfirmAndPay = () => {
    setShowSummary(false);
    handleRazorpayPayment();
  };

  const stepLabels = ["Date & Type", "Details & Add-ons", "Aashirwad Box", "Confirm"];
  const currentStepNum = step === "done" ? 4 : step;

  if (!authLoading && !user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-24 max-w-lg mx-auto text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">Sign In Required</h1>
          <p className="text-muted-foreground mb-6">Please sign in to book {itemName}.</p>
          <Button onClick={() => setAuthOpen(true)} className="w-full">Sign In</Button>
          <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-12 pt-24 max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="rounded-xl bg-card shadow-card p-6 mb-6">
            <h1 className="font-heading text-2xl font-bold mb-1">{itemName}</h1>
            {item && 'description' in item && <p className="text-sm text-muted-foreground mb-2">{(item as any).description}</p>}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>🛕 {templeInfo.name}</span>
            </div>
            {!isCustomAmount && <p className="font-heading text-2xl font-bold text-primary mt-2">₹{itemPrice.toLocaleString()}</p>}
            {isCustomAmount && <p className="text-sm text-muted-foreground mt-2">Custom amount (min ₹{minAmount})</p>}
          </div>

          {/* Step indicator */}
          {step !== "done" && (
            <div className="flex items-center gap-1 mb-6">
              {stepLabels.map((label, i) => (
                <div key={label} className="flex items-center gap-1 flex-1">
                  <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
                    (i + 1) <= currentStepNum ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>{i + 1}</div>
                  <span className="text-xs text-muted-foreground hidden sm:inline truncate">{label}</span>
                  {i < stepLabels.length - 1 && <div className="flex-1 h-px bg-border" />}
                </div>
              ))}
            </div>
          )}

          {/* STEP 1: Date & Type */}
          {step === 1 && (
            <div className="rounded-xl bg-card shadow-card p-6 space-y-5">
              <div>
                <Label>Select Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                      <CalendarIcon className="mr-2 h-4 w-4" />{format(date, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} disabled={(d) => d < new Date() || d < festivalStartDate || d > festivalEndDate} initialFocus className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-muted-foreground mt-1">Festival: 22 Sep – 7 Oct 2026</p>
              </div>
              <div>
                <Label>Service Type</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button type="button" onClick={() => setServiceType("online")}
                    className={cn("rounded-lg border p-3 text-sm font-medium text-center transition-all",
                      serviceType === "online" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"
                    )}>🖥️ Online<span className="block text-xs mt-0.5">No temple visit</span></button>
                  <button type="button" onClick={() => setServiceType("offline")}
                    className={cn("rounded-lg border p-3 text-sm font-medium text-center transition-all",
                      serviceType === "offline" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"
                    )}>🛕 Offline<span className="block text-xs mt-0.5">Temple visit</span></button>
                </div>
              </div>
              <Button onClick={() => setStep(2)} className="w-full">Continue →</Button>
            </div>
          )}

          {/* STEP 2: Details + Chadhava addons */}
          {step === 2 && (
            <div className="rounded-xl bg-card shadow-card p-6 space-y-5">
              <div>
                <Label htmlFor="devotee_name">Devotee Name *</Label>
                <Input id="devotee_name" value={devoteeName} onChange={(e) => setDevoteeName(e.target.value)} placeholder="Enter devotee's full name" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="gotra">Gotra (optional)</Label>
                <Input id="gotra" value={gotra} onChange={(e) => setGotra(e.target.value)} placeholder="Enter gotra" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="address">Address (optional)</Label>
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter delivery / correspondence address" className="mt-1" />
              </div>
              <div>
                <Label>Number of People</Label>
                <div className="flex items-center gap-3 mt-1">
                  <Button type="button" variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}><Minus className="w-4 h-4" /></Button>
                  <span className="font-heading text-lg font-bold w-8 text-center">{quantity}</span>
                  <Button type="button" variant="outline" size="icon" onClick={() => setQuantity(Math.min(50, quantity + 1))}><Plus className="w-4 h-4" /></Button>
                </div>
              </div>
              {isCustomAmount && (
                <div>
                  <Label htmlFor="custom_amount">Amount (₹) *</Label>
                  <Input id="custom_amount" type="number" min={minAmount || 10} value={customAmount}
                    onChange={(e) => setCustomAmount(Math.max(minAmount || 10, Number(e.target.value)))} className="mt-1" />
                  <p className="text-xs text-muted-foreground mt-1">Minimum: ₹{minAmount}</p>
                </div>
              )}

              {/* Chadhava add-on section */}
              <div className="border-t border-border pt-4">
                <h3 className="font-heading font-semibold mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" /> Add Chadhava / Arpan
                </h3>
                <div className="space-y-2">
                  {chadhavaItems.map(ci => (
                    <label key={ci.id} className={cn("flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-all",
                      selectedChadhava.includes(ci.id) ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    )}>
                      <input type="checkbox" checked={selectedChadhava.includes(ci.id)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedChadhava([...selectedChadhava, ci.id]);
                          else setSelectedChadhava(selectedChadhava.filter(x => x !== ci.id));
                        }}
                        className="accent-primary w-4 h-4" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{ci.title}</p>
                        <p className="text-xs text-muted-foreground">{ci.description}</p>
                      </div>
                      <span className="font-semibold text-primary text-sm">₹{ci.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">← Back</Button>
                <Button onClick={() => setStep(3)} className="flex-1">Continue →</Button>
              </div>
            </div>
          )}

          {/* STEP 3: Aashirwad Box */}
          {step === 3 && (
            <div className="rounded-xl bg-card shadow-card p-6 space-y-5">
              <h2 className="font-heading text-lg font-semibold">Would you like to receive the Aashirwad Box?</h2>
              <p className="text-sm text-muted-foreground">Receive sacred prasad, kumkum, and blessings at your doorstep.</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setWantsAashirwad(true)}
                  className={cn("rounded-lg border p-4 text-center transition-all",
                    wantsAashirwad === true ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"
                  )}>
                  <span className="text-2xl block mb-1">📦</span>
                  <span className="font-semibold text-sm">Yes, Send Me</span>
                </button>
                <button onClick={() => setWantsAashirwad(false)}
                  className={cn("rounded-lg border p-4 text-center transition-all",
                    wantsAashirwad === false ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"
                  )}>
                  <span className="text-2xl block mb-1">🙏</span>
                  <span className="font-semibold text-sm">No, Thank You</span>
                </button>
              </div>

              {wantsAashirwad && (
                <div className="space-y-4 border-t border-border pt-4">
                  <div>
                    <Label htmlFor="aa_address">Delivery Address *</Label>
                    <Input id="aa_address" value={aashirwadAddress} onChange={e => setAashirwadAddress(e.target.value)} placeholder="Full delivery address" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="aa_phone">WhatsApp Number *</Label>
                    <Input id="aa_phone" type="tel" value={aashirwadPhone} onChange={e => setAashirwadPhone(e.target.value)} placeholder="Enter WhatsApp number" className="mt-1" maxLength={10} />
                  </div>
                  <div>
                    <Label htmlFor="aa_gotra">Gotra (optional)</Label>
                    <Input id="aa_gotra" value={aashirwadGotra} onChange={e => setAashirwadGotra(e.target.value)} placeholder="Enter gotra" className="mt-1" />
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">← Back</Button>
                <Button onClick={() => {
                  if (wantsAashirwad === null) { toast.error("Please select an option"); return; }
                  if (wantsAashirwad && !aashirwadAddress.trim()) { toast.error("Please enter delivery address"); return; }
                  if (wantsAashirwad && !aashirwadPhone.trim()) { toast.error("Please enter WhatsApp number"); return; }
                  handleContinueToSummary();
                }} className="flex-1">Continue →</Button>
              </div>
            </div>
          )}

          {/* DONE */}
          {step === "done" && (
            <div className="rounded-xl bg-card shadow-card p-8 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
              <h2 className="font-heading text-xl font-bold">Booking Confirmed! 🙏</h2>
              {bookingId && (
                <p className="text-sm text-muted-foreground">Booking ID: <span className="font-mono font-semibold text-foreground">{bookingId.slice(0, 8).toUpperCase()}</span></p>
              )}
              <div className="rounded-lg bg-muted/50 p-4 text-left space-y-1 text-sm">
                <p><span className="text-muted-foreground">Service:</span> {itemName}</p>
                <p><span className="text-muted-foreground">Date:</span> {format(date, "PPP")}</p>
                <p><span className="text-muted-foreground">Type:</span> {serviceType === "online" ? "Online" : "Offline (Temple Visit)"}</p>
                <p><span className="text-muted-foreground">Amount:</span> ₹{totalAmount.toLocaleString()}</p>
                <p><span className="text-muted-foreground">Devotee:</span> {devoteeName}</p>
                {gotra && <p><span className="text-muted-foreground">Gotra:</span> {gotra}</p>}
                {selectedChadhava.length > 0 && <p><span className="text-muted-foreground">Add-ons:</span> {selectedChadhava.map(cid => chadhavaItems.find(c => c.id === cid)?.title).join(", ")}</p>}
                {wantsAashirwad && <p><span className="text-muted-foreground">Aashirwad Box:</span> Yes</p>}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => navigate("/my-bookings")} className="flex-1">View Bookings</Button>
                <Button onClick={() => navigate("/pujas")} className="flex-1">Book More</Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Summary Modal */}
      <Dialog open={showSummary} onOpenChange={setShowSummary}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Booking Summary</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <div className="rounded-lg border border-border p-4 space-y-2">
              <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{itemName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{format(date, "PPP")}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium">{serviceType === "online" ? "Online" : "Offline"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Devotee</span><span className="font-medium">{devoteeName}</span></div>
              {(gotra || aashirwadGotra) && <div className="flex justify-between"><span className="text-muted-foreground">Gotra</span><span className="font-medium">{wantsAashirwad ? aashirwadGotra : gotra}</span></div>}
              <div className="flex justify-between"><span className="text-muted-foreground">Quantity</span><span className="font-medium">{quantity} person(s)</span></div>
              {selectedChadhava.length > 0 && (
                <div className="flex justify-between"><span className="text-muted-foreground">Add-ons</span><span className="font-medium text-right">{selectedChadhava.map(cid => chadhavaItems.find(c => c.id === cid)?.title).join(", ")}</span></div>
              )}
              {wantsAashirwad && (
                <>
                  <div className="flex justify-between"><span className="text-muted-foreground">Aashirwad Box</span><span className="font-medium text-primary">Yes</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="font-medium text-right max-w-[200px]">{aashirwadAddress}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">WhatsApp</span><span className="font-medium">{aashirwadPhone}</span></div>
                </>
              )}
              <div className="border-t border-border pt-2 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-heading text-xl font-bold text-primary">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>
            <Button onClick={handleConfirmAndPay} disabled={submitting} className="w-full bg-gradient-sacred text-primary-foreground font-semibold">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Pay ₹{totalAmount.toLocaleString()}
            </Button>
            <p className="text-xs text-center text-muted-foreground">Powered by Razorpay · UPI, Cards, Net Banking accepted</p>
          </div>
        </DialogContent>
      </Dialog>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      <Footer />
    </div>
  );
};

export default BookingPage;
