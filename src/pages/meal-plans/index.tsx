import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import MealPlanList from "@/components/meal-plans/MealPlanList";
import MealPlanForm from "@/components/meal-plans/MealPlanForm";
import MenuEditor from "@/components/meal-plans/MenuEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info } from "lucide-react";

const MealPlansPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("plans");
  const [isAdmin, setIsAdmin] = useState<boolean>(true); // In a real app, this would be determined by auth
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showMenuEditor, setShowMenuEditor] = useState<boolean>(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [showPlanDetails, setShowPlanDetails] = useState<boolean>(false);

  // Mock data for the selected plan
  const selectedPlan = {
    id: "2",
    name: "Premium Weekly Plan",
    description:
      "Three meals per day with premium options and weekend specials",
    duration: "weekly",
    price: 950,
    isActive: true,
    createdAt: "2023-05-10T14:20:00Z",
  };

  const handleAddPlan = () => {
    setSelectedPlanId(null);
    setShowForm(true);
  };

  const handleEditPlan = (id: string) => {
    setSelectedPlanId(id);
    setShowForm(true);
  };

  const handleViewPlan = (id: string) => {
    setSelectedPlanId(id);
    setShowPlanDetails(true);
  };

  const handleDeletePlan = (id: string) => {
    // In a real app, this would call an API to delete the plan
    console.log(`Deleting plan with id: ${id}`);
  };

  const handleFormSubmit = (data: any) => {
    // In a real app, this would call an API to save the plan
    console.log("Form submitted:", data);
    alert("Meal plan saved successfully!");
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const handleToggleActive = (id: string, active: boolean) => {
    // In a real app, this would call an API to update the plan status
    console.log(`Toggling plan ${id} to ${active ? "active" : "inactive"}`);
  };

  const handleSelectPlan = (id: string) => {
    // In a real app, this would navigate to a confirmation page or show a dialog
    console.log(`Student selected plan with id: ${id}`);
  };

  const handleOpenMenuEditor = () => {
    setShowMenuEditor(true);
  };

  const handleSaveMenu = (menu: any) => {
    // In a real app, this would call an API to save the menu
    console.log("Menu saved:", menu);
    alert("Menu saved successfully!");
    setShowMenuEditor(false);
  };

  return (
    <DashboardLayout userType={isAdmin ? "admin" : "student"}>
      <div className="space-y-6 bg-white">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Meal Plans</h1>
            <p className="text-muted-foreground">
              {isAdmin
                ? "Manage meal plans, pricing, and menu configuration"
                : "View and select meal plans for your hostel stay"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            {isAdmin && (
              <Button onClick={handleOpenMenuEditor}>
                Configure Weekly Menu
              </Button>
            )}
          </div>
        </div>

        <div className="p-6">
          {isAdmin ? (
            <Tabs
              defaultValue="plans"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="mb-6">
                <TabsTrigger value="plans">Meal Plans</TabsTrigger>
                <TabsTrigger value="menu">Weekly Menu</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="plans" className="space-y-4">
                <MealPlanList
                  isAdmin={isAdmin}
                  onAdd={handleAddPlan}
                  onEdit={handleEditPlan}
                  onDelete={handleDeletePlan}
                  onView={handleViewPlan}
                  onToggleActive={handleToggleActive}
                />
              </TabsContent>
              <TabsContent value="menu" className="space-y-4">
                <MenuEditor onSave={handleSaveMenu} />
              </TabsContent>
              <TabsContent value="settings" className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">
                    Meal Plan Settings
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Configure global settings for meal plans and menu options.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Pricing Rules</h3>
                      <p className="text-sm text-gray-500">
                        Configure default pricing and discounts for meal plans.
                      </p>
                    </div>
                    <div className="border p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Dietary Options</h3>
                      <p className="text-sm text-gray-500">
                        Manage available dietary preferences and restrictions.
                      </p>
                    </div>
                    <div className="border p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Meal Timings</h3>
                      <p className="text-sm text-gray-500">
                        Set default serving times for breakfast, lunch, and
                        dinner.
                      </p>
                    </div>
                    <div className="border p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Notifications</h3>
                      <p className="text-sm text-gray-500">
                        Configure meal plan related notifications for students.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <MealPlanList
              isAdmin={isAdmin}
              onSelect={handleSelectPlan}
              onView={handleViewPlan}
            />
          )}
        </div>
      </div>

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedPlanId ? "Edit Meal Plan" : "Create New Meal Plan"}
            </DialogTitle>
            <DialogDescription>
              {selectedPlanId
                ? "Update the details of an existing meal plan"
                : "Configure a new meal plan with pricing and duration details"}
            </DialogDescription>
          </DialogHeader>
          <MealPlanForm
            initialData={
              selectedPlanId
                ? {
                    name: selectedPlan.name,
                    description: selectedPlan.description,
                    duration: selectedPlan.duration as
                      | "daily"
                      | "weekly"
                      | "monthly",
                    price: selectedPlan.price.toString(),
                    isVegetarian: false,
                  }
                : undefined
            }
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>

      {/* Menu Editor Dialog */}
      <Dialog open={showMenuEditor} onOpenChange={setShowMenuEditor}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Weekly Menu Configuration</DialogTitle>
            <DialogDescription>
              Configure the 7-day rotating menu with meal options for each day
            </DialogDescription>
          </DialogHeader>
          <MenuEditor onSave={handleSaveMenu} />
        </DialogContent>
      </Dialog>

      {/* Plan Details Dialog */}
      <Dialog open={showPlanDetails} onOpenChange={setShowPlanDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Meal Plan Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm text-gray-500">Name</h3>
              <p>{selectedPlan.name}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-500">Description</h3>
              <p>{selectedPlan.description}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-500">Duration</h3>
              <p className="capitalize">{selectedPlan.duration}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-500">Price</h3>
              <p>₹{selectedPlan.price}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-500">Status</h3>
              <p>{selectedPlan.isActive ? "Active" : "Inactive"}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-500">Created At</h3>
              <p>{new Date(selectedPlan.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center text-amber-600 bg-amber-50 p-3 rounded-md">
              <Info className="h-4 w-4 mr-2" />
              <p className="text-sm">
                View the weekly menu to see what meals are included in this
                plan.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default MealPlansPage;
