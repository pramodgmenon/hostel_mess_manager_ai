import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PaymentSection from "@/components/student/PaymentSection";

const PaymentsPage = () => {
  return (
    <DashboardLayout userType="student" userName="John Doe">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Manage your meal plan payments
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <PaymentSection balance={2500} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PaymentsPage;
