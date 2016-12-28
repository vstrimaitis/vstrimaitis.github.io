INSERT INTO vyst2902.Programming_Language (Name) VALUES
    ('C'),
    ('C++'),
    ('Python'),
    ('C#'),
    ('JAVA'),
    ('Javascript'),
    ('Ruby'),
    ('PHP');

INSERT INTO vyst2902.User (Email, Username, First_Name, Last_Name, DOB, Password) VALUES
    ('john.doe@gmail.com', 'johnnyboy', 'John', 'Doe',  '1970-01-13',
    '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'), -- hash of 'password'
    ('fake@gmail.com', 'vstrimaitis', 'Vytautas', 'Strimaitis', '1997-02-21',
    '5bf6c973b85757fda1cac3f47ec85ae7158dd00a3d1de34203e2860078a3d89e'), -- has of 'betterPassword'
    ('lord123@yahoo.com', 'mastahOfCode', NULL, NULL, NULL,
    '24145fd494db7255954cb75ee69065bceb92ea99d5da9f9185b976778cfe3a88'), -- hash of 'ihackyou'
    ('default@email.com', NULL, 'Default', 'User', '1996-01-01',
    '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'); -- hash of 'password'
    
INSERT INTO vyst2902.User_Skills(User_Id, Programming_Language_Id, Proficiency) VALUES
    (1, 1, 0),
    (3, 1, 3),
    (3, 2, 1),
    (3, 4, 2),
    (3, 5, 0),
    (2, 1, 4),
    (2, 2, 5),
    (2, 3, 2),
    (2, 4, 4),
    (2, 5, 1),
    (2, 6, 2),
    (2, 8, 1);
        
INSERT INTO vyst2902.Posts (User_Id, Publish_Date, Title, Content) VALUES
    (1, '2016-11-15', 'My first post', 'Lorem ipsum dolor sit amet, consectetur 
adipiscing elit. Nullam viverra laoreet justo, eget porttitor lorem. Nunc 
luctus sem eu auctor placerat. In elit nisi, gravida vel semper in, rhoncus 
et nisl. Praesent rutrum dui ac faucibus facilisis. Ut hendrerit faucibus 
lorem sed viverra. In interdum, mauris eget luctus tempor, arcu mauris 
placerat risus, sit amet sagittis mauris nibh vel mi. Curabitur rhoncus 
scelerisque commodo. Quisque id eros leo.'),
    (2, '2016-11-14', 'How to post', 'content content content...'),
    (3, '2016-11-16', 'Third time''s the charm say scientists?!', 'Not really, this was just clickbait xD'),
    (3, '2016-10-05', '*Insert clickbait title here*', 'Useles info...');
    
INSERT INTO vyst2902.Comments (User_Id, Post_Id, Publish_Date, Content) VALUES
    (1,  1, '2016-11-15', 'LOL :D'),
    (2,  1, '2016-11-16', 'xDDDD'),
    (2,  1, '2016-11-15', 'Great first post :)'),
    (3,  2, '2016-11-15', 'one does not simply comment well...'),
    (1,  2, '2016-11-14', 'another post, another comment'),
    (2,  4, '2016-10-05', 'this is clickbait >:('),
    (3,  4, '2016-11-10', 'this is not clickbaity at all, y u so engri :('),
    (1,  3, '2016-11-16', 'silly title');
    
    
INSERT INTO vyst2902.Rated_Entities (Entity_Id, User_Id, Rating) VALUES
    -- Rate some posts
    (1, 2, 1),
    (1, 3, -1),
    (2, 1, -1),
    (3, 1, 1),
    (3,2,1),
    (4,1,-1),
    (4,2,-1),
    -- rate some comments
    (5, 2, 1),
    (5, 3, 1),
    (8, 1, -1),
    (9, 2, 1),
    (10, 1, -1),
    (10, 2, -1),
    (11, 1, 1),
    (11, 3, -1),
    (12, 3, -1);
    
INSERT INTO vyst2902.Saved_Posts (Post_Id, User_Id) VALUES
    -- Everyone saved the first post
    (1, 1),
    (1, 2),
    (1, 3),
    -- 1st user saves second post
    (2, 1),
    -- Second user saves fourth post
    (4, 2);
    