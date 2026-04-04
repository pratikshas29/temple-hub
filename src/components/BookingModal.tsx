import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2, Minus, Plus, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import AuthModal from "@/components/AuthModal";
import { festivalStartDate, festivalEndDate } from "@/lib/data";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingType: "puja" | "chadhava" | "prasad" | "darshan";
  itemName: string;
  amount: number;
  isCustomAmount?: boolean;
  minAmount?: number;
}

type Step = 1 | 2 | 3 | "done";

const BookingModal = ({ open, onOpenChange, bookingType, itemName, amount, isCustomAmount, minAmount }: BookingModalProps) => {
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [date, setDate] = useState<Date>(festivalStartDate);
  const [serviceType, setServiceType] = useState<"online" | "offline">("online");
  const [devoteeName, setDevoteeName] = useState("");
  const [gotra, setGotra] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customAmount, setCustomAmount] = useState(amount);
  const [submitting, setSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  // Auto-fill name for returning users
  useEffect(() => {
    if (user && open) {
      const name = user.user_metadata?.full_name || "";
      if (name) setDevoteeName(name);
    }
  }, [user, open]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setStep(1);
      setDate(festivalStartDate);
      setServiceType("online");
      setGotra("");
      setQuantity(1);
      setCustomAmount(amount);
      setBookingId(null);
    }
  }, [open, amount]);

  if (!user) {
    return (
      <>
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-heading">Sign In Required</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground mb-4">
              Please sign in to book {itemName}.
            </p>
            <Button onClick={() => { onOpenChange(false); setAuthOpen(true); }}>
              Sign In
            </Button>
          </DialogContent>
        </Dialog>
        <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      </>
    );
  }

  const unitPrice = isCustomAmount ? customAmount : amount;
  const totalAmount = unitPrice * quantity;

  const handleSubmit = async () => {
    if (!devoteeName.trim()) {
      toast.error("Please enter devotee name");
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase.from("bookings").insert({
      user_id: user.id,
      booking_type: bookingType,
      item_name: itemName,
      devotee_name: devoteeName.trim(),
      gotra: gotra.trim() || null,
      date: format(date, "yyyy-MM-dd"),
      amount: totalAmount,
      quantity,
      notes: serviceType === "offline" ? "Offline (Temple Visit)" : "Online",
    }).select("id").single();

    setSubmitting(false);
    if (error) {
      toast.error("Booking failed. Please try again.");
    } else {
      setBookingId(data?.id || null);
      setStep("done");
    }
  };

  const typeLabel = bookingType === "puja" ? "Puja" : bookingType === "chadhava" ? "Chadhava" : bookingType === "prasad" ? "Naivedya" : "Darshan";

  // Step indicator
  const stepLabels = ["Date & Type", "Details", "Payment"];
  const currentStepNum = step === "done" ? 3 : step;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">Book {typeLabel}</DialogTitle>
          </DialogHeader>

          {/* Step indicator */}
          {step !== "done" && (
            <div className="flex items-center gap-2 mb-2">
              {stepLabels.map((label, i) => (
                <div key={label} className="flex items-center gap-1 flex-1">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                    (i + 1) <= currentStepNum ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    {i + 1}
                  </div>
                  <span className="text-xs text-muted-foreground hidden sm:inline">{label}</span>
                  {i < 2 && <div className="flex-1 h-px bg-border" />}
                </div>
              ))}
            </div>
          )}

          {/* Item info */}
          <div className="rounded-lg bg-muted/50 p-3 mb-2">
            <p className="font-semibold text-sm">{itemName}</p>
            {!isCustomAmount && (
              <p className="text-primary font-heading text-lg font-bold">₹{amount.toLocaleString()}</p>
            )}
            {isCustomAmount && (
              <p className="text-xs text-muted-foreground">Custom amount (min ₹{minAmount})</p>
            )}
          </div>

          {/* STEP 1: Date & Type */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label>Select Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(date, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => d && setDate(d)}
                      disabled={(d) => d < new Date() || d < festivalStartDate || d > festivalEndDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-muted-foreground mt-1">Festival: 22 Sep – 7 Oct 2026</p>
              </div>

              <div>
                <Label>Service Type</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setServiceType("online")}
                    className={cn(
                      "rounded-lg border p-3 text-sm font-medium text-center transition-all",
                      serviceType === "online" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    🖥️ Online
                    <span className="block text-xs mt-0.5">No temple visit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType("offline")}
                    className={cn(
                      "rounded-lg border p-3 text-sm font-medium text-center transition-all",
                      serviceType === "offline" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    🛕 Offline
                    <span className="block text-xs mt-0.5">Temple visit</span>
                  </button>
                </div>
              </div>

              <Button onClick={() => setStep(2)} className="w-full">
                Continue →
              </Button>
            </div>
          )}

          {/* STEP 2: Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="devotee_name">Devotee Name *</Label>
                <Input
                  id="devotee_name"
                  value={devoteeName}
                  onChange={(e) => setDevoteeName(e.target.value)}
                  placeholder="Enter devotee's full name"
                />
              </div>
              <div>
                <Label htmlFor="gotra">Gotra (optional)</Label>
                <Input
                  id="gotra"
                  value={gotra}
                  onChange={(e) => setGotra(e.target.value)}
                  placeholder="Enter gotra"
                />
              </div>

              {/* Quantity */}
              <div>
                <Label>Number of People</Label>
                <div className="flex items-center gap-3 mt-1">
                  <Button type="button" variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="font-heading text-lg font-bold w-8 text-center">{quantity}</span>
                  <Button type="button" variant="outline" size="icon" onClick={() => setQuantity(Math.min(50, quantity + 1))}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Custom amount */}
              {isCustomAmount && (
                <div>
                  <Label htmlFor="custom_amount">Amount (₹) *</Label>
                  <Input
                    id="custom_amount"
                    type="number"
                    min={minAmount || 10}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(Math.max(minAmount || 10, Number(e.target.value)))}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Minimum: ₹{minAmount}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">← Back</Button>
                <Button onClick={() => {
                  if (!devoteeName.trim()) { toast.error("Please enter devotee name"); return; }
                  setStep(3);
                }} className="flex-1">Continue →</Button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Summary */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Puja / Service</span>
                  <span className="font-medium">{itemName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{format(date, "PPP")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">{serviceType === "online" ? "Online" : "Offline (Temple Visit)"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Devotee</span>
                  <span className="font-medium">{devoteeName}</span>
                </div>
                {gotra && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Gotra</span>
                    <span className="font-medium">{gotra}</span>
                  </div>
                )}
                {quantity > 1 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">People</span>
                    <span className="font-medium">{quantity} × ₹{unitPrice.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-heading text-xl font-bold text-primary">₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">← Back</Button>
                <Button onClick={handleSubmit} disabled={submitting} className="flex-1">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Pay ₹{totalAmount.toLocaleString()}
                </Button>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Payment gateway coming soon. Booking will be confirmed instantly.
              </p>
            </div>
          )}

          {/* DONE: Confirmation */}
          {step === "done" && (
            <div className="text-center py-4 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
              <h3 className="font-heading text-xl font-bold">Booking Confirmed! 🙏</h3>
              {bookingId && (
                <p className="text-sm text-muted-foreground">
                  Booking ID: <span className="font-mono font-semibold text-foreground">{bookingId.slice(0, 8).toUpperCase()}</span>
                </p>
              )}
              <div className="rounded-lg bg-muted/50 p-4 text-left space-y-1 text-sm">
                <p><span className="text-muted-foreground">Service:</span> {itemName}</p>
                <p><span className="text-muted-foreground">Date:</span> {format(date, "PPP")}</p>
                <p><span className="text-muted-foreground">Amount:</span> ₹{totalAmount.toLocaleString()}</p>
                <p><span className="text-muted-foreground">Devotee:</span> {devoteeName}</p>
              </div>
              <Button onClick={() => onOpenChange(false)} className="w-full">Done</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingModal;
