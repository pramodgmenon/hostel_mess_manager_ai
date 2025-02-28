import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreditCard,
  DollarSign,
  History,
  Plus,
  Receipt,
  Wallet,
} from "lucide-react";

interface PaymentHistoryItem {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: "completed" | "pending" | "failed";
}

interface PaymentSectionProps {
  balance?: number;
  paymentHistory?: PaymentHistoryItem[];
}

const PaymentSection = ({
  balance = 2500,
  paymentHistory = [
    {
      id: "1",
      date: "2023-05-15",
      amount: 3000,
      description: "Monthly Meal Plan",
      status: "completed",
    },
    {
      id: "2",
      date: "2023-04-15",
      amount: 3000,
      description: "Monthly Meal Plan",
      status: "completed",
    },
    {
      id: "3",
      date: "2023-03-15",
      amount: 3000,
      description: "Monthly Meal Plan",
      status: "completed",
    },
  ],
}: PaymentSectionProps) => {
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const handlePayment = () => {
    // This would handle the payment processing in a real implementation
    console.log("Processing payment:", {
      amount: paymentAmount,
      method: paymentMethod,
    });
    setIsPaymentDialogOpen(false);
    setPaymentAmount("");
    setPaymentMethod("");
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Payment & Balance
          </h2>
          <p className="text-gray-500">Manage your meal plan payments</p>
        </div>
        <Dialog
          open={isPaymentDialogOpen}
          onOpenChange={setIsPaymentDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0">
              <Plus className="mr-2 h-4 w-4" /> Add Payment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Payment</DialogTitle>
              <DialogDescription>
                Make a payment to your meal plan account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="amount" className="text-sm font-medium">
                  Amount (₹)
                </label>
                <Input
                  id="amount"
                  placeholder="Enter amount"
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="payment-method" className="text-sm font-medium">
                  Payment Method
                </label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger id="payment-method">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="netbanking">Net Banking</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsPaymentDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handlePayment}>Pay Now</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Balance Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wallet className="mr-2 h-5 w-5 text-primary" />
              Current Balance
            </CardTitle>
            <CardDescription>Your available meal plan balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500 mr-2" />
              <span className="text-3xl font-bold">
                ₹{balance.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Receipt className="mr-2 h-4 w-4" /> View Statement
            </Button>
          </CardFooter>
        </Card>

        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>Manage your payments</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button
              className="w-full justify-start"
              onClick={() => setIsPaymentDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Money to Balance
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <History className="mr-2 h-4 w-4" /> View Payment History
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <Receipt className="mr-2 h-4 w-4" /> Download Receipt
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <History className="mr-2 h-5 w-5" /> Payment History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Date
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Description
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">
                  Amount
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-gray-800">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-gray-800">
                    {payment.description}
                  </td>
                  <td className="py-3 px-4 text-right font-medium">
                    ₹{payment.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {getStatusBadge(payment.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {paymentHistory.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No payment history available
          </div>
        )}
        {paymentHistory.length > 0 && (
          <div className="mt-4 text-right">
            <Button variant="link" size="sm">
              View All Transactions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSection;
