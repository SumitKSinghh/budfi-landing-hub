import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2, CheckCircle } from "lucide-react";

interface PurchaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PurchaseDialog = ({ isOpen, onClose }: PurchaseDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch product ID on mount
  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id")
        .eq("name", "AI Masterclass: From Zero to Hero")
        .maybeSingle();

      if (data) {
        setProductId(data.id);
      }
    };
    fetchProduct();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productId) {
      toast({
        title: "Error",
        description: "Product not found. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Basic phone validation (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      toast({
        title: "Error",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create Razorpay order
      const { data: orderData, error: orderError } = await supabase.functions.invoke(
        "create-razorpay-order",
        {
          body: { name, email, phone, productId },
        }
      );

      if (orderError || !orderData) {
        throw new Error(orderError?.message || "Failed to create order");
      }

      // Open Razorpay checkout
      const options = {
        key: orderData.razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "AI Masterclass",
        description: "AI Masterclass: From Zero to Hero",
        order_id: orderData.razorpayOrderId,
        prefill: {
          name: orderData.customerName,
          email: orderData.customerEmail,
          contact: orderData.customerPhone,
        },
        theme: {
          color: "#00f0ff",
        },
        handler: async function (response: any) {
          try {
            // Verify payment
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
              "verify-razorpay-payment",
              {
                body: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  orderId: orderData.orderId,
                },
              }
            );

            if (verifyError) {
              throw new Error(verifyError.message);
            }

            setPaymentSuccess(true);
            toast({
              title: "Payment Successful!",
              description: "Thank you for your purchase. You will receive the download link on your email shortly.",
            });
          } catch (err: any) {
            toast({
              title: "Payment Verification Failed",
              description: err.message || "Please contact support.",
              variant: "destructive",
            });
          }
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setIsLoading(false);
    } catch (err: any) {
      console.error("Error:", err);
      toast({
        title: "Error",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPaymentSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md glass border-border/50">
        {paymentSuccess ? (
          <div className="flex flex-col items-center py-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <DialogTitle className="text-2xl font-heading mb-2">
              Payment Successful!
            </DialogTitle>
            <p className="text-muted-foreground">
              Thank you for your purchase. You will receive the download link on your registered email shortly.
            </p>
            <Button onClick={handleClose} className="mt-6">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-heading">
                Purchase AI Masterclass
              </DialogTitle>
              <DialogDescription>
                Enter your details to proceed with the payment of ₹99
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your 10-digit phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isLoading}
                  className="bg-background/50"
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Pay ₹99"
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By proceeding, you agree to our terms and conditions. The download link will be sent to your email after successful payment.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseDialog;
