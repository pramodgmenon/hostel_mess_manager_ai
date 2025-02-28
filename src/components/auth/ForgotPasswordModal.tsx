import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, KeyRound, Mail, Phone, RefreshCw } from "lucide-react";

interface ForgotPasswordModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: { mobile: string; otp: string; password: string }) => void;
}

const ForgotPasswordModal = ({
  open = true,
  onOpenChange = () => {},
  onSubmit = () => {},
}: ForgotPasswordModalProps) => {
  const [step, setStep] = useState<"request" | "verify" | "reset">("request");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [method, setMethod] = useState<"mobile" | "email">("mobile");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestOTP = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("verify");
    }, 1000);
  };

  const handleVerifyOTP = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("reset");
    }, 1000);
  };

  const handleResetPassword = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSubmit({ mobile, otp, password });
      onOpenChange(false);
      // Reset form
      setStep("request");
      setMobile("");
      setOtp("");
      setPassword("");
      setConfirmPassword("");
    }, 1000);
  };

  const handleResendOTP = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Show some notification that OTP was resent
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {step === "request" && "Forgot Password"}
            {step === "verify" && "Verify OTP"}
            {step === "reset" && "Reset Password"}
          </DialogTitle>
          <DialogDescription>
            {step === "request" &&
              "Enter your mobile number to receive an OTP."}
            {step === "verify" && "Enter the OTP sent to your mobile number."}
            {step === "reset" && "Create a new password for your account."}
          </DialogDescription>
        </DialogHeader>

        {step === "request" && (
          <div className="grid gap-4 py-4">
            <Tabs
              defaultValue="mobile"
              value={method}
              onValueChange={(value) => setMethod(value as "mobile" | "email")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="mobile" className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  Mobile
                </TabsTrigger>
                <TabsTrigger value="email" className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </TabsTrigger>
              </TabsList>
              <TabsContent value="mobile" className="mt-4">
                <div className="grid gap-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
              </TabsContent>
              <TabsContent value="email" className="mt-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {step === "verify" && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="otp">One-Time Password</Label>
              <Input
                id="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <Button
              variant="link"
              size="sm"
              className="justify-start px-0"
              onClick={handleResendOTP}
              disabled={isLoading}
            >
              <RefreshCw className="mr-2 h-3 w-3" />
              Resend OTP
            </Button>
          </div>
        )}

        {step === "reset" && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        )}

        <DialogFooter>
          {step === "request" && (
            <Button
              onClick={handleRequestOTP}
              disabled={isLoading || (method === "mobile" ? !mobile : !email)}
              className="w-full"
            >
              {isLoading ? "Sending..." : "Send OTP"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          )}

          {step === "verify" && (
            <Button
              onClick={handleVerifyOTP}
              disabled={isLoading || !otp}
              className="w-full"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          )}

          {step === "reset" && (
            <Button
              onClick={handleResetPassword}
              disabled={
                isLoading ||
                !password ||
                !confirmPassword ||
                password !== confirmPassword
              }
              className="w-full"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
              {!isLoading && <KeyRound className="ml-2 h-4 w-4" />}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
