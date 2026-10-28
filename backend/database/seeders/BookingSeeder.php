<?php

namespace Database\Seeders;


use App\Models\Booking;
use App\Models\Customer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;



class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // สร้างลูกค้า 10 ราย พร้อมรายการจองจำลอง
        Customer::factory(10)->create()->each(function ($customer) {
            Booking::factory(rand(1, 2))->create([
                'customer_id' => $customer->id,
            ]);
        });
    }
}
