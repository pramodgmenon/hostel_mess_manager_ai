<?php

namespace App\Http\Controllers;

use App\Models\InventoryItem;
use App\Models\InventoryTransaction;
use App\Models\MealPlan;
use App\Models\MenuItem;
use App\Models\Payment;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('admin');
    }

    public function dashboard()
    {
        $stats = [
            'totalStudents' => User::where('user_type', 'student')->count(),
            'activeMealPlans' => User::whereNotNull('active_meal_plan_id')->count(),
            'pendingPayments' => Payment::where('status', 'pending')->sum('amount'),
            'inventoryStatus' => '85%', // This would be calculated in a real app
        ];

        return view('admin.dashboard', compact('stats'));
    }

    public function mealPlans()
    {
        $mealPlans = MealPlan::all();
        return view('admin.meal-plans.index', compact('mealPlans'));
    }

    public function createMealPlan()
    {
        return view('admin.meal-plans.create');
    }

    public function storeMealPlan(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration' => 'required|in:daily,weekly,monthly',
            'price' => 'required|numeric|min:0',
            'is_vegetarian' => 'boolean',
        ]);

        MealPlan::create($request->all());

        return redirect()->route('admin.meal-plans')->with('success', 'Meal plan created successfully!');
    }

    public function editMealPlan(MealPlan $mealPlan)
    {
        return view('admin.meal-plans.edit', compact('mealPlan'));
    }

    public function updateMealPlan(Request $request, MealPlan $mealPlan)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration' => 'required|in:daily,weekly,monthly',
            'price' => 'required|numeric|min:0',
            'is_vegetarian' => 'boolean',
            'is_active' => 'boolean',
        ]);

        $mealPlan->update($request->all());

        return redirect()->route('admin.meal-plans')->with('success', 'Meal plan updated successfully!');
    }

    public function deleteMealPlan(MealPlan $mealPlan)
    {
        $mealPlan->delete();

        return redirect()->route('admin.meal-plans')->with('success', 'Meal plan deleted successfully!');
    }

    public function menuEditor()
    {
        $menuItems = MenuItem::all()->groupBy(['day', 'meal_type']);
        $days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        $mealTypes = ['breakfast', 'lunch', 'dinner'];

        return view('admin.meal-plans.menu-editor', compact('menuItems', 'days', 'mealTypes'));
    }

    public function storeMenuItem(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'vegetarian' => 'boolean',
            'day' => 'required|string',
            'meal_type' => 'required|in:breakfast,lunch,dinner',
        ]);

        MenuItem::create($request->all());

        return redirect()->route('admin.menu-editor')->with('success', 'Menu item added successfully!');
    }

    public function inventory()
    {
        $inventoryItems = InventoryItem::all();
        $suppliers = Supplier::all();
        $transactions = InventoryTransaction::orderBy('created_at', 'desc')->take(10)->get();

        return view('admin.inventory.index', compact('inventoryItems', 'suppliers', 'transactions'));
    }

    public function storeInventoryItem(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'quantity' => 'required|numeric|min:0',
            'unit' => 'required|string|max:255',
            'reorder_level' => 'required|numeric|min:0',
        ]);

        InventoryItem::create($request->all());

        return redirect()->route('admin.inventory')->with('success', 'Inventory item added successfully!');
    }

    public function storeSupplier(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'contact' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'address' => 'required|string',
            'items' => 'required|string',
        ]);

        // Convert comma-separated items to array
        $items = explode(',', $request->items);
        $items = array_map('trim', $items);

        Supplier::create([
            'name' => $request->name,
            'contact' => $request->contact,
            'phone' => $request->phone,
            'email' => $request->email,
            'address' => $request->address,
            'items' => json_encode($items),
        ]);

        return redirect()->route('admin.inventory')->with('success', 'Supplier added successfully!');
    }

    public function storeTransaction(Request $request)
    {
        $request->validate([
            'type' => 'required|in:Purchase,Issue,Return',
            'item' => 'required|string|max:255',
            'quantity' => 'required|numeric|min:0',
            'unit' => 'required|string|max:255',
            'supplier' => 'nullable|string|max:255',
            'amount' => 'nullable|numeric|min:0',
        ]);

        InventoryTransaction::create($request->all());

        // Update inventory item quantity
        $inventoryItem = InventoryItem::where('name', $request->item)->first();
        if ($inventoryItem) {
            if ($request->type === 'Purchase' || $request->type === 'Return') {
                $inventoryItem->quantity += $request->quantity;
            } else if ($request->type === 'Issue') {
                $inventoryItem->quantity -= $request->quantity;
            }
            $inventoryItem->save();
        }

        return redirect()->route('admin.inventory')->with('success', 'Transaction recorded successfully!');
    }

    public function reports()
    {
        $stats = [
            'totalRevenue' => Payment::where('status', 'completed')->sum('amount'),
            'activeMealPlans' => User::whereNotNull('active_meal_plan_id')->count(),
            'pendingPayments' => Payment::where('status', 'pending')->sum('amount'),
            'inventoryValue' => 45250, // This would be calculated in a real app
        ];

        return view('admin.reports.index', compact('stats'));
    }
}
