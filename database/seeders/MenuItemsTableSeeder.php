<?php

namespace Database\Seeders;

use App\Models\MenuItem;
use Illuminate\Database\Seeder;

class MenuItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menuItems = [
            // Breakfast items
            [
                'name' => 'Idli Sambar',
                'description' => 'Steamed rice cakes served with lentil soup',
                'meal_type' => 'breakfast',
                'day_of_week' => 'monday',
                'is_vegetarian' => true,
                'calories' => 250,
            ],
            [
                'name' => 'Poha',
                'description' => 'Flattened rice with vegetables and spices',
                'meal_type' => 'breakfast',
                'day_of_week' => 'tuesday',
                'is_vegetarian' => true,
                'calories' => 220,
            ],
            [
                'name' => 'Bread Omelette',
                'description' => 'Bread served with egg omelette',
                'meal_type' => 'breakfast',
                'day_of_week' => 'wednesday',
                'is_vegetarian' => false,
                'calories' => 320,
            ],
            [
                'name' => 'Upma',
                'description' => 'Semolina porridge with vegetables',
                'meal_type' => 'breakfast',
                'day_of_week' => 'thursday',
                'is_vegetarian' => true,
                'calories' => 230,
            ],
            [
                'name' => 'Aloo Paratha',
                'description' => 'Wheat flatbread stuffed with spiced potatoes',
                'meal_type' => 'breakfast',
                'day_of_week' => 'friday',
                'is_vegetarian' => true,
                'calories' => 350,
            ],
            [
                'name' => 'Dosa',
                'description' => 'Fermented rice and lentil crepe',
                'meal_type' => 'breakfast',
                'day_of_week' => 'saturday',
                'is_vegetarian' => true,
                'calories' => 280,
            ],
            [
                'name' => 'Chole Bhature',
                'description' => 'Spiced chickpeas with fried bread',
                'meal_type' => 'breakfast',
                'day_of_week' => 'sunday',
                'is_vegetarian' => true,
                'calories' => 450,
            ],
            
            // Lunch items
            [
                'name' => 'Rice and Dal',
                'description' => 'Steamed rice with lentil curry',
                'meal_type' => 'lunch',
                'day_of_week' => 'monday',
                'is_vegetarian' => true,
                'calories' => 380,
            ],
            [
                'name' => 'Rajma Chawal',
                'description' => 'Kidney bean curry with rice',
                'meal_type' => 'lunch',
                'day_of_week' => 'tuesday',
                'is_vegetarian' => true,
                'calories' => 420,
            ],
            [
                'name' => 'Chicken Biryani',
                'description' => 'Spiced rice with chicken',
                'meal_type' => 'lunch',
                'day_of_week' => 'wednesday',
                'is_vegetarian' => false,
                'calories' => 550,
            ],
            [
                'name' => 'Paneer Butter Masala with Roti',
                'description' => 'Cottage cheese in tomato gravy with wheat flatbread',
                'meal_type' => 'lunch',
                'day_of_week' => 'thursday',
                'is_vegetarian' => true,
                'calories' => 480,
            ],
            [
                'name' => 'Fish Curry with Rice',
                'description' => 'Fish in spiced gravy with steamed rice',
                'meal_type' => 'lunch',
                'day_of_week' => 'friday',
                'is_vegetarian' => false,
                'calories' => 520,
            ],
            [
                'name' => 'Chole with Bhature',
                'description' => 'Spiced chickpeas with fried bread',
                'meal_type' => 'lunch',
                'day_of_week' => 'saturday',
                'is_vegetarian' => true,
                'calories' => 580,
            ],
            [
                'name' => 'Veg Pulao',
                'description' => 'Rice cooked with vegetables and spices',
                'meal_type' => 'lunch',
                'day_of_week' => 'sunday',
                'is_vegetarian' => true,
                'calories' => 400,
            ],
            
            // Dinner items
            [
                'name' => 'Roti with Mixed Veg',
                'description' => 'Wheat flatbread with mixed vegetable curry',
                'meal_type' => 'dinner',
                'day_of_week' => 'monday',
                'is_vegetarian' => true,
                'calories' => 350,
            ],
            [
                'name' => 'Egg Curry with Rice',
                'description' => 'Egg in spiced gravy with steamed rice',
                'meal_type' => 'dinner',
                'day_of_week' => 'tuesday',
                'is_vegetarian' => false,
                'calories' => 420,
            ],
            [
                'name' => 'Dal Khichdi',
                'description' => 'Rice and lentil porridge',
                'meal_type' => 'dinner',
                'day_of_week' => 'wednesday',
                'is_vegetarian' => true,
                'calories' => 320,
            ],
            [
                'name' => 'Butter Chicken with Naan',
                'description' => 'Chicken in tomato gravy with leavened flatbread',
                'meal_type' => 'dinner',
                'day_of_week' => 'thursday',
                'is_vegetarian' => false,
                'calories' => 650,
            ],
            [
                'name' => 'Aloo Gobi with Roti',
                'description' => 'Potato and cauliflower curry with wheat flatbread',
                'meal_type' => 'dinner',
                'day_of_week' => 'friday',
                'is_vegetarian' => true,
                'calories' => 380,
            ],
            [
                'name' => 'Mutton Curry with Rice',
                'description' => 'Mutton in spiced gravy with steamed rice',
                'meal_type' => 'dinner',
                'day_of_week' => 'saturday',
                'is_vegetarian' => false,
                'calories' => 580,
            ],
            [
                'name' => 'Veg Thali',
                'description' => 'Assorted vegetarian dishes with rice and bread',
                'meal_type' => 'dinner',
                'day_of_week' => 'sunday',
                'is_vegetarian' => true,
                'calories' => 520,
            ],
        ];

        foreach ($menuItems as $item) {
            MenuItem::create($item);
        }
    }
}
