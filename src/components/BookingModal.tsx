import { useState } from "react";
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
import { CalendarIcon, Loader2, Minus, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import AuthModal from "@/components/AuthModal";
import { Textarea } from "@/components/ui/textarea";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingType: "puja" | "chadhava" | "prasad" | "darshan";
  itemName: string;
  amount: number;
}

const BookingModal = ({ open, onOpenChange, bookingType, itemName, amount }: BookingModalProps) => {
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [devoteeName, setDevoteeName] = useState("");
  const [gotra, setGotra] = useState("");
  const [date, setDate] = useState<Date>();
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const totalAmount = amount * quantity;

  const handleSubmit = async () => {
    if (!devoteeName.trim()) {
      toast.error("Please enter devotee name");
      return;
    }
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    if (!address.trim()) {
      toast.error("Please enter your address for delivery/communication");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      booking_type: bookingType,
      item_name: itemName,
      devotee_name: devoteeName.trim(),
      gotra: gotra.trim() || null,
      date: format(date, "yyyy-MM-dd"),
      amount: totalAmount,
      quantity,
      delivery_address: address.trim(),
    });

    setSubmitting(false);
    if (error) {
      toast.error("Booking failed. Please try again.");
    } else {
      toast.success("Booking confirmed! 🙏");
      onOpenChange(false);
      setDevoteeName("");
      setGotra("");
      setDate(undefined);
      setQuantity(1);
      setAddress("");
    }
  };

  const typeLabel = bookingType === "puja" ? "Puja" : bookingType === "chadhava" ? "Chadhava" : bookingType === "prasad" ? "Prasad" : "Darshan";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading">Book {typeLabel}</DialogTitle>
        </DialogHeader>

        <div className="rounded-lg bg-muted/50 p-4 mb-2">
          <p className="font-semibold text-sm">{itemName}</p>
          <p className="text-primary font-heading text-lg font-bold">₹{amount.toLocaleString()} <span className="text-xs text-muted-foreground font-normal">per person</span></p>
        </div>

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

          <div>
            <Label>Select Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Address *</Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter full address for prasad delivery / communication"
              rows={3}
            />
          </div>

          {/* Total */}
          {quantity > 1 && (
            <div className="rounded-lg bg-primary/5 p-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">₹{amount.toLocaleString()} × {quantity} people</span>
                <span className="font-heading font-bold text-primary">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          )}

          <Button onClick={handleSubmit} disabled={submitting} className="w-full">
            {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Confirm Booking — ₹{totalAmount.toLocaleString()}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
