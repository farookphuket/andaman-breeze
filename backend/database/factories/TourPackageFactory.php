<?php

namespace Database\Factories;

use App\Models\TourPackage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TourPackage>
 */
class TourPackageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // สุ่มรูปแบบทัวร์และประเภทกลุ่ม
        $tourType = $this->faker->randomElement(['one_day', 'overnight', 'multi_day']);
        $groupType = $this->faker->randomElement(['join', 'private']);

        // ตรรกะเงื่อนไขราคาตามสเปกที่ท่านนายพลกำหนด
        $priceAdult = 0;
        $privatePrice = null;
        $maxSeats = 20;

        if ($groupType === 'private') {
            $maxSeats = $this->faker->randomElement([6, 12, 16]);
            $priceAdult = 0; // ทัวร์เหมาลำ คิดราคาเป็นก้อนใหญ่
            $privatePrice = $maxSeats === 16 ? 120000 : $this->faker->randomElement([45000, 75000, 95000]);
        } else {
            // Day Trip Join เริ่มต้นที่ 5,000+ บาท
            $priceAdult = $tourType === 'one_day' ? $this->faker->numberBetween(5000, 8500) : $this->faker->numberBetween(12000, 25000);
            $maxSeats = $this->faker->randomElement([20, 45]); // เรือเร็ว 20 คน, เรือใหญ่ 45 คน
        }
        // ราคาเด็กเป็นครึ่งหนึ่งของราคาผู้ใหญ่
        $priceChild = $priceAdult / 2;

        // มีโอกาส 50% ที่จะมีราคาโปรโมชั่น หรือราคาช่วง Low Season
        $pricePromo = $priceAdult > 0 && $this->faker->boolean() ? $priceAdult * 0.85 : null;
        $priceLowSeason = $priceAdult > 0 && $this->faker->boolean() ? $priceAdult * 0.75 : null;

        $durationDays = $tourType === 'one_day' ? 1 : $this->faker->randomElement([3, 4]);
        $durationNights = $durationDays === 1 ? 0 : $durationDays - 1;
        return [
            //
            'name' => [
                'th' => 'โปรแกรมทัวร์จำลองระดับพรีเมียม ' . $this->faker->word(),
                'en' => 'Premium Elite Dynamic Tour ' . $this->faker->word(),
                'cn' => '高端奢华专属旅游线 ' . $this->faker->word()
            ],
            'description' => [
                'th' => 'สัมผัสประสบการณ์ท่องเที่ยวทะเลอันดามันระดับลักชัวรี ดำน้ำดูปะการัง พายเรือคายัค ครบวงจร',
                'en' => 'Experience the luxury Andaman sea cruise with high-end snorkeling, kayaking, and ultimate premium island hopping.',
                'cn' => '体验安达曼海顶级奢华游艇之旅，包含浮潜、皮划艇以及尊享海岛行程。'
            ],
            'tour_type' => $tourType,
            'group_type' => $groupType,
            'duration_days' => $durationDays,
            'duration_nights' => $durationNights,
            'max_seats' => $maxSeats,
            'price_adult' => $priceAdult,
            'price_child' => $priceChild,
            'price_promo' => $pricePromo,
            'price_low_season' => $priceLowSeason,
            'private_charter_price' => $privatePrice,
            'metadata' => [
                'vehicles' => $this->faker->randomElements(['speedboat', 'cruise_ship', 'longtail_boat'], $this->faker->numberBetween(1, 2)),
                'activities' => $this->faker->randomElements(['snorkeling', 'diving', 'kayak', 'sight_seeing', 'trekking', 'bird_watching'], $this->faker->numberBetween(2, 4))
            ],
            'is_active' => true,
        ];
    }
}
