<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\TourPackage;

use Illuminate\Http\Request;

class TourController extends Controller
{
    //
    /**
     * ดึงรายการทัวร์ทั้งหมดที่เปิดใช้งาน (Active)
     */
    public function index()
    {
        $tours = TourPackage::where('is_active', true)->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Tours retrieved successfully',
            'data' => $tours
        ]);
    }

    /**
     * ดึงรายละเอียดทัวร์รายตัว
     */
    public function show($id)
    {
        $tour = TourPackage::where('is_active', true)->find($id);

        if (!$tour) {
            return response()->json([
                'status' => 'error',
                'message' => 'Tour package not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $tour
        ]);
    }
}
