import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, CreditCard, Package, BarChart3 } from "lucide-react";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color: string;
}

const ModuleCard = ({
  title = "Module Title",
  description = "Module description goes here",
  icon = <Package className="h-8 w-8" />,
  link = "/",
  color = "bg-blue-100",
}: ModuleCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className={`${color} flex flex-row items-center gap-4`}>
        <div className="rounded-full bg-white p-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={link}>Manage {title}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

interface ModuleCardsProps {
  modules?: ModuleCardProps[];
}

const ModuleCards = ({ modules }: ModuleCardsProps) => {
  const defaultModules: ModuleCardProps[] = [
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

  const displayModules = modules || defaultModules;

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">System Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayModules.map((module, index) => (
          <ModuleCard key={index} {...module} />
        ))}
      </div>
    </div>
  );
};

export default ModuleCards;
