<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; //PostRequest
use App\Models\Product;

class ClothesController extends Controller
{
    public function index() {
        return Product::select()->get();
    }
}
