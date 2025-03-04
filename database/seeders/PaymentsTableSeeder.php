<?php

namespace Database\Seeders;

use App\Models\Payment;
use App\Models\User;
use Illuminate\Database\Seeder;

class PaymentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get student users
        $students = User::where('user_type', 'student')->get();
        
        // Payment methods
        $paymentMethods = ['cash', 'upi', 'card', 'bank_transfer'];
        
        // Payment statuses
        $statuses = ['pending', 'completed', 'failed'];
        
        foreach ($students as $student) {
            // Create 2-5 payments for each student
            $numPayments = rand(2, 5);
            
            for ($i = 0; $i < $numPayments; $i++) {
                $amount = rand(500, 5000);
                $method = $paymentMethods[array_rand($paymentMethods)];
                $status = $statuses[array_rand($statuses)];
                
                // Create payment with random date in last 3 months
                Payment::create([
                    'user_id' => $student->id,
                    'amount' => $amount,
                    'payment_method' => $method,
                    'status' => $status,
                    'transaction_id' => 'TXN' . strtoupper(substr(md5(mt_rand()), 0, 10)),
                    'description' => 'Payment for meal plan',
                    'created_at' => now()->subDays(rand(1, 90)),
                ]);
            }
        }
    }
}
