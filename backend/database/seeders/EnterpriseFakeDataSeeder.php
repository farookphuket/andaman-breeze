<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\TourPackage;
use Illuminate\Support\Facades\Hash;

class EnterpriseFakeDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. สลักบัญชีผู้ใช้ระดับหัวกะทิตัวอย่างเพื่อใช้ล็อกอินเข้าเทสระบบ
        $rootUser = User::updateOrCreate(
            ['email' => 'root@me.me'],
            [
                'name' => 'Hidden Root Core',
                'password' => Hash::make('1234'),
            ]
        );
        // 💡 บังคับให้ assign บทบาทโดยอิงตาม api guard เพื่อให้ตรงกับที่เราสร้างไว้ในตาราง
        $rootUser->assignRole('root');

        $adminUser = User::updateOrCreate(
            ['email' => 'farook@me.me'],
            [
                'name' => 'Commander Farook Admin',
                'password' => Hash::make('1234'),
            ]
        );
        $adminUser->assignRole('admin');

        // สุ่มสร้างบัญชีผู้ใช้อื่นๆ เสริมในฐานข้อมูลระบบ 10 คน และแจกสิทธิ์ฝั่ง api guard
        User::factory(10)->create()->each(function ($user) {
            $randomRole = collect(['manager', 'account', 'booking', 'staff', 'customer'])->random();
            $user->assignRole($randomRole);
        });

        // 2. สลักข้อมูลทัวร์ตัวอย่างตามสเปกท่านนายพล จำนวน 15 รายการพรีเมียม
        TourPackage::factory(15)->create();
    }
}
