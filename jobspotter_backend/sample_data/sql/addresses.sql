-- User 1
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser1'), '12 Abbey Road, Dublin', 'Abbey Road 12', 'Dublin', 'Dublin', 'D01 F2A5', 53.349805, -6.257198, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser1'), '45 High Street, Cork', 'High Street 45', 'Cork', 'Cork', 'T12 XY78', 51.898472, -8.471101, 'WORK', FALSE);

-- User 2
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser2'), '8 Dame Street, Dublin', 'Dame Street 8', 'Dublin', 'Dublin', 'D02 YX87', 53.344974, -6.263317, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser2'), '15 Patrick Street, Galway', 'Patrick Street 15', 'Galway', 'Galway', 'H91 XY23', 53.276121, -9.047420, 'WORK', FALSE);

-- User 3
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser3'), '22 Nassau Street, Dublin', 'Nassau Street 22', 'Dublin', 'Dublin', 'D02 XH34', 53.339014, -6.254103, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser3'), '6 O''Connell Street, Limerick', 'O''Connell Street 6', 'Limerick', 'Limerick', 'V94 L1R4', 52.663374, -8.624298, 'WORK', FALSE);

-- User 4
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser4'), '78 Capel Street, Dublin', 'Capel Street 78', 'Dublin', 'Dublin', 'D01 T3V8', 53.349147, -6.263757, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser4'), '34 O''Connell Avenue, Limerick', 'O''Connell Avenue 34', 'Limerick', 'Limerick', 'V94 X8FP', 52.667801, -8.624939, 'WORK', FALSE);

-- User 5
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser5'), '15 Dawson Street, Dublin', 'Dawson Street 15', 'Dublin', 'Dublin', 'D02 A229', 53.339217, -6.257202, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser5'), '22 High Street, Cork', 'High Street 22', 'Cork', 'Cork', 'T12 X8D5', 51.899466, -8.470437, 'WORK', FALSE);

-- User 6
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser6'), '33 Camden Street, Dublin', 'Camden Street 33', 'Dublin', 'Dublin', 'D02 XA36', 53.333813, -6.263143, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser6'), '18 St. Patrick''s Street, Cork', 'St. Patrick''s Street 18', 'Cork', 'Cork', 'T12 X8V4', 51.896789, -8.475231, 'WORK', FALSE);

-- User 7
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser7'), '49 Abbey Street, Dublin', 'Abbey Street 49', 'Dublin', 'Dublin', 'D01 F2P4', 53.348409, -6.261825, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser7'), '45 Rock Road, Dublin', 'Rock Road 45', 'Dublin', 'Dublin', 'D06 H2R7', 53.320705, -6.229681, 'WORK', FALSE);

-- User 8
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser8'), '60 Lower Camden Street, Dublin', 'Lower Camden Street 60', 'Dublin', 'Dublin', 'D02 N531', 53.332307, -6.262476, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser8'), '10 River Lane, Kilkenny', 'River Lane 10', 'Kilkenny', 'Kilkenny', 'R95 RY74', 52.652130, -7.250909, 'WORK', FALSE);

-- User 9
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser9'), '5 Stephen’s Green, Dublin', 'Stephen’s Green 5', 'Dublin', 'Dublin', 'D02 N279', 53.337522, -6.258478, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser9'), '12 Main Street, Galway', 'Main Street 12', 'Galway', 'Galway', 'H91 X3B6', 53.275436, -9.047873, 'WORK', FALSE);

-- User 10
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser10'), '77 Fitzwilliam Square, Dublin', 'Fitzwilliam Square 77', 'Dublin', 'Dublin', 'D02 K638', 53.336478, -6.238347, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser10'), '8 Barrack Street, Limerick', 'Barrack Street 8', 'Limerick', 'Limerick', 'V94 T3EX', 52.664063, -8.628390, 'WORK', FALSE);

















-- User 11
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser11'), '18 Clanbrassil Street, Dublin', 'Clanbrassil Street 18', 'Dublin', 'Dublin', 'D08 E1X9', 53.335052, -6.263259, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser11'), '54 Town Hall Street, Cork', 'Town Hall Street 54', 'Cork', 'Cork', 'T12 Y9N5', 51.897789, -8.470674, 'WORK', FALSE);

-- User 12
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser12'), '10 Westmoreland Street, Dublin', 'Westmoreland Street 10', 'Dublin', 'Dublin', 'D02 YY21', 53.340138, -6.256120, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser12'), '19 Patrick Street, Kilkenny', 'Patrick Street 19', 'Kilkenny', 'Kilkenny', 'R95 X9F5', 52.653201, -7.250711, 'WORK', FALSE);

-- User 13
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser13'), '30 Wexford Street, Dublin', 'Wexford Street 30', 'Dublin', 'Dublin', 'D02 TX41', 53.328028, -6.260476, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser13'), '23 High Road, Limerick', 'High Road 23', 'Limerick', 'Limerick', 'V94 T8V9', 52.659795, -8.629821, 'WORK', FALSE);


-- User 14
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser14'), '35 Mespil Road, Dublin', 'Mespil Road 35', 'Dublin', 'Dublin', 'D04 H304', 53.338335, -6.248197, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser14'), '5 O’Connell Street Upper, Limerick', 'O’Connell Street Upper 5', 'Limerick', 'Limerick', 'V94 K9Y7', 52.663053, -8.624832, 'WORK', FALSE);
-- I stopped here
-- User 15
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser15'), '12 St Stephen’s Green, Dublin', 'St Stephen’s Green 12', 'Dublin', 'Dublin', 'D02 VY12', 53.335817, -6.259532, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser15'), '40 Henry Street, Limerick', 'Henry Street 40', 'Limerick', 'Limerick', 'V94 X6P2', 52.667987, -8.629404, 'WORK', FALSE);

-- User 16
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser16'), '28 College Green, Dublin', 'College Green 28', 'Dublin', 'Dublin', 'D02 H304', 53.343351, -6.257542, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser16'), '14 Patrick Street, Kilkenny', 'Patrick Street 14', 'Kilkenny', 'Kilkenny', 'R95 T62C', 52.650536, -7.251039, 'WORK', FALSE);

-- User 17
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser17'), '1 St. Stephen’s Green, Dublin', 'St. Stephen’s Green 1', 'Dublin', 'Dublin', 'D02 U438', 53.335238, -6.258965, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser17'), '25 O’Connell Street, Limerick', 'O’Connell Street 25', 'Limerick', 'Limerick', 'V94 5W2P', 52.665036, -8.626617, 'WORK', FALSE);

-- User 18
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser18'), '18 Baggot Street, Dublin', 'Baggot Street 18', 'Dublin', 'Dublin', 'D02 V090', 53.338221, -6.250598, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser18'), '47 Henry Street, Limerick', 'Henry Street 47', 'Limerick', 'Limerick', 'V94 9NB4', 52.666871, -8.630073, 'WORK', FALSE);

-- User 19
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser19'), '27 Merrion Square, Dublin', 'Merrion Square 27', 'Dublin', 'Dublin', 'D02 X932', 53.338874, -6.250013, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser19'), '12 O’Connell Avenue, Limerick', 'O’Connell Avenue 12', 'Limerick', 'Limerick', 'V94 XY39', 52.667694, -8.627918, 'WORK', FALSE);

-- User 20
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser20'), '55 Clanbrassil Street, Dublin', 'Clanbrassil Street 55', 'Dublin', 'Dublin', 'D08 Y8P7', 53.337017, -6.264532, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser20'), '30 Roches Street, Limerick', 'Roches Street 30', 'Limerick', 'Limerick', 'V94 F9P3', 52.664431, -8.624826, 'WORK', FALSE);













-- User 21
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser21'), '14 Harcourt Street, Dublin', 'Harcourt Street 14', 'Dublin', 'Dublin', 'D02 XY12', 53.336874, -6.262013, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser21'), '15 Thomas Street, Limerick', 'Thomas Street 15', 'Limerick', 'Limerick', 'V94 XR45', 52.664321, -8.626431, 'WORK', FALSE);

-- User 22
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser22'), '5 Camden Row, Dublin', 'Camden Row 5', 'Dublin', 'Dublin', 'D08 TR92', 53.336512, -6.263789, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser22'), '8 Parnell Street, Limerick', 'Parnell Street 8', 'Limerick', 'Limerick', 'V94 FT29', 52.663891, -8.627915, 'WORK', FALSE);

-- User 23
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser23'), '33 Dawson Street, Dublin', 'Dawson Street 33', 'Dublin', 'Dublin', 'D02 YH47', 53.337892, -6.254123, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser23'), '22 Henry Street, Limerick', 'Henry Street 22', 'Limerick', 'Limerick', 'V94 FN68', 52.667123, -8.631145, 'WORK', FALSE);

-- User 24
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser24'), '48 Capel Street, Dublin', 'Capel Street 48', 'Dublin', 'Dublin', 'D07 WR83', 53.345217, -6.267982, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser24'), '17 Roches Street, Limerick', 'Roches Street 17', 'Limerick', 'Limerick', 'V94 PR39', 52.664569, -8.623572, 'WORK', FALSE);

-- User 25
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser25'), '29 Talbot Street, Dublin', 'Talbot Street 29', 'Dublin', 'Dublin', 'D01 FK82', 53.350192, -6.255781, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser25'), '10 Mallow Street, Limerick', 'Mallow Street 10', 'Limerick', 'Limerick', 'V94 WY39', 52.664112, -8.625432, 'WORK', FALSE);

-- User 26
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser26'), '60 Aungier Street, Dundalk', 'Aungier Street 60', 'Dundalk', 'Louth', 'A91 XY78', 53.338201, -6.263401, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser26'), '5 William Street, Drogheda', 'William Street 5', 'Drogheda', 'Louth', 'A92 XZ14', 53.663401, -6.626987, 'WORK', FALSE);

-- User 27
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser27'), '35 George’s Street, Dundalk', 'George’s Street 35', 'Dundalk', 'Louth', 'A91 FZ18', 53.342501, -6.265789, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser27'), '19 Ellen Street, Drogheda', 'Ellen Street 19', 'Drogheda', 'Louth', 'A92 HN29', 53.667142, -6.629123, 'WORK', FALSE);

-- User 28
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser28'), '10 Camden Street, Dundalk', 'Camden Street 10', 'Dundalk', 'Louth', 'A91 TG62', 53.335789, -6.264501, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser28'), '11 Henry Street, Drogheda', 'Henry Street 11', 'Drogheda', 'Louth', 'A92 PN11', 53.666487, -6.631234, 'WORK', FALSE);

-- User 29
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser29'), '88 Baggot Street, Dundalk', 'Baggot Street 88', 'Dundalk', 'Louth', 'A91 WX83', 53.338301, -6.249982, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser29'), '2 O’Connell Street, Drogheda', 'O’Connell Street 2', 'Drogheda', 'Louth', 'A92 KZ39', 53.665201, -6.628924, 'WORK', FALSE);

-- User 30
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser30'), '47 Harcourt Street, Dundalk', 'Harcourt Street 47', 'Dundalk', 'Louth', 'A91 UV92', 53.336491, -6.262401, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser30'), '5 Mallow Street, Drogheda', 'Mallow Street 5', 'Drogheda', 'Louth', 'A92 PT29', 53.664002, -6.625221, 'WORK', FALSE);












-- User 31
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser31'), '23 Dawson Street, Kilkenny', 'Dawson Street 23', 'Kilkenny', 'Kilkenny', 'R95 F592', 52.654307, -7.252530, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser31'), '8 Pery Square, Waterford', 'Pery Square 8', 'Waterford', 'Waterford', 'X91 W4KC', 52.259447, -7.110140, 'WORK', FALSE);

-- User 32
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser32'), '14 Abbey Street, Cork', 'Abbey Street 14', 'Cork', 'Cork', 'T12 WP74', 51.898501, -8.259222, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser32'), '33 Thomas Street, Galway', 'Thomas Street 33', 'Galway', 'Galway', 'H91 PF62', 53.268890, -9.062325, 'WORK', FALSE);

-- User 33
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser33'), '99 Nassau Street, Sligo', 'Nassau Street 99', 'Sligo', 'Sligo', 'F91 N2Y8', 54.270425, -8.470191, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser33'), '44 Catherine Street, Clonmel', 'Catherine Street 44', 'Clonmel', 'Tipperary', 'E91 X9W7', 52.355186, -7.703448, 'WORK', FALSE);

-- User 34
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser34'), '3 Stephen’s Green, Athlone', 'Stephen’s Green 3', 'Athlone', 'Westmeath', 'N37 T8H8', 53.423821, -7.942273, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser34'), '17 O’Connell Street, Ballina', 'O’Connell Street 17', 'Ballina', 'Mayo', 'F26 YQ03', 54.118253, -9.174603, 'WORK', FALSE);

-- User 35
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser35'), '21 Capel Street, Kilkenny', 'Capel Street 21', 'Kilkenny', 'Kilkenny', 'R95 AK71', 52.654481, -7.252801, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser35'), '6 Arthur’s Quay, Tullamore', 'Arthur’s Quay 6', 'Tullamore', 'Offaly', 'R35 VX58', 53.271010, -7.501151, 'WORK', FALSE);

-- User 36
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser36'), '72 Camden Street, Tralee', 'Camden Street 72', 'Tralee', 'Kerry', 'V92 EC80', 52.271308, -9.701982, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser36'), '50 Parnell Street, Kilkenny', 'Parnell Street 50', 'Kilkenny', 'Kilkenny', 'R95 E0A1', 52.654432, -7.255641, 'WORK', FALSE);

-- User 37
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser37'), '19 Harcourt Street, Limerick', 'Harcourt Street 19', 'Limerick', 'Limerick', 'V94 9V6G', 52.670462, -8.623556, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser37'), '9 Bedford Row, Killarney', 'Bedford Row 9', 'Killarney', 'Kerry', 'V93 XK82', 52.072813, -9.505768, 'WORK', FALSE);

-- User 38
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser38'), '45 South Great George’s Street, Wexford', 'South Great George’s Street 45', 'Wexford', 'Wexford', 'Y35 J2W3', 52.259356, -6.461126, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser38'), '28 Sarsfield Street, Mullingar', 'Sarsfield Street 28', 'Mullingar', 'Westmeath', 'N91 KX48', 53.525612, -7.355342, 'WORK', FALSE);

-- User 39
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser39'), '60 Upper Baggot Street, Navan', 'Upper Baggot Street 60', 'Navan', 'Meath', 'C15 Y68K', 53.652056, -6.671907, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser39'), '12 Henry Street, Drogheda', 'Henry Street 12', 'Drogheda', 'Louth', 'A92 X6R8', 53.720499, -6.347556, 'WORK', FALSE);

-- User 40
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser40'), '4 Rathmines Road, Carlow', 'Rathmines Road 4', 'Carlow', 'Carlow', 'R93 W840', 52.846030, -6.933505, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser40'), '15 Cruises Street, Arklow', 'Cruises Street 15', 'Arklow', 'Wicklow', 'Y14 PX79', 52.779139, -6.147036, 'WORK', FALSE);









-- User 41
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser41'), '34 The Crescent, Cork', 'The Crescent 34', 'Cork', 'Cork', 'T12 D2N7', 51.900112, -8.472512, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser41'), '25 Main Street, Tralee', 'Main Street 25', 'Tralee', 'Kerry', 'V92 E8H8', 52.271510, -9.703218, 'WORK', FALSE);

-- User 42
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser42'), '15 Pembroke Street, Galway', 'Pembroke Street 15', 'Galway', 'Galway', 'H91 FRT4', 53.277814, -9.048722, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser42'), '5 Clonard Road, Wexford', 'Clonard Road 5', 'Wexford', 'Wexford', 'Y35 E5C3', 52.338692, -6.462131, 'WORK', FALSE);

-- User 43
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser43'), '12 Kilmore Road, Waterford', 'Kilmore Road 12', 'Waterford', 'Waterford', 'X91 YF80', 52.259522, -7.133514, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser43'), '50 Main Street, Cavan', 'Main Street 50', 'Cavan', 'Cavan', 'H12 X6D7', 53.989412, -7.353221, 'WORK', FALSE);

-- User 44
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser44'), '10 Church Road, Kilkenny', 'Church Road 10', 'Kilkenny', 'Kilkenny', 'R95 A9Y4', 52.646510, -7.252653, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser44'), '23 Mallow Street, Ennis', 'Mallow Street 23', 'Ennis', 'Clare', 'V95 WP57', 52.847295, -8.981859, 'WORK', FALSE);

-- User 45
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser45'), '7 Dunmore Road, Waterford', 'Dunmore Road 7', 'Waterford', 'Waterford', 'X91 X3A4', 52.265893, -7.086230, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser45'), '2 Market Square, Tullamore', 'Market Square 2', 'Tullamore', 'Offaly', 'R35 H285', 53.272043, -7.499612, 'WORK', FALSE);

-- User 46
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser46'), '8 O’Connell Street, Limerick', 'O’Connell Street 8', 'Limerick', 'Limerick', 'V94 A1C2', 52.668102, -8.623487, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser46'), '9 Castle Road, Arklow', 'Castle Road 9', 'Arklow', 'Wicklow', 'Y14 AY88', 52.788101, -6.129801, 'WORK', FALSE);

-- User 47
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser47'), '14 High Street, Clonmel', 'High Street 14', 'Clonmel', 'Tipperary', 'E91 X9W7', 52.355907, -7.706717, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser47'), '25 John Street, Kilkenny', 'John Street 25', 'Kilkenny', 'Kilkenny', 'R95 C95T', 52.646791, -7.258344, 'WORK', FALSE);

-- User 48
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser48'), '16 Pembroke Lane, Cork', 'Pembroke Lane 16', 'Cork', 'Cork', 'T12 Y4X4', 51.899238, -8.472047, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser48'), '17 Main Street, Sligo', 'Main Street 17', 'Sligo', 'Sligo', 'F91 NPK6', 54.276302, -8.476184, 'WORK', FALSE);

-- User 49
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser49'), '19 Castle Avenue, Derry', 'Castle Avenue 19', 'Derry', 'Louth', 'BT48 7BE', 54.991717, -7.329114, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser49'), '5 Market Street, Carlow', 'Market Street 5', 'Carlow', 'Carlow', 'R93 V9X2', 52.846469, -6.929873, 'WORK', FALSE);

-- User 50
INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser50'), '2 Railway Street, Louth', 'Railway Street 2', 'Louth', 'Louth', 'A91 F655', 53.983215, -6.416589, 'HOME', FALSE);

INSERT INTO addresses (user_id, street_address, address, city, county, eir_code, latitude, longitude, address_type, is_default)
VALUES
    ((SELECT user_id FROM users WHERE username = 'testuser50'), '28 Ormonde Road, Waterford', 'Ormonde Road 28', 'Waterford', 'Waterford', 'X91 P2X7', 52.267004, -7.085574, 'WORK', FALSE);






