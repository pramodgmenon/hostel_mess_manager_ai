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
import { MoreHorizontal, Edit, Trash2, Plus, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

interface MealPlan {
  id: string;
  name: string;
  description: string;
  duration: "daily" | "weekly" | "monthly";
  price: number;
  isActive: boolean;
  createdAt: string;
}

interface MealPlanListProps {
  mealPlans?: MealPlan[];
  isAdmin?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onAdd?: () => void;
  onSelect?: (id: string) => void;
  onToggleActive?: (id: string, active: boolean) => void;
}

const MealPlanList = ({
  mealPlans = [
    {
      id: "1",
      name: "Basic Daily Plan",
      description: "Three meals per day with standard options",
      duration: "daily",
      price: 150,
      isActive: true,
      createdAt: "2023-05-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Premium Weekly Plan",
      description:
        "Three meals per day with premium options and weekend specials",
      duration: "weekly",
      price: 950,
      isActive: true,
      createdAt: "2023-05-10T14:20:00Z",
    },
    {
      id: "3",
      name: "Economy Monthly Plan",
      description: "Three meals per day with basic options at discounted rate",
      duration: "monthly",
      price: 3600,
      isActive: false,
      createdAt: "2023-05-05T09:15:00Z",
    },
  ],
  isAdmin = false,
  onEdit = () => {},
  onDelete = () => {},
  onView = () => {},
  onAdd = () => {},
  onSelect = () => {},
  onToggleActive = () => {},
}: MealPlanListProps) => {
  const [viewType, setViewType] = useState<"cards" | "table">("cards");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  const getDurationBadgeVariant = (duration: string) => {
    switch (duration) {
      case "daily":
        return "default";
      case "weekly":
        return "secondary";
      case "monthly":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Meal Plans</h2>
        <div className="flex items-center gap-4">
          <Tabs
            value={viewType}
            onValueChange={(value) => setViewType(value as "cards" | "table")}
          >
            <TabsList>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="table">Table</TabsTrigger>
            </TabsList>
          </Tabs>
          {isAdmin && (
            <Button onClick={onAdd}>
              <Plus className="mr-2 h-4 w-4" /> Add Meal Plan
            </Button>
          )}
        </div>
      </div>

      {viewType === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mealPlans.map((plan) => (
            <Card key={plan.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription className="mt-2">
                      {plan.description}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={getDurationBadgeVariant(plan.duration)}
                    className="capitalize"
                  >
                    {plan.duration}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold">
                    {formatPrice(plan.price)}
                  </p>
                  {isAdmin && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Active</span>
                      <Switch
                        checked={plan.isActive}
                        onCheckedChange={(checked) =>
                          onToggleActive(plan.id, checked)
                        }
                      />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {isAdmin ? (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(plan.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(plan.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(plan.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => onSelect(plan.id)}>Select Plan</Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              {isAdmin && <TableHead>Status</TableHead>}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mealPlans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">{plan.name}</TableCell>
                <TableCell>{plan.description}</TableCell>
                <TableCell>
                  <Badge
                    variant={getDurationBadgeVariant(plan.duration)}
                    className="capitalize"
                  >
                    {plan.duration}
                  </Badge>
                </TableCell>
                <TableCell>{formatPrice(plan.price)}</TableCell>
                {isAdmin && (
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={plan.isActive}
                        onCheckedChange={(checked) =>
                          onToggleActive(plan.id, checked)
                        }
                      />
                      <span className="text-sm">
                        {plan.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </TableCell>
                )}
                <TableCell className="text-right">
                  {isAdmin ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onView(plan.id)}>
                          <Eye className="h-4 w-4 mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(plan.id)}>
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(plan.id)}>
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Button size="sm" onClick={() => onSelect(plan.id)}>
                      Select
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default MealPlanList;
