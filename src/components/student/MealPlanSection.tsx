import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight, Clock, Info } from "lucide-react";

interface MealOption {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: "daily" | "weekly" | "monthly";
  isActive: boolean;
  features: string[];
}

interface MealPlanSectionProps {
  activePlan?: MealOption;
  availablePlans?: MealOption[];
  onSelectPlan?: (plan: MealOption) => void;
}

const MealPlanSection = ({
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
  } as MealOption,
  availablePlans = [
    {
      id: "daily-basic",
      name: "Daily Basic",
      description: "Basic meal plan for a single day",
      price: 150,
      duration: "daily",
      isActive: false,
      features: ["Breakfast, Lunch, Dinner", "Pay as you go"],
    },
    {
      id: "weekly-standard",
      name: "Weekly Standard",
      description: "Standard meal plan for a week",
      price: 900,
      duration: "weekly",
      isActive: false,
      features: ["Breakfast, Lunch, Dinner", "Weekend special meals"],
    },
    {
      id: "monthly-premium",
      name: "Monthly Premium",
      description: "Premium meal plan with additional benefits",
      price: 3500,
      duration: "monthly",
      isActive: false,
      features: [
        "Breakfast, Lunch, Dinner",
        "Weekend special meals",
        "Tea/Coffee included",
        "Snacks included",
        "Special diet options",
      ],
    },
  ],
  onSelectPlan = () => {},
}: MealPlanSectionProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (plan: MealOption) => {
    setSelectedPlan(plan.id);
    onSelectPlan(plan);
  };

  const getDurationLabel = (duration: string) => {
    switch (duration) {
      case "daily":
        return "per day";
      case "weekly":
        return "per week";
      case "monthly":
        return "per month";
      default:
        return "";
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Meal Plans</h2>
        <p className="text-gray-600">
          Choose a meal plan that suits your needs
        </p>
      </div>

      {/* Active Plan */}
      {activePlan && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Your Current Plan
          </h3>
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{activePlan.name}</CardTitle>
                  <CardDescription>{activePlan.description}</CardDescription>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Check size={12} />
                  <span>Active</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">
                    ₹{activePlan.price}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    {getDurationLabel(activePlan.duration)}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={16} className="mr-1" />
                  <span>Renews on 30 May, 2023</span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {activePlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">View Menu</Button>
              <Button
                variant="outline"
                className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
              >
                Cancel Plan
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Available Plans */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-gray-700">Available Plans</h3>
          <Button variant="ghost" size="sm" className="flex items-center">
            View all plans <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availablePlans.map((plan) => (
            <Card
              key={plan.id}
              className={`cursor-pointer transition-all hover:border-primary/50 hover:shadow-md ${selectedPlan === plan.id ? "border-primary/70 ring-1 ring-primary/50" : ""}`}
              onClick={() => handleSelectPlan(plan)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold">₹{plan.price}</span>
                  <span className="text-sm text-gray-500 ml-1">
                    {getDurationLabel(plan.duration)}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Check size={14} className="text-green-500 mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={selectedPlan === plan.id ? "default" : "outline"}
                >
                  {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <Info size={14} className="mr-1" />
          <span>
            Meal plans can be changed at any time. Changes will take effect from
            the next billing cycle.
          </span>
        </div>
      </div>
    </div>
  );
};

export default MealPlanSection;
