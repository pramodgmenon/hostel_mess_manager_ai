<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'contact',
        'phone',
        'email',
        'address',
        'items',
    ];

    protected $casts = [
        'items' => 'array',
    ];
}
