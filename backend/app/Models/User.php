<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Spatie\Permission\Traits\HasRoles; // 💡 บรรทัดที่ 1: นำเข้าอาวุธ Spatie Trait

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    // 💡 บรรทัดทองคำ: ล็อกให้โมเดลนี้ใช้ guard 'api' เป็นหลักตั้งแต่เกิด เพื่อความปลอดภัยระดับ Enterprise API
    protected $guard_name = 'api';
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * ดึงข้อมูลโปรไฟล์ลูกค้า (ถ้ามี)
     */
    public function customerProfile()
    {
        return $this->hasOne(Customer::class);
    }

    /**
     * รายการจองที่ User คนนี้เกี่ยวข้อง (เป็นผู้จอง, พนักงานรับจอง หรือ Agency)
     */
    public function bookings()
    {
        return $this->belongsToMany(Booking::class, 'booking_user')
            ->withPivot('role_in_booking', 'agency_code', 'notes')
            ->withTimestamps();
    }
}
