<?php

use Illuminate\Http\Request;

//Route::get("/clothes", "ClothesController@showAll");

Route::apiResource("/clothes", "ClothesController");
