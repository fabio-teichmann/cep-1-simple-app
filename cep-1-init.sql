CREATE TABLE "trips" (
    id SERIAL PRIMARY KEY,
    destination VARCHAR(255) NOT NULL,
    country VARCHAR(255),
    trip_start DATE NOT NULL,
    trip_end DATE NOT NULL,
    notified INTEGER[]
);

INSERT INTO "trips" (destination, country, trip_start, trip_end, notified)
VALUES 
('Paris', 'France', '2024-05-01', '2024-05-10', NULL);

INSERT INTO "trips" (destination, country, trip_start, trip_end, notified)
VALUES 
('Tokyo', NULL, '2024-06-15', '2024-06-25', ARRAY[201, 202]);
