import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsSummary from "@/components/admin/StatsSummary";
import QuickActions from "@/components/admin/QuickActions";
import ModuleCards from "@/components/admin/ModuleCards";
import {
  PlusCircle,
  CreditCard,
  Package,
  FileText,
  Utensils,
  BarChart3,
  Users,
} from "lucide-react";

const AdminDashboard = () => {
  // Stats data for the dashboard
  const statsData = {
    totalStudents: "245",
    activeMealPlans: "187",
    pendingPayments: "₹12,500",
    inventoryStatus: "85%",
  };

  // Quick actions for the admin dashboard
  const quickActions = [
    {
      label: "Add Meal Plan",
      icon: <PlusCircle className="mr-2 h-4 w-4" />,
      onClick: () => console.log("Add Meal Plan clicked"),
      variant: "default",
    },
    {
      label: "Record Payment",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
      onClick: () => console.log("Record Payment clicked"),
      variant: "secondary",
    },
    {
      label: "Manage Inventory",
      icon: <Package className="mr-2 h-4 w-4" />,
      onClick: () => console.log("Manage Inventory clicked"),
      variant: "outline",
    },
    {
      label: "Generate Report",
      icon: <FileText className="mr-2 h-4 w-4" />,
      onClick: () => console.log("Generate Report clicked"),
      variant: "outline",
    },
  ];

  // Module cards for the system modules
  const modules = [
    {
      title: "Meal Plan Management",
      description:
        "Configure pricing for daily, weekly, and monthly meal packages with customizable 7-day rotating menu.",
      icon: <Utensils className="h-8 w-8 text-orange-600" />,
      link: "/meal-plans",
      color: "bg-orange-100",
    },
    {
      title: "Payment System",
      description:
        "Handle advance payments from students, generate receipts, and track payment status.",
      icon: <CreditCard className="h-8 w-8 text-green-600" />,
      link: "/payments",
      color: "bg-green-100",
    },
    {
      title: "Inventory Management",
      description:
        "Track purchases, manage supplier invoices, handle store operations including receipts, issues, and returns.",
      icon: <Package className="h-8 w-8 text-blue-600" />,
      link: "/inventory",
      color: "bg-blue-100",
    },
    {
      title: "Reporting Dashboard",
      description:
        "Generate financial reports for payment dues, monthly expenses, and income with visual analytics.",
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      link: "/reports",
      color: "bg-purple-100",
    },
  ];

  return (
    <DashboardLayout userType="admin" userName="Admin User">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back, Admin User
          </p>
        </div>

        {/* Stats Summary Section */}
        <StatsSummary stats={statsData} />

        {/* Quick Actions Section */}
        <QuickActions actions={quickActions} />

        {/* System Modules Section */}
        <ModuleCards modules={modules} />

        {/* Recent Activity Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Activity items */}
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 p-3 border-b last:border-0"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {item === 1 ? (
                    <Utensils className="h-5 w-5" />
                  ) : item === 2 ? (
                    <CreditCard className="h-5 w-5" />
                  ) : (
                    <Users className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {item === 1
                      ? "New meal plan created"
                      : item === 2
                        ? "Payment received"
                        : "New student registered"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item === 1
                      ? "Premium Monthly Plan was added to the system"
                      : item === 2
                        ? "₹3,000 received from John Doe"
                        : "Sarah Johnson registered for the meal service"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item === 1
                      ? "10 minutes ago"
                      : item === 2
                        ? "1 hour ago"
                        : "3 hours ago"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
