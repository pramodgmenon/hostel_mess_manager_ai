import React from "react";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  CreditCard,
  Package,
  FileText,
  Calendar,
  Users,
  ShoppingCart,
} from "lucide-react";

interface QuickActionProps {
  actions?: Array<{
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    variant?: "default" | "secondary" | "outline";
  }>;
}

const QuickActions = ({
  actions = [
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
    {
      label: "Meal Schedule",
      icon: <Calendar className="mr-2 h-4 w-4" />,
      onClick: () => console.log("Meal Schedule clicked"),
      variant: "outline",
    },
    {
      label: "Manage Students",
      icon: <Users className="mr-2 h-4 w-4" />,
      onClick: () => console.log("Manage Students clicked"),
      variant: "outline",
    },
    {
      label: "Suppliers",
      icon: <ShoppingCart className="mr-2 h-4 w-4" />,
      onClick: () => console.log("Suppliers clicked"),
      variant: "outline",
    },
  ],
}: QuickActionProps) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-3">Quick Actions</h2>
      <div className="flex flex-wrap gap-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            onClick={action.onClick}
            className="flex items-center"
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
