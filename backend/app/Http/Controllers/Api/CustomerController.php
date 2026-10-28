<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    //
    public function index()
    {
        $customers = Customer::latest()->get();

        return response()->json([
            'status' => 'success',
            'data' => $customers
        ]);
    }
}
