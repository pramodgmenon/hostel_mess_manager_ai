<?php

namespace Database\Seeders;

use App\Models\InventoryItem;
use App\Models\InventoryTransaction;
use App\Models\Supplier;
use Illuminate\Database\Seeder;

class InventoryTransactionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get inventory items and suppliers
        $items = InventoryItem::all();
        $suppliers = Supplier::all();
        
        // Transaction types
        $transactionTypes = ['purchase', 'issue', 'return', 'adjustment'];
        
        foreach ($items as $item) {
            // Create 3-8 transactions for each item
            $numTransactions = rand(3, 8);
            
            for ($i = 0; $i < $numTransactions; $i++) {
                $type = $transactionTypes[array_rand($transactionTypes)];
                $quantity = rand(5, 20);
                
                // Adjust quantity based on transaction type
                $adjustedQuantity = ($type == 'purchase' || $type == 'return') ? $quantity : -$quantity;
                
                // Get supplier based on category if it's a purchase
                $supplierId = null;
                if ($type == 'purchase') {
                    $categorySuppliers = $suppliers->where('category', $item->category);
                    if ($categorySuppliers->count() > 0) {
                        $supplierId = $categorySuppliers->random()->id;
                    } else {
                        $supplierId = $suppliers->random()->id;
                    }
                }
                
                // Create transaction with random date in last 6 months
                InventoryTransaction::create([
                    'inventory_item_id' => $item->id,
                    'supplier_id' => $supplierId,
                    'transaction_type' => $type,
                    'quantity' => $adjustedQuantity,
                    'unit_price' => $item->unit_price * (rand(90, 110) / 100), // Slight price variation
                    'total_price' => $adjustedQuantity * $item->unit_price * (rand(90, 110) / 100),
                    'notes' => "Transaction for {$item->name}",
                    'created_at' => now()->subDays(rand(1, 180)),
                ]);
            }
        }
    }
}
