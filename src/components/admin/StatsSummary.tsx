import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Utensils, CreditCard, Package } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({
  title = "Stat Title",
  value = "0",
  icon = <Users />,
  description,
  trend,
}: StatCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted/20 p-1.5 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div
            className={`text-xs mt-2 flex items-center ${trend.isPositive ? "text-green-500" : "text-red-500"}`}
          >
            {trend.isPositive ? "↑" : "↓"} {trend.value}%
            <span className="text-muted-foreground ml-1">
              {trend.isPositive ? "increase" : "decrease"}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface StatsSummaryProps {
  stats?: {
    totalStudents: string;
    activeMealPlans: string;
    pendingPayments: string;
    inventoryStatus: string;
  };
}

const StatsSummary = ({
  stats = {
    totalStudents: "245",
    activeMealPlans: "187",
    pendingPayments: "₹12,500",
    inventoryStatus: "85%",
  },
}: StatsSummaryProps) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={<Users className="h-4 w-4" />}
          description="Registered in hostel mess"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Meal Plans"
          value={stats.activeMealPlans}
          icon={<Utensils className="h-4 w-4" />}
          description="Currently subscribed"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Pending Payments"
          value={stats.pendingPayments}
          icon={<CreditCard className="h-4 w-4" />}
          description="Due this month"
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard
          title="Inventory Status"
          value={stats.inventoryStatus}
          icon={<Package className="h-4 w-4" />}
          description="Current stock level"
        />
      </div>
    </div>
  );
};

export default StatsSummary;
