-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gazdă: 127.0.0.1
-- Timp de generare: ian. 30, 2023 la 02:02 PM
-- Versiune server: 10.4.24-MariaDB
-- Versiune PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Bază de date: `retetata_ro`
--

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `ingredient`
--

CREATE TABLE `ingredient` (
  `id` int(11) NOT NULL,
  `denumire` varchar(255) DEFAULT NULL,
  `descriere` varchar(255) DEFAULT NULL,
  `autor_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `ingredient`
--

INSERT INTO `ingredient` (`id`, `denumire`, `descriere`, `autor_id`) VALUES
(1, 'mandarina', 'mandarina', 1);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `ingredient_cantitate`
--

CREATE TABLE `ingredient_cantitate` (
  `id` bigint(20) NOT NULL,
  `cantitate` int(11) DEFAULT NULL,
  `ingredient_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `ingredient_cantitate`
--

INSERT INTO `ingredient_cantitate` (`id`, `cantitate`, `ingredient_id`) VALUES
(1, 121, 1);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `reteta`
--

CREATE TABLE `reteta` (
  `id` bigint(20) NOT NULL,
  `calorii` smallint(6) NOT NULL,
  `denumire` varchar(255) DEFAULT NULL,
  `descriere` varchar(255) DEFAULT NULL,
  `price_range` tinyint(4) DEFAULT 1,
  `autor` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `reteta`
--

INSERT INTO `reteta` (`id`, `calorii`, `denumire`, `descriere`, `price_range`, `autor`) VALUES
(2, 153, 'salata de legume', 'salata care contine doar legume', 2, 1),
(3, 0, 'Salata', 'salata de fructe', 3, NULL);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `reteta_ingredient_cantitate`
--

CREATE TABLE `reteta_ingredient_cantitate` (
  `reteta_id` bigint(20) NOT NULL,
  `ingredient_cantitate_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `reteta_ingredient_cantitate`
--

INSERT INTO `reteta_ingredient_cantitate` (`reteta_id`, `ingredient_cantitate_id`) VALUES
(2, 1);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `nume` varchar(255) DEFAULT NULL,
  `prenume` varchar(255) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `user`
--

INSERT INTO `user` (`id`, `nume`, `prenume`, `active`, `mail`, `password`, `phone_number`, `username`) VALUES
(1, 'Varul', 'Gabrielul', NULL, 'gariel12@varu.on32qe11122e', 'gaby', '07n-amcartela-sa', 'gabriel_varutul112'),
(2, 'Dinca', 'Andrei-Gabriel', NULL, 'andrei@dinca.one', 'parola123', '0774688660', 'andreid');

--
-- Indexuri pentru tabele eliminate
--

--
-- Indexuri pentru tabele `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_g13dqjke2ae68p4wufsqeikhy` (`denumire`),
  ADD KEY `autor_id` (`autor_id`);

--
-- Indexuri pentru tabele `ingredient_cantitate`
--
ALTER TABLE `ingredient_cantitate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

--
-- Indexuri pentru tabele `reteta`
--
ALTER TABLE `reteta`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_d76nb6a1f9s5m37sn31db9u42` (`denumire`),
  ADD UNIQUE KEY `UK_nwx74n06hf8nkuw0o7ona93ga` (`denumire`),
  ADD KEY `autor` (`autor`);

--
-- Indexuri pentru tabele `reteta_ingredient_cantitate`
--
ALTER TABLE `reteta_ingredient_cantitate`
  ADD PRIMARY KEY (`reteta_id`,`ingredient_cantitate_id`),
  ADD KEY `ingredient_cantitate_id` (`ingredient_cantitate_id`);

--
-- Indexuri pentru tabele `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_6sou31qus5dnws6dwfu61e71v` (`mail`),
  ADD UNIQUE KEY `UK_4bgmpi98dylab6qdvf9xyaxu4` (`phone_number`),
  ADD UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`);

--
-- AUTO_INCREMENT pentru tabele eliminate
--

--
-- AUTO_INCREMENT pentru tabele `ingredient`
--
ALTER TABLE `ingredient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pentru tabele `ingredient_cantitate`
--
ALTER TABLE `ingredient_cantitate`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pentru tabele `reteta`
--
ALTER TABLE `reteta`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pentru tabele `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constrângeri pentru tabele eliminate
--

--
-- Constrângeri pentru tabele `ingredient`
--
ALTER TABLE `ingredient`
  ADD CONSTRAINT `ingredient_ibfk_1` FOREIGN KEY (`autor_id`) REFERENCES `user` (`id`);

--
-- Constrângeri pentru tabele `ingredient_cantitate`
--
ALTER TABLE `ingredient_cantitate`
  ADD CONSTRAINT `ingredient_cantitate_ibfk_1` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`);

--
-- Constrângeri pentru tabele `reteta`
--
ALTER TABLE `reteta`
  ADD CONSTRAINT `reteta_ibfk_1` FOREIGN KEY (`autor`) REFERENCES `user` (`id`);

--
-- Constrângeri pentru tabele `reteta_ingredient_cantitate`
--
ALTER TABLE `reteta_ingredient_cantitate`
  ADD CONSTRAINT `reteta_ingredient_cantitate_ibfk_1` FOREIGN KEY (`reteta_id`) REFERENCES `reteta` (`id`),
  ADD CONSTRAINT `reteta_ingredient_cantitate_ibfk_2` FOREIGN KEY (`ingredient_cantitate_id`) REFERENCES `ingredient_cantitate` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
