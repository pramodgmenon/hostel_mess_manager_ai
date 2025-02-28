import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  Plus,
  Search,
  FileText,
  ShoppingCart,
  Truck,
  BarChart,
  Edit,
  Trash,
  Filter,
} from "lucide-react";

const InventoryPage = () => {
  const [activeTab, setActiveTab] = useState("stock");
  const [showAddItemDialog, setShowAddItemDialog] = useState(false);
  const [showAddSupplierDialog, setShowAddSupplierDialog] = useState(false);

  // Mock inventory data
  const inventoryItems = [
    {
      id: "1",
      name: "Rice",
      category: "Grains",
      quantity: 250,
      unit: "kg",
      reorderLevel: 50,
      lastUpdated: "2023-05-15",
    },
    {
      id: "2",
      name: "Wheat Flour",
      category: "Grains",
      quantity: 150,
      unit: "kg",
      reorderLevel: 30,
      lastUpdated: "2023-05-14",
    },
    {
      id: "3",
      name: "Cooking Oil",
      category: "Oils",
      quantity: 75,
      unit: "liter",
      reorderLevel: 20,
      lastUpdated: "2023-05-13",
    },
    {
      id: "4",
      name: "Sugar",
      category: "Sweeteners",
      quantity: 100,
      unit: "kg",
      reorderLevel: 25,
      lastUpdated: "2023-05-12",
    },
    {
      id: "5",
      name: "Salt",
      category: "Spices",
      quantity: 50,
      unit: "kg",
      reorderLevel: 10,
      lastUpdated: "2023-05-11",
    },
  ];

  // Mock suppliers data
  const suppliers = [
    {
      id: "1",
      name: "Global Foods Supply Co.",
      contact: "John Smith",
      phone: "+91 9876543210",
      email: "john@globalfoods.com",
      address: "123 Main St, Mumbai",
      items: ["Rice", "Wheat Flour", "Sugar"],
    },
    {
      id: "2",
      name: "Fresh Produce Ltd.",
      contact: "Mary Johnson",
      phone: "+91 8765432109",
      email: "mary@freshproduce.com",
      address: "456 Market Rd, Delhi",
      items: ["Vegetables", "Fruits"],
    },
    {
      id: "3",
      name: "Spice Traders Inc.",
      contact: "Raj Patel",
      phone: "+91 7654321098",
      email: "raj@spicetraders.com",
      address: "789 Spice Lane, Chennai",
      items: ["Salt", "Spices", "Herbs"],
    },
  ];

  // Mock transactions data
  const transactions = [
    {
      id: "1",
      date: "2023-05-15",
      type: "Purchase",
      item: "Rice",
      quantity: 100,
      unit: "kg",
      supplier: "Global Foods Supply Co.",
      amount: 5000,
    },
    {
      id: "2",
      date: "2023-05-14",
      type: "Issue",
      item: "Rice",
      quantity: 25,
      unit: "kg",
      supplier: "-",
      amount: 0,
    },
    {
      id: "3",
      date: "2023-05-13",
      type: "Purchase",
      item: "Cooking Oil",
      quantity: 50,
      unit: "liter",
      supplier: "Fresh Produce Ltd.",
      amount: 7500,
    },
    {
      id: "4",
      date: "2023-05-12",
      type: "Return",
      item: "Wheat Flour",
      quantity: 10,
      unit: "kg",
      supplier: "Global Foods Supply Co.",
      amount: 400,
    },
    {
      id: "5",
      date: "2023-05-11",
      type: "Issue",
      item: "Sugar",
      quantity: 15,
      unit: "kg",
      supplier: "-",
      amount: 0,
    },
  ];

  return (
    <DashboardLayout userType="admin" userName="Admin User">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Inventory Management
            </h1>
            <p className="text-muted-foreground">
              Track and manage inventory, suppliers, and transactions
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setShowAddItemDialog(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Item
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="stock">
              <Package className="mr-2 h-4 w-4" /> Current Stock
            </TabsTrigger>
            <TabsTrigger value="suppliers">
              <Truck className="mr-2 h-4 w-4" /> Suppliers
            </TabsTrigger>
            <TabsTrigger value="transactions">
              <ShoppingCart className="mr-2 h-4 w-4" /> Transactions
            </TabsTrigger>
            <TabsTrigger value="reports">
              <BarChart className="mr-2 h-4 w-4" /> Reports
            </TabsTrigger>
          </TabsList>

          {/* Current Stock Tab */}
          <TabsContent value="stock" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search items..." className="pl-8" />
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Inventory Items</CardTitle>
                <CardDescription>
                  Manage your current inventory stock levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Reorder Level</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventoryItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.name}
                          </TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${item.quantity <= item.reorderLevel ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                            >
                              {item.quantity} {item.unit}
                            </span>
                          </TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>
                            {item.reorderLevel} {item.unit}
                          </TableCell>
                          <TableCell>
                            {new Date(item.lastUpdated).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Low Stock Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">3</div>
                  <p className="text-sm text-muted-foreground">
                    Items below reorder level
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {inventoryItems.length}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Items in inventory
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Inventory Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹45,250</div>
                  <p className="text-sm text-muted-foreground">
                    Total value of inventory
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search suppliers..." className="pl-8" />
              </div>
              <Button onClick={() => setShowAddSupplierDialog(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Supplier
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Suppliers</CardTitle>
                <CardDescription>
                  Manage your inventory suppliers and their contact information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Supplier Name</TableHead>
                        <TableHead>Contact Person</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Items Supplied</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {suppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                          <TableCell className="font-medium">
                            {supplier.name}
                          </TableCell>
                          <TableCell>{supplier.contact}</TableCell>
                          <TableCell>{supplier.phone}</TableCell>
                          <TableCell>{supplier.email}</TableCell>
                          <TableCell>{supplier.items.join(", ")}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search transactions..." className="pl-8" />
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" /> Record Purchase
                </Button>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" /> Record Issue
                </Button>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  View all inventory transactions including purchases, issues,
                  and returns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            {new Date(transaction.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${transaction.type === "Purchase" ? "bg-green-100 text-green-800" : transaction.type === "Issue" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"}`}
                            >
                              {transaction.type}
                            </span>
                          </TableCell>
                          <TableCell>{transaction.item}</TableCell>
                          <TableCell>
                            {transaction.quantity} {transaction.unit}
                          </TableCell>
                          <TableCell>{transaction.supplier}</TableCell>
                          <TableCell>
                            {transaction.amount > 0
                              ? `₹${transaction.amount}`
                              : "-"}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Reports</CardTitle>
                  <CardDescription>
                    Generate and download inventory reports
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Current Stock Report</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Detailed report of all inventory items and their current
                      stock levels
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" /> Generate Report
                    </Button>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Low Stock Alert Report</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      List of items that are below their reorder levels
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" /> Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transaction Reports</CardTitle>
                  <CardDescription>
                    Generate and download transaction reports
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Purchase Report</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Summary of all purchases made within a specific time
                      period
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" /> Generate Report
                    </Button>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Consumption Report</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Analysis of item usage and consumption patterns
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" /> Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Item Dialog */}
      <Dialog open={showAddItemDialog} onOpenChange={setShowAddItemDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Inventory Item</DialogTitle>
            <DialogDescription>
              Add a new item to your inventory. Fill in all the required
              details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Item Name
              </label>
              <Input
                id="name"
                placeholder="Enter item name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="category" className="text-right">
                Category
              </label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grains">Grains</SelectItem>
                  <SelectItem value="oils">Oils</SelectItem>
                  <SelectItem value="spices">Spices</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="dairy">Dairy</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="quantity" className="text-right">
                Quantity
              </label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter quantity"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="unit" className="text-right">
                Unit
              </label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kilogram (kg)</SelectItem>
                  <SelectItem value="g">Gram (g)</SelectItem>
                  <SelectItem value="liter">Liter (L)</SelectItem>
                  <SelectItem value="ml">Milliliter (ml)</SelectItem>
                  <SelectItem value="piece">Piece</SelectItem>
                  <SelectItem value="dozen">Dozen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="reorderLevel" className="text-right">
                Reorder Level
              </label>
              <Input
                id="reorderLevel"
                type="number"
                placeholder="Enter reorder level"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddItemDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setShowAddItemDialog(false)}>
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Supplier Dialog */}
      <Dialog
        open={showAddSupplierDialog}
        onOpenChange={setShowAddSupplierDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Supplier</DialogTitle>
            <DialogDescription>
              Add a new supplier to your inventory system. Fill in all the
              required details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="supplierName" className="text-right">
                Supplier Name
              </label>
              <Input
                id="supplierName"
                placeholder="Enter supplier name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="contactPerson" className="text-right">
                Contact Person
              </label>
              <Input
                id="contactPerson"
                placeholder="Enter contact person name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="phone" className="text-right">
                Phone
              </label>
              <Input
                id="phone"
                placeholder="Enter phone number"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="address" className="text-right">
                Address
              </label>
              <Input
                id="address"
                placeholder="Enter address"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="items" className="text-right">
                Items Supplied
              </label>
              <Input
                id="items"
                placeholder="Enter items (comma separated)"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddSupplierDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setShowAddSupplierDialog(false)}>
              Add Supplier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default InventoryPage;
