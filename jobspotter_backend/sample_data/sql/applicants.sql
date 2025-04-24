
-- Job 1: Pet Sitting (IN_PROGRESS, max 5, ACCEPTED 5)
-- INSERT 5 applicants (ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 03:00:00', '2025-02-17 03:00:00', 'Experienced pet sitter, can take care of your dog.', 'ACCEPTED', '5d95a781-aab6-4ba2-87c3-e866034921a3'),
('2025-02-17 03:30:00', '2025-02-17 03:30:00', 'Loves animals, can take care of all pets.', 'ACCEPTED', '029ec727-765b-4618-960e-d7a472fd10ad'),
('2025-02-17 04:00:00', '2025-02-17 04:00:00', 'Experienced with both cats and dogs.', 'ACCEPTED', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8'),
('2025-02-17 04:30:00', '2025-02-17 04:30:00', 'Reliable pet sitter, available on weekends.', 'ACCEPTED', '426b2c8b-9e01-43ce-ae38-d669fee55504'),
('2025-02-17 05:00:00', '2025-02-17 05:00:00', 'Can care for pets in my own home, or at yours.', 'ACCEPTED', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7');

-- Insert applicants into junction table for Job 1
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(1, 17), (1, 18), (1, 19), (1, 20), (1, 21);

-- Job 2: Baby Sitting (OPEN, max 4)
-- INSERT 4 applicants (all PENDING)
INSERT INTO applicant ( date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 06:00:00', '2025-02-17 06:00:00', 'Available for babysitting, experienced with kids.', 'PENDING', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d'),
('2025-02-17 06:30:00', '2025-02-17 06:30:00', 'Experienced in babysitting for children of all ages.', 'PENDING', '149644e7-f8dd-4204-9d3b-9b238cff0619'),
('2025-02-17 07:00:00', '2025-02-17 07:00:00', 'I am patient and trustworthy for babysitting.', 'PENDING', '3e790d49-d17a-4c7f-a74b-bd0aab21d346'),
('2025-02-17 07:30:00', '2025-02-17 07:30:00', 'Can babysit on weekends and evenings.', 'PENDING', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3');

-- Insert applicants into junction table for Job 2
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(2, 22), (2, 23), (2, 24), (2, 25);

-- Job 3: Lawn Care (IN_PROGRESS, max 6, ACCEPTED 6)
-- INSERT 6 applicants (ACCEPTED)
INSERT INTO applicant ( date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 08:00:00', '2025-02-17 08:00:00', 'Experienced lawn care provider.', 'ACCEPTED', '0c405703-5447-4460-a6cb-af102bb27f25'),
('2025-02-17 08:30:00', '2025-02-17 08:30:00', 'Ready to take care of your lawn and garden.', 'ACCEPTED', 'ab0fd215-410c-4204-add1-06b0fa64d03e'),
('2025-02-17 09:00:00', '2025-02-17 09:00:00', 'I can handle lawn maintenance tasks.', 'ACCEPTED', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c'),
('2025-02-17 09:30:00', '2025-02-17 09:30:00', 'Experienced in lawn mowing and yard cleanup.', 'ACCEPTED', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d'),
('2025-02-17 10:00:00', '2025-02-17 10:00:00', 'Available for lawn care throughout the week.', 'ACCEPTED', '33792185-d7af-4e48-8244-997e2ae1c8c4'),
('2025-02-17 10:30:00', '2025-02-17 10:30:00', 'Can help with mowing and gardening tasks.', 'ACCEPTED', '2223cdf9-ce32-4631-b272-5de4390187f6');

-- Insert applicants into junction table for Job 3
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(3, 26), (3, 27), (3, 28), (3, 29), (3, 30), (3, 31);

-- Job 4: House Cleaning (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant ( date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 11:00:00', '2025-02-17 11:00:00', 'Can clean your house and do basic chores.', 'PENDING', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a'),
('2025-02-17 11:30:00', '2025-02-17 11:30:00', 'Experienced cleaner, can do general cleaning and deep cleaning.', 'PENDING', '1380b38d-540c-4bfe-bcf6-0024081a8b0f'),
('2025-02-17 12:00:00', '2025-02-17 12:00:00', 'Can provide eco-friendly cleaning services.', 'PENDING', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8');

-- Insert applicants into junction table for Job 4
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(4, 32), (4, 33), (4, 34);

-- Job 5: Dog Walking (IN_PROGRESS, max 4, ACCEPTED 4)
-- INSERT 4 applicants (ACCEPTED)
INSERT INTO applicant ( date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 12:30:00', '2025-02-17 12:30:00', 'Available to walk dogs, experience with all breeds.', 'ACCEPTED', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27'),
('2025-02-17 13:00:00', '2025-02-17 13:00:00', 'Can walk your dog on short notice.', 'ACCEPTED', 'f6f61fd2-0227-4176-af2c-6e358279312f'),
('2025-02-17 13:30:00', '2025-02-17 13:30:00', 'I have experience walking dogs of all sizes.', 'ACCEPTED', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14'),
('2025-02-17 14:00:00', '2025-02-17 14:00:00', 'Love walking dogs, available every day.', 'ACCEPTED', '9b796866-bda9-4102-9c56-bd62e1082f7d');

-- Insert applicants into junction table for Job 5
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(5, 35), (5, 36), (5, 37), (5, 38);


-- Job 6: Moving Assistant (OPEN, max 8)
-- INSERT 8 applicants (all PENDING)
INSERT INTO applicant ( date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 03:00:00', '2025-02-17 03:00:00', 'Can help with heavy lifting.', 'PENDING', '3f327cb7-80ae-472f-86e1-085028b32bff'),
('2025-02-17 03:30:00', '2025-02-17 03:30:00', 'Available weekends for moving.', 'PENDING', 'b50517e9-8656-444a-a348-b0f53664e9cf'),
('2025-02-17 04:00:00', '2025-02-17 04:00:00', 'Experienced in moving assistance.', 'PENDING', 'bacb833d-045c-4452-a880-6f607e4a6c05'),
('2025-02-17 04:30:00', '2025-02-17 04:30:00', 'Strong and efficient, can handle heavy loads.', 'PENDING', '00a04b3b-1800-4ef5-8694-b5bef27be101'),
('2025-02-17 05:00:00', '2025-02-17 05:00:00', 'Ready to work on weekends and evenings.', 'PENDING', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0'),
('2025-02-17 05:30:00', '2025-02-17 05:30:00', 'Can work as a team or independently.', 'PENDING', 'df9a7413-65fb-46c7-99a0-6f5f6243314c'),
('2025-02-17 06:00:00', '2025-02-17 06:00:00', 'Looking for extra work, experienced mover.', 'PENDING', '290aa2e8-f6d7-4a66-a783-2a54aa109569'),
('2025-02-17 06:30:00', '2025-02-17 06:30:00', 'Can carry large items and furniture.', 'PENDING', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f');

-- Insert applicants into junction table for Job 6
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(6, 39), (6, 40), (6, 41), (6, 42), (6,43), (6, 44), (6, 45), (6, 46);
-- Job 7: Restaurant Delivery (IN_PROGRESS, max 6, ACCEPTED 6)
-- INSERT 6 applicants (ACCEPTED)
INSERT INTO applicant ( date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 07:00:00', '2025-02-17 07:00:00', 'Ready to deliver food, experience in restaurant delivery.', 'ACCEPTED', 'c79f9012-2fb8-4231-89d5-bc135e857449'),
('2025-02-17 07:30:00', '2025-02-17 07:30:00', 'Can deliver to multiple locations in the area.', 'ACCEPTED', '5c9b860b-114a-4793-8fbc-672037defb88'),
('2025-02-17 08:00:00', '2025-02-17 08:00:00', 'Flexible with timing, ready for immediate start.', 'ACCEPTED', '76f3d814-f5ac-42fe-88cb-ea47c6284c72'),
('2025-02-17 08:30:00', '2025-02-17 08:30:00', 'I have previous food delivery experience.', 'ACCEPTED', '2d73a822-abad-4776-894e-eb6ea78600d6'),
('2025-02-17 09:00:00', '2025-02-17 09:00:00', 'Can work nights and weekends.', 'ACCEPTED', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07'),
('2025-02-17 09:30:00', '2025-02-17 09:30:00', 'I am punctual and reliable for deliveries.', 'ACCEPTED', 'c647cd9e-3757-481d-9423-b7e1136ebaa8');

-- Insert applicants into junction table for Job 7
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(7, 47), (7, 48), (7, 49), (7, 50), (7, 51), (7, 52);

-- Job 8: Grocery Delivery (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant ( date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 10:00:00', '2025-02-17 10:00:00', 'Can deliver groceries to homes.', 'PENDING', '090e3603-529b-4a6e-bb17-ed95b3e25ddf'),
('2025-02-17 10:30:00', '2025-02-17 10:30:00', 'Can deliver on the same day.', 'PENDING', 'ba866253-3826-49d0-ba8c-187b57157633'),
('2025-02-17 11:00:00', '2025-02-17 11:00:00', 'I can do fast grocery deliveries.', 'PENDING', '998aec76-87ca-42bc-9669-4ad096f2b2bc'),
('2025-02-17 11:30:00', '2025-02-17 11:30:00', 'Ready for flexible working hours.', 'PENDING', 'f2329eb0-4cba-4674-8822-d55099046642'),
('2025-02-17 12:00:00', '2025-02-17 12:00:00', 'I am available to work on weekends.', 'PENDING', '5d95a781-aab6-4ba2-87c3-e866034921a3');

-- Insert applicants into junction table for Job 8
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(8, 53), (8, 54), (8, 55), (8, 56), (8, 57);

-- Job 9: Personal Shopper (IN_PROGRESS, max 4, ACCEPTED 4)
-- INSERT 4 applicants (ACCEPTED)
INSERT INTO applicant ( date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 12:30:00', '2025-02-17 12:30:00', 'I have experience in shopping for others.', 'ACCEPTED', '029ec727-765b-4618-960e-d7a472fd10ad'),
('2025-02-17 13:00:00', '2025-02-17 13:00:00', 'Flexible and available during the day.', 'ACCEPTED', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8'),
('2025-02-17 13:30:00', '2025-02-17 13:30:00', 'Can do personalized shopping.', 'ACCEPTED', '426b2c8b-9e01-43ce-ae38-d669fee55504'),
('2025-02-17 14:00:00', '2025-02-17 14:00:00', 'Experienced in helping people with grocery shopping.', 'ACCEPTED', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7');

-- Insert applicants into junction table for Job 9
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(9, 58), (9, 59), (9, 60), (9, 61);

-- Job 10: Delivery for Senior Citizens (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant ( date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 14:30:00', '2025-02-17 14:30:00', 'Can assist seniors with their deliveries.', 'PENDING', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d'),
('2025-02-17 15:00:00', '2025-02-17 15:00:00', 'Experience with helping elderly people.', 'PENDING', '149644e7-f8dd-4204-9d3b-9b238cff0619'),
('2025-02-17 15:30:00', '2025-02-17 15:30:00', 'Available on short notice, reliable and caring.', 'PENDING', '3e790d49-d17a-4c7f-a74b-bd0aab21d346');

-- Insert applicants into junction table for Job 10
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(10, 62), (10, 63), (10, 64);










-- Job Post 11: Housekeeper (OPEN, max 8)
-- INSERT 8 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-18 08:00:00', '2025-02-18 08:00:00', 'Experienced housekeeper, available for regular cleaning.', 'PENDING', 'bacb833d-045c-4452-a880-6f607e4a6c05'),
('2025-02-18 08:30:00', '2025-02-18 08:30:00', 'Can provide references, thorough cleaning guaranteed.', 'PENDING', '00a04b3b-1800-4ef5-8694-b5bef27be101'),
('2025-02-18 09:00:00', '2025-02-18 09:00:00', 'Available weekdays, flexible hours.', 'PENDING', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0'),
('2025-02-18 09:30:00', '2025-02-18 09:30:00', 'Detail-oriented, efficient cleaning services.', 'PENDING', 'df9a7413-65fb-46c7-99a0-6f5f6243314c'),
('2025-02-18 10:00:00', '2025-02-18 10:00:00', 'Experienced in all aspects of housekeeping.', 'PENDING', '290aa2e8-f6d7-4a66-a783-2a54aa109569'),
('2025-02-18 10:30:00', '2025-02-18 10:30:00', 'Own cleaning supplies, ready to start.', 'PENDING', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f'),
('2025-02-18 11:00:00', '2025-02-18 11:00:00', 'Reliable and trustworthy housekeeper.', 'PENDING', '2c289845-52e2-4f70-bfa4-7cab86b84dc0'),
('2025-02-18 11:30:00', '2025-02-18 11:30:00', 'Available for weekly or bi-weekly cleaning.', 'PENDING', '0d786962-5188-43db-8b3f-b04adf206bb7');

-- Insert applicants into junction table for Job 11
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(11, 65), (11, 66), (11, 67), (11, 68), (11, 69), (11, 70), (11, 71), (11, 72);

-- Job Post 12: Cleaner (OPEN, max 6)
-- INSERT 6 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-18 12:00:00', '2025-02-18 12:00:00', 'Experienced cleaner, available for weekly cleaning.', 'PENDING', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a'),
('2025-02-18 12:30:00', '2025-02-18 12:30:00', 'Thorough and efficient cleaning services.', 'PENDING', '28b456a9-0930-4690-ad53-299a39150e75'),
('2025-02-18 13:00:00', '2025-02-18 13:00:00', 'Flexible hours, can work around your schedule.', 'PENDING', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38'),
('2025-02-18 13:30:00', '2025-02-18 13:30:00', 'Experienced in residential cleaning.', 'PENDING', '955d9de5-2cc7-40c5-8b24-27fc737f12d9'),
('2025-02-18 14:00:00', '2025-02-18 14:00:00', 'Provides own cleaning supplies.', 'PENDING', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12'),
('2025-02-18 14:30:00', '2025-02-18 14:30:00', 'Reliable and trustworthy cleaner.', 'PENDING', 'e7b803f3-61c3-4b40-a66d-922041bbb3db');

-- Insert applicants into junction table for Job 12
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(12, 73), (12, 74), (12, 75), (12, 76), (12, 77), (12, 78);

-- Job Post 13: Domestic Cleaner (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-18 15:00:00', '2025-02-18 15:00:00', 'Experienced domestic cleaner, available for household chores.', 'PENDING', '19dbb644-8669-43a8-9967-5c9beb74bee6'),
('2025-02-18 15:30:00', '2025-02-18 15:30:00', 'Can handle laundry, ironing, and general cleaning.', 'PENDING', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578'),
('2025-02-18 16:00:00', '2025-02-18 16:00:00', 'Flexible availability, can work on weekends.', 'PENDING', 'c79f9012-2fb8-4231-89d5-bc135e857449'),
('2025-02-18 16:30:00', '2025-02-18 16:30:00', 'Detail-oriented and reliable.', 'PENDING', '5c9b860b-114a-4793-8fbc-672037defb88'),
('2025-02-18 17:00:00', '2025-02-18 17:00:00', 'Provides own cleaning products.', 'PENDING', '76f3d814-f5ac-42fe-88cb-ea47c6284c72');

-- Insert applicants into junction table for Job 13
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(13, 79), (13, 80), (13, 81), (13, 82), (13, 83);

-- Job Post 14: Office Cleaner (IN_PROGRESS, max 7)
-- INSERT 7 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-18 17:30:00', '2025-02-18 17:30:00', 'Experienced office cleaner, available for regular cleaning.', 'ACCEPTED', '2d73a822-abad-4776-894e-eb6ea78600d6'),
('2025-02-18 18:00:00', '2025-02-18 18:00:00', 'Can provide references, thorough cleaning guaranteed.', 'ACCEPTED', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07'),
('2025-02-18 18:30:00', '2025-02-18 18:30:00', 'Available weekdays and weekends, flexible hours.', 'ACCEPTED', 'c647cd9e-3757-481d-9423-b7e1136ebaa8'),
('2025-02-18 19:00:00', '2025-02-18 19:00:00', 'Detail-oriented, efficient cleaning services.', 'ACCEPTED', '090e3603-529b-4a6e-bb17-ed95b3e25ddf'),
('2025-02-18 19:30:00', '2025-02-18 19:30:00', 'Experienced in all aspects of office cleaning.', 'ACCEPTED', 'ba866253-3826-49d0-ba8c-187b57157633'),
('2025-02-18 20:00:00', '2025-02-18 20:00:00', 'Own cleaning supplies, ready to start.', 'ACCEPTED', '998aec76-87ca-42bc-9669-4ad096f2b2bc'),
('2025-02-18 20:30:00', '2025-02-18 20:30:00', 'Reliable and trustworthy office cleaner.', 'ACCEPTED', 'f2329eb0-4cba-4674-8822-d55099046642');

-- Insert applicants into junction table for Job 14
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(14, 84), (14, 85), (14, 86), (14, 87), (14, 88), (14, 89), (14, 90);

-- Job Post 15: Housekeeping Assistant (OPEN, max 4)
-- INSERT 4 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-18 21:00:00', '2025-02-18 21:00:00', 'Experienced housekeeping assistant, available for daily chores.', 'PENDING', '5d95a781-aab6-4ba2-87c3-e866034921a3'),
('2025-02-18 21:30:00', '2025-02-18 21:30:00', 'Can handle cleaning, laundry, and errands.', 'PENDING', '029ec727-765b-4618-960e-d7a472fd10ad'),
('2025-02-18 22:00:00', '2025-02-18 22:00:00', 'Flexible availability, can work mornings or afternoons.', 'PENDING', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8'),
('2025-02-18 22:30:00', '2025-02-18 22:30:00', 'Reliable and efficient.', 'PENDING', '426b2c8b-9e01-43ce-ae38-d669fee55504');

-- Insert applicants into junction table for Job 15
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(15, 91), (15, 92), (15, 93), (15, 94);

-- Job Post 16: Deep Cleaning (OPEN, max 6)
-- INSERT 6 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-18 23:00:00', '2025-02-18 23:00:00', 'Experienced in deep cleaning, available for thorough service.', 'PENDING', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7'),
('2025-02-18 23:30:00', '2025-02-18 23:30:00', 'Can handle all aspects of deep cleaning, including appliances.', 'PENDING', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d'),
('2025-02-19 00:00:00', '2025-02-19 00:00:00', 'Flexible hours, can work around your schedule.', 'PENDING', '149644e7-f8dd-4204-9d3b-9b238cff0619'),
('2025-02-19 00:30:00', '2025-02-19 00:30:00', 'Detail-oriented and efficient.', 'PENDING', '3e790d49-d17a-4c7f-a74b-bd0aab21d346'),
('2025-02-19 01:00:00', '2025-02-19 01:00:00', 'Provides own cleaning supplies and equipment.', 'PENDING', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3'),
('2025-02-19 01:30:00', '2025-02-19 01:30:00', 'Reliable and trustworthy deep cleaner.', 'PENDING', '0c405703-5447-4460-a6cb-af102bb27f25');
-- Insert applicants into junction table for Job 16
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(16, 95), (16, 96), (16, 97), (16, 98), (16, 99), (16, 100);

-- Job Post 17: Spring Cleaning (OPEN, max 7)
-- INSERT 7 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-19 02:00:00', '2025-02-19 02:00:00', 'Experienced in spring cleaning, available for comprehensive service.', 'PENDING', 'ab0fd215-410c-4204-add1-06b0fa64d03e'),
('2025-02-19 02:30:00', '2025-02-19 02:30:00', 'Can handle all aspects of spring cleaning, including windows and carpets.', 'PENDING', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c'),
('2025-02-19 03:00:00', '2025-02-19 03:00:00', 'Flexible hours, can work on weekends.', 'PENDING', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d'),
('2025-02-19 03:30:00', '2025-02-19 03:30:00', 'Detail-oriented and efficient spring cleaner.', 'PENDING', '33792185-d7af-4e48-8244-997e2ae1c8c4'),
('2025-02-19 04:00:00', '2025-02-19 04:00:00', 'Provides own cleaning supplies.', 'PENDING', '2223cdf9-ce32-4631-b272-5de4390187f6'),
('2025-02-19 04:30:00', '2025-02-19 04:30:00', 'Reliable and trustworthy.', 'PENDING', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a'),
('2025-02-19 05:00:00', '2025-02-19 05:00:00', 'Available for one-time or recurring spring cleaning.', 'PENDING', '1380b38d-540c-4bfe-bcf6-0024081a8b0f');

-- Insert applicants into junction table for Job 17
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(17, 101), (17, 102), (17, 103), (17, 104), (17, 105), (17, 106), (17, 107);

-- Job Post 18: Home Organizer (COMPLETED, max 5)
-- INSERT 5 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 19:00:00', '2025-02-17 19:00:00', 'Experienced home organizer, can help with decluttering and organizing.', 'ACCEPTED', 'b50517e9-8656-444a-a348-b0f53664e9cf'),
('2025-02-17 19:30:00', '2025-02-17 19:30:00', 'Can provide organizing solutions for any room.', 'ACCEPTED', 'bacb833d-045c-4452-a880-6f607e4a6c05'),
('2025-02-17 20:00:00', '2025-02-17 20:00:00', 'Available for consultations and hands-on organizing.', 'ACCEPTED', '00a04b3b-1800-4ef5-8694-b5bef27be101'),
('2025-02-17 20:30:00', '2025-02-17 20:30:00', 'Detail-oriented and efficient home organizer.', 'ACCEPTED', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0'),
('2025-02-17 21:00:00', '2025-02-17 21:00:00', 'Creates customized organizing systems.', 'ACCEPTED', 'df9a7413-65fb-46c7-99a0-6f5f6243314c');

-- Insert applicants into junction table for Job 18
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(18, 108), (18, 109), (18, 110), (18, 111), (18, 112);

-- Job Post 19: Apartment Cleaner (OPEN, max 6)
-- INSERT 6 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-19 05:30:00', '2025-02-19 05:30:00', 'Experienced apartment cleaner, available for regular cleaning.', 'PENDING', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8'),
('2025-02-19 06:00:00', '2025-02-19 06:00:00', 'Can provide references, thorough cleaning guaranteed.', 'PENDING', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27'),
('2025-02-19 06:30:00', '2025-02-19 06:30:00', 'Available weekdays, flexible hours.', 'PENDING', 'f6f61fd2-0227-4176-af2c-6e358279312f'),
('2025-02-19 07:00:00', '2025-02-19 07:00:00', 'Detail-oriented, efficient cleaning services.', 'PENDING', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14'),
('2025-02-19 07:30:00', '2025-02-19 07:30:00', 'Experienced in cleaning apartments and condos.', 'PENDING', '9b796866-bda9-4102-9c56-bd62e1082f7d'),
('2025-02-19 08:00:00', '2025-02-19 08:00:00', 'Own cleaning supplies, ready to start.', 'PENDING', '3f327cb7-80ae-472f-86e1-085028b32bff');

-- Insert applicants into junction table for Job 19
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(19, 113), (19, 114), (19, 115), (19, 116), (19, 117), (19,118);

-- Job Post 20: Vacation Housekeeper (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 22:30:00', '2025-02-17 22:30:00', 'Experienced vacation housekeeper, familiar with rental property cleaning.', 'ACCEPTED', '290aa2e8-f6d7-4a66-a783-2a54aa109569'),
('2025-02-17 23:00:00', '2025-02-17 23:00:00', 'Can handle quick turnarounds between guests.', 'ACCEPTED', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f'),
('2025-02-17 23:30:00', '2025-02-17 23:30:00', 'Provides own cleaning supplies.', 'ACCEPTED', '2c289845-52e2-4f70-bfa4-7cab86b84dc0'),
('2025-02-18 00:00:00', '2025-02-18 00:00:00', 'Reliable and detail-oriented.', 'ACCEPTED', '0d786962-5188-43db-8b3f-b04adf206bb7');

-- Insert applicants into junction table for Job 20
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(20, 119), (20, 120), (20, 121), (20, 122);













-- Job Post 21: Web Developer (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-19 09:00:00', '2025-02-19 09:00:00', 'Experienced web developer proficient in HTML, CSS, and JavaScript.', 'PENDING', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a'),
('2025-02-19 09:30:00', '2025-02-19 09:30:00', 'Front-end developer with experience in React and Angular.', 'PENDING', '28b456a9-0930-4690-ad53-299a39150e75'),
('2025-02-19 10:00:00', '2025-02-19 10:00:00', 'Full-stack developer with experience in Node.js and Python.', 'PENDING', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38'),
('2025-02-19 10:30:00', '2025-02-19 10:30:00', 'Web developer specializing in e-commerce platforms.', 'PENDING', '955d9de5-2cc7-40c5-8b24-27fc737f12d9'),
('2025-02-19 11:00:00', '2025-02-19 11:00:00', 'Proficient in responsive design and mobile-first development.', 'PENDING', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12');

-- Insert applicants into junction table for Job 21
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(21, 123), (21, 124), (21, 125), (21, 126), (21, 127);

-- Job Post 22: Graphic Designer (OPEN, max 6)
-- INSERT 6 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-19 11:30:00', '2025-02-19 11:30:00', 'Creative graphic designer with experience in branding and marketing materials.', 'PENDING', 'e7b803f3-61c3-4b40-a66d-922041bbb3db'),
('2025-02-19 12:00:00', '2025-02-19 12:00:00', 'Proficient in Adobe Creative Suite (Photoshop, Illustrator, InDesign).', 'PENDING', '19dbb644-8669-43a8-9967-5c9beb74bee6'),
('2025-02-19 12:30:00', '2025-02-19 12:30:00', 'Experience in designing for both print and digital media.', 'PENDING', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578'),
('2025-02-19 13:00:00', '2025-02-19 13:00:00', 'Strong portfolio showcasing a variety of design projects.', 'PENDING', 'c79f9012-2fb8-4231-89d5-bc135e857449'),
('2025-02-19 13:30:00', '2025-02-19 13:30:00', 'Ability to work independently and as part of a team.', 'PENDING', '5c9b860b-114a-4793-8fbc-672037defb88'),
('2025-02-19 14:00:00', '2025-02-19 14:00:00', 'Excellent communication and presentation skills.', 'PENDING', '76f3d814-f5ac-42fe-88cb-ea47c6284c72');

-- Insert applicants into junction table for Job 22
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(22, 128), (22, 129), (22, 130), (22, 131), (22, 132), (22, 133);

-- Job Post 23: Software Engineer (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 11:00:00', '2025-02-14 11:00:00', 'Experienced software engineer specializing in backend development.', 'ACCEPTED', '2d73a822-abad-4776-894e-eb6ea78600d6'),
('2025-02-14 11:30:00', '2025-02-14 11:30:00', 'Proficient in Java, Python, and SQL.', 'ACCEPTED', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07'),
('2025-02-14 12:00:00', '2025-02-14 12:00:00', 'Experience with cloud platforms (AWS, Azure, GCP).', 'ACCEPTED', 'c647cd9e-3757-481d-9423-b7e1136ebaa8'),
('2025-02-14 12:30:00', '2025-02-14 12:30:00', 'Strong understanding of data structures and algorithms.', 'ACCEPTED', '090e3603-529b-4a6e-bb17-ed95b3e25ddf');

-- Insert applicants into junction table for Job 23
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(23, 134), (23, 135), (23, 136), (23, 137);

-- Job Post 24: Content Writer (COMPLETED, max 8)
-- INSERT 8 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 12:00:00', '2025-02-14 12:00:00', 'Experienced content writer specializing in blog posts and articles.', 'ACCEPTED', 'ba866253-3826-49d0-ba8c-187b57157633'),
('2025-02-14 12:15:00', '2025-02-14 12:15:00', 'Strong understanding of SEO principles and best practices.', 'ACCEPTED', '998aec76-87ca-42bc-9669-4ad096f2b2bc'),
('2025-02-14 12:30:00', '2025-02-14 12:30:00', 'Excellent grammar, spelling, and punctuation skills.', 'ACCEPTED', 'f2329eb0-4cba-4674-8822-d55099046642'),
('2025-02-14 12:45:00', '2025-02-14 12:45:00', 'Ability to write in a variety of styles and tones.', 'ACCEPTED', '5d95a781-aab6-4ba2-87c3-e866034921a3'),
('2025-02-14 13:00:00', '2025-02-14 13:00:00', 'Experience writing for a variety of industries.', 'ACCEPTED', '029ec727-765b-4618-960e-d7a472fd10ad'),
('2025-02-14 13:15:00', '2025-02-14 13:15:00', 'Ability to meet deadlines and work under pressure.', 'ACCEPTED', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8'),
('2025-02-14 13:30:00', '2025-02-14 13:30:00', 'Creative and engaging writing style.', 'ACCEPTED', '426b2c8b-9e01-43ce-ae38-d669fee55504'),
('2025-02-14 13:45:00', '2025-02-14 13:45:00', 'Portfolio of published work available upon request.', 'ACCEPTED', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7');

-- Insert applicants into junction table for Job 24
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(24, 138), (24, 139), (24, 140), (24, 141), (24, 142), (24, 143), (24, 144), (24, 145);

-- Job Post 25: Data Scientist (OPEN, max 7)
-- INSERT 7 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-19 14:30:00', '2025-02-19 14:30:00', 'Experienced data scientist with a strong background in machine learning.', 'PENDING', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d'),
('2025-02-19 15:00:00', '2025-02-19 15:00:00', 'Proficient in Python and R, with experience in data analysis and modeling.', 'PENDING', '149644e7-f8dd-4204-9d3b-9b238cff0619'),
('2025-02-19 15:30:00', '2025-02-19 15:30:00', 'Experience with big data technologies (Hadoop, Spark).', 'PENDING', '3e790d49-d17a-4c7f-a74b-bd0aab21d346'),
('2025-02-19 16:00:00', '2025-02-19 16:00:00', 'Strong understanding of statistical concepts and techniques.', 'PENDING', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3'),
('2025-02-19 16:30:00', '2025-02-19 16:30:00', 'Ability to communicate complex data insights to non-technical audiences.', 'PENDING', '0c405703-5447-4460-a6cb-af102bb27f25'),
('2025-02-19 17:00:00', '2025-02-19 17:00:00', 'Experience with data visualization tools (Tableau, Power BI).', 'PENDING', 'ab0fd215-410c-4204-add1-06b0fa64d03e'),
('2025-02-19 17:30:00', '2025-02-19 17:30:00', 'PhD or Master''s degree in a quantitative field (Statistics, Mathematics, Computer Science).', 'PENDING', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c');

-- Insert applicants into junction table for Job 25
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(25, 146), (25, 147), (25, 148), (25, 149), (25, 150), (25, 151), (25, 152);

-- Job Post 26: Backend Developer (IN_PROGRESS, max 6)
-- INSERT 6 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 14:00:00', '2025-02-14 14:00:00', 'Experienced backend developer proficient in Java and Spring Boot.', 'ACCEPTED', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d'),
('2025-02-14 14:30:00', '2025-02-14 14:30:00', 'Experience with RESTful APIs and microservices architecture.', 'ACCEPTED', '33792185-d7af-4e48-8244-997e2ae1c8c4'),
('2025-02-14 15:00:00', '2025-02-14 15:00:00', 'Strong understanding of database design and SQL.', 'ACCEPTED', '2223cdf9-ce32-4631-b272-5de4390187f6'),
('2025-02-14 15:30:00', '2025-02-14 15:30:00', 'Experience with testing frameworks (JUnit, Mockito).', 'ACCEPTED', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a'),
('2025-02-14 16:00:00', '2025-02-14 16:00:00', 'Familiar with DevOps practices and CI/CD pipelines.', 'ACCEPTED', '1380b38d-540c-4bfe-bcf6-0024081a8b0f'),
('2025-02-14 16:30:00', '2025-02-14 16:30:00', 'Experience with containerization technologies (Docker, Kubernetes).', 'ACCEPTED', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8');

-- Insert applicants into junction table for Job 26
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(26, 153), (26, 154), (26, 155), (26, 156), (26, 157), (26, 158);

-- Job Post 27: Database Administrator (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-19 18:00:00', '2025-02-19 18:00:00', 'Experienced database administrator with expertise in MySQL.', 'PENDING', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27'),
('2025-02-19 18:30:00', '2025-02-19 18:30:00', 'Proficient in database performance tuning and optimization.', 'PENDING', 'f6f61fd2-0227-4176-af2c-6e358279312f'),
('2025-02-19 19:00:00', '2025-02-19 19:00:00', 'Experience with database backup and recovery procedures.', 'PENDING', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14'),
('2025-02-19 19:30:00', '2025-02-19 19:30:00', 'Strong understanding of database security best practices.', 'PENDING', '9b796866-bda9-4102-9c56-bd62e1082f7d'),
('2025-02-19 20:00:00', '2025-02-19 20:00:00', 'Experience with database replication and clustering.', 'PENDING', '3f327cb7-80ae-472f-86e1-085028b32bff');

-- Insert applicants into junction table for Job 27
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(27, 159), (27, 160), (27, 161), (27, 162), (27, 163);

-- Job Post 28: Project Manager (OPEN, max 4)
-- INSERT 4 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-19 20:30:00', '2025-02-19 20:30:00', 'Experienced project manager with a track record of successful project delivery.', 'PENDING', 'b50517e9-8656-444a-a348-b0f53664e9cf'),
('2025-02-19 21:00:00', '2025-02-19 21:00:00', 'Strong understanding of project management methodologies (Agile, Waterfall).', 'PENDING', 'bacb833d-045c-4452-a880-6f607e4a6c05'),
('2025-02-19 21:30:00', '2025-02-19 21:30:00', 'Excellent communication, leadership, and problem-solving skills.', 'PENDING', '00a04b3b-1800-4ef5-8694-b5bef27be101'),
('2025-02-19 22:00:00', '2025-02-19 22:00:00', 'Experience with project management tools (Jira, Asana, Trello).', 'PENDING', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0');

-- Insert applicants into junction table for Job 28
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(28, 164), (28, 165), (28, 166), (28, 167);

-- Job Post 29: SEO Specialist (COMPLETED, max 7)
-- INSERT 7 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 16:30:00', '2025-02-14 16:30:00', 'Experienced SEO specialist with a proven track record of improving website rankings.', 'ACCEPTED', 'df9a7413-65fb-46c7-99a0-6f5f6243314c'),
('2025-02-14 16:45:00', '2025-02-14 16:45:00', 'Strong understanding of on-page and off-page optimization techniques.', 'ACCEPTED', '290aa2e8-f6d7-4a66-a783-2a54aa109569'),
('2025-02-14 17:00:00', '2025-02-14 17:00:00', 'Proficient in using SEO tools (Google Analytics, Search Console, SEMrush).', 'ACCEPTED', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f'),
('2025-02-14 17:15:00', '2025-02-14 17:15:00', 'Experience with keyword research, link building, and content marketing.', 'ACCEPTED', '2c289845-52e2-4f70-bfa4-7cab86b84dc0'),
('2025-02-14 17:30:00', '2025-02-14 17:30:00', 'Knowledge of technical SEO (schema markup, site speed optimization).', 'ACCEPTED', '0d786962-5188-43db-8b3f-b04adf206bb7'),
('2025-02-14 17:45:00', '2025-02-14 17:45:00', 'Ability to analyze data and provide actionable insights.', 'ACCEPTED', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a'),
('2025-02-14 18:00:00', '2025-02-14 18:00:00', 'Excellent communication and reporting skills.', 'ACCEPTED', '28b456a9-0930-4690-ad53-299a39150e75');

-- Insert applicants into junction table for Job 29
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(29, 168), (29, 169), (29, 170), (29, 171), (29, 172), (29, 173), (29, 174);

-- Job Post 30: IT Support Specialist (IN_PROGRESS, max 8)
-- INSERT 8 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 17:00:00', '2025-02-14 17:00:00', 'Experienced IT support specialist with a strong customer service focus.', 'ACCEPTED', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38'),
('2025-02-14 17:15:00', '2025-02-14 17:15:00', 'Proficient in troubleshooting hardware and software issues.', 'ACCEPTED', '955d9de5-2cc7-40c5-8b24-27fc737f12d9'),
('2025-02-14 17:30:00', '2025-02-14 17:30:00', 'Experience with Windows and macOS operating systems.', 'ACCEPTED', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12'),
('2025-02-14 17:45:00', '2025-02-14 17:45:00', 'Knowledge of networking concepts (TCP/IP, DNS, DHCP).', 'ACCEPTED', 'e7b803f3-61c3-4b40-a66d-922041bbb3db'),
('2025-02-14 18:00:00', '2025-02-14 18:00:00', 'Experience with ticketing systems and remote support tools.', 'ACCEPTED', '19dbb644-8669-43a8-9967-5c9beb74bee6'),
('2025-02-14 18:15:00', '2025-02-14 18:15:00', 'Ability to diagnose and resolve technical problems efficiently.', 'ACCEPTED', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578'),
('2025-02-14 18:30:00', '2025-02-14 18:30:00', 'Excellent communication and interpersonal skills.', 'ACCEPTED', 'c79f9012-2fb8-4231-89d5-bc135e857449'),
('2025-02-14 18:45:00', '2025-02-14 18:45:00', 'Ability to work independently and as part of a team.', 'ACCEPTED', '5c9b860b-114a-4793-8fbc-672037defb88');

-- Insert applicants into junction table for Job 30
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(30, 175), (30, 176), (30, 177), (30, 178), (30, 179), (30, 180), (30, 181), (30, 182);














-- Job Post 31: Photographer (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 09:00:00', '2025-02-20 09:00:00', 'Experienced event photographer specializing in candid shots.', 'PENDING', '76f3d814-f5ac-42fe-88cb-ea47c6284c72'),
('2025-02-20 09:30:00', '2025-02-20 09:30:00', 'Professional photographer with a portfolio of diverse events.', 'PENDING', '2d73a822-abad-4776-894e-eb6ea78600d6'),
('2025-02-20 10:00:00', '2025-02-20 10:00:00', 'Available for photography services, including editing and retouching.', 'PENDING', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07'),
('2025-02-20 10:30:00', '2025-02-20 10:30:00', 'Skilled in capturing high-quality images in various lighting conditions.', 'PENDING', 'c647cd9e-3757-481d-9423-b7e1136ebaa8'),
('2025-02-20 11:00:00', '2025-02-20 11:00:00', 'Provides own professional photography equipment.', 'PENDING', '090e3603-529b-4a6e-bb17-ed95b3e25ddf');

-- Insert applicants into junction table for Job 31
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(31, 183), (31, 184), (31, 185), (31, 186), (31, 187);

-- Job Post 32: Event Coordinator (OPEN, max 6)
-- INSERT 6 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 11:30:00', '2025-02-20 11:30:00', 'Experienced event coordinator with a proven track record.', 'PENDING', 'ba866253-3826-49d0-ba8c-187b57157633'),
('2025-02-20 12:00:00', '2025-02-20 12:00:00', 'Detail-oriented and organized, with excellent communication skills.', 'PENDING', '998aec76-87ca-42bc-9669-4ad096f2b2bc'),
('2025-02-20 12:30:00', '2025-02-20 12:30:00', 'Able to manage budgets, vendors, and timelines effectively.', 'PENDING', 'f2329eb0-4cba-4674-8822-d55099046642'),
('2025-02-20 13:00:00', '2025-02-20 13:00:00', 'Creative problem-solver with a passion for events.', 'PENDING', '5d95a781-aab6-4ba2-87c3-e866034921a3'),
('2025-02-20 13:30:00', '2025-02-20 13:30:00', 'Experience in planning and executing a variety of events.', 'PENDING', '029ec727-765b-4618-960e-d7a472fd10ad'),
('2025-02-20 14:00:00', '2025-02-20 14:00:00', 'Proficient in event management software and tools.', 'PENDING', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8');

-- Insert applicants into junction table for Job 32
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(32, 188), (32, 189), (32, 190), (32, 191), (32, 192), (32, 193);

-- Job Post 33: Massage Therapist (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-15 11:00:00', '2025-02-15 11:00:00', 'Licensed massage therapist specializing in deep tissue and Swedish massage.', 'ACCEPTED', '426b2c8b-9e01-43ce-ae38-d669fee55504'),
('2025-02-15 11:30:00', '2025-02-15 11:30:00', 'Experienced in providing therapeutic massage for pain relief and relaxation.', 'ACCEPTED', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7'),
('2025-02-15 12:00:00', '2025-02-15 12:00:00', 'Available for home visits, providing a comfortable and relaxing experience.', 'ACCEPTED', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d'),
('2025-02-15 12:30:00', '2025-02-15 12:30:00', 'Certified in various massage techniques, including sports massage and prenatal massage.', 'ACCEPTED', '149644e7-f8dd-4204-9d3b-9b238cff0619');

-- Insert applicants into junction table for Job 33
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(33, 194), (33, 195), (33, 196), (33, 197);

-- Job Post 34: Personal Trainer (COMPLETED, max 7)
-- INSERT 7 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-15 12:00:00', '2025-02-15 12:00:00', 'Certified personal trainer with experience in strength training and weight loss.', 'ACCEPTED', '3e790d49-d17a-4c7f-a74b-bd0aab21d346'),
('2025-02-15 12:15:00', '2025-02-15 12:15:00', 'Develops personalized fitness plans based on individual goals and needs.', 'ACCEPTED', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3'),
('2025-02-15 12:30:00', '2025-02-15 12:30:00', 'Motivating and supportive, helping clients achieve their fitness goals.', 'ACCEPTED', '0c405703-5447-4460-a6cb-af102bb27f25'),
('2025-02-15 12:45:00', '2025-02-15 12:45:00', 'Knowledgeable in nutrition and healthy lifestyle habits.', 'ACCEPTED', 'ab0fd215-410c-4204-add1-06b0fa64d03e'),
('2025-02-15 13:00:00', '2025-02-15 13:00:00', 'Available for one-on-one sessions and group training.', 'ACCEPTED', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c'),
('2025-02-15 13:15:00', '2025-02-15 13:15:00', 'Experience with clients of all ages and fitness levels.', 'ACCEPTED', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d'),
('2025-02-15 13:30:00', '2025-02-15 13:30:00', 'CPR and First Aid certified.', 'ACCEPTED', '33792185-d7af-4e48-8244-997e2ae1c8c4');

-- Insert applicants into junction table for Job 34
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(34, 198), (34, 199), (34, 200), (34, 201), (34, 202), (34, 203), (34, 204);

-- Job Post 35: Cook/Chef (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 14:30:00', '2025-02-20 14:30:00', 'Experienced chef specializing in Italian cuisine.', 'PENDING', '2223cdf9-ce32-4631-b272-5de4390187f6'),
('2025-02-20 15:00:00', '2025-02-20 15:00:00', 'Culinary school graduate with a passion for creating delicious meals.', 'PENDING', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a'),
('2025-02-20 15:30:00', '2025-02-20 15:30:00', 'Able to prepare meals for individuals and small groups.', 'PENDING', '1380b38d-540c-4bfe-bcf6-0024081a8b0f'),
('2025-02-20 16:00:00', '2025-02-20 16:00:00', 'Knowledgeable in food safety and hygiene practices.', 'PENDING', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8'),
('2025-02-20 16:30:00', '2025-02-20 16:30:00', 'Creative and adaptable, with experience in various cuisines.', 'PENDING', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27');

-- Insert applicants into junction table for Job 35
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(35, 205), (35, 206), (35, 207), (35, 208), (35, 209);



-- Job Post 36: HR Specialist (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 17:00:00', '2025-02-20 17:00:00', 'Experienced HR specialist with a focus on talent acquisition.', 'PENDING', 'f6f61fd2-0227-4176-af2c-6e358279312f'),
('2025-02-20 17:30:00', '2025-02-20 17:30:00', 'Proficient in sourcing, screening, and interviewing candidates.', 'PENDING', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14'),
('2025-02-20 18:00:00', '2025-02-20 18:00:00', 'Knowledgeable in employment law and HR best practices.', 'PENDING', '9b796866-bda9-4102-9c56-bd62e1082f7d'),
('2025-02-20 18:30:00', '2025-02-20 18:30:00', 'Excellent communication and interpersonal skills.', 'PENDING', '3f327cb7-80ae-472f-86e1-085028b32bff'),
('2025-02-20 19:00:00', '2025-02-20 19:00:00', 'Experience with applicant tracking systems (ATS).', 'PENDING', 'b50517e9-8656-444a-a348-b0f53664e9cf');

-- Insert applicants into junction table for Job 36
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(36, 210), (36, 211), (36, 212), (36, 213), (36, 214);

-- Job Post 37: Carpenter (IN_PROGRESS, max 6)
-- INSERT 6 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-15 15:30:00', '2025-02-15 15:30:00', 'Skilled carpenter with experience in home repairs and renovations.', 'ACCEPTED', 'bacb833d-045c-4452-a880-6f607e4a6c05'),
('2025-02-15 15:45:00', '2025-02-15 15:45:00', 'Proficient in woodworking, framing, and finishing.', 'ACCEPTED', '00a04b3b-1800-4ef5-8694-b5bef27be101'),
('2025-02-15 16:00:00', '2025-02-15 16:00:00', 'Able to read blueprints and follow specifications.', 'ACCEPTED', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0'),
('2025-02-15 16:15:00', '2025-02-15 16:15:00', 'Provides own tools and equipment.', 'ACCEPTED', 'df9a7413-65fb-46c7-99a0-6f5f6243314c'),
('2025-02-15 16:30:00', '2025-02-15 16:30:00', 'Detail-oriented and committed to quality workmanship.', 'ACCEPTED', '290aa2e8-f6d7-4a66-a783-2a54aa109569'),
('2025-02-15 16:45:00', '2025-02-15 16:45:00', 'Reliable and punctual, with excellent time management skills.', 'ACCEPTED', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f');

-- Insert applicants into junction table for Job 37
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(37, 215), (37, 216), (37, 217), (37, 218), (37, 219), (37, 220);

-- Job Post 38: Plumber (COMPLETED, max 8)
-- INSERT 8 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-15 16:00:00', '2025-02-15 16:00:00', 'Licensed plumber with experience in pipe installations and repairs.', 'ACCEPTED', '2c289845-52e2-4f70-bfa4-7cab86b84dc0'),
('2025-02-15 16:10:00', '2025-02-15 16:10:00', 'Proficient in diagnosing and fixing plumbing problems.', 'ACCEPTED', '0d786962-5188-43db-8b3f-b04adf206bb7'),
('2025-02-15 16:20:00', '2025-02-15 16:20:00', 'Knowledgeable in plumbing codes and regulations.', 'ACCEPTED', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a'),
('2025-02-15 16:30:00', '2025-02-15 16:30:00', 'Provides own tools and equipment.', 'ACCEPTED', '28b456a9-0930-4690-ad53-299a39150e75'),
('2025-02-15 16:40:00', '2025-02-15 16:40:00', 'Available for emergency plumbing services.', 'ACCEPTED', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38'),
('2025-02-15 16:50:00', '2025-02-15 16:50:00', 'Excellent customer service and communication skills.', 'ACCEPTED', '955d9de5-2cc7-40c5-8b24-27fc737f12d9'),
('2025-02-15 17:00:00', '2025-02-15 17:00:00', 'Experience with both residential and commercial plumbing.', 'ACCEPTED', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12'),
('2025-02-15 17:10:00', '2025-02-15 17:10:00', 'Committed to providing high-quality workmanship.', 'ACCEPTED', 'e7b803f3-61c3-4b40-a66d-922041bbb3db');

-- Insert applicants into junction table for Job 38
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(38, 221), (38, 222), (38, 223), (38, 224), (38, 225), (38, 226), (38, 227), (38, 228);

-- Job Post 39: Electrician (IN_PROGRESS, max 7)
-- INSERT 7 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-15 17:00:00', '2025-02-15 17:00:00', 'Licensed electrician with experience in residential and commercial electrical work.', 'ACCEPTED', '19dbb644-8669-43a8-9967-5c9beb74bee6'),
('2025-02-15 17:15:00', '2025-02-15 17:15:00', 'Proficient in troubleshooting electrical issues and performing repairs.', 'ACCEPTED', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578'),
('2025-02-15 17:30:00', '2025-02-15 17:30:00', 'Knowledgeable in electrical codes and safety regulations.', 'ACCEPTED', 'c79f9012-2fb8-4231-89d5-bc135e857449'),
('2025-02-15 17:45:00', '2025-02-15 17:45:00', 'Provides own tools and equipment.', 'ACCEPTED', '5c9b860b-114a-4793-8fbc-672037defb88'),
('2025-02-15 18:00:00', '2025-02-15 18:00:00', 'Available for emergency electrical services.', 'ACCEPTED', '76f3d814-f5ac-42fe-88cb-ea47c6284c72'),
('2025-02-15 18:15:00', '2025-02-15 18:15:00', 'Excellent problem-solving and diagnostic skills.', 'ACCEPTED', '2d73a822-abad-4776-894e-eb6ea78600d6'),
('2025-02-15 18:30:00', '2025-02-15 18:30:00', 'Committed to providing safe and reliable electrical services.', 'ACCEPTED', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07');

-- Insert applicants into junction table for Job 39
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(39, 229), (39, 230), (39, 231), (39, 232), (39, 233), (39, 234), (39, 235);

-- Job Post 40: Painter (OPEN, max 6)
-- INSERT 6 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 19:30:00', '2025-02-20 19:30:00', 'Experienced painter specializing in interior and exterior painting.', 'PENDING', 'c647cd9e-3757-481d-9423-b7e1136ebaa8'),
('2025-02-20 20:00:00', '2025-02-20 20:00:00', 'Proficient in surface preparation, priming, and painting techniques.', 'PENDING', '090e3603-529b-4a6e-bb17-ed95b3e25ddf'),
('2025-02-20 20:30:00', '2025-02-20 20:30:00', 'Detail-oriented and committed to providing a clean and professional finish.', 'PENDING', 'ba866253-3826-49d0-ba8c-187b57157633'),
('2025-02-20 21:00:00', '2025-02-20 21:00:00', 'Provides own painting supplies and equipment.', 'PENDING', '998aec76-87ca-42bc-9669-4ad096f2b2bc'),
('2025-02-20 21:30:00', '2025-02-20 21:30:00', 'Able to work independently and as part of a team.', 'PENDING', 'f2329eb0-4cba-4674-8822-d55099046642'),
('2025-02-20 22:00:00', '2025-02-20 22:00:00', 'Reliable and punctual, with excellent time management skills.', 'PENDING', '5d95a781-aab6-4ba2-87c3-e866034921a3');

-- Insert applicants into junction table for Job 40
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(40, 236), (40, 237), (40, 238), (40, 239), (40, 240), (40, 241);











-- Job Post 41: Receptionist (OPEN, max 4)
-- INSERT 4 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-21 09:00:00', '2025-02-21 09:00:00', 'Experienced receptionist with excellent communication and organizational skills.', 'PENDING', '029ec727-765b-4618-960e-d7a472fd10ad'),
('2025-02-21 09:30:00', '2025-02-21 09:30:00', 'Proficient in Microsoft Office Suite and scheduling software.', 'PENDING', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8'),
('2025-02-21 10:00:00', '2025-02-21 10:00:00', 'Friendly and professional demeanor, with experience handling customer inquiries.', 'PENDING', '426b2c8b-9e01-43ce-ae38-d669fee55504'),
('2025-02-21 10:30:00', '2025-02-21 10:30:00', 'Able to multitask and manage a busy front desk environment.', 'PENDING', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7');

-- Insert applicants into junction table for Job 41
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(41, 242), (41, 243), (41, 244), (41, 245);

-- Job Post 42: Driver (IN_PROGRESS, max 6)
-- INSERT 6 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-15 10:30:00', '2025-02-15 10:30:00', 'Experienced driver with a clean driving record.', 'ACCEPTED', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d'),
('2025-02-15 10:45:00', '2025-02-15 10:45:00', 'Familiar with navigating Dublin and surrounding areas.', 'ACCEPTED', '149644e7-f8dd-4204-9d3b-9b238cff0619'),
('2025-02-15 11:00:00', '2025-02-15 11:00:00', 'Available for flexible hours, including evenings and weekends.', 'ACCEPTED', '3e790d49-d17a-4c7f-a74b-bd0aab21d346'),
('2025-02-15 11:15:00', '2025-02-15 11:15:00', 'Possesses a valid driver''s license and necessary endorsements.', 'ACCEPTED', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3'),
('2025-02-15 11:30:00', '2025-02-15 11:30:00', 'Reliable and punctual, with excellent time management skills.', 'ACCEPTED', '0c405703-5447-4460-a6cb-af102bb27f25'),
('2025-02-15 11:45:00', '2025-02-15 11:45:00', 'Good communication and customer service skills.', 'ACCEPTED', 'ab0fd215-410c-4204-add1-06b0fa64d03e');

-- Insert applicants into junction table for Job 42
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(42, 246), (42, 247), (42, 248), (42, 249), (42, 250), (42, 251);

-- Job Post 43: Security Guard (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-21 11:00:00', '2025-02-21 11:00:00', 'Experienced security guard with a valid security license.', 'PENDING', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c'),
('2025-02-21 11:30:00', '2025-02-21 11:30:00', 'Physically fit and able to stand for extended periods.', 'PENDING', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d'),
('2025-02-21 12:00:00', '2025-02-21 12:00:00', 'Observant and detail-oriented, with excellent surveillance skills.', 'PENDING', '33792185-d7af-4e48-8244-997e2ae1c8c4'),
('2025-02-21 12:30:00', '2025-02-21 12:30:00', 'Able to handle emergency situations calmly and effectively.', 'PENDING', '2223cdf9-ce32-4631-b272-5de4390187f6'),
('2025-02-21 13:00:00', '2025-02-21 13:00:00', 'Good communication and interpersonal skills.', 'PENDING', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a');

-- Insert applicants into junction table for Job 43
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(43, 252), (43, 253), (43, 254), (43, 255), (43, 256);

-- Job Post 44: Barista (COMPLETED, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-15 12:00:00', '2025-02-15 12:00:00', 'Experienced barista with excellent coffee-making skills.', 'ACCEPTED', '1380b38d-540c-4bfe-bcf6-0024081a8b0f'),
('2025-02-15 12:15:00', '2025-02-15 12:15:00', 'Knowledgeable in various coffee brewing methods and latte art.', 'ACCEPTED', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8'),
('2025-02-15 12:30:00', '2025-02-15 12:30:00', 'Friendly and customer-oriented, with a passion for coffee.', 'ACCEPTED', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27'),
('2025-02-15 12:45:00', '2025-02-15 12:45:00', 'Able to work in a fast-paced environment and handle cash transactions.', 'ACCEPTED', 'f6f61fd2-0227-4176-af2c-6e358279312f');

-- Insert applicants into junction table for Job 44
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(44, 257), (44, 258), (44, 259), (44, 260);

-- Job Post 45: Retail Assistant (IN_PROGRESS, max 7)
-- INSERT 7 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-15 13:00:00', '2025-02-15 13:00:00', 'Experienced retail assistant with excellent customer service skills.', 'ACCEPTED', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14'),
('2025-02-15 13:15:00', '2025-02-15 13:15:00', 'Knowledgeable in sales techniques and product merchandising.', 'ACCEPTED', '9b796866-bda9-4102-9c56-bd62e1082f7d'),
('2025-02-15 13:30:00', '2025-02-15 13:30:00', 'Able to handle cash transactions and operate POS systems.', 'ACCEPTED', '3f327cb7-80ae-472f-86e1-085028b32bff'),
('2025-02-15 13:45:00', '2025-02-15 13:45:00', 'Friendly and approachable, with a positive attitude.', 'ACCEPTED', 'b50517e9-8656-444a-a348-b0f53664e9cf'),
('2025-02-15 14:00:00', '2025-02-15 14:00:00', 'Able to work in a team environment and assist customers with their needs.', 'ACCEPTED', 'bacb833d-045c-4452-a880-6f607e4a6c05'),
('2025-02-15 14:15:00', '2025-02-15 14:15:00', 'Experience with inventory management and stock replenishment.', 'ACCEPTED', '00a04b3b-1800-4ef5-8694-b5bef27be101'),
('2025-02-15 14:30:00', '2025-02-15 14:30:00', 'Available for flexible hours, including evenings and weekends.', 'ACCEPTED', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0');

-- Insert applicants into junction table for Job 45
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(45, 261), (45, 262), (45, 263), (45, 264), (45, 265), (45, 266), (45, 267);


-- Job Post 46: Waiter (OPEN, max 6)
-- INSERT 6 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-21 14:00:00', '2025-02-21 14:00:00', 'Experienced waiter with excellent customer service skills.', 'PENDING', 'df9a7413-65fb-46c7-99a0-6f5f6243314c'),
('2025-02-21 14:30:00', '2025-02-21 14:30:00', 'Knowledgeable in food and beverage service.', 'PENDING', '290aa2e8-f6d7-4a66-a783-2a54aa109569'),
('2025-02-21 15:00:00', '2025-02-21 15:00:00', 'Able to work in a fast-paced environment and handle multiple tables.', 'PENDING', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f'),
('2025-02-21 15:30:00', '2025-02-21 15:30:00', 'Friendly and professional demeanor.', 'PENDING', '2c289845-52e2-4f70-bfa4-7cab86b84dc0'),
('2025-02-21 16:00:00', '2025-02-21 16:00:00', 'Experience with POS systems and cash handling.', 'PENDING', '0d786962-5188-43db-8b3f-b04adf206bb7'),
('2025-02-21 16:30:00', '2025-02-21 16:30:00', 'Available for flexible hours, including evenings and weekends.', 'PENDING', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a');

-- Insert applicants into junction table for Job 46
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(46, 268), (46, 269), (46, 270), (46, 271), (46, 272), (46, 273);

-- Job Post 47: Chef (IN_PROGRESS, max 5)
-- INSERT 5 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-15 15:30:00', '2025-02-15 15:30:00', 'Experienced chef specializing in [Cuisine Type - e.g., Italian, French, etc.].', 'ACCEPTED', '28b456a9-0930-4690-ad53-299a39150e75'),
('2025-02-15 15:45:00', '2025-02-15 15:45:00', 'Culinary school graduate with a passion for creating delicious meals.', 'ACCEPTED', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38'),
('2025-02-15 16:00:00', '2025-02-15 16:00:00', 'Able to manage a kitchen and lead a team effectively.', 'ACCEPTED', '955d9de5-2cc7-40c5-8b24-27fc737f12d9'),
('2025-02-15 16:15:00', '2025-02-15 16:15:00', 'Knowledgeable in food safety and hygiene practices.', 'ACCEPTED', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12'),
('2025-02-15 16:30:00', '2025-02-15 16:30:00', 'Creative and adaptable, with experience in menu planning and development.', 'ACCEPTED', 'e7b803f3-61c3-4b40-a66d-922041bbb3db');

-- Insert applicants into junction table for Job 47
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(47, 274), (47, 275), (47, 276), (47, 277), (47, 278);

-- Job Post 48: Cleaner (COMPLETED, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-15 16:00:00', '2025-02-15 16:00:00', 'Experienced cleaner with attention to detail.', 'ACCEPTED', '19dbb644-8669-43a8-9967-5c9beb74bee6'),
('2025-02-15 16:15:00', '2025-02-15 16:15:00', 'Proficient in cleaning and sanitizing various surfaces.', 'ACCEPTED', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578'),
('2025-02-15 16:30:00', '2025-02-15 16:30:00', 'Able to work independently and efficiently.', 'ACCEPTED', 'c79f9012-2fb8-4231-89d5-bc135e857449'),
('2025-02-15 16:45:00', '2025-02-15 16:45:00', 'Reliable and trustworthy, with a strong work ethic.', 'ACCEPTED', '5c9b860b-114a-4793-8fbc-672037defb88');

-- Insert applicants into junction table for Job 48
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(48, 279), (48, 280), (48, 281), (48, 282);

-- Job Post 49: Cook (IN_PROGRESS, max 6)
-- INSERT 6 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-15 17:00:00', '2025-02-15 17:00:00', 'Experienced cook specializing in [Cuisine Type - e.g., American, Asian, etc.].', 'ACCEPTED', '76f3d814-f5ac-42fe-88cb-ea47c6284c72'),
('2025-02-15 17:15:00', '2025-02-15 17:15:00', 'Able to prepare a variety of dishes quickly and efficiently.', 'ACCEPTED', '2d73a822-abad-4776-894e-eb6ea78600d6'),
('2025-02-15 17:30:00', '2025-02-15 17:30:00', 'Knowledgeable in food safety and sanitation practices.', 'ACCEPTED', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07'),
('2025-02-15 17:45:00', '2025-02-15 17:45:00', 'Team player with good communication skills.', 'ACCEPTED', 'c647cd9e-3757-481d-9423-b7e1136ebaa8'),
('2025-02-15 18:00:00', '2025-02-15 18:00:00', 'Experience with inventory management and ordering supplies.', 'ACCEPTED', '090e3603-529b-4a6e-bb17-ed95b3e25ddf'),
('2025-02-15 18:15:00', '2025-02-15 18:15:00', 'Adaptable and able to work under pressure.', 'ACCEPTED', 'ba866253-3826-49d0-ba8c-187b57157633');

-- Insert applicants into junction table for Job 49
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(49, 283), (49, 284), (49, 285), (49, 286), (49, 287), (49, 288);

-- Job Post 50: Bartender (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-21 18:00:00', '2025-02-21 18:00:00', 'Experienced bartender with excellent customer service skills.', 'PENDING', '998aec76-87ca-42bc-9669-4ad096f2b2bc'),
('2025-02-21 18:30:00', '2025-02-21 18:30:00', 'Knowledgeable in mixing a variety of cocktails and drinks.', 'PENDING', 'f2329eb0-4cba-4674-8822-d55099046642'),
('2025-02-21 19:00:00', '2025-02-21 19:00:00', 'Able to work in a fast-paced environment and handle cash transactions.', 'PENDING', '5d95a781-aab6-4ba2-87c3-e866034921a3'),
('2025-02-21 19:30:00', '2025-02-21 19:30:00', 'Friendly and outgoing personality, with a passion for bartending.', 'PENDING', '029ec727-765b-4618-960e-d7a472fd10ad'),
('2025-02-21 20:00:00', '2025-02-21 20:00:00', 'Available for flexible hours, including evenings and weekends.', 'PENDING', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8');

-- Insert applicants into junction table for Job 50
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(50, 289), (50, 290), (50, 291), (50, 292), (50, 293);





















-- Job Post 51: Lawn Care (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-21 19:30:00', '2025-02-21 19:30:00', 'Experienced in lawn mowing, trimming, and edging.', 'PENDING', '426b2c8b-9e01-43ce-ae38-d669fee55504'),
('2025-02-21 20:00:00', '2025-02-21 20:00:00', 'Provides own lawn care equipment.', 'PENDING', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7'),
('2025-02-21 20:30:00', '2025-02-21 20:30:00', 'Available for regular lawn maintenance.', 'PENDING', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d'),
('2025-02-21 21:00:00', '2025-02-21 21:00:00', 'Knowledgeable in fertilization and weed control.', 'PENDING', '149644e7-f8dd-4204-9d3b-9b238cff0619'),
('2025-02-21 21:30:00', '2025-02-21 21:30:00', 'Reliable and detail-oriented.', 'PENDING', '3e790d49-d17a-4c7f-a74b-bd0aab21d346');

-- Insert applicants into junction table for Job 51
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(51, 294), (51, 295), (51, 296), (51, 297), (51, 298);

-- Job Post 52: Babysitting (OPEN, max 4)
-- INSERT 4 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-21 20:00:00', '2025-02-21 20:00:00', 'Experienced babysitter with excellent references.', 'PENDING', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3'),
('2025-02-21 20:30:00', '2025-02-21 20:30:00', 'CPR and First Aid certified.', 'PENDING', '0c405703-5447-4460-a6cb-af102bb27f25'),
('2025-02-21 21:00:00', '2025-02-21 21:00:00', 'Available for evenings and weekends.', 'PENDING', 'ab0fd215-410c-4204-add1-06b0fa64d03e'),
('2025-02-21 21:30:00', '2025-02-21 21:30:00', 'Patient and caring, with a love for children.', 'PENDING', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c');

-- Insert applicants into junction table for Job 52
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(52, 299), (52, 300), (52, 301), (52, 302);

-- Job Post 53: Pet Sitting (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-15 21:00:00', '2025-02-15 21:00:00', 'Experienced pet sitter with a love for animals.', 'ACCEPTED', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d'),
('2025-02-15 21:30:00', '2025-02-15 21:30:00', 'Able to provide overnight care and administer medication.', 'ACCEPTED', '33792185-d7af-4e48-8244-997e2ae1c8c4'),
('2025-02-15 22:00:00', '2025-02-15 22:00:00', 'Reliable and trustworthy, with excellent references.', 'ACCEPTED', '2223cdf9-ce32-4631-b272-5de4390187f6');

-- Insert applicants into junction table for Job 53
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(53, 303), (53, 304), (53, 305);

-- Job Post 54: Grocery Delivery (COMPLETED, max 5)
-- INSERT 5 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-15 22:00:00', '2025-02-15 22:00:00', 'Experienced in grocery shopping and delivery.', 'ACCEPTED', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a'),
('2025-02-15 22:15:00', '2025-02-15 22:15:00', 'Familiar with local grocery stores and delivery routes.', 'ACCEPTED', '1380b38d-540c-4bfe-bcf6-0024081a8b0f'),
('2025-02-15 22:30:00', '2025-02-15 22:30:00', 'Able to handle large orders and deliver promptly.', 'ACCEPTED', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8'),
('2025-02-15 22:45:00', '2025-02-15 22:45:00', 'Provides own transportation.', 'ACCEPTED', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27'),
('2025-02-15 23:00:00', '2025-02-15 23:00:00', 'Reliable and efficient, with excellent customer service skills.', 'ACCEPTED', 'f6f61fd2-0227-4176-af2c-6e358279312f');

-- Insert applicants into junction table for Job 54
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(54, 306), (54, 307), (54, 308), (54, 309), (54, 310);

-- Job Post 55: House Cleaning (OPEN, max 6)
-- INSERT 6 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-21 23:00:00', '2025-02-21 23:00:00', 'Experienced house cleaner with attention to detail.', 'PENDING', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14'),
('2025-02-21 23:30:00', '2025-02-21 23:30:00', 'Proficient in cleaning and sanitizing all areas of the home.', 'PENDING', '9b796866-bda9-4102-9c56-bd62e1082f7d'),
('2025-02-22 00:00:00', '2025-02-22 00:00:00', 'Provides own cleaning supplies.', 'PENDING', '3f327cb7-80ae-472f-86e1-085028b32bff'),
('2025-02-22 00:30:00', '2025-02-22 00:30:00', 'Available for regular or one-time cleaning services.', 'PENDING', 'b50517e9-8656-444a-a348-b0f53664e9cf'),
('2025-02-22 01:00:00', '2025-02-22 01:00:00', 'Reliable and trustworthy, with excellent references.', 'PENDING', 'bacb833d-045c-4452-a880-6f607e4a6c05'),
('2025-02-22 01:30:00', '2025-02-22 01:30:00', 'Flexible scheduling to accommodate client needs.', 'PENDING', '00a04b3b-1800-4ef5-8694-b5bef27be101');

-- Insert applicants into junction table for Job 55
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(55, 311), (55, 312), (55, 313), (55, 314), (55, 315), (55, 316);

-- Job Post 56: Tutoring (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 00:00:00', '2025-02-16 00:00:00', 'Experienced math tutor for high school students.', 'ACCEPTED', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0'),
('2025-02-16 00:30:00', '2025-02-16 00:30:00', 'Patient and understanding, with a proven track record of helping students succeed.', 'ACCEPTED', 'df9a7413-65fb-46c7-99a0-6f5f6243314c'),
('2025-02-16 01:00:00', '2025-02-16 01:00:00', 'Able to explain complex concepts in a clear and concise manner.', 'ACCEPTED', '290aa2e8-f6d7-4a66-a783-2a54aa109569'),
('2025-02-16 01:30:00', '2025-02-16 01:30:00', 'Available for in-person or online tutoring sessions.', 'ACCEPTED', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f');

-- Insert applicants into junction table for Job 56
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(56, 317), (56, 318), (56, 319), (56, 320);

-- Job Post 57: Gardening (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-22 01:00:00', '2025-02-22 01:00:00', 'Experienced gardener with knowledge of plants and landscaping.', 'PENDING', '2c289845-52e2-4f70-bfa4-7cab86b84dc0'),
('2025-02-22 01:30:00', '2025-02-22 01:30:00', 'Able to perform tasks such as planting, weeding, and pruning.', 'PENDING', '0d786962-5188-43db-8b3f-b04adf206bb7'),
('2025-02-22 02:00:00', '2025-02-22 02:00:00', 'Provides own gardening tools.', 'PENDING', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a'),
('2025-02-22 02:30:00', '2025-02-22 02:30:00', 'Passionate about creating and maintaining beautiful gardens.', 'PENDING', '28b456a9-0930-4690-ad53-299a39150e75'),
('2025-02-22 03:00:00', '2025-02-22 03:00:00', 'Reliable and hardworking, with a strong work ethic.', 'PENDING', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38');

-- Insert applicants into junction table for Job 57
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(57, 321), (57, 322), (57, 323), (57, 324), (57, 325);

-- Job Post 58: Car Wash (COMPLETED, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 02:00:00', '2025-02-16 02:00:00', 'Experienced in car washing and detailing.', 'ACCEPTED', '955d9de5-2cc7-40c5-8b24-27fc737f12d9'),
('2025-02-16 02:30:00', '2025-02-16 02:30:00', 'Provides own cleaning supplies and equipment.', 'ACCEPTED', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12'),
('2025-02-16 03:00:00', '2025-02-16 03:00:00', 'Detail-oriented and committed to providing a thorough clean.', 'ACCEPTED', 'e7b803f3-61c3-4b40-a66d-922041bbb3db'),
('2025-02-16 03:30:00', '2025-02-16 03:30:00', 'Available for flexible hours.', 'ACCEPTED', '19dbb644-8669-43a8-9967-5c9beb74bee6');

-- Insert applicants into junction table for Job 58
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(58, 326), (58, 327), (58, 328), (58, 329);

-- Job Post 59: Painting (OPEN, max 6)
-- INSERT 6 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-22 03:00:00', '2025-02-22 03:00:00', 'Experienced painter specializing in interior and exterior painting.', 'PENDING', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578'),
('2025-02-22 03:30:00', '2025-02-22 03:30:00', 'Proficient in surface preparation, priming, and painting techniques.', 'PENDING', 'c79f9012-2fb8-4231-89d5-bc135e857449'),
('2025-02-22 04:00:00', '2025-02-22 04:00:00', 'Provides own painting supplies and equipment.', 'PENDING', '5c9b860b-114a-4793-8fbc-672037defb88'),
('2025-02-22 04:30:00', '2025-02-22 04:30:00', 'Detail-oriented and committed to providing a high-quality finish.', 'PENDING', '76f3d814-f5ac-42fe-88cb-ea47c6284c72'),
('2025-02-22 05:00:00', '2025-02-22 05:00:00', 'Able to work independently and as part of a team.', 'PENDING', '2d73a822-abad-4776-894e-eb6ea78600d6'),
('2025-02-22 05:30:00', '2025-02-22 05:30:00', 'Reliable and punctual, with excellent time management skills.', 'PENDING', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07');

-- Insert applicants into junction table for Job 59
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(59, 330), (59, 331), (59, 332), (59, 333), (59, 334), (59, 335);

-- Job Post 60: Handyman (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 04:00:00', '2025-02-16 04:00:00', 'Experienced handyman with a wide range of repair skills.', 'ACCEPTED', 'c647cd9e-3757-481d-9423-b7e1136ebaa8'),
('2025-02-16 04:30:00', '2025-02-16 04:30:00', 'Able to handle plumbing, electrical, carpentry, and general repairs.', 'ACCEPTED', '090e3603-529b-4a6e-bb17-ed95b3e25ddf'),
('2025-02-16 05:00:00', '2025-02-16 05:00:00', 'Provides own tools and equipment.', 'ACCEPTED', 'ba866253-3826-49d0-ba8c-187b57157633'),
('2025-02-16 05:30:00', '2025-02-16 05:30:00', 'Reliable and efficient, with a strong work ethic.', 'ACCEPTED', '998aec76-87ca-42bc-9669-4ad096f2b2bc');

-- Insert applicants into junction table for Job 60
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(60, 336), (60, 337), (60, 338), (60, 339);












-- Job Post 61: Plumbing Services (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-22 10:00:00', '2025-02-22 10:00:00', 'Licensed plumber experienced in fixing leaky pipes and faucets.', 'PENDING', 'f2329eb0-4cba-4674-8822-d55099046642'),
('2025-02-22 10:30:00', '2025-02-22 10:30:00', 'Available for emergency plumbing services.', 'PENDING', '5d95a781-aab6-4ba2-87c3-e866034921a3'),
('2025-02-22 11:00:00', '2025-02-22 11:00:00', 'Provides own tools and equipment.', 'PENDING', '029ec727-765b-4618-960e-d7a472fd10ad');

-- Insert applicants into junction table for Job 61
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(61, 340), (61, 341), (61, 342);

-- Job Post 62: Carpet Cleaning (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 11:00:00', '2025-02-17 11:00:00', 'Experienced carpet cleaner with professional equipment.', 'ACCEPTED', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8'),
('2025-02-17 11:15:00', '2025-02-17 11:15:00', 'Uses eco-friendly cleaning solutions.', 'ACCEPTED', '426b2c8b-9e01-43ce-ae38-d669fee55504'),
('2025-02-17 11:30:00', '2025-02-17 11:30:00', 'Able to remove tough stains and odors.', 'ACCEPTED', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7'),
('2025-02-17 11:45:00', '2025-02-17 11:45:00', 'Offers flexible scheduling and competitive pricing.', 'ACCEPTED', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d');

-- Insert applicants into junction table for Job 62
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(62, 343), (62, 344), (62, 345), (62, 346);

-- Job Post 63: House Painting (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-22 12:00:00', '2025-02-22 12:00:00', 'Experienced painter specializing in exterior house painting.', 'PENDING', '149644e7-f8dd-4204-9d3b-9b238cff0619'),
('2025-02-22 12:30:00', '2025-02-22 12:30:00', 'Provides own painting supplies and equipment.', 'PENDING', '3e790d49-d17a-4c7f-a74b-bd0aab21d346'),
('2025-02-22 13:00:00', '2025-02-22 13:00:00', 'Meticulous surface preparation for a long-lasting finish.', 'PENDING', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3'),
('2025-02-22 13:30:00', '2025-02-22 13:30:00', 'Able to work safely and efficiently at heights.', 'PENDING', '0c405703-5447-4460-a6cb-af102bb27f25'),
('2025-02-22 14:00:00', '2025-02-22 14:00:00', 'Offers color consultations and free estimates.', 'PENDING', 'ab0fd215-410c-4204-add1-06b0fa64d03e');

-- Insert applicants into junction table for Job 63
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(63, 347), (63, 348), (63, 349), (63, 350), (63, 351);

-- Job Post 64: Tree Trimming (COMPLETED, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 13:00:00', '2025-02-17 13:00:00', 'Experienced tree trimmer with safety equipment.', 'ACCEPTED', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c'),
('2025-02-17 13:15:00', '2025-02-17 13:15:00', 'Knowledgeable in proper pruning techniques.', 'ACCEPTED', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d'),
('2025-02-17 13:30:00', '2025-02-17 13:30:00', 'Provides cleanup and debris removal.', 'ACCEPTED', '33792185-d7af-4e48-8244-997e2ae1c8c4');

-- Insert applicants into junction table for Job 64
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(64, 352), (64, 353), (64, 354);

-- Job Post 65: House Cleaning (OPEN, max 4)
-- INSERT 4 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-22 14:00:00', '2025-02-22 14:00:00', 'Experienced house cleaner with attention to detail.', 'PENDING', '2223cdf9-ce32-4631-b272-5de4390187f6'),
('2025-02-22 14:30:00', '2025-02-22 14:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a'),
('2025-02-22 15:00:00', '2025-02-22 15:00:00', 'Offers flexible scheduling and competitive pricing.', 'PENDING', '1380b38d-540c-4bfe-bcf6-0024081a8b0f'),
('2025-02-22 15:30:00', '2025-02-22 15:30:00', 'Reliable and trustworthy, with excellent references.', 'PENDING', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8');

-- Insert applicants into junction table for Job 65
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(65, 355), (65, 356), (65, 357), (65, 358);

-- Job Post 66: Grocery Delivery (IN_PROGRESS, max 5)
-- INSERT 5 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 15:00:00', '2025-02-17 15:00:00', 'Reliable grocery delivery service.', 'ACCEPTED', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27'),
('2025-02-17 15:05:00', '2025-02-17 15:05:00', 'Careful handling of groceries.', 'ACCEPTED', 'f6f61fd2-0227-4176-af2c-6e358279312f'),
('2025-02-17 15:10:00', '2025-02-17 15:10:00', 'Prompt and efficient delivery.', 'ACCEPTED', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14'),
('2025-02-17 15:20:00', '2025-02-17 15:20:00', 'Own transportation provided.', 'ACCEPTED', '9b796866-bda9-4102-9c56-bd62e1082f7d'),
('2025-02-17 15:30:00', '2025-02-17 15:30:00', 'Good knowledge of the Dublin area.', 'ACCEPTED', '3f327cb7-80ae-472f-86e1-085028b32bff');

-- Insert applicants into junction table for Job 66
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(66, 359), (66, 360), (66, 361), (66, 362), (66, 363);

-- Job Post 67: Window Washing (COMPLETED, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 16:00:00', '2025-02-17 16:00:00', 'Experienced window washer, streak-free results.', 'ACCEPTED', 'b50517e9-8656-444a-a348-b0f53664e9cf'),
('2025-02-17 16:10:00', '2025-02-17 16:10:00', 'Provides own cleaning supplies and equipment.', 'ACCEPTED', 'bacb833d-045c-4452-a880-6f607e4a6c05'),
('2025-02-17 16:20:00', '2025-02-17 16:20:00', 'Safe and efficient window cleaning.', 'ACCEPTED', '00a04b3b-1800-4ef5-8694-b5bef27be101');

-- Insert applicants into junction table for Job 67
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(67, 364), (67, 365), (67, 366);

-- Job Post 68: Gardening (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-22 17:00:00', '2025-02-22 17:00:00', 'Experienced gardener for backyard cleanup and maintenance.', 'PENDING', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0'),
('2025-02-22 17:30:00', '2025-02-22 17:30:00', 'Knowledgeable in plant care and landscaping.', 'PENDING', 'df9a7413-65fb-46c7-99a0-6f5f6243314c'),
('2025-02-22 18:00:00', '2025-02-22 18:00:00', 'Provides own gardening tools.', 'PENDING', '290aa2e8-f6d7-4a66-a783-2a54aa109569'),
('2025-02-22 18:30:00', '2025-02-22 18:30:00', 'Available for regular garden maintenance.', 'PENDING', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f'),
('2025-02-22 19:00:00', '2025-02-22 19:00:00', 'Reliable and hardworking.', 'PENDING', '2c289845-52e2-4f70-bfa4-7cab86b84dc0');

-- Insert applicants into junction table for Job 68
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(68, 367), (68, 368), (68, 369), (68, 370), (68, 371);

-- Job Post 69: Dog Walking (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 18:00:00', '2025-02-17 18:00:00', 'Experienced dog walker, loves animals.', 'ACCEPTED', '0d786962-5188-43db-8b3f-b04adf206bb7'),
('2025-02-17 18:05:00', '2025-02-17 18:05:00', 'Available for daily walks.', 'ACCEPTED', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a'),
('2025-02-17 18:15:00', '2025-02-17 18:15:00', 'Reliable and responsible.', 'ACCEPTED', '28b456a9-0930-4690-ad53-299a39150e75'),
('2025-02-17 18:30:00', '2025-02-17 18:30:00', 'Familiar with dog-walking routes in Dublin.', 'ACCEPTED', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38');

-- Insert applicants into junction table for Job 69
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(69, 372), (69, 373), (69, 374), (69, 375);

-- Job Post 70: Snow Removal (OPEN, max 6)
-- INSERT 6 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-22 19:00:00', '2025-02-22 19:00:00', 'Available for snow removal services.', 'PENDING', '955d9de5-2cc7-40c5-8b24-27fc737f12d9'),
('2025-02-22 19:30:00', '2025-02-22 19:30:00', 'Provides own shovel and equipment.', 'PENDING', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12'),
('2025-02-22 20:00:00', '2025-02-22 20:00:00', 'Prompt and efficient snow clearing.', 'PENDING', 'e7b803f3-61c3-4b40-a66d-922041bbb3db'),
('2025-02-22 20:30:00', '2025-02-22 20:30:00', 'Experience with snow blowers.', 'PENDING', '19dbb644-8669-43a8-9967-5c9beb74bee6'),
('2025-02-22 21:00:00', '2025-02-22 21:00:00', 'Available for on-call snow removal.', 'PENDING', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578'),
('2025-02-22 21:30:00', '2025-02-22 21:30:00', 'Reliable and hardworking.', 'PENDING', 'c79f9012-2fb8-4231-89d5-bc135e857449');

-- Insert applicants into junction table for Job 70
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(70, 376), (70, 377), (70, 378), (70, 379), (70, 380), (70, 381);
















-- Job Post 71: Electrician Services (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-22 10:00:00', '2025-02-22 10:00:00', 'Licensed electrician experienced in fixing faulty wiring and electrical issues.', 'PENDING', '5c9b860b-114a-4793-8fbc-672037defb88'),
('2025-02-22 10:30:00', '2025-02-22 10:30:00', 'Available for emergency electrical repairs.', 'PENDING', '76f3d814-f5ac-42fe-88cb-ea47c6284c72'),
('2025-02-22 11:00:00', '2025-02-22 11:00:00', 'Provides own tools and equipment.', 'PENDING', '2d73a822-abad-4776-894e-eb6ea78600d6');

-- Insert applicants into junction table for Job 71
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(71, 382), (71, 383), (71, 384);

-- Job Post 72: Mowing Services (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 11:00:00', '2025-02-17 11:00:00', 'Experienced in lawn mowing and garden maintenance.', 'ACCEPTED', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07'),
('2025-02-17 11:15:00', '2025-02-17 11:15:00', 'Provides own lawn mower and equipment.', 'ACCEPTED', 'c647cd9e-3757-481d-9423-b7e1136ebaa8'),
('2025-02-17 11:30:00', '2025-02-17 11:30:00', 'Offers flexible scheduling.', 'ACCEPTED', '090e3603-529b-4a6e-bb17-ed95b3e25ddf'),
('2025-02-17 11:45:00', '2025-02-17 11:45:00', 'Reliable and efficient service.', 'ACCEPTED', 'ba866253-3826-49d0-ba8c-187b57157633');

-- Insert applicants into junction table for Job 72
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(72, 385), (72, 386), (72, 387), (72, 388);

-- Job Post 73: Furniture Assembly (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-22 12:00:00', '2025-02-22 12:00:00', 'Experienced in assembling various types of furniture.', 'PENDING', '998aec76-87ca-42bc-9669-4ad096f2b2bc'),
('2025-02-22 12:30:00', '2025-02-22 12:30:00', 'Provides own tools and follows instructions carefully.', 'PENDING', 'f2329eb0-4cba-4674-8822-d55099046642'),
('2025-02-22 13:00:00', '2025-02-22 13:00:00', 'Efficient and detail-oriented assembly service.', 'PENDING', '5d95a781-aab6-4ba2-87c3-e866034921a3'),
('2025-02-22 13:30:00', '2025-02-22 13:30:00', 'Available for flexible scheduling.', 'PENDING', '029ec727-765b-4618-960e-d7a472fd10ad'),
('2025-02-22 14:00:00', '2025-02-22 14:00:00', 'Reliable and punctual.', 'PENDING', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8');

-- Insert applicants into junction table for Job 73
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(73, 389), (73, 390), (73, 391), (73, 392), (73, 393);

-- Job Post 74: Handyman Services (COMPLETED, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 13:00:00', '2025-02-17 13:00:00', 'Experienced handyman for various home repairs.', 'ACCEPTED', '426b2c8b-9e01-43ce-ae38-d669fee55504'),
('2025-02-17 13:15:00', '2025-02-17 13:15:00', 'Provides own tools and equipment.', 'ACCEPTED', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7'),
('2025-02-17 13:30:00', '2025-02-17 13:30:00', 'Reliable and efficient service.', 'ACCEPTED', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d');

-- Insert applicants into junction table for Job 74
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(74, 394), (74, 395), (74, 396);

-- Job Post 75: Cleaning Services (OPEN, max 4)
-- INSERT 4 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-22 14:00:00', '2025-02-22 14:00:00', 'Experienced cleaner for deep cleaning services.', 'PENDING', '149644e7-f8dd-4204-9d3b-9b238cff0619'),
('2025-02-22 14:30:00', '2025-02-22 14:30:00', 'Provides own cleaning supplies.', 'PENDING', '3e790d49-d17a-4c7f-a74b-bd0aab21d346'),
('2025-02-22 15:00:00', '2025-02-22 15:00:00', 'Thorough and detail-oriented cleaning.', 'PENDING', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3'),
('2025-02-22 15:30:00', '2025-02-22 15:30:00', 'Reliable and trustworthy.', 'PENDING', '0c405703-5447-4460-a6cb-af102bb27f25');

-- Insert applicants into junction table for Job 75
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(75, 397), (75, 398), (75, 399), (75, 400);

-- Job Post 76: Plumbing Services (IN_PROGRESS, max 5)
-- INSERT 5 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 15:00:00', '2025-02-17 15:00:00', 'Licensed plumber for pipe repairs and installations.', 'ACCEPTED', 'ab0fd215-410c-4204-add1-06b0fa64d03e'),
('2025-02-17 15:05:00', '2025-02-17 15:05:00', 'Experienced in fixing leaks and clogs.', 'ACCEPTED', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c'),
('2025-02-17 15:10:00', '2025-02-17 15:10:00', 'Provides own tools and equipment.', 'ACCEPTED', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d'),
('2025-02-17 15:20:00', '2025-02-17 15:20:00', 'Available for emergency plumbing services.', 'ACCEPTED', '33792185-d7af-4e48-8244-997e2ae1c8c4'),
('2025-02-17 15:30:00', '2025-02-17 15:30:00', 'Prompt and reliable service.', 'ACCEPTED', '2223cdf9-ce32-4631-b272-5de4390187f6');

-- Insert applicants into junction table for Job 76
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(76, 401), (76, 402), (76, 403), (76, 404), (76, 405);

-- Job Post 77: Painting Services (COMPLETED, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 16:00:00', '2025-02-17 16:00:00', 'Experienced painter for house exterior painting.', 'ACCEPTED', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a'),
('2025-02-17 16:15:00', '2025-02-17 16:15:00', 'Provides own painting supplies and equipment.', 'ACCEPTED', '1380b38d-540c-4bfe-bcf6-0024081a8b0f'),
('2025-02-17 16:30:00', '2025-02-17 16:30:00', 'Careful surface preparation and quality finish.', 'ACCEPTED', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8');

-- Insert applicants into junction table for Job 77
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(77, 406), (77, 407), (77, 408);

-- Job Post 78: Gardening Services (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-22 17:00:00', '2025-02-22 17:00:00', 'Experienced gardener for garden maintenance.', 'PENDING', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27'),
('2025-02-22 17:30:00', '2025-02-22 17:30:00', 'Knowledgeable in plant care and landscaping.', 'PENDING', 'f6f61fd2-0227-4176-af2c-6e358279312f'),
('2025-02-22 18:00:00', '2025-02-22 18:00:00', 'Provides own gardening tools.', 'PENDING', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14'),
('2025-02-22 18:30:00', '2025-02-22 18:30:00', 'Available for regular garden upkeep.', 'PENDING', '9b796866-bda9-4102-9c56-bd62e1082f7d'),
('2025-02-22 19:00:00', '2025-02-22 19:00:00', 'Reliable and hardworking.', 'PENDING', '3f327cb7-80ae-472f-86e1-085028b32bff');

-- Insert applicants into junction table for Job 78
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(78, 409), (78, 410), (78, 411), (78, 412), (78, 413);

-- Job Post 79: Window Cleaning (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 18:00:00', '2025-02-17 18:00:00', 'Experienced window cleaner, streak-free results.', 'ACCEPTED', 'b50517e9-8656-444a-a348-b0f53664e9cf'),
('2025-02-17 18:10:00', '2025-02-17 18:10:00', 'Provides own cleaning supplies and equipment.', 'ACCEPTED', 'bacb833d-045c-4452-a880-6f607e4a6c05'),
('2025-02-17 18:20:00', '2025-02-17 18:20:00', 'Safe and efficient window cleaning.', 'ACCEPTED', '00a04b3b-1800-4ef5-8694-b5bef27be101'),
('2025-02-17 18:30:00', '2025-02-17 18:30:00', 'Reliable and professional service.', 'ACCEPTED', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0');

-- Insert applicants into junction table for Job 79
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(79, 414), (79, 415), (79, 416), (79, 417);

-- Job Post 80: Grocery Delivery (OPEN, max 6)
-- INSERT 6 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-22 19:00:00', '2025-02-22 19:00:00', 'Reliable grocery delivery service to your doorstep.', 'PENDING', 'df9a7413-65fb-46c7-99a0-6f5f6243314c'),
('2025-02-22 19:30:00', '2025-02-22 19:30:00', 'Careful handling of groceries, including perishables.', 'PENDING', '290aa2e8-f6d7-4a66-a783-2a54aa109569'),
('2025-02-22 20:00:00', '2025-02-22 20:00:00', 'Prompt and efficient delivery within the Kilkenny area.', 'PENDING', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f'),
('2025-02-22 20:30:00', '2025-02-22 20:30:00', 'Own transportation provided, ensuring timely delivery.', 'PENDING', '2c289845-52e2-4f70-bfa4-7cab86b84dc0'),
('2025-02-22 21:00:00', '2025-02-22 21:00:00', 'Good knowledge of local grocery stores and products.', 'PENDING', '0d786962-5188-43db-8b3f-b04adf206bb7'),
('2025-02-22 21:30:00', '2025-02-22 21:30:00', 'Flexible scheduling to accommodate your needs.', 'PENDING', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a');

-- Insert applicants into junction table for Job 80
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(80, 418), (80, 419), (80, 420), (80, 421), (80, 422), (80, 423);


















-- Job Post 81: Pet Sitting (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-22 20:00:00', '2025-02-22 20:00:00', 'Experienced pet sitter, comfortable with dogs and cats.', 'PENDING', '28b456a9-0930-4690-ad53-299a39150e75'),
('2025-02-22 20:30:00', '2025-02-22 20:30:00', 'Available for overnight stays and daily visits.', 'PENDING', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38'),
('2025-02-22 21:00:00', '2025-02-22 21:00:00', 'Reliable and trustworthy, with references available.', 'PENDING', '955d9de5-2cc7-40c5-8b24-27fc737f12d9');

-- Insert applicants into junction table for Job 81
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(81, 424), (81, 425), (81, 426);

-- Job Post 82: Childcare (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 21:00:00', '2025-02-17 21:00:00', 'Experienced childcare provider with CPR certification.', 'ACCEPTED', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12'),
('2025-02-17 21:10:00', '2025-02-17 21:10:00', 'Available for after-school care and homework help.', 'ACCEPTED', 'e7b803f3-61c3-4b40-a66d-922041bbb3db'),
('2025-02-17 21:20:00', '2025-02-17 21:20:00', 'Patient and engaging with children of all ages.', 'ACCEPTED', '19dbb644-8669-43a8-9967-5c9beb74bee6'),
('2025-02-17 21:30:00', '2025-02-17 21:30:00', 'Creates a fun and safe learning environment.', 'ACCEPTED', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578');

-- Insert applicants into junction table for Job 82
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(82, 427), (82, 428), (82, 429), (82, 430);

-- Job Post 83: Local Delivery (COMPLETED, max 5)
-- INSERT 5 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 22:00:00', '2025-02-17 22:00:00', 'Reliable delivery driver with own vehicle.', 'ACCEPTED', 'c79f9012-2fb8-4231-89d5-bc135e857449'),
('2025-02-17 22:05:00', '2025-02-17 22:05:00', 'Familiar with the local neighborhood.', 'ACCEPTED', '5c9b860b-114a-4793-8fbc-672037defb88'),
('2025-02-17 22:10:00', '2025-02-17 22:10:00', 'Prompt and efficient delivery service.', 'ACCEPTED', '76f3d814-f5ac-42fe-88cb-ea47c6284c72'),
('2025-02-17 22:20:00', '2025-02-17 22:20:00', 'Careful handling of items.', 'ACCEPTED', '2d73a822-abad-4776-894e-eb6ea78600d6'),
('2025-02-17 22:30:00', '2025-02-17 22:30:00', 'Good communication skills.', 'ACCEPTED', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07');

-- Insert applicants into junction table for Job 83
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(83, 431), (83, 432), (83, 433), (83, 434), (83, 435);

-- Job Post 84: Senior Care (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-22 23:00:00', '2025-02-22 23:00:00', 'Compassionate caregiver with experience assisting seniors.', 'PENDING', 'c647cd9e-3757-481d-9423-b7e1136ebaa8'),
('2025-02-22 23:30:00', '2025-02-22 23:30:00', 'Patient and understanding, able to provide companionship and support.', 'PENDING', '090e3603-529b-4a6e-bb17-ed95b3e25ddf');

-- Insert applicants into junction table for Job 84
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(84, 436), (84, 437);

-- Job Post 85: Lawn Mowing (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-18 08:00:00', '2025-02-18 08:00:00', 'Experienced in lawn mowing and garden tidying.', 'ACCEPTED', 'ba866253-3826-49d0-ba8c-187b57157633'),
('2025-02-18 08:15:00', '2025-02-18 08:15:00', 'Provides own lawn mower and tools.', 'ACCEPTED', '998aec76-87ca-42bc-9669-4ad096f2b2bc'),
('2025-02-18 08:30:00', '2025-02-18 08:30:00', 'Reliable and efficient service.', 'ACCEPTED', 'f2329eb0-4cba-4674-8822-d55099046642');

-- Insert applicants into junction table for Job 85
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(85, 438), (85, 439), (85, 440);

-- Job Post 86: Grocery Shopping (OPEN, max 4)
-- INSERT 4 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-23 09:00:00', '2025-02-23 09:00:00', 'Efficient grocery shopper, familiar with local stores.', 'PENDING', '5d95a781-aab6-4ba2-87c3-e866034921a3'),
('2025-02-23 09:30:00', '2025-02-23 09:30:00', 'Careful selection of fresh produce and items.', 'PENDING', '029ec727-765b-4618-960e-d7a472fd10ad'),
('2025-02-23 10:00:00', '2025-02-23 10:00:00', 'Able to follow specific shopping lists and instructions.', 'PENDING', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8'),
('2025-02-23 10:30:00', '2025-02-23 10:30:00', 'Reliable and punctual with deliveries.', 'PENDING', '426b2c8b-9e01-43ce-ae38-d669fee55504');

-- Insert applicants into junction table for Job 86
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(86, 441), (86, 442), (86, 443), (86, 444);

-- Job Post 87: Home Maintenance (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-18 10:00:00', '2025-02-18 10:00:00', 'Experienced in fixing plumbing issues.', 'ACCEPTED', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7'),
('2025-02-18 10:30:00', '2025-02-18 10:30:00', 'Provides own tools and equipment.', 'ACCEPTED', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d');

-- Insert applicants into junction table for Job 87
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(87, 445), (87, 446);

-- Job Post 88: Car Washing (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-23 11:00:00', '2025-02-23 11:00:00', 'Experienced car washer, detail-oriented.', 'PENDING', '149644e7-f8dd-4204-9d3b-9b238cff0619'),
('2025-02-23 11:30:00', '2025-02-23 11:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', '3e790d49-d17a-4c7f-a74b-bd0aab21d346'),
('2025-02-23 12:00:00', '2025-02-23 12:00:00', 'Thorough cleaning, including interior and exterior.', 'PENDING', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3'),
('2025-02-23 12:30:00', '2025-02-23 12:30:00', 'Flexible scheduling.', 'PENDING', '0c405703-5447-4460-a6cb-af102bb27f25'),
('2025-02-23 13:00:00', '2025-02-23 13:00:00', 'Reliable and efficient service.', 'PENDING', 'ab0fd215-410c-4204-add1-06b0fa64d03e');

-- Insert applicants into junction table for Job 88
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(88, 447), (88, 448), (88, 449), (88, 450), (88, 451);

-- Job Post 89: Tutoring (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-18 12:00:00', '2025-02-18 12:00:00', 'Experienced math tutor for various levels.', 'ACCEPTED', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c'),
('2025-02-18 12:15:00', '2025-02-18 12:15:00', 'Patient and able to explain concepts clearly.', 'ACCEPTED', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d'),
('2025-02-18 12:30:00', '2025-02-18 12:30:00', 'Flexible scheduling to accommodate student needs.', 'ACCEPTED', '33792185-d7af-4e48-8244-997e2ae1c8c4');

-- Insert applicants into junction table for Job 89
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(89, 452), (89, 453), (89, 454);

-- Job Post 90: Package Pickup (OPEN, max 4)
-- INSERT 4 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-23 13:00:00', '2025-02-23 13:00:00', 'Reliable person for package pickup and delivery.', 'PENDING', '2223cdf9-ce32-4631-b272-5de4390187f6'),
('2025-02-23 13:30:00', '2025-02-23 13:30:00', 'Familiar with local post offices and delivery procedures.', 'PENDING', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a'),
('2025-02-23 14:00:00', '2025-02-23 14:00:00', 'Prompt and efficient service.', 'PENDING', '1380b38d-540c-4bfe-bcf6-0024081a8b0f'),
('2025-02-23 14:30:00', '2025-02-23 14:30:00', 'Careful handling of packages.', 'PENDING', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8');

-- Insert applicants into junction table for Job 90
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(90, 455), (90, 456), (90, 457), (90, 458);















-- Job Post 91: Furniture Assembly (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-22 15:00:00', '2025-02-22 15:00:00', 'Experienced in assembling various types of furniture.', 'PENDING', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27'),
('2025-02-22 15:30:00', '2025-02-22 15:30:00', 'Provides own tools and follows instructions carefully.', 'PENDING', 'f6f61fd2-0227-4176-af2c-6e358279312f'),
('2025-02-22 16:00:00', '2025-02-22 16:00:00', 'Efficient and detail-oriented assembly service.', 'PENDING', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14');

-- Insert applicants into junction table for Job 91
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(91, 459), (91, 460), (91, 461);

-- Job Post 92: Cleaning Service (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 16:00:00', '2025-02-17 16:00:00', 'Experienced cleaner for house cleaning services.', 'ACCEPTED', '9b796866-bda9-4102-9c56-bd62e1082f7d'),
('2025-02-17 16:10:00', '2025-02-17 16:10:00', 'Provides own cleaning supplies.', 'ACCEPTED', '3f327cb7-80ae-472f-86e1-085028b32bff'),
('2025-02-17 16:20:00', '2025-02-17 16:20:00', 'Thorough and detail-oriented cleaning.', 'ACCEPTED', 'b50517e9-8656-444a-a348-b0f53664e9cf'),
('2025-02-17 16:30:00', '2025-02-17 16:30:00', 'Reliable and trustworthy.', 'ACCEPTED', 'bacb833d-045c-4452-a880-6f607e4a6c05');

-- Insert applicants into junction table for Job 92
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(92, 462), (92, 463), (92, 464), (92, 465);

-- Job Post 93: Grocery Delivery (COMPLETED, max 5)
-- INSERT 5 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 17:00:00', '2025-02-17 17:00:00', 'Reliable grocery delivery service.', 'ACCEPTED', '00a04b3b-1800-4ef5-8694-b5bef27be101'),
('2025-02-17 17:05:00', '2025-02-17 17:05:00', 'Careful handling of groceries.', 'ACCEPTED', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0'),
('2025-02-17 17:10:00', '2025-02-17 17:10:00', 'Prompt and efficient delivery.', 'ACCEPTED', 'df9a7413-65fb-46c7-99a0-6f5f6243314c'),
('2025-02-17 17:20:00', '2025-02-17 17:20:00', 'Own transportation provided.', 'ACCEPTED', '290aa2e8-f6d7-4a66-a783-2a54aa109569'),
('2025-02-17 17:30:00', '2025-02-17 17:30:00', 'Good knowledge of the Dublin area.', 'ACCEPTED', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f');

-- Insert applicants into junction table for Job 93
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(93, 466), (93, 467), (93, 468), (93, 469), (93, 470);

-- Job Post 94: Pet Care (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-22 18:00:00', '2025-02-22 18:00:00', 'Experienced pet care provider, comfortable with dogs and cats.', 'PENDING', '2c289845-52e2-4f70-bfa4-7cab86b84dc0'),
('2025-02-22 18:30:00', '2025-02-22 18:30:00', 'Available for pet walking, feeding, and playtime.', 'PENDING', '0d786962-5188-43db-8b3f-b04adf206bb7'),
('2025-02-22 19:00:00', '2025-02-22 19:00:00', 'Reliable and caring, with a love for animals.', 'PENDING', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a');

-- Insert applicants into junction table for Job 94
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(94, 471), (94, 472), (94, 473);

-- Job Post 95: Tutoring Service (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 19:00:00', '2025-02-17 19:00:00', 'Experienced tutor for English and History.', 'ACCEPTED', '28b456a9-0930-4690-ad53-299a39150e75'),
('2025-02-17 19:10:00', '2025-02-17 19:10:00', 'Patient and able to explain concepts clearly.', 'ACCEPTED', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38'),
('2025-02-17 19:20:00', '2025-02-17 19:20:00', 'Provides personalized learning plans.', 'ACCEPTED', '955d9de5-2cc7-40c5-8b24-27fc737f12d9'),
('2025-02-17 19:30:00', '2025-02-17 19:30:00', 'Flexible scheduling to accommodate student needs.', 'ACCEPTED', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12');

-- Insert applicants into junction table for Job 95
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(95, 474), (95, 475), (95, 476), (95, 477);

-- Job Post 96: Local Delivery (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-22 20:00:00', '2025-02-22 20:00:00', 'Reliable delivery driver with own vehicle.', 'PENDING', 'e7b803f3-61c3-4b40-a66d-922041bbb3db'),
('2025-02-22 20:30:00', '2025-02-22 20:30:00', 'Familiar with the Limerick area.', 'PENDING', '19dbb644-8669-43a8-9967-5c9beb74bee6'),
('2025-02-22 21:00:00', '2025-02-22 21:00:00', 'Prompt and efficient delivery service.', 'PENDING', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578'),
('2025-02-22 21:30:00', '2025-02-22 21:30:00', 'Careful handling of packages.', 'PENDING', 'c79f9012-2fb8-4231-89d5-bc135e857449'),
('2025-02-22 22:00:00', '2025-02-22 22:00:00', 'Good communication skills.', 'PENDING', '5c9b860b-114a-4793-8fbc-672037defb88');

-- Insert applicants into junction table for Job 96
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(96, 478), (96, 479), (96, 480), (96, 481), (96, 482);

-- Job Post 97: Childcare (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 21:00:00', '2025-02-17 21:00:00', 'Experienced babysitter with CPR certification.', 'ACCEPTED', '76f3d814-f5ac-42fe-88cb-ea47c6284c72'),
('2025-02-17 21:30:00', '2025-02-17 21:30:00', 'Caring and responsible with children.', 'ACCEPTED', '2d73a822-abad-4776-894e-eb6ea78600d6');

-- Insert applicants into junction table for Job 97
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(97, 483), (97, 484);

-- Job Post 98: Lawn Mowing (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-17 22:00:00', '2025-02-17 22:00:00', 'Experienced in lawn mowing and garden maintenance.', 'ACCEPTED', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07'),
('2025-02-17 22:10:00', '2025-02-17 22:10:00', 'Provides own lawn mower and tools.', 'ACCEPTED', 'c647cd9e-3757-481d-9423-b7e1136ebaa8'),
('2025-02-17 22:20:00', '2025-02-17 22:20:00', 'Reliable and efficient service.', 'ACCEPTED', '090e3603-529b-4a6e-bb17-ed95b3e25ddf'),
('2025-02-17 22:30:00', '2025-02-17 22:30:00', 'Available for regular lawn care.', 'ACCEPTED', 'ba866253-3826-49d0-ba8c-187b57157633');

-- Insert applicants into junction table for Job 98
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(98, 485), (98, 486), (98, 487), (98, 488);

-- Job Post 99: Senior Care (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-22 23:00:00', '2025-02-22 23:00:00', 'Compassionate caregiver for elderly assistance.', 'PENDING', '998aec76-87ca-42bc-9669-4ad096f2b2bc'),
('2025-02-22 23:30:00', '2025-02-22 23:30:00', 'Patient and understanding, providing companionship.', 'PENDING', 'f2329eb0-4cba-4674-8822-d55099046642'),
('2025-02-23 00:00:00', '2025-02-23 00:00:00', 'Experience with daily living assistance.', 'PENDING', '5d95a781-aab6-4ba2-87c3-e866034921a3');

-- Insert applicants into junction table for Job 99
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(99, 489), (99, 490), (99, 491);

-- Job Post 100: Car Washing (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-18 08:00:00', '2025-02-18 08:00:00', 'Experienced car washer, detail-oriented.', 'ACCEPTED', '029ec727-765b-4618-960e-d7a472fd10ad'),
('2025-02-18 08:30:00', '2025-02-18 08:30:00', 'Provides own cleaning supplies.', 'ACCEPTED', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8');

-- Insert applicants into junction table for Job 100
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(100, 492), (100, 493);

























-- Job Post 101: Home Renovation (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-23 10:00:00', '2025-02-23 10:00:00', 'Experienced contractor specializing in home renovations.', 'PENDING', '426b2c8b-9e01-43ce-ae38-d669fee55504'),
('2025-02-23 10:30:00', '2025-02-23 10:30:00', 'Provides detailed project plans and cost estimates.', 'PENDING', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7'),
('2025-02-23 11:00:00', '2025-02-23 11:00:00', 'Licensed and insured, with excellent references.', 'PENDING', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d');

-- Insert applicants into junction table for Job 101
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(101, 494), (101, 495), (101, 496);

-- Job Post 102: Child Care (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-18 11:00:00', '2025-02-18 11:00:00', 'Experienced childcare provider with CPR certification.', 'ACCEPTED', '149644e7-f8dd-4204-9d3b-9b238cff0619'),
('2025-02-18 11:10:00', '2025-02-18 11:10:00', 'Available for part-time after-school care.', 'ACCEPTED', '3e790d49-d17a-4c7f-a74b-bd0aab21d346'),
('2025-02-18 11:20:00', '2025-02-18 11:20:00', 'Patient and engaging with children of all ages.', 'ACCEPTED', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3'),
('2025-02-18 11:30:00', '2025-02-18 11:30:00', 'Creates a fun and safe learning environment.', 'ACCEPTED', '0c405703-5447-4460-a6cb-af102bb27f25');

-- Insert applicants into junction table for Job 102
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(102, 497), (102, 498), (102, 499), (102, 500);

-- Job Post 103: Tutoring Services (COMPLETED, max 5)
-- INSERT 5 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-18 12:00:00', '2025-02-18 12:00:00', 'Experienced tutor for Math and Science subjects.', 'ACCEPTED', 'ab0fd215-410c-4204-add1-06b0fa64d03e'),
('2025-02-18 12:05:00', '2025-02-18 12:05:00', 'Patient and able to explain complex concepts clearly.', 'ACCEPTED', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c'),
('2025-02-18 12:10:00', '2025-02-18 12:10:00', 'Provides personalized learning plans.', 'ACCEPTED', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d'),
('2025-02-18 12:20:00', '2025-02-18 12:20:00', 'Flexible scheduling to accommodate student needs.', 'ACCEPTED', '33792185-d7af-4e48-8244-997e2ae1c8c4'),
('2025-02-18 12:30:00', '2025-02-18 12:30:00', 'Proven track record of helping students improve their grades.', 'ACCEPTED', '2223cdf9-ce32-4631-b272-5de4390187f6');

-- Insert applicants into junction table for Job 103
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(103, 501), (103, 502), (103, 503), (103, 504), (103, 505);

-- Job Post 104: Grocery Delivery (OPEN, max 6)
-- INSERT 6 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-23 13:00:00', '2025-02-23 13:00:00', 'Reliable grocery delivery service to your doorstep.', 'PENDING', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a'),
('2025-02-23 13:30:00', '2025-02-23 13:30:00', 'Careful handling of groceries, including perishables.', 'PENDING', '1380b38d-540c-4bfe-bcf6-0024081a8b0f'),
('2025-02-23 14:00:00', '2025-02-23 14:00:00', 'Prompt and efficient delivery within the Cork area.', 'PENDING', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8'),
('2025-02-23 14:30:00', '2025-02-23 14:30:00', 'Own transportation provided, ensuring timely delivery.', 'PENDING', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27'),
('2025-02-23 15:00:00', '2025-02-23 15:00:00', 'Good knowledge of local grocery stores and products.', 'PENDING', 'f6f61fd2-0227-4176-af2c-6e358279312f'),
('2025-02-23 15:30:00', '2025-02-23 15:30:00', 'Flexible scheduling to accommodate your needs.', 'PENDING', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14');

-- Insert applicants into junction table for Job 104
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(104, 506), (104, 507), (104, 508), (104, 509), (104, 510), (104, 511);

-- Job Post 105: Pet Sitting (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-18 14:00:00', '2025-02-18 14:00:00', 'Experienced pet sitter, comfortable with dogs and cats.', 'ACCEPTED', '9b796866-bda9-4102-9c56-bd62e1082f7d'),
('2025-02-18 14:15:00', '2025-02-18 14:15:00', 'Available for overnight stays and daily visits.', 'ACCEPTED', '3f327cb7-80ae-472f-86e1-085028b32bff'),
('2025-02-18 14:30:00', '2025-02-18 14:30:00', 'Reliable and trustworthy, with references available.', 'ACCEPTED', 'b50517e9-8656-444a-a348-b0f53664e9cf');

-- Insert applicants into junction table for Job 105
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(105, 512), (105, 513), (105, 514);


-- Job Post 106: Moving Help (OPEN, max 4)
-- INSERT 4 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-23 15:00:00', '2025-02-23 15:00:00', 'Strong and reliable, available for moving furniture and heavy items.', 'PENDING', 'bacb833d-045c-4452-a880-6f607e4a6c05'),
('2025-02-23 15:30:00', '2025-02-23 15:30:00', 'Experienced in loading and unloading moving trucks.', 'PENDING', '00a04b3b-1800-4ef5-8694-b5bef27be101'),
('2025-02-23 16:00:00', '2025-02-23 16:00:00', 'Careful handling of belongings to prevent damage.', 'PENDING', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0'),
('2025-02-23 16:30:00', '2025-02-23 16:30:00', 'Available for flexible hours, including weekends.', 'PENDING', 'df9a7413-65fb-46c7-99a0-6f5f6243314c');

-- Insert applicants into junction table for Job 106
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(106, 515), (106, 516), (106, 517), (106, 518);

-- Job Post 107: Gardening (COMPLETED, max 5)
-- INSERT 5 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-18 16:00:00', '2025-02-18 16:00:00', 'Experienced gardener for backyard maintenance.', 'ACCEPTED', '290aa2e8-f6d7-4a66-a783-2a54aa109569'),
('2025-02-18 16:05:00', '2025-02-18 16:05:00', 'Knowledgeable in plant care and landscaping.', 'ACCEPTED', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f'),
('2025-02-18 16:10:00', '2025-02-18 16:10:00', 'Provides own gardening tools.', 'ACCEPTED', '2c289845-52e2-4f70-bfa4-7cab86b84dc0'),
('2025-02-18 16:20:00', '2025-02-18 16:20:00', 'Available for regular garden upkeep.', 'ACCEPTED', '0d786962-5188-43db-8b3f-b04adf206bb7'),
('2025-02-18 16:30:00', '2025-02-18 16:30:00', 'Reliable and hardworking.', 'ACCEPTED', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a');

-- Insert applicants into junction table for Job 107
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(107, 519), (107, 520), (107, 521), (107, 522), (107, 523);

-- Job Post 108: Handyman Service (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-23 17:00:00', '2025-02-23 17:00:00', 'Experienced handyman for various home repairs.', 'PENDING', '28b456a9-0930-4690-ad53-299a39150e75'),
('2025-02-23 17:30:00', '2025-02-23 17:30:00', 'Provides own tools and equipment.', 'PENDING', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38');

-- Insert applicants into junction table for Job 108
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(108, 524), (108, 525);

-- Job Post 109: Housekeeping (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-18 18:00:00', '2025-02-18 18:00:00', 'Experienced housekeeper for regular cleaning services.', 'ACCEPTED', '955d9de5-2cc7-40c5-8b24-27fc737f12d9'),
('2025-02-18 18:10:00', '2025-02-18 18:10:00', 'Thorough and detail-oriented cleaning.', 'ACCEPTED', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12'),
('2025-02-18 18:20:00', '2025-02-18 18:20:00', 'Provides own cleaning supplies.', 'ACCEPTED', 'e7b803f3-61c3-4b40-a66d-922041bbb3db'),
('2025-02-18 18:30:00', '2025-02-18 18:30:00', 'Reliable and trustworthy.', 'ACCEPTED', '19dbb644-8669-43a8-9967-5c9beb74bee6');

-- Insert applicants into junction table for Job 109
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(109, 526), (109, 527), (109, 528), (109, 529);

-- Job Post 110: Car Washing (COMPLETED, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-18 19:00:00', '2025-02-18 19:00:00', 'Experienced car washer, detail-oriented.', 'ACCEPTED', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578'),
('2025-02-18 19:15:00', '2025-02-18 19:15:00', 'Provides own cleaning supplies and equipment.', 'ACCEPTED', 'c79f9012-2fb8-4231-89d5-bc135e857449'),
('2025-02-18 19:30:00', '2025-02-18 19:30:00', 'Thorough cleaning, including interior and exterior.', 'ACCEPTED', '5c9b860b-114a-4793-8fbc-672037defb88');

-- Insert applicants into junction table for Job 110
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(110, 530), (110, 531), (110, 532);

















-- Job Post 111: Personal Assistant (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-24 10:00:00', '2025-02-24 10:00:00', 'Organized and efficient personal assistant.', 'PENDING', '76f3d814-f5ac-42fe-88cb-ea47c6284c72'),
('2025-02-24 10:30:00', '2025-02-24 10:30:00', 'Experienced in scheduling and administrative tasks.', 'PENDING', '2d73a822-abad-4776-894e-eb6ea78600d6'),
('2025-02-24 11:00:00', '2025-02-24 11:00:00', 'Excellent communication and time management skills.', 'PENDING', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07');

-- Insert applicants into junction table for Job 111
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(111, 533), (111, 534), (111, 535);

-- Job Post 112: Cleaner (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-19 11:00:00', '2025-02-19 11:00:00', 'Professional cleaner with experience in home cleaning.', 'ACCEPTED', 'c647cd9e-3757-481d-9423-b7e1136ebaa8'),
('2025-02-19 11:10:00', '2025-02-19 11:10:00', 'Thorough and detail-oriented cleaning service.', 'ACCEPTED', '090e3603-529b-4a6e-bb17-ed95b3e25ddf'),
('2025-02-19 11:20:00', '2025-02-19 11:20:00', 'Provides own cleaning supplies and equipment.', 'ACCEPTED', 'ba866253-3826-49d0-ba8c-187b57157633'),
('2025-02-19 11:30:00', '2025-02-19 11:30:00', 'Reliable and trustworthy with excellent references.', 'ACCEPTED', '998aec76-87ca-42bc-9669-4ad096f2b2bc');

-- Insert applicants into junction table for Job 112
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(112, 536), (112, 537), (112, 538), (112, 539);

-- Job Post 113: Delivery Person (COMPLETED, max 5)
-- INSERT 5 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-19 12:00:00', '2025-02-19 12:00:00', 'Reliable delivery person with own vehicle.', 'ACCEPTED', 'f2329eb0-4cba-4674-8822-d55099046642'),
('2025-02-19 12:05:00', '2025-02-19 12:05:00', 'Familiar with the Dublin area.', 'ACCEPTED', '5d95a781-aab6-4ba2-87c3-e866034921a3'),
('2025-02-19 12:10:00', '2025-02-19 12:10:00', 'Prompt and efficient delivery service.', 'ACCEPTED', '029ec727-765b-4618-960e-d7a472fd10ad'),
('2025-02-19 12:20:00', '2025-02-19 12:20:00', 'Careful handling of packages.', 'ACCEPTED', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8'),
('2025-02-19 12:30:00', '2025-02-19 12:30:00', 'Good communication skills.', 'ACCEPTED', '426b2c8b-9e01-43ce-ae38-d669fee55504');

-- Insert applicants into junction table for Job 113
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(113, 540), (113, 541), (113, 542), (113, 543), (113, 544);

-- Job Post 114: Pet Walker (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-24 13:00:00', '2025-02-24 13:00:00', 'Experienced pet walker, comfortable with dogs of all sizes.', 'PENDING', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7'),
('2025-02-24 13:30:00', '2025-02-24 13:30:00', 'Available for regular walks and playtime.', 'PENDING', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d'),
('2025-02-24 14:00:00', '2025-02-24 14:00:00', 'Reliable and caring, with a love for animals.', 'PENDING', '149644e7-f8dd-4204-9d3b-9b238cff0619');

-- Insert applicants into junction table for Job 114
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(114, 545), (114, 546), (114, 547);

-- Job Post 115: Handyman (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-19 14:00:00', '2025-02-19 14:00:00', 'Experienced handyman for small repairs and maintenance.', 'ACCEPTED', '3e790d49-d17a-4c7f-a74b-bd0aab21d346'),
('2025-02-19 14:10:00', '2025-02-19 14:10:00', 'Provides own tools and equipment.', 'ACCEPTED', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3'),
('2025-02-19 14:20:00', '2025-02-19 14:20:00', 'Reliable and efficient service.', 'ACCEPTED', '0c405703-5447-4460-a6cb-af102bb27f25'),
('2025-02-19 14:30:00', '2025-02-19 14:30:00', 'Available for various tasks around the house.', 'ACCEPTED', 'ab0fd215-410c-4204-add1-06b0fa64d03e');

-- Insert applicants into junction table for Job 115
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(115, 548), (115, 549), (115, 550), (115, 551);

-- Job Post 116: Grocery Shopper (OPEN, max 6)
-- INSERT 6 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-24 15:00:00', '2025-02-24 15:00:00', 'Efficient grocery shopper, familiar with local stores.', 'PENDING', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c'),
('2025-02-24 15:30:00', '2025-02-24 15:30:00', 'Careful selection of fresh produce and items.', 'PENDING', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d'),
('2025-02-24 16:00:00', '2025-02-24 16:00:00', 'Able to follow specific shopping lists.', 'PENDING', '33792185-d7af-4e48-8244-997e2ae1c8c4'),
('2025-02-24 16:30:00', '2025-02-24 16:30:00', 'Reliable and punctual with deliveries.', 'PENDING', '2223cdf9-ce32-4631-b272-5de4390187f6'),
('2025-02-24 17:00:00', '2025-02-24 17:00:00', 'Provides own transportation.', 'PENDING', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a'),
('2025-02-24 17:30:00', '2025-02-24 17:30:00', 'Good communication skills.', 'PENDING', '1380b38d-540c-4bfe-bcf6-0024081a8b0f');

-- Insert applicants into junction table for Job 116
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(116, 552), (116, 553), (116, 554), (116, 555), (116, 556), (116, 557);

-- Job Post 117: Cook (COMPLETED, max 5)
-- INSERT 5 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-19 16:00:00', '2025-02-19 16:00:00', 'Experienced cook for meal preparation.', 'ACCEPTED', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8'),
('2025-02-19 16:05:00', '2025-02-19 16:05:00', 'Can prepare a variety of dishes.', 'ACCEPTED', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27'),
('2025-02-19 16:10:00', '2025-02-19 16:10:00', 'Knowledgeable in food safety and hygiene.', 'ACCEPTED', 'f6f61fd2-0227-4176-af2c-6e358279312f'),
('2025-02-19 16:20:00', '2025-02-19 16:20:00', 'Available for flexible hours.', 'ACCEPTED', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14'),
('2025-02-19 16:30:00', '2025-02-19 16:30:00', 'Reliable and efficient service.', 'ACCEPTED', '9b796866-bda9-4102-9c56-bd62e1082f7d');

-- Insert applicants into junction table for Job 117
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(117, 558), (117, 559), (117, 560), (117, 561), (117, 562);

-- Job Post 118: Laundry Services (OPEN, max 4)
-- INSERT 4 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-24 17:00:00', '2025-02-24 17:00:00', 'Provides laundry pickup and delivery service.', 'PENDING', '3f327cb7-80ae-472f-86e1-085028b32bff'),
('2025-02-24 17:30:00', '2025-02-24 17:30:00', 'Careful handling of garments.', 'PENDING', 'b50517e9-8656-444a-a348-b0f53664e9cf'),
('2025-02-24 18:00:00', '2025-02-24 18:00:00', 'Offers washing, drying, and folding services.', 'PENDING', 'bacb833d-045c-4452-a880-6f607e4a6c05'),
('2025-02-24 18:30:00', '2025-02-24 18:30:00', 'Prompt and reliable service.', 'PENDING', '00a04b3b-1800-4ef5-8694-b5bef27be101');

-- Insert applicants into junction table for Job 118
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(118, 563), (118, 564), (118, 565), (118, 566);

-- Job Post 119: Gardener (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-19 18:00:00', '2025-02-19 18:00:00', 'Experienced gardener for landscaping and maintenance.', 'ACCEPTED', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0'),
('2025-02-19 18:15:00', '2025-02-19 18:15:00', 'Provides own gardening tools.', 'ACCEPTED', 'df9a7413-65fb-46c7-99a0-6f5f6243314c'),
('2025-02-19 18:30:00', '2025-02-19 18:30:00', 'Reliable and knowledgeable in plant care.', 'ACCEPTED', '290aa2e8-f6d7-4a66-a783-2a54aa109569');

-- Insert applicants into junction table for Job 119
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(119, 567), (119, 568), (119, 569);

-- Job Post 120: Painter (COMPLETED, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-19 19:00:00', '2025-02-19 19:00:00', 'Experienced painter for interior painting.', 'ACCEPTED', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f'),
('2025-02-19 19:10:00', '2025-02-19 19:10:00', 'Provides own painting supplies.', 'ACCEPTED', '2c289845-52e2-4f70-bfa4-7cab86b84dc0'),
('2025-02-19 19:20:00', '2025-02-19 19:20:00', 'Careful surface preparation and quality finish.', 'ACCEPTED', '0d786962-5188-43db-8b3f-b04adf206bb7'),
('2025-02-19 19:30:00', '2025-02-19 19:30:00', 'Reliable and efficient service.', 'ACCEPTED', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a');

-- Insert applicants into junction table for Job 120
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(120, 570), (120, 571), (120, 572), (120, 573);


















-- Job Post 121: Office Assistant (OPEN, max 4)
-- INSERT 4 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 10:00:00', '2025-02-25 10:00:00', 'Experienced office assistant with strong organizational skills.', 'PENDING', '28b456a9-0930-4690-ad53-299a39150e75'),
('2025-02-25 10:30:00', '2025-02-25 10:30:00', 'Proficient in Microsoft Office Suite.', 'PENDING', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38'),
('2025-02-25 11:00:00', '2025-02-25 11:00:00', 'Excellent communication and interpersonal skills.', 'PENDING', '955d9de5-2cc7-40c5-8b24-27fc737f12d9'),
('2025-02-25 11:30:00', '2025-02-25 11:30:00', 'Able to handle multiple tasks and prioritize effectively.', 'PENDING', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12');

-- Insert applicants into junction table for Job 121
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(121, 574), (121, 575), (121, 576), (121, 577);

-- Job Post 122: Warehouse Worker (IN_PROGRESS, max 5)
-- INSERT 5 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 11:00:00', '2025-02-20 11:00:00', 'Experienced warehouse worker for loading and unloading.', 'ACCEPTED', 'e7b803f3-61c3-4b40-a66d-922041bbb3db'),
('2025-02-20 11:10:00', '2025-02-20 11:10:00', 'Physically fit and able to lift heavy items.', 'ACCEPTED', '19dbb644-8669-43a8-9967-5c9beb74bee6'),
('2025-02-20 11:20:00', '2025-02-20 11:20:00', 'Familiar with warehouse safety procedures.', 'ACCEPTED', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578'),
('2025-02-20 11:30:00', '2025-02-20 11:30:00', 'Reliable and able to work in a team.', 'ACCEPTED', 'c79f9012-2fb8-4231-89d5-bc135e857449'),
('2025-02-20 11:40:00', '2025-02-20 11:40:00', 'Available for flexible hours, including weekends.', 'ACCEPTED', '5c9b860b-114a-4793-8fbc-672037defb88');

-- Insert applicants into junction table for Job 122
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(122, 578), (122, 579), (122, 580), (122, 581), (122, 582);

-- Job Post 123: Chef (COMPLETED, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 12:00:00', '2025-02-20 12:00:00', 'Experienced chef specializing in [Cuisine Type].', 'ACCEPTED', '76f3d814-f5ac-42fe-88cb-ea47c6284c72'),
('2025-02-20 12:15:00', '2025-02-20 12:15:00', 'Creative menu planning and food preparation skills.', 'ACCEPTED', '2d73a822-abad-4776-894e-eb6ea78600d6'),
('2025-02-20 12:30:00', '2025-02-20 12:30:00', 'Knowledgeable in food safety and sanitation.', 'ACCEPTED', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07');

-- Insert applicants into junction table for Job 123
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(123, 583), (123, 584), (123, 585);

-- Job Post 124: Tutor (OPEN, max 6)
-- INSERT 6 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 13:00:00', '2025-02-25 13:00:00', 'Experienced tutor for English and Math.', 'PENDING', 'c647cd9e-3757-481d-9423-b7e1136ebaa8'),
('2025-02-25 13:30:00', '2025-02-25 13:30:00', 'Patient and able to explain concepts clearly.', 'PENDING', '090e3603-529b-4a6e-bb17-ed95b3e25ddf'),
('2025-02-25 14:00:00', '2025-02-25 14:00:00', 'Provides personalized learning plans.', 'PENDING', 'ba866253-3826-49d0-ba8c-187b57157633'),
('2025-02-25 14:30:00', '2025-02-25 14:30:00', 'Flexible scheduling to accommodate student needs.', 'PENDING', '998aec76-87ca-42bc-9669-4ad096f2b2bc'),
('2025-02-25 15:00:00', '2025-02-25 15:00:00', 'Experience with various learning styles.', 'PENDING', 'f2329eb0-4cba-4674-8822-d55099046642'),
('2025-02-25 15:30:00', '2025-02-25 15:30:00', 'Proven track record of helping students improve grades.', 'PENDING', '5d95a781-aab6-4ba2-87c3-e866034921a3');

-- Insert applicants into junction table for Job 124
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(124, 586), (124, 587), (124, 588), (124, 589), (124, 590), (124, 591);

-- Job Post 125: Personal Shopper (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 14:00:00', '2025-02-20 14:00:00', 'Experienced personal shopper for various needs.', 'ACCEPTED', '029ec727-765b-4618-960e-d7a472fd10ad'),
('2025-02-20 14:10:00', '2025-02-20 14:10:00', 'Knowledgeable about local stores and products.', 'ACCEPTED', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8'),
('2025-02-20 14:20:00', '2025-02-20 14:20:00', 'Efficient and detail-oriented shopping service.', 'ACCEPTED', '426b2c8b-9e01-43ce-ae38-d669fee55504'),
('2025-02-20 14:30:00', '2025-02-20 14:30:00', 'Able to find the best deals and discounts.', 'ACCEPTED', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7');

-- Insert applicants into junction table for Job 125
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(125, 592), (125, 593), (125, 594), (125, 595);

-- Job Post 126: Cleaner (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 15:00:00', '2025-02-25 15:00:00', 'Experienced cleaner for deep cleaning services.', 'PENDING', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d'),
('2025-02-25 15:30:00', '2025-02-25 15:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', '149644e7-f8dd-4204-9d3b-9b238cff0619'),
('2025-02-25 16:00:00', '2025-02-25 16:00:00', 'Thorough and detail-oriented cleaning.', 'PENDING', '3e790d49-d17a-4c7f-a74b-bd0aab21d346'),
('2025-02-25 16:30:00', '2025-02-25 16:30:00', 'Reliable and trustworthy.', 'PENDING', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3'),
('2025-02-25 17:00:00', '2025-02-25 17:00:00', 'Flexible scheduling.', 'PENDING', '0c405703-5447-4460-a6cb-af102bb27f25');

-- Insert applicants into junction table for Job 126
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(126, 596), (126, 597), (126, 598), (126, 599), (126, 600);

-- Job Post 127: Event Coordinator (COMPLETED, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 16:00:00', '2025-02-20 16:00:00', 'Experienced event coordinator for conferences.', 'ACCEPTED', 'ab0fd215-410c-4204-add1-06b0fa64d03e'),
('2025-02-20 16:15:00', '2025-02-20 16:15:00', 'Detail-oriented and organized.', 'ACCEPTED', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c'),
('2025-02-20 16:30:00', '2025-02-20 16:30:00', 'Excellent communication and problem-solving skills.', 'ACCEPTED', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d');

-- Insert applicants into junction table for Job 127
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(127, 601), (127, 602), (127, 603);

-- Job Post 128: Landscaper (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 17:00:00', '2025-02-20 17:00:00', 'Experienced landscaper for outdoor work.', 'ACCEPTED', '33792185-d7af-4e48-8244-997e2ae1c8c4'),
('2025-02-20 17:10:00', '2025-02-20 17:10:00', 'Knowledgeable in plant care and landscaping design.', 'ACCEPTED', '2223cdf9-ce32-4631-b272-5de4390187f6'),
('2025-02-20 17:20:00', '2025-02-20 17:20:00', 'Provides own landscaping tools.', 'ACCEPTED', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a'),
('2025-02-20 17:30:00', '2025-02-20 17:30:00', 'Reliable and hardworking.', 'ACCEPTED', '1380b38d-540c-4bfe-bcf6-0024081a8b0f');

-- Insert applicants into junction table for Job 128
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(128, 604), (128, 605), (128, 606), (128, 607);

-- Job Post 129: Bartender (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 18:00:00', '2025-02-25 18:00:00', 'Experienced bartender with excellent customer service.', 'PENDING', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8'),
('2025-02-25 18:30:00', '2025-02-25 18:30:00', 'Knowledgeable in mixing various cocktails.', 'PENDING', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27'),
('2025-02-25 19:00:00', '2025-02-25 19:00:00', 'Able to work in a fast-paced environment.', 'PENDING', 'f6f61fd2-0227-4176-af2c-6e358279312f'),
('2025-02-25 19:30:00', '2025-02-25 19:30:00', 'Friendly and outgoing personality.', 'PENDING', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14'),
('2025-02-25 20:00:00', '2025-02-25 20:00:00', 'Available for evening and weekend shifts.', 'PENDING', '9b796866-bda9-4102-9c56-bd62e1082f7d');

-- Insert applicants into junction table for Job 129
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(129, 608), (129, 609), (129, 610), (129, 611), (129, 612);

-- Job Post 130: Delivery Driver (COMPLETED, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 19:00:00', '2025-02-20 19:00:00', 'Reliable delivery driver with own vehicle.', 'ACCEPTED', '3f327cb7-80ae-472f-86e1-085028b32bff'),
('2025-02-20 19:10:00', '2025-02-20 19:10:00', 'Familiar with the Limerick area.', 'ACCEPTED', 'b50517e9-8656-444a-a348-b0f53664e9cf'),
('2025-02-20 19:20:00', '2025-02-20 19:20:00', 'Prompt and efficient delivery service.', 'ACCEPTED', 'bacb833d-045c-4452-a880-6f607e4a6c05'),
('2025-02-20 19:30:00', '2025-02-20 19:30:00', 'Careful handling of packages.', 'ACCEPTED', '00a04b3b-1800-4ef5-8694-b5bef27be101');

-- Insert applicants into junction table for Job 130
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(130, 613), (130, 614), (130, 615), (130, 616);


















-- Job Post 131: Administrative Assistant (OPEN, max 4)
-- INSERT 4 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 10:00:00', '2025-02-25 10:00:00', 'Organized and efficient administrative assistant.', 'PENDING', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0'),
('2025-02-25 10:30:00', '2025-02-25 10:30:00', 'Proficient in Microsoft Office Suite and office management.', 'PENDING', 'df9a7413-65fb-46c7-99a0-6f5f6243314c'),
('2025-02-25 11:00:00', '2025-02-25 11:00:00', 'Excellent communication and interpersonal skills.', 'PENDING', '290aa2e8-f6d7-4a66-a783-2a54aa109569'),
('2025-02-25 11:30:00', '2025-02-25 11:30:00', 'Able to handle multiple tasks and prioritize effectively.', 'PENDING', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f');

-- Insert applicants into junction table for Job 131
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(131, 617), (131, 618), (131, 619), (131, 620);

-- Job Post 132: Delivery Driver (IN_PROGRESS, max 5)
-- INSERT 5 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 11:00:00', '2025-02-20 11:00:00', 'Reliable delivery driver with own vehicle.', 'ACCEPTED', '2c289845-52e2-4f70-bfa4-7cab86b84dc0'),
('2025-02-20 11:10:00', '2025-02-20 11:10:00', 'Familiar with the Limerick area.', 'ACCEPTED', '0d786962-5188-43db-8b3f-b04adf206bb7'),
('2025-02-20 11:20:00', '2025-02-20 11:20:00', 'Prompt and efficient delivery service.', 'ACCEPTED', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a'),
('2025-02-20 11:30:00', '2025-02-20 11:30:00', 'Careful handling of goods.', 'ACCEPTED', '28b456a9-0930-4690-ad53-299a39150e75'),
('2025-02-20 11:40:00', '2025-02-20 11:40:00', 'Good communication skills.', 'ACCEPTED', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38');

-- Insert applicants into junction table for Job 132
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(132, 621), (132, 622), (132, 623), (132, 624), (132, 625);

-- Job Post 133: Chef (COMPLETED, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 12:00:00', '2025-02-20 12:00:00', 'Experienced chef specializing in [Cuisine Type].', 'ACCEPTED', '955d9de5-2cc7-40c5-8b24-27fc737f12d9'),
('2025-02-20 12:15:00', '2025-02-20 12:15:00', 'Creative menu planning and food preparation skills.', 'ACCEPTED', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12'),
('2025-02-20 12:30:00', '2025-02-20 12:30:00', 'Knowledgeable in food safety and sanitation.', 'ACCEPTED', 'e7b803f3-61c3-4b40-a66d-922041bbb3db');

-- Insert applicants into junction table for Job 133
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(133, 626), (133, 627), (133, 628);

-- Job Post 134: Tutor (OPEN, max 6)
-- INSERT 6 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 13:00:00', '2025-02-25 13:00:00', 'Experienced tutor for Math and Science.', 'PENDING', '19dbb644-8669-43a8-9967-5c9beb74bee6'),
('2025-02-25 13:30:00', '2025-02-25 13:30:00', 'Patient and able to explain concepts clearly.', 'PENDING', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578'),
('2025-02-25 14:00:00', '2025-02-25 14:00:00', 'Provides personalized learning plans.', 'PENDING', 'c79f9012-2fb8-4231-89d5-bc135e857449'),
('2025-02-25 14:30:00', '2025-02-25 14:30:00', 'Flexible scheduling to accommodate student needs.', 'PENDING', '5c9b860b-114a-4793-8fbc-672037defb88'),
('2025-02-25 15:00:00', '2025-02-25 15:00:00', 'Experience with various learning styles.', 'PENDING', '76f3d814-f5ac-42fe-88cb-ea47c6284c72'),
('2025-02-25 15:30:00', '2025-02-25 15:30:00', 'Proven track record of helping students improve grades.', 'PENDING', '2d73a822-abad-4776-894e-eb6ea78600d6');

-- Insert applicants into junction table for Job 134
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(134, 629), (134, 630), (134, 631), (134, 632), (134, 633), (134, 634);

-- Job Post 135: Personal Shopper (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 14:00:00', '2025-02-20 14:00:00', 'Experienced personal shopper for various needs.', 'ACCEPTED', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07'),
('2025-02-20 14:10:00', '2025-02-20 14:10:00', 'Knowledgeable about local stores and products.', 'ACCEPTED', 'c647cd9e-3757-481d-9423-b7e1136ebaa8'),
('2025-02-20 14:20:00', '2025-02-20 14:20:00', 'Efficient and detail-oriented shopping service.', 'ACCEPTED', '090e3603-529b-4a6e-bb17-ed95b3e25ddf'),
('2025-02-20 14:30:00', '2025-02-20 14:30:00', 'Able to find the best deals and discounts.', 'ACCEPTED', 'ba866253-3826-49d0-ba8c-187b57157633');

-- Insert applicants into junction table for Job 135
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(135, 635), (135, 636), (135, 637), (135, 638);

-- Job Post 136: Cleaner (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 15:00:00', '2025-02-25 15:00:00', 'Experienced cleaner for deep cleaning services.', 'PENDING', '998aec76-87ca-42bc-9669-4ad096f2b2bc'),
('2025-02-25 15:30:00', '2025-02-25 15:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', 'f2329eb0-4cba-4674-8822-d55099046642'),
('2025-02-25 16:00:00', '2025-02-25 16:00:00', 'Thorough and detail-oriented cleaning.', 'PENDING', '5d95a781-aab6-4ba2-87c3-e866034921a3'),
('2025-02-25 16:30:00', '2025-02-25 16:30:00', 'Reliable and trustworthy.', 'PENDING', '029ec727-765b-4618-960e-d7a472fd10ad'),
('2025-02-25 17:00:00', '2025-02-25 17:00:00', 'Flexible scheduling.', 'PENDING', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8');

-- Insert applicants into junction table for Job 136
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(136, 639), (136, 640), (136, 641), (136, 642), (136, 643);

-- Job Post 137: Event Coordinator (COMPLETED, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 16:00:00', '2025-02-20 16:00:00', 'Experienced event coordinator for small events.', 'ACCEPTED', '426b2c8b-9e01-43ce-ae38-d669fee55504'),
('2025-02-20 16:15:00', '2025-02-20 16:15:00', 'Detail-oriented and organized.', 'ACCEPTED', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7'),
('2025-02-20 16:30:00', '2025-02-20 16:30:00', 'Excellent communication and problem-solving skills.', 'ACCEPTED', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d');

-- Insert applicants into junction table for Job 137
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(137, 644), (137, 645), (137, 646);

-- Job Post 138: Landscaper (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 17:00:00', '2025-02-20 17:00:00', 'Experienced landscaper for outdoor work.', 'ACCEPTED', '149644e7-f8dd-4204-9d3b-9b238cff0619'),
('2025-02-20 17:10:00', '2025-02-20 17:10:00', 'Knowledgeable in plant care and landscaping design.', 'ACCEPTED', '3e790d49-d17a-4c7f-a74b-bd0aab21d346'),
('2025-02-20 17:20:00', '2025-02-20 17:20:00', 'Provides own landscaping tools.', 'ACCEPTED', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3'),
('2025-02-20 17:30:00', '2025-02-20 17:30:00', 'Reliable and hardworking.', 'ACCEPTED', '0c405703-5447-4460-a6cb-af102bb27f25');

-- Insert applicants into junction table for Job 138
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(138, 647), (138, 648), (138, 649), (138, 650);

-- Job Post 139: Bartender (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 18:00:00', '2025-02-25 18:00:00', 'Experienced bartender with excellent customer service.', 'PENDING', 'ab0fd215-410c-4204-add1-06b0fa64d03e'),
('2025-02-25 18:30:00', '2025-02-25 18:30:00', 'Knowledgeable in mixing various cocktails.', 'PENDING', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c'),
('2025-02-25 19:00:00', '2025-02-25 19:00:00', 'Able to work in a fast-paced environment.', 'PENDING', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d'),
('2025-02-25 19:30:00', '2025-02-25 19:30:00', 'Friendly and outgoing personality.', 'PENDING', '33792185-d7af-4e48-8244-997e2ae1c8c4'),
('2025-02-25 20:00:00', '2025-02-25 20:00:00', 'Available for evening and weekend shifts.', 'PENDING', '2223cdf9-ce32-4631-b272-5de4390187f6');

-- Insert applicants into junction table for Job 139
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(139, 651), (139, 652), (139, 653), (139, 654), (139, 655);

-- Job Post 140: Delivery Driver (OPEN, max 4)
-- INSERT 4 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 19:00:00', '2025-02-25 19:00:00', 'Delivery driver for food delivery service in Limerick.', 'PENDING', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a'),
('2025-02-25 19:30:00', '2025-02-25 19:30:00', 'Own a reliable vehicle suitable for deliveries.', 'PENDING', '1380b38d-540c-4bfe-bcf6-0024081a8b0f'),
('2025-02-25 20:00:00', '2025-02-25 20:00:00', 'Familiar with the streets and neighborhoods of Limerick.', 'PENDING', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8'),
('2025-02-25 20:30:00', '2025-02-25 20:30:00', 'Available for flexible hours, including evenings and weekends.', 'PENDING', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27');

-- Insert applicants into junction table for Job 140
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(140, 656), (140, 657), (140, 658), (140, 659);






















-- Job Post 141: Customer Service Representative (OPEN, max 4)
-- INSERT 4 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 10:00:00', '2025-02-25 10:00:00', 'Experienced customer service representative with excellent communication skills.', 'PENDING', 'f6f61fd2-0227-4176-af2c-6e358279312f'),
('2025-02-25 10:30:00', '2025-02-25 10:30:00', 'Proficient in handling customer inquiries and resolving issues.', 'PENDING', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14'),
('2025-02-25 11:00:00', '2025-02-25 11:00:00', 'Able to work in a fast-paced environment and maintain a positive attitude.', 'PENDING', '9b796866-bda9-4102-9c56-bd62e1082f7d'),
('2025-02-25 11:30:00', '2025-02-25 11:30:00', 'Familiar with CRM software and customer service best practices.', 'PENDING', '3f327cb7-80ae-472f-86e1-085028b32bff');

-- Insert applicants into junction table for Job 141
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(141, 660), (141, 661), (141, 662), (141, 663);

-- Job Post 142: Warehouse Worker (IN_PROGRESS, max 5)
-- INSERT 5 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 11:00:00', '2025-02-20 11:00:00', 'Experienced warehouse worker for loading and unloading.', 'ACCEPTED', 'b50517e9-8656-444a-a348-b0f53664e9cf'),
('2025-02-20 11:10:00', '2025-02-20 11:10:00', 'Physically fit and able to lift heavy items.', 'ACCEPTED', 'bacb833d-045c-4452-a880-6f607e4a6c05'),
('2025-02-20 11:20:00', '2025-02-20 11:20:00', 'Familiar with warehouse safety procedures.', 'ACCEPTED', '00a04b3b-1800-4ef5-8694-b5bef27be101'),
('2025-02-20 11:30:00', '2025-02-20 11:30:00', 'Reliable and able to work in a team.', 'ACCEPTED', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0'),
('2025-02-20 11:40:00', '2025-02-20 11:40:00', 'Available for flexible hours, including weekends.', 'ACCEPTED', 'df9a7413-65fb-46c7-99a0-6f5f6243314c');

-- Insert applicants into junction table for Job 142
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(142, 664), (142, 665), (142, 666), (142, 667), (142, 668);

-- Job Post 143: Receptionist (COMPLETED, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 12:00:00', '2025-02-20 12:00:00', 'Experienced receptionist with excellent communication skills.', 'ACCEPTED', '290aa2e8-f6d7-4a66-a783-2a54aa109569'),
('2025-02-20 12:15:00', '2025-02-20 12:15:00', 'Proficient in Microsoft Office Suite and scheduling software.', 'ACCEPTED', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f'),
('2025-02-20 12:30:00', '2025-02-20 12:30:00', 'Friendly and professional demeanor.', 'ACCEPTED', '2c289845-52e2-4f70-bfa4-7cab86b84dc0');

-- Insert applicants into junction table for Job 143
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(143, 669), (143, 670), (143, 671);

-- Job Post 144: Delivery Driver (OPEN, max 6)
-- INSERT 6 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 13:00:00', '2025-02-25 13:00:00', 'Delivery driver for a courier service in Limerick.', 'PENDING', '0d786962-5188-43db-8b3f-b04adf206bb7'),
('2025-02-25 13:30:00', '2025-02-25 13:30:00', 'Own a reliable vehicle suitable for deliveries.', 'PENDING', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a'),
('2025-02-25 14:00:00', '2025-02-25 14:00:00', 'Familiar with the streets and neighborhoods of Limerick.', 'PENDING', '28b456a9-0930-4690-ad53-299a39150e75'),
('2025-02-25 14:30:00', '2025-02-25 14:30:00', 'Available for flexible hours, including evenings and weekends.', 'PENDING', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38'),
('2025-02-25 15:00:00', '2025-02-25 15:00:00', 'Excellent driving record and navigation skills.', 'PENDING', '955d9de5-2cc7-40c5-8b24-27fc737f12d9'),
('2025-02-25 15:30:00', '2025-02-25 15:30:00', 'Good communication and customer service skills.', 'PENDING', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12');

-- Insert applicants into junction table for Job 144
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(144, 672), (144, 673), (144, 674), (144, 675), (144, 676), (144, 677);

-- Job Post 145: Software Developer (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 14:00:00', '2025-02-20 14:00:00', 'Software developer for project work in Dublin.', 'ACCEPTED', 'e7b803f3-61c3-4b40-a66d-922041bbb3db'),
('2025-02-20 14:10:00', '2025-02-20 14:10:00', 'Proficient in programming languages such as Java, Python, or C++.', 'ACCEPTED', '19dbb644-8669-43a8-9967-5c9beb74bee6'),
('2025-02-20 14:20:00', '2025-02-20 14:20:00', 'Experience with software development methodologies.', 'ACCEPTED', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578'),
('2025-02-20 14:30:00', '2025-02-20 14:30:00', 'Strong problem-solving and debugging skills.', 'ACCEPTED', 'c79f9012-2fb8-4231-89d5-bc135e857449');

-- Insert applicants into junction table for Job 145
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(145, 678), (145, 679), (145, 680), (145, 681);

-- Job Post 146: Cleaner (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 15:00:00', '2025-02-25 15:00:00', 'Experienced cleaner for cleaning services in Limerick.', 'PENDING', '5c9b860b-114a-4793-8fbc-672037defb88'),
('2025-02-25 15:30:00', '2025-02-25 15:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', '76f3d814-f5ac-42fe-88cb-ea47c6284c72'),
('2025-02-25 16:00:00', '2025-02-25 16:00:00', 'Thorough and detail-oriented cleaning.', 'PENDING', '2d73a822-abad-4776-894e-eb6ea78600d6'),
('2025-02-25 16:30:00', '2025-02-25 16:30:00', 'Reliable and trustworthy.', 'PENDING', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07'),
('2025-02-25 17:00:00', '2025-02-25 17:00:00', 'Flexible scheduling.', 'PENDING', 'c647cd9e-3757-481d-9423-b7e1136ebaa8');

-- Insert applicants into junction table for Job 146
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(146, 682), (146, 683), (146, 684), (146, 685), (146, 686);

-- Job Post 147: Event Manager (COMPLETED, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 16:00:00', '2025-02-20 16:00:00', 'Experienced event manager for an upcoming event.', 'ACCEPTED', '090e3603-529b-4a6e-bb17-ed95b3e25ddf'),
('2025-02-20 16:15:00', '2025-02-20 16:15:00', 'Strong organizational and planning skills.', 'ACCEPTED', 'ba866253-3826-49d0-ba8c-187b57157633'),
('2025-02-20 16:30:00', '2025-02-20 16:30:00', 'Excellent communication and coordination abilities.', 'ACCEPTED', '998aec76-87ca-42bc-9669-4ad096f2b2bc');

-- Insert applicants into junction table for Job 147
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(147, 687), (147, 688), (147, 689);

-- Job Post 148: Chef (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 17:00:00', '2025-02-20 17:00:00', 'Seeking a chef for a restaurant in Limerick.', 'ACCEPTED', 'f2329eb0-4cba-4674-8822-d55099046642'),
('2025-02-20 17:10:00', '2025-02-20 17:10:00', 'Culinary expertise in various cuisines.', 'ACCEPTED', '5d95a781-aab6-4ba2-87c3-e866034921a3'),
('2025-02-20 17:20:00', '2025-02-20 17:20:00', 'Menu planning and food preparation skills.', 'ACCEPTED', '029ec727-765b-4618-960e-d7a472fd10ad'),
('2025-02-20 17:30:00', '2025-02-20 17:30:00', 'Knowledge of food safety and sanitation standards.', 'ACCEPTED', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8');

-- Insert applicants into junction table for Job 148
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(148, 690), (148, 691), (148, 692), (148, 693);

-- Job Post 149: Security Guard (OPEN, max 5)
-- INSERT 5 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 18:00:00', '2025-02-25 18:00:00', 'Security guard for a retail store in Dublin.', 'PENDING', '426b2c8b-9e01-43ce-ae38-d669fee55504'),
('2025-02-25 18:30:00', '2025-02-25 18:30:00', 'Vigilant and attentive to ensure safety and security.', 'PENDING', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7'),
('2025-02-25 19:00:00', '2025-02-25 19:00:00', 'Experience in monitoring surveillance equipment.', 'PENDING', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d'),
('2025-02-25 19:30:00', '2025-02-25 19:30:00', 'Good communication and conflict resolution skills.', 'PENDING', '149644e7-f8dd-4204-9d3b-9b238cff0619'),
('2025-02-25 20:00:00', '2025-02-25 20:00:00', 'Available for day and night shifts.', 'PENDING', '3e790d49-d17a-4c7f-a74b-bd0aab21d346');

-- Insert applicants into junction table for Job 149
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(149, 694), (149, 695), (149, 696), (149, 697), (149, 698);

-- Job Post 150: Photographer (OPEN, max 4)
-- INSERT 4 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 19:00:00', '2025-02-25 19:00:00', 'Photographer for events in Limerick.', 'PENDING', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3'),
('2025-02-25 19:30:00', '2025-02-25 19:30:00', 'Proficient in capturing high-quality images.', 'PENDING', '0c405703-5447-4460-a6cb-af102bb27f25'),
('2025-02-25 20:00:00', '2025-02-25 20:00:00', 'Experience with photo editing software.', 'PENDING', 'ab0fd215-410c-4204-add1-06b0fa64d03e'),
('2025-02-25 20:30:00', '2025-02-25 20:30:00', 'Creative and artistic approach to photography.', 'PENDING', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c');

-- Insert applicants into junction table for Job 150
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(150, 699), (150, 700), (150, 701), (150, 702);




















-- Job Post 151: Pet Sitting (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 20:00:00', '2025-02-25 20:00:00', 'Experienced pet sitter, comfortable with dogs.', 'PENDING', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d'),
('2025-02-25 20:30:00', '2025-02-25 20:30:00', 'Available for overnight pet sitting.', 'PENDING', '33792185-d7af-4e48-8244-997e2ae1c8c4');

-- Insert applicants into junction table for Job 151
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(151, 703), (151, 704);

-- Job Post 152: Gardening Help (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 21:00:00', '2025-02-20 21:00:00', 'Experienced gardener for home garden maintenance.', 'ACCEPTED', '2223cdf9-ce32-4631-b272-5de4390187f6'),
('2025-02-20 21:15:00', '2025-02-20 21:15:00', 'Provides own gardening tools.', 'ACCEPTED', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a'),
('2025-02-20 21:30:00', '2025-02-20 21:30:00', 'Knowledgeable in plant care and landscaping.', 'ACCEPTED', '1380b38d-540c-4bfe-bcf6-0024081a8b0f');

-- Insert applicants into junction table for Job 152
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(152, 705), (152, 706), (152, 707);

-- Job Post 153: Dog Walker (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 22:00:00', '2025-02-20 22:00:00', 'Experienced dog walker, available for daily walks.', 'ACCEPTED', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8'),
('2025-02-20 22:30:00', '2025-02-20 22:30:00', 'Reliable and responsible dog lover.', 'ACCEPTED', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27');

-- Insert applicants into junction table for Job 153
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(153, 708), (153, 709);

-- Job Post 154: Home Cleaning (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 23:00:00', '2025-02-25 23:00:00', 'Experienced house cleaner, thorough and efficient.', 'PENDING', 'f6f61fd2-0227-4176-af2c-6e358279312f'),
('2025-02-25 23:30:00', '2025-02-25 23:30:00', 'Provides own cleaning supplies.', 'PENDING', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14'),
('2025-02-26 00:00:00', '2025-02-26 00:00:00', 'Reliable and trustworthy with references.', 'PENDING', '9b796866-bda9-4102-9c56-bd62e1082f7d');

-- Insert applicants into junction table for Job 154
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(154, 710), (154, 711), (154, 712);

-- Job Post 155: Childcare (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 00:00:00', '2025-02-16 00:00:00', 'Experienced babysitter, available for evenings.', 'ACCEPTED', '3f327cb7-80ae-472f-86e1-085028b32bff');

-- Insert applicants into junction table for Job 155
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(155, 713);


-- Job Post 156: Personal Assistant (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 01:00:00', '2025-02-26 01:00:00', 'Organized and efficient personal assistant for errands and tasks.', 'PENDING', 'b50517e9-8656-444a-a348-b0f53664e9cf');

-- Insert applicants into junction table for Job 156
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(156, 714);

-- Job Post 157: Tutoring (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 02:00:00', '2025-02-16 02:00:00', 'Experienced tutor for various subjects.', 'ACCEPTED', 'bacb833d-045c-4452-a880-6f607e4a6c05'),
('2025-02-16 02:30:00', '2025-02-16 02:30:00', 'Patient and able to explain concepts clearly.', 'ACCEPTED', '00a04b3b-1800-4ef5-8694-b5bef27be101');

-- Insert applicants into junction table for Job 157
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(157, 715), (157, 716);

-- Job Post 158: Errands Help (OPEN, max 4)
-- INSERT 4 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 03:00:00', '2025-02-26 03:00:00', 'Available to run errands and assist with various tasks.', 'PENDING', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0'),
('2025-02-26 03:30:00', '2025-02-26 03:30:00', 'Reliable and efficient, with own transportation.', 'PENDING', 'df9a7413-65fb-46c7-99a0-6f5f6243314c'),
('2025-02-26 04:00:00', '2025-02-26 04:00:00', 'Familiar with the Kilkenny area.', 'PENDING', '290aa2e8-f6d7-4a66-a783-2a54aa109569'),
('2025-02-26 04:30:00', '2025-02-26 04:30:00', 'Good communication and organizational skills.', 'PENDING', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f');

-- Insert applicants into junction table for Job 158
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(158, 717), (158, 718), (158, 719), (158, 720);

-- Job Post 159: Car Wash (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 04:00:00', '2025-02-16 04:00:00', 'Experienced car washer, detail-oriented.', 'ACCEPTED', '2c289845-52e2-4f70-bfa4-7cab86b84dc0'),
('2025-02-16 04:30:00', '2025-02-16 04:30:00', 'Provides own cleaning supplies.', 'ACCEPTED', '0d786962-5188-43db-8b3f-b04adf206bb7');

-- Insert applicants into junction table for Job 159
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(159, 721), (159, 722);

-- Job Post 160: Moving Help (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 05:00:00', '2025-02-26 05:00:00', 'Strong and reliable, available for moving assistance.', 'PENDING', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a'),
('2025-02-26 05:30:00', '2025-02-26 05:30:00', 'Careful handling of boxes and furniture.', 'PENDING', '28b456a9-0930-4690-ad53-299a39150e75'),
('2025-02-26 06:00:00', '2025-02-26 06:00:00', 'Available for flexible hours.', 'PENDING', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38');

-- Insert applicants into junction table for Job 160
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(160, 723), (160, 724), (160, 725);



















-- Job Post 161: Tutoring Assistance (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 06:00:00', '2025-02-25 06:00:00', 'Experienced tutor for high school subjects.', 'PENDING', '955d9de5-2cc7-40c5-8b24-27fc737f12d9'),
('2025-02-25 06:30:00', '2025-02-25 06:30:00', 'Patient and able to explain concepts clearly.', 'PENDING', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12'),
('2025-02-25 07:00:00', '2025-02-25 07:00:00', 'Available for flexible tutoring hours.', 'PENDING', 'e7b803f3-61c3-4b40-a66d-922041bbb3db');

-- Insert applicants into junction table for Job 161
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(161, 726), (161, 727), (161, 728);

-- Job Post 162: Garden Maintenance (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 07:00:00', '2025-02-20 07:00:00', 'Experienced gardener for regular maintenance.', 'ACCEPTED', '19dbb644-8669-43a8-9967-5c9beb74bee6'),
('2025-02-20 07:30:00', '2025-02-20 07:30:00', 'Provides own gardening tools.', 'ACCEPTED', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578');

-- Insert applicants into junction table for Job 162
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(162, 729), (162, 730);

-- Job Post 163: House Cleaning (COMPLETED, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 08:00:00', '2025-02-20 08:00:00', 'Experienced house cleaner, thorough and efficient.', 'ACCEPTED', 'c79f9012-2fb8-4231-89d5-bc135e857449'),
('2025-02-20 08:10:00', '2025-02-20 08:10:00', 'Provides own cleaning supplies.', 'ACCEPTED', '5c9b860b-114a-4793-8fbc-672037defb88'),
('2025-02-20 08:20:00', '2025-02-20 08:20:00', 'Reliable and trustworthy with references.', 'ACCEPTED', '76f3d814-f5ac-42fe-88cb-ea47c6284c72'),
('2025-02-20 08:30:00', '2025-02-20 08:30:00', 'Flexible scheduling.', 'ACCEPTED', '2d73a822-abad-4776-894e-eb6ea78600d6');

-- Insert applicants into junction table for Job 163
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(163, 731), (163, 732), (163, 733), (163, 734);

-- Job Post 164: Errand Running (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 09:00:00', '2025-02-25 09:00:00', 'Available to run errands and assist with various tasks.', 'PENDING', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07'),
('2025-02-25 09:30:00', '2025-02-25 09:30:00', 'Reliable and efficient, with own transportation.', 'PENDING', 'c647cd9e-3757-481d-9423-b7e1136ebaa8');

-- Insert applicants into junction table for Job 164
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(164, 735), (164, 736);

-- Job Post 165: Pet Sitting (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 10:00:00', '2025-02-20 10:00:00', 'Experienced pet sitter, comfortable with dogs.', 'ACCEPTED', '090e3603-529b-4a6e-bb17-ed95b3e25ddf');

-- Insert applicants into junction table for Job 165
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(165, 737);

-- Job Post 166: Personal Shopper (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 11:00:00', '2025-02-25 11:00:00', 'Experienced personal shopper for various needs.', 'PENDING', 'ba866253-3826-49d0-ba8c-187b57157633');

-- Insert applicants into junction table for Job 166
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(166, 738);

-- Job Post 167: Moving Assistance (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 12:00:00', '2025-02-20 12:00:00', 'Strong and reliable, available for moving assistance.', 'ACCEPTED', '998aec76-87ca-42bc-9669-4ad096f2b2bc'),
('2025-02-20 12:30:00', '2025-02-20 12:30:00', 'Careful handling of boxes and furniture.', 'ACCEPTED', 'f2329eb0-4cba-4674-8822-d55099046642');

-- Insert applicants into junction table for Job 167
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(167, 739), (167, 740);

-- Job Post 168: Cleaning Help (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 13:00:00', '2025-02-25 13:00:00', 'Experienced cleaner for house cleaning.', 'PENDING', '5d95a781-aab6-4ba2-87c3-e866034921a3'),
('2025-02-25 13:30:00', '2025-02-25 13:30:00', 'Provides own cleaning supplies.', 'PENDING', '029ec727-765b-4618-960e-d7a472fd10ad'),
('2025-02-25 14:00:00', '2025-02-25 14:00:00', 'Reliable and trustworthy with references.', 'PENDING', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8');

-- Insert applicants into junction table for Job 168
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(168, 741), (168, 742), (168, 743);

-- Job Post 169: Childcare Assistance (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 14:00:00', '2025-02-20 14:00:00', 'Experienced babysitter, available for childcare.', 'ACCEPTED', '426b2c8b-9e01-43ce-ae38-d669fee55504'),
('2025-02-20 14:30:00', '2025-02-20 14:30:00', 'CPR and First Aid certified.', 'ACCEPTED', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7');

-- Insert applicants into junction table for Job 169
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(169, 744), (169, 745);

-- Job Post 170: Pet Care (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 15:00:00', '2025-02-25 15:00:00', 'Experienced pet care assistant for dog walking and feeding.', 'PENDING', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d'),
('2025-02-25 15:30:00', '2025-02-25 15:30:00', 'Reliable and caring, with a love for animals.', 'PENDING', '149644e7-f8dd-4204-9d3b-9b238cff0619'),
('2025-02-25 16:00:00', '2025-02-25 16:00:00', 'Available for flexible pet care hours.', 'PENDING', '3e790d49-d17a-4c7f-a74b-bd0aab21d346');

-- Insert applicants into junction table for Job 170
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(170, 746), (170, 747), (170, 748);



















-- Job Post 171: Tech Support Needed (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 16:00:00', '2025-02-25 16:00:00', 'Experienced in troubleshooting computer hardware and software issues.', 'PENDING', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3'),
('2025-02-25 16:30:00', '2025-02-25 16:30:00', 'Available for on-site tech support in Dublin.', 'PENDING', '0c405703-5447-4460-a6cb-af102bb27f25'),
('2025-02-25 17:00:00', '2025-02-25 17:00:00', 'Knowledgeable in network troubleshooting and repair.', 'PENDING', 'ab0fd215-410c-4204-add1-06b0fa64d03e');

-- Insert applicants into junction table for Job 171
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(171, 749), (171, 750), (171, 751);

-- Job Post 172: Grocery Shopping Help (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 17:00:00', '2025-02-20 17:00:00', 'Reliable grocery shopper, familiar with local stores.', 'ACCEPTED', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c'),
('2025-02-20 17:30:00', '2025-02-20 17:30:00', 'Careful selection of fresh produce and items.', 'ACCEPTED', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d');

-- Insert applicants into junction table for Job 172
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(172, 752), (172, 753);

-- Job Post 173: Personal Assistant (COMPLETED, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 18:00:00', '2025-02-20 18:00:00', 'Organized and efficient personal assistant for daily tasks.', 'ACCEPTED', '33792185-d7af-4e48-8244-997e2ae1c8c4');

-- Insert applicants into junction table for Job 173
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(173, 754);

-- Job Post 174: Tutoring Services (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 19:00:00', '2025-02-25 19:00:00', 'Experienced tutor for math and science subjects.', 'PENDING', '2223cdf9-ce32-4631-b272-5de4390187f6'),
('2025-02-25 19:30:00', '2025-02-25 19:30:00', 'Patient and able to explain concepts clearly.', 'PENDING', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a'),
('2025-02-25 20:00:00', '2025-02-25 20:00:00', 'Flexible scheduling to accommodate student needs.', 'PENDING', '1380b38d-540c-4bfe-bcf6-0024081a8b0f');

-- Insert applicants into junction table for Job 174
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(174, 755), (174, 756), (174, 757);

-- Job Post 175: Household Chores (IN_PROGRESS, max 4)
-- INSERT 4 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 20:00:00', '2025-02-20 20:00:00', 'Available to help with various household chores.', 'ACCEPTED', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8'),
('2025-02-20 20:10:00', '2025-02-20 20:10:00', 'Reliable and efficient with cleaning and organizing.', 'ACCEPTED', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27'),
('2025-02-20 20:20:00', '2025-02-20 20:20:00', 'Provides own cleaning supplies.', 'ACCEPTED', 'f6f61fd2-0227-4176-af2c-6e358279312f'),
('2025-02-20 20:30:00', '2025-02-20 20:30:00', 'Flexible scheduling.', 'ACCEPTED', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14');

-- Insert applicants into junction table for Job 175
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(175, 758), (175, 759), (175, 760), (175, 761);

-- Job Post 176: Lawn Care (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-20 21:00:00', '2025-02-20 21:00:00', 'Experienced in lawn mowing and maintenance.', 'ACCEPTED', '9b796866-bda9-4102-9c56-bd62e1082f7d'),
('2025-02-20 21:30:00', '2025-02-20 21:30:00', 'Provides own lawn care equipment.', 'ACCEPTED', '3f327cb7-80ae-472f-86e1-085028b32bff');

-- Insert applicants into junction table for Job 176
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(176, 762), (176, 763);

-- Job Post 177: Furniture Assembly (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 22:00:00', '2025-02-25 22:00:00', 'Experienced in assembling various types of furniture.', 'PENDING', 'b50517e9-8656-444a-a348-b0f53664e9cf'),
('2025-02-25 22:30:00', '2025-02-25 22:30:00', 'Provides own tools and follows instructions carefully.', 'PENDING', 'bacb833d-045c-4452-a880-6f607e4a6c05');

-- Insert applicants into junction table for Job 177
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(177, 764), (177, 765);

-- Job Post 178: Cleaning Services (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-25 23:00:00', '2025-02-25 23:00:00', 'Experienced cleaner for office cleaning services.', 'PENDING', '00a04b3b-1800-4ef5-8694-b5bef27be101'),
('2025-02-25 23:30:00', '2025-02-25 23:30:00', 'Provides own cleaning supplies.', 'PENDING', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0'),
('2025-02-26 00:00:00', '2025-02-26 00:00:00', 'Reliable and trustworthy.', 'PENDING', 'df9a7413-65fb-46c7-99a0-6f5f6243314c');

-- Insert applicants into junction table for Job 178
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(178, 766), (178, 767), (178, 768);

-- Job Post 179: Pet Walking (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 00:00:00', '2025-02-16 00:00:00', 'Experienced dog walker, available for daily walks.', 'ACCEPTED', '290aa2e8-f6d7-4a66-a783-2a54aa109569');

-- Insert applicants into junction table for Job 179
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(179, 769);

-- Job Post 180: Car Washing (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 01:00:00', '2025-02-26 01:00:00', 'Experienced car washer, detail-oriented.', 'PENDING', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f'),
('2025-02-26 01:30:00', '2025-02-26 01:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', '2c289845-52e2-4f70-bfa4-7cab86b84dc0');

-- Insert applicants into junction table for Job 180
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(180, 770), (180, 771);



















-- Job Post 181: Graphic Design Assistance (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced graphic designer for project assistance.', 'PENDING', '0d786962-5188-43db-8b3f-b04adf206bb7'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Proficient in Adobe Creative Suite.', 'PENDING', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a');

-- Insert applicants into junction table for Job 181
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(181, 772), (181, 773);

-- Job Post 182: Housekeeping Help (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 10:00:00', '2025-02-16 10:00:00', 'Experienced housekeeper for regular cleaning.', 'ACCEPTED', '28b456a9-0930-4690-ad53-299a39150e75'),
('2025-02-16 10:15:00', '2025-02-16 10:15:00', 'Provides own cleaning supplies.', 'ACCEPTED', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38'),
('2025-02-16 10:30:00', '2025-02-16 10:30:00', 'Reliable and trustworthy.', 'ACCEPTED', '955d9de5-2cc7-40c5-8b24-27fc737f12d9');

-- Insert applicants into junction table for Job 182
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(182, 774), (182, 775), (182, 776);

-- Job Post 183: Tech Support for Small Business (COMPLETED, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 11:00:00', '2025-02-16 11:00:00', 'Experienced tech support for small businesses.', 'ACCEPTED', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12');

-- Insert applicants into junction table for Job 183
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(183, 777);

-- Job Post 184: Personal Shopper (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Personal shopper for assistance with shopping tasks.', 'PENDING', 'e7b803f3-61c3-4b40-a66d-922041bbb3db'),
('2025-02-26 12:30:00', '2025-02-26 12:30:00', 'Knowledgeable about local stores and products.', 'PENDING', '19dbb644-8669-43a8-9967-5c9beb74bee6');

-- Insert applicants into junction table for Job 184
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(184, 778), (184, 779);

-- Job Post 185: Pet Sitting (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 13:00:00', '2025-02-16 13:00:00', 'Experienced pet sitter for weekends.', 'ACCEPTED', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578'),
('2025-02-16 13:30:00', '2025-02-16 13:30:00', 'Caring and responsible with pets.', 'ACCEPTED', 'c79f9012-2fb8-4231-89d5-bc135e857449');

-- Insert applicants into junction table for Job 185
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(185, 780), (185, 781);

-- Job Post 186: Laundry Services (COMPLETED, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 14:00:00', '2025-02-16 14:00:00', 'Provides laundry pickup and delivery service.', 'ACCEPTED', '5c9b860b-114a-4793-8fbc-672037defb88'),
('2025-02-16 14:15:00', '2025-02-16 14:15:00', 'Careful handling of garments.', 'ACCEPTED', '76f3d814-f5ac-42fe-88cb-ea47c6284c72'),
('2025-02-16 14:30:00', '2025-02-16 14:30:00', 'Offers washing, drying, and folding services.', 'ACCEPTED', '2d73a822-abad-4776-894e-eb6ea78600d6');

-- Insert applicants into junction table for Job 186
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(186, 782), (186, 783), (186, 784);

-- Job Post 187: Photography Services (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Experienced photographer for event coverage.', 'PENDING', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07');

-- Insert applicants into junction table for Job 187
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(187, 785);

-- Job Post 188: Food Delivery Assistance (OPEN, max 4)
-- INSERT 4 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 16:00:00', '2025-02-26 16:00:00', 'Reliable food delivery assistance.', 'PENDING', 'c647cd9e-3757-481d-9423-b7e1136ebaa8'),
('2025-02-26 16:30:00', '2025-02-26 16:30:00', 'Prompt and efficient delivery.', 'PENDING', '090e3603-529b-4a6e-bb17-ed95b3e25ddf'),
('2025-02-26 17:00:00', '2025-02-26 17:00:00', 'Own transportation provided.', 'PENDING', 'ba866253-3826-49d0-ba8c-187b57157633'),
('2025-02-26 17:30:00', '2025-02-26 17:30:00', 'Familiar with the Limerick area.', 'PENDING', '998aec76-87ca-42bc-9669-4ad096f2b2bc');

-- Insert applicants into junction table for Job 188
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(188, 786), (188, 787), (188, 788), (188, 789);

-- Job Post 189: Cleaning Help (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 17:00:00', '2025-02-16 17:00:00', 'Experienced cleaner for cleaning services.', 'ACCEPTED', 'f2329eb0-4cba-4674-8822-d55099046642'),
('2025-02-16 17:15:00', '2025-02-16 17:15:00', 'Provides own cleaning supplies.', 'ACCEPTED', '5d95a781-aab6-4ba2-87c3-e866034921a3'),
('2025-02-16 17:30:00', '2025-02-16 17:30:00', 'Thorough and detail-oriented.', 'ACCEPTED', '029ec727-765b-4618-960e-d7a472fd10ad');

-- Insert applicants into junction table for Job 189
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(189, 790), (189, 791), (189, 792);


-- Job Post 190: Moving Assistance (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Strong and reliable, available for moving assistance.', 'PENDING', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8'),
('2025-02-26 18:30:00', '2025-02-26 18:30:00', 'Careful handling of furniture and boxes.', 'PENDING', '426b2c8b-9e01-43ce-ae38-d669fee55504');

-- Insert applicants into junction table for Job 190
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(190, 793), (190, 794);
















-- Job Post 191: Event Coordinator Needed (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced event coordinator for corporate events.', 'PENDING', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Detail-oriented and organized with excellent communication skills.', 'PENDING', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d'),
('2025-02-26 10:00:00', '2025-02-26 10:00:00', 'Able to manage budgets, vendors, and timelines effectively.', 'PENDING', '149644e7-f8dd-4204-9d3b-9b238cff0619');

-- Insert applicants into junction table for Job 191
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(191, 795), (191, 796), (191, 797);

-- Job Post 192: Babysitting Services (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 10:00:00', '2025-02-16 10:00:00', 'Experienced babysitter available for weekend shifts.', 'ACCEPTED', '3e790d49-d17a-4c7f-a74b-bd0aab21d346'),
('2025-02-16 10:30:00', '2025-02-16 10:30:00', 'CPR and First Aid certified.', 'ACCEPTED', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3');

-- Insert applicants into junction table for Job 192
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(192, 798), (192, 799);

-- Job Post 193: Gardening Help (COMPLETED, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 11:00:00', '2025-02-16 11:00:00', 'Experienced gardener for garden maintenance.', 'ACCEPTED', '0c405703-5447-4460-a6cb-af102bb27f25');

-- Insert applicants into junction table for Job 193
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(193, 800);

-- Job Post 194: Dog Walking Services (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Experienced dog walker, available for daily walks.', 'PENDING', 'ab0fd215-410c-4204-add1-06b0fa64d03e'),
('2025-02-26 12:30:00', '2025-02-26 12:30:00', 'Reliable and responsible dog lover.', 'PENDING', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c');

-- Insert applicants into junction table for Job 194
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(194, 801), (194, 802);

-- Job Post 195: House Cleaning Assistance (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 13:00:00', '2025-02-16 13:00:00', 'Experienced house cleaner, thorough and efficient.', 'ACCEPTED', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d'),
('2025-02-16 13:15:00', '2025-02-16 13:15:00', 'Provides own cleaning supplies.', 'ACCEPTED', '33792185-d7af-4e48-8244-997e2ae1c8c4'),
('2025-02-16 13:30:00', '2025-02-16 13:30:00', 'Reliable and trustworthy with references.', 'ACCEPTED', '2223cdf9-ce32-4631-b272-5de4390187f6');

-- Insert applicants into junction table for Job 195
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(195, 803), (195, 804), (195, 805);

-- Job Post 196: Furniture Assembly (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 14:00:00', '2025-02-26 14:00:00', 'Experienced in assembling various types of furniture.', 'PENDING', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a'),
('2025-02-26 14:30:00', '2025-02-26 14:30:00', 'Provides own tools and follows instructions carefully.', 'PENDING', '1380b38d-540c-4bfe-bcf6-0024081a8b0f');

-- Insert applicants into junction table for Job 196
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(196, 806), (196, 807);

-- Job Post 197: Tech Support for Home Office (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Experienced in setting up and troubleshooting home office equipment.', 'PENDING', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8');

-- Insert applicants into junction table for Job 197
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(197, 808);

-- Job Post 198: Tutoring Assistance for Kids (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 16:00:00', '2025-02-16 16:00:00', 'Experienced tutor for kids, various subjects.', 'ACCEPTED', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27'),
('2025-02-16 16:15:00', '2025-02-16 16:15:00', 'Patient and able to explain concepts clearly.', 'ACCEPTED', 'f6f61fd2-0227-4176-af2c-6e358279312f'),
('2025-02-16 16:30:00', '2025-02-16 16:30:00', 'Flexible scheduling to accommodate student needs.', 'ACCEPTED', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14');

-- Insert applicants into junction table for Job 198
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(198, 809), (198, 810), (198, 811);

-- Job Post 199: Moving Help (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 17:00:00', '2025-02-16 17:00:00', 'Strong and reliable, available for moving assistance.', 'ACCEPTED', '9b796866-bda9-4102-9c56-bd62e1082f7d'),
('2025-02-16 17:30:00', '2025-02-16 17:30:00', 'Careful handling of boxes and furniture.', 'ACCEPTED', '3f327cb7-80ae-472f-86e1-085028b32bff');

-- Insert applicants into junction table for Job 199
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(199, 812), (199, 813);

-- Job Post 200: Personal Assistant Needed (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Organized and efficient personal assistant for daily tasks.', 'PENDING', 'b50517e9-8656-444a-a348-b0f53664e9cf'),
('2025-02-26 18:30:00', '2025-02-26 18:30:00', 'Excellent communication and time management skills.', 'PENDING', 'bacb833d-045c-4452-a880-6f607e4a6c05');

-- Insert applicants into junction table for Job 200
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(200, 814), (200, 815);

















-- Job Post 201: Home Repair Services (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced handyman for minor home repairs.', 'PENDING', '00a04b3b-1800-4ef5-8694-b5bef27be101'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Provides own tools and equipment.', 'PENDING', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0');

-- Insert applicants into junction table for Job 201
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(201, 816), (201, 817);

-- Job Post 202: Language Tutor (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 10:00:00', '2025-02-16 10:00:00', 'Experienced language tutor for evening classes.', 'ACCEPTED', 'df9a7413-65fb-46c7-99a0-6f5f6243314c'),
('2025-02-16 10:15:00', '2025-02-16 10:15:00', 'Patient and able to explain grammar concepts clearly.', 'ACCEPTED', '290aa2e8-f6d7-4a66-a783-2a54aa109569'),
('2025-02-16 10:30:00', '2025-02-16 10:30:00', 'Flexible scheduling to accommodate student needs.', 'ACCEPTED', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f');

-- Insert applicants into junction table for Job 202
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(202, 818), (202, 819), (202, 820);

-- Job Post 203: Pet Grooming Services (COMPLETED, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 11:00:00', '2025-02-16 11:00:00', 'Experienced pet groomer for dogs.', 'ACCEPTED', '2c289845-52e2-4f70-bfa4-7cab86b84dc0');

-- Insert applicants into junction table for Job 203
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(203, 821);

-- Job Post 204: Carpentry Work Needed (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Experienced carpenter for custom furniture work.', 'PENDING', '0d786962-5188-43db-8b3f-b04adf206bb7'),
('2025-02-26 12:30:00', '2025-02-26 12:30:00', 'Provides own tools and materials.', 'PENDING', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a');

-- Insert applicants into junction table for Job 204
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(204, 822), (204, 823);

-- Job Post 205: Cooking Assistance (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 13:00:00', '2025-02-16 13:00:00', 'Experienced home cook to prepare meals.', 'ACCEPTED', '28b456a9-0930-4690-ad53-299a39150e75'),
('2025-02-16 13:15:00', '2025-02-16 13:15:00', 'Able to follow recipes and dietary restrictions.', 'ACCEPTED', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38'),
('2025-02-16 13:30:00', '2025-02-16 13:30:00', 'Knowledgeable in food safety and hygiene.', 'ACCEPTED', '955d9de5-2cc7-40c5-8b24-27fc737f12d9');

-- Insert applicants into junction table for Job 205
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(205, 824), (205, 825), (205, 826);

-- Job Post 206: Plumbing Services (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 14:00:00', '2025-02-26 14:00:00', 'Licensed plumber to fix leaks in Limerick.', 'PENDING', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12'),
('2025-02-26 14:30:00', '2025-02-26 14:30:00', 'Available for emergency plumbing services.', 'PENDING', 'e7b803f3-61c3-4b40-a66d-922041bbb3db');

-- Insert applicants into junction table for Job 206
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(206, 827), (206, 828);

-- Job Post 207: Graphic Design Work (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Graphic designer for a small project in Dublin.', 'PENDING', '19dbb644-8669-43a8-9967-5c9beb74bee6');

-- Insert applicants into junction table for Job 207
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(207, 829);

-- Job Post 208: Elderly Care Assistance (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 16:00:00', '2025-02-16 16:00:00', 'Compassionate caregiver for elderly assistance.', 'ACCEPTED', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578'),
('2025-02-16 16:15:00', '2025-02-16 16:15:00', 'Patient and understanding, providing companionship.', 'ACCEPTED', 'c79f9012-2fb8-4231-89d5-bc135e857449'),
('2025-02-16 16:30:00', '2025-02-16 16:30:00', 'Experience with daily living assistance.', 'ACCEPTED', '5c9b860b-114a-4793-8fbc-672037defb88');

-- Insert applicants into junction table for Job 208
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(208, 830), (208, 831), (208, 832);

-- Job Post 209: Painting and Decorating (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 17:00:00', '2025-02-16 17:00:00', 'Experienced painter for interior painting.', 'ACCEPTED', '76f3d814-f5ac-42fe-88cb-ea47c6284c72'),
('2025-02-16 17:30:00', '2025-02-16 17:30:00', 'Provides own painting supplies and equipment.', 'ACCEPTED', '2d73a822-abad-4776-894e-eb6ea78600d6');

-- Insert applicants into junction table for Job 209
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(209, 833), (209, 834);

-- Job Post 210: Courier Services (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Courier for parcel deliveries in Limerick.', 'PENDING', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07'),
('2025-02-26 18:30:00', '2025-02-26 18:30:00', 'Reliable and efficient with own vehicle.', 'PENDING', 'c647cd9e-3757-481d-9423-b7e1136ebaa8');

-- Insert applicants into junction table for Job 210
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(210, 835), (210, 836);

















-- Job Post 211: Electrician Needed (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Licensed electrician for wiring issues in Dublin.', 'PENDING', '090e3603-529b-4a6e-bb17-ed95b3e25ddf'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Available for emergency electrical repairs.', 'PENDING', 'ba866253-3826-49d0-ba8c-187b57157633');

-- Insert applicants into junction table for Job 211
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(211, 837), (211, 838);

-- Job Post 212: Math Tutor (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 10:00:00', '2025-02-16 10:00:00', 'Experienced math tutor for high school students.', 'ACCEPTED', '998aec76-87ca-42bc-9669-4ad096f2b2bc'),
('2025-02-16 10:15:00', '2025-02-16 10:15:00', 'Patient and able to explain concepts clearly.', 'ACCEPTED', 'f2329eb0-4cba-4674-8822-d55099046642'),
('2025-02-16 10:30:00', '2025-02-16 10:30:00', 'Flexible scheduling to accommodate student needs.', 'ACCEPTED', '5d95a781-aab6-4ba2-87c3-e866034921a3');

-- Insert applicants into junction table for Job 212
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(212, 839), (212, 840), (212, 841);

-- Job Post 213: House Painting (COMPLETED, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 11:00:00', '2025-02-16 11:00:00', 'Experienced painter for house painting in Dublin.', 'ACCEPTED', '029ec727-765b-4618-960e-d7a472fd10ad');

-- Insert applicants into junction table for Job 213
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(213, 842);

-- Job Post 214: Moving Help Needed (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Strong and reliable, available for moving furniture.', 'PENDING', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8'),
('2025-02-26 12:30:00', '2025-02-26 12:30:00', 'Careful handling of belongings.', 'PENDING', '426b2c8b-9e01-43ce-ae38-d669fee55504');

-- Insert applicants into junction table for Job 214
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(214, 843), (214, 844);

-- Job Post 215: Home Deep Cleaning (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 13:00:00', '2025-02-16 13:00:00', 'Professional cleaner for deep cleaning services.', 'ACCEPTED', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7'),
('2025-02-16 13:15:00', '2025-02-16 13:15:00', 'Provides own cleaning supplies and equipment.', 'ACCEPTED', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d'),
('2025-02-16 13:30:00', '2025-02-16 13:30:00', 'Thorough and detail-oriented cleaning.', 'ACCEPTED', '149644e7-f8dd-4204-9d3b-9b238cff0619');

-- Insert applicants into junction table for Job 215
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(215, 845), (215, 846), (215, 847);

-- Job Post 216: Photography Services (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 14:00:00', '2025-02-26 14:00:00', 'Experienced photographer for event coverage.', 'PENDING', '3e790d49-d17a-4c7f-a74b-bd0aab21d346'),
('2025-02-26 14:30:00', '2025-02-26 14:30:00', 'Proficient in various photography styles.', 'PENDING', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3');

-- Insert applicants into junction table for Job 216
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(216, 848), (216, 849);

-- Job Post 217: Personal Trainer (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Certified personal trainer for morning sessions.', 'PENDING', '0c405703-5447-4460-a6cb-af102bb27f25');

-- Insert applicants into junction table for Job 217
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(217, 850);

-- Job Post 218: Childcare Services (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 16:00:00', '2025-02-16 16:00:00', 'Experienced babysitter for evening hours.', 'ACCEPTED', 'ab0fd215-410c-4204-add1-06b0fa64d03e'),
('2025-02-16 16:15:00', '2025-02-16 16:15:00', 'CPR and First Aid certified.', 'ACCEPTED', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c'),
('2025-02-16 16:30:00', '2025-02-16 16:30:00', 'Caring and responsible with children.', 'ACCEPTED', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d');

-- Insert applicants into junction table for Job 218
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(218, 851), (218, 852), (218, 853);

-- Job Post 219: Lawn Mowing Services (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 17:00:00', '2025-02-16 17:00:00', 'Experienced in lawn mowing and garden maintenance.', 'ACCEPTED', '33792185-d7af-4e48-8244-997e2ae1c8c4'),
('2025-02-16 17:30:00', '2025-02-16 17:30:00', 'Provides own lawn mower and tools.', 'ACCEPTED', '2223cdf9-ce32-4631-b272-5de4390187f6');

-- Insert applicants into junction table for Job 219
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(219, 854), (219, 855);

-- Job Post 220: IT Support (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'IT support for setting up a home network.', 'PENDING', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a'),
('2025-02-26 18:30:00', '2025-02-26 18:30:00', 'Troubleshooting network and computer issues.', 'PENDING', '1380b38d-540c-4bfe-bcf6-0024081a8b0f');

-- Insert applicants into junction table for Job 220
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(220, 856), (220, 857);



















-- Job Post 221: Plumber Needed (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Licensed plumber to fix leaking pipes.', 'PENDING', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Available for emergency plumbing services.', 'PENDING', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27');

-- Insert applicants into junction table for Job 221
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(221, 858), (221, 859);

-- Job Post 222: Guitar Lessons (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 10:00:00', '2025-02-16 10:00:00', 'Experienced guitar instructor for beginners.', 'ACCEPTED', 'f6f61fd2-0227-4176-af2c-6e358279312f'),
('2025-02-16 10:15:00', '2025-02-16 10:15:00', 'Patient and able to teach music theory.', 'ACCEPTED', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14'),
('2025-02-16 10:30:00', '2025-02-16 10:30:00', 'Flexible scheduling for lessons.', 'ACCEPTED', '9b796866-bda9-4102-9c56-bd62e1082f7d');

-- Insert applicants into junction table for Job 222
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(222, 860), (222, 861), (222, 862);

-- Job Post 223: Carpentry Work (COMPLETED, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 11:00:00', '2025-02-16 11:00:00', 'Experienced carpenter for custom shelves.', 'ACCEPTED', '3f327cb7-80ae-472f-86e1-085028b32bff');

-- Insert applicants into junction table for Job 223
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(223, 863);

-- Job Post 224: Office Cleaning (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Cleaner for a small office in Limerick.', 'PENDING', 'b50517e9-8656-444a-a348-b0f53664e9cf'),
('2025-02-26 12:30:00', '2025-02-26 12:30:00', 'Provides own cleaning supplies.', 'PENDING', 'bacb833d-045c-4452-a880-6f607e4a6c05');

-- Insert applicants into junction table for Job 224
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(224, 864), (224, 865);

-- Job Post 225: Painting Services (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 13:00:00', '2025-02-16 13:00:00', 'Experienced interior painter.', 'ACCEPTED', '00a04b3b-1800-4ef5-8694-b5bef27be101'),
('2025-02-16 13:15:00', '2025-02-16 13:15:00', 'Provides own painting supplies.', 'ACCEPTED', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0'),
('2025-02-16 13:30:00', '2025-02-16 13:30:00', 'Careful surface preparation and quality finish.', 'ACCEPTED', 'df9a7413-65fb-46c7-99a0-6f5f6243314c');

-- Insert applicants into junction table for Job 225
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(225, 866), (225, 867), (225, 868);

-- Job Post 226: Handyman Required (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 14:00:00', '2025-02-26 14:00:00', 'Handyman for general home repairs.', 'PENDING', '290aa2e8-f6d7-4a66-a783-2a54aa109569'),
('2025-02-26 14:30:00', '2025-02-26 14:30:00', 'Provides own tools and equipment.', 'PENDING', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f');

-- Insert applicants into junction table for Job 226
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(226, 869), (226, 870);

-- Job Post 227: Pet Grooming (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Pet groomer for a small dog in Dublin.', 'PENDING', '2c289845-52e2-4f70-bfa4-7cab86b84dc0');

-- Insert applicants into junction table for Job 227
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(227, 871);

-- Job Post 228: Homework Help (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 16:00:00', '2025-02-16 16:00:00', 'Tutor for evening homework sessions.', 'ACCEPTED', '0d786962-5188-43db-8b3f-b04adf206bb7'),
('2025-02-16 16:15:00', '2025-02-16 16:15:00', 'Patient and able to explain concepts clearly.', 'ACCEPTED', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a'),
('2025-02-16 16:30:00', '2025-02-16 16:30:00', 'Experience with various subjects.', 'ACCEPTED', '28b456a9-0930-4690-ad53-299a39150e75');

-- Insert applicants into junction table for Job 228
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(228, 872), (228, 873), (228, 874);

-- Job Post 229: Packing and Moving (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 17:00:00', '2025-02-16 17:00:00', 'Assistance with packing boxes for a move.', 'ACCEPTED', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38'),
('2025-02-16 17:30:00', '2025-02-16 17:30:00', 'Careful handling of belongings.', 'ACCEPTED', '955d9de5-2cc7-40c5-8b24-27fc737f12d9');

-- Insert applicants into junction table for Job 229
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(229, 875), (229, 876);

-- Job Post 230: Graphic Design Work (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Graphic designer to create a business logo.', 'PENDING', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12'),
('2025-02-26 18:30:00', '2025-02-26 18:30:00', 'Creative and experienced in branding.', 'PENDING', 'e7b803f3-61c3-4b40-a66d-922041bbb3db');

-- Insert applicants into junction table for Job 230
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(230, 877), (230, 878);



















-- Job Post 231: Electrician Needed (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Licensed electrician for wiring issues.', 'PENDING', '19dbb644-8669-43a8-9967-5c9beb74bee6'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Available for emergency electrical repairs.', 'PENDING', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578');

-- Insert applicants into junction table for Job 231
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(231, 879), (231, 880);

-- Job Post 232: Math Tutor Required (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 10:00:00', '2025-02-16 10:00:00', 'Experienced math tutor for high school level.', 'ACCEPTED', 'c79f9012-2fb8-4231-89d5-bc135e857449'),
('2025-02-16 10:15:00', '2025-02-16 10:15:00', 'Patient and able to explain concepts clearly.', 'ACCEPTED', '5c9b860b-114a-4793-8fbc-672037defb88'),
('2025-02-16 10:30:00', '2025-02-16 10:30:00', 'Flexible scheduling for tutoring sessions.', 'ACCEPTED', '76f3d814-f5ac-42fe-88cb-ea47c6284c72');

-- Insert applicants into junction table for Job 232
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(232, 881), (232, 882), (232, 883);

-- Job Post 233: Home Renovation Help (COMPLETED, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 11:00:00', '2025-02-16 11:00:00', 'Experienced handyman for home renovation tasks.', 'ACCEPTED', '2d73a822-abad-4776-894e-eb6ea78600d6');

-- Insert applicants into junction table for Job 233
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(233, 884);

-- Job Post 234: Pet Sitting Services (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Pet sitter for cat sitting over the weekend.', 'PENDING', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07'),
('2025-02-26 12:30:00', '2025-02-26 12:30:00', 'Reliable and caring, with experience with pets.', 'PENDING', 'c647cd9e-3757-481d-9423-b7e1136ebaa8');

-- Insert applicants into junction table for Job 234
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(234, 885), (234, 886);

-- Job Post 235: Cleaning Services (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 13:00:00', '2025-02-16 13:00:00', 'House cleaner for regular cleaning services.', 'ACCEPTED', '090e3603-529b-4a6e-bb17-ed95b3e25ddf'),
('2025-02-16 13:15:00', '2025-02-16 13:15:00', 'Provides own cleaning supplies.', 'ACCEPTED', 'ba866253-3826-49d0-ba8c-187b57157633'),
('2025-02-16 13:30:00', '2025-02-16 13:30:00', 'Thorough and detail-oriented cleaning.', 'ACCEPTED', '998aec76-87ca-42bc-9669-4ad096f2b2bc');

-- Insert applicants into junction table for Job 235
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(235, 887), (235, 888), (235, 889);

-- Job Post 236: Photography Needed (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 14:00:00', '2025-02-26 14:00:00', 'Photographer for a small event in Limerick.', 'PENDING', 'f2329eb0-4cba-4674-8822-d55099046642'),
('2025-02-26 14:30:00', '2025-02-26 14:30:00', 'Experience with event photography and editing.', 'PENDING', '5d95a781-aab6-4ba2-87c3-e866034921a3');

-- Insert applicants into junction table for Job 236
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(236, 890), (236, 891);

-- Job Post 237: Moving Assistance (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Strong and reliable, available for moving help.', 'PENDING', '029ec727-765b-4618-960e-d7a472fd10ad');

-- Insert applicants into junction table for Job 237
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(237, 892);

-- Job Post 238: Music Lessons (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 16:00:00', '2025-02-16 16:00:00', 'Piano instructor for beginner lessons.', 'ACCEPTED', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8'),
('2025-02-16 16:15:00', '2025-02-16 16:15:00', 'Patient and experienced in teaching music.', 'ACCEPTED', '426b2c8b-9e01-43ce-ae38-d669fee55504'),
('2025-02-16 16:30:00', '2025-02-16 16:30:00', 'Flexible scheduling for lessons.', 'ACCEPTED', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7');

-- Insert applicants into junction table for Job 238
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(238, 893), (238, 894), (238, 895);

-- Job Post 239: Garden Maintenance (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 17:00:00', '2025-02-16 17:00:00', 'Experienced gardener for garden upkeep.', 'ACCEPTED', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d'),
('2025-02-16 17:30:00', '2025-02-16 17:30:00', 'Provides own gardening tools.', 'ACCEPTED', '149644e7-f8dd-4204-9d3b-9b238cff0619');

-- Insert applicants into junction table for Job 239
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(239, 896), (239, 897);

-- Job Post 240: Website Development (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Web developer for a small business website.', 'PENDING', '3e790d49-d17a-4c7f-a74b-bd0aab21d346'),
('2025-02-26 18:30:00', '2025-02-26 18:30:00', 'Experience with HTML, CSS, and JavaScript.', 'PENDING', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3');

-- Insert applicants into junction table for Job 240
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(240, 898), (240, 899);

















-- Job Post 241: Gardener Needed (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced gardener for lawn mowing and bush trimming.', 'PENDING', '0c405703-5447-4460-a6cb-af102bb27f25'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Provides own gardening tools and equipment.', 'PENDING', 'ab0fd215-410c-4204-add1-06b0fa64d03e');

-- Insert applicants into junction table for Job 241
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(241, 900), (241, 901);

-- Job Post 242: Cleaner Required (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 10:00:00', '2025-02-16 10:00:00', 'Experienced cleaner for house cleaning and organizing.', 'ACCEPTED', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c'),
('2025-02-16 10:15:00', '2025-02-16 10:15:00', 'Provides own cleaning supplies.', 'ACCEPTED', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d'),
('2025-02-16 10:30:00', '2025-02-16 10:30:00', 'Thorough and detail-oriented cleaning.', 'ACCEPTED', '33792185-d7af-4e48-8244-997e2ae1c8c4');

-- Insert applicants into junction table for Job 242
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(242, 902), (242, 903), (242, 904);

-- Job Post 243: Furniture Assembly (COMPLETED, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 11:00:00', '2025-02-16 11:00:00', 'Experienced in assembling various types of furniture.', 'ACCEPTED', '2223cdf9-ce32-4631-b272-5de4390187f6');

-- Insert applicants into junction table for Job 243
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(243, 905);

-- Job Post 244: Pet Sitting Services (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Pet sitter for cat sitting over the weekend.', 'PENDING', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a'),
('2025-02-26 12:30:00', '2025-02-26 12:30:00', 'Reliable and caring, with experience with pets.', 'PENDING', '1380b38d-540c-4bfe-bcf6-0024081a8b0f');

-- Insert applicants into junction table for Job 244
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(244, 906), (244, 907);

-- Job Post 245: House Cleaner Needed (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 13:00:00', '2025-02-16 13:00:00', 'Experienced house cleaner for regular cleaning.', 'ACCEPTED', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8'),
('2025-02-16 13:15:00', '2025-02-16 13:15:00', 'Provides own cleaning supplies.', 'ACCEPTED', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27'),
('2025-02-16 13:30:00', '2025-02-16 13:30:00', 'Thorough and detail-oriented cleaning.', 'ACCEPTED', 'f6f61fd2-0227-4176-af2c-6e358279312f');

-- Insert applicants into junction table for Job 245
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(245, 908), (245, 909), (245, 910);

-- Job Post 246: Photographer Needed (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 14:00:00', '2025-02-26 14:00:00', 'Photographer for a small event in Limerick.', 'PENDING', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14'),
('2025-02-26 14:30:00', '2025-02-26 14:30:00', 'Experience with event photography and editing.', 'PENDING', '9b796866-bda9-4102-9c56-bd62e1082f7d');

-- Insert applicants into junction table for Job 246
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(246, 911), (246, 912);

-- Job Post 247: Moving Assistance (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Strong and reliable, available for moving help.', 'PENDING', '3f327cb7-80ae-472f-86e1-085028b32bff');

-- Insert applicants into junction table for Job 247
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(247, 913);

-- Job Post 248: Piano Lessons (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 16:00:00', '2025-02-16 16:00:00', 'Piano instructor for beginner lessons.', 'ACCEPTED', 'b50517e9-8656-444a-a348-b0f53664e9cf'),
('2025-02-16 16:15:00', '2025-02-16 16:15:00', 'Patient and experienced in teaching music.', 'ACCEPTED', 'bacb833d-045c-4452-a880-6f607e4a6c05'),
('2025-02-16 16:30:00', '2025-02-16 16:30:00', 'Flexible scheduling for lessons.', 'ACCEPTED', '00a04b3b-1800-4ef5-8694-b5bef27be101');

-- Insert applicants into junction table for Job 248
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(248, 914), (248, 915), (248, 916);

-- Job Post 249: Garden Maintenance (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-16 17:00:00', '2025-02-16 17:00:00', 'Experienced gardener for garden upkeep.', 'ACCEPTED', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0'),
('2025-02-16 17:30:00', '2025-02-16 17:30:00', 'Provides own gardening tools.', 'ACCEPTED', 'df9a7413-65fb-46c7-99a0-6f5f6243314c');

-- Insert applicants into junction table for Job 249
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(249, 917), (249, 918);

-- Job Post 250: Web Development Needed (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Web developer for a small business website.', 'PENDING', '290aa2e8-f6d7-4a66-a783-2a54aa109569'),
('2025-02-26 18:30:00', '2025-02-26 18:30:00', 'Experience with HTML, CSS, and JavaScript.', 'PENDING', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f');

-- Insert applicants into junction table for Job 250
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(250, 919), (250, 920);














-- Job Post 251: Painter Needed (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced painter for interior and exterior painting.', 'PENDING', '2c289845-52e2-4f70-bfa4-7cab86b84dc0'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Provides own painting supplies and equipment.', 'PENDING', '0d786962-5188-43db-8b3f-b04adf206bb7');

-- Insert applicants into junction table for Job 251
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(251, 921), (251, 922);

-- Job Post 252: House Cleaner Required (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 10:00:00', '2025-02-14 10:00:00', 'Experienced house cleaner for regular cleaning.', 'ACCEPTED', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a'),
('2025-02-14 10:15:00', '2025-02-14 10:15:00', 'Provides own cleaning supplies.', 'ACCEPTED', '28b456a9-0930-4690-ad53-299a39150e75'),
('2025-02-14 10:30:00', '2025-02-14 10:30:00', 'Thorough and detail-oriented cleaning.', 'ACCEPTED', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38');

-- Insert applicants into junction table for Job 252
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(252, 923), (252, 924), (252, 925);

-- Job Post 253: Gardener Needed (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 11:00:00', '2025-02-14 11:00:00', 'Experienced gardener for hedge trimming and lawn mowing.', 'ACCEPTED', '955d9de5-2cc7-40c5-8b24-27fc737f12d9'),
('2025-02-14 11:30:00', '2025-02-14 11:30:00', 'Provides own gardening tools.', 'ACCEPTED', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12');

-- Insert applicants into junction table for Job 253
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(253, 926), (253, 927);

-- Job Post 254: Dog Walker Required (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Dog walker for daily walks around Drogheda.', 'PENDING', 'e7b803f3-61c3-4b40-a66d-922041bbb3db');

-- Insert applicants into junction table for Job 254
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(254, 928);

-- Job Post 255: Plumber Needed (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 13:00:00', '2025-02-14 13:00:00', 'Licensed plumber to fix a leaking pipe.', 'ACCEPTED', '19dbb644-8669-43a8-9967-5c9beb74bee6');

-- Insert applicants into junction table for Job 255
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(255, 929);

-- Job Post 256: Photographer for Event (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 14:00:00', '2025-02-26 14:00:00', 'Photographer for a birthday event in Drogheda.', 'PENDING', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578'),
('2025-02-26 14:30:00', '2025-02-26 14:30:00', 'Experience with event photography and editing.', 'PENDING', 'c79f9012-2fb8-4231-89d5-bc135e857449');

-- Insert applicants into junction table for Job 256
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(256, 930), (256, 931);

-- Job Post 257: Tutor for Math Lessons (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Math tutor for kids in Dundalk.', 'PENDING', '5c9b860b-114a-4793-8fbc-672037defb88'),
('2025-02-26 15:30:00', '2025-02-26 15:30:00', 'Patient and able to explain concepts clearly.', 'PENDING', '76f3d814-f5ac-42fe-88cb-ea47c6284c72'),
('2025-02-26 16:00:00', '2025-02-26 16:00:00', 'Flexible scheduling for tutoring sessions.', 'PENDING', '2d73a822-abad-4776-894e-eb6ea78600d6');

-- Insert applicants into junction table for Job 257
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(257, 932), (257, 933), (257, 934);

-- Job Post 258: Housekeeper Needed (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 16:00:00', '2025-02-14 16:00:00', 'Experienced housekeeper for daily chores.', 'ACCEPTED', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07'),
('2025-02-14 16:15:00', '2025-02-14 16:15:00', 'Provides own cleaning supplies.', 'ACCEPTED', 'c647cd9e-3757-481d-9423-b7e1136ebaa8'),
('2025-02-14 16:30:00', '2025-02-14 16:30:00', 'Reliable and trustworthy.', 'ACCEPTED', '090e3603-529b-4a6e-bb17-ed95b3e25ddf');

-- Insert applicants into junction table for Job 258
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(258, 935), (258, 936), (258, 937);

-- Job Post 259: Moving Assistance (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 17:00:00', '2025-02-26 17:00:00', 'Strong and reliable, available for moving assistance.', 'PENDING', 'ba866253-3826-49d0-ba8c-187b57157633'),
('2025-02-26 17:30:00', '2025-02-26 17:30:00', 'Careful handling of furniture and boxes.', 'PENDING', '998aec76-87ca-42bc-9669-4ad096f2b2bc');

-- Insert applicants into junction table for Job 259
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(259, 938), (259, 939);

-- Job Post 260: Website Development Help (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Web developer for a portfolio site in Drogheda.', 'PENDING', 'f2329eb0-4cba-4674-8822-d55099046642'),
('2025-02-26 18:30:00', '2025-02-26 18:30:00', 'Experience with HTML, CSS, and JavaScript.', 'PENDING', '5d95a781-aab6-4ba2-87c3-e866034921a3');

-- Insert applicants into junction table for Job 260
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(260, 940), (260, 941);



















-- Job Post 261: Painter Needed (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced painter for interior and exterior painting.', 'PENDING', '029ec727-765b-4618-960e-d7a472fd10ad'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Provides own painting supplies and equipment.', 'PENDING', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8');

-- Insert applicants into junction table for Job 261
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(261, 942), (261, 943);

-- Job Post 262: House Cleaner Required (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 10:00:00', '2025-02-14 10:00:00', 'Experienced house cleaner for regular cleaning.', 'ACCEPTED', '426b2c8b-9e01-43ce-ae38-d669fee55504'),
('2025-02-14 10:15:00', '2025-02-14 10:15:00', 'Provides own cleaning supplies.', 'ACCEPTED', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7'),
('2025-02-14 10:30:00', '2025-02-14 10:30:00', 'Thorough and detail-oriented cleaning.', 'ACCEPTED', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d');

-- Insert applicants into junction table for Job 262
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(262, 944), (262, 945), (262, 946);

-- Job Post 263: Gardener Needed (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 11:00:00', '2025-02-14 11:00:00', 'Experienced gardener for hedge trimming and lawn mowing.', 'ACCEPTED', '149644e7-f8dd-4204-9d3b-9b238cff0619'),
('2025-02-14 11:30:00', '2025-02-14 11:30:00', 'Provides own gardening tools.', 'ACCEPTED', '3e790d49-d17a-4c7f-a74b-bd0aab21d346');

-- Insert applicants into junction table for Job 263
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(263, 947), (263, 948);

-- Job Post 264: Dog Walker Required (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Dog walker for daily walks around Drogheda.', 'PENDING', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3');

-- Insert applicants into junction table for Job 264
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(264, 949);

-- Job Post 265: Plumber Needed (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 13:00:00', '2025-02-14 13:00:00', 'Licensed plumber to fix a leak.', 'ACCEPTED', '0c405703-5447-4460-a6cb-af102bb27f25');

-- Insert applicants into junction table for Job 265
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(265, 950);

-- Job Post 266: Photographer for Event (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 14:00:00', '2025-02-26 14:00:00', 'Photographer for a wedding event in Drogheda.', 'PENDING', 'ab0fd215-410c-4204-add1-06b0fa64d03e'),
('2025-02-26 14:30:00', '2025-02-26 14:30:00', 'Experience with event photography and editing.', 'PENDING', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c');

-- Insert applicants into junction table for Job 266
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(266, 951), (266, 952);

-- Job Post 267: Tutor for Math Lessons (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Math tutor for kids in Dundalk.', 'PENDING', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d'),
('2025-02-26 15:30:00', '2025-02-26 15:30:00', 'Patient and able to explain concepts clearly.', 'PENDING', '33792185-d7af-4e48-8244-997e2ae1c8c4'),
('2025-02-26 16:00:00', '2025-02-26 16:00:00', 'Flexible scheduling for tutoring sessions.', 'PENDING', '2223cdf9-ce32-4631-b272-5de4390187f6');

-- Insert applicants into junction table for Job 267
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(267, 953), (267, 954), (267, 955);

-- Job Post 268: Housekeeper Needed (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 16:00:00', '2025-02-14 16:00:00', 'Experienced housekeeper for daily chores.', 'ACCEPTED', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a'),
('2025-02-14 16:15:00', '2025-02-14 16:15:00', 'Provides own cleaning supplies.', 'ACCEPTED', '1380b38d-540c-4bfe-bcf6-0024081a8b0f'),
('2025-02-14 16:30:00', '2025-02-14 16:30:00', 'Reliable and trustworthy.', 'ACCEPTED', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8');

-- Insert applicants into junction table for Job 268
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(268, 956), (268, 957), (268, 958);

-- Job Post 269: Moving Assistance (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 17:00:00', '2025-02-26 17:00:00', 'Strong and reliable, available for moving assistance.', 'PENDING', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27'),
('2025-02-26 17:30:00', '2025-02-26 17:30:00', 'Careful handling of furniture and boxes.', 'PENDING', 'f6f61fd2-0227-4176-af2c-6e358279312f');

-- Insert applicants into junction table for Job 269
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(269, 959), (269, 960);

-- Job Post 270: Website Development Help (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Web developer for a personal website in Drogheda.', 'PENDING', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14'),
('2025-02-26 18:30:00', '2025-02-26 18:30:00', 'Experience with HTML, CSS, and JavaScript.', 'PENDING', '9b796866-bda9-4102-9c56-bd62e1082f7d');

-- Insert applicants into junction table for Job 270
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(270, 961), (270, 962);















-- Job Post 271: Painter Needed (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced painter for wall painting in Dundalk.', 'PENDING', '3f327cb7-80ae-472f-86e1-085028b32bff'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Provides own painting supplies and equipment.', 'PENDING', 'b50517e9-8656-444a-a348-b0f53664e9cf');

-- Insert applicants into junction table for Job 271
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(271, 963), (271, 964);

-- Job Post 272: House Cleaner Required (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 10:00:00', '2025-02-14 10:00:00', 'Experienced house cleaner for regular cleaning.', 'ACCEPTED', 'bacb833d-045c-4452-a880-6f607e4a6c05'),
('2025-02-14 10:15:00', '2025-02-14 10:15:00', 'Provides own cleaning supplies.', 'ACCEPTED', '00a04b3b-1800-4ef5-8694-b5bef27be101'),
('2025-02-14 10:30:00', '2025-02-14 10:30:00', 'Thorough and detail-oriented cleaning.', 'ACCEPTED', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0');

-- Insert applicants into junction table for Job 272
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(272, 965), (272, 966), (272, 967);

-- Job Post 273: Gardener Needed (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 11:00:00', '2025-02-14 11:00:00', 'Experienced gardener for hedge trimming and lawn mowing.', 'ACCEPTED', 'df9a7413-65fb-46c7-99a0-6f5f6243314c'),
('2025-02-14 11:30:00', '2025-02-14 11:30:00', 'Provides own gardening tools.', 'ACCEPTED', '290aa2e8-f6d7-4a66-a783-2a54aa109569');

-- Insert applicants into junction table for Job 273
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(273, 968), (273, 969);

-- Job Post 274: Dog Walker Required (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Dog walker for daily walks around Drogheda.', 'PENDING', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f');

-- Insert applicants into junction table for Job 274
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(274, 970);

-- Job Post 275: Plumber Needed (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 13:00:00', '2025-02-14 13:00:00', 'Licensed plumber to fix a leaky pipe.', 'ACCEPTED', '2c289845-52e2-4f70-bfa4-7cab86b84dc0');

-- Insert applicants into junction table for Job 275
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(275, 971);

-- Job Post 276: Photographer for Event (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 14:00:00', '2025-02-26 14:00:00', 'Photographer for an event in Drogheda.', 'PENDING', '0d786962-5188-43db-8b3f-b04adf206bb7'),
('2025-02-26 14:30:00', '2025-02-26 14:30:00', 'Experience with event photography and editing.', 'PENDING', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a');

-- Insert applicants into junction table for Job 276
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(276, 972), (276, 973);

-- Job Post 277: Tutor for Math Lessons (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Math tutor for kids in Dundalk.', 'PENDING', '28b456a9-0930-4690-ad53-299a39150e75'),
('2025-02-26 15:30:00', '2025-02-26 15:30:00', 'Patient and able to explain concepts clearly.', 'PENDING', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38'),
('2025-02-26 16:00:00', '2025-02-26 16:00:00', 'Flexible scheduling for tutoring sessions.', 'PENDING', '955d9de5-2cc7-40c5-8b24-27fc737f12d9');

-- Insert applicants into junction table for Job 277
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(277, 974), (277, 975), (277, 976);

-- Job Post 278: Housekeeper Needed (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 16:00:00', '2025-02-14 16:00:00', 'Experienced housekeeper for daily chores.', 'ACCEPTED', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12'),
('2025-02-14 16:15:00', '2025-02-14 16:15:00', 'Provides own cleaning supplies.', 'ACCEPTED', 'e7b803f3-61c3-4b40-a66d-922041bbb3db'),
('2025-02-14 16:30:00', '2025-02-14 16:30:00', 'Reliable and trustworthy.', 'ACCEPTED', '19dbb644-8669-43a8-9967-5c9beb74bee6');

-- Insert applicants into junction table for Job 278
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(278, 977), (278, 978), (278, 979);

-- Job Post 279: Moving Assistance (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 17:00:00', '2025-02-26 17:00:00', 'Strong and reliable, available for moving assistance.', 'PENDING', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578'),
('2025-02-26 17:30:00', '2025-02-26 17:30:00', 'Careful handling of furniture and boxes.', 'PENDING', 'c79f9012-2fb8-4231-89d5-bc135e857449');

-- Insert applicants into junction table for Job 279
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(279, 980), (279, 981);

-- Job Post 280: Website Development Help (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Web developer for a portfolio site in Drogheda.', 'PENDING', '5c9b860b-114a-4793-8fbc-672037defb88'),
('2025-02-26 18:30:00', '2025-02-26 18:30:00', 'Experience with HTML, CSS, and JavaScript.', 'PENDING', '76f3d814-f5ac-42fe-88cb-ea47c6284c72');

-- Insert applicants into junction table for Job 280
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(280, 982), (280, 983);















-- Job Post 281: Electrician Needed (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Licensed electrician to fix wiring issues.', 'PENDING', '2d73a822-abad-4776-894e-eb6ea78600d6'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Available for emergency electrical repairs.', 'PENDING', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07');

-- Insert applicants into junction table for Job 281
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(281, 984), (281, 985);

-- Job Post 282: Window Cleaner Required (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 10:00:00', '2025-02-14 10:00:00', 'Experienced window cleaner, streak-free results.', 'ACCEPTED', 'c647cd9e-3757-481d-9423-b7e1136ebaa8'),
('2025-02-14 10:30:00', '2025-02-14 10:30:00', 'Provides own cleaning supplies and equipment.', 'ACCEPTED', '090e3603-529b-4a6e-bb17-ed95b3e25ddf');

-- Insert applicants into junction table for Job 282
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(282, 986), (282, 987);

-- Job Post 283: Painter for Interior Walls (COMPLETED, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 11:00:00', '2025-02-14 11:00:00', 'Experienced painter for interior walls.', 'ACCEPTED', 'ba866253-3826-49d0-ba8c-187b57157633'),
('2025-02-14 11:15:00', '2025-02-14 11:15:00', 'Provides own painting supplies.', 'ACCEPTED', '998aec76-87ca-42bc-9669-4ad096f2b2bc'),
('2025-02-14 11:30:00', '2025-02-14 11:30:00', 'Careful surface preparation and quality finish.', 'ACCEPTED', 'f2329eb0-4cba-4674-8822-d55099046642');

-- Insert applicants into junction table for Job 283
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(283, 988), (283, 989), (283, 990);

-- Job Post 284: House Cleaner Needed (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'House cleaner for regular cleaning in Drogheda.', 'PENDING', '5d95a781-aab6-4ba2-87c3-e866034921a3'),
('2025-02-26 12:30:00', '2025-02-26 12:30:00', 'Provides own cleaning supplies.', 'PENDING', '029ec727-765b-4618-960e-d7a472fd10ad');

-- Insert applicants into junction table for Job 284
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(284, 991), (284, 992);

-- Job Post 285: Handyman for Repairs (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 13:00:00', '2025-02-14 13:00:00', 'Experienced handyman for various home repairs.', 'ACCEPTED', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8');

-- Insert applicants into junction table for Job 285
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(285, 993);

-- Job Post 286: Photographer for Photoshoot (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 14:00:00', '2025-02-26 14:00:00', 'Photographer for a photoshoot in Drogheda.', 'PENDING', '426b2c8b-9e01-43ce-ae38-d669fee55504'),
('2025-02-26 14:30:00', '2025-02-26 14:30:00', 'Experience with portrait photography and editing.', 'PENDING', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7');

-- Insert applicants into junction table for Job 286
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(286, 994), (286, 995);

-- Job Post 287: Cleaner for Office (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Cleaner for maintaining office space in Dundalk.', 'PENDING', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d');

-- Insert applicants into junction table for Job 287
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(287, 996);

-- Job Post 288: Pet Sitter Required (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 16:00:00', '2025-02-14 16:00:00', 'Pet sitter to look after my dog.', 'ACCEPTED', '149644e7-f8dd-4204-9d3b-9b238cff0619'),
('2025-02-14 16:30:00', '2025-02-14 16:30:00', 'Caring and responsible with pets.', 'ACCEPTED', '3e790d49-d17a-4c7f-a74b-bd0aab21d346');

-- Insert applicants into junction table for Job 288
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(288, 997), (288, 998);

-- Job Post 289: Event Coordinator Needed (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 17:00:00', '2025-02-26 17:00:00', 'Event coordinator for an upcoming event.', 'PENDING', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3'),
('2025-02-26 17:30:00', '2025-02-26 17:30:00', 'Detail-oriented and organized.', 'PENDING', '0c405703-5447-4460-a6cb-af102bb27f25');

-- Insert applicants into junction table for Job 289
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(289, 999), (289, 1000);

-- Job Post 290: Carpenter for Furniture (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Carpenter to make custom furniture.', 'PENDING', 'ab0fd215-410c-4204-add1-06b0fa64d03e'),
('2025-02-26 18:30:00', '2025-02-26 18:30:00', 'Experience with woodworking and furniture design.', 'PENDING', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c');

-- Insert applicants into junction table for Job 290
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(290, 1001), (290, 1002);
















-- Job Post 291: Interior Painter Needed (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced painter for interior wall painting.', 'PENDING', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Provides own painting supplies and equipment.', 'PENDING', '33792185-d7af-4e48-8244-997e2ae1c8c4');

-- Insert applicants into junction table for Job 291
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(291, 1003), (291, 1004);

-- Job Post 292: Cleaner for Large House (IN_PROGRESS, max 3)
-- INSERT 3 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 10:00:00', '2025-02-14 10:00:00', 'Experienced cleaner for large house cleaning.', 'ACCEPTED', '2223cdf9-ce32-4631-b272-5de4390187f6'),
('2025-02-14 10:15:00', '2025-02-14 10:15:00', 'Provides own cleaning supplies.', 'ACCEPTED', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a'),
('2025-02-14 10:30:00', '2025-02-14 10:30:00', 'Thorough and detail-oriented cleaning.', 'ACCEPTED', '1380b38d-540c-4bfe-bcf6-0024081a8b0f');

-- Insert applicants into junction table for Job 292
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(292, 1005), (292, 1006), (292, 1007);

-- Job Post 293: Gardener for Garden Maintenance (COMPLETED, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 11:00:00', '2025-02-14 11:00:00', 'Experienced gardener for garden maintenance.', 'ACCEPTED', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8');

-- Insert applicants into junction table for Job 293
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(293, 1008);

-- Job Post 294: Tutor for Math Lessons (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Math tutor for lessons in Drogheda.', 'PENDING', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27');

-- Insert applicants into junction table for Job 294
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(294, 1009);

-- Job Post 295: Handyman Required (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 13:00:00', '2025-02-14 13:00:00', 'Handyman for various home repairs.', 'ACCEPTED', 'f6f61fd2-0227-4176-af2c-6e358279312f'),
('2025-02-14 13:30:00', '2025-02-14 13:30:00', 'Provides own tools and equipment.', 'ACCEPTED', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14');

-- Insert applicants into junction table for Job 295
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(295, 1010), (295, 1011);

-- Job Post 296: Dog Walker for Daily Walks (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 14:00:00', '2025-02-26 14:00:00', 'Dog walker for daily walks in Drogheda.', 'PENDING', '9b796866-bda9-4102-9c56-bd62e1082f7d');

-- Insert applicants into junction table for Job 296
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(296, 1012);

-- Job Post 297: Plumber Needed (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Licensed plumber to fix a leaking pipe.', 'PENDING', '3f327cb7-80ae-472f-86e1-085028b32bff');

-- Insert applicants into junction table for Job 297
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(297, 1013);

-- Job Post 298: Photographer for Event (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 16:00:00', '2025-02-14 16:00:00', 'Photographer for an event in Drogheda.', 'ACCEPTED', 'b50517e9-8656-444a-a348-b0f53664e9cf'),
('2025-02-14 16:30:00', '2025-02-14 16:30:00', 'Experience with event photography and editing.', 'ACCEPTED', 'bacb833d-045c-4452-a880-6f607e4a6c05');

-- Insert applicants into junction table for Job 298
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(298, 1014), (298, 1015);

-- Job Post 299: Moving Assistance (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 17:00:00', '2025-02-26 17:00:00', 'Strong and reliable, available for moving help.', 'PENDING', '00a04b3b-1800-4ef5-8694-b5bef27be101'),
('2025-02-26 17:30:00', '2025-02-26 17:30:00', 'Careful handling of furniture and boxes.', 'PENDING', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0');

-- Insert applicants into junction table for Job 299
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(299, 1016), (299, 1017);

-- Job Post 300: Website Development Help (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Web developer for a website in Drogheda.', 'PENDING', 'df9a7413-65fb-46c7-99a0-6f5f6243314c'),
('2025-02-26 18:30:00', '2025-02-26 18:30:00', 'Experience with HTML, CSS, and JavaScript.', 'PENDING', '290aa2e8-f6d7-4a66-a783-2a54aa109569');

-- Insert applicants into junction table for Job 300
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(300, 1018), (300, 1019);















-- Job Post 301: House Cleaner Needed (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced house cleaner for regular cleaning.', 'PENDING', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', '2c289845-52e2-4f70-bfa4-7cab86b84dc0');

-- Insert applicants into junction table for Job 301
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(301, 1020), (301, 1021);

-- Job Post 302: Pet Grooming Services (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 10:00:00', '2025-02-14 10:00:00', 'Professional groomer for dog grooming.', 'ACCEPTED', '0d786962-5188-43db-8b3f-b04adf206bb7');

-- Insert applicants into junction table for Job 302
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(302, 1022);

-- Job Post 303: Painter for Living Room (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 11:00:00', '2025-02-26 11:00:00', 'Experienced painter for living room painting.', 'PENDING', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a'),
('2025-02-26 11:30:00', '2025-02-26 11:30:00', 'Provides own painting supplies and equipment.', 'PENDING', '28b456a9-0930-4690-ad53-299a39150e75');

-- Insert applicants into junction table for Job 303
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(303, 1023), (303, 1024);

-- Job Post 304: Personal Trainer for Gym Sessions (COMPLETED, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 12:00:00', '2025-02-14 12:00:00', 'Certified personal trainer for gym sessions.', 'ACCEPTED', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38');

-- Insert applicants into junction table for Job 304
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(304, 1025);

-- Job Post 305: Carpenter for Custom Furniture (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 13:00:00', '2025-02-14 13:00:00', 'Experienced carpenter for custom furniture work.', 'ACCEPTED', '955d9de5-2cc7-40c5-8b24-27fc737f12d9'),
('2025-02-14 13:30:00', '2025-02-14 13:30:00', 'Provides own tools and materials.', 'ACCEPTED', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12');

-- Insert applicants into junction table for Job 305
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(305, 1026), (305, 1027);

-- Job Post 306: Photographer for Wedding (OPEN, max 3)
-- INSERT 3 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 14:00:00', '2025-02-26 14:00:00', 'Photographer for a wedding in Waterford.', 'PENDING', 'e7b803f3-61c3-4b40-a66d-922041bbb3db'),
('2025-02-26 14:30:00', '2025-02-26 14:30:00', 'Experience with wedding photography and editing.', 'PENDING', '19dbb644-8669-43a8-9967-5c9beb74bee6'),
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Provides own photography equipment.', 'PENDING', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578');

-- Insert applicants into junction table for Job 306
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(306, 1028), (306, 1029), (306, 1030);

-- Job Post 307: Housekeeper for Holiday Home (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Housekeeper for a holiday home in Kilkenny.', 'PENDING', 'c79f9012-2fb8-4231-89d5-bc135e857449');

-- Insert applicants into junction table for Job 307
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(307, 1031);

-- Job Post 308: Gardener for Garden Design (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 16:00:00', '2025-02-14 16:00:00', 'Experienced gardener for garden design and landscaping.', 'ACCEPTED', '5c9b860b-114a-4793-8fbc-672037defb88'),
('2025-02-14 16:30:00', '2025-02-14 16:30:00', 'Provides own gardening tools and equipment.', 'ACCEPTED', '76f3d814-f5ac-42fe-88cb-ea47c6284c72');

-- Insert applicants into junction table for Job 308
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(308, 1032), (308, 1033);

-- Job Post 309: Electrician for Home Wiring (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 17:00:00', '2025-02-26 17:00:00', 'Licensed electrician for home wiring in Kilkenny.', 'PENDING', '2d73a822-abad-4776-894e-eb6ea78600d6');

-- Insert applicants into junction table for Job 309
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(309, 1034);

-- Job Post 310: Delivery Driver for Small Business (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Delivery driver for a small business in Waterford.', 'PENDING', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07'),
('2025-02-26 18:30:00', '2025-02-26 18:30:00', 'Owns a reliable vehicle suitable for deliveries.', 'PENDING', 'c647cd9e-3757-481d-9423-b7e1136ebaa8');

-- Insert applicants into junction table for Job 310
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(310, 1035), (310, 1036);


















-- Job Post 311: House Cleaner for Spring Cleaning (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced house cleaner for spring cleaning.', 'PENDING', '090e3603-529b-4a6e-bb17-ed95b3e25ddf'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', 'ba866253-3826-49d0-ba8c-187b57157633');

-- Insert applicants into junction table for Job 311
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(311, 1037), (311, 1038);

-- Job Post 312: Dog Walker Needed (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 10:00:00', '2025-02-26 10:00:00', 'Dog walker for daily walks in Galway.', 'PENDING', '998aec76-87ca-42bc-9669-4ad096f2b2bc');

-- Insert applicants into junction table for Job 312
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(312, 1039);

-- Job Post 313: Home Painting Services (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 11:00:00', '2025-02-14 11:00:00', 'Experienced painter for house painting.', 'ACCEPTED', 'f2329eb0-4cba-4674-8822-d55099046642'),
('2025-02-14 11:30:00', '2025-02-14 11:30:00', 'Provides own painting supplies and equipment.', 'ACCEPTED', '5d95a781-aab6-4ba2-87c3-e866034921a3');

-- Insert applicants into junction table for Job 313
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(313, 1040), (313, 1041);

-- Job Post 314: Photographer for Family Photoshoot (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Photographer for a family photoshoot.', 'PENDING', '029ec727-765b-4618-960e-d7a472fd10ad');

-- Insert applicants into junction table for Job 314
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(314, 1042);

-- Job Post 315: Electrician for Home Repairs (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 13:00:00', '2025-02-26 13:00:00', 'Licensed electrician for home repairs.', 'PENDING', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8');

-- Insert applicants into junction table for Job 315
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(315, 1043);

-- Job Post 316: Personal Chef for Special Event (COMPLETED, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 14:00:00', '2025-02-14 14:00:00', 'Personal chef for a special event in Galway.', 'ACCEPTED', '426b2c8b-9e01-43ce-ae38-d669fee55504');

-- Insert applicants into junction table for Job 316
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(316, 1044);

-- Job Post 317: Gardener for Lawn Care (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Gardener for lawn maintenance in Cork.', 'PENDING', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7'),
('2025-02-26 15:30:00', '2025-02-26 15:30:00', 'Provides own gardening tools and equipment.', 'PENDING', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d');

-- Insert applicants into junction table for Job 317
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(317, 1045), (317, 1046);

-- Job Post 318: Nanny for Childcare (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 16:00:00', '2025-02-26 16:00:00', 'Nanny for childcare in Galway.', 'PENDING', '149644e7-f8dd-4204-9d3b-9b238cff0619');

-- Insert applicants into junction table for Job 318
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(318, 1047);

-- Job Post 319: Cleaner for Office Building (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 17:00:00', '2025-02-14 17:00:00', 'Experienced cleaner for office building in Cork.', 'ACCEPTED', '3e790d49-d17a-4c7f-a74b-bd0aab21d346');

-- Insert applicants into junction table for Job 319
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(319, 1048);

-- Job Post 320: Mover for Furniture Relocation (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Strong and reliable, available for moving furniture.', 'PENDING', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3'),
('2025-02-26 18:30:00', '2025-02-26 18:30:00', 'Careful handling of belongings during relocation.', 'PENDING', '0c405703-5447-4460-a6cb-af102bb27f25');

-- Insert applicants into junction table for Job 320
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(320, 1049), (320, 1050);




















-- Job Post 321: Furniture Assembly Service (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced in assembling various types of furniture.', 'PENDING', 'ab0fd215-410c-4204-add1-06b0fa64d03e'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Provides own tools and follows instructions carefully.', 'PENDING', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c');

-- Insert applicants into junction table for Job 321
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(321, 1051), (321, 1052);

-- Job Post 322: Cleaner for Deep Cleaning (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 10:00:00', '2025-02-14 10:00:00', 'Experienced cleaner for deep cleaning services.', 'ACCEPTED', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d'),
('2025-02-14 10:30:00', '2025-02-14 10:30:00', 'Provides own cleaning supplies and equipment.', 'ACCEPTED', '33792185-d7af-4e48-8244-997e2ae1c8c4');

-- Insert applicants into junction table for Job 322
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(322, 1053), (322, 1054);

-- Job Post 323: Plumber for Pipe Repair (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 11:00:00', '2025-02-26 11:00:00', 'Licensed plumber for pipe repair work.', 'PENDING', '2223cdf9-ce32-4631-b272-5de4390187f6');

-- Insert applicants into junction table for Job 323
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(323, 1055);

-- Job Post 324: Babysitter Needed (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Babysitter for weekend shifts in Clonmel.', 'PENDING', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a');

-- Insert applicants into junction table for Job 324
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(324, 1056);

-- Job Post 325: Electrician for Lighting Installation (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 13:00:00', '2025-02-26 13:00:00', 'Electrician to install new lighting.', 'PENDING', '1380b38d-540c-4bfe-bcf6-0024081a8b0f');

-- Insert applicants into junction table for Job 325
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(325, 1057);

-- Job Post 326: Cook for Birthday Party (COMPLETED, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 14:00:00', '2025-02-14 14:00:00', 'Cook for a birthday party in Clonmel.', 'ACCEPTED', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8');

-- Insert applicants into junction table for Job 326
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(326, 1058);

-- Job Post 327: Handyman for Odd Jobs (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Handyman for various odd jobs around the house.', 'PENDING', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27'),
('2025-02-26 15:30:00', '2025-02-26 15:30:00', 'Provides own tools and equipment.', 'PENDING', 'f6f61fd2-0227-4176-af2c-6e358279312f');

-- Insert applicants into junction table for Job 327
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(327, 1059), (327, 1060);

-- Job Post 328: Personal Shopper for Clothing (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 16:00:00', '2025-02-26 16:00:00', 'Personal shopper for a wardrobe update.', 'PENDING', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14');

-- Insert applicants into junction table for Job 328
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(328, 1061);

-- Job Post 329: Mover for Large Appliances (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 17:00:00', '2025-02-14 17:00:00', 'Mover for large appliance relocation.', 'ACCEPTED', '9b796866-bda9-4102-9c56-bd62e1082f7d'),
('2025-02-14 17:30:00', '2025-02-14 17:30:00', 'Careful handling of appliances during transport.', 'ACCEPTED', '3f327cb7-80ae-472f-86e1-085028b32bff');

-- Insert applicants into junction table for Job 329
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(329, 1062), (329, 1063);

-- Job Post 330: Event Planner for Wedding (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Event planner for a wedding in Clonmel.', 'PENDING', 'b50517e9-8656-444a-a348-b0f53664e9cf');

-- Insert applicants into junction table for Job 330
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(330, 1064);















-- Job Post 331: House Painter for Interior Walls (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced painter for interior walls in Athlone.', 'PENDING', 'bacb833d-045c-4452-a880-6f607e4a6c05'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Provides own painting supplies and equipment.', 'PENDING', '00a04b3b-1800-4ef5-8694-b5bef27be101');

-- Insert applicants into junction table for Job 331
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(331, 1065), (331, 1066);

-- Job Post 332: Cleaner for Office Space (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 10:00:00', '2025-02-14 10:00:00', 'Cleaner for office space in Ballina.', 'ACCEPTED', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0');

-- Insert applicants into junction table for Job 332
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(332, 1067);

-- Job Post 333: Tutor for Mathematics Lessons (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 11:00:00', '2025-02-26 11:00:00', 'Math tutor for lessons in Athlone.', 'PENDING', 'df9a7413-65fb-46c7-99a0-6f5f6243314c');

-- Insert applicants into junction table for Job 333
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(333, 1068);

-- Job Post 334: Babysitter Needed for Evening (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Babysitter for an evening in Ballina.', 'PENDING', '290aa2e8-f6d7-4a66-a783-2a54aa109569');

-- Insert applicants into junction table for Job 334
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(334, 1069);

-- Job Post 335: Electrician for Wiring Installation (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 13:00:00', '2025-02-26 13:00:00', 'Electrician to install new wiring in Athlone.', 'PENDING', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f');

-- Insert applicants into junction table for Job 335
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(335, 1070);

-- Job Post 336: Chef for Private Party (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 14:00:00', '2025-02-14 14:00:00', 'Chef for a private party in Ballina.', 'ACCEPTED', '2c289845-52e2-4f70-bfa4-7cab86b84dc0'),
('2025-02-14 14:30:00', '2025-02-14 14:30:00', 'Experience in catering and event cooking.', 'ACCEPTED', '0d786962-5188-43db-8b3f-b04adf206bb7');

-- Insert applicants into junction table for Job 336
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(336, 1071), (336, 1072);

-- Job Post 337: Gardener for Lawn Care (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Gardener for lawn maintenance in Athlone.', 'PENDING', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a');

-- Insert applicants into junction table for Job 337
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(337, 1073);

-- Job Post 338: Photographer for Event (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 16:00:00', '2025-02-26 16:00:00', 'Photographer for an event in Ballina.', 'PENDING', '28b456a9-0930-4690-ad53-299a39150e75');

-- Insert applicants into junction table for Job 338
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(338, 1074);

-- Job Post 339: Moving Assistance for Furniture (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 17:00:00', '2025-02-14 17:00:00', 'Moving assistance for furniture in Athlone.', 'ACCEPTED', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38'),
('2025-02-14 17:30:00', '2025-02-14 17:30:00', 'Strong and reliable, careful handling of items.', 'ACCEPTED', '955d9de5-2cc7-40c5-8b24-27fc737f12d9');

-- Insert applicants into junction table for Job 339
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(339, 1075), (339, 1076);

-- Job Post 340: Housekeeper for Daily Chores (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Housekeeper for daily chores in Ballina.', 'PENDING', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12');

-- Insert applicants into junction table for Job 340
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(340, 1077);
















-- Job Post 341: House Cleaner for Spring Cleaning (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced house cleaner for spring cleaning in Kilkenny.', 'PENDING', 'e7b803f3-61c3-4b40-a66d-922041bbb3db'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', '19dbb644-8669-43a8-9967-5c9beb74bee6');

-- Insert applicants into junction table for Job 341
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(341, 1078), (341, 1079);

-- Job Post 342: Painter for Exterior House (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 10:00:00', '2025-02-14 10:00:00', 'Experienced painter for exterior house painting.', 'ACCEPTED', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578');

-- Insert applicants into junction table for Job 342
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(342, 1080);

-- Job Post 343: Tutor for English Lessons (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 11:00:00', '2025-02-26 11:00:00', 'English tutor for lessons in Kilkenny.', 'PENDING', 'c79f9012-2fb8-4231-89d5-bc135e857449');

-- Insert applicants into junction table for Job 343
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(343, 1081);

-- Job Post 344: Babysitter for Evening Shift (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Babysitter for an evening shift in Tullamore.', 'PENDING', '5c9b860b-114a-4793-8fbc-672037defb88');

-- Insert applicants into junction table for Job 344
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(344, 1082);

-- Job Post 345: Plumber for Leak Repair (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 13:00:00', '2025-02-26 13:00:00', 'Licensed plumber to fix a leak in Kilkenny.', 'PENDING', '76f3d814-f5ac-42fe-88cb-ea47c6284c72');

-- Insert applicants into junction table for Job 345
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(345, 1083);

-- Job Post 346: Cook for Private Dinner (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 14:00:00', '2025-02-14 14:00:00', 'Cook for a private dinner in Tullamore.', 'ACCEPTED', '2d73a822-abad-4776-894e-eb6ea78600d6'),
('2025-02-14 14:30:00', '2025-02-14 14:30:00', 'Experience in preparing multi-course meals.', 'ACCEPTED', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07');

-- Insert applicants into junction table for Job 346
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(346, 1084), (346, 1085);

-- Job Post 347: Gardener for Lawn Maintenance (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Gardener for lawn maintenance in Kilkenny.', 'PENDING', 'c647cd9e-3757-481d-9423-b7e1136ebaa8');

-- Insert applicants into junction table for Job 347
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(347, 1086);

-- Job Post 348: Photographer for Family Portraits (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 16:00:00', '2025-02-26 16:00:00', 'Photographer for family portraits in Tullamore.', 'PENDING', '090e3603-529b-4a6e-bb17-ed95b3e25ddf');

-- Insert applicants into junction table for Job 348
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(348, 1087);

-- Job Post 349: Mover for Relocation Services (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 17:00:00', '2025-02-14 17:00:00', 'Mover for relocation services in Kilkenny.', 'ACCEPTED', 'ba866253-3826-49d0-ba8c-187b57157633'),
('2025-02-14 17:30:00', '2025-02-14 17:30:00', 'Strong and reliable, careful handling of items.', 'ACCEPTED', '998aec76-87ca-42bc-9669-4ad096f2b2bc');

-- Insert applicants into junction table for Job 349
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(349, 1088), (349, 1089);

-- Job Post 350: Housekeeper for Daily Chores (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Housekeeper for daily chores in Tullamore.', 'PENDING', 'f2329eb0-4cba-4674-8822-d55099046642');

-- Insert applicants into junction table for Job 350
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(350, 1090);














-- Job Post 351: House Cleaner for Deep Clean (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced house cleaner for deep cleaning in Tralee.', 'PENDING', '5d95a781-aab6-4ba2-87c3-e866034921a3'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', '029ec727-765b-4618-960e-d7a472fd10ad');

-- Insert applicants into junction table for Job 351
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(351, 1091), (351, 1092);

-- Job Post 352: Painter for Interior Walls (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 10:00:00', '2025-02-14 10:00:00', 'Experienced painter for interior walls in Kilkenny.', 'ACCEPTED', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8');

-- Insert applicants into junction table for Job 352
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(352, 1093);

-- Job Post 353: Tutor for Science Lessons (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 11:00:00', '2025-02-26 11:00:00', 'Science tutor for lessons in Tralee.', 'PENDING', '426b2c8b-9e01-43ce-ae38-d669fee55504');

-- Insert applicants into junction table for Job 353
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(353, 1094);

-- Job Post 354: Babysitter for Weekend Care (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Babysitter for weekend care in Kilkenny.', 'PENDING', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7');

-- Insert applicants into junction table for Job 354
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(354, 1095);

-- Job Post 355: Plumber for Pipe Repair (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 13:00:00', '2025-02-26 13:00:00', 'Licensed plumber to repair a pipe in Tralee.', 'PENDING', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d');

-- Insert applicants into junction table for Job 355
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(355, 1096);

-- Job Post 356: Cook for Family Dinner (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 14:00:00', '2025-02-14 14:00:00', 'Cook for a family dinner in Kilkenny.', 'ACCEPTED', '149644e7-f8dd-4204-9d3b-9b238cff0619'),
('2025-02-14 14:30:00', '2025-02-14 14:30:00', 'Experience in preparing multi-course meals.', 'ACCEPTED', '3e790d49-d17a-4c7f-a74b-bd0aab21d346');

-- Insert applicants into junction table for Job 356
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(356, 1097), (356, 1098);

-- Job Post 357: Gardener for Landscaping (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Gardener for landscaping in Tralee.', 'PENDING', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3');

-- Insert applicants into junction table for Job 357
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(357, 1099);

-- Job Post 358: Photographer for Event (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 16:00:00', '2025-02-26 16:00:00', 'Photographer for an event in Kilkenny.', 'PENDING', '0c405703-5447-4460-a6cb-af102bb27f25');

-- Insert applicants into junction table for Job 358
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(358, 1100);

-- Job Post 359: Mover for Relocation Services (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 17:00:00', '2025-02-14 17:00:00', 'Mover for relocation services in Tralee.', 'ACCEPTED', 'ab0fd215-410c-4204-add1-06b0fa64d03e'),
('2025-02-14 17:30:00', '2025-02-14 17:30:00', 'Strong and reliable, careful handling of items.', 'ACCEPTED', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c');

-- Insert applicants into junction table for Job 359
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(359, 1101), (359, 1102);

-- Job Post 360: Housekeeper for Weekly Chores (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Housekeeper for weekly chores in Kilkenny.', 'PENDING', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d');

-- Insert applicants into junction table for Job 360
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(360, 1103);

















-- Job Post 361: House Cleaner for Spring Cleaning (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced house cleaner for spring cleaning in Limerick.', 'PENDING', '33792185-d7af-4e48-8244-997e2ae1c8c4'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', '2223cdf9-ce32-4631-b272-5de4390187f6');

-- Insert applicants into junction table for Job 361
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(361, 1104), (361, 1105);

-- Job Post 362: Painter for Exterior House (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 10:00:00', '2025-02-14 10:00:00', 'Experienced painter for exterior house painting.', 'ACCEPTED', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a');

-- Insert applicants into junction table for Job 362
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(362, 1106);

-- Job Post 363: Tutor for English Lessons (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 11:00:00', '2025-02-26 11:00:00', 'English tutor for lessons in Kilkenny.', 'PENDING', '1380b38d-540c-4bfe-bcf6-0024081a8b0f');

-- Insert applicants into junction table for Job 363
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(363, 1107);

-- Job Post 364: Babysitter for Evening Shift (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Babysitter for an evening shift in Tullamore.', 'PENDING', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8');

-- Insert applicants into junction table for Job 364
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(364, 1108);

-- Job Post 365: Plumber for Toilet Repair (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 13:00:00', '2025-02-26 13:00:00', 'Licensed plumber to fix a toilet in Limerick.', 'PENDING', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27');

-- Insert applicants into junction table for Job 365
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(365, 1109);

-- Job Post 366: Cook for Family Dinner (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 14:00:00', '2025-02-14 14:00:00', 'Cook for a family dinner in Killarney.', 'ACCEPTED', 'f6f61fd2-0227-4176-af2c-6e358279312f'),
('2025-02-14 14:30:00', '2025-02-14 14:30:00', 'Experience in preparing multi-course meals.', 'ACCEPTED', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14');

-- Insert applicants into junction table for Job 366
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(366, 1110), (366, 1111);

-- Job Post 367: Gardener for Lawn Maintenance (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Gardener for lawn maintenance in Limerick.', 'PENDING', '9b796866-bda9-4102-9c56-bd62e1082f7d');

-- Insert applicants into junction table for Job 367
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(367, 1112);

-- Job Post 368: Photographer for Event (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 16:00:00', '2025-02-26 16:00:00', 'Photographer for an event in Killarney.', 'PENDING', '3f327cb7-80ae-472f-86e1-085028b32bff');

-- Insert applicants into junction table for Job 368
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(368, 1113);

-- Job Post 369: Mover for Relocation Services (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 17:00:00', '2025-02-14 17:00:00', 'Mover for relocation services in Limerick.', 'ACCEPTED', 'b50517e9-8656-444a-a348-b0f53664e9cf'),
('2025-02-14 17:30:00', '2025-02-14 17:30:00', 'Strong and reliable, careful handling of items.', 'ACCEPTED', 'bacb833d-045c-4452-a880-6f607e4a6c05');

-- Insert applicants into junction table for Job 369
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(369, 1114), (369, 1115);

-- Job Post 370: Housekeeper for Daily Chores (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Housekeeper for daily chores in Killarney.', 'PENDING', '00a04b3b-1800-4ef5-8694-b5bef27be101');

-- Insert applicants into junction table for Job 370
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(370, 1116);















-- Job Post 371: Cleaner for Deep Clean (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced cleaner for deep cleaning in Wexford.', 'PENDING', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', 'df9a7413-65fb-46c7-99a0-6f5f6243314c');

-- Insert applicants into junction table for Job 371
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(371, 1117), (371, 1118);

-- Job Post 372: Painter for House Walls (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 10:00:00', '2025-02-14 10:00:00', 'Experienced painter for house walls in Mullingar.', 'ACCEPTED', '290aa2e8-f6d7-4a66-a783-2a54aa109569');

-- Insert applicants into junction table for Job 372
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(372, 1119);

-- Job Post 373: Tutor for English Lessons (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 11:00:00', '2025-02-26 11:00:00', 'English tutor for lessons in Wexford.', 'PENDING', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f');

-- Insert applicants into junction table for Job 373
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(373, 1120);

-- Job Post 374: Babysitter for Weekend Care (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Babysitter for weekend care in Mullingar.', 'PENDING', '2c289845-52e2-4f70-bfa4-7cab86b84dc0');

-- Insert applicants into junction table for Job 374
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(374, 1121);

-- Job Post 375: Plumber for Leaky Faucet (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 13:00:00', '2025-02-26 13:00:00', 'Licensed plumber to fix a leaky faucet in Wexford.', 'PENDING', '0d786962-5188-43db-8b3f-b04adf206bb7');

-- Insert applicants into junction table for Job 375
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(375, 1122);

-- Job Post 376: Cook for Family Dinner (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 14:00:00', '2025-02-14 14:00:00', 'Cook for a family dinner in Mullingar.', 'ACCEPTED', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a'),
('2025-02-14 14:30:00', '2025-02-14 14:30:00', 'Experience in preparing multi-course meals.', 'ACCEPTED', '28b456a9-0930-4690-ad53-299a39150e75');

-- Insert applicants into junction table for Job 376
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(376, 1123), (376, 1124);

-- Job Post 377: Gardener for Lawn Care (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Gardener for lawn care in Wexford.', 'PENDING', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38');

-- Insert applicants into junction table for Job 377
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(377, 1125);

-- Job Post 378: Photographer for Event (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 16:00:00', '2025-02-26 16:00:00', 'Photographer for an event in Mullingar.', 'PENDING', '955d9de5-2cc7-40c5-8b24-27fc737f12d9');

-- Insert applicants into junction table for Job 378
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(378, 1126);

-- Job Post 379: Mover for Relocation Services (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 17:00:00', '2025-02-14 17:00:00', 'Mover for relocation services in Wexford.', 'ACCEPTED', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12'),
('2025-02-14 17:30:00', '2025-02-14 17:30:00', 'Strong and reliable, careful handling of items.', 'ACCEPTED', 'e7b803f3-61c3-4b40-a66d-922041bbb3db');

-- Insert applicants into junction table for Job 379
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(379, 1127), (379, 1128);

-- Job Post 380: Housekeeper for Daily Chores (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Housekeeper for daily chores in Mullingar.', 'PENDING', '19dbb644-8669-43a8-9967-5c9beb74bee6');

-- Insert applicants into junction table for Job 380
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(380, 1129);













-- Job Post 381: Cleaner for Office Space (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced cleaner for office space in Navan.', 'PENDING', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', 'c79f9012-2fb8-4231-89d5-bc135e857449');

-- Insert applicants into junction table for Job 381
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(381, 1130), (381, 1131);

-- Job Post 382: Painter for House Interior (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 10:00:00', '2025-02-14 10:00:00', 'Experienced painter for house interior in Drogheda.', 'ACCEPTED', '5c9b860b-114a-4793-8fbc-672037defb88');

-- Insert applicants into junction table for Job 382
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(382, 1132);

-- Job Post 383: Tutor for History Lessons (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 11:00:00', '2025-02-26 11:00:00', 'History tutor for lessons in Navan.', 'PENDING', '76f3d814-f5ac-42fe-88cb-ea47c6284c72');

-- Insert applicants into junction table for Job 383
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(383, 1133);

-- Job Post 384: Babysitter for Evening Shift (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Babysitter for an evening shift in Drogheda.', 'PENDING', '2d73a822-abad-4776-894e-eb6ea78600d6');

-- Insert applicants into junction table for Job 384
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(384, 1134);

-- Job Post 385: Plumber for Leak Repair (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 13:00:00', '2025-02-26 13:00:00', 'Licensed plumber to fix a leak in Navan.', 'PENDING', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07');

-- Insert applicants into junction table for Job 385
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(385, 1135);

-- Job Post 386: Cook for Party Catering (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 14:00:00', '2025-02-14 14:00:00', 'Cook for party catering in Drogheda.', 'ACCEPTED', 'c647cd9e-3757-481d-9423-b7e1136ebaa8'),
('2025-02-14 14:30:00', '2025-02-14 14:30:00', 'Experience in preparing food for large events.', 'ACCEPTED', '090e3603-529b-4a6e-bb17-ed95b3e25ddf');

-- Insert applicants into junction table for Job 386
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(386, 1136), (386, 1137);

-- Job Post 387: Gardener for Lawn Maintenance (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Gardener for lawn maintenance in Navan.', 'PENDING', 'ba866253-3826-49d0-ba8c-187b57157633');

-- Insert applicants into junction table for Job 387
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(387, 1138);

-- Job Post 388: Photographer for Portrait Session (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 16:00:00', '2025-02-26 16:00:00', 'Photographer for a portrait session in Drogheda.', 'PENDING', '998aec76-87ca-42bc-9669-4ad096f2b2bc');

-- Insert applicants into junction table for Job 388
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(388, 1139);

-- Job Post 389: Mover for Furniture Relocation (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 17:00:00', '2025-02-14 17:00:00', 'Mover for furniture relocation in Navan.', 'ACCEPTED', 'f2329eb0-4cba-4674-8822-d55099046642'),
('2025-02-14 17:30:00', '2025-02-14 17:30:00', 'Strong and reliable, careful handling of items.', 'ACCEPTED', '5d95a781-aab6-4ba2-87c3-e866034921a3');

-- Insert applicants into junction table for Job 389
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(389, 1140), (389, 1141);

-- Job Post 390: Housekeeper for Weekly Chores (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Housekeeper for weekly chores in Drogheda.', 'PENDING', '029ec727-765b-4618-960e-d7a472fd10ad');

-- Insert applicants into junction table for Job 390
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(390, 1142);





















-- Job Post 391: Cleaner for Residential House (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced cleaner for residential house cleaning.', 'PENDING', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', '426b2c8b-9e01-43ce-ae38-d669fee55504');

-- Insert applicants into junction table for Job 391
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(391, 1143), (391, 1144);

-- Job Post 392: Painter for House Exterior (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 10:00:00', '2025-02-14 10:00:00', 'Experienced painter for house exterior painting.', 'ACCEPTED', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7');

-- Insert applicants into junction table for Job 392
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(392, 1145);

-- Job Post 393: Tutor for Maths Lessons (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 11:00:00', '2025-02-26 11:00:00', 'Math tutor for lessons in Carlow.', 'PENDING', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d');

-- Insert applicants into junction table for Job 393
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(393, 1146);

-- Job Post 394: Babysitter for Weekend Care (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Babysitter for weekend care in Arklow.', 'PENDING', '149644e7-f8dd-4204-9d3b-9b238cff0619');

-- Insert applicants into junction table for Job 394
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(394, 1147);

-- Job Post 395: Plumber for Drain Cleaning (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 13:00:00', '2025-02-26 13:00:00', 'Licensed plumber to clean drains in Carlow.', 'PENDING', '3e790d49-d17a-4c7f-a74b-bd0aab21d346');

-- Insert applicants into junction table for Job 395
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(395, 1148);

-- Job Post 396: Cook for Catering Service (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 14:00:00', '2025-02-14 14:00:00', 'Cook for a catering service in Arklow.', 'ACCEPTED', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3'),
('2025-02-14 14:30:00', '2025-02-14 14:30:00', 'Experience in preparing food for large events.', 'ACCEPTED', '0c405703-5447-4460-a6cb-af102bb27f25');

-- Insert applicants into junction table for Job 396
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(396, 1149), (396, 1150);

-- Job Post 397: Gardener for Landscaping (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Gardener for landscaping in Carlow.', 'PENDING', 'ab0fd215-410c-4204-add1-06b0fa64d03e');

-- Insert applicants into junction table for Job 397
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(397, 1151);

-- Job Post 398: Photographer for Family Photoshoot (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 16:00:00', '2025-02-26 16:00:00', 'Photographer for a family photoshoot in Arklow.', 'PENDING', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c');

-- Insert applicants into junction table for Job 398
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(398, 1152);

-- Job Post 399: Mover for Furniture Relocation (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 17:00:00', '2025-02-14 17:00:00', 'Mover for furniture relocation in Carlow.', 'ACCEPTED', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d'),
('2025-02-14 17:30:00', '2025-02-14 17:30:00', 'Strong and reliable, careful handling of items.', 'ACCEPTED', '33792185-d7af-4e48-8244-997e2ae1c8c4');

-- Insert applicants into junction table for Job 399
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(399, 1153), (399, 1154);

-- Job Post 400: Housekeeper for Daily Chores (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Housekeeper for daily chores in Arklow.', 'PENDING', '2223cdf9-ce32-4631-b272-5de4390187f6');

-- Insert applicants into junction table for Job 400
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(400, 1155);
















-- Job Post 401: Cleaner for Residential House (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced cleaner for residential house cleaning in Cork.', 'PENDING', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', '1380b38d-540c-4bfe-bcf6-0024081a8b0f');

-- Insert applicants into junction table for Job 401
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(401, 1156), (401, 1157);

-- Job Post 402: Painter for House Interior (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 10:00:00', '2025-02-14 10:00:00', 'Experienced painter for house interior in Tralee.', 'ACCEPTED', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8');

-- Insert applicants into junction table for Job 402
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(402, 1158);

-- Job Post 403: Tutor for English Lessons (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 11:00:00', '2025-02-26 11:00:00', 'English tutor for lessons in Cork.', 'PENDING', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27');

-- Insert applicants into junction table for Job 403
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(403, 1159);

-- Job Post 404: Babysitter for Evening Care (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Babysitter for evening care in Tralee.', 'PENDING', 'f6f61fd2-0227-4176-af2c-6e358279312f');

-- Insert applicants into junction table for Job 404
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(404, 1160);

-- Job Post 405: Plumber for Pipe Repair (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 13:00:00', '2025-02-26 13:00:00', 'Licensed plumber to repair pipes in Cork.', 'PENDING', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14');

-- Insert applicants into junction table for Job 405
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(405, 1161);

-- Job Post 406: Cook for Family Dinner (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 14:00:00', '2025-02-14 14:00:00', 'Cook for a family dinner in Tralee.', 'ACCEPTED', '9b796866-bda9-4102-9c56-bd62e1082f7d'),
('2025-02-14 14:30:00', '2025-02-14 14:30:00', 'Experience in preparing multi-course meals.', 'ACCEPTED', '3f327cb7-80ae-472f-86e1-085028b32bff');

-- Insert applicants into junction table for Job 406
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(406, 1162), (406, 1163);

-- Job Post 407: Gardener for Lawn Care (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Gardener for lawn care in Cork.', 'PENDING', 'b50517e9-8656-444a-a348-b0f53664e9cf');

-- Insert applicants into junction table for Job 407
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(407, 1164);

-- Job Post 408: Photographer for Wedding Photoshoot (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 16:00:00', '2025-02-26 16:00:00', 'Photographer for a wedding photoshoot in Tralee.', 'PENDING', 'bacb833d-045c-4452-a880-6f607e4a6c05');

-- Insert applicants into junction table for Job 408
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(408, 1165);

-- Job Post 409: Mover for Household Items (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 17:00:00', '2025-02-14 17:00:00', 'Mover for relocating household items in Cork.', 'ACCEPTED', '00a04b3b-1800-4ef5-8694-b5bef27be101'),
('2025-02-14 17:30:00', '2025-02-14 17:30:00', 'Strong and reliable, careful handling of items.', 'ACCEPTED', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0');

-- Insert applicants into junction table for Job 409
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(409, 1166), (409, 1167);

-- Job Post 410: Housekeeper for Weekly Chores (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Housekeeper for weekly chores in Tralee.', 'PENDING', 'df9a7413-65fb-46c7-99a0-6f5f6243314c');

-- Insert applicants into junction table for Job 410
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(410, 1168);


















-- Job Post 411: Electrician for House Wiring (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Licensed electrician for house wiring in Galway.', 'PENDING', '290aa2e8-f6d7-4a66-a783-2a54aa109569');

-- Insert applicants into junction table for Job 411
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(411, 1169);

-- Job Post 412: Roofing Specialist for Roof Repair (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 10:00:00', '2025-02-14 10:00:00', 'Roofing specialist for roof repair in Wexford.', 'ACCEPTED', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f');

-- Insert applicants into junction table for Job 412
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(412, 1170);

-- Job Post 413: Personal Trainer for Fitness Sessions (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 11:00:00', '2025-02-26 11:00:00', 'Personal trainer for fitness sessions in Galway.', 'PENDING', '2c289845-52e2-4f70-bfa4-7cab86b84dc0');

-- Insert applicants into junction table for Job 413
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(413, 1171);

-- Job Post 414: Cleaner for Office Space (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Cleaner for office space in Wexford.', 'PENDING', '0d786962-5188-43db-8b3f-b04adf206bb7'),
('2025-02-26 12:30:00', '2025-02-26 12:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a');

-- Insert applicants into junction table for Job 414
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(414, 1172), (414, 1173);

-- Job Post 415: Babysitter for Weekend Care (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 13:00:00', '2025-02-26 13:00:00', 'Babysitter for weekend care in Galway.', 'PENDING', '28b456a9-0930-4690-ad53-299a39150e75');

-- Insert applicants into junction table for Job 415
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(415, 1174);

-- Job Post 416: Cook for Family Dinner (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 14:00:00', '2025-02-14 14:00:00', 'Cook for a family dinner in Wexford.', 'ACCEPTED', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38'),
('2025-02-14 14:30:00', '2025-02-14 14:30:00', 'Experience in preparing multi-course meals.', 'ACCEPTED', '955d9de5-2cc7-40c5-8b24-27fc737f12d9');

-- Insert applicants into junction table for Job 416
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(416, 1175), (416, 1176);

-- Job Post 417: Painter for House Interior (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Painter for house interior in Galway.', 'PENDING', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12');

-- Insert applicants into junction table for Job 417
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(417, 1177);

-- Job Post 418: Photographer for Family Portraits (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 16:00:00', '2025-02-26 16:00:00', 'Photographer for family portraits in Wexford.', 'PENDING', 'e7b803f3-61c3-4b40-a66d-922041bbb3db');

-- Insert applicants into junction table for Job 418
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(418, 1178);

-- Job Post 419: Gardener for Lawn Care (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 17:00:00', '2025-02-14 17:00:00', 'Gardener for lawn care in Galway.', 'ACCEPTED', '19dbb644-8669-43a8-9967-5c9beb74bee6'),
('2025-02-14 17:30:00', '2025-02-14 17:30:00', 'Provides own gardening tools and equipment.', 'ACCEPTED', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578');

-- Insert applicants into junction table for Job 419
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(419, 1179), (419, 1180);

-- Job Post 420: Tutor for Math Lessons (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Math tutor for lessons in Wexford.', 'PENDING', 'c79f9012-2fb8-4231-89d5-bc135e857449');

-- Insert applicants into junction table for Job 420
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(420, 1181);















-- Job Post 421: Plumber for Pipe Repair (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Licensed plumber to repair a broken pipe in Waterford.', 'PENDING', '5c9b860b-114a-4793-8fbc-672037defb88');

-- Insert applicants into junction table for Job 421
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(421, 1182);

-- Job Post 422: Carpenter for Furniture Assembly (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 10:00:00', '2025-02-14 10:00:00', 'Experienced carpenter for furniture assembly in Cavan.', 'ACCEPTED', '76f3d814-f5ac-42fe-88cb-ea47c6284c72');

-- Insert applicants into junction table for Job 422
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(422, 1183);

-- Job Post 423: Housekeeper for Deep Cleaning (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 11:00:00', '2025-02-26 11:00:00', 'Experienced housekeeper for deep cleaning in Waterford.', 'PENDING', '2d73a822-abad-4776-894e-eb6ea78600d6'),
('2025-02-26 11:30:00', '2025-02-26 11:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07');

-- Insert applicants into junction table for Job 423
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(423, 1184), (423, 1185);

-- Job Post 424: Tutor for English Lessons (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'English tutor for lessons in Cavan.', 'PENDING', 'c647cd9e-3757-481d-9423-b7e1136ebaa8');

-- Insert applicants into junction table for Job 424
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(424, 1186);

-- Job Post 425: Photographer for Event Photography (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 13:00:00', '2025-02-26 13:00:00', 'Photographer for an event in Waterford.', 'PENDING', '090e3603-529b-4a6e-bb17-ed95b3e25ddf');

-- Insert applicants into junction table for Job 425
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(425, 1187);

-- Job Post 426: Mover for Relocation (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 14:00:00', '2025-02-14 14:00:00', 'Mover for relocation services in Cavan.', 'ACCEPTED', 'ba866253-3826-49d0-ba8c-187b57157633'),
('2025-02-14 14:30:00', '2025-02-14 14:30:00', 'Strong and reliable, careful handling of items.', 'ACCEPTED', '998aec76-87ca-42bc-9669-4ad096f2b2bc');

-- Insert applicants into junction table for Job 426
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(426, 1188), (426, 1189);

-- Job Post 427: Personal Chef for Family Dinner (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Personal chef for a family dinner in Waterford.', 'PENDING', 'f2329eb0-4cba-4674-8822-d55099046642');

-- Insert applicants into junction table for Job 427
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(427, 1190);

-- Job Post 428: Electrician for Light Fixture Installation (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 16:00:00', '2025-02-26 16:00:00', 'Electrician to install light fixtures in Cavan.', 'PENDING', '5d95a781-aab6-4ba2-87c3-e866034921a3');

-- Insert applicants into junction table for Job 428
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(428, 1191);

-- Job Post 429: Gardener for Yard Maintenance (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 17:00:00', '2025-02-14 17:00:00', 'Gardener for yard maintenance in Waterford.', 'ACCEPTED', '029ec727-765b-4618-960e-d7a472fd10ad'),
('2025-02-14 17:30:00', '2025-02-14 17:30:00', 'Provides own gardening tools and equipment.', 'ACCEPTED', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8');

-- Insert applicants into junction table for Job 429
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(429, 1192), (429, 1193);

-- Job Post 430: Painter for Home Interior (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Painter for home interior in Cavan.', 'PENDING', '426b2c8b-9e01-43ce-ae38-d669fee55504');

-- Insert applicants into junction table for Job 430
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(430, 1194);










-- Job Post 431: Electrician for Wiring Repair (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Licensed electrician to fix wiring issues in Kilkenny.', 'PENDING', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7');

-- Insert applicants into junction table for Job 431
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(431, 1195);

-- Job Post 432: Roof Repair Specialist (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 10:00:00', '2025-02-14 10:00:00', 'Roofing specialist for minor roof repairs in Ennis.', 'ACCEPTED', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d');

-- Insert applicants into junction table for Job 432
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(432, 1196);

-- Job Post 433: Cleaner for Office Space (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 11:00:00', '2025-02-26 11:00:00', 'Cleaner for office space in Kilkenny.', 'PENDING', '149644e7-f8dd-4204-9d3b-9b238cff0619'),
('2025-02-26 11:30:00', '2025-02-26 11:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', '3e790d49-d17a-4c7f-a74b-bd0aab21d346');

-- Insert applicants into junction table for Job 433
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(433, 1197), (433, 1198);

-- Job Post 434: Plumber for Pipe Fix (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Licensed plumber to fix a broken pipe in Ennis.', 'PENDING', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3');

-- Insert applicants into junction table for Job 434
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(434, 1199);

-- Job Post 435: Personal Trainer for Sessions (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 13:00:00', '2025-02-26 13:00:00', 'Personal trainer for fitness sessions in Kilkenny.', 'PENDING', '0c405703-5447-4460-a6cb-af102bb27f25');

-- Insert applicants into junction table for Job 435
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(435, 1200);

-- Job Post 436: Painter for Interior Walls (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 14:00:00', '2025-02-14 14:00:00', 'Experienced painter for interior walls in Ennis.', 'ACCEPTED', 'ab0fd215-410c-4204-add1-06b0fa64d03e'),
('2025-02-14 14:30:00', '2025-02-14 14:30:00', 'Provides own painting supplies and equipment.', 'ACCEPTED', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c');

-- Insert applicants into junction table for Job 436
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(436, 1201), (436, 1202);

-- Job Post 437: Gardener for Lawn Maintenance (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Gardener for lawn maintenance in Kilkenny.', 'PENDING', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d');

-- Insert applicants into junction table for Job 437
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(437, 1203);

-- Job Post 438: Photographer for Event (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 16:00:00', '2025-02-26 16:00:00', 'Photographer for a family event in Ennis.', 'PENDING', '33792185-d7af-4e48-8244-997e2ae1c8c4');

-- Insert applicants into junction table for Job 438
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(438, 1204);

-- Job Post 439: Cook for Family Dinner (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 17:00:00', '2025-02-14 17:00:00', 'Cook for a family dinner in Kilkenny.', 'ACCEPTED', '2223cdf9-ce32-4631-b272-5de4390187f6'),
('2025-02-14 17:30:00', '2025-02-14 17:30:00', 'Experience in preparing multi-course meals.', 'ACCEPTED', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a');

-- Insert applicants into junction table for Job 439
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(439, 1205), (439, 1206);

-- Job Post 440: Babysitter for Evening Care (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Babysitter for evening care in Ennis.', 'PENDING', '1380b38d-540c-4bfe-bcf6-0024081a8b0f');

-- Insert applicants into junction table for Job 440
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(440, 1207);















-- Job Post 441: Carpenter for Furniture Repair (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Carpenter for furniture repair in Waterford.', 'PENDING', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8');

-- Insert applicants into junction table for Job 441
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(441, 1208);

-- Job Post 442: Electrician for Electrical Installations (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 10:00:00', '2025-02-26 10:00:00', 'Electrician for electrical installations in Tullamore.', 'PENDING', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27'),
('2025-02-26 10:30:00', '2025-02-26 10:30:00', 'Licensed and experienced in electrical work.', 'PENDING', 'f6f61fd2-0227-4176-af2c-6e358279312f');

-- Insert applicants into junction table for Job 442
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(442, 1209), (442, 1210);

-- Job Post 443: Gardener for Garden Landscaping (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 11:00:00', '2025-02-14 11:00:00', 'Experienced gardener for garden landscaping.', 'ACCEPTED', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14');

-- Insert applicants into junction table for Job 443
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(443, 1211);

-- Job Post 444: Plumber for Leaking Pipes (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Licensed plumber to fix leaking pipes in Tullamore.', 'PENDING', '9b796866-bda9-4102-9c56-bd62e1082f7d');

-- Insert applicants into junction table for Job 444
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(444, 1212);

-- Job Post 445: Cleaner for Housekeeping Services (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 13:00:00', '2025-02-14 13:00:00', 'Experienced cleaner for housekeeping services.', 'ACCEPTED', '3f327cb7-80ae-472f-86e1-085028b32bff'),
('2025-02-14 13:30:00', '2025-02-14 13:30:00', 'Provides own cleaning supplies.', 'ACCEPTED', 'b50517e9-8656-444a-a348-b0f53664e9cf');

-- Insert applicants into junction table for Job 445
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(445, 1213), (445, 1214);

-- Job Post 446: Painter for Home Interior (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 14:00:00', '2025-02-26 14:00:00', 'Painter for home interior in Tullamore.', 'PENDING', 'bacb833d-045c-4452-a880-6f607e4a6c05');

-- Insert applicants into junction table for Job 446
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(446, 1215);

-- Job Post 447: Chef for Private Event (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Chef for a private event in Waterford.', 'PENDING', '00a04b3b-1800-4ef5-8694-b5bef27be101');

-- Insert applicants into junction table for Job 447
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(447, 1216);

-- Job Post 448: Photographer for Wedding (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 16:00:00', '2025-02-26 16:00:00', 'Photographer for a wedding event in Tullamore.', 'PENDING', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0');

-- Insert applicants into junction table for Job 448
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(448, 1217);

-- Job Post 449: Mover for Furniture Relocation (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 17:00:00', '2025-02-14 17:00:00', 'Mover for furniture relocation in Waterford.', 'ACCEPTED', 'df9a7413-65fb-46c7-99a0-6f5f6243314c'),
('2025-02-14 17:30:00', '2025-02-14 17:30:00', 'Strong and reliable, careful handling of items.', 'ACCEPTED', '290aa2e8-f6d7-4a66-a783-2a54aa109569');

-- Insert applicants into junction table for Job 449
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(449, 1218), (449, 1219);

-- Job Post 450: Babysitter for Evening Shift (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Babysitter for the evening shift in Tullamore.', 'PENDING', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f');

-- Insert applicants into junction table for Job 450
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(450, 1220);


















-- Job Post 451: Cleaner for Office Cleaning (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Cleaner for office cleaning in Limerick.', 'PENDING', '2c289845-52e2-4f70-bfa4-7cab86b84dc0');

-- Insert applicants into junction table for Job 451
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(451, 1221);

-- Job Post 452: Driver for Delivery (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 10:00:00', '2025-02-26 10:00:00', 'Driver for delivery of goods in Arklow.', 'PENDING', '0d786962-5188-43db-8b3f-b04adf206bb7'),
('2025-02-26 10:30:00', '2025-02-26 10:30:00', 'Owns a reliable vehicle suitable for deliveries.', 'PENDING', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a');

-- Insert applicants into junction table for Job 452
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(452, 1222), (452, 1223);

-- Job Post 453: Gardener for Lawn Mowing (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 11:00:00', '2025-02-14 11:00:00', 'Experienced gardener for lawn mowing in Limerick.', 'ACCEPTED', '28b456a9-0930-4690-ad53-299a39150e75');

-- Insert applicants into junction table for Job 453
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(453, 1224);

-- Job Post 454: Plumber for Pipe Installation (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Licensed plumber for pipe installation in Arklow.', 'PENDING', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38');

-- Insert applicants into junction table for Job 454
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(454, 1225);

-- Job Post 455: Painter for Exterior Painting (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 13:00:00', '2025-02-14 13:00:00', 'Experienced painter for exterior painting in Limerick.', 'ACCEPTED', '955d9de5-2cc7-40c5-8b24-27fc737f12d9'),
('2025-02-14 13:30:00', '2025-02-14 13:30:00', 'Provides own painting supplies and equipment.', 'ACCEPTED', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12');

-- Insert applicants into junction table for Job 455
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(455, 1226), (455, 1227);

-- Job Post 456: Photographer for Event Photography (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 14:00:00', '2025-02-26 14:00:00', 'Photographer for event photography in Arklow.', 'PENDING', 'e7b803f3-61c3-4b40-a66d-922041bbb3db');

-- Insert applicants into junction table for Job 456
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(456, 1228);

-- Job Post 457: Chef for Catering Service (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Chef for catering services in Limerick.', 'PENDING', '19dbb644-8669-43a8-9967-5c9beb74bee6');

-- Insert applicants into junction table for Job 457
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(457, 1229);

-- Job Post 458: Electrician for Home Wiring (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 16:00:00', '2025-02-14 16:00:00', 'Licensed electrician for home wiring in Arklow.', 'ACCEPTED', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578'),
('2025-02-14 16:30:00', '2025-02-14 16:30:00', 'Experience with electrical installations and repairs.', 'ACCEPTED', 'c79f9012-2fb8-4231-89d5-bc135e857449');

-- Insert applicants into junction table for Job 458
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(458, 1230), (458, 1231);

-- Job Post 459: Mover for Furniture Delivery (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 17:00:00', '2025-02-26 17:00:00', 'Mover for furniture delivery in Limerick.', 'PENDING', '5c9b860b-114a-4793-8fbc-672037defb88');

-- Insert applicants into junction table for Job 459
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(459, 1232);

-- Job Post 460: Babysitter for Afternoon Shift (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Babysitter for an afternoon shift in Arklow.', 'PENDING', '76f3d814-f5ac-42fe-88cb-ea47c6284c72');

-- Insert applicants into junction table for Job 460
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(460, 1233);


















-- Job Post 461: Carpenter for Custom Furniture (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Carpenter for custom furniture in Clonmel.', 'PENDING', '2d73a822-abad-4776-894e-eb6ea78600d6');

-- Insert applicants into junction table for Job 461
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(461, 1234);

-- Job Post 462: Electrician for Electrical Repairs (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 10:00:00', '2025-02-26 10:00:00', 'Electrician for electrical repairs in Kilkenny.', 'PENDING', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07'),
('2025-02-26 10:30:00', '2025-02-26 10:30:00', 'Licensed and experienced in electrical work.', 'PENDING', 'c647cd9e-3757-481d-9423-b7e1136ebaa8');

-- Insert applicants into junction table for Job 462
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(462, 1235), (462, 1236);

-- Job Post 463: Gardener for Lawn Maintenance (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 11:00:00', '2025-02-14 11:00:00', 'Experienced gardener for lawn maintenance.', 'ACCEPTED', '090e3603-529b-4a6e-bb17-ed95b3e25ddf');

-- Insert applicants into junction table for Job 463
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(463, 1237);

-- Job Post 464: Plumber for Pipe Repair (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Licensed plumber to repair pipes in Kilkenny.', 'PENDING', 'ba866253-3826-49d0-ba8c-187b57157633');

-- Insert applicants into junction table for Job 464
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(464, 1238);

-- Job Post 465: Painter for Home Interior (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 13:00:00', '2025-02-14 13:00:00', 'Experienced painter for home interior in Clonmel.', 'ACCEPTED', '998aec76-87ca-42bc-9669-4ad096f2b2bc'),
('2025-02-14 13:30:00', '2025-02-14 13:30:00', 'Provides own painting supplies and equipment.', 'ACCEPTED', 'f2329eb0-4cba-4674-8822-d55099046642');

-- Insert applicants into junction table for Job 465
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(465, 1239), (465, 1240);

-- Job Post 466: Chef for Private Event Catering (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 14:00:00', '2025-02-26 14:00:00', 'Chef for private event catering in Kilkenny.', 'PENDING', '5d95a781-aab6-4ba2-87c3-e866034921a3');

-- Insert applicants into junction table for Job 466
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(466, 1241);

-- Job Post 467: Photographer for Family Photoshoot (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Photographer for a family photoshoot in Clonmel.', 'PENDING', '029ec727-765b-4618-960e-d7a472fd10ad');

-- Insert applicants into junction table for Job 467
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(467, 1242);

-- Job Post 468: Electrician for Home Wiring (IN_PROGRESS, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 16:00:00', '2025-02-14 16:00:00', 'Licensed electrician for home wiring in Kilkenny.', 'ACCEPTED', '9f0b8ca8-86f5-47dc-8d15-af6c558ecfe8'),
('2025-02-14 16:30:00', '2025-02-14 16:30:00', 'Experience with electrical installations and repairs.', 'ACCEPTED', '426b2c8b-9e01-43ce-ae38-d669fee55504');

-- Insert applicants into junction table for Job 468
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(468, 1243), (468, 1244);

-- Job Post 469: Mover for Furniture Relocation (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 17:00:00', '2025-02-26 17:00:00', 'Mover for furniture relocation in Clonmel.', 'PENDING', 'e4fdf9fa-fb87-454c-a234-fde7e35adba7');

-- Insert applicants into junction table for Job 469
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(469, 1245);

-- Job Post 470: Babysitter for Evening Shift (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Babysitter for the evening shift in Kilkenny.', 'PENDING', '6831fe7f-f78e-4e80-a1a9-977579a4ff8d');

-- Insert applicants into junction table for Job 470
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(470, 1246);




















-- Job Post 471: Painter for House Exterior (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced painter for house exterior painting in Cork.', 'PENDING', '149644e7-f8dd-4204-9d3b-9b238cff0619'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Provides own painting supplies and equipment.', 'PENDING', '3e790d49-d17a-4c7f-a74b-bd0aab21d346');

-- Insert applicants into junction table for Job 471
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(471, 1247), (471, 1248);

-- Job Post 472: Chef for Private Dinner Party (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 10:00:00', '2025-02-26 10:00:00', 'Chef for a private dinner party in Sligo.', 'PENDING', 'dd78cf9b-b501-4873-9c06-a6128aeec2f3');

-- Insert applicants into junction table for Job 472
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(472, 1249);

-- Job Post 473: Cleaner for Office Space (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 11:00:00', '2025-02-14 11:00:00', 'Experienced cleaner for office space in Cork.', 'ACCEPTED', '0c405703-5447-4460-a6cb-af102bb27f25');

-- Insert applicants into junction table for Job 473
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(473, 1250);

-- Job Post 474: Gardener for Garden Maintenance (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Gardener for garden maintenance in Sligo.', 'PENDING', 'ab0fd215-410c-4204-add1-06b0fa64d03e'),
('2025-02-26 12:30:00', '2025-02-26 12:30:00', 'Provides own gardening tools and equipment.', 'PENDING', 'c8d01a3f-1dbf-40fe-bc97-a4c6e47aad7c');

-- Insert applicants into junction table for Job 474
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(474, 1251), (474, 1252);

-- Job Post 475: Electrician for Wiring Installation (COMPLETED, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 13:00:00', '2025-02-14 13:00:00', 'Licensed electrician for wiring installation in Cork.', 'ACCEPTED', '2ccc8db5-cb8b-40ae-a720-99743d5fd86d');

-- Insert applicants into junction table for Job 475
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(475, 1253);

-- Job Post 476: Plumber for Pipe Replacement (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 14:00:00', '2025-02-26 14:00:00', 'Licensed plumber to replace pipes in Sligo.', 'PENDING', '33792185-d7af-4e48-8244-997e2ae1c8c4');

-- Insert applicants into junction table for Job 476
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(476, 1254);

-- Job Post 477: Mover for Furniture Relocation (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Mover for furniture relocation in Cork.', 'PENDING', '2223cdf9-ce32-4631-b272-5de4390187f6'),
('2025-02-26 15:30:00', '2025-02-26 15:30:00', 'Strong and reliable, careful handling of items.', 'PENDING', '0a2efd8b-9ee7-4790-b7f9-01b81a55f53a');

-- Insert applicants into junction table for Job 477
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(477, 1255), (477, 1256);

-- Job Post 478: Babysitter for Evening Shift (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 16:00:00', '2025-02-14 16:00:00', 'Experienced babysitter for evening shift in Sligo.', 'ACCEPTED', '1380b38d-540c-4bfe-bcf6-0024081a8b0f');

-- Insert applicants into junction table for Job 478
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(478, 1257);

-- Job Post 479: Photographer for Event (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 17:00:00', '2025-02-26 17:00:00', 'Photographer for a family event in Cork.', 'PENDING', 'f1632f23-e0f5-4e35-b0aa-c54b416cddc8');

-- Insert applicants into junction table for Job 479
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(479, 1258);

-- Job Post 480: Carpenter for Custom Furniture (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Carpenter for custom furniture in Sligo.', 'PENDING', '9e18cea4-a905-4c2a-bfc6-a96d7aebde27'),
('2025-02-26 18:30:00', '2025-02-26 18:30:00', 'Experience with woodworking and furniture design.', 'PENDING', 'f6f61fd2-0227-4176-af2c-6e358279312f');

-- Insert applicants into junction table for Job 480
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(480, 1259), (480, 1260);













-- Job Post 481: Cleaner for Residential Home (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Experienced cleaner for residential home cleaning in Derry.', 'PENDING', 'ffe881d5-44eb-42b0-8aa1-a796658d6d14'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', '9b796866-bda9-4102-9c56-bd62e1082f7d');

-- Insert applicants into junction table for Job 481
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(481, 1261), (481, 1262);

-- Job Post 482: Chef for Family Dinner (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 10:00:00', '2025-02-26 10:00:00', 'Chef for a family dinner in Carlow.', 'PENDING', '3f327cb7-80ae-472f-86e1-085028b32bff');

-- Insert applicants into junction table for Job 482
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(482, 1263);

-- Job Post 483: Handyman for Home Repairs (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 11:00:00', '2025-02-14 11:00:00', 'Experienced handyman for home repairs in Derry.', 'ACCEPTED', 'b50517e9-8656-444a-a348-b0f53664e9cf');

-- Insert applicants into junction table for Job 483
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(483, 1264);

-- Job Post 484: Electrician for Wiring Repair (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Licensed electrician to repair wiring in Carlow.', 'PENDING', 'bacb833d-045c-4452-a880-6f607e4a6c05');

-- Insert applicants into junction table for Job 484
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(484, 1265);

-- Job Post 485: Gardener for Lawn Care (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 13:00:00', '2025-02-14 13:00:00', 'Experienced gardener for lawn care in Derry.', 'ACCEPTED', '00a04b3b-1800-4ef5-8694-b5bef27be101'),
('2025-02-14 13:30:00', '2025-02-14 13:30:00', 'Provides own gardening tools and equipment.', 'ACCEPTED', '64f1f8e1-8d7e-438f-9d4d-9e589e3691a0');

-- Insert applicants into junction table for Job 485
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(485, 1266), (485, 1267);

-- Job Post 486: Painter for Room Decoration (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 14:00:00', '2025-02-26 14:00:00', 'Painter for room decoration in Carlow.', 'PENDING', 'df9a7413-65fb-46c7-99a0-6f5f6243314c');

-- Insert applicants into junction table for Job 486
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(486, 1268);

-- Job Post 487: Mover for Furniture Relocation (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Mover for furniture relocation in Derry.', 'PENDING', '290aa2e8-f6d7-4a66-a783-2a54aa109569');

-- Insert applicants into junction table for Job 487
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(487, 1269);

-- Job Post 488: Tutor for Mathematics Lessons (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 16:00:00', '2025-02-14 16:00:00', 'Math tutor for private lessons in Carlow.', 'ACCEPTED', '3740703d-aa8a-4c62-85e0-96a7fd4d4e8f');

-- Insert applicants into junction table for Job 488
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(488, 1270);

-- Job Post 489: Photographer for Event Photos (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 17:00:00', '2025-02-26 17:00:00', 'Photographer for an event in Derry.', 'PENDING', '2c289845-52e2-4f70-bfa4-7cab86b84dc0');

-- Insert applicants into junction table for Job 489
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(489, 1271);

-- Job Post 490: Cleaner for Office Space (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Cleaner for office space in Carlow.', 'PENDING', '0d786962-5188-43db-8b3f-b04adf206bb7'),
('2025-02-26 18:30:00', '2025-02-26 18:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', '53c4d913-ac3e-4ba3-bf0f-048f68063c4a');

-- Insert applicants into junction table for Job 490
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(490, 1272), (490, 1273);














-- Job Post 491: Cleaner for Office Space (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 09:00:00', '2025-02-26 09:00:00', 'Cleaner for office space in Louth.', 'PENDING', '28b456a9-0930-4690-ad53-299a39150e75'),
('2025-02-26 09:30:00', '2025-02-26 09:30:00', 'Provides own cleaning supplies and equipment.', 'PENDING', '4eac3bee-8e77-4ae0-82ab-1eb1e7615a38');

-- Insert applicants into junction table for Job 491
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(491, 1274), (491, 1275);

-- Job Post 492: Personal Chef for Dinner Party (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 10:00:00', '2025-02-26 10:00:00', 'Personal chef for a dinner party in Waterford.', 'PENDING', '955d9de5-2cc7-40c5-8b24-27fc737f12d9');

-- Insert applicants into junction table for Job 492
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(492, 1276);

-- Job Post 493: Carpenter for Furniture Assembly (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 11:00:00', '2025-02-14 11:00:00', 'Experienced carpenter for furniture assembly in Louth.', 'ACCEPTED', 'bb6f82b9-abaf-4dc0-83de-d8595fe2eb12');

-- Insert applicants into junction table for Job 493
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(493, 1277);

-- Job Post 494: Electrician for Light Installation (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 12:00:00', '2025-02-26 12:00:00', 'Electrician to install lights in Waterford.', 'PENDING', 'e7b803f3-61c3-4b40-a66d-922041bbb3db');

-- Insert applicants into junction table for Job 494
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(494, 1278);

-- Job Post 495: Gardener for Landscaping (COMPLETED, max 2)
-- INSERT 2 applicants (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 13:00:00', '2025-02-14 13:00:00', 'Experienced gardener for landscaping in Louth.', 'ACCEPTED', '19dbb644-8669-43a8-9967-5c9beb74bee6'),
('2025-02-14 13:30:00', '2025-02-14 13:30:00', 'Provides own gardening tools and equipment.', 'ACCEPTED', '34d51f3a-3e2f-47d3-84e1-6cd9e5116578');

-- Insert applicants into junction table for Job 495
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(495, 1279), (495, 1280);

-- Job Post 496: Mover for Heavy Lifting (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 14:00:00', '2025-02-26 14:00:00', 'Mover for heavy lifting in Waterford.', 'PENDING', 'c79f9012-2fb8-4231-89d5-bc135e857449');

-- Insert applicants into junction table for Job 496
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(496, 1281);

-- Job Post 497: Plumber for Pipe Repair (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 15:00:00', '2025-02-26 15:00:00', 'Licensed plumber to repair leaking pipes in Louth.', 'PENDING', '5c9b860b-114a-4793-8fbc-672037defb88');

-- Insert applicants into junction table for Job 497
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(497, 1282);

-- Job Post 498: Photographer for Family Portraits (IN_PROGRESS, max 1)
-- INSERT 1 applicant (all ACCEPTED)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-14 16:00:00', '2025-02-14 16:00:00', 'Photographer for family portraits in Waterford.', 'ACCEPTED', '76f3d814-f5ac-42fe-88cb-ea47c6284c72');

-- Insert applicants into junction table for Job 498
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(498, 1283);

-- Job Post 499: Tutor for English Lessons (OPEN, max 1)
-- INSERT 1 applicant (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 17:00:00', '2025-02-26 17:00:00', 'English tutor for lessons in Louth.', 'PENDING', '2d73a822-abad-4776-894e-eb6ea78600d6');

-- Insert applicants into junction table for Job 499
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(499, 1284);

-- Job Post 500: Housekeeper for Cleaning (OPEN, max 2)
-- INSERT 2 applicants (all PENDING)
INSERT INTO applicant (date_applied, date_updated, message, status, user_id) VALUES
('2025-02-26 18:00:00', '2025-02-26 18:00:00', 'Housekeeper for regular cleaning in Waterford.', 'PENDING', 'eef15d66-d1eb-4ef2-a145-08ad1da8df07'),
('2025-02-26 18:30:00', '2025-02-26 18:30:00', 'Provides own cleaning supplies.', 'PENDING', 'c647cd9e-3757-481d-9423-b7e1136ebaa8');

-- Insert applicants into junction table for Job 500
INSERT INTO jobpost_applicant (job_post_id, applicant_id) VALUES
(500, 1285), (500, 1286);










