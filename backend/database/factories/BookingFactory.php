<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\Customer;
use App\Models\TourPackage;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


/**
 * @extends Factory<Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // 🎯 เพิ่มการเจน booking_code ตรงนี้
            'booking_code' => 'AP-' . date('Ymd') . '-' . strtoupper(Str::random(4)),
            'customer_id' => Customer::factory(),
            'tour_package_id' => TourPackage::inRandomOrder()->first()?->id ?? TourPackage::factory(),
            'travel_date' => fake()->dateTimeBetween('now', '+3 months')->format('Y-m-d'),
            'adults_count' => fake()->numberBetween(1, 4),
            'children_count' => fake()->numberBetween(0, 2),
            'total_amount' => fake()->randomFloat(2, 3500, 45000),
            'currency' => 'THB',
            'status' => fake()->randomElement(['pending', 'confirmed', 'completed']),
            'payment_status' => fake()->randomElement(['unpaid', 'paid']),
            'payment_method' => fake()->randomElement(['credit_card', 'promptpay', 'bank_transfer']),

        ];
    }
}
