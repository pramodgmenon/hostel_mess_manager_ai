<?php

namespace Database\Seeders;

use App\Models\Supplier;
use Illuminate\Database\Seeder;

class SuppliersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $suppliers = [
            [
                'name' => 'Fresh Farms',
                'contact_person' => 'Rajesh Kumar',
                'email' => 'rajesh@freshfarms.com',
                'phone' => '9876543210',
                'address' => '123 Farm Road, Rural District',
                'category' => 'vegetables',
                'payment_terms' => 'Net 15',
                'is_active' => true,
            ],
            [
                'name' => 'Dairy Delights',
                'contact_person' => 'Priya Sharma',
                'email' => 'priya@dairydelights.com',
                'phone' => '8765432109',
                'address' => '456 Milk Street, Dairy Town',
                'category' => 'dairy',
                'payment_terms' => 'Net 7',
                'is_active' => true,
            ],
            [
                'name' => 'Grain Traders',
                'contact_person' => 'Amit Patel',
                'email' => 'amit@graintraders.com',
                'phone' => '7654321098',
                'address' => '789 Wheat Avenue, Grain City',
                'category' => 'grains',
                'payment_terms' => 'Net 30',
                'is_active' => true,
            ],
            [
                'name' => 'Meat Masters',
                'contact_person' => 'Sanjay Singh',
                'email' => 'sanjay@meatmasters.com',
                'phone' => '6543210987',
                'address' => '101 Butcher Lane, Meat District',
                'category' => 'meat',
                'payment_terms' => 'Net 10',
                'is_active' => true,
            ],
            [
                'name' => 'Spice World',
                'contact_person' => 'Meena Gupta',
                'email' => 'meena@spiceworld.com',
                'phone' => '5432109876',
                'address' => '202 Spice Road, Flavor Town',
                'category' => 'spices',
                'payment_terms' => 'Net 15',
                'is_active' => true,
            ],
        ];

        foreach ($suppliers as $supplier) {
            Supplier::create($supplier);
        }
    }
}
