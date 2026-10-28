<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // ล้างสิทธิ์แคชในหน่วยความจำของ Spatie ก่อนเพื่อป้องกันคีย์ชนกัน
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // 1. สลักรายการ Permissions พื้นฐานสำหรับจัดการทัวร์และการจอง
        $permissions = [
            'manage_system',     // สิทธิ์สูงสุดสำหรับระบบ
            'view_reports',      // ดูรายงานบัญชี/บริหาร
            'manage_tours',      // สร้าง/แก้ไขโปรแกรมทัวร์
            'manage_bookings',   // บุ๊คกิ้งตั๋วเรือและแพ็กเกจ
            'manage_agencies',   // จัดการเครือข่ายคอนแทกต์เอเจนซี่
            'client_checkout',   // ทำรายการจองฝั่งลูกค้าทั่วไป
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission, 'api');
        }
        // 2. สลัก 9 Roles หลักระดับ Enterprise ลง PostgreSQL 16
        $roles = [
            'root'     => ['manage_system'], // ซูเปอร์ยูสเซอร์ลับสุดยอด
            'admin'    => ['manage_system', 'view_reports', 'manage_tours', 'manage_bookings', 'manage_agencies'],
            'boss'     => ['view_reports', 'manage_agencies'],
            'manager'  => ['manage_tours', 'manage_bookings', 'manage_agencies'],
            'account'  => ['view_reports'],
            'booking'  => ['manage_bookings'],
            'agency'   => ['manage_bookings'], // สิทธิ์กลุ่มพันธมิตรขายตั๋วภายนอก
            'staff'    => ['manage_bookings'],
            'customer' => ['client_checkout'], // ลูกค้าซื้อหน้าบ้าน
        ];

        foreach ($roles as $roleName => $rolePermissions) {
            // สร้าง Role โดยระบุ Guard และดึงคอลเลกชันของ Permission มาผูกตรงๆ จากฐานข้อมูล
            $role = Role::findOrCreate($roleName, 'api');

            // ใช้ query ดึงมาจากคลังตรงๆ ป้องกันปัญหา Memory State ชนกัน
            $dbPermissions = Permission::whereIn('name', $rolePermissions)
                ->where('guard_name', 'api')
                ->get();

            $role->syncPermissions($dbPermissions);
        }
    }
}
