<?php

use Illuminate\Http\Request;

//Route::get("/clothes", "ClothesController@showAll");

Route::apiResource("/products", "ProductsController");
Route::post('/auth', 'LoginController@login');
