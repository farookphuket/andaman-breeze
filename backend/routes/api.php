<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\TourController;
// use App\Models\TourPackage;


/*
|--------------------------------------------------------------------------
| API Routes - Andaman Breeze
|--------------------------------------------------------------------------
*/

// Public endpoints: visitors can browse tours.
Route::get('/tours', [TourController::class, 'index']);
Route::get('/tours/{id}', [TourController::class, 'show']);

// Private endpoints: authentication required.
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    Route::get('/customers', [CustomerController::class, 'index']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
