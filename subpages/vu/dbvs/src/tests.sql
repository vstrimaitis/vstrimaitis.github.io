-- Try to supply negative Programming language Id
INSERT INTO vyst2902.Programming_Language VALUES
	(-1, 'Silly');

-- Try to supply negative User Id
INSERT INTO vyst2902.User (Id, Username, Email, Password) VALUES
	(-1, 'username', 'a@b.c', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8');
	
-- Try to insert a user with invalid DOB
INSERT INTO vyst2902.User (Username, Email, Password, DOB) VALUES
	('username', 'a@b.c', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', NOW()-INTERVAL '1 year');
	
-- Try to insert a user with invalid password hash
INSERT INTO vyst2902.User (Username, Email, Password) VALUES
	('username', 'a@b.c', 'invalid');
	
-- Try to insert a skill with an invalid proficiency level
INSERT INTO vyst2902.User_Skills VALUES
	(1, 1, -1);
INSERT INTO vyst2902.User_Skills VALUES
	(1, 1, 6);

-- Try to supply negative Ratable entity Id
INSERT INTO vyst2902.Ratable_Entity VALUES
	(-1, 1, NOW());

-- Try to supply some date in the future as publish date for Ratable entity
INSERT INTO vyst2902.Ratable_Entity (User_Id, Publish_Date) VALUES
	(1, '2020-01-01');
	
-- Try to insert invalid rating into Rated_entities
INSERT INTO vyst2902.Rated_Entities VALUES
	(1, 1, -2);
	
INSERT INTO vyst2902.Rated_Entities VALUES
	(1, 1, 2);
	
-- Try to insert two users with the same email
INSERT INTO vyst2902.User (Id, Email, Username, Password) VALUES
	(99, 'some@email.com', 'u1', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
	(100, 'some@email.com', 'u2', '5e884898da28047151d0e56aaaaaaaaaaaaaaa0d6aabbdd62a11ef721d1542d8');

DELETE FROM vyst2902.User WHERE Id = 99;

-- Try to insert a comment with a publish date before its parent post's publish date
INSERT INTO vyst2902.Comments(User_Id, Post_Id, Publish_Date, Content) VALUES
	(1, 1, '2016-11-14', 'something');