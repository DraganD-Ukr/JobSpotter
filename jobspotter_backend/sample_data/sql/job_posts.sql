-- User 1 (testuser1)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('662fdc3e-937b-4042-96e5-358de745695c', 'Delivery Driver', 'Looking for a delivery driver for local deliveries within Dublin.', '12 Abbey Road, Dublin', 53.349805, -6.257198, 10, 'OPEN', '2025-02-15 10:00:00', '2025-02-16 14:00:00'),
    ('662fdc3e-937b-4042-96e5-358de745695c', 'Courier', 'Courier required for transporting packages around Dublin.', '12 Abbey Road, Dublin', 53.349805, -6.257198, 10, 'OPEN', '2025-02-16 12:00:00', '2025-02-16 16:00:00'),
    ('662fdc3e-937b-4042-96e5-358de745695c', 'Part-time Driver', 'Looking for a part-time driver to help with local deliveries.', '12 Abbey Road, Dublin', 53.349805, -6.257198, 8, 'OPEN', '2025-02-16 14:30:00', '2025-02-16 17:00:00'),
    ('662fdc3e-937b-4042-96e5-358de745695c', 'Personal Driver', 'Hiring a personal driver for errands in Dublin.', '12 Abbey Road, Dublin', 53.349805, -6.257198, 5, 'IN_PROGRESS', '2025-02-16 17:30:00', '2025-02-16 19:00:00'),
    ('662fdc3e-937b-4042-96e5-358de745695c', 'Delivery Helper', 'Looking for a helper to assist with deliveries.', '12 Abbey Road, Dublin', 53.349805, -6.257198, 6, 'OPEN', '2025-02-16 20:00:00', '2025-02-16 22:00:00'),
    ('662fdc3e-937b-4042-96e5-358de745695c', 'Food Delivery', 'Food delivery driver needed for restaurant orders.', '12 Abbey Road, Dublin', 53.349805, -6.257198, 7, 'OPEN', '2025-02-16 22:30:00', '2025-02-17 00:00:00'),
    ('662fdc3e-937b-4042-96e5-358de745695c', 'Package Transport', 'Need a driver for transporting packages.', '45 High Street, Cork', 51.898472, -8.471101, 9, 'OPEN', '2025-02-17 01:00:00', '2025-02-17 03:00:00'),
    ('662fdc3e-937b-4042-96e5-358de745695c', 'Weekend Driver', 'Weekend driver required for errands and transport.', '45 High Street, Cork', 51.898472, -8.471101, 4, 'COMPLETED', '2025-02-17 03:30:00', '2025-02-17 05:00:00'),
    ('662fdc3e-937b-4042-96e5-358de745695c', 'City Driver', 'Driver needed for city-wide transport during business hours.', '45 High Street, Cork', 51.898472, -8.471101, 10, 'OPEN', '2025-02-17 05:30:00', '2025-02-17 07:00:00'),
    ('662fdc3e-937b-4042-96e5-358de745695c', 'Evening Driver', 'Evening driver required for deliveries after 5 PM.', '45 High Street, Cork', 51.898472, -8.471101, 6, 'COMPLETED', '2025-02-17 07:30:00', '2025-02-17 09:00:00');

-- User 2 (testuser2)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('daba8f97-9ee9-4a1d-ba28-08f1fb58128a', 'Housekeeper', 'Looking for a housekeeper for cleaning tasks in the Cork area.', '8 Dame Street, Dublin', 53.344974, -6.263317, 8, 'OPEN', '2025-02-16 08:30:00', '2025-02-16 15:30:00'),
    ('daba8f97-9ee9-4a1d-ba28-08f1fb58128a', 'Cleaner', 'Seeking a cleaner for weekly cleaning in Cork.', '8 Dame Street, Dublin', 53.344974, -6.263317, 6, 'OPEN', '2025-02-16 10:00:00', '2025-02-16 13:30:00'),
    ('daba8f97-9ee9-4a1d-ba28-08f1fb58128a', 'Domestic Cleaner', 'Looking for a domestic cleaner to help with household chores in Cork.', '8 Dame Street, Dublin', 53.344974, -6.263317, 5, 'OPEN', '2025-02-16 11:30:00', '2025-02-16 14:00:00'),
    ('daba8f97-9ee9-4a1d-ba28-08f1fb58128a', 'Office Cleaner', 'Office cleaning required in Cork.', '8 Dame Street, Dublin', 53.344974, -6.263317, 7, 'IN_PROGRESS', '2025-02-16 12:30:00', '2025-02-16 15:00:00'),
    ('daba8f97-9ee9-4a1d-ba28-08f1fb58128a', 'Housekeeping Assistant', 'Seeking a housekeeping assistant for daily chores.', '8 Dame Street, Dublin', 53.344974, -6.263317, 4, 'OPEN', '2025-02-16 14:00:00', '2025-02-16 16:30:00'),
    ('daba8f97-9ee9-4a1d-ba28-08f1fb58128a', 'Deep Cleaning', 'Looking for someone to perform a deep cleaning in the Cork area.', '8 Dame Street, Dublin', 53.344974, -6.263317, 6, 'OPEN', '2025-02-16 16:00:00', '2025-02-16 18:30:00'),
    ('daba8f97-9ee9-4a1d-ba28-08f1fb58128a', 'Spring Cleaning', 'Spring cleaning services needed in Cork.', '15 Patrick Street, Galway', 53.276121, -9.047420, 7, 'OPEN', '2025-02-16 18:00:00', '2025-02-16 19:30:00'),
    ('daba8f97-9ee9-4a1d-ba28-08f1fb58128a', 'Home Organizer', 'Need help with organizing the home in Cork.', '15 Patrick Street, Galway', 53.276121, -9.047420, 5, 'COMPLETED', '2025-02-16 19:00:00', '2025-02-16 20:30:00'),
    ('daba8f97-9ee9-4a1d-ba28-08f1fb58128a', 'Apartment Cleaner', 'Apartment cleaning required for a 2-bedroom unit in Cork.', '15 Patrick Street, Galway', 53.276121, -9.047420, 6, 'OPEN', '2025-02-16 20:00:00', '2025-02-16 22:00:00'),
    ('daba8f97-9ee9-4a1d-ba28-08f1fb58128a', 'Vacation Housekeeper', 'Housekeeping needed for a vacation rental in Cork.', '15 Patrick Street, Galway', 53.276121, -9.047420, 4, 'IN_PROGRESS', '2025-02-16 22:30:00', '2025-02-17 00:00:00');

-- User 3 (testuser3)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('29402251-9129-4d85-8995-94f3b3772dc5', 'Web Developer', 'Looking for a web developer for a short-term project in Dublin.', '22 Nassau Street, Dublin', 53.339014, -6.254103, 5, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 12:00:00'),
    ('29402251-9129-4d85-8995-94f3b3772dc5', 'Graphic Designer', 'Graphic designer needed for a rebranding project in Dublin.', '22 Nassau Street, Dublin', 53.339014, -6.254103, 6, 'OPEN', '2025-02-14 10:30:00', '2025-02-14 13:00:00'),
    ('29402251-9129-4d85-8995-94f3b3772dc5', 'Software Engineer', 'Seeking a software engineer for backend development in Dublin.', '22 Nassau Street, Dublin', 53.339014, -6.254103, 4, 'IN_PROGRESS', '2025-02-14 11:00:00', '2025-02-14 13:30:00'),
    ('29402251-9129-4d85-8995-94f3b3772dc5', 'Content Writer', 'Looking for a content writer for blog posts and articles in Dublin.', '22 Nassau Street, Dublin', 53.339014, -6.254103, 8, 'COMPLETED', '2025-02-14 12:00:00', '2025-02-14 14:00:00'),
    ('29402251-9129-4d85-8995-94f3b3772dc5', 'Data Scientist', 'Hiring a data scientist for a research project in Dublin.', '22 Nassau Street, Dublin', 53.339014, -6.254103, 7, 'OPEN', '2025-02-14 13:00:00', '2025-02-14 14:30:00'),
    ('29402251-9129-4d85-8995-94f3b3772dc5', 'Backend Developer', 'Backend developer needed for web application in Dublin.', '22 Nassau Street, Dublin', 53.339014, -6.254103, 6, 'IN_PROGRESS', '2025-02-14 14:00:00', '2025-02-14 15:30:00'),
    ('29402251-9129-4d85-8995-94f3b3772dc5', 'Database Administrator', 'Database admin required for optimizing MySQL databases in Limerick.', '6 O''Connell Street, Limerick', 52.663374, -8.624298, 5, 'OPEN', '2025-02-14 14:30:00', '2025-02-14 16:00:00'),
    ('29402251-9129-4d85-8995-94f3b3772dc5', 'Project Manager', 'Looking for a project manager for a client project in Limerick.', '6 O''Connell Street, Limerick', 52.663374, -8.624298, 4, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 16:30:00'),
    ('29402251-9129-4d85-8995-94f3b3772dc5', 'SEO Specialist', 'SEO specialist needed to optimize website for search engines in Limerick.', '6 O''Connell Street, Limerick', 52.663374, -8.624298, 7, 'COMPLETED', '2025-02-14 16:30:00', '2025-02-14 18:00:00'),
    ('29402251-9129-4d85-8995-94f3b3772dc5', 'IT Support Specialist', 'IT support specialist needed for troubleshooting issues in Limerick.', '6 O''Connell Street, Limerick', 52.663374, -8.624298, 8, 'IN_PROGRESS', '2025-02-14 17:00:00', '2025-02-14 18:30:00');


-- User 4 (testuser4)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('8eb1c086-b4ec-454a-9ae4-50b98738e7a3', 'Photographer', 'Looking for a photographer for an event in Dublin.', '78 Capel Street, Dublin', 53.349147, -6.263757, 5, 'OPEN', '2025-02-15 09:00:00', '2025-02-15 10:30:00'),
    ('8eb1c086-b4ec-454a-9ae4-50b98738e7a3', 'Event Coordinator', 'Event coordinator needed for managing an event in Dublin.', '78 Capel Street, Dublin', 53.349147, -6.263757, 6, 'OPEN', '2025-02-15 10:30:00', '2025-02-15 12:00:00'),
    ('8eb1c086-b4ec-454a-9ae4-50b98738e7a3', 'Massage Therapist', 'Looking for a massage therapist for home visits in Dublin.', '78 Capel Street, Dublin', 53.349147, -6.263757, 4, 'IN_PROGRESS', '2025-02-15 11:00:00', '2025-02-15 12:30:00'),
    ('8eb1c086-b4ec-454a-9ae4-50b98738e7a3', 'Personal Trainer', 'Personal trainer needed for one-on-one sessions in Dublin.', '78 Capel Street, Dublin', 53.349147, -6.263757, 7, 'COMPLETED', '2025-02-15 12:00:00', '2025-02-15 13:30:00'),
    ('8eb1c086-b4ec-454a-9ae4-50b98738e7a3', 'Cook/Chef', 'Looking for a chef to prepare meals in Dublin.', '78 Capel Street, Dublin', 53.349147, -6.263757, 5, 'OPEN', '2025-02-15 13:00:00', '2025-02-15 14:30:00'),
    ('8eb1c086-b4ec-454a-9ae4-50b98738e7a3', 'HR Specialist', 'HR specialist needed for talent acquisition in Limerick.', '34 O''Connell Avenue, Limerick', 52.667801, -8.624939, 5, 'OPEN', '2025-02-15 14:00:00', '2025-02-15 15:30:00'),
    ('8eb1c086-b4ec-454a-9ae4-50b98738e7a3', 'Carpenter', 'Hiring a carpenter for home repairs in Limerick.', '34 O''Connell Avenue, Limerick', 52.667801, -8.624939, 6, 'IN_PROGRESS', '2025-02-15 15:30:00', '2025-02-15 17:00:00'),
    ('8eb1c086-b4ec-454a-9ae4-50b98738e7a3', 'Plumber', 'Plumber needed for pipe installations and repairs in Limerick.', '34 O''Connell Avenue, Limerick', 52.667801, -8.624939, 8, 'COMPLETED', '2025-02-15 16:00:00', '2025-02-15 17:30:00'),
    ('8eb1c086-b4ec-454a-9ae4-50b98738e7a3', 'Electrician', 'Looking for an electrician to fix electrical issues in Limerick.', '34 O''Connell Avenue, Limerick', 52.667801, -8.624939, 7, 'IN_PROGRESS', '2025-02-15 17:00:00', '2025-02-15 18:30:00'),
    ('8eb1c086-b4ec-454a-9ae4-50b98738e7a3', 'Painter', 'Painter needed for painting a house in Limerick.', '34 O''Connell Avenue, Limerick', 52.667801, -8.624939, 6, 'OPEN', '2025-02-15 18:00:00', '2025-02-15 19:30:00');


-- User 5 (testuser5)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('21ae75e6-0753-4d60-96df-058caa7983e1', 'Receptionist', 'Looking for a receptionist in Dublin.', '15 Dawson Street, Dublin', 53.339217, -6.257202, 4, 'OPEN', '2025-02-15 09:00:00', '2025-02-15 10:30:00'),
    ('21ae75e6-0753-4d60-96df-058caa7983e1', 'Driver', 'Driver needed for transporting goods within Dublin.', '15 Dawson Street, Dublin', 53.339217, -6.257202, 6, 'IN_PROGRESS', '2025-02-15 10:30:00', '2025-02-15 12:00:00'),
    ('21ae75e6-0753-4d60-96df-058caa7983e1', 'Security Guard', 'Hiring a security guard for office buildings in Dublin.', '15 Dawson Street, Dublin', 53.339217, -6.257202, 5, 'OPEN', '2025-02-15 11:00:00', '2025-02-15 12:30:00'),
    ('21ae75e6-0753-4d60-96df-058caa7983e1', 'Barista', 'Barista needed for a cafe in Dublin.', '15 Dawson Street, Dublin', 53.339217, -6.257202, 4, 'COMPLETED', '2025-02-15 12:00:00', '2025-02-15 13:30:00'),
    ('21ae75e6-0753-4d60-96df-058caa7983e1', 'Retail Assistant', 'Retail assistant needed for a shop in Dublin.', '15 Dawson Street, Dublin', 53.339217, -6.257202, 7, 'IN_PROGRESS', '2025-02-15 13:00:00', '2025-02-15 14:30:00'),
    ('21ae75e6-0753-4d60-96df-058caa7983e1', 'Waiter', 'Looking for a waiter for a restaurant in Cork.', '22 High Street, Cork', 51.899466, -8.470437, 6, 'OPEN', '2025-02-15 14:00:00', '2025-02-15 15:30:00'),
    ('21ae75e6-0753-4d60-96df-058caa7983e1', 'Chef', 'Chef needed for preparing meals in a restaurant in Cork.', '22 High Street, Cork', 51.899466, -8.470437, 5, 'IN_PROGRESS', '2025-02-15 15:30:00', '2025-02-15 17:00:00'),
    ('21ae75e6-0753-4d60-96df-058caa7983e1', 'Cleaner', 'Cleaner needed for office space in Cork.', '22 High Street, Cork', 51.899466, -8.470437, 4, 'COMPLETED', '2025-02-15 16:00:00', '2025-02-15 17:30:00'),
    ('21ae75e6-0753-4d60-96df-058caa7983e1', 'Cook', 'Cook needed for a small diner in Cork.', '22 High Street, Cork', 51.899466, -8.470437, 6, 'IN_PROGRESS', '2025-02-15 17:00:00', '2025-02-15 18:30:00'),
    ('21ae75e6-0753-4d60-96df-058caa7983e1', 'Bartender', 'Bartender needed for a pub in Cork.', '22 High Street, Cork', 51.899466, -8.470437, 5, 'OPEN', '2025-02-15 18:00:00', '2025-02-15 19:30:00');


-- User 6 (testuser6)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('cf9c2dd9-860c-40bb-af4c-834db97e6048', 'Lawn Care', 'Offering lawn care services in Dublin.', '33 Camden Street, Dublin', 53.333813, -6.263143, 5, 'OPEN', '2025-02-15 19:30:00', '2025-02-15 20:00:00'),
    ('cf9c2dd9-860c-40bb-af4c-834db97e6048', 'Babysitting', 'Looking for someone to take care of kids in the Cork area.', '18 St. Patrick’s Street, Cork', 51.896789, -8.475231, 4, 'OPEN', '2025-02-15 20:00:00', '2025-02-15 21:00:00'),
    ('cf9c2dd9-860c-40bb-af4c-834db97e6048', 'Pet Sitting', 'Need a pet sitter for a weekend in Cork.', '18 St. Patrick’s Street, Cork', 51.896789, -8.475231, 3, 'IN_PROGRESS', '2025-02-15 21:00:00', '2025-02-15 22:30:00'),
    ('cf9c2dd9-860c-40bb-af4c-834db97e6048', 'Grocery Delivery', 'Looking for someone to deliver groceries in the Dublin area.', '33 Camden Street, Dublin', 53.333813, -6.263143, 5, 'COMPLETED', '2025-02-15 22:00:00', '2025-02-15 23:30:00'),
    ('cf9c2dd9-860c-40bb-af4c-834db97e6048', 'House Cleaning', 'House cleaning services available in Cork.', '18 St. Patrick’s Street, Cork', 51.896789, -8.475231, 6, 'OPEN', '2025-02-15 23:00:00', '2025-02-16 00:30:00'),
    ('cf9c2dd9-860c-40bb-af4c-834db97e6048', 'Tutoring', 'Math tutor needed for high school students in Cork.', '18 St. Patrick’s Street, Cork', 51.896789, -8.475231, 4, 'IN_PROGRESS', '2025-02-16 00:00:00', '2025-02-16 01:30:00'),
    ('cf9c2dd9-860c-40bb-af4c-834db97e6048', 'Gardening', 'Gardener needed for small garden in Dublin.', '33 Camden Street, Dublin', 53.333813, -6.263143, 5, 'OPEN', '2025-02-16 01:00:00', '2025-02-16 02:30:00'),
    ('cf9c2dd9-860c-40bb-af4c-834db97e6048', 'Car Wash', 'Looking for someone to wash a car in Dublin.', '33 Camden Street, Dublin', 53.333813, -6.263143, 4, 'COMPLETED', '2025-02-16 02:00:00', '2025-02-16 03:30:00'),
    ('cf9c2dd9-860c-40bb-af4c-834db97e6048', 'Painting', 'Need someone to help with painting a house in Cork.', '18 St. Patrick’s Street, Cork', 51.896789, -8.475231, 6, 'OPEN', '2025-02-16 03:00:00', '2025-02-16 04:30:00'),
    ('cf9c2dd9-860c-40bb-af4c-834db97e6048', 'Handyman', 'Looking for a handyman for repairs in Cork.', '18 St. Patrick’s Street, Cork', 51.896789, -8.475231, 4, 'IN_PROGRESS', '2025-02-16 04:00:00', '2025-02-16 05:30:00');


-- User 7 (testuser7)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('32def82c-db8a-4d8a-8469-e24b76723762', 'Plumbing Services', 'Looking for a plumber to fix a leaky pipe in Dublin.', '49 Abbey Street, Dublin', 53.348409, -6.261825, 3, 'OPEN', '2025-02-17 10:00:00', '2025-02-17 10:30:00'),
    ('32def82c-db8a-4d8a-8469-e24b76723762', 'Carpet Cleaning', 'Offering carpet cleaning services in Dublin.', '45 Rock Road, Dublin', 53.320705, -6.229681, 4, 'IN_PROGRESS', '2025-02-17 11:00:00', '2025-02-17 11:45:00'),
    ('32def82c-db8a-4d8a-8469-e24b76723762', 'House Painting', 'Need a painter for house exterior in Dublin.', '49 Abbey Street, Dublin', 53.348409, -6.261825, 5, 'OPEN', '2025-02-17 12:00:00', '2025-02-17 12:45:00'),
    ('32def82c-db8a-4d8a-8469-e24b76723762', 'Tree Trimming', 'Looking for someone to trim trees in the garden.', '45 Rock Road, Dublin', 53.320705, -6.229681, 3, 'COMPLETED', '2025-02-17 13:00:00', '2025-02-17 13:30:00'),
    ('32def82c-db8a-4d8a-8469-e24b76723762', 'House Cleaning', 'House cleaning needed in Dublin.', '49 Abbey Street, Dublin', 53.348409, -6.261825, 4, 'OPEN', '2025-02-17 14:00:00', '2025-02-17 14:30:00'),
    ('32def82c-db8a-4d8a-8469-e24b76723762', 'Grocery Delivery', 'Looking for someone to deliver groceries in Dublin.', '45 Rock Road, Dublin', 53.320705, -6.229681, 5, 'IN_PROGRESS', '2025-02-17 15:00:00', '2025-02-17 15:30:00'),
    ('32def82c-db8a-4d8a-8469-e24b76723762', 'Window Washing', 'Need someone to wash windows in Dublin.', '49 Abbey Street, Dublin', 53.348409, -6.261825, 3, 'COMPLETED', '2025-02-17 16:00:00', '2025-02-17 16:30:00'),
    ('32def82c-db8a-4d8a-8469-e24b76723762', 'Gardening', 'Looking for a gardener to clean the backyard in Dublin.', '45 Rock Road, Dublin', 53.320705, -6.229681, 5, 'OPEN', '2025-02-17 17:00:00', '2025-02-17 17:30:00'),
    ('32def82c-db8a-4d8a-8469-e24b76723762', 'Dog Walking', 'Seeking someone to walk my dog in Dublin.', '49 Abbey Street, Dublin', 53.348409, -6.261825, 4, 'IN_PROGRESS', '2025-02-17 18:00:00', '2025-02-17 18:30:00'),
    ('32def82c-db8a-4d8a-8469-e24b76723762', 'Snow Removal', 'Snow removal services needed for driveway in Dublin.', '45 Rock Road, Dublin', 53.320705, -6.229681, 6, 'OPEN', '2025-02-17 19:00:00', '2025-02-17 19:30:00');


-- User 8 (testuser8)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('292e9e71-6c87-4afc-9af4-b3ac40dcfcca', 'Electrician Services', 'Looking for an electrician to fix faulty wiring in Dublin.', '60 Lower Camden Street, Dublin', 53.332307, -6.262476, 3, 'OPEN', '2025-02-17 10:00:00', '2025-02-17 10:30:00'),
    ('292e9e71-6c87-4afc-9af4-b3ac40dcfcca', 'Mowing Services', 'Need someone to mow the lawn in Kilkenny.', '10 River Lane, Kilkenny', 52.652130, -7.250909, 4, 'IN_PROGRESS', '2025-02-17 11:00:00', '2025-02-17 11:45:00'),
    ('292e9e71-6c87-4afc-9af4-b3ac40dcfcca', 'Furniture Assembly', 'Looking for someone to assemble furniture in Dublin.', '60 Lower Camden Street, Dublin', 53.332307, -6.262476, 5, 'OPEN', '2025-02-17 12:00:00', '2025-02-17 12:45:00'),
    ('292e9e71-6c87-4afc-9af4-b3ac40dcfcca', 'Handyman Services', 'Need a handyman for various tasks around the house in Kilkenny.', '10 River Lane, Kilkenny', 52.652130, -7.250909, 3, 'COMPLETED', '2025-02-17 13:00:00', '2025-02-17 13:30:00'),
    ('292e9e71-6c87-4afc-9af4-b3ac40dcfcca', 'Cleaning Services', 'Looking for a cleaner for deep cleaning in Dublin.', '60 Lower Camden Street, Dublin', 53.332307, -6.262476, 4, 'OPEN', '2025-02-17 14:00:00', '2025-02-17 14:30:00'),
    ('292e9e71-6c87-4afc-9af4-b3ac40dcfcca', 'Plumbing Services', 'Seeking a plumber to fix leaky pipes in Kilkenny.', '10 River Lane, Kilkenny', 52.652130, -7.250909, 5, 'IN_PROGRESS', '2025-02-17 15:00:00', '2025-02-17 15:30:00'),
    ('292e9e71-6c87-4afc-9af4-b3ac40dcfcca', 'Painting Services', 'Looking for someone to paint a house exterior in Dublin.', '60 Lower Camden Street, Dublin', 53.332307, -6.262476, 3, 'COMPLETED', '2025-02-17 16:00:00', '2025-02-17 16:30:00'),
    ('292e9e71-6c87-4afc-9af4-b3ac40dcfcca', 'Gardening Services', 'Need help with garden maintenance in Kilkenny.', '10 River Lane, Kilkenny', 52.652130, -7.250909, 5, 'OPEN', '2025-02-17 17:00:00', '2025-02-17 17:30:00'),
    ('292e9e71-6c87-4afc-9af4-b3ac40dcfcca', 'Window Cleaning', 'Looking for someone to clean windows in Dublin.', '60 Lower Camden Street, Dublin', 53.332307, -6.262476, 4, 'IN_PROGRESS', '2025-02-17 18:00:00', '2025-02-17 18:30:00'),
    ('292e9e71-6c87-4afc-9af4-b3ac40dcfcca', 'Grocery Delivery', 'Seeking someone to deliver groceries to a house in Kilkenny.', '10 River Lane, Kilkenny', 52.652130, -7.250909, 6, 'OPEN', '2025-02-17 19:00:00', '2025-02-17 19:30:00');


-- User 9 (testuser9)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('ab4906dd-4da5-4c4e-9f6c-936ba0861ec0', 'Pet Sitting', 'Looking for a responsible pet sitter for a week-long vacation in Dublin.', '49 Abbey Street, Dublin', 53.348409, -6.261825, 3, 'OPEN', '2025-02-17 20:00:00', '2025-02-17 20:30:00'),
    ('ab4906dd-4da5-4c4e-9f6c-936ba0861ec0', 'Childcare', 'Seeking a part-time childcare provider for after-school care in Dublin.', '45 Rock Road, Dublin', 53.320705, -6.229681, 4, 'IN_PROGRESS', '2025-02-17 21:00:00', '2025-02-17 21:30:00'),
    ('ab4906dd-4da5-4c4e-9f6c-936ba0861ec0', 'Local Delivery', 'Need help with delivering items around the neighborhood in Dublin.', '60 Lower Camden Street, Dublin', 53.332307, -6.262476, 5, 'COMPLETED', '2025-02-17 22:00:00', '2025-02-17 22:30:00'),
    ('ab4906dd-4da5-4c4e-9f6c-936ba0861ec0', 'Senior Care', 'Looking for someone to assist with daily tasks for an elderly person in Kilkenny.', '10 River Lane, Kilkenny', 52.652130, -7.250909, 2, 'OPEN', '2025-02-17 23:00:00', '2025-02-17 23:30:00'),
    ('ab4906dd-4da5-4c4e-9f6c-936ba0861ec0', 'Lawn Mowing', 'Seeking someone to mow the lawn and tidy the garden in Dublin.', '49 Abbey Street, Dublin', 53.348409, -6.261825, 3, 'IN_PROGRESS', '2025-02-18 08:00:00', '2025-02-18 08:30:00'),
    ('ab4906dd-4da5-4c4e-9f6c-936ba0861ec0', 'Grocery Shopping', 'Need help with grocery shopping for an elderly neighbor in Dublin.', '45 Rock Road, Dublin', 53.320705, -6.229681, 4, 'OPEN', '2025-02-18 09:00:00', '2025-02-18 09:30:00'),
    ('ab4906dd-4da5-4c4e-9f6c-936ba0861ec0', 'Home Maintenance', 'Looking for someone to fix some plumbing issues at home in Dublin.', '60 Lower Camden Street, Dublin', 53.332307, -6.262476, 2, 'COMPLETED', '2025-02-18 10:00:00', '2025-02-18 10:30:00'),
    ('ab4906dd-4da5-4c4e-9f6c-936ba0861ec0', 'Car Washing', 'Seeking a reliable person to wash and clean my car in Kilkenny.', '10 River Lane, Kilkenny', 52.652130, -7.250909, 5, 'OPEN', '2025-02-18 11:00:00', '2025-02-18 11:30:00'),
    ('ab4906dd-4da5-4c4e-9f6c-936ba0861ec0', 'Tutoring', 'Looking for a tutor to help with math homework in Dublin.', '49 Abbey Street, Dublin', 53.348409, -6.261825, 3, 'IN_PROGRESS', '2025-02-18 12:00:00', '2025-02-18 12:30:00'),
    ('ab4906dd-4da5-4c4e-9f6c-936ba0861ec0', 'Package Pickup', 'Need someone to pick up a package from the post office in Dublin.', '45 Rock Road, Dublin', 53.320705, -6.229681, 4, 'OPEN', '2025-02-18 13:00:00', '2025-02-18 13:30:00');

-- User 10 (testuser10)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('d119efa4-0eba-4699-b3b3-b022a9b30ca0', 'Furniture Assembly', 'Looking for help with assembling furniture in Dublin.', '77 Fitzwilliam Square, Dublin', 53.336478, -6.238347, 3, 'OPEN', '2025-02-17 15:00:00', '2025-02-17 15:30:00'),
    ('d119efa4-0eba-4699-b3b3-b022a9b30ca0', 'Cleaning Service', 'Seeking a cleaning service for a house in Limerick.', '8 Barrack Street, Limerick', 52.664063, -8.628390, 4, 'IN_PROGRESS', '2025-02-17 16:00:00', '2025-02-17 16:30:00'),
    ('d119efa4-0eba-4699-b3b3-b022a9b30ca0', 'Grocery Delivery', 'Looking for someone to help with grocery delivery to a nearby location in Dublin.', '77 Fitzwilliam Square, Dublin', 53.336478, -6.238347, 5, 'COMPLETED', '2025-02-17 17:00:00', '2025-02-17 17:30:00'),
    ('d119efa4-0eba-4699-b3b3-b022a9b30ca0', 'Pet Care', 'Seeking a pet care provider for walking and feeding pets in Limerick.', '8 Barrack Street, Limerick', 52.664063, -8.628390, 3, 'OPEN', '2025-02-17 18:00:00', '2025-02-17 18:30:00'),
    ('d119efa4-0eba-4699-b3b3-b022a9b30ca0', 'Tutoring Service', 'Looking for a tutor for English and History in Dublin.', '77 Fitzwilliam Square, Dublin', 53.336478, -6.238347, 4, 'IN_PROGRESS', '2025-02-17 19:00:00', '2025-02-17 19:30:00'),
    ('d119efa4-0eba-4699-b3b3-b022a9b30ca0', 'Local Delivery', 'Need help delivering packages around Limerick.', '8 Barrack Street, Limerick', 52.664063, -8.628390, 5, 'OPEN', '2025-02-17 20:00:00', '2025-02-17 20:30:00'),
    ('d119efa4-0eba-4699-b3b3-b022a9b30ca0', 'Childcare', 'Looking for a babysitter to care for children in Dublin.', '77 Fitzwilliam Square, Dublin', 53.336478, -6.238347, 2, 'COMPLETED', '2025-02-17 21:00:00', '2025-02-17 21:30:00'),
    ('d119efa4-0eba-4699-b3b3-b022a9b30ca0', 'Lawn Mowing', 'Seeking a lawn mowing service in Limerick.', '8 Barrack Street, Limerick', 52.664063, -8.628390, 4, 'IN_PROGRESS', '2025-02-17 22:00:00', '2025-02-17 22:30:00'),
    ('d119efa4-0eba-4699-b3b3-b022a9b30ca0', 'Senior Care', 'Looking for a caregiver for elderly in Dublin.', '77 Fitzwilliam Square, Dublin', 53.336478, -6.238347, 3, 'OPEN', '2025-02-17 23:00:00', '2025-02-17 23:30:00'),
    ('d119efa4-0eba-4699-b3b3-b022a9b30ca0', 'Car Washing', 'Need someone to wash my car in Limerick.', '8 Barrack Street, Limerick', 52.664063, -8.628390, 2, 'COMPLETED', '2025-02-18 08:00:00', '2025-02-18 08:30:00');











-- User 11 (testuser11)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('39371904-d733-4ba3-ac34-67d345a4000c', 'Home Renovation', 'Looking for a professional for a home renovation project in Dublin.', '18 Clanbrassil Street, Dublin', 53.335052, -6.263259, 3, 'OPEN', '2025-02-18 10:00:00', '2025-02-18 10:30:00'),
    ('39371904-d733-4ba3-ac34-67d345a4000c', 'Child Care', 'Seeking a reliable person for child care in Cork.', '54 Town Hall Street, Cork', 51.897789, -8.470674, 4, 'IN_PROGRESS', '2025-02-18 11:00:00', '2025-02-18 11:30:00'),
    ('39371904-d733-4ba3-ac34-67d345a4000c', 'Tutoring Services', 'Looking for a tutor for Math and Science in Dublin.', '18 Clanbrassil Street, Dublin', 53.335052, -6.263259, 5, 'COMPLETED', '2025-02-18 12:00:00', '2025-02-18 12:30:00'),
    ('39371904-d733-4ba3-ac34-67d345a4000c', 'Grocery Delivery', 'Looking for a delivery person for groceries in Cork.', '54 Town Hall Street, Cork', 51.897789, -8.470674, 6, 'OPEN', '2025-02-18 13:00:00', '2025-02-18 13:30:00'),
    ('39371904-d733-4ba3-ac34-67d345a4000c', 'Pet Sitting', 'Seeking a pet sitter for a few days in Dublin.', '18 Clanbrassil Street, Dublin', 53.335052, -6.263259, 3, 'IN_PROGRESS', '2025-02-18 14:00:00', '2025-02-18 14:30:00'),
    ('39371904-d733-4ba3-ac34-67d345a4000c', 'Moving Help', 'Looking for assistance in moving furniture in Cork.', '54 Town Hall Street, Cork', 51.897789, -8.470674, 4, 'OPEN', '2025-02-18 15:00:00', '2025-02-18 15:30:00'),
    ('39371904-d733-4ba3-ac34-67d345a4000c', 'Gardening', 'Looking for a gardener for the backyard in Dublin.', '18 Clanbrassil Street, Dublin', 53.335052, -6.263259, 5, 'COMPLETED', '2025-02-18 16:00:00', '2025-02-18 16:30:00'),
    ('39371904-d733-4ba3-ac34-67d345a4000c', 'Handyman Service', 'Need a handyman for repairs in Cork.', '54 Town Hall Street, Cork', 51.897789, -8.470674, 2, 'OPEN', '2025-02-18 17:00:00', '2025-02-18 17:30:00'),
    ('39371904-d733-4ba3-ac34-67d345a4000c', 'Housekeeping', 'Looking for a housekeeping service in Dublin.', '18 Clanbrassil Street, Dublin', 53.335052, -6.263259, 4, 'IN_PROGRESS', '2025-02-18 18:00:00', '2025-02-18 18:30:00'),
    ('39371904-d733-4ba3-ac34-67d345a4000c', 'Car Washing', 'Looking for someone to wash my car in Cork.', '54 Town Hall Street, Cork', 51.897789, -8.470674, 3, 'COMPLETED', '2025-02-18 19:00:00', '2025-02-18 19:30:00');


-- User 12 (testuser12)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('f19b6b6b-00cc-4a5b-a43f-d53ff1387e29', 'Personal Assistant', 'Looking for a personal assistant to help with administrative tasks in Dublin.', '10 Westmoreland Street, Dublin', 53.340138, -6.256120, 3, 'OPEN', '2025-02-19 10:00:00', '2025-02-19 10:30:00'),
    ('f19b6b6b-00cc-4a5b-a43f-d53ff1387e29', 'Cleaner', 'Seeking a professional cleaner for a home in Kilkenny.', '19 Patrick Street, Kilkenny', 52.653201, -7.250711, 4, 'IN_PROGRESS', '2025-02-19 11:00:00', '2025-02-19 11:30:00'),
    ('f19b6b6b-00cc-4a5b-a43f-d53ff1387e29', 'Delivery Person', 'Looking for a delivery person to handle packages in Dublin.', '10 Westmoreland Street, Dublin', 53.340138, -6.256120, 5, 'COMPLETED', '2025-02-19 12:00:00', '2025-02-19 12:30:00'),
    ('f19b6b6b-00cc-4a5b-a43f-d53ff1387e29', 'Pet Walker', 'Looking for a pet walker in Kilkenny.', '19 Patrick Street, Kilkenny', 52.653201, -7.250711, 3, 'OPEN', '2025-02-19 13:00:00', '2025-02-19 13:30:00'),
    ('f19b6b6b-00cc-4a5b-a43f-d53ff1387e29', 'Handyman', 'Looking for a handyman for small repairs in Dublin.', '10 Westmoreland Street, Dublin', 53.340138, -6.256120, 4, 'IN_PROGRESS', '2025-02-19 14:00:00', '2025-02-19 14:30:00'),
    ('f19b6b6b-00cc-4a5b-a43f-d53ff1387e29', 'Grocery Shopper', 'Need someone to do my grocery shopping in Kilkenny.', '19 Patrick Street, Kilkenny', 52.653201, -7.250711, 6, 'OPEN', '2025-02-19 15:00:00', '2025-02-19 15:30:00'),
    ('f19b6b6b-00cc-4a5b-a43f-d53ff1387e29', 'Cook', 'Seeking a cook for meal prep in Dublin.', '10 Westmoreland Street, Dublin', 53.340138, -6.256120, 5, 'COMPLETED', '2025-02-19 16:00:00', '2025-02-19 16:30:00'),
    ('f19b6b6b-00cc-4a5b-a43f-d53ff1387e29', 'Laundry Services', 'Looking for laundry services in Kilkenny.', '19 Patrick Street, Kilkenny', 52.653201, -7.250711, 4, 'OPEN', '2025-02-19 17:00:00', '2025-02-19 17:30:00'),
    ('f19b6b6b-00cc-4a5b-a43f-d53ff1387e29', 'Gardener', 'Looking for a gardener to help with landscaping in Dublin.', '10 Westmoreland Street, Dublin', 53.340138, -6.256120, 3, 'IN_PROGRESS', '2025-02-19 18:00:00', '2025-02-19 18:30:00'),
    ('f19b6b6b-00cc-4a5b-a43f-d53ff1387e29', 'Painter', 'Looking for a painter for interior painting in Kilkenny.', '19 Patrick Street, Kilkenny', 52.653201, -7.250711, 4, 'COMPLETED', '2025-02-19 19:00:00', '2025-02-19 19:30:00');


-- User 13 (testuser13)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('b36b8430-b109-4fb2-9404-884fdb4c3093', 'Office Assistant', 'Looking for an office assistant in Dublin for clerical work.', '30 Wexford Street, Dublin', 53.328028, -6.260476, 4, 'OPEN', '2025-02-20 10:00:00', '2025-02-20 10:30:00'),
    ('b36b8430-b109-4fb2-9404-884fdb4c3093', 'Warehouse Worker', 'Seeking a warehouse worker for loading and unloading in Limerick.', '23 High Road, Limerick', 52.659795, -8.629821, 5, 'IN_PROGRESS', '2025-02-20 11:00:00', '2025-02-20 11:30:00'),
    ('b36b8430-b109-4fb2-9404-884fdb4c3093', 'Chef', 'Looking for an experienced chef for a restaurant in Dublin.', '30 Wexford Street, Dublin', 53.328028, -6.260476, 3, 'COMPLETED', '2025-02-20 12:00:00', '2025-02-20 12:30:00'),
    ('b36b8430-b109-4fb2-9404-884fdb4c3093', 'Tutor', 'Seeking a tutor for English and Math in Limerick.', '23 High Road, Limerick', 52.659795, -8.629821, 6, 'OPEN', '2025-02-20 13:00:00', '2025-02-20 13:30:00'),
    ('b36b8430-b109-4fb2-9404-884fdb4c3093', 'Personal Shopper', 'Looking for a personal shopper to assist with shopping tasks in Dublin.', '30 Wexford Street, Dublin', 53.328028, -6.260476, 4, 'IN_PROGRESS', '2025-02-20 14:00:00', '2025-02-20 14:30:00'),
    ('b36b8430-b109-4fb2-9404-884fdb4c3093', 'Cleaner', 'Seeking a cleaner for deep cleaning in Limerick.', '23 High Road, Limerick', 52.659795, -8.629821, 5, 'OPEN', '2025-02-20 15:00:00', '2025-02-20 15:30:00'),
    ('b36b8430-b109-4fb2-9404-884fdb4c3093', 'Event Coordinator', 'Looking for an event coordinator for a small conference in Dublin.', '30 Wexford Street, Dublin', 53.328028, -6.260476, 3, 'COMPLETED', '2025-02-20 16:00:00', '2025-02-20 16:30:00'),
    ('b36b8430-b109-4fb2-9404-884fdb4c3093', 'Landscaper', 'Seeking a landscaper for outdoor work in Limerick.', '23 High Road, Limerick', 52.659795, -8.629821, 4, 'IN_PROGRESS', '2025-02-20 17:00:00', '2025-02-20 17:30:00'),
    ('b36b8430-b109-4fb2-9404-884fdb4c3093', 'Bartender', 'Looking for a bartender for a local pub in Dublin.', '30 Wexford Street, Dublin', 53.328028, -6.260476, 5, 'OPEN', '2025-02-20 18:00:00', '2025-02-20 18:30:00'),
    ('b36b8430-b109-4fb2-9404-884fdb4c3093', 'Delivery Driver', 'Seeking a delivery driver for local deliveries in Limerick.', '23 High Road, Limerick', 52.659795, -8.629821, 4, 'COMPLETED', '2025-02-20 19:00:00', '2025-02-20 19:30:00');


-- User 14 (testuser14)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('862fe3cc-ec0f-43ab-aa26-85393998c19e', 'Administrative Assistant', 'Looking for an administrative assistant to assist with office tasks in Dublin.', '35 Mespil Road, Dublin', 53.338335, -6.248197, 4, 'OPEN', '2025-02-20 10:00:00', '2025-02-20 10:30:00'),
    ('862fe3cc-ec0f-43ab-aa26-85393998c19e', 'Delivery Driver', 'Seeking a delivery driver to transport goods in Limerick.', '5 O’Connell Street Upper, Limerick', 52.663053, -8.624832, 5, 'IN_PROGRESS', '2025-02-20 11:00:00', '2025-02-20 11:30:00'),
    ('862fe3cc-ec0f-43ab-aa26-85393998c19e', 'Chef', 'Looking for an experienced chef for a restaurant in Dublin.', '35 Mespil Road, Dublin', 53.338335, -6.248197, 3, 'COMPLETED', '2025-02-20 12:00:00', '2025-02-20 12:30:00'),
    ('862fe3cc-ec0f-43ab-aa26-85393998c19e', 'Tutor', 'Seeking a tutor for Math and Science in Limerick.', '5 O’Connell Street Upper, Limerick', 52.663053, -8.624832, 6, 'OPEN', '2025-02-20 13:00:00', '2025-02-20 13:30:00'),
    ('862fe3cc-ec0f-43ab-aa26-85393998c19e', 'Personal Shopper', 'Looking for a personal shopper to assist with shopping in Dublin.', '35 Mespil Road, Dublin', 53.338335, -6.248197, 4, 'IN_PROGRESS', '2025-02-20 14:00:00', '2025-02-20 14:30:00'),
    ('862fe3cc-ec0f-43ab-aa26-85393998c19e', 'Cleaner', 'Seeking a cleaner for deep cleaning in Limerick.', '5 O’Connell Street Upper, Limerick', 52.663053, -8.624832, 5, 'OPEN', '2025-02-20 15:00:00', '2025-02-20 15:30:00'),
    ('862fe3cc-ec0f-43ab-aa26-85393998c19e', 'Event Coordinator', 'Looking for an event coordinator for a small event in Dublin.', '35 Mespil Road, Dublin', 53.338335, -6.248197, 3, 'COMPLETED', '2025-02-20 16:00:00', '2025-02-20 16:30:00'),
    ('862fe3cc-ec0f-43ab-aa26-85393998c19e', 'Landscaper', 'Seeking a landscaper for outdoor work in Limerick.', '5 O’Connell Street Upper, Limerick', 52.663053, -8.624832, 4, 'IN_PROGRESS', '2025-02-20 17:00:00', '2025-02-20 17:30:00'),
    ('862fe3cc-ec0f-43ab-aa26-85393998c19e', 'Bartender', 'Looking for a bartender for a local bar in Dublin.', '35 Mespil Road, Dublin', 53.338335, -6.248197, 5, 'OPEN', '2025-02-20 18:00:00', '2025-02-20 18:30:00'),
    ('862fe3cc-ec0f-43ab-aa26-85393998c19e', 'Delivery Driver', 'Hiring a delivery driver for a food delivery service in Limerick.', '5 O’Connell Street Upper, Limerick', 52.663053, -8.624832, 4, 'OPEN', '2025-02-20 19:00:00', '2025-02-20 19:30:00');


-- User 15 (testuser15)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('7560af2b-8c43-4fcb-b41a-c9541690c37b', 'Customer Service Representative', 'Looking for a customer service representative to assist clients in Dublin.', '12 St Stephen’s Green, Dublin', 53.335817, -6.259532, 4, 'OPEN', '2025-02-20 10:00:00', '2025-02-20 10:30:00'),
    ('7560af2b-8c43-4fcb-b41a-c9541690c37b', 'Warehouse Worker', 'Hiring warehouse workers for a logistics company in Limerick.', '40 Henry Street, Limerick', 52.667987, -8.629404, 5, 'IN_PROGRESS', '2025-02-20 11:00:00', '2025-02-20 11:30:00'),
    ('7560af2b-8c43-4fcb-b41a-c9541690c37b', 'Receptionist', 'Looking for a receptionist for a busy office in Dublin.', '12 St Stephen’s Green, Dublin', 53.335817, -6.259532, 3, 'COMPLETED', '2025-02-20 12:00:00', '2025-02-20 12:30:00'),
    ('7560af2b-8c43-4fcb-b41a-c9541690c37b', 'Delivery Driver', 'Hiring a delivery driver for a courier service in Limerick.', '40 Henry Street, Limerick', 52.667987, -8.629404, 6, 'OPEN', '2025-02-20 13:00:00', '2025-02-20 13:30:00'),
    ('7560af2b-8c43-4fcb-b41a-c9541690c37b', 'Software Developer', 'Looking for a software developer to work on a project in Dublin.', '12 St Stephen’s Green, Dublin', 53.335817, -6.259532, 4, 'IN_PROGRESS', '2025-02-20 14:00:00', '2025-02-20 14:30:00'),
    ('7560af2b-8c43-4fcb-b41a-c9541690c37b', 'Cleaner', 'Seeking a cleaner for cleaning services in Limerick.', '40 Henry Street, Limerick', 52.667987, -8.629404, 5, 'OPEN', '2025-02-20 15:00:00', '2025-02-20 15:30:00'),
    ('7560af2b-8c43-4fcb-b41a-c9541690c37b', 'Event Manager', 'Looking for an event manager for an upcoming event in Dublin.', '12 St Stephen’s Green, Dublin', 53.335817, -6.259532, 3, 'COMPLETED', '2025-02-20 16:00:00', '2025-02-20 16:30:00'),
    ('7560af2b-8c43-4fcb-b41a-c9541690c37b', 'Chef', 'Seeking a chef for a restaurant in Limerick.', '40 Henry Street, Limerick', 52.667987, -8.629404, 4, 'IN_PROGRESS', '2025-02-20 17:00:00', '2025-02-20 17:30:00'),
    ('7560af2b-8c43-4fcb-b41a-c9541690c37b', 'Security Guard', 'Hiring a security guard for a retail store in Dublin.', '12 St Stephen’s Green, Dublin', 53.335817, -6.259532, 5, 'OPEN', '2025-02-20 18:00:00', '2025-02-20 18:30:00'),
    ('7560af2b-8c43-4fcb-b41a-c9541690c37b', 'Photographer', 'Looking for a photographer for events in Limerick.', '40 Henry Street, Limerick', 52.667987, -8.629404, 4, 'OPEN', '2025-02-20 19:00:00', '2025-02-20 19:30:00');


-- User 16 (testuser16)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('eaa77fbe-f8a0-4894-a4d5-7de35748ff76', 'Pet Sitting', 'Looking for someone to look after my dog in Dublin.', '28 College Green, Dublin', 53.343351, -6.257542, 2, 'OPEN', '2025-02-20 20:00:00', '2025-02-20 20:30:00'),
    ('eaa77fbe-f8a0-4894-a4d5-7de35748ff76', 'Gardening Help', 'Seeking a gardening helper in Kilkenny for home garden maintenance.', '14 Patrick Street, Kilkenny', 52.650536, -7.251039, 3, 'IN_PROGRESS', '2025-02-20 21:00:00', '2025-02-20 21:30:00'),
    ('eaa77fbe-f8a0-4894-a4d5-7de35748ff76', 'Dog Walker', 'Looking for someone to walk my dog around Dublin.', '28 College Green, Dublin', 53.343351, -6.257542, 2, 'COMPLETED', '2025-02-20 22:00:00', '2025-02-20 22:30:00'),
    ('eaa77fbe-f8a0-4894-a4d5-7de35748ff76', 'Home Cleaning', 'Need someone to help with cleaning at home in Kilkenny.', '14 Patrick Street, Kilkenny', 52.650536, -7.251039, 3, 'OPEN', '2025-02-20 23:00:00', '2025-02-20 23:30:00'),
    ('eaa77fbe-f8a0-4894-a4d5-7de35748ff76', 'Childcare', 'Looking for a babysitter for my kids in Dublin.', '28 College Green, Dublin', 53.343351, -6.257542, 1, 'IN_PROGRESS', '2025-02-16 00:00:00', '2025-02-16 00:30:00'),
    ('eaa77fbe-f8a0-4894-a4d5-7de35748ff76', 'Personal Assistant', 'Hiring a personal assistant to help with errands in Kilkenny.', '14 Patrick Street, Kilkenny', 52.650536, -7.251039, 1, 'OPEN', '2025-02-16 01:00:00', '2025-02-16 01:30:00'),
    ('eaa77fbe-f8a0-4894-a4d5-7de35748ff76', 'Tutoring', 'Looking for someone to tutor my child in Dublin.', '28 College Green, Dublin', 53.343351, -6.257542, 2, 'COMPLETED', '2025-02-16 02:00:00', '2025-02-16 02:30:00'),
    ('eaa77fbe-f8a0-4894-a4d5-7de35748ff76', 'Errands Help', 'Seeking assistance with running errands around Kilkenny.', '14 Patrick Street, Kilkenny', 52.650536, -7.251039, 4, 'OPEN', '2025-02-16 03:00:00', '2025-02-16 03:30:00'),
    ('eaa77fbe-f8a0-4894-a4d5-7de35748ff76', 'Car Wash', 'Need someone to wash my car in Dublin.', '28 College Green, Dublin', 53.343351, -6.257542, 2, 'IN_PROGRESS', '2025-02-16 04:00:00', '2025-02-16 04:30:00'),
    ('eaa77fbe-f8a0-4894-a4d5-7de35748ff76', 'Moving Help', 'Looking for assistance moving boxes in Kilkenny.', '14 Patrick Street, Kilkenny', 52.650536, -7.251039, 3, 'OPEN', '2025-02-16 05:00:00', '2025-02-16 05:30:00');


-- User 17 (testuser17)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('45d2ae4d-c5fc-44ad-8f69-452394b94987', 'Tutoring Assistance', 'Looking for a tutor in Dublin to help with high school subjects.', '1 St. Stephen’s Green, Dublin', 53.335238, -6.258965, 3, 'OPEN', '2025-02-20 06:00:00', '2025-02-20 06:30:00'),
    ('45d2ae4d-c5fc-44ad-8f69-452394b94987', 'Garden Maintenance', 'Help needed for regular garden maintenance in Limerick.', '25 O’Connell Street, Limerick', 52.665036, -8.626617, 2, 'IN_PROGRESS', '2025-02-20 07:00:00', '2025-02-20 07:30:00'),
    ('45d2ae4d-c5fc-44ad-8f69-452394b94987', 'House Cleaning', 'Looking for help with cleaning the house in Dublin.', '1 St. Stephen’s Green, Dublin', 53.335238, -6.258965, 4, 'COMPLETED', '2025-02-20 08:00:00', '2025-02-20 08:30:00'),
    ('45d2ae4d-c5fc-44ad-8f69-452394b94987', 'Errand Running', 'Seeking assistance with running errands around Limerick.', '25 O’Connell Street, Limerick', 52.665036, -8.626617, 2, 'OPEN', '2025-02-20 09:00:00', '2025-02-20 09:30:00'),
    ('45d2ae4d-c5fc-44ad-8f69-452394b94987', 'Pet Sitting', 'Need someone to look after my dog in Dublin for a few days.', '1 St. Stephen’s Green, Dublin', 53.335238, -6.258965, 1, 'IN_PROGRESS', '2025-02-20 10:00:00', '2025-02-20 10:30:00'),
    ('45d2ae4d-c5fc-44ad-8f69-452394b94987', 'Personal Shopper', 'Looking for someone to help with shopping in Limerick.', '25 O’Connell Street, Limerick', 52.665036, -8.626617, 1, 'OPEN', '2025-02-20 11:00:00', '2025-02-20 11:30:00'),
    ('45d2ae4d-c5fc-44ad-8f69-452394b94987', 'Moving Assistance', 'Assistance needed for moving boxes in Dublin.', '1 St. Stephen’s Green, Dublin', 53.335238, -6.258965, 2, 'COMPLETED', '2025-02-20 12:00:00', '2025-02-20 12:30:00'),
    ('45d2ae4d-c5fc-44ad-8f69-452394b94987', 'Cleaning Help', 'Looking for help cleaning the house in Limerick.', '25 O’Connell Street, Limerick', 52.665036, -8.626617, 3, 'OPEN', '2025-02-20 13:00:00', '2025-02-20 13:30:00'),
    ('45d2ae4d-c5fc-44ad-8f69-452394b94987', 'Childcare Assistance', 'Looking for a babysitter for my kids in Dublin.', '1 St. Stephen’s Green, Dublin', 53.335238, -6.258965, 2, 'IN_PROGRESS', '2025-02-20 14:00:00', '2025-02-20 14:30:00'),
    ('45d2ae4d-c5fc-44ad-8f69-452394b94987', 'Pet Care', 'Looking for a pet care assistant for my dog in Limerick.', '25 O’Connell Street, Limerick', 52.665036, -8.626617, 3, 'OPEN', '2025-02-20 15:00:00', '2025-02-20 15:30:00');



-- User 18 (testuser18)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('30bfb00a-15ac-46cb-b4cf-fbb310c1cb76', 'Tech Support Needed', 'Looking for a tech expert to assist with home computer repairs in Dublin.', '18 Baggot Street, Dublin', 53.338221, -6.250598, 3, 'OPEN', '2025-02-20 16:00:00', '2025-02-20 16:30:00'),
    ('30bfb00a-15ac-46cb-b4cf-fbb310c1cb76', 'Grocery Shopping Help', 'Need assistance with weekly grocery shopping in Limerick.', '47 Henry Street, Limerick', 52.666871, -8.630073, 2, 'IN_PROGRESS', '2025-02-20 17:00:00', '2025-02-20 17:30:00'),
    ('30bfb00a-15ac-46cb-b4cf-fbb310c1cb76', 'Personal Assistant', 'Looking for someone to assist with daily tasks in Dublin.', '18 Baggot Street, Dublin', 53.338221, -6.250598, 1, 'COMPLETED', '2025-02-20 18:00:00', '2025-02-20 18:30:00'),
    ('30bfb00a-15ac-46cb-b4cf-fbb310c1cb76', 'Tutoring Services', 'Seeking a tutor for math and science subjects in Limerick.', '47 Henry Street, Limerick', 52.666871, -8.630073, 3, 'OPEN', '2025-02-20 19:00:00', '2025-02-20 19:30:00'),
    ('30bfb00a-15ac-46cb-b4cf-fbb310c1cb76', 'Household Chores', 'Help needed with household chores in Dublin.', '18 Baggot Street, Dublin', 53.338221, -6.250598, 4, 'IN_PROGRESS', '2025-02-20 20:00:00', '2025-02-20 20:30:00'),
    ('30bfb00a-15ac-46cb-b4cf-fbb310c1cb76', 'Lawn Care', 'Looking for assistance with lawn maintenance in Limerick.', '47 Henry Street, Limerick', 52.666871, -8.630073, 2, 'COMPLETED', '2025-02-20 21:00:00', '2025-02-20 21:30:00'),
    ('30bfb00a-15ac-46cb-b4cf-fbb310c1cb76', 'Furniture Assembly', 'Help needed to assemble furniture in Dublin.', '18 Baggot Street, Dublin', 53.338221, -6.250598, 2, 'OPEN', '2025-02-20 22:00:00', '2025-02-20 22:30:00'),
    ('30bfb00a-15ac-46cb-b4cf-fbb310c1cb76', 'Cleaning Services', 'Looking for cleaning help for the office in Limerick.', '47 Henry Street, Limerick', 52.666871, -8.630073, 3, 'OPEN', '2025-02-20 23:00:00', '2025-02-20 23:30:00'),
    ('30bfb00a-15ac-46cb-b4cf-fbb310c1cb76', 'Pet Walking', 'Seeking a dog walker for daily walks in Dublin.', '18 Baggot Street, Dublin', 53.338221, -6.250598, 1, 'IN_PROGRESS', '2025-02-16 00:00:00', '2025-02-16 00:30:00'),
    ('30bfb00a-15ac-46cb-b4cf-fbb310c1cb76', 'Car Washing', 'Need someone to wash the car in Limerick.', '47 Henry Street, Limerick', 52.666871, -8.630073, 2, 'OPEN', '2025-02-16 01:00:00', '2025-02-16 01:30:00');



--  User 19 (testuser19)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('07c5ebe8-489f-4532-a513-c9481a911080', 'Graphic Design Assistance', 'Looking for a graphic designer to assist with some projects in Dublin.', '27 Merrion Square, Dublin', 53.338874, -6.250013, 2, 'OPEN', '2025-02-16 09:00:00', '2025-02-16 09:30:00'),
    ('07c5ebe8-489f-4532-a513-c9481a911080', 'Housekeeping Help', 'Seeking someone to help with housekeeping tasks in Limerick.', '12 O’Connell Avenue, Limerick', 52.667694, -8.627918, 3, 'IN_PROGRESS', '2025-02-16 10:00:00', '2025-02-16 10:30:00'),
    ('07c5ebe8-489f-4532-a513-c9481a911080', 'Tech Support for Small Business', 'Looking for tech support for a small business in Dublin.', '27 Merrion Square, Dublin', 53.338874, -6.250013, 1, 'COMPLETED', '2025-02-16 11:00:00', '2025-02-16 11:30:00'),
    ('07c5ebe8-489f-4532-a513-c9481a911080', 'Personal Shopper', 'Need a personal shopper for shopping assistance in Limerick.', '12 O’Connell Avenue, Limerick', 52.667694, -8.627918, 2, 'OPEN', '2025-02-16 12:00:00', '2025-02-16 12:30:00'),
    ('07c5ebe8-489f-4532-a513-c9481a911080', 'Pet Sitting', 'Looking for someone to pet sit during weekends in Dublin.', '27 Merrion Square, Dublin', 53.338874, -6.250013, 2, 'IN_PROGRESS', '2025-02-16 13:00:00', '2025-02-16 13:30:00'),
    ('07c5ebe8-489f-4532-a513-c9481a911080', 'Laundry Services', 'Need assistance with laundry services in Limerick.', '12 O’Connell Avenue, Limerick', 52.667694, -8.627918, 3, 'COMPLETED', '2025-02-16 14:00:00', '2025-02-16 14:30:00'),
    ('07c5ebe8-489f-4532-a513-c9481a911080', 'Photography Services', 'Seeking a photographer for an event in Dublin.', '27 Merrion Square, Dublin', 53.338874, -6.250013, 1, 'OPEN', '2025-02-16 15:00:00', '2025-02-16 15:30:00'),
    ('07c5ebe8-489f-4532-a513-c9481a911080', 'Food Delivery Assistance', 'Looking for food delivery assistance in Limerick.', '12 O’Connell Avenue, Limerick', 52.667694, -8.627918, 4, 'OPEN', '2025-02-16 16:00:00', '2025-02-16 16:30:00'),
    ('07c5ebe8-489f-4532-a513-c9481a911080', 'Cleaning Help', 'Looking for help with cleaning services in Dublin.', '27 Merrion Square, Dublin', 53.338874, -6.250013, 3, 'IN_PROGRESS', '2025-02-16 17:00:00', '2025-02-16 17:30:00'),
    ('07c5ebe8-489f-4532-a513-c9481a911080', 'Moving Assistance', 'Need help with moving furniture in Limerick.', '12 O’Connell Avenue, Limerick', 52.667694, -8.627918, 2, 'OPEN', '2025-02-16 18:00:00', '2025-02-16 18:30:00');


-- User 20 (testuser20)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('4eda0897-8d5f-4e50-8bdd-5a6e0322c6c1', 'Event Coordinator Needed', 'Looking for an event coordinator for a corporate event in Dublin.', '55 Clanbrassil Street, Dublin', 53.337017, -6.264532, 3, 'OPEN', '2025-02-16 09:00:00', '2025-02-16 09:30:00'),
    ('4eda0897-8d5f-4e50-8bdd-5a6e0322c6c1', 'Babysitting Services', 'Need a babysitter for weekend shifts in Limerick.', '30 Roches Street, Limerick', 52.664431, -8.624826, 2, 'IN_PROGRESS', '2025-02-16 10:00:00', '2025-02-16 10:30:00'),
    ('4eda0897-8d5f-4e50-8bdd-5a6e0322c6c1', 'Gardening Help', 'Looking for someone to help with gardening at home in Dublin.', '55 Clanbrassil Street, Dublin', 53.337017, -6.264532, 1, 'COMPLETED', '2025-02-16 11:00:00', '2025-02-16 11:30:00'),
    ('4eda0897-8d5f-4e50-8bdd-5a6e0322c6c1', 'Dog Walking Services', 'Looking for a dog walker in Limerick.', '30 Roches Street, Limerick', 52.664431, -8.624826, 2, 'OPEN', '2025-02-16 12:00:00', '2025-02-16 12:30:00'),
    ('4eda0897-8d5f-4e50-8bdd-5a6e0322c6c1', 'House Cleaning Assistance', 'Looking for house cleaning assistance in Dublin.', '55 Clanbrassil Street, Dublin', 53.337017, -6.264532, 3, 'IN_PROGRESS', '2025-02-16 13:00:00', '2025-02-16 13:30:00'),
    ('4eda0897-8d5f-4e50-8bdd-5a6e0322c6c1', 'Furniture Assembly', 'Need someone to assemble furniture in Limerick.', '30 Roches Street, Limerick', 52.664431, -8.624826, 2, 'OPEN', '2025-02-16 14:00:00', '2025-02-16 14:30:00'),
    ('4eda0897-8d5f-4e50-8bdd-5a6e0322c6c1', 'Tech Support for Home Office', 'Looking for tech support to set up home office equipment in Dublin.', '55 Clanbrassil Street, Dublin', 53.337017, -6.264532, 1, 'OPEN', '2025-02-16 15:00:00', '2025-02-16 15:30:00'),
    ('4eda0897-8d5f-4e50-8bdd-5a6e0322c6c1', 'Tutoring Assistance for Kids', 'Need a tutor for my kids in Limerick.', '30 Roches Street, Limerick', 52.664431, -8.624826, 3, 'IN_PROGRESS', '2025-02-16 16:00:00', '2025-02-16 16:30:00'),
    ('4eda0897-8d5f-4e50-8bdd-5a6e0322c6c1', 'Moving Help', 'Looking for moving assistance in Dublin.', '55 Clanbrassil Street, Dublin', 53.337017, -6.264532, 2, 'COMPLETED', '2025-02-16 17:00:00', '2025-02-16 17:30:00'),
    ('4eda0897-8d5f-4e50-8bdd-5a6e0322c6c1', 'Personal Assistant Needed', 'Looking for a personal assistant to help with daily tasks in Limerick.', '30 Roches Street, Limerick', 52.664431, -8.624826, 2, 'OPEN', '2025-02-16 18:00:00', '2025-02-16 18:30:00');


















-- User 21 (testuser21)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('fef6fe6d-7eb5-4b74-ba1a-add7277ff9cb', 'Home Repair Services', 'Need a handyman for minor home repairs in Dublin.', '14 Harcourt Street, Dublin', 53.336874, -6.262013, 2, 'OPEN', '2025-02-16 09:00:00', '2025-02-16 09:30:00'),
    ('fef6fe6d-7eb5-4b74-ba1a-add7277ff9cb', 'Language Tutor', 'Looking for a language tutor for evening classes in Limerick.', '15 Thomas Street, Limerick', 52.664321, -8.626431, 3, 'IN_PROGRESS', '2025-02-16 10:00:00', '2025-02-16 10:30:00'),
    ('fef6fe6d-7eb5-4b74-ba1a-add7277ff9cb', 'Pet Grooming Services', 'Looking for a pet groomer for my dog in Dublin.', '14 Harcourt Street, Dublin', 53.336874, -6.262013, 1, 'COMPLETED', '2025-02-16 11:00:00', '2025-02-16 11:30:00'),
    ('fef6fe6d-7eb5-4b74-ba1a-add7277ff9cb', 'Carpentry Work Needed', 'Looking for a carpenter for custom furniture work in Limerick.', '15 Thomas Street, Limerick', 52.664321, -8.626431, 2, 'OPEN', '2025-02-16 12:00:00', '2025-02-16 12:30:00'),
    ('fef6fe6d-7eb5-4b74-ba1a-add7277ff9cb', 'Cooking Assistance', 'Looking for a home cook to prepare meals in Dublin.', '14 Harcourt Street, Dublin', 53.336874, -6.262013, 3, 'IN_PROGRESS', '2025-02-16 13:00:00', '2025-02-16 13:30:00'),
    ('fef6fe6d-7eb5-4b74-ba1a-add7277ff9cb', 'Plumbing Services', 'Need a plumber to fix leaks in my house in Limerick.', '15 Thomas Street, Limerick', 52.664321, -8.626431, 2, 'OPEN', '2025-02-16 14:00:00', '2025-02-16 14:30:00'),
    ('fef6fe6d-7eb5-4b74-ba1a-add7277ff9cb', 'Graphic Design Work', 'Looking for a graphic designer for a small project in Dublin.', '14 Harcourt Street, Dublin', 53.336874, -6.262013, 1, 'OPEN', '2025-02-16 15:00:00', '2025-02-16 15:30:00'),
    ('fef6fe6d-7eb5-4b74-ba1a-add7277ff9cb', 'Elderly Care Assistance', 'Need someone to assist my elderly parents in Limerick.', '15 Thomas Street, Limerick', 52.664321, -8.626431, 3, 'IN_PROGRESS', '2025-02-16 16:00:00', '2025-02-16 16:30:00'),
    ('fef6fe6d-7eb5-4b74-ba1a-add7277ff9cb', 'Painting and Decorating', 'Looking for someone to paint my living room in Dublin.', '14 Harcourt Street, Dublin', 53.336874, -6.262013, 2, 'COMPLETED', '2025-02-16 17:00:00', '2025-02-16 17:30:00'),
    ('fef6fe6d-7eb5-4b74-ba1a-add7277ff9cb', 'Courier Services', 'Need a courier to deliver parcels in Limerick.', '15 Thomas Street, Limerick', 52.664321, -8.626431, 2, 'OPEN', '2025-02-16 18:00:00', '2025-02-16 18:30:00');



-- User 22 (testuser22)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('daba8f97-9ee9-4a1d-ba28-08f1fb58128a', 'Electrician Needed', 'Looking for an electrician to fix wiring issues in Dublin.', '5 Camden Row, Dublin', 53.336512, -6.263789, 2, 'OPEN', '2025-02-16 09:00:00', '2025-02-16 09:30:00'),
    ('daba8f97-9ee9-4a1d-ba28-08f1fb58128a', 'Math Tutor', 'Need a tutor for high school math lessons in Limerick.', '8 Parnell Street, Limerick', 52.663891, -8.627915, 3, 'IN_PROGRESS', '2025-02-16 10:00:00', '2025-02-16 10:30:00'),
    ('daba8f97-9ee9-4a1d-ba28-08f1fb58128a', 'House Painting', 'Looking for someone to paint my house in Dublin.', '5 Camden Row, Dublin', 53.336512, -6.263789, 1, 'COMPLETED', '2025-02-16 11:00:00', '2025-02-16 11:30:00'),
    ('daba8f97-9ee9-4a1d-ba28-08f1fb58128a', 'Moving Help Needed', 'Need assistance moving furniture in Limerick.', '8 Parnell Street, Limerick', 52.663891, -8.627915, 2, 'OPEN', '2025-02-16 12:00:00', '2025-02-16 12:30:00'),
    ('daba8f97-9ee9-4a1d-ba28-08f1fb58128a', 'Home Deep Cleaning', 'Looking for professional home cleaning in Dublin.', '5 Camden Row, Dublin', 53.336512, -6.263789, 3, 'IN_PROGRESS', '2025-02-16 13:00:00', '2025-02-16 13:30:00'),
    ('daba8f97-9ee9-4a1d-ba28-08f1fb58128a', 'Photography Services', 'Need a photographer for an event in Limerick.', '8 Parnell Street, Limerick', 52.663891, -8.627915, 2, 'OPEN', '2025-02-16 14:00:00', '2025-02-16 14:30:00'),
    ('daba8f97-9ee9-4a1d-ba28-08f1fb58128a', 'Personal Trainer', 'Looking for a fitness trainer for morning sessions in Dublin.', '5 Camden Row, Dublin', 53.336512, -6.263789, 1, 'OPEN', '2025-02-16 15:00:00', '2025-02-16 15:30:00'),
    ('daba8f97-9ee9-4a1d-ba28-08f1fb58128a', 'Childcare Services', 'Looking for a babysitter for evening hours in Limerick.', '8 Parnell Street, Limerick', 52.663891, -8.627915, 3, 'IN_PROGRESS', '2025-02-16 16:00:00', '2025-02-16 16:30:00'),
    ('daba8f97-9ee9-4a1d-ba28-08f1fb58128a', 'Lawn Mowing Services', 'Need someone to mow the lawn in Dublin.', '5 Camden Row, Dublin', 53.336512, -6.263789, 2, 'COMPLETED', '2025-02-16 17:00:00', '2025-02-16 17:30:00'),
    ('daba8f97-9ee9-4a1d-ba28-08f1fb58128a', 'IT Support', 'Looking for IT support to set up a home network in Limerick.', '8 Parnell Street, Limerick', 52.663891, -8.627915, 2, 'OPEN', '2025-02-16 18:00:00', '2025-02-16 18:30:00');



-- User 23 (testuser23)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('17a39663-ac63-40de-8fbb-1ce94549865f', 'Plumber Needed', 'Looking for a plumber to fix leaking pipes in Dublin.', '33 Dawson Street, Dublin', 53.337892, -6.254123, 2, 'OPEN', '2025-02-16 09:00:00', '2025-02-16 09:30:00'),
    ('17a39663-ac63-40de-8fbb-1ce94549865f', 'Guitar Lessons', 'Need a guitar instructor for beginners in Limerick.', '22 Henry Street, Limerick', 52.667123, -8.631145, 3, 'IN_PROGRESS', '2025-02-16 10:00:00', '2025-02-16 10:30:00'),
    ('17a39663-ac63-40de-8fbb-1ce94549865f', 'Carpentry Work', 'Looking for a carpenter to build shelves in Dublin.', '33 Dawson Street, Dublin', 53.337892, -6.254123, 1, 'COMPLETED', '2025-02-16 11:00:00', '2025-02-16 11:30:00'),
    ('17a39663-ac63-40de-8fbb-1ce94549865f', 'Office Cleaning', 'Need a cleaner for a small office in Limerick.', '22 Henry Street, Limerick', 52.667123, -8.631145, 2, 'OPEN', '2025-02-16 12:00:00', '2025-02-16 12:30:00'),
    ('17a39663-ac63-40de-8fbb-1ce94549865f', 'Painting Services', 'Looking for an interior painter in Dublin.', '33 Dawson Street, Dublin', 53.337892, -6.254123, 3, 'IN_PROGRESS', '2025-02-16 13:00:00', '2025-02-16 13:30:00'),
    ('17a39663-ac63-40de-8fbb-1ce94549865f', 'Handyman Required', 'Need general home repairs in Limerick.', '22 Henry Street, Limerick', 52.667123, -8.631145, 2, 'OPEN', '2025-02-16 14:00:00', '2025-02-16 14:30:00'),
    ('17a39663-ac63-40de-8fbb-1ce94549865f', 'Pet Grooming', 'Looking for a pet groomer for a small dog in Dublin.', '33 Dawson Street, Dublin', 53.337892, -6.254123, 1, 'OPEN', '2025-02-16 15:00:00', '2025-02-16 15:30:00'),
    ('17a39663-ac63-40de-8fbb-1ce94549865f', 'Homework Help', 'Need a tutor for evening homework sessions in Limerick.', '22 Henry Street, Limerick', 52.667123, -8.631145, 3, 'IN_PROGRESS', '2025-02-16 16:00:00', '2025-02-16 16:30:00'),
    ('17a39663-ac63-40de-8fbb-1ce94549865f', 'Packing and Moving', 'Looking for help with packing boxes for a move in Dublin.', '33 Dawson Street, Dublin', 53.337892, -6.254123, 2, 'COMPLETED', '2025-02-16 17:00:00', '2025-02-16 17:30:00'),
    ('17a39663-ac63-40de-8fbb-1ce94549865f', 'Graphic Design Work', 'Looking for a designer to create a business logo in Limerick.', '22 Henry Street, Limerick', 52.667123, -8.631145, 2, 'OPEN', '2025-02-16 18:00:00', '2025-02-16 18:30:00');



-- User 24 (testuser24)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('4d798505-0705-413f-8a32-f4243fc5732c', 'Electrician Needed', 'Looking for an electrician to fix wiring issues in Dublin.', '48 Capel Street, Dublin', 53.345217, -6.267982, 2, 'OPEN', '2025-02-16 09:00:00', '2025-02-16 09:30:00'),
    ('4d798505-0705-413f-8a32-f4243fc5732c', 'Math Tutor Required', 'Need a tutor for high school math in Limerick.', '17 Roches Street, Limerick', 52.664569, -8.623572, 3, 'IN_PROGRESS', '2025-02-16 10:00:00', '2025-02-16 10:30:00'),
    ('4d798505-0705-413f-8a32-f4243fc5732c', 'Home Renovation Help', 'Looking for a handyman for home repairs in Dublin.', '48 Capel Street, Dublin', 53.345217, -6.267982, 1, 'COMPLETED', '2025-02-16 11:00:00', '2025-02-16 11:30:00'),
    ('4d798505-0705-413f-8a32-f4243fc5732c', 'Pet Sitting Services', 'Need someone to pet sit my cat for the weekend in Limerick.', '17 Roches Street, Limerick', 52.664569, -8.623572, 2, 'OPEN', '2025-02-16 12:00:00', '2025-02-16 12:30:00'),
    ('4d798505-0705-413f-8a32-f4243fc5732c', 'Cleaning Services', 'Looking for a house cleaner in Dublin.', '48 Capel Street, Dublin', 53.345217, -6.267982, 3, 'IN_PROGRESS', '2025-02-16 13:00:00', '2025-02-16 13:30:00'),
    ('4d798505-0705-413f-8a32-f4243fc5732c', 'Photography Needed', 'Need a photographer for a small event in Limerick.', '17 Roches Street, Limerick', 52.664569, -8.623572, 2, 'OPEN', '2025-02-16 14:00:00', '2025-02-16 14:30:00'),
    ('4d798505-0705-413f-8a32-f4243fc5732c', 'Moving Assistance', 'Looking for help moving furniture in Dublin.', '48 Capel Street, Dublin', 53.345217, -6.267982, 1, 'OPEN', '2025-02-16 15:00:00', '2025-02-16 15:30:00'),
    ('4d798505-0705-413f-8a32-f4243fc5732c', 'Music Lessons', 'Need a piano instructor in Limerick.', '17 Roches Street, Limerick', 52.664569, -8.623572, 3, 'IN_PROGRESS', '2025-02-16 16:00:00', '2025-02-16 16:30:00'),
    ('4d798505-0705-413f-8a32-f4243fc5732c', 'Garden Maintenance', 'Looking for someone to help with gardening in Dublin.', '48 Capel Street, Dublin', 53.345217, -6.267982, 2, 'COMPLETED', '2025-02-16 17:00:00', '2025-02-16 17:30:00'),
    ('4d798505-0705-413f-8a32-f4243fc5732c', 'Website Development', 'Looking for a web developer for a small business site in Limerick.', '17 Roches Street, Limerick', 52.664569, -8.623572, 2, 'OPEN', '2025-02-16 18:00:00', '2025-02-16 18:30:00');


-- User 25 (testuser25)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('6e495f62-622a-45e1-8956-55e626605e6d', 'Gardener Needed', 'Looking for a gardener to mow the lawn and trim the bushes in Dublin.', '29 Talbot Street, Dublin', 53.350192, -6.255781, 2, 'OPEN', '2025-02-16 09:00:00', '2025-02-16 09:30:00'),
    ('6e495f62-622a-45e1-8956-55e626605e6d', 'Cleaner Required', 'Need help with cleaning and organizing my house in Limerick.', '10 Mallow Street, Limerick', 52.664112, -8.625432, 3, 'IN_PROGRESS', '2025-02-16 10:00:00', '2025-02-16 10:30:00'),
    ('6e495f62-622a-45e1-8956-55e626605e6d', 'Furniture Assembly', 'Looking for help assembling furniture in Dublin.', '29 Talbot Street, Dublin', 53.350192, -6.255781, 1, 'COMPLETED', '2025-02-16 11:00:00', '2025-02-16 11:30:00'),
    ('6e495f62-622a-45e1-8956-55e626605e6d', 'Pet Sitting Services', 'Need someone to watch my cat for the weekend in Limerick.', '10 Mallow Street, Limerick', 52.664112, -8.625432, 2, 'OPEN', '2025-02-16 12:00:00', '2025-02-16 12:30:00'),
    ('6e495f62-622a-45e1-8956-55e626605e6d', 'House Cleaner Needed', 'Looking for a house cleaner in Dublin.', '29 Talbot Street, Dublin', 53.350192, -6.255781, 3, 'IN_PROGRESS', '2025-02-16 13:00:00', '2025-02-16 13:30:00'),
    ('6e495f62-622a-45e1-8956-55e626605e6d', 'Photographer Needed', 'Need a photographer for a small event in Limerick.', '10 Mallow Street, Limerick', 52.664112, -8.625432, 2, 'OPEN', '2025-02-16 14:00:00', '2025-02-16 14:30:00'),
    ('6e495f62-622a-45e1-8956-55e626605e6d', 'Moving Assistance', 'Looking for help moving furniture in Dublin.', '29 Talbot Street, Dublin', 53.350192, -6.255781, 1, 'OPEN', '2025-02-16 15:00:00', '2025-02-16 15:30:00'),
    ('6e495f62-622a-45e1-8956-55e626605e6d', 'Piano Lessons', 'Need a piano instructor for my kids in Limerick.', '10 Mallow Street, Limerick', 52.664112, -8.625432, 3, 'IN_PROGRESS', '2025-02-16 16:00:00', '2025-02-16 16:30:00'),
    ('6e495f62-622a-45e1-8956-55e626605e6d', 'Garden Maintenance', 'Looking for help with gardening in Dublin.', '29 Talbot Street, Dublin', 53.350192, -6.255781, 2, 'COMPLETED', '2025-02-16 17:00:00', '2025-02-16 17:30:00'),
    ('6e495f62-622a-45e1-8956-55e626605e6d', 'Web Development Needed', 'Looking for a web developer for my small business site in Limerick.', '10 Mallow Street, Limerick', 52.664112, -8.625432, 2, 'OPEN', '2025-02-16 18:00:00', '2025-02-16 18:30:00');



-- User 26 (testuser26)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('489b5604-92ba-466b-8d5b-53a7577bee01', 'Painter Needed', 'Looking for a painter to freshen up the walls in Dundalk.', '60 Aungier Street, Dundalk', 53.338201, -6.263401, 2, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('489b5604-92ba-466b-8d5b-53a7577bee01', 'House Cleaner Required', 'Need help cleaning my apartment in Drogheda.', '5 William Street, Drogheda', 53.663401, -6.626987, 3, 'IN_PROGRESS', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('489b5604-92ba-466b-8d5b-53a7577bee01', 'Gardener Needed', 'Looking for a gardener to trim the hedges and mow the lawn in Dundalk.', '60 Aungier Street, Dundalk', 53.338201, -6.263401, 2, 'COMPLETED', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('489b5604-92ba-466b-8d5b-53a7577bee01', 'Dog Walker Required', 'Looking for someone to walk my dog around Drogheda.', '5 William Street, Drogheda', 53.663401, -6.626987, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('489b5604-92ba-466b-8d5b-53a7577bee01', 'Plumber Needed', 'Need a plumber to fix a leaking pipe in Dundalk.', '60 Aungier Street, Dundalk', 53.338201, -6.263401, 1, 'IN_PROGRESS', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('489b5604-92ba-466b-8d5b-53a7577bee01', 'Photographer for Event', 'Looking for a photographer for a birthday event in Drogheda.', '5 William Street, Drogheda', 53.663401, -6.626987, 2, 'OPEN', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('489b5604-92ba-466b-8d5b-53a7577bee01', 'Tutor for Math Lessons', 'Need a math tutor for my kids in Dundalk.', '60 Aungier Street, Dundalk', 53.338201, -6.263401, 3, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('489b5604-92ba-466b-8d5b-53a7577bee01', 'Housekeeper Needed', 'Looking for someone to help with daily chores in Drogheda.', '5 William Street, Drogheda', 53.663401, -6.626987, 3, 'IN_PROGRESS', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('489b5604-92ba-466b-8d5b-53a7577bee01', 'Moving Assistance', 'Help needed moving furniture in Dundalk.', '60 Aungier Street, Dundalk', 53.338201, -6.263401, 2, 'OPEN', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('489b5604-92ba-466b-8d5b-53a7577bee01', 'Website Development Help', 'Looking for a web developer to build a portfolio site in Drogheda.', '5 William Street, Drogheda', 53.663401, -6.626987, 2, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');


-- User 27 (testuser27)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('2d02443f-2450-47d7-8f76-9f7cdd07e9f3', 'Painter Needed', 'Looking for a painter to paint the walls of my house in Dundalk.', '35 George’s Street, Dundalk', 53.342501, -6.265789, 2, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('2d02443f-2450-47d7-8f76-9f7cdd07e9f3', 'House Cleaner Required', 'Need help cleaning my house in Drogheda.', '19 Ellen Street, Drogheda', 53.667142, -6.629123, 3, 'IN_PROGRESS', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('2d02443f-2450-47d7-8f76-9f7cdd07e9f3', 'Gardener Needed', 'Looking for a gardener to trim hedges and mow the lawn in Dundalk.', '35 George’s Street, Dundalk', 53.342501, -6.265789, 2, 'COMPLETED', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('2d02443f-2450-47d7-8f76-9f7cdd07e9f3', 'Dog Walker Required', 'Looking for a dog walker to walk my dog around Drogheda.', '19 Ellen Street, Drogheda', 53.667142, -6.629123, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('2d02443f-2450-47d7-8f76-9f7cdd07e9f3', 'Plumber Needed', 'Need a plumber to fix a leak in Dundalk.', '35 George’s Street, Dundalk', 53.342501, -6.265789, 1, 'IN_PROGRESS', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('2d02443f-2450-47d7-8f76-9f7cdd07e9f3', 'Photographer for Event', 'Looking for a photographer for a wedding in Drogheda.', '19 Ellen Street, Drogheda', 53.667142, -6.629123, 2, 'OPEN', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('2d02443f-2450-47d7-8f76-9f7cdd07e9f3', 'Tutor for Math Lessons', 'Looking for a math tutor for my kids in Dundalk.', '35 George’s Street, Dundalk', 53.342501, -6.265789, 3, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('2d02443f-2450-47d7-8f76-9f7cdd07e9f3', 'Housekeeper Needed', 'Looking for a housekeeper for my house in Drogheda.', '19 Ellen Street, Drogheda', 53.667142, -6.629123, 3, 'IN_PROGRESS', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('2d02443f-2450-47d7-8f76-9f7cdd07e9f3', 'Moving Assistance', 'Help needed to move boxes and furniture in Dundalk.', '35 George’s Street, Dundalk', 53.342501, -6.265789, 2, 'OPEN', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('2d02443f-2450-47d7-8f76-9f7cdd07e9f3', 'Website Development Help', 'Looking for someone to help develop a personal website in Drogheda.', '19 Ellen Street, Drogheda', 53.667142, -6.629123, 2, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');


-- User 28 (testuser28)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('7b8ac8e2-a78d-483e-bc64-6e7245c87ccc', 'Painter Needed', 'Looking for a painter to freshen up my walls in Dundalk.', '10 Camden Street, Dundalk', 53.335789, -6.264501, 2, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('7b8ac8e2-a78d-483e-bc64-6e7245c87ccc', 'House Cleaner Required', 'Need someone to clean my house in Drogheda.', '11 Henry Street, Drogheda', 53.666487, -6.631234, 3, 'IN_PROGRESS', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('7b8ac8e2-a78d-483e-bc64-6e7245c87ccc', 'Gardener Needed', 'Looking for a gardener to trim my hedges and mow the lawn in Dundalk.', '10 Camden Street, Dundalk', 53.335789, -6.264501, 2, 'COMPLETED', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('7b8ac8e2-a78d-483e-bc64-6e7245c87ccc', 'Dog Walker Required', 'Looking for a dog walker to walk my dog in Drogheda.', '11 Henry Street, Drogheda', 53.666487, -6.631234, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('7b8ac8e2-a78d-483e-bc64-6e7245c87ccc', 'Plumber Needed', 'Need a plumber to fix a leaky pipe in Dundalk.', '10 Camden Street, Dundalk', 53.335789, -6.264501, 1, 'IN_PROGRESS', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('7b8ac8e2-a78d-483e-bc64-6e7245c87ccc', 'Photographer for Event', 'Looking for a photographer for an event in Drogheda.', '11 Henry Street, Drogheda', 53.666487, -6.631234, 2, 'OPEN', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('7b8ac8e2-a78d-483e-bc64-6e7245c87ccc', 'Tutor for Math Lessons', 'Looking for a tutor to help my kids with math in Dundalk.', '10 Camden Street, Dundalk', 53.335789, -6.264501, 3, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('7b8ac8e2-a78d-483e-bc64-6e7245c87ccc', 'Housekeeper Needed', 'Looking for a housekeeper for my house in Drogheda.', '11 Henry Street, Drogheda', 53.666487, -6.631234, 3, 'IN_PROGRESS', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('7b8ac8e2-a78d-483e-bc64-6e7245c87ccc', 'Moving Assistance', 'Help needed moving boxes in Dundalk.', '10 Camden Street, Dundalk', 53.335789, -6.264501, 2, 'OPEN', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('7b8ac8e2-a78d-483e-bc64-6e7245c87ccc', 'Website Development Help', 'Looking for a web developer to build a portfolio site in Drogheda.', '11 Henry Street, Drogheda', 53.666487, -6.631234, 2, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');


-- User 29 (testuser29)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('243aa9e8-0fba-4fea-9f56-e158b461c981', 'Electrician Needed', 'Looking for an electrician to help with some wiring issues in Dundalk.', '88 Baggot Street, Dundalk', 53.338301, -6.249982, 2, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('243aa9e8-0fba-4fea-9f56-e158b461c981', 'Window Cleaner Required', 'Need someone to clean the windows of my house in Drogheda.', '2 O’Connell Street, Drogheda', 53.665201, -6.628924, 2, 'IN_PROGRESS', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('243aa9e8-0fba-4fea-9f56-e158b461c981', 'Painter for Interior Walls', 'Need a painter for interior walls in Dundalk.', '88 Baggot Street, Dundalk', 53.338301, -6.249982, 3, 'COMPLETED', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('243aa9e8-0fba-4fea-9f56-e158b461c981', 'House Cleaner Needed', 'Looking for a cleaner to tidy up my place in Drogheda.', '2 O’Connell Street, Drogheda', 53.665201, -6.628924, 2, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('243aa9e8-0fba-4fea-9f56-e158b461c981', 'Handyman for Repairs', 'Looking for a handyman to fix a broken door in Dundalk.', '88 Baggot Street, Dundalk', 53.338301, -6.249982, 1, 'IN_PROGRESS', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('243aa9e8-0fba-4fea-9f56-e158b461c981', 'Photographer for Photoshoot', 'Need a photographer for a photoshoot in Drogheda.', '2 O’Connell Street, Drogheda', 53.665201, -6.628924, 2, 'OPEN', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('243aa9e8-0fba-4fea-9f56-e158b461c981', 'Cleaner for Office', 'Looking for a cleaner to maintain our office space in Dundalk.', '88 Baggot Street, Dundalk', 53.338301, -6.249982, 1, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('243aa9e8-0fba-4fea-9f56-e158b461c981', 'Pet Sitter Required', 'Looking for a pet sitter to look after my dog in Drogheda.', '2 O’Connell Street, Drogheda', 53.665201, -6.628924, 2, 'IN_PROGRESS', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('243aa9e8-0fba-4fea-9f56-e158b461c981', 'Event Coordinator Needed', 'Looking for an event coordinator for an upcoming event in Dundalk.', '88 Baggot Street, Dundalk', 53.338301, -6.249982, 2, 'OPEN', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('243aa9e8-0fba-4fea-9f56-e158b461c981', 'Carpenter for Furniture', 'Looking for a carpenter to make custom furniture in Drogheda.', '2 O’Connell Street, Drogheda', 53.665201, -6.628924, 2, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');


-- User 30 (testuser30)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('40cbccb8-3169-4c91-9de5-ccf3c7122606', 'Interior Painter Needed', 'Looking for a professional painter to paint my living room in Dundalk.', '47 Harcourt Street, Dundalk', 53.336491, -6.262401, 2, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('40cbccb8-3169-4c91-9de5-ccf3c7122606', 'Cleaner for Large House', 'Need a cleaner to assist with cleaning my large house in Drogheda.', '5 Mallow Street, Drogheda', 53.664002, -6.625221, 3, 'IN_PROGRESS', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('40cbccb8-3169-4c91-9de5-ccf3c7122606', 'Gardener for Garden Maintenance', 'Looking for someone to maintain my garden and trim hedges in Dundalk.', '47 Harcourt Street, Dundalk', 53.336491, -6.262401, 1, 'COMPLETED', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('40cbccb8-3169-4c91-9de5-ccf3c7122606', 'Tutor for Math Lessons', 'Seeking a math tutor for my child in Drogheda.', '5 Mallow Street, Drogheda', 53.664002, -6.625221, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('40cbccb8-3169-4c91-9de5-ccf3c7122606', 'Handyman Required', 'Need a handyman to help with repairs around the house in Dundalk.', '47 Harcourt Street, Dundalk', 53.336491, -6.262401, 2, 'IN_PROGRESS', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('40cbccb8-3169-4c91-9de5-ccf3c7122606', 'Dog Walker for Daily Walks', 'Looking for a dog walker to take my dog out for daily walks in Drogheda.', '5 Mallow Street, Drogheda', 53.664002, -6.625221, 1, 'OPEN', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('40cbccb8-3169-4c91-9de5-ccf3c7122606', 'Plumber Needed', 'Looking for a plumber to fix a leaking pipe in Dundalk.', '47 Harcourt Street, Dundalk', 53.336491, -6.262401, 1, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('40cbccb8-3169-4c91-9de5-ccf3c7122606', 'Photographer for Event', 'Need a photographer for an event in Drogheda.', '5 Mallow Street, Drogheda', 53.664002, -6.625221, 2, 'IN_PROGRESS', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('40cbccb8-3169-4c91-9de5-ccf3c7122606', 'Moving Help Required', 'Need assistance moving furniture in Dundalk.', '47 Harcourt Street, Dundalk', 53.336491, -6.262401, 2, 'OPEN', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('40cbccb8-3169-4c91-9de5-ccf3c7122606', 'Website Design Assistance', 'Looking for a website designer to help with my website in Drogheda.', '5 Mallow Street, Drogheda', 53.664002, -6.625221, 3, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');













-- User 31 (testuser31)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('04acf497-c493-47d8-902a-6514f3c216de', 'House Cleaner Needed', 'Looking for a cleaner to assist with cleaning my house in Kilkenny.', '23 Dawson Street, Kilkenny', 52.654307, -7.252530, 2, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('04acf497-c493-47d8-902a-6514f3c216de', 'Pet Grooming Services', 'Need a professional groomer for my dog in Waterford.', '8 Pery Square, Waterford', 52.259447, -7.110140, 1, 'IN_PROGRESS', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('04acf497-c493-47d8-902a-6514f3c216de', 'Painter for Living Room', 'Looking for a painter to paint my living room in Kilkenny.', '23 Dawson Street, Kilkenny', 52.654307, -7.252530, 2, 'OPEN', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('04acf497-c493-47d8-902a-6514f3c216de', 'Personal Trainer for Gym Sessions', 'Seeking a personal trainer for gym sessions in Waterford.', '8 Pery Square, Waterford', 52.259447, -7.110140, 1, 'COMPLETED', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('04acf497-c493-47d8-902a-6514f3c216de', 'Carpenter for Custom Furniture', 'Looking for a carpenter to build custom furniture in Kilkenny.', '23 Dawson Street, Kilkenny', 52.654307, -7.252530, 2, 'IN_PROGRESS', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('04acf497-c493-47d8-902a-6514f3c216de', 'Photographer for Wedding', 'Need a photographer for a wedding in Waterford.', '8 Pery Square, Waterford', 52.259447, -7.110140, 3, 'OPEN', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('04acf497-c493-47d8-902a-6514f3c216de', 'Housekeeper for Holiday Home', 'Looking for a housekeeper for a holiday home in Kilkenny.', '23 Dawson Street, Kilkenny', 52.654307, -7.252530, 1, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('04acf497-c493-47d8-902a-6514f3c216de', 'Gardener for Garden Design', 'Seeking a gardener to design my garden in Waterford.', '8 Pery Square, Waterford', 52.259447, -7.110140, 2, 'IN_PROGRESS', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('04acf497-c493-47d8-902a-6514f3c216de', 'Electrician for Home Wiring', 'Need an electrician for home wiring in Kilkenny.', '23 Dawson Street, Kilkenny', 52.654307, -7.252530, 1, 'OPEN', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('04acf497-c493-47d8-902a-6514f3c216de', 'Delivery Driver for Small Business', 'Looking for a delivery driver for my small business in Waterford.', '8 Pery Square, Waterford', 52.259447, -7.110140, 2, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');


-- User 32 (testuser32)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('39e3bac5-62bc-42f8-b66f-954765d17634', 'House Cleaner for Spring Cleaning', 'Looking for a cleaner to assist with spring cleaning in Cork.', '14 Abbey Street, Cork', 51.898501, -8.259222, 2, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('39e3bac5-62bc-42f8-b66f-954765d17634', 'Dog Walker Needed', 'Looking for a dog walker in Galway for daily walks.', '33 Thomas Street, Galway', 53.268890, -9.062325, 1, 'OPEN', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('39e3bac5-62bc-42f8-b66f-954765d17634', 'Home Painting Services', 'Need a painter for my house in Cork to freshen up the walls.', '14 Abbey Street, Cork', 51.898501, -8.259222, 2, 'IN_PROGRESS', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('39e3bac5-62bc-42f8-b66f-954765d17634', 'Photographer for Family Photoshoot', 'Looking for a photographer for a family photoshoot in Galway.', '33 Thomas Street, Galway', 53.268890, -9.062325, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('39e3bac5-62bc-42f8-b66f-954765d17634', 'Electrician for Home Repairs', 'Seeking an electrician for electrical repairs in Cork.', '14 Abbey Street, Cork', 51.898501, -8.259222, 1, 'OPEN', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('39e3bac5-62bc-42f8-b66f-954765d17634', 'Personal Chef for Special Event', 'Looking for a personal chef for a special event in Galway.', '33 Thomas Street, Galway', 53.268890, -9.062325, 1, 'COMPLETED', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('39e3bac5-62bc-42f8-b66f-954765d17634', 'Gardener for Lawn Care', 'Need a gardener for lawn maintenance in Cork.', '14 Abbey Street, Cork', 51.898501, -8.259222, 2, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('39e3bac5-62bc-42f8-b66f-954765d17634', 'Nanny for Childcare', 'Looking for a nanny to take care of my children in Galway.', '33 Thomas Street, Galway', 53.268890, -9.062325, 1, 'OPEN', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('39e3bac5-62bc-42f8-b66f-954765d17634', 'Cleaner for Office Building', 'Seeking a cleaner for an office building in Cork.', '14 Abbey Street, Cork', 51.898501, -8.259222, 1, 'IN_PROGRESS', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('39e3bac5-62bc-42f8-b66f-954765d17634', 'Mover for Furniture Relocation', 'Looking for someone to help move furniture from one house to another in Galway.', '33 Thomas Street, Galway', 53.268890, -9.062325, 2, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');


-- User 33 (testuser33)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('083316e9-49e9-4c21-9621-5f1eed391f7f', 'Furniture Assembly Service', 'Looking for someone to help assemble furniture in Sligo.', '99 Nassau Street, Sligo', 54.270425, -8.470191, 2, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('083316e9-49e9-4c21-9621-5f1eed391f7f', 'Cleaner for Deep Cleaning', 'Need a cleaner for deep cleaning of a house in Clonmel.', '44 Catherine Street, Clonmel', 52.355186, -7.703448, 2, 'IN_PROGRESS', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('083316e9-49e9-4c21-9621-5f1eed391f7f', 'Plumber for Pipe Repair', 'Seeking a plumber for pipe repair work in Sligo.', '99 Nassau Street, Sligo', 54.270425, -8.470191, 1, 'OPEN', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('083316e9-49e9-4c21-9621-5f1eed391f7f', 'Babysitter Needed', 'Looking for a babysitter for the weekend in Clonmel.', '44 Catherine Street, Clonmel', 52.355186, -7.703448, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('083316e9-49e9-4c21-9621-5f1eed391f7f', 'Electrician for Lighting Installation', 'Need an electrician to install new lighting in Sligo.', '99 Nassau Street, Sligo', 54.270425, -8.470191, 1, 'OPEN', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('083316e9-49e9-4c21-9621-5f1eed391f7f', 'Cook for Birthday Party', 'Looking for a cook for a birthday party in Clonmel.', '44 Catherine Street, Clonmel', 52.355186, -7.703448, 1, 'COMPLETED', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('083316e9-49e9-4c21-9621-5f1eed391f7f', 'Handyman for Odd Jobs', 'Looking for a handyman for various odd jobs around the house in Sligo.', '99 Nassau Street, Sligo', 54.270425, -8.470191, 2, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('083316e9-49e9-4c21-9621-5f1eed391f7f', 'Personal Shopper for Clothing', 'Looking for a personal shopper in Clonmel for a wardrobe update.', '44 Catherine Street, Clonmel', 52.355186, -7.703448, 1, 'OPEN', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('083316e9-49e9-4c21-9621-5f1eed391f7f', 'Mover for Large Appliances', 'Need a mover to help with large appliance relocation in Sligo.', '99 Nassau Street, Sligo', 54.270425, -8.470191, 2, 'IN_PROGRESS', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('083316e9-49e9-4c21-9621-5f1eed391f7f', 'Event Planner for Wedding', 'Looking for an event planner for a wedding in Clonmel.', '44 Catherine Street, Clonmel', 52.355186, -7.703448, 1, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');


-- User 34 (testuser34)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('16e09b0e-b3c2-437a-830b-a93c3305eef5', 'House Painter for Interior Walls', 'Looking for a house painter for interior walls in Athlone.', '3 Stephen’s Green, Athlone', 53.423821, -7.942273, 2, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('16e09b0e-b3c2-437a-830b-a93c3305eef5', 'Cleaner for Office Space', 'Need a cleaner for an office space in Ballina.', '17 O’Connell Street, Ballina', 54.118253, -9.174603, 1, 'IN_PROGRESS', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('16e09b0e-b3c2-437a-830b-a93c3305eef5', 'Tutor for Mathematics Lessons', 'Looking for a tutor to give mathematics lessons in Athlone.', '3 Stephen’s Green, Athlone', 53.423821, -7.942273, 1, 'OPEN', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('16e09b0e-b3c2-437a-830b-a93c3305eef5', 'Babysitter Needed for Evening', 'Looking for a babysitter for an evening in Ballina.', '17 O’Connell Street, Ballina', 54.118253, -9.174603, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('16e09b0e-b3c2-437a-830b-a93c3305eef5', 'Electrician for Wiring Installation', 'Need an electrician to install new wiring in Athlone.', '3 Stephen’s Green, Athlone', 53.423821, -7.942273, 1, 'OPEN', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('16e09b0e-b3c2-437a-830b-a93c3305eef5', 'Chef for Private Party', 'Looking for a chef to cater a private party in Ballina.', '17 O’Connell Street, Ballina', 54.118253, -9.174603, 2, 'COMPLETED', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('16e09b0e-b3c2-437a-830b-a93c3305eef5', 'Gardener for Lawn Care', 'Looking for a gardener to maintain a lawn in Athlone.', '3 Stephen’s Green, Athlone', 53.423821, -7.942273, 1, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('16e09b0e-b3c2-437a-830b-a93c3305eef5', 'Photographer for Event', 'Looking for a photographer for an event in Ballina.', '17 O’Connell Street, Ballina', 54.118253, -9.174603, 1, 'OPEN', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('16e09b0e-b3c2-437a-830b-a93c3305eef5', 'Moving Assistance for Furniture', 'Need moving assistance for furniture in Athlone.', '3 Stephen’s Green, Athlone', 53.423821, -7.942273, 2, 'IN_PROGRESS', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('16e09b0e-b3c2-437a-830b-a93c3305eef5', 'Housekeeper for Daily Chores', 'Looking for a housekeeper for daily chores in Ballina.', '17 O’Connell Street, Ballina', 54.118253, -9.174603, 1, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');


-- User 35 (testuser35)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('e50d731f-ccdd-4370-9388-6a2d371bb18d', 'House Cleaner for Spring Cleaning', 'Looking for a cleaner for spring cleaning in Kilkenny.', '21 Capel Street, Kilkenny', 52.654481, -7.252801, 2, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('e50d731f-ccdd-4370-9388-6a2d371bb18d', 'Painter for Exterior House', 'Need a painter for exterior house painting in Tullamore.', '6 Arthur’s Quay, Tullamore', 53.271010, -7.501151, 1, 'IN_PROGRESS', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('e50d731f-ccdd-4370-9388-6a2d371bb18d', 'Tutor for English Lessons', 'Looking for an English tutor in Kilkenny.', '21 Capel Street, Kilkenny', 52.654481, -7.252801, 1, 'OPEN', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('e50d731f-ccdd-4370-9388-6a2d371bb18d', 'Babysitter for Evening Shift', 'Need a babysitter for an evening shift in Tullamore.', '6 Arthur’s Quay, Tullamore', 53.271010, -7.501151, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('e50d731f-ccdd-4370-9388-6a2d371bb18d', 'Plumber for Leak Repair', 'Looking for a plumber to fix a leak in Kilkenny.', '21 Capel Street, Kilkenny', 52.654481, -7.252801, 1, 'OPEN', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('e50d731f-ccdd-4370-9388-6a2d371bb18d', 'Cook for Private Dinner', 'Looking for a cook to prepare a private dinner in Tullamore.', '6 Arthur’s Quay, Tullamore', 53.271010, -7.501151, 2, 'COMPLETED', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('e50d731f-ccdd-4370-9388-6a2d371bb18d', 'Gardener for Lawn Maintenance', 'Looking for a gardener to maintain the lawn in Kilkenny.', '21 Capel Street, Kilkenny', 52.654481, -7.252801, 1, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('e50d731f-ccdd-4370-9388-6a2d371bb18d', 'Photographer for Family Portraits', 'Need a photographer for family portraits in Tullamore.', '6 Arthur’s Quay, Tullamore', 53.271010, -7.501151, 1, 'OPEN', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('e50d731f-ccdd-4370-9388-6a2d371bb18d', 'Mover for Relocation Services', 'Looking for a mover for relocation services in Kilkenny.', '21 Capel Street, Kilkenny', 52.654481, -7.252801, 2, 'IN_PROGRESS', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('e50d731f-ccdd-4370-9388-6a2d371bb18d', 'Housekeeper for Daily Chores', 'Need a housekeeper for daily chores in Tullamore.', '6 Arthur’s Quay, Tullamore', 53.271010, -7.501151, 1, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');


-- User 36 (testuser36)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('aa57e247-1816-4a2d-ac9b-baa14cd45775', 'House Cleaner for Deep Clean', 'Looking for a house cleaner for a deep clean in Tralee.', '72 Camden Street, Tralee', 52.271308, -9.701982, 2, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('aa57e247-1816-4a2d-ac9b-baa14cd45775', 'Painter for Interior Walls', 'Need a painter for interior walls in Kilkenny.', '50 Parnell Street, Kilkenny', 52.654432, -7.255641, 1, 'IN_PROGRESS', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('aa57e247-1816-4a2d-ac9b-baa14cd45775', 'Tutor for Science Lessons', 'Looking for a science tutor in Tralee.', '72 Camden Street, Tralee', 52.271308, -9.701982, 1, 'OPEN', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('aa57e247-1816-4a2d-ac9b-baa14cd45775', 'Babysitter for Weekend Care', 'Need a babysitter for weekend care in Kilkenny.', '50 Parnell Street, Kilkenny', 52.654432, -7.255641, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('aa57e247-1816-4a2d-ac9b-baa14cd45775', 'Plumber for Pipe Repair', 'Looking for a plumber to repair a pipe in Tralee.', '72 Camden Street, Tralee', 52.271308, -9.701982, 1, 'OPEN', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('aa57e247-1816-4a2d-ac9b-baa14cd45775', 'Cook for Family Dinner', 'Looking for a cook to prepare a family dinner in Kilkenny.', '50 Parnell Street, Kilkenny', 52.654432, -7.255641, 2, 'COMPLETED', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('aa57e247-1816-4a2d-ac9b-baa14cd45775', 'Gardener for Landscaping', 'Need a gardener for landscaping in Tralee.', '72 Camden Street, Tralee', 52.271308, -9.701982, 1, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('aa57e247-1816-4a2d-ac9b-baa14cd45775', 'Photographer for Event', 'Looking for a photographer for an event in Kilkenny.', '50 Parnell Street, Kilkenny', 52.654432, -7.255641, 1, 'OPEN', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('aa57e247-1816-4a2d-ac9b-baa14cd45775', 'Mover for Relocation Services', 'Looking for a mover for relocation services in Tralee.', '72 Camden Street, Tralee', 52.271308, -9.701982, 2, 'IN_PROGRESS', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('aa57e247-1816-4a2d-ac9b-baa14cd45775', 'Housekeeper for Weekly Chores', 'Need a housekeeper for weekly chores in Kilkenny.', '50 Parnell Street, Kilkenny', 52.654432, -7.255641, 1, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');


-- User 37 (testuser37)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('534d7826-ca7d-4195-a30a-0e10f553cd8d', 'House Cleaner for Spring Cleaning', 'Looking for a cleaner for spring cleaning in Limerick.', '19 Harcourt Street, Limerick', 52.670462, -8.623556, 2, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('534d7826-ca7d-4195-a30a-0e10f553cd8d', 'Painter for House Exterior', 'Need a painter for house exterior in Killarney.', '9 Bedford Row, Killarney', 52.072813, -9.505768, 1, 'IN_PROGRESS', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('534d7826-ca7d-4195-a30a-0e10f553cd8d', 'Tutor for Math Lessons', 'Looking for a math tutor in Limerick.', '19 Harcourt Street, Limerick', 52.670462, -8.623556, 1, 'OPEN', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('534d7826-ca7d-4195-a30a-0e10f553cd8d', 'Babysitter for Evening Shift', 'Need a babysitter for an evening shift in Killarney.', '9 Bedford Row, Killarney', 52.072813, -9.505768, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('534d7826-ca7d-4195-a30a-0e10f553cd8d', 'Plumber for Toilet Repair', 'Looking for a plumber to fix a toilet in Limerick.', '19 Harcourt Street, Limerick', 52.670462, -8.623556, 1, 'OPEN', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('534d7826-ca7d-4195-a30a-0e10f553cd8d', 'Cook for Family Dinner', 'Looking for a cook to prepare a family dinner in Killarney.', '9 Bedford Row, Killarney', 52.072813, -9.505768, 2, 'COMPLETED', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('534d7826-ca7d-4195-a30a-0e10f553cd8d', 'Gardener for Lawn Maintenance', 'Looking for a gardener to maintain the lawn in Limerick.', '19 Harcourt Street, Limerick', 52.670462, -8.623556, 1, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('534d7826-ca7d-4195-a30a-0e10f553cd8d', 'Photographer for Event', 'Need a photographer for an event in Killarney.', '9 Bedford Row, Killarney', 52.072813, -9.505768, 1, 'OPEN', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('534d7826-ca7d-4195-a30a-0e10f553cd8d', 'Mover for Relocation Services', 'Looking for a mover for relocation services in Limerick.', '19 Harcourt Street, Limerick', 52.670462, -8.623556, 2, 'IN_PROGRESS', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('534d7826-ca7d-4195-a30a-0e10f553cd8d', 'Housekeeper for Daily Chores', 'Need a housekeeper for daily chores in Killarney.', '9 Bedford Row, Killarney', 52.072813, -9.505768, 1, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');


-- User 38 (testuser38)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('e2512e50-cf46-4e2c-9193-0f900e60fccb', 'Cleaner for Deep Clean', 'Looking for a cleaner for a deep clean in Wexford.', '45 South Great George’s Street, Wexford', 52.259356, -6.461126, 2, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('e2512e50-cf46-4e2c-9193-0f900e60fccb', 'Painter for House Walls', 'Need a painter for interior walls in Mullingar.', '28 Sarsfield Street, Mullingar', 53.525612, -7.355342, 1, 'IN_PROGRESS', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('e2512e50-cf46-4e2c-9193-0f900e60fccb', 'Tutor for English Lessons', 'Looking for an English tutor in Wexford.', '45 South Great George’s Street, Wexford', 52.259356, -6.461126, 1, 'OPEN', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('e2512e50-cf46-4e2c-9193-0f900e60fccb', 'Babysitter for Weekend Care', 'Need a babysitter for weekend care in Mullingar.', '28 Sarsfield Street, Mullingar', 53.525612, -7.355342, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('e2512e50-cf46-4e2c-9193-0f900e60fccb', 'Plumber for Leaky Faucet', 'Looking for a plumber to fix a leaky faucet in Wexford.', '45 South Great George’s Street, Wexford', 52.259356, -6.461126, 1, 'OPEN', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('e2512e50-cf46-4e2c-9193-0f900e60fccb', 'Cook for Family Dinner', 'Looking for a cook to prepare a family dinner in Mullingar.', '28 Sarsfield Street, Mullingar', 53.525612, -7.355342, 2, 'COMPLETED', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('e2512e50-cf46-4e2c-9193-0f900e60fccb', 'Gardener for Lawn Care', 'Need a gardener for lawn care in Wexford.', '45 South Great George’s Street, Wexford', 52.259356, -6.461126, 1, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('e2512e50-cf46-4e2c-9193-0f900e60fccb', 'Photographer for Event', 'Looking for a photographer for an event in Mullingar.', '28 Sarsfield Street, Mullingar', 53.525612, -7.355342, 1, 'OPEN', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('e2512e50-cf46-4e2c-9193-0f900e60fccb', 'Mover for Relocation Services', 'Looking for a mover for relocation services in Wexford.', '45 South Great George’s Street, Wexford', 52.259356, -6.461126, 2, 'IN_PROGRESS', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('e2512e50-cf46-4e2c-9193-0f900e60fccb', 'Housekeeper for Daily Chores', 'Need a housekeeper for daily chores in Mullingar.', '28 Sarsfield Street, Mullingar', 53.525612, -7.355342, 1, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');


-- User 39 (testuser39)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('8f5bdfa1-2edb-4e39-954b-725e747b72e1', 'Cleaner for Office Space', 'Looking for a cleaner to clean an office space in Navan.', '60 Upper Baggot Street, Navan', 53.652056, -6.671907, 2, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('8f5bdfa1-2edb-4e39-954b-725e747b72e1', 'Painter for House Interior', 'Need a painter to paint the interior of a house in Drogheda.', '12 Henry Street, Drogheda', 53.720499, -6.347556, 1, 'IN_PROGRESS', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('8f5bdfa1-2edb-4e39-954b-725e747b72e1', 'Tutor for History Lessons', 'Looking for a history tutor in Navan.', '60 Upper Baggot Street, Navan', 53.652056, -6.671907, 1, 'OPEN', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('8f5bdfa1-2edb-4e39-954b-725e747b72e1', 'Babysitter for Evening Shift', 'Need a babysitter for an evening shift in Drogheda.', '12 Henry Street, Drogheda', 53.720499, -6.347556, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('8f5bdfa1-2edb-4e39-954b-725e747b72e1', 'Plumber for Leak Repair', 'Looking for a plumber to fix a leak in Navan.', '60 Upper Baggot Street, Navan', 53.652056, -6.671907, 1, 'OPEN', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('8f5bdfa1-2edb-4e39-954b-725e747b72e1', 'Cook for Party Catering', 'Looking for a cook to cater for a party in Drogheda.', '12 Henry Street, Drogheda', 53.720499, -6.347556, 2, 'COMPLETED', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('8f5bdfa1-2edb-4e39-954b-725e747b72e1', 'Gardener for Lawn Maintenance', 'Need a gardener for lawn maintenance in Navan.', '60 Upper Baggot Street, Navan', 53.652056, -6.671907, 1, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('8f5bdfa1-2edb-4e39-954b-725e747b72e1', 'Photographer for Portrait Session', 'Looking for a photographer for a portrait session in Drogheda.', '12 Henry Street, Drogheda', 53.720499, -6.347556, 1, 'OPEN', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('8f5bdfa1-2edb-4e39-954b-725e747b72e1', 'Mover for Furniture Relocation', 'Looking for a mover to relocate furniture in Navan.', '60 Upper Baggot Street, Navan', 53.652056, -6.671907, 2, 'IN_PROGRESS', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('8f5bdfa1-2edb-4e39-954b-725e747b72e1', 'Housekeeper for Weekly Chores', 'Need a housekeeper for weekly chores in Drogheda.', '12 Henry Street, Drogheda', 53.720499, -6.347556, 1, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');


-- User 40 (testuser40)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('3582040c-f300-4993-b1f6-30eb68873cf3', 'Cleaner for Residential House', 'Looking for a cleaner for a residential house in Carlow.', '4 Rathmines Road, Carlow', 52.846030, -6.933505, 2, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('3582040c-f300-4993-b1f6-30eb68873cf3', 'Painter for House Exterior', 'Need a painter for the exterior of a house in Arklow.', '15 Cruises Street, Arklow', 52.779139, -6.147036, 1, 'IN_PROGRESS', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('3582040c-f300-4993-b1f6-30eb68873cf3', 'Tutor for Maths Lessons', 'Looking for a maths tutor in Carlow.', '4 Rathmines Road, Carlow', 52.846030, -6.933505, 1, 'OPEN', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('3582040c-f300-4993-b1f6-30eb68873cf3', 'Babysitter for Weekend Care', 'Need a babysitter for weekend care in Arklow.', '15 Cruises Street, Arklow', 52.779139, -6.147036, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('3582040c-f300-4993-b1f6-30eb68873cf3', 'Plumber for Drain Cleaning', 'Looking for a plumber to clean drains in Carlow.', '4 Rathmines Road, Carlow', 52.846030, -6.933505, 1, 'OPEN', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('3582040c-f300-4993-b1f6-30eb68873cf3', 'Cook for Catering Service', 'Looking for a cook for a catering service in Arklow.', '15 Cruises Street, Arklow', 52.779139, -6.147036, 2, 'COMPLETED', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('3582040c-f300-4993-b1f6-30eb68873cf3', 'Gardener for Landscaping', 'Need a gardener for landscaping in Carlow.', '4 Rathmines Road, Carlow', 52.846030, -6.933505, 1, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('3582040c-f300-4993-b1f6-30eb68873cf3', 'Photographer for Family Photoshoot', 'Looking for a photographer for a family photoshoot in Arklow.', '15 Cruises Street, Arklow', 52.779139, -6.147036, 1, 'OPEN', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('3582040c-f300-4993-b1f6-30eb68873cf3', 'Mover for Furniture Relocation', 'Looking for a mover to relocate furniture in Carlow.', '4 Rathmines Road, Carlow', 52.846030, -6.933505, 2, 'IN_PROGRESS', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('3582040c-f300-4993-b1f6-30eb68873cf3', 'Housekeeper for Daily Chores', 'Need a housekeeper for daily chores in Arklow.', '15 Cruises Street, Arklow', 52.779139, -6.147036, 1, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');








-- User 41 (testuser41)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('23bc85db-a081-4f6d-8632-5f552cbeb5b1', 'Cleaner for Residential House', 'Looking for a cleaner for a residential house in Cork.', '34 The Crescent, Cork', -8.472512, 51.900112, 2, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('23bc85db-a081-4f6d-8632-5f552cbeb5b1', 'Painter for House Interior', 'Need a painter for the interior of a house in Tralee.', '25 Main Street, Tralee', -9.703218, 52.271510, 1, 'IN_PROGRESS', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('23bc85db-a081-4f6d-8632-5f552cbeb5b1', 'Tutor for English Lessons', 'Looking for an English tutor in Cork.', '34 The Crescent, Cork', -8.472512, 51.900112, 1, 'OPEN', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('23bc85db-a081-4f6d-8632-5f552cbeb5b1', 'Babysitter for Evening Care', 'Need a babysitter for evening care in Tralee.', '25 Main Street, Tralee', -9.703218, 52.271510, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('23bc85db-a081-4f6d-8632-5f552cbeb5b1', 'Plumber for Pipe Repair', 'Looking for a plumber to repair pipes in Cork.', '34 The Crescent, Cork', -8.472512, 51.900112, 1, 'OPEN', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('23bc85db-a081-4f6d-8632-5f552cbeb5b1', 'Cook for Family Dinner', 'Looking for a cook to prepare a family dinner in Tralee.', '25 Main Street, Tralee', -9.703218, 52.271510, 2, 'COMPLETED', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('23bc85db-a081-4f6d-8632-5f552cbeb5b1', 'Gardener for Lawn Care', 'Need a gardener for lawn care in Cork.', '34 The Crescent, Cork', -8.472512, 51.900112, 1, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('23bc85db-a081-4f6d-8632-5f552cbeb5b1', 'Photographer for Wedding Photoshoot', 'Looking for a photographer for a wedding photoshoot in Tralee.', '25 Main Street, Tralee', -9.703218, 52.271510, 1, 'OPEN', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('23bc85db-a081-4f6d-8632-5f552cbeb5b1', 'Mover for Household Items', 'Looking for a mover to relocate household items in Cork.', '34 The Crescent, Cork', -8.472512, 51.900112, 2, 'IN_PROGRESS', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('23bc85db-a081-4f6d-8632-5f552cbeb5b1', 'Housekeeper for Weekly Chores', 'Need a housekeeper for weekly chores in Tralee.', '25 Main Street, Tralee', -9.703218, 52.271510, 1, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');

-- User 42 (testuser42)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('1d6b43cd-ae8e-4f56-84f5-30e2639da029', 'Electrician for House Wiring', 'Looking for an electrician to wire a house in Galway.', '15 Pembroke Street, Galway', -9.048722, 53.277814, 1, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('1d6b43cd-ae8e-4f56-84f5-30e2639da029', 'Roofing Specialist for Roof Repair', 'Need a roofing specialist to repair the roof in Wexford.', '5 Clonard Road, Wexford', -6.462131, 52.338692, 1, 'IN_PROGRESS', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('1d6b43cd-ae8e-4f56-84f5-30e2639da029', 'Personal Trainer for Fitness Sessions', 'Looking for a personal trainer for fitness sessions in Galway.', '15 Pembroke Street, Galway', -9.048722, 53.277814, 1, 'OPEN', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('1d6b43cd-ae8e-4f56-84f5-30e2639da029', 'Cleaner for Office Space', 'Need a cleaner for office space in Wexford.', '5 Clonard Road, Wexford', -6.462131, 52.338692, 2, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('1d6b43cd-ae8e-4f56-84f5-30e2639da029', 'Babysitter for Weekend Care', 'Looking for a babysitter for weekend care in Galway.', '15 Pembroke Street, Galway', -9.048722, 53.277814, 1, 'OPEN', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('1d6b43cd-ae8e-4f56-84f5-30e2639da029', 'Cook for Family Dinner', 'Looking for a cook to prepare a family dinner in Wexford.', '5 Clonard Road, Wexford', -6.462131, 52.338692, 2, 'COMPLETED', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('1d6b43cd-ae8e-4f56-84f5-30e2639da029', 'Painter for House Interior', 'Looking for a painter for house interior in Galway.', '15 Pembroke Street, Galway', -9.048722, 53.277814, 1, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('1d6b43cd-ae8e-4f56-84f5-30e2639da029', 'Photographer for Family Portraits', 'Need a photographer for family portraits in Wexford.', '5 Clonard Road, Wexford', -6.462131, 52.338692, 1, 'OPEN', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('1d6b43cd-ae8e-4f56-84f5-30e2639da029', 'Gardener for Lawn Care', 'Looking for a gardener for lawn care in Galway.', '15 Pembroke Street, Galway', -9.048722, 53.277814, 2, 'IN_PROGRESS', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('1d6b43cd-ae8e-4f56-84f5-30e2639da029', 'Tutor for Math Lessons', 'Looking for a tutor for math lessons in Wexford.', '5 Clonard Road, Wexford', -6.462131, 52.338692, 1, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');

-- User 43 (testuser43)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('e75c0713-46cd-4878-8c86-96390dafabba', 'Plumber for Pipe Repair', 'Looking for a plumber to repair a broken pipe in Waterford.', '12 Kilmore Road, Waterford', -7.133514, 52.259522, 1, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('e75c0713-46cd-4878-8c86-96390dafabba', 'Carpenter for Furniture Assembly', 'Need a carpenter to assemble furniture in Cavan.', '50 Main Street, Cavan', -7.353221, 53.989412, 1, 'IN_PROGRESS', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('e75c0713-46cd-4878-8c86-96390dafabba', 'Housekeeper for Deep Cleaning', 'Looking for a housekeeper for a deep cleaning in Waterford.', '12 Kilmore Road, Waterford', -7.133514, 52.259522, 2, 'OPEN', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('e75c0713-46cd-4878-8c86-96390dafabba', 'Tutor for English Lessons', 'Looking for a tutor for English lessons in Cavan.', '50 Main Street, Cavan', -7.353221, 53.989412, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('e75c0713-46cd-4878-8c86-96390dafabba', 'Photographer for Event Photography', 'Need a photographer for an event in Waterford.', '12 Kilmore Road, Waterford', -7.133514, 52.259522, 1, 'OPEN', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('e75c0713-46cd-4878-8c86-96390dafabba', 'Mover for Relocation', 'Looking for a mover to assist with relocation in Cavan.', '50 Main Street, Cavan', -7.353221, 53.989412, 2, 'COMPLETED', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('e75c0713-46cd-4878-8c86-96390dafabba', 'Personal Chef for Family Dinner', 'Looking for a personal chef to cook a family dinner in Waterford.', '12 Kilmore Road, Waterford', -7.133514, 52.259522, 1, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('e75c0713-46cd-4878-8c86-96390dafabba', 'Electrician for Light Fixture Installation', 'Need an electrician to install light fixtures in Cavan.', '50 Main Street, Cavan', -7.353221, 53.989412, 1, 'OPEN', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('e75c0713-46cd-4878-8c86-96390dafabba', 'Gardener for Yard Maintenance', 'Looking for a gardener for yard maintenance in Waterford.', '12 Kilmore Road, Waterford', -7.133514, 52.259522, 2, 'IN_PROGRESS', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('e75c0713-46cd-4878-8c86-96390dafabba', 'Painter for Home Interior', 'Looking for a painter for home interior in Cavan.', '50 Main Street, Cavan', -7.353221, 53.989412, 1, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');

-- User 44 (testuser44)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('e2f3066f-c3a2-4908-81a3-88ef0810c0fc', 'Electrician for Wiring Repair', 'Looking for an electrician to repair wiring in Kilkenny.', '10 Church Road, Kilkenny', -7.252653, 52.646510, 1, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('e2f3066f-c3a2-4908-81a3-88ef0810c0fc', 'Roof Repair Specialist', 'Need a roof repair specialist in Ennis for minor repairs.', '23 Mallow Street, Ennis', -8.981859, 52.847295, 1, 'IN_PROGRESS', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('e2f3066f-c3a2-4908-81a3-88ef0810c0fc', 'Cleaner for Office Space', 'Looking for a cleaner for an office space in Kilkenny.', '10 Church Road, Kilkenny', -7.252653, 52.646510, 2, 'OPEN', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('e2f3066f-c3a2-4908-81a3-88ef0810c0fc', 'Plumber for Pipe Fix', 'Looking for a plumber to fix a broken pipe in Ennis.', '23 Mallow Street, Ennis', -8.981859, 52.847295, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('e2f3066f-c3a2-4908-81a3-88ef0810c0fc', 'Personal Trainer for Sessions', 'Looking for a personal trainer in Kilkenny to guide fitness sessions.', '10 Church Road, Kilkenny', -7.252653, 52.646510, 1, 'OPEN', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('e2f3066f-c3a2-4908-81a3-88ef0810c0fc', 'Painter for Interior Walls', 'Need a painter to paint the interior walls in Ennis.', '23 Mallow Street, Ennis', -8.981859, 52.847295, 2, 'COMPLETED', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('e2f3066f-c3a2-4908-81a3-88ef0810c0fc', 'Gardener for Lawn Maintenance', 'Looking for a gardener to maintain the lawn in Kilkenny.', '10 Church Road, Kilkenny', -7.252653, 52.646510, 1, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('e2f3066f-c3a2-4908-81a3-88ef0810c0fc', 'Photographer for Event', 'Need a photographer for a family event in Ennis.', '23 Mallow Street, Ennis', -8.981859, 52.847295, 1, 'OPEN', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('e2f3066f-c3a2-4908-81a3-88ef0810c0fc', 'Cook for Family Dinner', 'Looking for a cook to prepare a family dinner in Kilkenny.', '10 Church Road, Kilkenny', -7.252653, 52.646510, 2, 'IN_PROGRESS', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('e2f3066f-c3a2-4908-81a3-88ef0810c0fc', 'Babysitter for Evening Care', 'Looking for a babysitter for evening care in Ennis.', '23 Mallow Street, Ennis', -8.981859, 52.847295, 1, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');


-- User 45 (testuser45)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('06b7e652-d198-4e1d-b0af-aa833794a73b', 'Carpenter for Furniture Repair', 'Looking for a carpenter to repair furniture in Waterford.', '7 Dunmore Road, Waterford', -7.086230, 52.265893, 1, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('06b7e652-d198-4e1d-b0af-aa833794a73b', 'Electrician for Electrical Installations', 'Need an electrician for electrical installations in Tullamore.', '2 Market Square, Tullamore', -7.499612, 53.272043, 2, 'OPEN', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('06b7e652-d198-4e1d-b0af-aa833794a73b', 'Gardener for Garden Landscaping', 'Looking for a gardener to landscape a garden in Waterford.', '7 Dunmore Road, Waterford', -7.086230, 52.265893, 1, 'IN_PROGRESS', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('06b7e652-d198-4e1d-b0af-aa833794a73b', 'Plumber for Leaking Pipes', 'Need a plumber to fix leaking pipes in Tullamore.', '2 Market Square, Tullamore', -7.499612, 53.272043, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('06b7e652-d198-4e1d-b0af-aa833794a73b', 'Cleaner for Housekeeping Services', 'Looking for a cleaner to provide housekeeping services in Waterford.', '7 Dunmore Road, Waterford', -7.086230, 52.265893, 2, 'COMPLETED', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('06b7e652-d198-4e1d-b0af-aa833794a73b', 'Painter for Home Interior', 'Need a painter to paint the interior of a house in Tullamore.', '2 Market Square, Tullamore', -7.499612, 53.272043, 1, 'OPEN', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('06b7e652-d198-4e1d-b0af-aa833794a73b', 'Chef for Private Event', 'Looking for a chef to cater for a private event in Waterford.', '7 Dunmore Road, Waterford', -7.086230, 52.265893, 1, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('06b7e652-d198-4e1d-b0af-aa833794a73b', 'Photographer for Wedding', 'Need a photographer for a wedding event in Tullamore.', '2 Market Square, Tullamore', -7.499612, 53.272043, 1, 'OPEN', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('06b7e652-d198-4e1d-b0af-aa833794a73b', 'Mover for Furniture Relocation', 'Looking for a mover to help with furniture relocation in Waterford.', '7 Dunmore Road, Waterford', -7.086230, 52.265893, 2, 'IN_PROGRESS', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('06b7e652-d198-4e1d-b0af-aa833794a73b', 'Babysitter for Evening Shift', 'Need a babysitter for the evening shift in Tullamore.', '2 Market Square, Tullamore', -7.499612, 53.272043, 1, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');


-- User 46 (testuser46)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('ecf7dced-3cc9-4c14-bf96-bd75e11100b6', 'Cleaner for Office Cleaning', 'Looking for a cleaner to clean an office space in Limerick.', '8 O’Connell Street, Limerick', -8.623487, 52.668102, 1, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('ecf7dced-3cc9-4c14-bf96-bd75e11100b6', 'Driver for Delivery', 'Need a driver to deliver goods in Arklow.', '9 Castle Road, Arklow', -6.129801, 52.788101, 2, 'OPEN', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('ecf7dced-3cc9-4c14-bf96-bd75e11100b6', 'Gardener for Lawn Mowing', 'Looking for a gardener to mow the lawn in Limerick.', '8 O’Connell Street, Limerick', -8.623487, 52.668102, 1, 'IN_PROGRESS', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('ecf7dced-3cc9-4c14-bf96-bd75e11100b6', 'Plumber for Pipe Installation', 'Need a plumber for pipe installation in Arklow.', '9 Castle Road, Arklow', -6.129801, 52.788101, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('ecf7dced-3cc9-4c14-bf96-bd75e11100b6', 'Painter for Exterior Painting', 'Looking for a painter to paint the exterior of a house in Limerick.', '8 O’Connell Street, Limerick', -8.623487, 52.668102, 2, 'COMPLETED', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('ecf7dced-3cc9-4c14-bf96-bd75e11100b6', 'Photographer for Event Photography', 'Need a photographer for an event in Arklow.', '9 Castle Road, Arklow', -6.129801, 52.788101, 1, 'OPEN', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('ecf7dced-3cc9-4c14-bf96-bd75e11100b6', 'Chef for Catering Service', 'Looking for a chef to provide catering services in Limerick.', '8 O’Connell Street, Limerick', -8.623487, 52.668102, 1, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('ecf7dced-3cc9-4c14-bf96-bd75e11100b6', 'Electrician for Home Wiring', 'Need an electrician to wire a home in Arklow.', '9 Castle Road, Arklow', -6.129801, 52.788101, 2, 'IN_PROGRESS', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('ecf7dced-3cc9-4c14-bf96-bd75e11100b6', 'Mover for Furniture Delivery', 'Looking for a mover to help with furniture delivery in Limerick.', '8 O’Connell Street, Limerick', -8.623487, 52.668102, 1, 'OPEN', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('ecf7dced-3cc9-4c14-bf96-bd75e11100b6', 'Babysitter for Afternoon Shift', 'Need a babysitter for an afternoon shift in Arklow.', '9 Castle Road, Arklow', -6.129801, 52.788101, 1, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');


-- User 47 (testuser47)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('d9fca264-cfe4-4032-b7ed-c8e5a3a59c55', 'Carpenter for Custom Furniture', 'Looking for a carpenter to create custom furniture in Clonmel.', '14 High Street, Clonmel', -7.706717, 52.355907, 1, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('d9fca264-cfe4-4032-b7ed-c8e5a3a59c55', 'Electrician for Electrical Repairs', 'Need an electrician to perform electrical repairs in Kilkenny.', '25 John Street, Kilkenny', -7.258344, 52.646791, 2, 'OPEN', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('d9fca264-cfe4-4032-b7ed-c8e5a3a59c55', 'Gardener for Lawn Maintenance', 'Looking for a gardener to maintain the lawn in Clonmel.', '14 High Street, Clonmel', -7.706717, 52.355907, 1, 'IN_PROGRESS', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('d9fca264-cfe4-4032-b7ed-c8e5a3a59c55', 'Plumber for Pipe Repair', 'Need a plumber to repair pipes in Kilkenny.', '25 John Street, Kilkenny', -7.258344, 52.646791, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('d9fca264-cfe4-4032-b7ed-c8e5a3a59c55', 'Painter for Home Interior', 'Looking for a painter to paint the interior of a house in Clonmel.', '14 High Street, Clonmel', -7.706717, 52.355907, 2, 'COMPLETED', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('d9fca264-cfe4-4032-b7ed-c8e5a3a59c55', 'Chef for Private Event Catering', 'Need a chef to cater for a private event in Kilkenny.', '25 John Street, Kilkenny', -7.258344, 52.646791, 1, 'OPEN', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('d9fca264-cfe4-4032-b7ed-c8e5a3a59c55', 'Photographer for Family Photoshoot', 'Looking for a photographer for a family photoshoot in Clonmel.', '14 High Street, Clonmel', -7.706717, 52.355907, 1, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('d9fca264-cfe4-4032-b7ed-c8e5a3a59c55', 'Electrician for Home Wiring', 'Need an electrician for home wiring in Kilkenny.', '25 John Street, Kilkenny', -7.258344, 52.646791, 2, 'IN_PROGRESS', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('d9fca264-cfe4-4032-b7ed-c8e5a3a59c55', 'Mover for Furniture Relocation', 'Looking for a mover to help with furniture relocation in Clonmel.', '14 High Street, Clonmel', -7.706717, 52.355907, 1, 'OPEN', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('d9fca264-cfe4-4032-b7ed-c8e5a3a59c55', 'Babysitter for Evening Shift', 'Need a babysitter for the evening shift in Kilkenny.', '25 John Street, Kilkenny', -7.258344, 52.646791, 1, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');


-- User 48 (testuser48)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('cc55d0ce-f622-4510-a3ad-44dc1ca4c8bf', 'Painter for House Exterior', 'Looking for a painter to paint the exterior of a house in Cork.', '16 Pembroke Lane, Cork', -8.472047, 51.899238, 2, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('cc55d0ce-f622-4510-a3ad-44dc1ca4c8bf', 'Chef for Private Dinner Party', 'Need a chef to prepare a private dinner party in Sligo.', '17 Main Street, Sligo', -8.476184, 54.276302, 1, 'OPEN', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('cc55d0ce-f622-4510-a3ad-44dc1ca4c8bf', 'Cleaner for Office Space', 'Looking for a cleaner to clean an office space in Cork.', '16 Pembroke Lane, Cork', -8.472047, 51.899238, 1, 'IN_PROGRESS', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('cc55d0ce-f622-4510-a3ad-44dc1ca4c8bf', 'Gardener for Garden Maintenance', 'Need a gardener to maintain the garden in Sligo.', '17 Main Street, Sligo', -8.476184, 54.276302, 2, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('cc55d0ce-f622-4510-a3ad-44dc1ca4c8bf', 'Electrician for Wiring Installation', 'Looking for an electrician to install new wiring in Cork.', '16 Pembroke Lane, Cork', -8.472047, 51.899238, 1, 'COMPLETED', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('cc55d0ce-f622-4510-a3ad-44dc1ca4c8bf', 'Plumber for Pipe Replacement', 'Need a plumber to replace pipes in Sligo.', '17 Main Street, Sligo', -8.476184, 54.276302, 1, 'OPEN', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('cc55d0ce-f622-4510-a3ad-44dc1ca4c8bf', 'Mover for Furniture Relocation', 'Looking for a mover to relocate furniture in Cork.', '16 Pembroke Lane, Cork', -8.472047, 51.899238, 2, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('cc55d0ce-f622-4510-a3ad-44dc1ca4c8bf', 'Babysitter for Evening Shift', 'Need a babysitter for the evening shift in Sligo.', '17 Main Street, Sligo', -8.476184, 54.276302, 1, 'IN_PROGRESS', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('cc55d0ce-f622-4510-a3ad-44dc1ca4c8bf', 'Photographer for Event', 'Looking for a photographer for a family event in Cork.', '16 Pembroke Lane, Cork', -8.472047, 51.899238, 1, 'OPEN', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('cc55d0ce-f622-4510-a3ad-44dc1ca4c8bf', 'Carpenter for Custom Furniture', 'Need a carpenter to make custom furniture for a house in Sligo.', '17 Main Street, Sligo', -8.476184, 54.276302, 2, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');


-- User 49 (testuser49)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('28426cb8-6aff-4c9f-bc1d-1390e162769c', 'Cleaner for Residential Home', 'Looking for a cleaner to clean a residential home in Derry.', '19 Castle Avenue, Derry', -7.329114, 54.991717, 2, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('28426cb8-6aff-4c9f-bc1d-1390e162769c', 'Chef for Family Dinner', 'Need a chef to prepare a family dinner in Carlow.', '5 Market Street, Carlow', -6.929873, 52.846469, 1, 'OPEN', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('28426cb8-6aff-4c9f-bc1d-1390e162769c', 'Handyman for Home Repairs', 'Looking for a handyman to make home repairs in Derry.', '19 Castle Avenue, Derry', -7.329114, 54.991717, 1, 'IN_PROGRESS', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('28426cb8-6aff-4c9f-bc1d-1390e162769c', 'Electrician for Wiring Repair', 'Need an electrician to repair faulty wiring in Carlow.', '5 Market Street, Carlow', -6.929873, 52.846469, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('28426cb8-6aff-4c9f-bc1d-1390e162769c', 'Gardener for Lawn Care', 'Looking for a gardener to take care of the lawn in Derry.', '19 Castle Avenue, Derry', -7.329114, 54.991717, 2, 'COMPLETED', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('28426cb8-6aff-4c9f-bc1d-1390e162769c', 'Painter for Room Decoration', 'Need a painter for room decoration in Carlow.', '5 Market Street, Carlow', -6.929873, 52.846469, 1, 'OPEN', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('28426cb8-6aff-4c9f-bc1d-1390e162769c', 'Mover for Furniture Relocation', 'Looking for a mover to relocate furniture in Derry.', '19 Castle Avenue, Derry', -7.329114, 54.991717, 1, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('28426cb8-6aff-4c9f-bc1d-1390e162769c', 'Tutor for Mathematics Lessons', 'Need a tutor to give private mathematics lessons in Carlow.', '5 Market Street, Carlow', -6.929873, 52.846469, 1, 'IN_PROGRESS', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('28426cb8-6aff-4c9f-bc1d-1390e162769c', 'Photographer for Event Photos', 'Looking for a photographer for an event in Derry.', '19 Castle Avenue, Derry', -7.329114, 54.991717, 1, 'OPEN', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('28426cb8-6aff-4c9f-bc1d-1390e162769c', 'Cleaner for Office Space', 'Need a cleaner to clean office space in Carlow.', '5 Market Street, Carlow', -6.929873, 52.846469, 2, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');


-- User 50 (testuser50)
INSERT INTO public.job_post (job_poster_id, title, description, address, longitude, latitude, max_applicants, status, date_posted, last_updated_at)
VALUES
    ('6295c9ae-de57-4f2a-9f1c-1ed2ab94267b', 'Cleaner for Office Space', 'Looking for a cleaner to maintain office space in Louth.', '2 Railway Street, Louth', -6.416589, 53.983215, 2, 'OPEN', '2025-02-14 09:00:00', '2025-02-14 09:30:00'),
    ('6295c9ae-de57-4f2a-9f1c-1ed2ab94267b', 'Personal Chef for Dinner Party', 'Need a personal chef to prepare dinner in Waterford.', '28 Ormonde Road, Waterford', -7.085574, 52.267004, 1, 'OPEN', '2025-02-14 10:00:00', '2025-02-14 10:30:00'),
    ('6295c9ae-de57-4f2a-9f1c-1ed2ab94267b', 'Carpenter for Furniture Assembly', 'Looking for a carpenter to assemble furniture in Louth.', '2 Railway Street, Louth', -6.416589, 53.983215, 1, 'IN_PROGRESS', '2025-02-14 11:00:00', '2025-02-14 11:30:00'),
    ('6295c9ae-de57-4f2a-9f1c-1ed2ab94267b', 'Electrician for Light Installation', 'Need an electrician to install lights in Waterford.', '28 Ormonde Road, Waterford', -7.085574, 52.267004, 1, 'OPEN', '2025-02-14 12:00:00', '2025-02-14 12:30:00'),
    ('6295c9ae-de57-4f2a-9f1c-1ed2ab94267b', 'Gardener for Landscaping', 'Looking for a gardener to design the landscape in Louth.', '2 Railway Street, Louth', -6.416589, 53.983215, 2, 'COMPLETED', '2025-02-14 13:00:00', '2025-02-14 13:30:00'),
    ('6295c9ae-de57-4f2a-9f1c-1ed2ab94267b', 'Mover for Heavy Lifting', 'Need a mover to help with heavy lifting in Waterford.', '28 Ormonde Road, Waterford', -7.085574, 52.267004, 1, 'OPEN', '2025-02-14 14:00:00', '2025-02-14 14:30:00'),
    ('6295c9ae-de57-4f2a-9f1c-1ed2ab94267b', 'Plumber for Pipe Repair', 'Looking for a plumber to repair leaking pipes in Louth.', '2 Railway Street, Louth', -6.416589, 53.983215, 1, 'OPEN', '2025-02-14 15:00:00', '2025-02-14 15:30:00'),
    ('6295c9ae-de57-4f2a-9f1c-1ed2ab94267b', 'Photographer for Family Portraits', 'Need a photographer for family portraits in Waterford.', '28 Ormonde Road, Waterford', -7.085574, 52.267004, 1, 'IN_PROGRESS', '2025-02-14 16:00:00', '2025-02-14 16:30:00'),
    ('6295c9ae-de57-4f2a-9f1c-1ed2ab94267b', 'Tutor for English Lessons', 'Looking for a tutor for English lessons in Louth.', '2 Railway Street, Louth', -6.416589, 53.983215, 1, 'OPEN', '2025-02-14 17:00:00', '2025-02-14 17:30:00'),
    ('6295c9ae-de57-4f2a-9f1c-1ed2ab94267b', 'Housekeeper for Cleaning', 'Need a housekeeper for regular cleaning in Waterford.', '28 Ormonde Road, Waterford', -7.085574, 52.267004, 2, 'OPEN', '2025-02-14 18:00:00', '2025-02-14 18:30:00');


