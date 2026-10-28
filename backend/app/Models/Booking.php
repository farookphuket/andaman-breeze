<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Str;

class Booking extends Model
{
    /** @use HasFactory<\Database\Factories\BookingFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    protected static function boot()
    {
        parent::boot();

        // เจน รหัสการจองอัตโนมัติก่อนสร้างรายการ เช่น AP-20260723-A1B2
        static::creating(function ($booking) {
            if (empty($booking->booking_code)) {
                $booking->booking_code = 'AP-' . date('Ymd') . '-' . strtoupper(Str::random(4));
            }
        });
    }


    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }



    public function tourPackage()
    {
        return $this->belongsTo(TourPackage::class);
    }
    // ผูกกับ Users หลายบทบาท (Staff, Agency, Referrer) ผ่าน booking_user
    public function users()
    {
        return $this->belongsToMany(User::class, 'booking_user')
            ->withPivot('role_in_booking', 'agency_code', 'notes')
            ->withTimestamps();
    }

    // Helper: ดึงเฉพาะผู้สร้างการจอง (Creator / Agency / Staff)
    public function creator()
    {
        return $this->users()->wherePivot('role_in_booking', 'creator');
    }
}
