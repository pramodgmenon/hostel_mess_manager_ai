import React from "react";
import { cn } from "@/lib/utils";
import { Utensils } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

const AuthLayout = ({
  children,
  title = "Hostel Mess Management",
  subtitle = "Sign in to access your account",
  backgroundImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
}: AuthLayoutProps) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      {/* Left side - Auth form */}
      <div className="flex w-full flex-col justify-center px-4 md:w-1/2 lg:w-2/5 xl:w-1/3">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
              <Utensils className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {title}
            </h1>
            <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
          </div>

          <div className="mt-8">{children}</div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Hostel Mess Management System</p>
          </div>
        </div>
      </div>

      {/* Right side - Background image */}
      <div
        className="hidden md:block md:w-1/2 lg:w-3/5 xl:w-2/3"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex h-full items-center justify-center p-12">
          <div className="max-w-xl text-white">
            <h2 className="text-3xl font-bold">
              Hostel Mess Management System
            </h2>
            <p className="mt-4 text-lg">
              A comprehensive solution for managing student hostel mess
              operations, billing, and payments with role-based access for
              students and management staff.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
