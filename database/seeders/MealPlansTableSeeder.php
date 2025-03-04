<?php

namespace Database\Seeders;

use App\Models\MealPlan;
use Illuminate\Database\Seeder;

class MealPlansTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mealPlans = [
            [
                'name' => 'Daily Plan',
                'description' => 'Basic meal plan for a single day',
                'price' => 150.00,
                'duration_days' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Weekly Plan',
                'description' => 'Standard meal plan for one week',
                'price' => 900.00,
                'duration_days' => 7,
                'is_active' => true,
            ],
            [
                'name' => 'Monthly Plan',
                'description' => 'Premium meal plan for a full month',
                'price' => 3200.00,
                'duration_days' => 30,
                'is_active' => true,
            ],
            [
                'name' => 'Semester Plan',
                'description' => 'Complete meal plan for the entire semester',
                'price' => 15000.00,
                'duration_days' => 120,
                'is_active' => true,
            ],
        ];

        foreach ($mealPlans as $plan) {
            MealPlan::create($plan);
        }
    }
}
