<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tour_packages', function (Blueprint $table) {
            $table->id();
            // ใช้ JSONB ของ PostgreSQL รองรับ i18n (TH, EN, CN)
            // ตัวอย่าง: {"en": "Phi Phi Island Tour", "th": "ทัวร์เกาะพีพี"}
            $table->jsonb('name');
            $table->jsonb('description')->nullable();

            // Strict Structural Fields for Search Filter
            $table->string('tour_type'); // one_day, overnight, multi_day
            $table->string('group_type'); // join, private
            $table->integer('duration_days')->default(1);
            $table->integer('duration_nights')->default(0);
            $table->integer('max_seats')->default(20); // จำกัดที่นั่งตามรูปแบบทัวร์/เรือ

            // Matrix Price Structure (ขยายระบบราคาตามสเปกธุรกิจ)
            $table->decimal('price_adult', 10, 2);
            $table->decimal('price_child', 10, 2);
            $table->decimal('price_promo', 10, 2)->nullable();
            $table->decimal('price_low_season', 10, 2)->nullable();
            $table->decimal('private_charter_price', 10, 2)->nullable(); // ราคาเหมาลำสเปกไพรเวท

            // Dynamic Tags & Flexible Amenities Layer ด้วย JSONB
            // ตัวอย่าง: ["speedboat", "snorkeling", "sight_seeing"]
            $table->jsonb('metadata')->nullable();

            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // ทำ Index สำหรับคอลัมน์ที่ถูกค้นหาบ่อยเพื่อรีดประสิทธิภาพ PostgreSQL
            $table->index(['tour_type', 'group_type', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tour_packages');
    }
};
