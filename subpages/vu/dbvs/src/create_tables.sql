CREATE TABLE vyst2902.Programming_Language
(
    Id      SERIAL          NOT NULL    CONSTRAINT CK_ProgrammingLanguage_Id
                                        CHECK (Id > 0),
    Name    VARCHAR(15)     NOT NULL,
    
    PRIMARY KEY (Id)
);

CREATE TABLE vyst2902.User
(
    Id          SERIAL          NOT NULL    CONSTRAINT CK_User_Id
                                            CHECK (Id > 0),
    Email       VARCHAR(254)    NOT NULL,
    Username    VARCHAR(100),
    First_Name  VARCHAR(30),
    Last_Name   VARCHAR(30),
    Password    CHAR(64)	 	NOT NULL, -- use SHA-256
    DOB         DATE                        CONSTRAINT CK_User_DOB
                                            CHECK (DOB <= NOW() - INTERVAL '5 years'),
    
    PRIMARY KEY (Id)
);

CREATE TABLE vyst2902.User_Skills
(
    User_Id                 INTEGER     NOT NULL,
    Programming_Language_Id INTEGER     NOT NULL,
    Proficiency             SMALLINT    NOT NULL    CONSTRAINT CK_UserSkills_Proficiency
                                                    CHECK (Proficiency >= 0 AND Proficiency <= 5),
                                            
    PRIMARY KEY (User_Id, Programming_Language_Id),
    FOREIGN KEY (User_Id)                   REFERENCES vyst2902.User
                                            ON DELETE CASCADE
                                            ON UPDATE RESTRICT,
    FOREIGN KEY (Programming_Language_Id)   REFERENCES Programming_Language
                                            ON DELETE CASCADE
                                            ON UPDATE RESTRICT
);

CREATE TABLE vyst2902.Ratable_Entity
(
    Id              SERIAL      NOT NULL    CONSTRAINT CK_RatableEntity_Id
                                            CHECK (Id > 0),
    User_Id         INTEGER,
    Publish_Date    DATE        NOT NULL    CONSTRAINT CK_RatableEntity_PublishDate
                                            CHECK (Publish_Date <= NOW()),
    
    PRIMARY KEY (Id),
    
    FOREIGN KEY (User_Id) REFERENCES vyst2902.User
                          ON DELETE SET NULL -- If a user is deleted, don't delete the post
                          ON UPDATE RESTRICT
);

CREATE TABLE vyst2902.Rated_Entities
(
    Entity_Id       INTEGER     NOT NULL,
    User_Id         INTEGER     NOT NULL,
    Rating          SMALLINT    NOT NULL    CONSTRAINT CK_RatedEntities_Rating
                                            CHECK (Rating = -1 OR Rating = 1),
                                            
    PRIMARY KEY (Entity_Id, User_Id),
    FOREIGN KEY (Entity_Id) REFERENCES Ratable_Entity
                            ON DELETE CASCADE
                            ON UPDATE RESTRICT,
    FOREIGN KEY (User_Id)   REFERENCES vyst2902.User
                            ON DELETE CASCADE
                            ON UPDATE RESTRICT
);

CREATE TABLE vyst2902.Post
(
    Id              INTEGER     	NOT NULL,
    Title           VARCHAR(100)    NOT NULL,
    Content         TEXT            NOT NULL, 
    
    PRIMARY KEY (Id),
    FOREIGN KEY (Id) REFERENCES Ratable_Entity
                     ON DELETE CASCADE
                     ON UPDATE RESTRICT
);

CREATE TABLE vyst2902.Saved_Posts
(
    Post_Id     INTEGER     NOT NULL,
    User_Id     INTEGER     NOT NULL,
    
    PRIMARY KEY (Post_Id, User_Id),
    FOREIGN KEY (Post_Id) REFERENCES Post
                          ON DELETE CASCADE
                          ON UPDATE RESTRICT,
    FOREIGN KEY (User_Id) REFERENCES vyst2902.User
                          ON DELETE CASCADE
                          ON UPDATE RESTRICT
);

CREATE TABLE vyst2902.Comment
(
    Id          INTEGER         NOT NULL,
    Post_Id     INTEGER         NOT NULL,
    Content     VARCHAR(1024)   NOT NULL,
    
    PRIMARY KEY (Id),
    FOREIGN KEY (Id)        REFERENCES Ratable_Entity
                            ON DELETE CASCADE
                            ON UPDATE RESTRICT,
    FOREIGN KEY (Post_Id)   REFERENCES Post
                            ON DELETE CASCADE
                            ON UPDATE RESTRICT
);
