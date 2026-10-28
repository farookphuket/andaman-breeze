<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        // สั่งทำงานเรียงตามลำดับความสำคัญของโครงสร้างฐานข้อมูล (Data Dependency Order)
        $this->call([
            RoleAndPermissionSeeder::class, // วางรากฐานระบบสิทธิ์ก่อน
            EnterpriseFakeDataSeeder::class, // เติมข้อมูลพนักงาน ทัวร์อันดามัน และราคาเมทริกซ์ตามหลัง

            BookingSeeder::class,
        ]);
    }
}
