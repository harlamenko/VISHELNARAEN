<?php

use Illuminate\Http\Request;

Route::apiResource("/products", "ProductsController");
Route::post('products_params','ProductsController@showProductsWithParams');
Route::post('/auth', 'LoginController@login');
Route::middleware('checkAdmin')->post('/products', 'ProductsController@store'); //Проверка на админа, для добавления нового товара
Route::middleware('checkAdmin')->post('/products/{id}', 'ProductsController@update'); //Проверка на админа, для редактирования товара
Route::middleware('checkAdmin')->delete('/products/{id}', 'ProductsController@destroy'); //Проверка на админа, для удаления товара
Route::get('products/title/{tagName}', 'ProductsController@searchByTitle');