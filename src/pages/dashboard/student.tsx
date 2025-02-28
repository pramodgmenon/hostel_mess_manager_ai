import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import MealPlanSection from "@/components/student/MealPlanSection";
import PaymentSection from "@/components/student/PaymentSection";

interface StudentDashboardProps {
  userName?: string;
  balance?: number;
  activePlan?: {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: "daily" | "weekly" | "monthly";
    isActive: boolean;
    features: string[];
  };
}

const StudentDashboard = ({
  userName = "John Doe",
  balance = 2500,
  activePlan = {
    id: "monthly-standard",
    name: "Monthly Standard",
    description: "Regular meal plan with three meals per day",
    price: 3000,
    duration: "monthly",
    isActive: true,
    features: [
      "Breakfast, Lunch, Dinner",
      "Weekend special meals",
      "Tea/Coffee included",
    ],
  },
}: StudentDashboardProps) => {
  return (
    <DashboardLayout userType="student" userName={userName}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Student Dashboard
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Welcome back, {userName}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Meal Plan Section */}
          <MealPlanSection activePlan={activePlan} />

          {/* Payment Section */}
          <PaymentSection balance={balance} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
