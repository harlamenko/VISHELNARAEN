<?php

use Illuminate\Http\Request;

Route::apiResource("/products", "ProductsController");
Route::post('/products/params','ProductsController@showProductsWithParams');
Route::get('/products/{id}','ProductsController@show');
Route::get('/admin/{id}', 'ProductsController@getAssortment');
Route::post('/auth', 'LoginController@login');
//Route::middleware('checkAdmin')->post('/products', 'ProductsController@store'); //Проверка на админа, для добавления нового товара
//Route::middleware('checkAdmin')->post('/products/{id}', 'ProductsController@update'); //Проверка на админа, для редактирования товара
//Route::middleware('checkAdmin')->delete('/products/{id}', 'ProductsController@destroy'); //Проверка на админа, для удаления товара