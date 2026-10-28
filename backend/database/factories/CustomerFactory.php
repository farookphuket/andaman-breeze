<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;



/**
 * @extends Factory<Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'title' => fake()->randomElement(['Mr.', 'Mrs.', 'Ms.']),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'nationality' => fake()->randomElement(['TH', 'EN', 'ZH', 'US', 'MY']),
            'special_requests' => fake()->optional()->sentence(),
        ];
    }
}
