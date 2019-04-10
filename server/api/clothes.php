<?php

session_start();

//Headers
//header('Access-Control-Allow-Origin: *'); //Кто угодно может войти без авторизации
//header('Content-Type: application/json');
header('content-type application/json charset=utf-8');

include_once '../config/Database.php';

//Показ БД и соединение
$database = new Database();
$db = $database->connect();

$products = $db->query( "SELECT * FROM products");
$products = $products->fetchAll(PDO::FETCH_ASSOC);

foreach ($products as $product) {
    echo json_encode($product);
    echo ",";
}

?>