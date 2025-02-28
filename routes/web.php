<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return view('welcome');
});

// Authentication Routes
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// Password Reset Routes
Route::get('/forgot-password', [LoginController::class, 'forgotPassword'])->name('password.request');
Route::post('/forgot-password', [LoginController::class, 'sendResetLinkEmail'])->name('password.email');

// Student Routes
Route::middleware(['student'])->prefix('student')->name('student.')->group(function () {
    Route::get('/dashboard', [StudentController::class, 'dashboard'])->name('dashboard');
    Route::get('/meal-plans', [StudentController::class, 'mealPlans'])->name('meal-plans');
    Route::post('/meal-plans/{mealPlan}/select', [StudentController::class, 'selectPlan'])->name('select-plan');
    Route::get('/payments', [StudentController::class, 'payments'])->name('payments');
    Route::post('/payments', [StudentController::class, 'addPayment'])->name('add-payment');
});

// Admin Routes
Route::middleware(['admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    
    // Meal Plans
    Route::get('/meal-plans', [AdminController::class, 'mealPlans'])->name('meal-plans');
    Route::get('/meal-plans/create', [AdminController::class, 'createMealPlan'])->name('meal-plans.create');
    Route::post('/meal-plans', [AdminController::class, 'storeMealPlan'])->name('meal-plans.store');
    Route::get('/meal-plans/{mealPlan}/edit', [AdminController::class, 'editMealPlan'])->name('meal-plans.edit');
    Route::put('/meal-plans/{mealPlan}', [AdminController::class, 'updateMealPlan'])->name('meal-plans.update');
    Route::delete('/meal-plans/{mealPlan}', [AdminController::class, 'deleteMealPlan'])->name('meal-plans.delete');
    
    // Menu Editor
    Route::get('/menu-editor', [AdminController::class, 'menuEditor'])->name('menu-editor');
    Route::post('/menu-items', [AdminController::class, 'storeMenuItem'])->name('menu-items.store');
    
    // Inventory
    Route::get('/inventory', [AdminController::class, 'inventory'])->name('inventory');
    Route::post('/inventory/items', [AdminController::class, 'storeInventoryItem'])->name('inventory.items.store');
    Route::post('/inventory/suppliers', [AdminController::class, 'storeSupplier'])->name('inventory.suppliers.store');
    Route::post('/inventory/transactions', [AdminController::class, 'storeTransaction'])->name('inventory.transactions.store');
    
    // Reports
    Route::get('/reports', [AdminController::class, 'reports'])->name('reports');
});
