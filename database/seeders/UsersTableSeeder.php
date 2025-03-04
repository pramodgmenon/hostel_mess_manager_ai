<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'mobile' => '1234567890',
            'password' => Hash::make('admin123'),
            'user_type' => 'management',
            'email_verified_at' => now(),
        ]);

        // Create student user
        User::create([
            'name' => 'Student User',
            'email' => 'student@example.com',
            'mobile' => '9876543210',
            'password' => Hash::make('student123'),
            'user_type' => 'student',
            'email_verified_at' => now(),
        ]);

        // Create additional students
        User::factory()->count(10)->create([
            'user_type' => 'student',
        ]);
    }
}
