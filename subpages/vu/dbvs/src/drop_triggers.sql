-- Drop the triggers for the Users table
DROP TRIGGER User_On_Insert_Validate_Password ON vyst2902.User;
DROP FUNCTION Validate_Password_Hash();

DROP TRIGGER User_On_Null_Username ON vyst2902.User;
DROP FUNCTION Generate_Unique_Username();

-- Drop the triggers for the Posts view
DROP TRIGGER Post_on_insert ON vyst2902.Posts;
DROP FUNCTION Insert_Post();

DROP TRIGGER Post_on_Update ON vyst2902.Posts;
DROP FUNCTION Update_Post();

DROP TRIGGER Post_on_Delete ON vyst2902.Posts;
DROP FUNCTION Delete_Post();

-- Drop triggers for the Comments view
DROP TRIGGER Comment_on_insert ON vyst2902.Comments;
DROP FUNCTION Insert_Comment();

DROP TRIGGER Comment_on_update ON vyst2902.Comments;
DROP FUNCTION Update_Comment();

DROP TRIGGER Comment_on_Delete ON vyst2902.Comments;
DROP FUNCTION Delete_Comment();