import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import LoginForm from "./auth/LoginForm";
import ForgotPasswordModal from "./auth/ForgotPasswordModal";
import { cn } from "@/lib/utils";
import { Utensils } from "lucide-react";

const Home = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLoginSubmit = (data: any) => {
    console.log("Login submitted:", data);
    // Sample user credentials for demo purposes
    const users = {
      student: { mobile: "9876543210", password: "student123" },
      management: { mobile: "1234567890", password: "admin123" },
    };

    if (
      data.userType === "student" &&
      data.mobileNumber === users.student.mobile &&
      data.password === users.student.password
    ) {
      window.location.href = "/dashboard/student";
    } else if (
      data.userType === "management" &&
      data.mobileNumber === users.management.mobile &&
      data.password === users.management.password
    ) {
      window.location.href = "/dashboard/admin";
    } else {
      alert(
        "Invalid credentials. Please try again.\n\nUse these credentials:\n\nStudent: 9876543210 / student123\nAdmin: 1234567890 / admin123",
      );
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleForgotPasswordSubmit = (data: any) => {
    console.log("Forgot password submitted:", data);
    // In a real app, this would handle the password reset process
    setShowForgotPassword(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <AuthLayout
        title="Hostel Mess Management"
        subtitle="Sign in to access your account"
        backgroundImage="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
      >
        <LoginForm
          onSubmit={handleLoginSubmit}
          onForgotPassword={handleForgotPassword}
        />
      </AuthLayout>

      <ForgotPasswordModal
        open={showForgotPassword}
        onOpenChange={setShowForgotPassword}
        onSubmit={handleForgotPasswordSubmit}
      />
    </div>
  );
};

export default Home;
