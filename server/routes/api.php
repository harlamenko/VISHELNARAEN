<?php

use Illuminate\Http\Request;

Route::apiResource("/products", "ProductsController");
Route::post('/products/params','ProductsController@showProductsWithParams');
Route::get('/products/{id}','ProductsController@show');
Route::get('/sexType','ProductsController@getSexAndTypes');
Route::middleware('checkAdmin')->get('/admin/{id}', 'ProductsController@getAssortment');
Route::middleware('checkAdmin')->get('/admin/cats/get','ProductsController@getCats');
Route::middleware('checkAdmin')->post('/admin/store','ProductsController@store');
Route::middleware('checkAdmin')->post('/admin/update/{id}','ProductsController@update');
Route::middleware('checkAdmin')->delete('/admin/delete/{id}','ProductsController@destroy');
Route::post('/auth', 'LoginController@login');