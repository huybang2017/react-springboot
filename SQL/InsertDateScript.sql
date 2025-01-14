-- USE `Project_Freelance_001`;
USE `bigboysbd`;


-- Insert sample data into ShoeType table
INSERT INTO `ShoeType`  (`ShoeTypeName`) VALUES
                        ('Các loại sản phẩm khác'),
                        ('Dép'),
                        ('Sneakers'),
                        ('Vớ');

-- Insert sample data into Brand table
INSERT INTO `Brand` (`BrandName`, `Logo`) VALUES
                    ('Các thương hiệu khác', 	'default_logo.png'),
                    ('Nike', 					'nike_logo.png'),
                    ('Adidas', 					'adidas_logo.jpg'),
                    ('Puma', 					'puma_logo.png'),
                    ('Converse', 				'converse_logo.png'),
                    ('Vans', 					'vans_logo.png');

-- Insert sample data into Color table
INSERT INTO `Color` (`ColorName`) VALUES
                    ('Đen'),
                    ('Trắng'),
                    ('Đỏ'),
                    ('Xám'),
                    ('Xanh lá cây'),
                    ('Vàng'),
                    ('Tím'),
                    ('Nâu'),
                    ('Xanh dương'),
                    ('Hồng'),
                    ('Cam'),
                    ('Tím than'),
                    ('Xanh rêu'),
                    ('Bạc'),
                    ('Vàng đồng'),
                    ('Hồng phấn'),
                    ('Be'),
                    ('Đỏ đậm'),
                    ('Nâu đậm'),
                    ('Xanh biển'),
                    ('Ngọc lam'),
                    ('Xanh neon'),
                    ('Vàng chanh'),
                    ('Nâu nhạt'),
                    ('Xám nhạt'),
                    ('Đỏ cam'),
                    ('Tím nhạt'),
                    ('Trắng ngà'),
                    ('Bạc nhạt'),
                    ('Xanh olive');


-- Insert sample data into Shoe table
INSERT INTO `Shoe` 	(`ShoeId`,	`ShoeName`, 																															`Status`, 		`Priority`, 		`Description`, 						`BrandId`, 		`ShoeTypeId`,			`CreateDate`				) VALUES
					(1,			'[BIG SIZE 44-50] Dép Quai Ngang Size Lớn Big Size Das Đúc Black Ba Sọc Giày Dép Lê Size Lớn Ngoại Cỡ 44 45 46 47', 					TRUE, 				FALSE, 			'Mô tả cho dép Adidas', 			2, 					1,					'2024-07-03 10:00:00'		),
					(2,			'[BIG SIZE 44-50] Giày Size Lớn Big Size NK JD LOW Trắng Đỏ Cổ Đen Đủ Phối Màu Giày Dép Sneaker Thể Thao Ngoại Cỡ 44 45 46 47 48 ', 	TRUE, 				FALSE, 			'Mô tả cho giày Nike', 				1, 					2,					'2024-07-02 10:00:00'		),
					(3,			'[BIG SIZE 44-50] Giày Size Lớn Big Size NK JD LOW Trắng Đen Đủ Phối Màu Giày Dép Sneaker Thể Thao Ngoại Cỡ 44 45 46 47 48 ', 			TRUE, 				FALSE, 			'Mô tả cho giày Nike', 				1, 					2,					'2024-07-02 10:00:00'		),
					(4,			'[BIG SIZE 44-50] Giày Size Lớn Big Size NK JD LOW Trắng Cổ Đỏ Đủ Phối Màu Giày Dép Sneaker Thể Thao Ngoại Cỡ 44 45 46 47 48 ', 		TRUE, 				FALSE, 			'Mô tả cho giày Nike', 				1, 					2,					'2024-07-02 10:00:00'		),
					(5,			'[BIG SIZE 44-50] Giày Size Lớn Big Size NK JD LOW Đen Đỏ Đủ Phối Màu Giày Dép Sneaker Thể Thao Ngoại Cỡ 44 45 46 47 48 ', 				TRUE, 				FALSE, 			'Mô tả cho giày Nike', 				1, 					2,					'2024-07-02 10:00:00'		),
					(6,			'[BIG SIZE 44-50] Giày Size Lớn Big Size NK JD LOW Trắng Tinh Khiết Đủ Phối Màu Giày Dép Sneaker Thể Thao Ngoại Cỡ 44 45 46 47 48 ', 	TRUE, 				FALSE, 			'Mô tả cho giày Nike', 				1, 					2,					'2024-07-02 10:00:00'		),
					(7,			'[BIG SIZE 44-50] Giày Size Lớn Big Size NK JD LOW Xám Trắng Kem Đủ Phối Màu Giày Dép Sneaker Thể Thao Ngoại Cỡ 44 45 46 47 48 ', 		TRUE, 				FALSE, 			'Mô tả cho giày Nike', 				1, 					2,					'2024-07-02 10:00:00'		),
					(8,			'[BIG SIZE 44-50] Giày Size Lớn Big Size NK JD LOW Trắng Đỏ Đủ Phối Màu Giày Dép Sneaker Thể Thao Ngoại Cỡ 44 45 46 47 48 ', 			TRUE, 				FALSE, 			'Mô tả cho giày Nike', 				1, 					2,					'2024-07-02 10:00:00'		),
					(9,			'[BIG SIZE 44-50] Giày Size Lớn Big Size NK JD LOW Xám Trắng Phối Màu Giày Dép Sneaker Thể Thao Ngoại Cỡ 44 45 46 47 48 ', 				TRUE, 				FALSE, 			'Mô tả cho giày Nike', 				1, 					2,					'2024-07-02 10:00:00'		),
					(10,		'[BIG SIZE 44-50] Giày Size Lớn Big Size NK JD LOW Xám Trắng Đen Phối Màu Giày Dép Sneaker Thể Thao Ngoại Cỡ 44 45 46 47 48 ', 			TRUE, 				FALSE, 			'Mô tả cho giày Nike', 				1, 					2,					'2024-07-02 10:00:00'		),
                    (11,        '[BIG SIZE 44-50] Giày Sandal Nam Xỏ Ngón Size Lớn Big Size Chống Trơn Trượt',                                                          TRUE,               FALSE,          'Mô tả cho Sandal',                 3,                  3,                  '2024-07-10 11:00:00'),
                    (12,        '[BIG SIZE 44-50] Giày Chạy Bộ Size Lớn Big Size NB Fresh Foam Đen Xanh',                                                               TRUE,               FALSE,          'Mô tả cho giày New Balance',       5,                  4,                  '2024-07-10 11:10:00'),
                    (13,        '[BIG SIZE 44-50] Giày Leo Núi Nam Size Lớn Big Size Columbia Chống Nước',                                                              TRUE,               FALSE,          'Mô tả cho giày Columbia',          5,                  4,                  '2024-07-11 09:30:00'),
                    (14,        '[BIG SIZE 44-50] Giày Thể Hình Size Lớn Big Size Puma Đen Trắng',                                                                      TRUE,               FALSE,          'Mô tả cho giày thể hình Puma',     4,                  1,                 '2024-07-11 10:00:00'),
                    (15,        '[BIG SIZE 44-50] Giày Thời Trang Size Lớn Big Size Gucci Sneaker Da Trắng',                                                            TRUE,               TRUE,           'Mô tả cho giày thời trang Gucci',  5,                  1,                 '2024-07-12 14:00:00'),
                    (16,        '[BIG SIZE 44-50] Giày Cao Gót Size Lớn Big Size Đen Nhung Sang Trọng',                                                                 TRUE,               FALSE,          'Mô tả cho giày cao gót',           5,                  1,                 '2024-07-13 13:00:00'),
                    (17,        '[BIG SIZE 44-50] Giày Công Sở Size Lớn Big Size Derby Da Bò Đen',                                                                      TRUE,               FALSE,          'Mô tả cho giày công sở',           2,                  2,                 '2024-07-14 15:30:00'),
                    (18,        '[BIG SIZE 44-50] Giày Thể Thao Size Lớn Big Size Nike Air Max Trắng Xanh',                                                             TRUE,               TRUE,           'Mô tả cho giày thể thao Nike',     1,                  3,                  '2024-07-15 08:30:00'),
                    (19,        '[BIG SIZE 44-50] Giày Golf Size Lớn Big Size Mizuno Đen Trắng',                                                                        TRUE,               FALSE,          'Mô tả cho giày golf Mizuno',       2,                  2,                 '2024-07-16 11:30:00'),
                    (20,        '[BIG SIZE 44-50] Giày Đi Bộ Đường Dài Size Lớn Big Size Salomon',                                                                      TRUE,               FALSE,          'Mô tả cho giày đi bộ Salomon',     3,                  1,                 '2024-07-16 09:00:00'),
                    (21,        '[BIG SIZE 44-50] Giày Bảo Hộ Lao Động Size Lớn Big Size Timberland',                                                                   TRUE,               FALSE,          'Mô tả cho giày bảo hộ',            3,                  2,                 '2024-07-17 16:30:00'),
                    (22,        '[BIG SIZE 44-50] Giày Sandal Size Lớn Big Size Birkenstock Xanh Lá',                                                                   TRUE,               FALSE,          'Mô tả cho Sandal Birkenstock',     3,                  4,                  '2024-07-18 10:00:00'),
                    (23,        '[BIG SIZE 44-50] Giày Moto Size Lớn Big Size Chống Nước Da Đen',                                                                       TRUE,               TRUE,           'Mô tả cho giày moto',              2,                  4,                 '2024-07-19 09:45:00'),
                    (24,        '[BIG SIZE 44-50] Giày Tennis Size Lớn Big Size Asics Trắng Xanh Dương',                                                                TRUE,               FALSE,          'Mô tả cho giày tennis Asics',      5,                  1,                 '2024-07-20 08:00:00'),
                    (25,        '[BIG SIZE 44-50] Giày Trượt Tuyết Size Lớn Big Size The North Face',                                                                   TRUE,               FALSE,          'Mô tả cho giày trượt tuyết',       5,                  3,                 '2024-07-20 14:00:00'),
                    (26,        '[BIG SIZE 44-50] Giày Tập Gym Size Lớn Big Size Under Armour Đen',                                                                     TRUE,               FALSE,          'Mô tả cho giày tập gym ',          5,                  2,                 '2024-07-21 07:30:00'),
                    (27,        '[BIG SIZE 44-50] Giày Dã Ngoại Size Lớn Big Size Patagonia Chống Thấm',                                                                TRUE,               FALSE,          'Mô tả cho giày dã ngoại ',         2,                  2,                 '2024-07-22 16:00:00'),
                    (28,        '[BIG SIZE 44-50] Giày Vớ Size Lớn Big Size Trắng Thoáng Khí',                                                                          TRUE,               FALSE,          'Mô tả cho giày vớ',                2,                  4,                  '2024-07-22 15:00:00'),
                    (29,        '[BIG SIZE 44-50] Giày Đá Bóng Trong Nhà Size Lớn Big Size Adidas',                                                                     TRUE,               FALSE,          'Mô tả cho giày đá bóng Adidas',    3,                  1,                 '2024-07-23 12:00:00'),
                    (30,        '[BIG SIZE 44-50] Giày Đi Biển Size Lớn Big Size Vans Chống Nước',                                                                      TRUE,               FALSE,          'Mô tả cho giày đi biển Vans',      2,                  2,                 '2024-07-23 08:00:00');
                    
INSERT INTO `ShoeColor`(`ColorId`, `ShoeId`)
VALUES					(1,				1),  
						(2,				1),

						(2,				2),
						(3,				2),

						(1,				3),
						(2,				3),

						(2,				4),
						(3,				4),

						(1,				5),
						(2,				5),
						(3,				5),

						(2,				6),

						(2,				7),
						(4,				7),

						(2,				8),
						(3,				8),

						(2,				9),
						(4,				9),

						(1,				10),
						(2,				10),
                        (4,				10),

                        (1,				11),
						(2,				11),

						(2,				12),
						(3,				12),

						(1,				13),
						(2,				13),

						(2,				14),
						(3,				14),
                        
						(1,				15),
						(2,				15),
						(3,				15),

						(2,				16),

						(2,				17),
						(4,				17),

						(2,				18),
						(3,				18),

						(2,				19),
						(4,				19),

						(1,				20),
						(2,				20),
                        (4,				20),

						(1,				21),
						(2,				21),

						(2,				22),
						(3,				22),

						(1,				23),
						(2,				23),

						(2,				24),
						(3,				24),

						(1,				25),
						(2,				25),
						(3,				25),

						(2,				26),

						(2,				27),
						(4,				27),

						(2,				28),
						(3,				28),

						(2,				29),
						(4,				29),

						(1,				30),
						(2,				30),
                        (4,				30);


        
-- Insert sample data into ShoeSize table
INSERT INTO `ShoeSize` (`ShoeId`, `Size`, `Price`, `Quanlity`, `Status`) VALUES
						(1, 44, 120, 100, true),
						(1, 45, 130, 90, true),
						(1, 46, 140, 80, false),
                        (1, 47, 150, 70, true),
						(1, 50, 150, 70, true),
						(1, 51, 150, 70, false),

                        
                        (2, 44, 120, 100, true),
						(2, 45, 130, 90, true),
						(2, 46, 140, 80, false),
                        (2, 47, 150, 70, true),
                        (2, 48, 120, 0, true),
                        
						(3, 44, 120, 100, true),
						(3, 45, 130, 90, true),
						(3, 46, 140, 80, false),
                        (3, 47, 150, 70, true),
                        (3, 48, 120, 0, true),
                        
                        (4, 44, 120, 100, true),
						(4, 45, 130, 90, true),
						(4, 46, 140, 80, false),
                        (4, 47, 150, 70, true),
                        (4, 48, 120, 0, true),
                        
                        (5, 44, 120, 100, true),
						(5, 45, 130, 90, true),
						(5, 46, 140, 80, false),
                        (5, 47, 150, 70, true),
                        (5, 48, 120, 0, true),
                        
                        (6, 44, 120, 100, true),
						(6, 45, 130, 90, true),
						(6, 46, 140, 80, false),
                        (6, 47, 150, 70, true),
                        (6, 48, 120, 0, true),
                        
                        (7, 44, 120, 100, true),
						(7, 45, 130, 90, true),
						(7, 46, 140, 80, false),
                        (7, 47, 150, 70, true),
                        (7, 48, 120, 0, true),

                        (8, 44, 120, 100, true),
						(8, 45, 130, 90, true),
						(8, 46, 140, 80, false),
                        (8, 47, 150, 70, true),
                        (8, 48, 120, 0, true),
                        
                        (9, 44, 120, 100, true),
						(9, 45, 130, 90, true),
						(9, 46, 140, 80, false),
                        (9, 47, 150, 70, true),
                        (9, 48, 120, 0, true),
                        
                        (10, 44, 120, 100, true),
						(10, 45, 130, 90, true),
						(10, 46, 140, 80, false),
                        (10, 47, 150, 70, true),
                        (10, 48, 120, 0, true),

                         (11, 44, 120, 100, true),
						(11, 45, 130, 90, true),
						(11, 46, 140, 80, false),
                        (11, 47, 150, 70, true),
						(11, 48, 120, 0, true),

                        (12, 44, 120, 100, true),
						(12, 45, 130, 90, true),
						(12, 46, 140, 80, false),
                        (12, 47, 150, 70, true),
                        (12, 48, 120, 0, true),

						(13, 44, 120, 100, true),
						(13, 45, 130, 90, true),
						(13, 46, 140, 80, false),
                        (13, 47, 150, 70, true),
                        (13, 48, 120, 0, true),
                        
                        (14, 44, 120, 100, true),
						(14, 45, 130, 90, true),
						(14, 46, 140, 80, false),
                        (14, 47, 150, 70, true),
                        (14, 48, 120, 0, true),

                        (15, 44, 120, 100, true),
						(15, 45, 130, 90, true),
						(15, 46, 140, 80, false),
                        (15, 47, 150, 70, true),
                        (15, 48, 120, 0, true),

						(16, 44, 120, 100, true),
						(16, 45, 130, 90, true),
						(16, 46, 140, 80, false),
                        (16, 47, 150, 70, true),
                        (16, 48, 120, 0, true),
                        
                        (17, 44, 120, 100, true),
						(17, 45, 130, 90, true),
						(17, 46, 140, 80, false),
                        (17, 47, 150, 70, true),
                        (17, 48, 120, 0, true),

                        (18, 44, 120, 100, true),
						(18, 45, 130, 90, true),
						(18, 46, 140, 80, false),
                        (18, 47, 150, 70, true),
                        (18, 48, 120, 0, true),
                        
                        (19, 44, 120, 100, true),
						(19, 45, 130, 90, true),
						(19, 46, 140, 80, false),
                        (19, 47, 150, 70, true),
                        (19, 48, 120, 0, true),
                        
                        (20, 44, 120, 100, true),
						(20, 45, 130, 90, true),
						(20, 46, 140, 80, false),
                        (20, 47, 150, 70, true),
                        (20, 48, 120, 0, true),

                        (21, 44, 120, 100, true),
						(21, 45, 130, 90, true),
						(21, 46, 140, 80, false),
                        (21, 47, 150, 70, true),
                        (21, 48, 120, 0, true),

                        (22, 44, 120, 100, true),
						(22, 45, 130, 90, true),
						(22, 46, 140, 80, false),
                        (22, 47, 150, 70, true),
                        (22, 48, 120, 0, true),

                        (23, 44, 120, 100, true),
						(23, 45, 130, 90, true),
						(23, 46, 140, 80, false),
                        (23, 47, 150, 70, true),
                        (23, 48, 120, 0, true),

                        (24, 44, 120, 100, true),
						(24, 45, 130, 90, true),
						(24, 46, 140, 80, false),
                        (24, 47, 150, 70, true),
                        (24, 48, 120, 0, true),

                        (25, 44, 120, 100, true),
						(25, 45, 130, 90, true),
						(25, 46, 140, 80, false),
                        (25, 47, 150, 70, true),
                        (25, 48, 120, 0, true),

                        (26, 44, 120, 100, true),
						(26, 45, 130, 90, true),
						(26, 46, 140, 80, false),
                        (26, 47, 150, 70, true),
                        (26, 48, 120, 0, true),

                        (27, 44, 120, 100, true),
						(27, 45, 130, 90, true),
						(27, 46, 140, 80, false),
                        (27, 47, 150, 70, true),
                        (27, 48, 120, 0, true),

                        (28, 44, 120, 100, true),
						(28, 45, 130, 90, true),
						(28, 46, 140, 80, false),
                        (28, 47, 150, 70, true),
                        (28, 48, 120, 0, true),

                        (29, 44, 120, 100, true),
						(29, 45, 130, 90, true),
						(29, 46, 140, 80, false),
                        (29, 47, 150, 70, true),
                        (29, 48, 120, 0, true),

                        (30, 44, 120, 100, true),
						(30, 45, 130, 90, true),
						(30, 46, 140, 80, false),
                        (30, 47, 150, 70, true),
                        (30, 48, 120, 0, true);

					

-- Insert sample data into ShoeImage table
INSERT INTO `ShoeImage` (`Path`, 														`Priority`, 		`ShoeId`) VALUES
						('z5641604839718_1b17a65b71e63eac7737450946213a3a.jpg', 			1, 					1),
						('z5641604868114_ddcc81c7ef914bf0b7c38680f71ef38d.jpg', 			0, 					1),
                        ('z5641604897479_6c36144752689e5279da3e34a35c0f88.jpg', 			0, 					1),
						('z5641604925586_1753f58e992f63fedad8b7e79ccbefd8.jpg', 			0, 					1),
						('z5641604925695_abb604957d35f9ceb4a63c3ebc8e159e.jpg', 			0, 					1),
						('z5641604954074_c43979e5b3376df06735cedd68bdcb62.jpg', 			0, 					1),
						('z5641605012421_5b8e80ebda929508b617f58290bb29e0.jpg', 			0, 					1),
						('z5641605012586_7b439585b09619e1a4d35a96c3f71549.jpg', 			0, 					1),
						('z5641605042121_5c2313e19f76ee55fbe20c26174e88ed.jpg', 			0, 					1),
                        
                        ('z5641519946609_4532d0a2c0c0e8b27015a02bca200d21.jpg', 			1, 					2),


						('z5641519946725_1340f0e2b247520f9eb2fb568cc1c0bd.jpg', 			1, 					3),


						('z5641519989234_8b4778c5e894e08e44b028359ac7ba47.jpg', 			1, 					4),


						('z5641519989335_9e76c37753d22f3d545b85a33241fbb4.jpg', 			1, 					5),


						('z5641520032581_d39a663d8b2a9d79feba57adbebcc1cb.jpg', 			1, 					6),


						('z5641520076699_d056761c7e4c9465abe2ac3db63af8d5.jpg', 			1, 					7),


						('z5641520076828_d590b118da42bceca35961b3973a4539.jpg', 			1, 					8),

						('z5641520119202_631f638eaaca555ab71fec27240a87a3.jpg', 			1, 					9),


						('z5641520162272_a570750742b5094e8c77cebebe48c517.jpg', 			1, 					10),

                        ('z5641604839718_1b17a65b71e63eac7737450946213a3b.jpg', 1, 11),
                        ('z5641604868114_ddcc81c7ef914bf0b7c38680f71ef38e.jpg', 0, 11),
                        ('z5641604897479_6c36144752689e5279da3e34a35c0f88b.jpg', 0, 11),
                        ('z5641604925586_1753f58e992f63fedad8b7e79ccbefd8b.jpg', 0, 11),
                        
                        -- ShoeId 12
                        ('z5641604925695_abb604957d35f9ceb4a63c3ebc8e159f.jpg', 1, 12),
                        ('z5641604954074_c43979e5b3376df06735cedd68bdcb62.jpg', 0, 12),
                        ('z5641605012421_5b8e80ebda929508b617f58290bb29e0.jpg', 0, 12),
                        ('z5641605012586_7b439585b09619e1a4d35a96c3f71549.jpg', 0, 12),
                        
                        -- ShoeId 13
                        ('z5641605042121_5c2313e19f76ee55fbe20c26174e88ed.jpg', 1, 13),
                        ('z5641519946609_4532d0a2c0c0e8b27015a02bca200d21.jpg', 0, 13),
                        
                        -- ShoeId 14
                        ('z5641519946725_1340f0e2b247520f9eb2fb568cc1c0bd.jpg', 1, 14),
                        
                        -- ShoeId 15
                        ('z5641519989234_8b4778c5e894e08e44b028359ac7ba47.jpg', 1, 15),
                        
                        -- ShoeId 16
                        ('z5641519989335_9e76c37753d22f3d545b85a33241fbb4.jpg', 1, 16),
                        
                        -- ShoeId 17
                        ('z5641520032581_d39a663d8b2a9d79feba57adbebcc1cb.jpg', 1, 17),
                        
                        -- ShoeId 18
                        ('z5641520076699_d056761c7e4c9465abe2ac3db63af8d5.jpg', 1, 18),
                        
                        -- ShoeId 19
                        ('z5641520076828_d590b118da42bceca35961b3973a4539.jpg', 1, 19),
                        
                        -- ShoeId 20
                        ('z5641520119202_631f638eaaca555ab71fec27240a87a3.jpg', 1, 20),
                        
                        -- ShoeId 21
                        ('z5641520162272_a570750742b5094e8c77cebebe48c517.jpg', 1, 21),
                        
                        -- ShoeId 22
                        ('z5641520162272_a570750742b5094e8c77cebebe48c518.jpg', 1, 22),
                        
                        -- ShoeId 23
                        ('z5641520162272_a570750742b5094e8c77cebebe48c519.jpg', 1, 23),
                        
                        -- ShoeId 24
                        ('z5641520162272_a570750742b5094e8c77cebebe48c520.jpg', 1, 24),
                        
                        -- ShoeId 25
                        ('z5641520162272_a570750742b5094e8c77cebebe48c521.jpg', 1, 25),
                        
                        -- ShoeId 26
                        ('z5641520162272_a570750742b5094e8c77cebebe48c522.jpg', 1, 26),
                        
                        -- ShoeId 27
                        ('z5641520162272_a570750742b5094e8c77cebebe48c523.jpg', 1, 27),
                        
                        -- ShoeId 28
                        ('z5641520162272_a570750742b5094e8c77cebebe48c524.jpg', 1, 28),
                        
                        -- ShoeId 29
                        ('z5641520162272_a570750742b5094e8c77cebebe48c525.jpg', 1, 29),
                        
                        -- ShoeId 30
                        ('z5641520162272_a570750742b5094e8c77cebebe48c526.jpg', 1, 30);
                        


       
-- Insert sample data into UserInformation table
INSERT INTO `UserInformation` 	(`Id`, 	`Email`, 				    `Address`, 			`Birthday`, 		`Fullname`, 		`Gender`,		 `PhoneNumber`) VALUES
								(1, 	'devilskipper@gmail.com', 	'123 Main St', 		'1990-01-01', 		'John Doe', 		'Male', 		'123-456-7890'),
								(2, 	'admin@example.com', 	    '456 Elm St', 		'1985-05-15', 		'Jane Smith', 		'Female', 		'234-567-8901'),
								(3, 	'user2@example.com', 	    '789 Maple St', 	'1992-07-20', 		'Alice Johnson', 	'Other', 		'345-678-9012');
                              
                        
                        -- Insert sample data into Account table
INSERT INTO `Account` 	(`Id`,	`Password`,														 `Status`, 		`Role`,		`UserInformationId`,	`CreateAt`, 			`Active`) VALUES
						(1,		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 	1, 			'User',					1,			'2023-01-01 00:00:00',	1),
						(2,		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 	1, 			'Admin',				2,			'2024-01-01 00:00:00',  1),
						(3,		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 	0, 			'User',					3,			'2025-01-01 00:00:00',  1);
               


-- Insert sample data into UserInformation table
INSERT INTO `TokenType` 		(`Id`, 	`TokenTypeName`) VALUES
								(1, 	'Registration'),
								(2, 	'UpdatePassword'),
								(3, 	'ResetPassword'),
                                (4, 	'UpdateEmail');
                                
INSERT INTO `Voucher` 	(`Title`, 				`Status`, 		`Code`,			 `ExpirationTime`, 		`DiscountAmount`, 		`Condition`, `isFreeShip`) VALUES
						('Summer Sale', 			1, 			'SUMMER2024', 	'2024-08-17 23:59:59', 		50000, 				200000, 				0),
						('Back to School', 			1, 			'SCHOOL2024', 	'2021-09-01 23:59:59', 		30000, 				150000, 				0),
						('Free Shipping Special', 	0, 			'FREESHIP2024', '2024-07-31 23:59:59', 		0, 					0, 						1),
						('Holiday Discount', 		1, 			'HOLIDAY2024', 	'2024-12-31 23:59:59', 		100000, 			300000, 				0),
						('New Year Offer', 			1, 			'NEWYEAR2025', 	'2025-01-15 23:59:59', 		150000, 			500000, 				1),
                        ('Summer Sale', 1, 'SUMMER2025', '2024-08-17 23:59:59', 50000, 200000, 0),
('Back to School', 1, 'SCHOOL2025', '2021-09-01 23:59:59', 30000, 150000, 0),
('Free Shipping Special', 0, 'FREESHIP2025', '2024-07-31 23:59:59', 0, 0, 1),
('Holiday Discount', 1, 'HOLIDAY2025', '2024-12-31 23:59:59', 100000, 300000, 0),
('New Year Offer', 1, 'NEWYEAR2026', '2025-01-15 23:59:59', 150000, 500000, 1),
('Valentine’s Deal', 1, 'VAL2024', '2024-02-14 23:59:59', 70000, 250000, 0),
('Black Friday Special', 1, 'BLACKFRI2024', '2024-11-29 23:59:59', 200000, 400000, 0),
('Christmas Gift', 1, 'XMAS2024', '2024-12-25 23:59:59', 120000, 350000, 0),
('Mid-Autumn Festival', 1, 'MOON2024', '2024-09-21 23:59:59', 80000, 250000, 0),
('Anniversary Sale', 1, 'ANNI2024', '2024-10-10 23:59:59', 60000, 220000, 1),
('Halloween Special', 1, 'HALLOWEEN2024', '2024-10-31 23:59:59', 50000, 180000, 0),
('Easter Discount', 1, 'EASTER2024', '2024-04-09 23:59:59', 90000, 280000, 0),
('Free Shipping Week', 0, 'FREESHIPWEEK2024', '2024-05-05 23:59:59', 0, 0, 1),
('Lunar New Year Sale', 1, 'LUNAR2025', '2025-02-01 23:59:59', 110000, 350000, 0),
('Summer End Discount', 1, 'SUMMEREND2024', '2024-09-15 23:59:59', 80000, 260000, 1),
('Flash Sale', 1, 'FLASH2024', '2024-06-30 23:59:59', 45000, 200000, 0),
('Buy More Save More', 1, 'BUYMORE2024', '2024-07-20 23:59:59', 30000, 180000, 0),
('Clearance Sale', 1, 'CLEARANCE2024', '2024-08-31 23:59:59', 50000, 150000, 1),
('Cyber Monday', 1, 'CYBERMON2024', '2024-12-02 23:59:59', 90000, 320000, 0),
('Birthday Special', 1, 'BIRTHDAY2024', '2024-11-11 23:59:59', 60000, 200000, 0);


-- Insert sample data into the `Order` table
INSERT INTO `Order` (`Id`, `OrderDate`, `TotalPrice`, `SubtotalPrice`, `Note`, `ShippingFee`, `Type`, `UserInformationId`, `VoucherId`)
VALUES
('ORD000001', '2023-01-01 09:00:00', 550000, 500000, 'Urgent delivery', 40000, 'Web', 1, 1),
('ORD000002', '2023-01-02 10:00:00', 350000, 300000, NULL, 40000, 'Facebook', 2, 2),
('ORD000003', '2023-01-03 11:00:00', 750000, 700000, 'Gift wrap', 40000, 'Zalo', 3, 1),
('ORD000004', '2023-01-04 12:00:00', 1250000, 1200000, NULL, 40000, 'Web', 2, 3),
('ORD000005', '2023-01-05 13:00:00', 500000, 450000, NULL, 40000, 'Other', 2, NULL),
('ORD000006', '2023-01-06 14:00:00', 850000, 800000, 'Handle with care', 40000, 'Facebook', 1, 2),
('ORD000007', '2023-01-07 15:00:00', 1100000, 1050000, 'Fast delivery', 40000, 'Zalo', 2, 3),
('ORD000008', '2023-01-08 16:00:00', 650000, 600000, NULL, 40000, 'Web', 1, 1),
('ORD000009', '2023-01-09 17:00:00', 700000, 650000, NULL, 40000, 'Other', 3, NULL),
('ORD000010', '2023-01-10 18:00:00', 1500000, 1400000, 'Large order', 40000, 'Web', 3, 2),
('ORD000011', '2023-01-11 09:00:00', 400000, 350000, 'Gift wrap', 40000, 'Web', 1, 2),
('ORD000012', '2023-01-12 10:00:00', 1200000, 1150000, 'Handle with care', 40000, 'Zalo', 2, 1),
('ORD000013', '2023-01-13 11:00:00', 850000, 800000, NULL, 40000, 'Facebook', 3, 3),
('ORD000014', '2023-01-14 12:00:00', 950000, 900000, NULL, 40000, 'Web', 2, NULL),
('ORD000015', '2023-01-15 13:00:00', 700000, 650000, 'Fast delivery', 40000, 'Other', 1, 1),
('ORD000016', '2023-01-16 14:00:00', 1500000, 1400000, 'Large order', 40000, 'Web', 3, 2),
('ORD000017', '2023-01-17 15:00:00', 850000, 800000, 'Urgent delivery', 40000, 'Zalo', 1, 2),
('ORD000018', '2023-01-18 16:00:00', 1200000, 1150000, 'Gift wrap', 40000, 'Facebook', 2, 3),
('ORD000019', '2023-01-19 17:00:00', 1000000, 950000, NULL, 40000, 'Other', 3, NULL),
('ORD000020', '2023-01-20 18:00:00', 600000, 550000, NULL, 40000, 'Web', 1, 2);



-- Insert sample data into the `OrderStatus` table
INSERT INTO `OrderStatus` (`OrderId`, `Status`, `UpdateTime`)
VALUES
('ORD000001', 'ChoDuyet', '2023-01-01 10:00:00'),
('ORD000001', 'DaDuyet', '2023-01-02 11:00:00'),
('ORD000001', 'DangGiao', '2023-01-03 12:00:00'),
('ORD000001', 'GiaoThanhCong', '2023-04-01 15:00:00'),

('ORD000002', 'ChoDuyet', '2023-01-02 11:00:00'),
('ORD000002', 'DaDuyet', '2023-01-05 12:00:00'),
('ORD000002', 'Huy', '2023-01-07 14:00:00'),

('ORD000003', 'ChoDuyet', '2023-01-02 12:00:00'),
('ORD000003', 'DaDuyet', '2023-01-05 13:00:00'),
('ORD000003', 'DangGiao', '2023-01-08 15:00:00'),
('ORD000003', 'GiaoThanhCong', '2023-01-12 15:00:00'),

('ORD000004', 'ChoDuyet', '2023-01-04 13:00:00'),
('ORD000004', 'DaDuyet', '2023-01-08 14:00:00'),

('ORD000005', 'ChoDuyet', '2023-01-05 14:00:00'),
('ORD000005', 'Huy', '2023-01-06 16:00:00'),

('ORD000006', 'ChoDuyet', '2023-01-06 15:00:00'),
('ORD000006', 'DaDuyet', '2023-01-08 16:00:00'),
('ORD000006', 'DangGiao', '2023-01-09 18:00:00'),

('ORD000007', 'ChoDuyet', '2023-01-07 16:00:00'),
('ORD000007', 'DaDuyet', '2023-01-08 17:00:00'),
('ORD000007', 'DangGiao', '2023-01-09 19:00:00'),

('ORD000008', 'ChoDuyet', '2023-01-07 16:00:00'),
('ORD000009', 'ChoDuyet', '2023-01-07 16:00:00'),
('ORD000010', 'ChoDuyet', '2023-01-07 16:00:00'),

('ORD000011', 'ChoDuyet', '2023-01-11 09:30:00'),
('ORD000011', 'DaDuyet', '2023-01-12 10:00:00'),
('ORD000011', 'DangGiao', '2023-01-13 11:00:00'),
('ORD000011', 'GiaoThanhCong', '2023-01-15 12:00:00'),

('ORD000012', 'ChoDuyet', '2023-01-12 11:00:00'),
('ORD000012', 'DaDuyet', '2023-01-13 12:00:00'),
('ORD000012', 'Huy', '2023-01-14 13:00:00'),

('ORD000013', 'ChoDuyet', '2023-01-13 14:00:00'),
('ORD000013', 'DaDuyet', '2023-01-14 15:00:00'),
('ORD000013', 'DangGiao', '2023-01-15 16:00:00'),
('ORD000013', 'GiaoThanhCong', '2023-01-17 17:00:00'),

('ORD000014', 'ChoDuyet', '2023-01-14 18:00:00'),
('ORD000014', 'DaDuyet', '2023-01-15 19:00:00'),

('ORD000015', 'ChoDuyet', '2023-01-15 20:00:00'),
('ORD000015', 'Huy', '2023-01-16 21:00:00'),

('ORD000016', 'ChoDuyet', '2023-01-16 22:00:00'),
('ORD000016', 'DaDuyet', '2023-01-17 23:00:00'),
('ORD000016', 'DangGiao', '2023-01-18 00:00:00'),

('ORD000017', 'ChoDuyet', '2023-01-17 10:00:00'),
('ORD000017', 'DaDuyet', '2023-01-18 11:00:00'),
('ORD000017', 'DangGiao', '2023-01-19 12:00:00'),

('ORD000018', 'ChoDuyet', '2023-01-18 13:00:00'),
('ORD000019', 'ChoDuyet', '2023-01-19 14:00:00'),
('ORD000020', 'ChoDuyet', '2023-01-20 15:00:00');



-- Insert sample data into the `OrderDetail` table
INSERT INTO `OrderDetail` (`OrderId`, `ShoeId`, `Size`, `Quantity`, `UnitPrice`, `Total`)
VALUES
('ORD000001', 1, 46, 2, 250000, 500000),
('ORD000001', 2, 47, 1, 50000, 50000),

('ORD000002', 2, 46, 1, 300000, 300000),
('ORD000002', 3, 47, 2, 25000, 50000),

('ORD000003', 4, 46, 3, 400000, 1200000),
('ORD000003', 1, 47, 1, 30000, 30000),

('ORD000004', 3, 46, 1, 450000, 450000),
('ORD000004', 5, 47, 1, 75000, 75000),

('ORD000005', 2, 48, 2, 400000, 800000),

('ORD000006', 6, 46, 1, 600000, 600000),
('ORD000006', 1, 47, 2, 100000, 200000),

('ORD000007', 4, 46, 2, 500000, 1000000),
('ORD000007', 7, 47, 2, 250000, 500000),

('ORD000008', 5, 46, 2, 250000, 500000),

('ORD000009', 1, 47, 1, 500000, 500000),

('ORD000010', 2, 48, 1, 700000, 700000),
('ORD000010', 3, 46, 3, 250000, 750000),
('ORD000010', 4, 47, 2, 100000, 200000),

('ORD000011', 2, 46, 1, 350000, 350000),
('ORD000011', 3, 46, 2, 25000, 50000),

('ORD000012', 4, 46, 2, 400000, 800000),
('ORD000012', 5, 46, 1, 350000, 350000),

('ORD000013', 6, 47, 1, 800000, 800000),
('ORD000013', 1, 47, 1, 50000, 50000),

('ORD000014', 7, 46, 1, 900000, 900000),

('ORD000015', 8, 46, 1, 650000, 650000),

('ORD000016', 1, 46, 2, 700000, 1400000),

('ORD000017', 2, 48, 1, 800000, 800000),

('ORD000018', 3, 46, 2, 500000, 1000000),

('ORD000019', 4, 47, 2, 450000, 900000),

('ORD000020', 5, 45, 1, 550000, 550000);




INSERT INTO `Feedback` (`Title`, `Content`, `CreateTime`, `IsDeleted`, `IsChecked`, `OrderId`) VALUES
    ('Nhật', 'The service was fantastic and fast.', '2023-08-01 10:15:00', FALSE, TRUE, 'ORD000001'),
    ('Not Satisfied', 'The product did not meet my expectations.', '2022-08-02 11:20:00', FALSE, FALSE, 'ORD000001'),
    ('Excellent Quality', 'I am very pleased with the quality of the shoes.', '2023-08-03 09:05:00', FALSE, TRUE, 'ORD000001'),
    ('Quick Delivery', 'Delivery was faster than expected.', '2021-08-04 13:30:00', FALSE, TRUE, 'ORD000002'),
    ('Product Defective', 'Received a defective item, need a replacement.', '2023-08-05 14:45:00', FALSE, FALSE, 'ORD000002'),
    ('Good Value', 'The product is a good value for the price.', '2022-08-06 16:00:00', FALSE, TRUE, 'ORD000002'),
    ('Friendly Support', 'Customer support was very helpful and friendly.', '2021-08-07 17:10:00', FALSE, TRUE, 'ORD000004'),
    ('Shipping Delay', 'There was a delay in shipping, but the product is good.', '2023-08-08 18:25:00', FALSE, FALSE, 'ORD000004'),
    ('Easy to Use', 'The website was easy to navigate and use.', '2022-08-09 19:35:00', FALSE, TRUE, 'ORD000004'),
    ('Will Buy Again', 'I will definitely buy from this store again.', '2021-08-10 20:45:00', FALSE, TRUE, 'ORD000004');



-- Insert sample data into the InventoryReport table with specific CreateTime values
INSERT INTO `InventoryReport` 	(`Supplier`, 		`SupplierPhone`, 		`TotalPrice`, 		`CreateTime`) VALUES
								('Anh Nhật đại bàng', 	'123-456-7890', 		15000, 				'2023-08-01 10:00:00'),
								('XYZ Wholesale', 	'987-654-3210',		 	25000,			 	'2023-08-02 11:00:00'),
								('Shoes R Us', 		'456-789-0123', 		30000, 				'2023-08-03 12:00:00'),
								('Global Footwear', '321-654-9870', 		12000, 				'2023-08-04 13:00:00'),
								('Trendsetters', 	'789-012-3456', 		18000, 				'2023-08-05 14:00:00');
                                
INSERT INTO `InventoryReportStatus` (`InventoryReportId`, 	`Status`, 			`UpdateTime`) VALUES
									(1, 					'ChoNhapKho', 		'2023-08-01 10:30:00'),
									(1, 					'DaNhapKho', 		'2023-08-02 09:00:00'),
									(2, 					'ChoNhapKho', 		'2023-08-02 11:30:00'),
									(3, 					'ChoNhapKho', 		'2023-08-03 12:30:00'),
									(4, 					'ChoNhapKho', 		'2023-08-04 13:30:00'),
                                    (5, 					'ChoNhapKho', 		'2023-08-03 12:30:00');

                                    
INSERT INTO `InventoryReportDetail` (`InventoryReportId`, `ShoeId`, `Size`, 	`Quantity`, 	`UnitPrice`, `Total`) VALUES
									(1, 					1, 			45, 			10, 	1000, 			10000),
									(1, 					2, 			44, 			5, 		1000, 			5000),
									(2, 					3, 			44, 			15, 	1200, 			18000),
									(3, 					4, 			44,				20, 	1500, 			30000),
									(3, 					5, 			46, 			10, 	1200, 			12000),
									(4, 					6, 			44, 			8, 		1500, 			12000),
									(5, 					7, 			47, 			12, 	1200, 			14400),
									(5, 					8, 			44, 			8, 		1000, 			8000);



    
    
    
    
INSERT INTO `News` (`Banner`, `Content`, `Title`, `Status`, `PriorityFlag`, `AuthorId`, `CreateTime`)
VALUES 
('banner1.jpg', 'Content of the first news article.', 'Nhật nè', 1, 1, 1, '2024-10-04 08:00:01'),
('banner2.jpg', 'Content of the second news article.', 'Second News Title', 1, 0, 2, '2024-10-04 08:01:01'),
('banner3.jpg', 'Content of the third news article.', 'Third News Title', 0, 1, 2, '2024-10-04 08:02:01'),
('banner4.jpg', 'Content of the fourth news article.', 'Fourth News Title', 1, 0, 1, '2024-10-04 08:03:01'),
('banner5.jpg', 'Content of the fifth news article.', 'Fifth News Title', 0, 0, 1, '2024-10-04 08:04:01'),
('banner6.jpg', 'Content of the sixth news article.', 'Sixth News Title', 1, 1, 2, '2024-10-04 08:05:01'),
('banner7.jpg', 'Content of the seventh news article.', 'Seventh News Title', 0, 1, 3, '2024-10-04 08:06:01'),
('banner8.jpg', 'Content of the eighth news article.', 'Eighth News Title', 1, 0, 1, '2024-10-04 08:07:01'),
('banner9.jpg', 'Content of the ninth news article.', 'Ninth News Title', 1, 0, 2, '2024-10-04 08:08:01'),
('banner10.jpg', 'Content of the tenth news article.', 'Tenth News Title', 0, 1, 2, '2024-10-04 08:09:01'),
('banner11.jpg', 'Content of the eleventh news article.', 'Eleventh News Title', 1, 0, 1, '2024-10-04 08:10:01'),
('banner12.jpg', 'Content of the twelfth news article.', 'Twelfth News Title', 1, 1, 2, '2024-10-04 08:11:01'),
('banner13.jpg', 'Content of the thirteenth news article.', 'Thirteenth News Title', 0, 0, 3, '2024-10-04 08:12:01'),
('banner14.jpg', 'Content of the fourteenth news article.', 'Fourteenth News Title', 1, 0, 2, '2024-10-04 08:13:01'),
('banner15.jpg', 'Content of the fifteenth news article.', 'Fifteenth News Title', 1, 1, 1, '2024-10-04 08:14:01'),
('banner16.jpg', 'Content of the sixteenth news article.', 'Sixteenth News Title', 0, 0, 1, '2024-10-04 08:15:01'),
('banner17.jpg', 'Content of the seventeenth news article.', 'Seventeenth News Title', 1, 1, 3, '2024-10-04 08:16:01'),
('banner18.jpg', 'Content of the eighteenth news article.', 'Eighteenth News Title', 1, 0, 2, '2024-10-04 08:17:01'),
('banner19.jpg', 'Content of the nineteenth news article.', 'Nineteenth News Title', 0, 1, 2, '2024-10-04 08:18:01'),
('banner20.jpg', 'Content of the twentieth news article.', 'Twentieth News Title', 1, 0, 1, '2024-10-04 08:19:01'),
('banner21.jpg', 'Content of the twenty-first news article.', 'Twenty-first News Title', 0, 0, 1, '2024-10-04 08:20:01'),
('banner22.jpg', 'Content of the twenty-second news article.', 'Twenty-second News Title', 1, 1, 3, '2024-10-04 08:21:01'),
('banner23.jpg', 'Content of the twenty-third news article.', 'Twenty-third News Title', 1, 0, 2, '2024-10-04 08:22:01'),
('banner24.jpg', 'Content of the twenty-fourth news article.', 'Twenty-fourth News Title', 0, 1, 2, '2024-10-04 08:23:01'),
('banner25.jpg', 'Content of the twenty-fifth news article.', 'Twenty-fifth News Title', 1, 0, 1, '2024-10-04 08:24:01'),
('banner26.jpg', 'Content of the twenty-sixth news article.', 'Twenty-sixth News Title', 1, 1, 3, '2024-10-04 08:25:01'),
('banner27.jpg', 'Content of the twenty-seventh news article.', 'Twenty-seventh News Title', 0, 0, 2, '2024-10-04 08:26:01'),
('banner28.jpg', 'Content of the twenty-eighth news article.', 'Twenty-eighth News Title', 1, 0, 2, '2024-10-04 08:27:01'),
('banner29.jpg', 'Content of the twenty-ninth news article.', 'Twenty-ninth News Title', 1, 1, 1, '2024-10-04 08:28:01'),
('banner30.jpg', 'Content of the thirtieth news article.', 'Thirtieth News Title', 0, 0, 3, '2024-10-04 08:29:01');



INSERT INTO `NewsImage` (`Path`, `NewsId`)
VALUES 
('image1.jpg', 1),
('image2.jpg', 1),
('image3.jpg', 2),
('image4.jpg', 3),
('image5.jpg', 3),
('image6.jpg', 4),
('image7.jpg', 5);

-- Insert sample data into Event table
INSERT INTO `Event` (`Banner`, `EventName`, `StartTime`, `EndTime`, `Status`, `Percentage`) VALUES
('banner_summer_sale.jpg', 'Nhật nè', '2024-07-01 09:00:00', '2024-07-15 23:59:59', TRUE, 50),
('banner_back_to_school.jpg', 'Back to School Sale', '2024-08-01 09:00:00', '2024-08-31 23:59:59', TRUE, 30),
('banner_flash_sale.jpg', 'Flash Sale', '2024-09-15 00:00:00', '2024-09-15 23:59:59', FALSE, 70),
('banner_black_friday.jpg', 'Black Friday Sale', '2024-11-23 00:00:00', '2024-11-23 23:59:59', TRUE, 80),
('banner_christmas_sale.jpg', 'Christmas Sale', '2024-12-20 09:00:00', '2024-12-25 23:59:59', TRUE, 60);

-- Insert sample data into Sale table
INSERT INTO `Sale` (`EventId`, `ShoeId`) VALUES
(1, 2), -- Summer Big Sale includes Shoe ID 2
(1, 5), -- Summer Big Sale includes Shoe ID 5
(2, 3), -- Back to School Sale includes Shoe ID 3
(2, 8), -- Back to School Sale includes Shoe ID 8
(3, 1), -- Flash Sale includes Shoe ID 1
(4, 10), -- Black Friday Sale includes Shoe ID 10
(4, 15), -- Black Friday Sale includes Shoe ID 15
(5, 6), -- Christmas Sale includes Shoe ID 6
(5, 11); -- Christmas Sale includes Shoe ID 11



