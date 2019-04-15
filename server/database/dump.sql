-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 15, 2019 at 05:58 PM
-- Server version: 5.7.23
-- PHP Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `eshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `cats`
--

CREATE TABLE `cats` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `rus_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cats`
--

INSERT INTO `cats` (`id`, `name`, `rus_name`) VALUES
(1, 'for_men', 'Для мужчин'),
(2, 'for_women', 'Для женщин');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `rus_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `name`, `rus_name`) VALUES
(1, 'black', 'чёрный'),
(2, 'white', 'белый'),
(3, 'red', 'красный'),
(4, 'orange', 'оранжевый'),
(5, 'yellow', 'желтый'),
(6, 'green', 'зеленый'),
(7, 'blue', 'синий'),
(8, 'violet', 'фиолетовый'),
(9, 'beige', 'бежевый'),
(10, 'sea', 'морской');

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_04_15_081702_create_games_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `username`, `email`, `phone`) VALUES
(1, 'Артур', 'apricart@mail.ru', '+7 (978) 73-92-056'),
(2, 'Артур', 'apricart@mail.ru', '+7 (978) 73-92-056'),
(3, 'Артур', 'apricart@mail.ru', '+7 (978) 73-92-056'),
(4, 'Артур', 'apricart@mail.ru', '+7 (978) 73-92-056'),
(5, 'Артур', 'apricart@mail.ru', '+7 (978) 73-92-056');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `cat` varchar(50) NOT NULL COMMENT 'категория',
  `type` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `rus_name` varchar(50) NOT NULL,
  `img` varchar(50) NOT NULL COMMENT 'ссылка на картинку'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `cat`, `type`, `price`, `rus_name`, `img`) VALUES
(1, 'AW-18 Classic Trousers', 'for_men', 'pants', 2500, 'AW-18 Classic Trousers', 'AW-18 Classic Trousers.jpg'),
(2, 'AW-18 Gray Ride', 'for_men', 'pants', 2000, 'AW-18 Gray Ride', 'AW-18 Gray Ride.jpg'),
(3, 'AW-18 World Sweatshirt', 'for_men', 'hoodies', 3000, 'AW-18 World Sweatshirt', 'AW-18 World Sweatshirt.jpg'),
(4, 'AW-18 Native Harbor Sweatshirt', 'for_men', 'hoodies', 3000, 'AW-18 Native Harbor Sweatshirt', 'AW-18 Native Harbor Sweatshirt.jpg'),
(5, 'AW-18 Freeline Sweatshirt', 'for_men', 'hoodies', 2000, 'AW-18 Freeline Sweatshirt', 'AW-18 Freeline Sweatshirt.jpg'),
(6, 'AW-18 Logo Sweatshirt', 'for_men', 'hoodies', 1500, 'AW-18 Logo Sweatshirt', 'AW-18 Logo Sweatshirt.jpg'),
(7, 'Cut and Sewed Sweatshirt', 'for_men', 'hoodies', 4000, 'Cut and Sewed Sweatshirt', 'Cut and Sewed Sweatshirt.jpg'),
(8, 'EMB Logo Hoodie', 'for_men', 'hoodies', 3800, 'EMB Logo Hoodie', 'EMB Logo Hoodie.jpg'),
(9, 'SailorPaul Twill Overshirt', 'for_men', 'hoodies', 3950, 'SailorPaul Twill Overshirt', 'SailorPaul Twill Overshirt.jpg'),
(10, 'SailorPaul Raw Denim Jacket', 'for_men', 'jackets', 5200, 'SailorPaul Raw Denim Jacket', 'SailorPaul Raw Denim Jacket.jpg'),
(11, 'SailorPaul Raw Denim Work Pants', 'for_men', 'pants', 4900, 'SailorPaul Raw Denim Work Pants', 'SailorPaul Raw Denim Work Pants.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `products_colors_sizes`
--

CREATE TABLE `products_colors_sizes` (
  `id_product` int(11) NOT NULL,
  `id_color` int(11) NOT NULL,
  `id_size` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products_colors_sizes`
--

INSERT INTO `products_colors_sizes` (`id_product`, `id_color`, `id_size`) VALUES
(1, 10, 3);

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`id`, `name`) VALUES
(1, 'XXS'),
(2, 'XS'),
(3, 'S'),
(4, 'M'),
(5, 'L'),
(6, 'XL'),
(7, '0X'),
(8, '1X'),
(9, '2X'),
(10, '3X');

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `rus_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `name`, `rus_name`) VALUES
(1, 'jackets', 'Куртки'),
(2, 'vests', 'Жилеты'),
(3, 'hoodies', 'Толстовки'),
(4, 't-shirts', 'Футболки'),
(5, 'polo', 'Поло'),
(6, 'shirts', 'Рубашки'),
(7, 'coats', 'Пиджаки'),
(8, 'pants', 'Брюки'),
(9, 'shorts', 'Шорты'),
(10, 'skirts', 'Юбки'),
(11, 'dresses', 'Платья');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cats`
--
ALTER TABLE `cats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name` (`name`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name` (`name`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cat` (`cat`),
  ADD KEY `type` (`type`);

--
-- Indexes for table `products_colors_sizes`
--
ALTER TABLE `products_colors_sizes`
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_colot` (`id_color`),
  ADD KEY `id_size` (`id_size`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cats`
--
ALTER TABLE `cats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`cat`) REFERENCES `cats` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`type`) REFERENCES `types` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products_colors_sizes`
--
ALTER TABLE `products_colors_sizes`
  ADD CONSTRAINT `products_colors_sizes_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `products_colors_sizes_ibfk_2` FOREIGN KEY (`id_color`) REFERENCES `colors` (`id`),
  ADD CONSTRAINT `products_colors_sizes_ibfk_3` FOREIGN KEY (`id_size`) REFERENCES `sizes` (`id`);

