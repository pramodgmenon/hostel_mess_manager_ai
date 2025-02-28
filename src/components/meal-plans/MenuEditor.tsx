import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Save, Edit } from "lucide-react";

interface MealOption {
  id: string;
  name: string;
  description: string;
  vegetarian: boolean;
}

interface DayMenu {
  breakfast: MealOption[];
  lunch: MealOption[];
  dinner: MealOption[];
}

interface WeeklyMenu {
  monday: DayMenu;
  tuesday: DayMenu;
  wednesday: DayMenu;
  thursday: DayMenu;
  friday: DayMenu;
  saturday: DayMenu;
  sunday: DayMenu;
}

interface MenuEditorProps {
  weeklyMenu?: WeeklyMenu;
  onSave?: (menu: WeeklyMenu) => void;
}

const defaultMealOption: MealOption = {
  id: "1",
  name: "Sample Meal",
  description: "A delicious sample meal",
  vegetarian: false,
};

const createDefaultDayMenu = (): DayMenu => ({
  breakfast: [{ ...defaultMealOption, id: "1", name: "Breakfast Option 1" }],
  lunch: [{ ...defaultMealOption, id: "2", name: "Lunch Option 1" }],
  dinner: [{ ...defaultMealOption, id: "3", name: "Dinner Option 1" }],
});

const defaultWeeklyMenu: WeeklyMenu = {
  monday: createDefaultDayMenu(),
  tuesday: createDefaultDayMenu(),
  wednesday: createDefaultDayMenu(),
  thursday: createDefaultDayMenu(),
  friday: createDefaultDayMenu(),
  saturday: createDefaultDayMenu(),
  sunday: createDefaultDayMenu(),
};

const MenuEditor: React.FC<MenuEditorProps> = ({
  weeklyMenu = defaultWeeklyMenu,
  onSave = () => {},
}) => {
  const [currentMenu, setCurrentMenu] = useState<WeeklyMenu>(weeklyMenu);
  const [currentDay, setCurrentDay] = useState<keyof WeeklyMenu>("monday");
  const [currentMealType, setCurrentMealType] =
    useState<keyof DayMenu>("breakfast");
  const [editingMeal, setEditingMeal] = useState<MealOption | null>(null);

  const handleAddMealOption = () => {
    const newMeal: MealOption = {
      id: Date.now().toString(),
      name: "New Meal Option",
      description: "Description for the new meal option",
      vegetarian: false,
    };

    setCurrentMenu((prev) => ({
      ...prev,
      [currentDay]: {
        ...prev[currentDay],
        [currentMealType]: [...prev[currentDay][currentMealType], newMeal],
      },
    }));
  };

  const handleDeleteMealOption = (mealId: string) => {
    setCurrentMenu((prev) => ({
      ...prev,
      [currentDay]: {
        ...prev[currentDay],
        [currentMealType]: prev[currentDay][currentMealType].filter(
          (meal) => meal.id !== mealId,
        ),
      },
    }));
  };

  const handleEditMeal = (meal: MealOption) => {
    setEditingMeal(meal);
  };

  const handleSaveMeal = () => {
    if (!editingMeal) return;

    setCurrentMenu((prev) => ({
      ...prev,
      [currentDay]: {
        ...prev[currentDay],
        [currentMealType]: prev[currentDay][currentMealType].map((meal) =>
          meal.id === editingMeal.id ? editingMeal : meal,
        ),
      },
    }));

    setEditingMeal(null);
  };

  const handleSaveMenu = () => {
    onSave(currentMenu);
    alert("Menu saved successfully!");
  };

  const days: Array<keyof WeeklyMenu> = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const mealTypes: Array<keyof DayMenu> = ["breakfast", "lunch", "dinner"];

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">7-Day Rotating Menu Editor</h1>
        <Button onClick={handleSaveMenu}>
          <Save className="mr-2 h-4 w-4" />
          Save Menu
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Menu Navigation</CardTitle>
              <CardDescription>Select day and meal type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Day</label>
                <Select
                  value={currentDay}
                  onValueChange={(value) =>
                    setCurrentDay(value as keyof WeeklyMenu)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Meal Type</label>
                <Select
                  value={currentMealType}
                  onValueChange={(value) =>
                    setCurrentMealType(value as keyof DayMenu)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent>
                    {mealTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>
                    {currentDay.charAt(0).toUpperCase() + currentDay.slice(1)} -{" "}
                    {currentMealType.charAt(0).toUpperCase() +
                      currentMealType.slice(1)}
                  </CardTitle>
                  <CardDescription>
                    Manage meal options for {currentDay}'s {currentMealType}
                  </CardDescription>
                </div>
                <Button onClick={handleAddMealOption}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Option
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentMenu[currentDay][currentMealType].map((meal) => (
                  <Card key={meal.id} className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{meal.name}</h3>
                          <p className="text-sm text-gray-600">
                            {meal.description}
                          </p>
                          <div className="mt-1">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${meal.vegetarian ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                            >
                              {meal.vegetarian
                                ? "Vegetarian"
                                : "Non-Vegetarian"}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditMeal(meal)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteMealOption(meal.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {currentMenu[currentDay][currentMealType].length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No meal options added yet. Click "Add Option" to create one.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {editingMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Meal Option</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={editingMeal.name}
                  onChange={(e) =>
                    setEditingMeal({ ...editingMeal, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input
                  value={editingMeal.description}
                  onChange={(e) =>
                    setEditingMeal({
                      ...editingMeal,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="vegetarian"
                  checked={editingMeal.vegetarian}
                  onChange={(e) =>
                    setEditingMeal({
                      ...editingMeal,
                      vegetarian: e.target.checked,
                    })
                  }
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="vegetarian" className="text-sm font-medium">
                  Vegetarian
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingMeal(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveMeal}>Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MenuEditor;
