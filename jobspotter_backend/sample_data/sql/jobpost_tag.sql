-- Inserting Job Posts with Associated Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- Delivery Driver
    (1, 5), -- Delivery Services

    -- Courier
    (2, 5), -- Delivery Services

    -- Part-time Driver
    (3, 5), -- Delivery Services

    -- Personal Driver
    (4, 5), -- Delivery Services
    (4, 22), -- Errands/Shopping

    -- Delivery Helper
    (5, 5), -- Delivery Services

    -- Food Delivery
    (6, 5), -- Delivery Services
    (6, 12), -- Food Services

    -- Package Transport
    (7, 5), -- Delivery Services

    -- Weekend Driver
    (8, 5), -- Delivery Services
    (8, 22), -- Errands/Shopping

    -- City Driver
    (9, 5), -- Delivery Services

    -- Evening Driver
    (10, 5), -- Delivery Services
    (10, 22); -- Errands/Shopping

-- Inserting Job Posts with Associated Tags for User 2
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- Housekeeper
    (11, 3), -- Skilled Trades
    (11, 4), -- Cleaning Services

    -- Cleaner
    (12, 4), -- Cleaning Services

    -- Domestic Cleaner
    (13, 4), -- Cleaning Services

    -- Office Cleaner
    (14, 4), -- Cleaning Services

    -- Housekeeping Assistant
    (15, 4), -- Cleaning Services

    -- Deep Cleaning
    (16, 4), -- Cleaning Services

    -- Spring Cleaning
    (17, 4), -- Cleaning Services

    -- Home Organizer
    (18, 4), -- Cleaning Services
    (18, 10), -- Administrative Support

    -- Apartment Cleaner
    (19, 4), -- Cleaning Services

    -- Vacation Housekeeper
    (20, 4), -- Cleaning Services
    (20, 12); -- Food Services (Assuming vacation rental involves guest services, and food could be part of that)


-- Inserting Job Posts with Associated Tags for User 3
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- Web Developer
    (21, 15), -- IT Support
    (21, 16), -- Creative Services

    -- Graphic Designer
    (22, 16), -- Creative Services
    (22, 15), -- IT Support

    -- Software Engineer
    (23, 15), -- IT Support
    (23, 16), -- Creative Services

    -- Content Writer
    (24, 16), -- Creative Services
    (24, 10), -- Administrative Support

    -- Data Scientist
    (25, 15), -- IT Support
    (25, 1),  -- General Help

    -- Backend Developer
    (26, 15), -- IT Support
    (26, 16), -- Creative Services

    -- Database Administrator
    (27, 15), -- IT Support
    (27, 19), -- Music Instruction

    -- Project Manager
    (28, 10), -- Administrative Support

    -- SEO Specialist
    (29, 16), -- Creative Services
    (29, 10), -- Administrative Support
    (29, 8),  -- Tutoring/Mentoring

    -- IT Support Specialist
    (30, 15), -- IT Support
    (30, 12); -- Food Services


-- User 4 (testuser4) - Inserting Tags for Job Posts
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
  (31, 16), -- Photographer -> CREATIVE_SERVICES
  (31, 3),  -- Photographer -> SKILLED_TRADES

  (32, 9),  -- Event Coordinator -> EVENT_STAFF
  (32, 10), -- Event Coordinator -> ADMINISTRATIVE_SUPPORT

  (33, 6),  -- Massage Therapist -> CAREGIVING

  (33, 28), -- Massage Therapist -> HEALTH_SUPPORT

  (34, 17), -- Personal Trainer -> PERSONAL_SERVICES
  (34, 9),  -- Personal Trainer -> EVENT_STAFF

  (35, 12), -- Cook/Chef -> FOOD_SERVICES
  (35, 16), -- Cook/Chef -> CREATIVE_SERVICES

  (36, 10), -- HR Specialist -> ADMINISTRATIVE_SUPPORT
  (36, 3),  -- HR Specialist -> SKILLED_TRADES

  (37, 3),  -- Carpenter -> SKILLED_TRADES
  (37, 20), -- Carpenter -> HOME_MAINTENANCE

  (38, 3),  -- Plumber -> SKILLED_TRADES
  (38, 20), -- Plumber -> HOME_MAINTENANCE

  (39, 3),  -- Electrician -> SKILLED_TRADES
  (39, 20), -- Electrician -> HOME_MAINTENANCE

  (40, 20), -- Painter -> HOME_MAINTENANCE
  (40, 13); -- Painter -> GARDENING_LANDSCAPING


-- User 5 (testuser5) - Inserting Tags for Job Posts
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
      (41, 10),  -- Receptionist -> ADMINISTRATIVE_SUPPORT
      (41, 11),  -- Receptionist -> VIRTUAL_ASSISTANCE

      (42, 5),   -- Driver -> DELIVERY_SERVICES
      (42, 21),  -- Driver -> TRANSPORTATION_ASSISTANCE

      (43, 9),   -- Security Guard -> EVENT_STAFF
      (43, 20),  -- Security Guard -> HOME_MAINTENANCE

      (44, 12),  -- Barista -> FOOD_SERVICES
      (44, 16),  -- Barista -> CREATIVE_SERVICES

      (45, 10),  -- Retail Assistant -> ADMINISTRATIVE_SUPPORT
      (45, 16),  -- Retail Assistant -> CREATIVE_SERVICES

      (46, 9),   -- Waiter -> EVENT_STAFF
      (46, 12),  -- Waiter -> FOOD_SERVICES

      (47, 12),  -- Chef -> FOOD_SERVICES
      (47, 16),  -- Chef -> CREATIVE_SERVICES

      (48, 4),   -- Cleaner -> CLEANING_SERVICES
      (48, 10),  -- Cleaner -> ADMINISTRATIVE_SUPPORT

      (49, 12),  -- Cook -> FOOD_SERVICES
      (49, 16),  -- Cook -> CREATIVE_SERVICES

      (50, 9),  -- Bartender -> EVENT_STAFF
      (50, 12); -- Bartender -> FOOD_SERVICES


-- User 6 (testuser6) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
        -- Lawn Care (Job Post ID 1)
        (51, 13),  -- GARDENING_LANDSCAPING
        (51, 1),   -- GENERAL_HELP

        -- Babysitting (Job Post ID 2)
        (52, 6),   -- CAREGIVING
        (52, 18),  -- TUTORING_LANGUAGES

        -- Pet Sitting (Job Post ID 3)
        (53, 7),   -- PET_CARE
        (53, 6),   -- CAREGIVING

        -- Grocery Delivery (Job Post ID 4)
        (54, 5),   -- DELIVERY_SERVICES
        (54, 22),  -- ERRANDS_SHOPPING

        -- House Cleaning (Job Post ID 5)
        (55, 4),   -- CLEANING_SERVICES
        (55, 1),   -- GENERAL_HELP

        -- Tutoring (Job Post ID 6)
        (56, 8),   -- TUTORING_MENTORING
        (56, 18),  -- TUTORING_LANGUAGES

        -- Gardening (Job Post ID 7)
        (57, 13),  -- GARDENING_LANDSCAPING
        (57, 1),   -- GENERAL_HELP

        -- Car Wash (Job Post ID 8)
        (58, 1),   -- GENERAL_HELP
        (58, 5),   -- DELIVERY_SERVICES

        -- Painting (Job Post ID 9)
        (59, 20),  -- HOME_MAINTENANCE
        (59, 13),  -- GARDENING_LANDSCAPING

        -- Handyman (Job Post ID 10)
        (60, 3),  -- SKILLED_TRADES
        (60, 20); -- HOME_MAINTENANCE



-- User 7 (testuser7) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Plumbing Services (Job Post ID 1)
(71, 20),  -- HOME_MAINTENANCE
(71, 3),   -- SKILLED_TRADES

-- Carpet Cleaning (Job Post ID 2)
(72, 4),   -- CLEANING_SERVICES
(72, 1),   -- GENERAL_HELP

-- House Painting (Job Post ID 3)
(73, 20),  -- HOME_MAINTENANCE
(73, 1),   -- GENERAL_HELP

-- Tree Trimming (Job Post ID 4)
(74, 13),  -- GARDENING_LANDSCAPING
(74, 1),   -- GENERAL_HELP

-- House Cleaning (Job Post ID 5)
(75, 4),   -- CLEANING_SERVICES
(75, 1),   -- GENERAL_HELP

-- Grocery Delivery (Job Post ID 6)
(76, 5),   -- DELIVERY_SERVICES
(76, 22),  -- ERRANDS_SHOPPING

-- Window Washing (Job Post ID 7)
(77, 4),   -- CLEANING_SERVICES
(77, 1),   -- GENERAL_HELP

-- Gardening (Job Post ID 8)
(78, 13),  -- GARDENING_LANDSCAPING
(78, 1),   -- GENERAL_HELP

-- Dog Walking (Job Post ID 9)
(79, 7),   -- PET_CARE
(79, 1),   -- GENERAL_HELP

-- Snow Removal (Job Post ID 10)
(80, 1),  -- GENERAL_HELP
(80, 13); -- GARDENING_LANDSCAPING



-- User 8 (testuser8) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Electrician Services (Job Post ID 80)
(80, 20),  -- HOME_MAINTENANCE
(80, 3),   -- SKILLED_TRADES

-- Mowing Services (Job Post ID 81)
(81, 13),  -- GARDENING_LANDSCAPING
(81, 1),   -- GENERAL_HELP

-- Furniture Assembly (Job Post ID 82)
(82, 20),  -- HOME_MAINTENANCE
(82, 1),   -- GENERAL_HELP

-- Handyman Services (Job Post ID 83)
(83, 20),  -- HOME_MAINTENANCE
(83, 1),   -- GENERAL_HELP

-- Cleaning Services (Job Post ID 84)
(84, 4),   -- CLEANING_SERVICES
(84, 1),   -- GENERAL_HELP

-- Plumbing Services (Job Post ID 85)
(85, 20),  -- HOME_MAINTENANCE
(85, 3),   -- SKILLED_TRADES

-- Painting Services (Job Post ID 86)
(86, 20),  -- HOME_MAINTENANCE
(86, 1),   -- GENERAL_HELP

-- Gardening Services (Job Post ID 87)
(87, 13),  -- GARDENING_LANDSCAPING
(87, 1),   -- GENERAL_HELP

-- Window Cleaning (Job Post ID 88)
(88, 4),   -- CLEANING_SERVICES
(88, 1),   -- GENERAL_HELP

-- Grocery Delivery (Job Post ID 89)
(89, 5),   -- DELIVERY_SERVICES
(89, 22);  -- ERRANDS_SHOPPING


-- User 9 (testuser9) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Pet Sitting (Job Post ID 90)
(90, 7),   -- PET_CARE
(90, 1),   -- GENERAL_HELP

-- Childcare (Job Post ID 91)
(91, 8),   -- TUTORING_MENTORING
(91, 1),   -- GENERAL_HELP

-- Local Delivery (Job Post ID 92)
(92, 5),   -- DELIVERY_SERVICES
(92, 1),   -- GENERAL_HELP

-- Senior Care (Job Post ID 93)
(93, 6),   -- CAREGIVING
(93, 1),   -- GENERAL_HELP

-- Lawn Mowing (Job Post ID 94)
(94, 13),  -- GARDENING_LANDSCAPING
(94, 1),   -- GENERAL_HELP

-- Grocery Shopping (Job Post ID 95)
(95, 6),   -- CAREGIVING
(95, 1),   -- GENERAL_HELP

-- Home Maintenance (Job Post ID 96)
(96, 20),  -- HOME_MAINTENANCE
(96, 3),   -- SKILLED_TRADES

-- Car Washing (Job Post ID 97)
(97, 9),   -- EVENT_STAFF
(97, 1),   -- GENERAL_HELP

-- Tutoring (Job Post ID 98)
(98, 8),   -- TUTORING_MENTORING
(98, 1),   -- GENERAL_HELP

-- Package Pickup (Job Post ID 99)
(99, 5),   -- DELIVERY_SERVICES
(99, 1);   -- GENERAL_HELP


-- User 10 (testuser10) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Furniture Assembly (Job Post ID 100)
(100, 2),   -- HANDYMAN_SERVICES
(100, 1),   -- GENERAL_HELP

-- Cleaning Service (Job Post ID 101)
(101, 4),   -- CLEANING_SERVICES
(101, 1),   -- GENERAL_HELP

-- Grocery Delivery (Job Post ID 102)
(102, 5),   -- DELIVERY_SERVICES
(102, 1),   -- GENERAL_HELP

-- Pet Care (Job Post ID 103)
(103, 7),   -- PET_CARE
(103, 1),   -- GENERAL_HELP

-- Tutoring Service (Job Post ID 104)
(104, 8),   -- TUTORING_MENTORING
(104, 1),   -- GENERAL_HELP

-- Local Delivery (Job Post ID 105)
(105, 5),   -- DELIVERY_SERVICES
(105, 1),   -- GENERAL_HELP

-- Childcare (Job Post ID 106)
(106, 8),   -- TUTORING_MENTORING
(106, 1),   -- GENERAL_HELP

-- Lawn Mowing (Job Post ID 107)
(107, 13),  -- GARDENING_LANDSCAPING
(107, 1),   -- GENERAL_HELP

-- Senior Care (Job Post ID 108)
(108, 6),   -- CAREGIVING
(108, 1),   -- GENERAL_HELP

-- Car Washing (Job Post ID 109)
(109, 9),   -- EVENT_STAFF
(109, 1);   -- GENERAL_HELP











-- User 11 (testuser11) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Home Renovation (Job Post ID 110)
(110, 31),  -- ENVIRONMENTAL_CONSERVATION


-- Child Care (Job Post ID 111)
(111, 6),   -- CAREGIVING


-- Tutoring Services (Job Post ID 112)
(112, 8),   -- TUTORING_MENTORING


-- Grocery Delivery (Job Post ID 113)
(113, 5),   -- DELIVERY_SERVICES


-- Pet Sitting (Job Post ID 114)
(114, 7),   -- PET_CARE


-- Moving Help (Job Post ID 115)
(115, 2),   -- HANDYMAN_SERVICES


-- Gardening (Job Post ID 116)
(116, 13),  -- GARDENING_LANDSCAPING


-- Handyman Service (Job Post ID 117)
(117, 2),   -- HANDYMAN_SERVICES


-- Housekeeping (Job Post ID 118)
(118, 14),  -- CLEANING_SERVICES
(118, 1),   -- GENERAL_HELP

-- Car Washing (Job Post ID 119)
(119, 20);  -- HOME_MAINTENANCE




-- User 12 (testuser12) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Personal Assistant (Job Post ID 120)
(120, 10),   -- ADMINISTRATIVE_SUPPORT
(120, 1),    -- GENERAL_HELP

-- Cleaner (Job Post ID 121)
(121, 4),    -- CLEANING_SERVICES
(121, 1),    -- GENERAL_HELP

-- Delivery Person (Job Post ID 122)
(122, 5),    -- DELIVERY_SERVICES


-- Pet Walker (Job Post ID 123)
(123, 7),    -- PET_CARE


-- Handyman (Job Post ID 124)
(124, 2),    -- HANDYMAN_SERVICES
(124, 1),    -- GENERAL_HELP

-- Grocery Shopper (Job Post ID 125)
(125, 5),    -- DELIVERY_SERVICES


-- Cook (Job Post ID 126)
(126, 12),   -- FOOD_SERVICES


-- Laundry Services (Job Post ID 127)
(127, 4),    -- CLEANING_SERVICES


-- Gardener (Job Post ID 128)
(128, 13),   -- GARDENING_LANDSCAPING


-- Painter (Job Post ID 129)
(129, 16);   -- CREATIVE_SERVICES


-- User 13 (testuser13) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Office Assistant (Job Post ID 130)
(130, 10),   -- ADMINISTRATIVE_SUPPORT
(130, 1),    -- GENERAL_HELP

-- Warehouse Worker (Job Post ID 131)
(131, 3),    -- SKILLED_TRADES
(131, 1),    -- GENERAL_HELP

-- Chef (Job Post ID 132)
(132, 12),   -- FOOD_SERVICES
(132, 1),    -- GENERAL_HELP

-- Tutor (Job Post ID 133)
(133, 8),    -- TUTORING_MENTORING
(133, 1),    -- GENERAL_HELP

-- Personal Shopper (Job Post ID 134)
(134, 22),   -- ERRANDS_SHOPPING
(134, 1),    -- GENERAL_HELP

-- Cleaner (Job Post ID 135)
(135, 4),    -- CLEANING_SERVICES
(135, 1),    -- GENERAL_HELP

-- Event Coordinator (Job Post ID 136)
(136, 24),   -- COMMUNITY_EVENTS
(136, 1),    -- GENERAL_HELP

-- Landscaper (Job Post ID 137)
(137, 13),   -- GARDENING_LANDSCAPING
(137, 1),    -- GENERAL_HELP

-- Bartender (Job Post ID 138)
(138, 9),    -- EVENT_STAFF
(138, 1),    -- GENERAL_HELP

-- Delivery Driver (Job Post ID 139)
(139, 5),    -- DELIVERY_SERVICES
(139, 1);    -- GENERAL_HELP


-- User 14 (testuser14) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Administrative Assistant (Job Post ID 140)
(140, 10),   -- ADMINISTRATIVE_SUPPORT
(140, 1),    -- GENERAL_HELP

-- Delivery Driver (Job Post ID 141)
(141, 5),    -- DELIVERY_SERVICES
(141, 1),    -- GENERAL_HELP

-- Chef (Job Post ID 142)
(142, 12),   -- FOOD_SERVICES
(142, 1),    -- GENERAL_HELP

-- Tutor (Job Post ID 143)
(143, 8),    -- TUTORING_MENTORING
(143, 1),    -- GENERAL_HELP

-- Personal Shopper (Job Post ID 144)
(144, 22),   -- ERRANDS_SHOPPING
(144, 1),    -- GENERAL_HELP

-- Cleaner (Job Post ID 145)
(145, 4),    -- CLEANING_SERVICES
(145, 1),    -- GENERAL_HELP

-- Event Coordinator (Job Post ID 146)
(146, 24),   -- COMMUNITY_EVENTS
(146, 1),    -- GENERAL_HELP

-- Landscaper (Job Post ID 147)
(147, 13),   -- GARDENING_LANDSCAPING
(147, 1),    -- GENERAL_HELP

-- Bartender (Job Post ID 148)
(148, 9),    -- EVENT_STAFF
(148, 1),    -- GENERAL_HELP

-- Delivery Driver (Job Post ID 149)
(149, 5),    -- DELIVERY_SERVICES
(149, 1);    -- GENERAL_HELP


-- User 15 (testuser15) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Customer Service Representative (Job Post ID 150)
(150, 32),   -- CUSTOMER_SERVICE
(150, 1),   -- GENERAL_HELP

-- Warehouse Worker (Job Post ID 151)
(151, 5),   -- DELIVERY_SERVICES
(151, 1),   -- GENERAL_HELP

-- Receptionist (Job Post ID 152)
(152, 32),   -- CUSTOMER_SERVICE
(152, 1),   -- GENERAL_HELP

-- Delivery Driver (Job Post ID 153)
(153, 5),   -- DELIVERY_SERVICES
(153, 1),   -- GENERAL_HELP

-- Software Developer (Job Post ID 154)
(154, 15),  -- IT_SUPPORT
(154, 1),   -- GENERAL_HELP

-- Cleaner (Job Post ID 155)
(155, 4),   -- CLEANING_SERVICES
(155, 1),   -- GENERAL_HELP

-- Event Manager (Job Post ID 156)
(156, 24),  -- COMMUNITY_EVENTS
(156, 1),   -- GENERAL_HELP

-- Chef (Job Post ID 157)
(157, 12),   -- FOOD_SERVICES
(157, 1),   -- GENERAL_HELP

-- Security Guard (Job Post ID 158)
(158, 17),   -- SECURITY_SERVICES
(158, 1),   -- GENERAL_HELP

-- Photographer (Job Post ID 159)
(159, 16),  -- CREATIVE_SERVICES
(159, 1);   -- GENERAL_HELP


-- User 16 (testuser16) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Pet Sitting (Job Post ID 160)
(160, 7),   -- PET_CARE
(160, 1),   -- GENERAL_HELP

-- Gardening Help (Job Post ID 161)
(161, 13),  -- GARDENING_LANDSCAPING
(161, 1),   -- GENERAL_HELP

-- Dog Walker (Job Post ID 162)
(162, 7),   -- PET_CARE
(162, 1),   -- GENERAL_HELP

-- Home Cleaning (Job Post ID 163)
(163, 4),   -- CLEANING_SERVICES
(163, 1),   -- GENERAL_HELP

-- Childcare (Job Post ID 164)
(164, 13),  -- CHILDCARE
(164, 1),   -- GENERAL_HELP

-- Personal Assistant (Job Post ID 165)
(165, 1),   -- GENERAL_HELP
(165, 6),  -- CHILDCARE

-- Tutoring (Job Post ID 166)
(166, 8),   -- TUTORING_MENTORING
(166, 1),   -- GENERAL_HELP

-- Errands Help (Job Post ID 167)
(167, 1),   -- GENERAL_HELP
(167, 6),  -- CHILDCARE

-- Car Wash (Job Post ID 168)
(168, 1),   -- GENERAL_HELP
(168, 16),  -- CREATIVE_SERVICES

-- Moving Help (Job Post ID 169)
(169, 9),   -- EVENT_STAFF
(169, 1);   -- GENERAL_HELP


-- User 17 (testuser17) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Tutoring Assistance (Job Post ID 170)
(170, 8),   -- TUTORING_MENTORING
(170, 1),   -- GENERAL_HELP

-- Garden Maintenance (Job Post ID 171)
(171, 13),  -- GARDENING_LANDSCAPING
(171, 1),   -- GENERAL_HELP

-- House Cleaning (Job Post ID 172)
(172, 4),   -- CLEANING_SERVICES
(172, 1),   -- GENERAL_HELP

-- Errand Running (Job Post ID 173)
(173, 1),   -- GENERAL_HELP
(173, 22),  -- ERRANDS_SHOPPING

-- Pet Sitting (Job Post ID 174)
(174, 7),   -- PET_CARE
(174, 1),   -- GENERAL_HELP

-- Personal Shopper (Job Post ID 175)
(175, 1),   -- GENERAL_HELP
(175, 22),  -- ERRANDS_SHOPPING

-- Moving Assistance (Job Post ID 176)
(176, 9),   -- EVENT_STAFF
(176, 1),   -- GENERAL_HELP

-- Cleaning Help (Job Post ID 177)
(177, 4),   -- CLEANING_SERVICES
(177, 1),   -- GENERAL_HELP

-- Childcare Assistance (Job Post ID 178)
(178, 22),  -- ERRANDS_SHOPPING
(178, 1),   -- GENERAL_HELP

-- Pet Care (Job Post ID 179)
(179, 7),   -- PET_CARE
(179, 1);   -- GENERAL_HELP


-- User 18 (testuser18) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Tech Support Needed (Job Post ID 180)
(180, 15),  -- IT_SUPPORT
(180, 1),   -- GENERAL_HELP

-- Grocery Shopping Help (Job Post ID 181)
(181, 1),   -- GENERAL_HELP
(181, 22),  -- ERRANDS_SHOPPING

-- Personal Assistant (Job Post ID 182)
(182, 1),   -- GENERAL_HELP
(182, 17),  -- PERSONAL_SERVICES

-- Tutoring Services (Job Post ID 183)
(183, 8),   -- TUTORING_MENTORING
(183, 1),   -- GENERAL_HELP

-- Household Chores (Job Post ID 184)
(184, 1),   -- GENERAL_HELP
(184, 4),   -- CLEANING_SERVICES

-- Lawn Care (Job Post ID 185)
(185, 13),  -- GARDENING_LANDSCAPING
(185, 1),   -- GENERAL_HELP

-- Furniture Assembly (Job Post ID 186)
(186, 20),  -- HOME_MAINTENANCE
(186, 1),   -- GENERAL_HELP

-- Cleaning Services (Job Post ID 187)
(187, 4),   -- CLEANING_SERVICES
(187, 1),   -- GENERAL_HELP

-- Pet Walking (Job Post ID 188)
(188, 7),   -- PET_CARE
(188, 1),   -- GENERAL_HELP

-- Car Washing (Job Post ID 189)
(189, 16),  -- CREATIVE_SERVICES
(189, 1);   -- GENERAL_HELP


-- User 19 (testuser19) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Graphic Design Assistance (Job Post ID 190)
(190, 16),  -- CREATIVE_SERVICES
(190, 1),   -- GENERAL_HELP

-- Housekeeping Help (Job Post ID 191)
(191, 4),   -- CLEANING_SERVICES
(191, 1),   -- GENERAL_HELP

-- Tech Support for Small Business (Job Post ID 192)
(192, 15),  -- IT_SUPPORT
(192, 1),   -- GENERAL_HELP

-- Personal Shopper (Job Post ID 193)
(193, 17),  -- PERSONAL_SERVICES
(193, 1),   -- GENERAL_HELP

-- Pet Sitting (Job Post ID 194)
(194, 7),   -- PET_CARE
(194, 1),   -- GENERAL_HELP

-- Laundry Services (Job Post ID 195)
(195, 4),   -- CLEANING_SERVICES
(195, 1),   -- GENERAL_HELP

-- Photography Services (Job Post ID 196)
(196, 8),   -- CREATIVE_SERVICES
(196, 1),   -- GENERAL_HELP

-- Food Delivery Assistance (Job Post ID 197)
(197, 12),  -- FOOD_SERVICES
(197, 1),   -- GENERAL_HELP

-- Cleaning Help (Job Post ID 198)
(198, 4),   -- CLEANING_SERVICES
(198, 1),   -- GENERAL_HELP

-- Moving Assistance (Job Post ID 199)
(199, 5),   -- DELIVERY_SERVICES
(199, 1);   -- GENERAL_HELP


-- User 20 (testuser20) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Event Coordinator Needed (Job Post ID 200)
(200, 9),   -- EVENT_STAFF
(200, 1),   -- GENERAL_HELP

-- Babysitting Services (Job Post ID 201)
(201, 6),   -- CAREGIVING
(201, 1),   -- GENERAL_HELP

-- Gardening Help (Job Post ID 202)
(202, 13),  -- GARDENING_LANDSCAPING
(202, 1),   -- GENERAL_HELP

-- Dog Walking Services (Job Post ID 203)
(203, 7),   -- PET_CARE
(203, 1),   -- GENERAL_HELP

-- House Cleaning Assistance (Job Post ID 204)
(204, 4),   -- CLEANING_SERVICES
(204, 1),   -- GENERAL_HELP

-- Furniture Assembly (Job Post ID 205)
(205, 2),   -- HANDYMAN_SERVICES
(205, 1),   -- GENERAL_HELP

-- Tech Support for Home Office (Job Post ID 206)
(206, 15),  -- IT_SUPPORT
(206, 1),   -- GENERAL_HELP

-- Tutoring Assistance for Kids (Job Post ID 207)
(207, 8),   -- TUTORING_MENTORING
(207, 1),   -- GENERAL_HELP

-- Moving Help (Job Post ID 208)
(208, 5),   -- DELIVERY_SERVICES
(208, 1),   -- GENERAL_HELP

-- Personal Assistant Needed (Job Post ID 209)
(209, 10),  -- ADMINISTRATIVE_SUPPORT
(209, 1);   -- GENERAL_HELP
















-- User 21 (testuser21) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Home Repair Services (Job Post ID 210)
(210, 32),  -- OTHER
(210, 1),   -- GENERAL_HELP

-- Language Tutor (Job Post ID 211)
(211, 8),   -- TUTORING_MENTORING
(211, 1),   -- GENERAL_HELP

-- Pet Grooming Services (Job Post ID 212)
(212, 7),   -- PET_CARE
(212, 1),   -- GENERAL_HELP

-- Carpentry Work Needed (Job Post ID 213)
(213, 20),  -- HOME_MAINTENANCE
(213, 1),   -- GENERAL_HELP

-- Cooking Assistance (Job Post ID 214)
(214, 1),   -- GENERAL_HELP
(214, 12),  -- FOOD_SERVICES

-- Plumbing Services (Job Post ID 215)
(215, 3),   -- SKILLED_TRADES
(215, 1),   -- GENERAL_HELP

-- Graphic Design Work (Job Post ID 216)
(216, 16),  -- CREATIVE_SERVICES
(216, 1),   -- GENERAL_HELP

-- Elderly Care Assistance (Job Post ID 217)
(217, 6),   -- CAREGIVING
(217, 1),   -- GENERAL_HELP

-- Painting and Decorating (Job Post ID 218)
(218, 32),  -- OTHER
(218, 1),   -- GENERAL_HELP

-- Courier Services (Job Post ID 219)
(219, 5),   -- DELIVERY_SERVICES
(219, 1);   -- GENERAL_HELP



-- User 22 (testuser22) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Electrician Needed (Job Post ID 220)
(220, 3),   -- SKILLED_TRADES
(220, 1),   -- GENERAL_HELP

-- Math Tutor (Job Post ID 221)
(221, 8),   -- TUTORING_MENTORING
(221, 1),   -- GENERAL_HELP

-- House Painting (Job Post ID 222)
(222, 20),  -- HOME_MAINTENANCE
(222, 1),   -- GENERAL_HELP

-- Moving Help Needed (Job Post ID 223)
(223, 21),  -- TRANSPORTATION_ASSISTANCE
(223, 1),   -- GENERAL_HELP

-- Home Deep Cleaning (Job Post ID 224)
(224, 4),   -- CLEANING_SERVICES
(224, 1),   -- GENERAL_HELP

-- Photography Services (Job Post ID 225)
(225, 16),  -- CREATIVE_SERVICES
(225, 1),   -- GENERAL_HELP

-- Personal Trainer (Job Post ID 226)
(226, 17),  -- PERSONAL_SERVICES
(226, 1),   -- GENERAL_HELP

-- Childcare Services (Job Post ID 227)
(227, 6),   -- CAREGIVING
(227, 1),   -- GENERAL_HELP

-- Lawn Mowing Services (Job Post ID 228)
(228, 13),  -- GARDENING_LANDSCAPING
(228, 1),   -- GENERAL_HELP

-- IT Support (Job Post ID 229)
(229, 15),  -- IT_SUPPORT
(229, 1);   -- GENERAL_HELP


-- User 23 (testuser23) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Plumber Needed (Job Post ID 230)
(230, 20),  -- PLUMBING
(230, 1),   -- GENERAL_HELP

-- Guitar Lessons (Job Post ID 231)
(231, 23),  -- TUTORING
(231, 1),   -- GENERAL_HELP

-- Carpentry Work (Job Post ID 232)
(232, 2),   -- HANDYMAN_SERVICES
(232, 1),   -- GENERAL_HELP

-- Office Cleaning (Job Post ID 233)
(233, 4),   -- CLEANING_SERVICES
(233, 1),   -- GENERAL_HELP

-- Painting Services (Job Post ID 234)
(234, 3),  -- PAINTING
(234, 1),   -- GENERAL_HELP

-- Handyman Required (Job Post ID 235)
(235, 2),   -- HANDYMAN_SERVICES
(235, 1),   -- GENERAL_HELP

-- Pet Grooming (Job Post ID 236)
(236, 7),   -- PET_CARE
(236, 1),   -- GENERAL_HELP

-- Homework Help (Job Post ID 237)
(237, 23),  -- TUTORING
(237, 1),   -- GENERAL_HELP

-- Packing and Moving (Job Post ID 238)
(238, 21),  -- TRANSPORTATION_ASSISTANCE
(238, 1),   -- GENERAL_HELP

-- Graphic Design Work (Job Post ID 239)
(239, 16),  -- CREATIVE_SERVICES
(239, 1);   -- GENERAL_HELP


-- User 24 (testuser24) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Electrician Needed (Job Post ID 240)
(240, 20),  -- ELECTRICIAN
(240, 1),   -- GENERAL_HELP

-- Math Tutor Required (Job Post ID 241)
(241, 8),   -- TUTORING_LANGUAGES
(241, 1),   -- GENERAL_HELP

-- Home Renovation Help (Job Post ID 242)
(242, 2),   -- HANDYMAN_SERVICES
(242, 1),   -- GENERAL_HELP

-- Pet Sitting Services (Job Post ID 243)
(243, 7),   -- PET_CARE
(243, 1),   -- GENERAL_HELP

-- Cleaning Services (Job Post ID 244)
(244, 4),   -- CLEANING_SERVICES
(244, 1),   -- GENERAL_HELP

-- Photography Needed (Job Post ID 245)
(245, 9),   -- EVENT_STAFF
(245, 1),   -- GENERAL_HELP

-- Moving Assistance (Job Post ID 246)
(246, 21),  -- TRANSPORTATION_ASSISTANCE
(246, 1),   -- GENERAL_HELP

-- Music Lessons (Job Post ID 247)
(247, 19),  -- MUSIC_INSTRUCTION
(247, 1),   -- GENERAL_HELP

-- Garden Maintenance (Job Post ID 248)
(248, 13),  -- GARDENING_LANDSCAPING
(248, 1),   -- GENERAL_HELP

-- Website Development (Job Post ID 249)
(249, 15),  -- IT_SUPPORT
(249, 1);   -- GENERAL_HELP


-- User 25 (testuser25) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Gardener Needed (Job Post ID 250)
(250, 13),  -- GARDENING_LANDSCAPING
(250, 1),   -- GENERAL_HELP

-- Cleaner Required (Job Post ID 251)
(251, 4),   -- CLEANING_SERVICES
(251, 1),   -- GENERAL_HELP

-- Furniture Assembly (Job Post ID 252)
(252, 2),   -- HANDYMAN_SERVICES
(252, 1),   -- GENERAL_HELP

-- Pet Sitting Services (Job Post ID 253)
(253, 7),   -- PET_CARE
(253, 1),   -- GENERAL_HELP

-- House Cleaner Needed (Job Post ID 254)
(254, 4),   -- CLEANING_SERVICES
(254, 1),   -- GENERAL_HELP

-- Photographer Needed (Job Post ID 255)
(255, 9),   -- EVENT_STAFF
(255, 1),   -- GENERAL_HELP

-- Moving Assistance (Job Post ID 256)
(256, 21),  -- TRANSPORTATION_ASSISTANCE
(256, 1),   -- GENERAL_HELP

-- Piano Lessons (Job Post ID 257)
(257, 8),   -- TUTORING_MENTORING
(257, 1),   -- GENERAL_HELP

-- Garden Maintenance (Job Post ID 258)
(258, 13),  -- GARDENING_LANDSCAPING
(258, 1),   -- GENERAL_HELP

-- Web Development Needed (Job Post ID 259)
(259, 15),  -- IT_SUPPORT
(259, 1);   -- GENERAL_HELP


-- User 26 (testuser26) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Painter Needed (Job Post ID 260)
(260, 2),  -- HANDYMAN_SERVICES
(260, 1),  -- GENERAL_HELP

-- House Cleaner Required (Job Post ID 261)
(261, 4),  -- CLEANING_SERVICES
(261, 1),  -- GENERAL_HELP

-- Gardener Needed (Job Post ID 262)
(262, 13), -- GARDENING_LANDSCAPING
(262, 1),  -- GENERAL_HELP

-- Dog Walker Required (Job Post ID 263)
(263, 7),  -- PET_CARE
(263, 1),  -- GENERAL_HELP

-- Plumber Needed (Job Post ID 264)
(264, 3),  -- SKILLED_TRADES
(264, 1),  -- GENERAL_HELP

-- Photographer for Event (Job Post ID 265)
(265, 9),  -- EVENT_STAFF
(265, 1),  -- GENERAL_HELP

-- Tutor for Math Lessons (Job Post ID 266)
(266, 8),  -- TUTORING_MENTORING
(266, 1),  -- GENERAL_HELP

-- Housekeeper Needed (Job Post ID 267)
(267, 4),  -- CLEANING_SERVICES
(267, 1),  -- GENERAL_HELP

-- Moving Assistance (Job Post ID 268)
(268, 21), -- TRANSPORTATION_ASSISTANCE
(268, 1),  -- GENERAL_HELP

-- Website Development Help (Job Post ID 269)
(269, 15), -- IT_SUPPORT
(269, 1);  -- GENERAL_HELP



-- User 27 (testuser27) - Inserting Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id) VALUES
-- Painter Needed (Job Post ID 270)
(270, 2),  -- HANDYMAN_SERVICES
(270, 3),  -- SKILLED_TRADES

-- House Cleaner Required (Job Post ID 271)
(271, 4),  -- CLEANING_SERVICES
(271, 1),  -- GENERAL_HELP

-- Gardener Needed (Job Post ID 272)
(272, 13), -- GARDENING_LANDSCAPING
(272, 1),  -- GENERAL_HELP

-- Dog Walker Required (Job Post ID 273)
(273, 7),  -- PET_CARE
(273, 1),  -- GENERAL_HELP

-- Plumber Needed (Job Post ID 274)
(274, 3),  -- SKILLED_TRADES
(274, 1),  -- GENERAL_HELP

-- Photographer for Event (Job Post ID 275)
(275, 9),  -- EVENT_STAFF
(275, 1),  -- GENERAL_HELP

-- Tutor for Math Lessons (Job Post ID 276)
(276, 8),  -- TUTORING_MENTORING
(276, 1),  -- GENERAL_HELP

-- Housekeeper Needed (Job Post ID 277)
(277, 4),  -- CLEANING_SERVICES
(277, 1),  -- GENERAL_HELP

-- Moving Assistance (Job Post ID 278)
(278, 21), -- TRANSPORTATION_ASSISTANCE
(278, 1),  -- GENERAL_HELP

-- Website Development Help (Job Post ID 279)
(279, 15), -- IT_SUPPORT
(279, 1);  -- GENERAL_HELP


-- User 28 (testuser28) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- Painter Needed (Job Post ID: 281)
    (281, 20),  -- Home Maintenance
    (281, 13),  -- Gardening/Landscaping

    -- House Cleaner Required (Job Post ID: 282)
    (282, 4),   -- Cleaning Services
    (282, 1),   -- General Help

    -- Gardener Needed (Job Post ID: 283)
    (283, 13),  -- Gardening/Landscaping
    (283, 1),   -- General Help

    -- Dog Walker Required (Job Post ID: 284)
    (284, 7),   -- Pet Care
    (284, 1),   -- General Help

    -- Plumber Needed (Job Post ID: 285)
    (285, 20),  -- Home Maintenance
    (285, 1),   -- General Help

    -- Photographer for Event (Job Post ID: 286)
    (286, 9),   -- Event Staff
    (286, 1),   -- General Help

    -- Tutor for Math Lessons (Job Post ID: 287)
    (287, 8),   -- Tutoring/Mentoring
    (287, 1),   -- General Help

    -- Housekeeper Needed (Job Post ID: 288)
    (288, 4),   -- Cleaning Services
    (288, 1),   -- General Help

    -- Moving Assistance (Job Post ID: 289)
    (289, 1),   -- General Help
    (289, 2),   -- Handyman Services

    -- Website Development Help (Job Post ID: 290)
    (290, 2),   -- Handyman Services
    (290, 15);  -- IT Support


-- User 29 (testuser29) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- Electrician Needed (Job Post ID: 291)
    (291, 20),  -- Home Maintenance
    (291, 1),   -- General Help

    -- Window Cleaner Required (Job Post ID: 292)
    (292, 4),   -- Cleaning Services
    (292, 1),   -- General Help

    -- Painter for Interior Walls (Job Post ID: 293)
    (293, 20),  -- Home Maintenance
    (293, 1),   -- General Help

    -- House Cleaner Needed (Job Post ID: 294)
    (294, 4),   -- Cleaning Services
    (294, 1),   -- General Help

    -- Handyman for Repairs (Job Post ID: 295)
    (295, 2),   -- Handyman Services
    (295, 1),   -- General Help

    -- Photographer for Photoshoot (Job Post ID: 296)
    (296, 9),   -- Event Staff
    (296, 1),   -- General Help

    -- Cleaner for Office (Job Post ID: 297)
    (297, 4),   -- Cleaning Services
    (297, 1),   -- General Help

    -- Pet Sitter Required (Job Post ID: 298)
    (298, 7),   -- Pet Care
    (298, 1),   -- General Help

    -- Event Coordinator Needed (Job Post ID: 299)
    (299, 9),   -- Event Staff
    (299, 1),   -- General Help

    -- Carpenter for Furniture (Job Post ID: 300)
    (300, 2),   -- Handyman Services
    (300, 1);   -- General Help

-- User 30 (testuser30) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- Interior Painter Needed
    (301, 20),  -- Home Maintenance
    (301, 1),   -- General Help

    -- Cleaner for Large House
    (302, 4),   -- Cleaning Services
    (302, 1),   -- General Help

    -- Gardener for Garden Maintenance
    (303, 13),  -- Gardening/Landscaping
    (303, 1),   -- General Help

    -- Tutor for Math Lessons
    (304, 8),   -- Tutoring/Mentoring
    (304, 1),   -- General Help

    -- Handyman Required
    (305, 2),   -- Handyman Services
    (305, 1),   -- General Help

    -- Dog Walker for Daily Walks
    (306, 7),   -- Pet Care
    (306, 1),   -- General Help

    -- Plumber Needed
    (307, 20),  -- Home Maintenance
    (307, 1),   -- General Help

    -- Photographer for Event
    (308, 9),   -- Event Staff
    (308, 1),   -- General Help

    -- Moving Help Required
    (309, 1),   -- General Help
    (309, 2),   -- Handyman Services

    -- Website Design Assistance
    (310, 2),   -- Handyman Services
    (310, 15);  -- IT Support













-- User 31 (testuser31) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- House Cleaner Needed
    (311, 4),   -- Cleaning Services
    (311, 1),   -- General Help

    -- Pet Grooming Services
    (312, 7),   -- Pet Care
    (312, 1),   -- General Help

    -- Painter for Living Room
    (313, 20),  -- Home Maintenance
    (313, 1),   -- General Help

    -- Personal Trainer for Gym Sessions
    (314, 8),  -- TUTORING_MENTORING
    (314, 1),   -- General Help

    -- Carpenter for Custom Furniture
    (315, 3),   -- SKILLED_TRADES
    (315, 1),   -- General Help

    -- Photographer for Wedding
    (316, 9),   -- Event Staff
    (316, 1),   -- General Help

    -- Housekeeper for Holiday Home
    (317, 4),   -- Cleaning Services
    (317, 1),   -- General Help

    -- Gardener for Garden Design
    (318, 13),  -- Gardening/Landscaping
    (318, 1),   -- General Help

    -- Electrician for Home Wiring
    (319, 20),  -- HOME_MAINTENANCE
    (319, 1),   -- General Help

    -- Delivery Driver for Small Business
    (320, 5),   -- Delivery Services
    (320, 1);   -- General Help


-- User 32 (testuser32) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- House Cleaner for Spring Cleaning
    (321, 4),   -- Cleaning Services
    (321, 1),   -- General Help

    -- Dog Walker Needed
    (322, 7),   -- Pet Care
    (322, 1),   -- General Help

    -- Home Painting Services
    (323, 20),  -- Home Maintenance
    (323, 1),   -- General Help

    -- Photographer for Family Photoshoot
    (324, 9),   -- Event Staff
    (324, 1),   -- General Help

    -- Electrician for Home Repairs
    (325, 20),  -- HOME_MAINTENANCE
    (325, 1),   -- General Help

    -- Personal Chef for Special Event
    (326, 12),  -- FOOD_SERVICES
    (326, 1),   -- General Help

    -- Gardener for Lawn Care
    (327, 13),  -- Gardening/Landscaping
    (327, 1),   -- General Help

    -- Nanny for Childcare
    (328, 6),   -- CAREGIVING
    (328, 1),   -- General Help

    -- Cleaner for Office Building
    (329, 4),   -- Cleaning Services
    (329, 1),   -- General Help

    -- Mover for Furniture Relocation
    (330, 2),   -- HANDYMAN_SERVICES
    (330, 1);   -- General Help


-- User 33 (testuser33) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- Furniture Assembly Service
    (331, 20),   -- HOME_MAINTENANCE
    (331, 1),   -- General Help

    -- Cleaner for Deep Cleaning
    (332, 4),   -- Cleaning Services
    (332, 1),   -- General Help

    -- Plumber for Pipe Repair
    (333, 20),  -- HOME_MAINTENANCE
    (333, 1),   -- General Help

    -- Babysitter Needed
    (334, 6),   -- CAREGIVING
    (334, 1),   -- General Help

    -- Electrician for Lighting Installation
    (335, 20),  -- HOME_MAINTENANCE
    (335, 1),   -- General Help

    -- Cook for Birthday Party
    (336, 12),  -- FOOD_SERVICES
    (336, 1),   -- General Help

    -- Handyman for Odd Jobs
    (337, 2),  -- Handyman Services
    (337, 1),   -- General Help

    -- Personal Shopper for Clothing
    (338, 22),  -- ERRANDS_SHOPPING
    (338, 1),   -- General Help

    -- Mover for Large Appliances
    (339, 2),   -- HANDYMAN_SERVICES
    (339, 1),   -- General Help

    -- Event Planner for Wedding
    (340, 9),   -- Event Staff
    (340, 1);   -- General Help


-- User 34 (testuser34) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- House Painter for Interior Walls
    (341, 20),   -- HOME_MAINTENANCE
    (341, 1),   -- General Help

    -- Cleaner for Office Space
    (342, 4),   -- Cleaning Services
    (342, 1),   -- General Help

    -- Tutor for Mathematics Lessons
    (343, 8),  -- TUTORING_MENTORING
    (343, 1),   -- General Help

    -- Babysitter Needed for Evening
    (344, 6),   -- CAREGIVING
    (344, 1),   -- General Help

    -- Electrician for Wiring Installation
    (345, 20),  -- HOME_MAINTENANCE
    (345, 1),   -- General Help

    -- Chef for Private Party
    (346, 12),  -- FOOD_SERVICES
    (346, 1),   -- General Help

    -- Gardener for Lawn Care
    (347, 13),  -- Gardening/Lawn Care
    (347, 1),   -- General Help

    -- Photographer for Event
    (348, 16),  -- CREATIVE_SERVICES
    (348, 1),   -- General Help

    -- Moving Assistance for Furniture
    (349, 5),   -- DELIVERY_SERVICES
    (349, 20),   -- HOME_MAINTENANCE

    -- Housekeeper for Daily Chores
    (350, 5),   -- DELIVERY_SERVICES
    (350, 20);   -- HOME_MAINTENANCE

--     TODO
--STOPPED HERE!!!! go to top
-- User 35 (testuser35) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- House Cleaner for Spring Cleaning
    (351, 4),   -- CLEANING_SERVICES
    (351, 1),   -- GENERAL_HELP

    -- Painter for Exterior House
    (352, 20),   -- HOME_MAINTENANCE
    (352, 1),   -- GENERAL_HELP

    -- Tutor for English Lessons
    (353, 18),  -- TUTORING_LANGUAGES
    (353, 1),   -- GENERAL_HELP

    -- Babysitter for Evening Shift
    (354, 8),   -- CAREGIVING
    (354, 1),   -- GENERAL_HELP

    -- Plumber for Leak Repair
    (355, 20),  -- HOME_MAINTENANCE
    (355, 1),   -- GENERAL_HELP

    -- Cook for Private Dinner
    (356, 12),  -- FOOD_SERVICES
    (356, 1),   -- GENERAL_HELP

    -- Gardener for Lawn Maintenance
    (357, 13),  -- GARDENING_LANDSCAPING
    (357, 1),   -- GENERAL_HELP

    -- Photographer for Family Portraits
    (358, 16),  -- CREATIVE_SERVICES
    (358, 1),   -- GENERAL_HELP

    -- Mover for Relocation Services
    (359, 6),   -- MOVING_SERVICES
    (359, 1),   -- GENERAL_HELP

    -- Housekeeper for Daily Chores
    (360, 5),   -- CLEANING_SERVICES
    (360, 20);   -- HOME_MAINTENANCE

-- User 36 (testuser36) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- House Cleaner for Deep Clean
    (361, 4),   -- CLEANING_SERVICES
    (361, 1),   -- GENERAL_HELP

    -- Painter for Interior Walls
    (362, 20),  -- HOME_MAINTENANCE
    (362, 1),   -- GENERAL_HELP

    -- Tutor for Science Lessons
    (363, 8),   -- TUTORING_MENTORING
    (363, 1),   -- GENERAL_HELP

    -- Babysitter for Weekend Care
    (364, 6),   -- CAREGIVING
    (364, 1),   -- GENERAL_HELP

    -- Plumber for Pipe Repair
    (365, 3),   -- SKILLED_TRADES
    (365, 1),   -- GENERAL_HELP

    -- Cook for Family Dinner
    (366, 12),  -- FOOD_SERVICES
    (366, 1),   -- GENERAL_HELP

    -- Gardener for Landscaping
    (367, 13),  -- GARDENING_LANDSCAPING
    (367, 1),   -- GENERAL_HELP

    -- Photographer for Event
    (368, 16),  -- CREATIVE_SERVICES
    (368, 1),   -- GENERAL_HELP

    -- Mover for Relocation Services
    (369, 20),  -- HOME_MAINTENANCE
    (369, 1),   -- GENERAL_HELP

    -- Housekeeper for Weekly Chores
    (370, 4),   -- CLEANING_SERVICES
    (370, 1);   -- GENERAL_HELP


-- User 37 (testuser37) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- House Cleaner for Spring Cleaning
    (371, 4),   -- CLEANING_SERVICES
    (371, 1),   -- GENERAL_HELP

    -- Painter for House Exterior
    (372, 20),  -- HOME_MAINTENANCE
    (372, 1),   -- GENERAL_HELP

    -- Tutor for Math Lessons
    (373, 8),   -- TUTORING_MENTORING
    (373, 1),   -- GENERAL_HELP

    -- Babysitter for Evening Shift
    (374, 6),   -- CAREGIVING
    (374, 1),   -- GENERAL_HELP

    -- Plumber for Toilet Repair
    (375, 3),   -- SKILLED_TRADES
    (375, 1),   -- GENERAL_HELP

    -- Cook for Family Dinner
    (376, 12),  -- FOOD_SERVICES
    (376, 1),   -- GENERAL_HELP

    -- Gardener for Lawn Maintenance
    (377, 13),  -- GARDENING_LANDSCAPING
    (377, 1),   -- GENERAL_HELP

    -- Photographer for Event
    (378, 16),  -- CREATIVE_SERVICES
    (378, 1),   -- GENERAL_HELP

    -- Mover for Relocation Services
    (379, 20),  -- HOME_MAINTENANCE
    (379, 1),   -- GENERAL_HELP

    -- Housekeeper for Daily Chores
    (380, 4),   -- CLEANING_SERVICES
    (380, 1);   -- GENERAL_HELP


-- User 38 (testuser38) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- Cleaner for Deep Clean
    (381, 4),   -- CLEANING_SERVICES
    (381, 1),   -- GENERAL_HELP

    -- Painter for House Walls
    (382, 20),  -- HOME_MAINTENANCE
    (382, 1),   -- GENERAL_HELP

    -- Tutor for English Lessons
    (383, 8),   -- TUTORING_MENTORING
    (383, 1),   -- GENERAL_HELP

    -- Babysitter for Weekend Care
    (384, 6),   -- CAREGIVING
    (384, 1),   -- GENERAL_HELP

    -- Plumber for Leaky Faucet
    (385, 3),   -- SKILLED_TRADES
    (385, 1),   -- GENERAL_HELP

    -- Cook for Family Dinner
    (386, 12),  -- FOOD_SERVICES
    (386, 1),   -- GENERAL_HELP

    -- Gardener for Lawn Care
    (387, 13),  -- GARDENING_LANDSCAPING
    (387, 1),   -- GENERAL_HELP

    -- Photographer for Event
    (388, 16),  -- CREATIVE_SERVICES
    (388, 1),   -- GENERAL_HELP

    -- Mover for Relocation Services
    (389, 20),  -- HOME_MAINTENANCE
    (389, 1),   -- GENERAL_HELP

    -- Housekeeper for Daily Chores
    (390, 4),   -- CLEANING_SERVICES
    (390, 1);   -- GENERAL_HELP


-- User 39 (testuser39) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- Cleaner for Office Space
    (391, 4),   -- CLEANING_SERVICES
    (391, 1),   -- GENERAL_HELP

    -- Painter for House Interior
    (392, 20),  -- HOME_MAINTENANCE
    (392, 1),   -- GENERAL_HELP

    -- Tutor for History Lessons
    (393, 8),   -- TUTORING_MENTORING
    (393, 1),   -- GENERAL_HELP

    -- Babysitter for Evening Shift
    (394, 6),   -- CAREGIVING
    (394, 1),   -- GENERAL_HELP

    -- Plumber for Leak Repair
    (395, 3),   -- SKILLED_TRADES
    (395, 1),   -- GENERAL_HELP

    -- Cook for Party Catering
    (396, 12),  -- FOOD_SERVICES
    (396, 1),   -- GENERAL_HELP

    -- Gardener for Lawn Maintenance
    (397, 13),  -- GARDENING_LANDSCAPING
    (397, 1),   -- GENERAL_HELP

    -- Photographer for Portrait Session
    (398, 16),  -- CREATIVE_SERVICES
    (398, 1),   -- GENERAL_HELP

    -- Mover for Furniture Relocation
    (399, 20),  -- HOME_MAINTENANCE
    (399, 1),   -- GENERAL_HELP

    -- Housekeeper for Weekly Chores
    (400, 4),   -- CLEANING_SERVICES
    (400, 1);   -- GENERAL_HELP


-- User 40 (testuser40) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- Cleaner for Residential House
    (401, 4),   -- CLEANING_SERVICES
    (401, 1),   -- GENERAL_HELP

    -- Painter for House Exterior
    (402, 7),   -- HOME_MAINTENANCE
    (402, 1),   -- GENERAL_HELP

    -- Tutor for Maths Lessons
    (403, 8),   -- TUTORING_MENTORING
    (403, 1),   -- GENERAL_HELP

    -- Babysitter for Weekend Care
    (404, 6),   -- CAREGIVING
    (404, 1),   -- GENERAL_HELP

    -- Plumber for Drain Cleaning
    (405, 3),   -- SKILLED_TRADES
    (405, 1),   -- GENERAL_HELP

    -- Cook for Catering Service
    (406, 12),  -- FOOD_SERVICES
    (406, 1),   -- GENERAL_HELP

    -- Gardener for Landscaping
    (407, 13),  -- GARDENING_LANDSCAPING
    (407, 1),   -- GENERAL_HELP

    -- Photographer for Family Photoshoot
    (408, 16),  -- CREATIVE_SERVICES
    (408, 1),   -- GENERAL_HELP

    -- Mover for Furniture Relocation
    (409, 20),  -- HOME_MAINTENANCE
    (409, 1),   -- GENERAL_HELP

    -- Housekeeper for Daily Chores
    (410, 4),   -- CLEANING_SERVICES
    (410, 1);   -- GENERAL_HELP















-- User 41 (testuser41) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- Cleaner for Residential House
    (411, 4),   -- Cleaning Services
    (411, 1),   -- General Help

    -- Painter for House Interior
    (412, 7),   -- Creative Services
    (412, 1),   -- General Help

    -- Tutor for English Lessons
    (413, 8),   -- Tutoring/Mentoring
    (413, 1),   -- General Help

    -- Babysitter for Evening Care
    (414, 12),  -- Babysitting
    (414, 1),   -- General Help

    -- Plumber for Pipe Repair
    (415, 18),  -- Plumbing Services
    (415, 1),   -- General Help

    -- Cook for Family Dinner
    (416, 12),  -- Food Services
    (416, 1),   -- General Help

    -- Gardener for Lawn Care
    (417, 13),  -- Gardening/Landscaping
    (417, 1),   -- General Help

    -- Photographer for Wedding Photoshoot
    (418, 15),  -- Creative Services
    (418, 1),   -- General Help

    -- Mover for Household Items
    (419, 9),   -- Moving/Relocation
    (419, 1),   -- General Help

    -- Housekeeper for Weekly Chores
    (420, 4),   -- Cleaning Services
    (420, 1);   -- General Help


-- User 42 (testuser42) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- Electrician for House Wiring
    (421, 20),  -- Home Maintenance
    (421, 1),   -- General Help

    -- Roofing Specialist for Roof Repair
    (422, 6),   -- Handyman Services
    (422, 1),   -- General Help

    -- Personal Trainer for Fitness Sessions
    (423, 11),  -- Personal Training
    (423, 1),   -- General Help

    -- Cleaner for Office Space
    (424, 4),   -- Cleaning Services
    (424, 1),   -- General Help

    -- Babysitter for Weekend Care
    (425, 12),  -- Babysitting
    (425, 1),   -- General Help

    -- Cook for Family Dinner
    (426, 12),  -- Food Services
    (426, 1),   -- General Help

    -- Painter for House Interior
    (427, 6),   -- Handyman Services
    (427, 1),   -- General Help

    -- Photographer for Family Portraits
    (428, 16),  -- Creative Services
    (428, 1),   -- General Help

    -- Gardener for Lawn Care
    (429, 13),  -- Gardening/Landscaping
    (429, 1),   -- General Help

    -- Tutor for Math Lessons
    (430, 8),   -- Tutoring/Mentoring
    (430, 1);   -- General Help


-- User 434343 (testuser434343) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- Plumber for Pipe Repair
    (431, 20),  -- Home Maintenance

    -- Carpenter for Furniture Assembly
    (432, 6),   -- Handyman Services

    -- Housekeeper for Deep Cleaning
    (433, 4),   -- Cleaning Services

    -- Tutor for English Lessons
    (434, 8),   -- Tutoring/Mentoring

    -- Photographer for Event Photography
    (435, 16),  -- Creative Services

    -- Mover for Relocation
    (436, 5),   -- Delivery Services

    -- Personal Chef for Family Dinner
    (437, 12),  -- Food Services

    -- Electrician for Light Fixture Installation
    (438, 20),  -- Home Maintenance

    -- Gardener for Yard Maintenance
    (439, 13),  -- Gardening/Landscaping

    -- Painter for Home Interior
    (440, 6),   -- Handyman Services
    (440, 1);   -- General Help


-- User 444444 (testuser444444) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- Electrician for Wiring Repair
    (441, 20),  -- Home Maintenance

    -- Roof Repair Specialist
    (442, 6),   -- Handyman Services

    -- Cleaner for Office Space
    (443, 4),   -- Cleaning Services

    -- Plumber for Pipe Fix
    (444, 20),  -- Home Maintenance

    -- Personal Trainer for Sessions
    (445, 17),  -- Personal Services

    -- Painter for Interior Walls
    (446, 6),   -- Handyman Services
    (446, 1),   -- General Help

    -- Gardener for Lawn Maintenance
    (447, 13),  -- Gardening/Landscaping
    (447, 1),   -- General Help

    -- Photographer for Event
    (448, 16),  -- Creative Services

    -- Cook for Family Dinner
    (449, 12),  -- Food Services
    (449, 1),   -- General Help

    -- Babysitter for Evening Care
    (450, 7),   -- Pet Care
    (450, 1);   -- General Help

-- User 454545 (testuser454545) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- Carpenter for Furniture Repair
    (451, 6),   -- Handyman Services

    -- Electrician for Electrical Installations
    (452, 20),  -- Home Maintenance
    (452, 1),   -- General Help

    -- Gardener for Garden Landscaping
    (453, 13),  -- Gardening/Landscaping

    -- Plumber for Leaking Pipes
    (454, 20),  -- Home Maintenance

    -- Cleaner for Housekeeping Services
    (455, 4),   -- Cleaning Services
    (455, 1),   -- General Help

    -- Painter for Home Interior
    (456, 6),   -- Handyman Services
    (456, 1),   -- General Help

    -- Chef for Private Event
    (457, 12),  -- Food Services

    -- Photographer for Wedding
    (458, 16),  -- Creative Services

    -- Mover for Furniture Relocation
    (459, 5),   -- Delivery Services

    -- Babysitter for Evening Shift
    (460, 7),   -- Pet Care
    (460, 1);   -- General Help

-- User 464646 (testuser464646) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- Cleaner for Office Cleaning
    (461, 4),   -- Cleaning Services

    -- Driver for Delivery
    (462, 5),   -- Delivery Services

    -- Gardener for Lawn Mowing
    (463, 13),  -- Gardening/Landscaping

    -- Plumber for Pipe Installation
    (464, 3),   -- Skilled Trades

    -- Painter for Exterior Painting
    (465, 7),   -- Skilled Trades
    (465, 1),   -- General Help

    -- Photographer for Event Photography
    (466, 16),  -- Creative Services

    -- Chef for Catering Service
    (467, 12),  -- Food Services

    -- Electrician for Home Wiring
    (468, 3),   -- Skilled Trades
    (468, 1),   -- General Help

    -- Mover for Furniture Delivery
    (469, 5),   -- Delivery Services

    -- Babysitter for Afternoon Shift
    (470, 6),   -- Caregiving
    (470, 1);   -- General Help


-- User 474747 (testuser474747) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- Carpenter for Custom Furniture
    (471, 2),   -- Handyman Services
    (471, 1),   -- General Help

    -- Electrician for Electrical Repairs
    (472, 3),   -- Skilled Trades
    (472, 1),   -- General Help

    -- Gardener for Lawn Maintenance
    (473, 13),  -- Gardening/Landscaping

    -- Plumber for Pipe Repair
    (474, 3),   -- Skilled Trades

    -- Painter for Home Interior
    (475, 7),   -- Skilled Trades
    (475, 1),   -- General Help

    -- Chef for Private Event Catering
    (476, 12),  -- Food Services
    (476, 1),   -- General Help

    -- Photographer for Family Photoshoot
    (477, 16),  -- Creative Services

    -- Electrician for Home Wiring
    (478, 3),   -- Skilled Trades

    -- Mover for Furniture Relocation
    (479, 5),   -- Delivery Services

    -- Babysitter for Evening Shift
    (480, 6),   -- Caregiving
    (480, 1);   -- General Help

-- User 484848 (testuser484848) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- Painter for House Exterior
    (481, 3),   -- Skilled Trades

    -- Chef for Private Dinner Party
    (482, 12),  -- Food Services

    -- Cleaner for Office Space
    (483, 4),   -- Cleaning Services

    -- Gardener for Garden Maintenance
    (484, 13),  -- Gardening/Landscaping

    -- Electrician for Wiring Installation
    (485, 3),   -- Skilled Trades

    -- Plumber for Pipe Replacement
    (486, 3),   -- Skilled Trades

    -- Mover for Furniture Relocation
    (487, 5),   -- Delivery Services

    -- Babysitter for Evening Shift
    (488, 6),   -- Caregiving

    -- Photographer for Event
    (489, 16),  -- Creative Services

    -- Carpenter for Custom Furniture
    (490, 2),   -- Handyman Services
    (490, 1);   -- General Help

-- User 494949 (testuser494949) - Job Post Tags
INSERT INTO public.jobpost_tag (job_post_id, tag_id)
VALUES
    -- Cleaner for Residential Home
    (491, 4),   -- Cleaning Services

    -- Chef for Family Dinner
    (492, 12),  -- Food Services

    -- Handyman for Home Repairs
    (493, 2),   -- Handyman Services

    -- Electrician for Wiring Repair
    (494, 3),   -- Skilled Trades

    -- Gardener for Lawn Care
    (495, 13),  -- Gardening/Landscaping

    -- Painter for Room Decoration
    (496, 3),   -- Skilled Trades

    -- Mover for Furniture Relocation
    (497, 5),   -- Delivery Services

    -- Tutor for Mathematics Lessons
    (498, 8),   -- Tutoring/Mentoring

    -- Photographer for Event Photos
    (499, 16),  -- Creative Services

    -- Cleaner for Office Space
    (500, 4),   -- Cleaning Services
    (500, 1);   -- General Help




