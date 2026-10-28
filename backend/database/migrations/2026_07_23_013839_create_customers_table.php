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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            // ผูกกับ user_id (null หากยังเป็น Guest/ยังไม่สมัครสมาชิก)
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();

            $table->string('title')->nullable(); // Mr, Mrs, Ms
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->index();
            $table->string('phone');
            $table->string('nationality')->default('TH');
            $table->text('special_requests')->nullable(); // ข้อเสนอแนะ/แพ้อาหาร

            // 🔑 Token สำหรับสร้าง User Account จาก Email Confirmation (ถ้ากดสมัครทีหลัง)
            $table->string('registration_token', 64)->nullable()->unique();
            $table->timestamp('registration_token_expires_at')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
