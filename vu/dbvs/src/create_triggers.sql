-- Trigger to ensure a correct password hash (SHA-256) was used
CREATE FUNCTION Validate_Password_Hash() RETURNS trigger AS $$
BEGIN
    IF NEW.Password !~* '^[a-f0-9]{64}$'
    THEN
        RAISE EXCEPTION 'The password hash is invalid! Please use SHA-256.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER User_On_Insert_Validate_Password BEFORE INSERT OR UPDATE ON vyst2902.User
FOR EACH ROW EXECUTE PROCEDURE Validate_Password_Hash();

-- Trigger to generate a unique username if one has not been provided
CREATE FUNCTION Generate_Unique_Username() RETURNS trigger AS $$
BEGIN
    IF NEW.Username IS NULL
    THEN
        NEW.Username := 'user' || NEW.Id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER User_On_Null_Username BEFORE INSERT OR UPDATE ON vyst2902.User
FOR EACH ROW EXECUTE PROCEDURE Generate_Unique_Username();

-- Trigger for inserting a new post
CREATE FUNCTION Insert_Post() RETURNS trigger AS $$
DECLARE
    temp_id INTEGER;
BEGIN
    INSERT INTO vyst2902.Ratable_Entity (User_Id, Publish_Date) VALUES
        (NEW.User_Id, NEW.Publish_Date)
        RETURNING Id INTO temp_id;
    INSERT INTO vyst2902.Post VALUES
        (temp_id, NEW.Title, NEW.Content);
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER Post_on_insert INSTEAD OF INSERT ON vyst2902.Posts
    FOR EACH ROW EXECUTE PROCEDURE Insert_Post();
    
-- Trigger for updating a post
CREATE FUNCTION Update_Post() RETURNS trigger AS $$
BEGIN
    UPDATE vyst2902.Post
    SET Title = NEW.Title,
        Content = NEW.Content
    WHERE Id = NEW.Id;
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER Post_On_Update INSTEAD OF UPDATE ON vyst2902.Posts
    FOR EACH ROW EXECUTE PROCEDURE Update_Post();
    
-- Trigger for deleting a post
CREATE FUNCTION Delete_Post() RETURNS trigger AS $$
BEGIN
    DELETE FROM vyst2902.Post WHERE Id = OLD.Id;
    DELETE FROM vyst2902.Ratable_Entity WHERE Id = OLD.Id;
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER Post_on_delete INSTEAD OF DELETE ON vyst2902.Posts
    FOR EACH ROW EXECUTE PROCEDURE Delete_Post();
    
    
    
-- Trigger for inserting a new comment
CREATE FUNCTION Insert_Comment() RETURNS trigger AS $$
DECLARE
    temp_id INTEGER;
BEGIN
    -- Check if publish date is valid
    IF NEW.Publish_Date < (SELECT Publish_Date FROM vyst2902.Ratable_Entity WHERE Id = NEW.Post_Id)
    THEN
        RAISE EXCEPTION 'A comment cannot be published before a post.';
    END IF;
    INSERT INTO vyst2902.Ratable_Entity (User_Id, Publish_Date) VALUES
        (NEW.User_Id, NEW.Publish_Date)
        RETURNING Id INTO temp_id;
    INSERT INTO vyst2902.Comment VALUES
        (temp_id, NEW.Post_Id, NEW.Content);
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER Comment_on_insert INSTEAD OF INSERT ON vyst2902.Comments
    FOR EACH ROW EXECUTE PROCEDURE Insert_Comment();

-- Trigger for updating a comment
CREATE FUNCTION Update_Comment() RETURNS trigger AS $$
BEGIN
    UPDATE vyst2902.Comment
    SET Content = NEW.Content
    WHERE Id = NEW.Id;
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER Comment_On_Update INSTEAD OF UPDATE ON vyst2902.Comments
    FOR EACH ROW EXECUTE PROCEDURE Update_Comment();


-- Trigger for deleting a comment
CREATE FUNCTION Delete_Comment() RETURNS trigger AS $$
BEGIN
    DELETE FROM vyst2902.Comment WHERE Id = OLD.Id;
    DELETE FROM vyst2902.Ratable_Entity WHERE Id = OLD.Id;
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER Comment_on_delete INSTEAD OF DELETE ON vyst2902.Comments
    FOR EACH ROW EXECUTE PROCEDURE Delete_Comment();