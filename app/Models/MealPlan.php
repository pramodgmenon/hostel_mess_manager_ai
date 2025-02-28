<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MealPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'duration',
        'price',
        'is_vegetarian',
        'is_active',
    ];

    protected $casts = [
        'is_vegetarian' => 'boolean',
        'is_active' => 'boolean',
        'price' => 'decimal:2',
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'active_meal_plan_id');
    }
}
