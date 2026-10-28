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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_code')->unique(); // เช่น AP-20260723-XXXX
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->foreignId('tour_package_id')->constrained('tour_packages')->cascadeOnDelete();

            $table->date('travel_date');
            $table->integer('adults_count')->default(1);
            $table->integer('children_count')->default(0);

            $table->decimal('total_amount', 10, 2);
            $table->string('currency', 3)->default('THB');

            // สถานะการจองและการชำระเงิน
            $table->enum('status', ['pending', 'confirmed', 'cancelled', 'completed'])->default('pending');
            $table->enum('payment_status', ['unpaid', 'paid', 'refunded'])->default('unpaid');
            $table->string('payment_method')->nullable(); // promptpay, credit_card, bank_transfer

            $table->timestamps();
        });

        Schema::create('booking_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained('bookings')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();

            // 🎯 ระบุบทบาทของ User ที่เข้ามาปฏิสัมพันธ์กับการจองนี้
            // Roles: root, admin, boss, manager, account, booking, staff, agency, customer
            $table->enum('role_in_booking', [
                'creator',      // คนคีย์ข้อมูล/กดจอง (พนักงาน, Agency, หรือ ตัวลูกค้าเอง)
                'referrer',     // พนักงาน/เพื่อนที่แนะนำ
                'agency_owner', // เอเจนต์ที่เป็นเจ้าของดีล/รับค่าคอม
                'assignee'      // Staff หรือ Account ผู้ดูแลเคส
            ])->default('creator');

            // รองรับการพ่วงรหัส Agency / Partner Code (ถ้ามี)
            $table->string('agency_code')->nullable();

            // หมายเหตุเพิ่มเติมในการจองแทน เช่น "จองแทนเพื่อน ชื่อ..."
            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
        Schema::dropIfExists('booking_user');
    }
};
