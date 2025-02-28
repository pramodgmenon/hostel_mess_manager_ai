import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  LineChart,
  PieChart,
  Calendar,
  Download,
  FileText,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Utensils,
  Package,
} from "lucide-react";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("financial");
  const [dateRange, setDateRange] = useState("month");

  return (
    <DashboardLayout userType="admin" userName="Admin User">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Reports Dashboard
            </h1>
            <p className="text-muted-foreground">
              Generate and view financial and operational reports
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last 3 months</SelectItem>
                <SelectItem value="year">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" /> Custom Range
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" /> Export Reports
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,25,450</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">+12.5%</span> from
                last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Meal Plans
              </CardTitle>
              <Utensils className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">187</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">+8.2%</span> from
                last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Payments
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹12,500</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-500 font-medium">+5.1%</span> from
                last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Inventory Value
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹45,250</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">-2.5%</span> from
                last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="financial">
              <DollarSign className="mr-2 h-4 w-4" /> Financial Reports
            </TabsTrigger>
            <TabsTrigger value="operational">
              <Utensils className="mr-2 h-4 w-4" /> Operational Reports
            </TabsTrigger>
            <TabsTrigger value="inventory">
              <Package className="mr-2 h-4 w-4" /> Inventory Reports
            </TabsTrigger>
          </TabsList>

          {/* Financial Reports Tab */}
          <TabsContent value="financial" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>
                    Monthly revenue breakdown for the selected period
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                  <div className="text-center">
                    <BarChart className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2">
                      Revenue chart visualization would appear here
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" /> View Details
                  </Button>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" /> Download Report
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Status</CardTitle>
                  <CardDescription>
                    Distribution of payment statuses for all students
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                  <div className="text-center">
                    <PieChart className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2">
                      Payment status chart would appear here
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" /> View Details
                  </Button>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" /> Download Report
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>
                  Summary of key financial metrics for the selected period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Total Revenue
                    </h3>
                    <div className="text-2xl font-bold">₹1,25,450</div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                      <span className="text-green-500">12.5%</span>
                      <span className="text-muted-foreground ml-1">
                        vs last period
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Total Expenses
                    </h3>
                    <div className="text-2xl font-bold">₹85,320</div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="mr-1 h-4 w-4 text-red-500" />
                      <span className="text-red-500">8.3%</span>
                      <span className="text-muted-foreground ml-1">
                        vs last period
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Net Profit
                    </h3>
                    <div className="text-2xl font-bold">₹40,130</div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                      <span className="text-green-500">5.2%</span>
                      <span className="text-muted-foreground ml-1">
                        vs last period
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <FileText className="mr-2 h-4 w-4" /> Generate Detailed
                  Financial Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Operational Reports Tab */}
          <TabsContent value="operational" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Meal Plan Distribution</CardTitle>
                  <CardDescription>
                    Distribution of students across different meal plans
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                  <div className="text-center">
                    <PieChart className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2">
                      Meal plan distribution chart would appear here
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" /> View Details
                  </Button>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" /> Download Report
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student Attendance</CardTitle>
                  <CardDescription>
                    Daily meal attendance trends for the selected period
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                  <div className="text-center">
                    <LineChart className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2">
                      Attendance trend chart would appear here
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" /> View Details
                  </Button>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" /> Download Report
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Operational Metrics</CardTitle>
                <CardDescription>
                  Key operational metrics for the selected period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Total Students
                    </h3>
                    <div className="text-2xl font-bold">245</div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                      <span className="text-green-500">3.2%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Avg. Attendance
                    </h3>
                    <div className="text-2xl font-bold">92%</div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                      <span className="text-green-500">1.5%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Meal Cost
                    </h3>
                    <div className="text-2xl font-bold">₹45.20</div>
                    <div className="flex items-center text-sm">
                      <TrendingDown className="mr-1 h-4 w-4 text-green-500" />
                      <span className="text-green-500">2.1%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Feedback Score
                    </h3>
                    <div className="text-2xl font-bold">4.2/5</div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                      <span className="text-green-500">0.3</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <FileText className="mr-2 h-4 w-4" /> Generate Detailed
                  Operational Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Inventory Reports Tab */}
          <TabsContent value="inventory" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Consumption</CardTitle>
                  <CardDescription>
                    Monthly consumption trends for key inventory items
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                  <div className="text-center">
                    <LineChart className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2">
                      Consumption trend chart would appear here
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" /> View Details
                  </Button>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" /> Download Report
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inventory Value</CardTitle>
                  <CardDescription>
                    Value distribution across inventory categories
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                  <div className="text-center">
                    <PieChart className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2">
                      Inventory value chart would appear here
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" /> View Details
                  </Button>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" /> Download Report
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Inventory Alerts</CardTitle>
                <CardDescription>
                  Items that require attention based on stock levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md bg-red-50">
                    <h3 className="font-medium text-red-800 mb-2">
                      Low Stock Items (3)
                    </h3>
                    <p className="text-sm text-red-600 mb-2">
                      The following items are below their reorder levels and
                      need to be restocked:
                    </p>
                    <ul className="text-sm space-y-1 text-red-600">
                      <li>• Rice - Current: 25kg (Reorder: 50kg)</li>
                      <li>• Cooking Oil - Current: 15L (Reorder: 20L)</li>
                      <li>• Sugar - Current: 10kg (Reorder: 25kg)</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-md bg-amber-50">
                    <h3 className="font-medium text-amber-800 mb-2">
                      Expiring Soon (2)
                    </h3>
                    <p className="text-sm text-amber-600 mb-2">
                      The following items will expire within the next 7 days:
                    </p>
                    <ul className="text-sm space-y-1 text-amber-600">
                      <li>• Milk - Expires: May 20, 2023 (2 days)</li>
                      <li>• Vegetables - Expires: May 22, 2023 (4 days)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <FileText className="mr-2 h-4 w-4" /> Generate Detailed
                  Inventory Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
