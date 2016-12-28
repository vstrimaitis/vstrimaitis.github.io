-- Posts view. Selects all the information about each post and calculates the total rating
CREATE VIEW vyst2902.Posts
AS
    SELECT P.Id, R.User_Id, R.Publish_Date, P.Title, P.Content, COALESCE(SUM(E.Rating), 0) AS Rating
    FROM vyst2902.Post AS P
    LEFT JOIN vyst2902.Ratable_Entity AS R ON R.Id = P.Id
    LEFT JOIN vyst2902.Rated_Entities AS E ON E.Entity_Id = P.Id
    GROUP BY P.Id, R.User_Id, R.Publish_Date, P.Title, P.Content;


-- Comments view. Selects all the information about each comment and calculates the total rating
CREATE VIEW vyst2902.Comments
AS  
    SELECT C.Id, R.User_Id, Post_Id, Publish_Date,  Content, COALESCE(SUM(Rating), 0) AS Rating
    FROM vyst2902.Comment AS C
    LEFT JOIN vyst2902.Ratable_Entity AS R ON R.Id = C.Id
    LEFT JOIN vyst2902.Rated_Entities AS E ON E.Entity_Id = C.Id
    GROUP BY C.Id, R.User_Id, Post_Id, Publish_Date, Content;