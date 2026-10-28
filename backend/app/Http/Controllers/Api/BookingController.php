<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    //
    public function index()
    {
        $bookings = Booking::with(['customer', 'tourPackage'])->latest()->get();

        return response()->json([
            'status' => 'success',
            'data' => $bookings
        ]);
    }

    public function show($id)
    {
        $booking = Booking::with(['customer', 'tourPackage', 'users'])->find($id);

        if (!$booking) {
            return response()->json(['status' => 'error', 'message' => 'Booking not found'], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $booking
        ]);
    }
}
