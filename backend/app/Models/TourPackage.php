<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TourPackage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'tour_type',
        'group_type',
        'duration_days',
        'duration_nights',
        'max_seats',
        'price_adult',
        'price_child',
        'price_promo',
        'price_low_season',
        'private_charter_price',
        'metadata',
        'is_active'
    ];

    // บอกให้ Laravel แปลง JSONB จากฐานข้อมูล PostgreSQL มาเป็น Array ของ PHP โดยอัตโนมัติ
    protected $casts = [
        'name' => 'array',
        'description' => 'array',
        'metadata' => 'array',
        'is_active' => 'boolean',
        'price_adult' => 'decimal:2',
        'price_child' => 'decimal:2',
        'price_promo' => 'decimal:2',
        'price_low_season' => 'decimal:2',
        'private_charter_price' => 'decimal:2',
    ];
}
