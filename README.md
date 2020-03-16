# Как развернуть проект локально
## Зависимости
- Node.js + npm
- php + mysql + apache (можно использовать XAMPP)
- angular: ^6.1.0
## Подготовка
1. Запустить Apache и MySql;
2. Зайти в phpMyAdmin и выполнить скрипт из файла VISHELNARAEN/server/database/eShop.sql;
3. Создать файл .env в папке VISHELNARAEN/server путем копирования содержимого .env.example;
4. Изменить значение следующих полей в .env: DB_DATABASE=eshop DB_USERNAME=root;
## Запуск
Для первого запуска локально, выполняется файл InstallAllPackages.bat,
находящийся в папке VISHELNARAEN/UsefullScripts, который установит все 
зависимости серверной и клиентской части.

Далее выполнить файл RunAllSides.bat, находящийся в той же папке, для запуска клиентской и
серверной части приложения.
