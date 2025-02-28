<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('mobile')->unique()->after('email');
            $table->enum('user_type', ['student', 'management'])->default('student')->after('mobile');
            $table->foreignId('active_meal_plan_id')->nullable()->after('user_type');
            $table->decimal('balance', 10, 2)->default(0)->after('active_meal_plan_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['mobile', 'user_type', 'active_meal_plan_id', 'balance']);
        });
    }
};
