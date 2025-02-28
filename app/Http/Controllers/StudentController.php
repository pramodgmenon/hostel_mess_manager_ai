<?php

namespace App\Http\Controllers;

use App\Models\MealPlan;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('student');
    }

    public function dashboard()
    {
        $user = Auth::user();
        $activePlan = MealPlan::find($user->active_meal_plan_id);
        $availablePlans = MealPlan::where('is_active', true)->get();
        $payments = Payment::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        return view('student.dashboard', compact('user', 'activePlan', 'availablePlans', 'payments'));
    }

    public function mealPlans()
    {
        $user = Auth::user();
        $activePlan = MealPlan::find($user->active_meal_plan_id);
        $availablePlans = MealPlan::where('is_active', true)->get();

        return view('student.meal-plans', compact('user', 'activePlan', 'availablePlans'));
    }

    public function selectPlan(Request $request, MealPlan $mealPlan)
    {
        $user = Auth::user();
        $user->active_meal_plan_id = $mealPlan->id;
        $user->save();

        return redirect()->route('student.meal-plans')->with('success', 'Meal plan selected successfully!');
    }

    public function payments()
    {
        $user = Auth::user();
        $payments = Payment::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return view('student.payments', compact('user', 'payments'));
    }

    public function addPayment(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'payment_method' => 'required|string',
        ]);

        $user = Auth::user();
        
        // Create payment record
        Payment::create([
            'user_id' => $user->id,
            'amount' => $request->amount,
            'description' => 'Balance top-up',
            'status' => 'completed',
            'payment_method' => $request->payment_method,
        ]);

        // Update user balance
        $user->balance += $request->amount;
        $user->save();

        return redirect()->route('student.payments')->with('success', 'Payment added successfully!');
    }
}
