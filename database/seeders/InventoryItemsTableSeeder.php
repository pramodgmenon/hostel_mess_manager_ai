<?php

namespace Database\Seeders;

use App\Models\InventoryItem;
use Illuminate\Database\Seeder;

class InventoryItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $inventoryItems = [
            [
                'name' => 'Rice',
                'description' => 'Basmati rice',
                'unit' => 'kg',
                'quantity' => 100,
                'unit_price' => 60.00,
                'category' => 'grains',
                'reorder_level' => 20,
            ],
            [
                'name' => 'Wheat Flour',
                'description' => 'Whole wheat flour',
                'unit' => 'kg',
                'quantity' => 80,
                'unit_price' => 40.00,
                'category' => 'grains',
                'reorder_level' => 15,
            ],
            [
                'name' => 'Toor Dal',
                'description' => 'Split pigeon peas',
                'unit' => 'kg',
                'quantity' => 50,
                'unit_price' => 120.00,
                'category' => 'pulses',
                'reorder_level' => 10,
            ],
            [
                'name' => 'Moong Dal',
                'description' => 'Split mung beans',
                'unit' => 'kg',
                'quantity' => 40,
                'unit_price' => 130.00,
                'category' => 'pulses',
                'reorder_level' => 8,
            ],
            [
                'name' => 'Cooking Oil',
                'description' => 'Refined sunflower oil',
                'unit' => 'liter',
                'quantity' => 60,
                'unit_price' => 110.00,
                'category' => 'oils',
                'reorder_level' => 12,
            ],
            [
                'name' => 'Milk',
                'description' => 'Full cream milk',
                'unit' => 'liter',
                'quantity' => 30,
                'unit_price' => 60.00,
                'category' => 'dairy',
                'reorder_level' => 10,
            ],
            [
                'name' => 'Paneer',
                'description' => 'Fresh cottage cheese',
                'unit' => 'kg',
                'quantity' => 15,
                'unit_price' => 320.00,
                'category' => 'dairy',
                'reorder_level' => 5,
            ],
            [
                'name' => 'Chicken',
                'description' => 'Fresh chicken',
                'unit' => 'kg',
                'quantity' => 25,
                'unit_price' => 220.00,
                'category' => 'meat',
                'reorder_level' => 8,
            ],
            [
                'name' => 'Eggs',
                'description' => 'Fresh eggs',
                'unit' => 'dozen',
                'quantity' => 20,
                'unit_price' => 80.00,
                'category' => 'dairy',
                'reorder_level' => 5,
            ],
            [
                'name' => 'Potatoes',
                'description' => 'Fresh potatoes',
                'unit' => 'kg',
                'quantity' => 70,
                'unit_price' => 30.00,
                'category' => 'vegetables',
                'reorder_level' => 15,
            ],
            [
                'name' => 'Onions',
                'description' => 'Fresh onions',
                'unit' => 'kg',
                'quantity' => 60,
                'unit_price' => 40.00,
                'category' => 'vegetables',
                'reorder_level' => 12,
            ],
            [
                'name' => 'Tomatoes',
                'description' => 'Fresh tomatoes',
                'unit' => 'kg',
                'quantity' => 40,
                'unit_price' => 50.00,
                'category' => 'vegetables',
                'reorder_level' => 10,
            ],
        ];

        foreach ($inventoryItems as $item) {
            InventoryItem::create($item);
        }
    }
}
