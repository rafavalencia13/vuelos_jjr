-- Crear la base de datos
CREATE DATABASE vuelos_jjr;

-- Usar la base de datos
USE vuelos_jjr;

-- Tabla 'user'
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    address VARCHAR(255),
    password VARCHAR(100)
);

-- Tabla 'origin'
CREATE TABLE origin (
    origin_id INT AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(100),
    city VARCHAR(100),
    airport VARCHAR(100)
);

-- Tabla 'destiny'
CREATE TABLE destiny (
    destiny_id INT AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(100),
    city VARCHAR(100),
    airport VARCHAR(100)
);

-- Tabla 'airplane'
CREATE TABLE airplane (
    airplane_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

-- Tabla 'flight_class'
CREATE TABLE flight_class (
    flight_class_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2)
);

-- Tabla 'flight'
CREATE TABLE flight (
    flight_id INT AUTO_INCREMENT PRIMARY KEY,
    destiny_id INT,
    origin_id INT,
    date DATE,
    check_in DATETIME,
    check_out DATETIME,
    airplane_id INT,
    flight_state VARCHAR(255),
    FOREIGN KEY (destiny_id) REFERENCES destiny(destiny_id),
    FOREIGN KEY (origin_id) REFERENCES origin(origin_id),
    FOREIGN KEY (airplane_id) REFERENCES airplane(airplane_id)
);

-- Tabla 'seat'
CREATE TABLE seat (
    seat_id INT AUTO_INCREMENT PRIMARY KEY,
    flight_class_id INT,
    airplane_id INT,
    seat_state VARCHAR(255),
    FOREIGN KEY (flight_class_id) REFERENCES flight_class(flight_class_id),
    FOREIGN KEY (airplane_id) REFERENCES airplane(airplane_id)
);

-- Tabla 'user_flight'
CREATE TABLE user_flight (
    user_flight_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    flight_id INT,
    seat_id INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (flight_id) REFERENCES flight(flight_id),
    FOREIGN KEY (seat_id) REFERENCES seat(seat_id)
);

-- Registros
-- Registros para la tabla 'user'
INSERT INTO user (name, email, address, password) VALUES
('Rafael Lopez Valencia', 'rafael@example.com', 'Calle Principal 123, Ciudad', 'rafa123'),
('Jonathan Falcon Bustos', 'jona@example.com', 'Avenida Libertad 456, Pueblo', 'jona123'),
('Juan Carlos Magañá Ruperto', 'maga@example.com', 'Paseo de la Playa 789, Villa', 'maga123'),
('Juan Carloa Olmos Luna', 'daddyolmos@example.com', 'Boulevard Central 321, Pueblo', 'daddyolmos123'),
('Nayeli Olivares Flores', 'nayeli@example.com', 'Carrera 234, Ciudad', 'nayeli123');

-- Registros para la tabla 'origin'
INSERT INTO origin (country, city, airport) VALUES
('España', 'Madrid', 'Aeropuerto Ramos'),
('Francia', 'París', 'Aeropuerto Mbappe'),
('Estados Unidos', 'Nueva York', 'Aeropuerto Donovan'),
('Reino Unido', 'Londres', 'Aeropuerto Rooney'),
('Alemania', 'Berlín', 'Aeropuerto Kimmich');

-- Registros para la tabla 'destiny'
INSERT INTO destiny (country, city, airport) VALUES
('México', 'Ciudad de México', 'Aeropuerto Chicharito'),
('Argentina', 'Buenos Aires', 'Aeropuerto Messi'),
('Brasil', 'Río de Janeiro', 'Aeropuerto Neymar'),
('Italia', 'Roma', 'Aeropuerto Totti'),
('Japón', 'Tokio', 'Aeropuerto Kubo');

-- Registros para la tabla 'airplane'
INSERT INTO airplane (name) VALUES
('Boeing 737'),
('Airbus A320'),
('Boeing 777'),
('Airbus A350'),
('Embraer E190');

-- Registros para la tabla 'flight_class'
INSERT INTO flight_class (name, price) VALUES
('Económica', 100.00),
('Económica Premium', 150.00),
('Business', 300.00),
('Primera Clase', 500.00),
('Suite', 800.00);

-- Registros para la tabla 'flight'
INSERT INTO flight (destiny_id, origin_id, date, check_in, check_out, airplane_id, flight_state) VALUES
(1, 3, '2024-06-01', '2024-06-01 08:00:00', '2024-06-01 10:00:00', 1, 'Activo'),
(2, 4, '2024-06-02', '2024-06-02 09:00:00', '2024-06-02 11:00:00', 2, 'Activo'),
(3, 5, '2024-06-03', '2024-06-03 10:00:00', '2024-06-03 12:00:00', 3, 'Activo'),
(4, 1, '2024-06-04', '2024-06-04 11:00:00', '2024-06-04 13:00:00', 4, 'Activo'),
(5, 2, '2024-06-05', '2024-06-05 12:00:00', '2024-06-05 14:00:00', 5, 'Activo'),
(1, 4, '2024-06-06', '2024-06-06 13:00:00', '2024-06-06 15:00:00', 1, 'Activo'),
(2, 5, '2024-06-07', '2024-06-07 14:00:00', '2024-06-07 16:00:00', 2, 'Activo'),
(3, 1, '2024-06-08', '2024-06-08 15:00:00', '2024-06-08 17:00:00', 3, 'Activo'),
(4, 2, '2024-06-09', '2024-06-09 16:00:00', '2024-06-09 18:00:00', 4, 'Activo'),
(5, 3, '2024-06-10', '2024-06-10 17:00:00', '2024-06-10 19:00:00', 5, 'Activo'),
(1, 5, '2024-06-11', '2024-06-11 18:00:00', '2024-06-11 20:00:00', 1, 'Activo'),
(2, 1, '2024-06-12', '2024-06-12 19:00:00', '2024-06-12 21:00:00', 2, 'Activo'),
(3, 2, '2024-06-13', '2024-06-13 20:00:00', '2024-06-13 22:00:00', 3, 'Activo'),
(4, 3, '2024-06-14', '2024-06-14 21:00:00', '2024-06-14 23:00:00', 4, 'Activo'),
(5, 4, '2024-06-15', '2024-06-15 22:00:00', '2024-06-15 00:00:00', 5, 'Activo'),
(1, 3, '2024-06-16', '2024-06-16 23:00:00', '2024-06-17 01:00:00', 1, 'Activo'),
(2, 4, '2024-06-17', '2024-06-17 00:00:00', '2024-06-17 02:00:00', 2, 'Activo'),
(3, 5, '2024-06-18', '2024-06-18 01:00:00', '2024-06-18 03:00:00', 3, 'Activo'),
(4, 1, '2024-06-19', '2024-06-19 02:00:00', '2024-06-19 04:00:00', 4, 'Activo'),
(5, 2, '2024-06-20', '2024-06-20 03:00:00', '2024-06-20 05:00:00', 5, 'Activo'),
(1, 4, '2024-06-21', '2024-06-21 04:00:00', '2024-06-21 06:00:00', 1, 'Activo'),
(2, 5, '2024-06-22', '2024-06-22 05:00:00', '2024-06-22 07:00:00', 2, 'Activo'),
(3, 1, '2024-06-23', '2024-06-23 06:00:00', '2024-06-23 08:00:00', 3, 'Activo'),
(4, 2, '2024-06-24', '2024-06-24 07:00:00', '2024-06-24 09:00:00', 4, 'Activo'),
(5, 3, '2024-06-25', '2024-06-25 08:00:00', '2024-06-25 10:00:00', 5, 'Activo'),
(1, 3, '2024-06-26', '2024-06-26 08:00:00', '2024-06-26 10:00:00', 1, 'Activo'),
(1, 3, '2024-06-27', '2024-06-27 09:00:00', '2024-06-27 11:00:00', 2, 'Activo'),
(1, 3, '2024-06-28', '2024-06-28 10:00:00', '2024-06-28 12:00:00', 3, 'Activo'),
(1, 3, '2024-06-29', '2024-06-29 11:00:00', '2024-06-29 13:00:00', 4, 'Activo'),
(1, 3, '2024-06-30', '2024-06-30 12:00:00', '2024-06-30 14:00:00', 5, 'Activo'),
(1, 3, '2024-07-01', '2024-07-01 13:00:00', '2024-07-01 15:00:00', 1, 'Activo'),
(1, 3, '2024-07-02', '2024-07-02 14:00:00', '2024-07-02 16:00:00', 2, 'Activo'),
(1, 3, '2024-07-03', '2024-07-03 15:00:00', '2024-07-03 17:00:00', 3, 'Activo'),
(1, 3, '2024-07-04', '2024-07-04 16:00:00', '2024-07-04 18:00:00', 4, 'Activo'),
(1, 3, '2024-07-05', '2024-07-05 17:00:00', '2024-07-05 19:00:00', 5, 'Activo'),
(1, 3, '2024-07-06', '2024-07-06 18:00:00', '2024-07-06 20:00:00', 1, 'Activo'),
(1, 3, '2024-07-07', '2024-07-07 19:00:00', '2024-07-07 21:00:00', 2, 'Activo'),
(1, 3, '2024-07-08', '2024-07-08 20:00:00', '2024-07-08 22:00:00', 3, 'Activo'),
(1, 3, '2024-07-09', '2024-07-09 21:00:00', '2024-07-09 23:00:00', 4, 'Activo'),
(1, 3, '2024-07-10', '2024-07-10 22:00:00', '2024-07-10 00:00:00', 5, 'Activo'),
(1, 3, '2024-07-11', '2024-07-11 23:00:00', '2024-07-12 01:00:00', 1, 'Activo'),
(1, 3, '2024-07-12', '2024-07-12 00:00:00', '2024-07-12 02:00:00', 2, 'Activo'),
(1, 3, '2024-07-13', '2024-07-13 01:00:00', '2024-07-13 03:00:00', 3, 'Activo'),
(1, 3, '2024-07-14', '2024-07-14 02:00:00', '2024-07-14 04:00:00', 4, 'Activo'),
(1, 3, '2024-07-15', '2024-07-15 03:00:00', '2024-07-15 05:00:00', 5, 'Activo');

-- Registros para la tabla 'seat' para el avión con airplane_id = 1
INSERT INTO seat (flight_class_id, airplane_id, seat_state) VALUES
(1, 1, 'Disponible'),
(1, 1, 'Disponible'),
(2, 1, 'Disponible'),
(2, 1, 'Disponible'),
(3, 1, 'Disponible'),
(3, 1, 'Disponible'),
(4, 1, 'Disponible'),
(4, 1, 'Disponible'),
(5, 1, 'Disponible'),
(5, 1, 'Disponible');

-- Registros para la tabla 'seat' para el avión con airplane_id = 2
INSERT INTO seat (flight_class_id, airplane_id, seat_state) VALUES
(1, 2, 'Disponible'),
(1, 2, 'Disponible'),
(2, 2, 'Disponible'),
(2, 2, 'Disponible'),
(3, 2, 'Disponible'),
(3, 2, 'Disponible'),
(4, 2, 'Disponible'),
(4, 2, 'Disponible'),
(5, 2, 'Disponible'),
(5, 2, 'Disponible');

-- Registros para la tabla 'seat' para el avión con airplane_id = 3
INSERT INTO seat (flight_class_id, airplane_id, seat_state) VALUES
(1, 3, 'Disponible'),
(1, 3, 'Disponible'),
(2, 3, 'Disponible'),
(2, 3, 'Disponible'),
(3, 3, 'Disponible'),
(3, 3, 'Disponible'),
(4, 3, 'Disponible'),
(4, 3, 'Disponible'),
(5, 3, 'Disponible'),
(5, 3, 'Disponible');

-- Registros para la tabla 'seat' para el avión con airplane_id = 4
INSERT INTO seat (flight_class_id, airplane_id, seat_state) VALUES
(1, 4, 'Disponible'),
(1, 4, 'Disponible'),
(2, 4, 'Disponible'),
(2, 4, 'Disponible'),
(3, 4, 'Disponible'),
(3, 4, 'Disponible'),
(4, 4, 'Disponible'),
(4, 4, 'Disponible'),
(5, 4, 'Disponible'),
(5, 4, 'Disponible');

-- Registros para la tabla 'seat' para el avión con airplane_id = 5
INSERT INTO seat (flight_class_id, airplane_id, seat_state) VALUES
(1, 5, 'Disponible'),
(1, 5, 'Disponible'),
(2, 5, 'Disponible'),
(2, 5, 'Disponible'),
(3, 5, 'Disponible'),
(3, 5, 'Disponible'),
(4, 5, 'Disponible'),
(4, 5, 'Disponible'),
(5, 5, 'Disponible'),
(5, 5, 'Disponible');

-- Consultas principales a cada tabla
SELECT * FROM airplane;
SELECT * FROM destiny;
SELECT * FROM flight;
SELECT * FROM flight_class;
SELECT * FROM origin;
SELECT * FROM seat;
SELECT * FROM user;
SELECT * FROM user_flight;


