package vyst2902.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import vyst2902.dataTransferObjects.*;

public class DataTransferManager {
	private static final String URL = "jdbc:postgresql://pgsql2.mif/";
	private User currentUser;
	private Connection connection;
	
	private PreparedStatement stmt_selectPosts;
	private PreparedStatement stmt_selectPost;
	private PreparedStatement stmt_insertPost;
	private PreparedStatement stmt_updatePost;
	private PreparedStatement stmt_deletePost;
	
	private PreparedStatement stmt_selectCommentsUnderPost;
	private PreparedStatement stmt_insertComment;
	private PreparedStatement stmt_updateComment;
	private PreparedStatement stmt_deleteComment;
	private PreparedStatement stmt_selectComment;
	
	private PreparedStatement stmt_selectUserIdByEmail;
	private PreparedStatement stmt_selectUserIdByLogin;
	private PreparedStatement stmt_insertUser;
	
	public DataTransferManager(String dbName, String username, String password) throws SQLException, ClassNotFoundException{
		Class.forName("org.postgresql.Driver");
        connection = DriverManager
           .getConnection(URL + dbName,
           username, password);
        initPreparedStatements();
	}
	
	private void initPreparedStatements() throws SQLException{
		stmt_selectPosts = connection.prepareStatement(String.format(
				"SELECT A.%s, B.%s, A.%s, A.%s, A.%s " +
				"FROM %s.%s as A, %s.%s as B " + 
				"WHERE A.%s = B.%s ORDER BY A.%s",
				Constants.COLUMN_ID, Constants.COLUMN_EMAIL, Constants.COLUMN_TITLE, Constants.COLUMN_CONTENT, Constants.COLUMN_PUBLISH_DATE,
				Constants.SCHEMA, Constants.VIEW_POSTS, Constants.SCHEMA, Constants.TABLE_USER,
				Constants.COLUMN_USER_ID, Constants.COLUMN_ID, Constants.COLUMN_ID)
			);
		stmt_selectPost = connection.prepareStatement(String.format(
				"SELECT A.%s, B.%s, A.%s, A.%s, A.%s " +
				"FROM %s.%s as A, %s.%s as B " + 
				"WHERE A.%s = B.%s AND A.%s = ?",
				Constants.COLUMN_ID, Constants.COLUMN_EMAIL, Constants.COLUMN_TITLE, Constants.COLUMN_CONTENT, Constants.COLUMN_PUBLISH_DATE,
				Constants.SCHEMA, Constants.VIEW_POSTS, Constants.SCHEMA, Constants.TABLE_USER,
				Constants.COLUMN_USER_ID, Constants.COLUMN_ID, Constants.COLUMN_ID)
			);
		
		stmt_insertPost = connection.prepareStatement(String.format("INSERT INTO %s.%s (%s, %s, %s, %s) "+
																	"VALUES (?, ?, ?, ?) RETURNING %s",
																	Constants.SCHEMA,
																	Constants.VIEW_POSTS,
																	Constants.COLUMN_TITLE,
																	Constants.COLUMN_CONTENT,
																	Constants.COLUMN_PUBLISH_DATE,
																	Constants.COLUMN_USER_ID,
																	Constants.COLUMN_ID));
		stmt_updatePost = connection.prepareStatement(String.format("UPDATE %s.%s SET %s = ?, %s = ? WHERE %s = ?",
																	Constants.SCHEMA,
																	Constants.VIEW_POSTS,
																	Constants.COLUMN_TITLE,
																	Constants.COLUMN_CONTENT,
																	Constants.COLUMN_ID));
		
		stmt_deletePost = connection.prepareStatement(String.format("DELETE FROM %s.%s WHERE %s = ?", 
																	Constants.SCHEMA,
																	Constants.VIEW_POSTS,
																	Constants.COLUMN_ID));
		
		stmt_selectCommentsUnderPost = connection.prepareStatement(String.format(
				"SELECT A.%s, B.%s, A.%s, A.%s " + 
				"FROM %s.%s as A, %s.%s as B " +
				"WHERE A.%s = B.%s AND A.%s = ? ",
				Constants.COLUMN_ID, Constants.COLUMN_EMAIL, Constants.COLUMN_CONTENT, Constants.COLUMN_PUBLISH_DATE,
				Constants.SCHEMA, Constants.VIEW_COMMENTS, Constants.SCHEMA, Constants.TABLE_USER,
				Constants.COLUMN_USER_ID, Constants.COLUMN_ID, Constants.COLUMN_POST_ID)
			);
		
		stmt_selectComment = connection.prepareStatement(String.format(
				"SELECT A.%s, B.%s, A.%s, A.%s " + 
				"FROM %s.%s as A, %s.%s as B " +
				"WHERE A.%s = B.%s AND A.%s = ? AND A.%s = ? ",
				Constants.COLUMN_ID, Constants.COLUMN_EMAIL, Constants.COLUMN_CONTENT, Constants.COLUMN_PUBLISH_DATE,
				Constants.SCHEMA, Constants.VIEW_COMMENTS, Constants.SCHEMA, Constants.TABLE_USER,
				Constants.COLUMN_USER_ID, Constants.COLUMN_ID, Constants.COLUMN_POST_ID, Constants.COLUMN_ID)
			);
		
		stmt_insertComment = connection.prepareStatement(String.format("INSERT INTO %s.%s (%s, %s, %s, %s) VALUES (?, ?, ?, ?)", 
																			Constants.SCHEMA,
																			Constants.VIEW_COMMENTS,
																			Constants.COLUMN_POST_ID,
																			Constants.COLUMN_USER_ID,
																			Constants.COLUMN_PUBLISH_DATE,
																			Constants.COLUMN_CONTENT));
		
		stmt_updateComment = connection.prepareStatement(String.format("UPDATE %s.%s SET %s = ? WHERE %s = ?",
																			Constants.SCHEMA,
																			Constants.VIEW_COMMENTS,
																			Constants.COLUMN_CONTENT,
																			Constants.COLUMN_ID));
		
		stmt_deleteComment = connection.prepareStatement(String.format("DELETE FROM %s.%s WHERE %s = ?", 
																			Constants.SCHEMA,
																			Constants.VIEW_COMMENTS,
																			Constants.COLUMN_ID));
		
		stmt_selectUserIdByEmail = connection.prepareStatement(String.format("SELECT %s FROM %s.%s WHERE %s = ?",
																			Constants.COLUMN_ID,
																			Constants.SCHEMA,
																			Constants.TABLE_USER,
																			Constants.COLUMN_EMAIL));
		
		stmt_selectUserIdByLogin = connection.prepareStatement(String.format("SELECT %s FROM %s.%s WHERE %s = ? AND %s = ?",
																			Constants.COLUMN_ID,
																			Constants.SCHEMA,
																			Constants.TABLE_USER,
																			Constants.COLUMN_EMAIL,
																			Constants.COLUMN_PASSWORD));
		
		stmt_insertUser = connection.prepareStatement(String.format("INSERT INTO %s.%s (%s, %s) VALUES (?, ?)",
																			Constants.SCHEMA,
																			Constants.TABLE_USER,
																			Constants.COLUMN_EMAIL,
																			Constants.COLUMN_PASSWORD));
		
	}
	
	public boolean isLoggedIn(){
		return currentUser != null;
	}
	
	public String getCurrentUserEmail(){
		return currentUser.getEmail();
	}
	
	public Post getPost(int id) throws SQLException{
		stmt_selectPost.setInt(1, id);
		ResultSet rs = stmt_selectPost.executeQuery();
		if(!rs.next())
			return null;
		Post ret = new Post(rs.getInt(Constants.COLUMN_ID),
							rs.getString(Constants.COLUMN_EMAIL),
							rs.getString(Constants.COLUMN_TITLE),
							rs.getString(Constants.COLUMN_CONTENT),
							rs.getDate(Constants.COLUMN_PUBLISH_DATE));
		return ret;
	}
	
	public Comment getComment(int postId, int id) throws SQLException{
		stmt_selectComment.setInt(1, postId);
		stmt_selectComment.setInt(2, id);
		ResultSet rs = stmt_selectComment.executeQuery();
		if(!rs.next())
			return null;
		Comment ret = new Comment(rs.getInt(Constants.COLUMN_ID),
							rs.getString(Constants.COLUMN_EMAIL),
							rs.getString(Constants.COLUMN_CONTENT),
							rs.getDate(Constants.COLUMN_PUBLISH_DATE));
		return ret;
	}
	
	private void addUser(User user) throws SQLException{
		if(currentUser != null)
			throw new SQLException("User is already registered");
		
		currentUser = user;
		stmt_insertUser.setString(1, user.getEmail());
		stmt_insertUser.setString(2, user.getPasswordHash());
		stmt_insertUser.executeUpdate();
		currentUser.setId(getUserId(currentUser.getEmail()));
	}
	
	public void login(User user) throws SQLException{
		if(isLoggedIn())
			return;
		if(getUserId(user.getEmail(), user.getPasswordHash()) != -1){
			currentUser = user;
			currentUser.setId(getUserId(user.getEmail()));
			return;
		}
		if(getUserId(user.getEmail()) != -1){
			throw new SQLException();
		}
		addUser(user);
	}
	
	public void logout(){
		currentUser = null;
	}
	
	private int getUserId(String email, String password) throws SQLException{
		stmt_selectUserIdByLogin.setString(1, email);
		stmt_selectUserIdByLogin.setString(2, password);
		ResultSet rs = stmt_selectUserIdByLogin.executeQuery();
		if(!rs.isBeforeFirst())
			return -1;
		rs.next();
		return rs.getInt(Constants.COLUMN_ID);
	}
	
	private int getUserId(String email) throws SQLException{
		stmt_selectUserIdByEmail.setString(1, email);
		ResultSet rs = stmt_selectUserIdByEmail.executeQuery();
		if(!rs.isBeforeFirst())
			return -1;
		rs.next();
		return rs.getInt(Constants.COLUMN_ID);
	}
	
	public void deleteComment(Comment comment) throws SQLException{
		if(currentUser == null)
			throw new SQLException("You are not logged in");
		if(!comment.getAuthorEmail().equals(currentUser.getEmail()))
			throw new SQLException("You cannot delete comments from other users");
		stmt_deleteComment.setInt(1, comment.getId());
		stmt_deleteComment.executeUpdate();
	}
	
	public boolean canEditPost(Post post) throws SQLException{
		return post.getAuthorEmail().equals(currentUser.getEmail());
	}
	
	public boolean canEditComment(Comment comment) throws SQLException{
		return comment.getAuthorEmail().equals(currentUser.getEmail());
	}
	
	public void updateComment(int id, Comment comment) throws SQLException{
		if(currentUser == null)
			throw new SQLException("You are not logged in");
		if(!comment.getAuthorEmail().equals(currentUser.getEmail()))
			throw new SQLException("You cannot edit comments other users");
		stmt_updateComment.setString(1, comment.getContent());
		stmt_updateComment.setInt(2, id);
		stmt_updateComment.executeUpdate();
	}
	
	public void addPostWithComment(Post post, Comment comment) throws SQLException{
		try{
			connection.setAutoCommit(false);
			int postId = this.addPost(post);
			this.addComment(comment, postId);
			connection.commit();
		}catch(SQLException exc){
			connection.rollback();
			throw exc;
		}finally{
			connection.setAutoCommit(true);
		}
	}
	
	public void addComment(Comment comment, int postId) throws SQLException{
		if(currentUser == null)
			throw new SQLException("You are not logged in");
		stmt_insertComment.setInt(1, postId);
		stmt_insertComment.setInt(2, currentUser.getId());
		stmt_insertComment.setDate(3, new java.sql.Date(Calendar.getInstance().getTime().getTime()));
		stmt_insertComment.setString(4, comment.getContent());
		stmt_insertComment.executeUpdate();
	}
	
	public Comment[] getComments(int postId) throws SQLException{
		stmt_selectCommentsUnderPost.setInt(1,  postId);
		ResultSet rs = stmt_selectCommentsUnderPost.executeQuery();
		ArrayList<Comment> comments = new ArrayList<>();
		while(rs.next()){
			int id = rs.getInt(Constants.COLUMN_ID);
			String authorEmail = rs.getString(Constants.COLUMN_EMAIL);
			String content = rs.getString(Constants.COLUMN_CONTENT);
			Date publishDate = rs.getDate(Constants.COLUMN_PUBLISH_DATE);
			comments.add(new Comment(id, authorEmail, content, publishDate));
		}
		return comments.toArray(new Comment[comments.size()]);
	}
	
	public void updatePost(int id, Post post) throws SQLException{
		if(currentUser == null)
			throw new SQLException("You are not logged in");
		if(!post.getAuthorEmail().equals(currentUser.getEmail()))
			throw new SQLException("You cannot edit posts from other users");
		stmt_updatePost.setString(1, post.getTitle());
		stmt_updatePost.setString(2, post.getContent());
		stmt_updatePost.setInt(3, id);
		stmt_updatePost.executeUpdate();
	}
	
	public void deletePost(Post post) throws SQLException{
		if(currentUser == null)
			throw new SQLException("You are not logged in");
		if(!post.getAuthorEmail().equals(currentUser.getEmail()))
			throw new SQLException("You cannot delete posts from other users");
		stmt_deletePost.setInt(1, post.getId());
		stmt_deletePost.executeUpdate();
	}
	
	public int addPost(Post post) throws SQLException{
		if(currentUser == null)
			throw new SQLException("You are not logged in");
		stmt_insertPost.setString(1, post.getTitle());
		stmt_insertPost.setString(2, post.getContent());
		stmt_insertPost.setDate(3, new java.sql.Date(post.getPublishDate().getTime()));
		stmt_insertPost.setInt(4, currentUser.getId());
		ResultSet ret = stmt_insertPost.executeQuery();
		if(!ret.next())
			throw new SQLException("Post insert failed");
		return ret.getInt(Constants.COLUMN_ID);
	}
	
	public Post[] getPosts() throws SQLException{
		ResultSet rs = stmt_selectPosts.executeQuery();
		ArrayList<Post> posts = new ArrayList<>();
		while(rs.next()){
			int id = rs.getInt(Constants.COLUMN_ID);
			String authorEmail = rs.getString(Constants.COLUMN_EMAIL);
			String title = rs.getString(Constants.COLUMN_TITLE);
			String content = rs.getString(Constants.COLUMN_CONTENT);
			Date publishDate = rs.getDate(Constants.COLUMN_PUBLISH_DATE);
			posts.add(new Post(id, authorEmail, title, content, publishDate));
		}
		return posts.toArray(new Post[posts.size()]);
	}
	
	public void closeConnection() throws SQLException{
		stmt_selectPosts.close();
		stmt_selectPost.close();
		stmt_insertPost.close();
		stmt_updatePost.close();
		stmt_deletePost.close();
		stmt_selectCommentsUnderPost.close();
		stmt_insertComment.close();
		stmt_updateComment.close();
		stmt_deleteComment.close();
		stmt_selectComment.close();
		stmt_selectUserIdByEmail.close();
		stmt_selectUserIdByLogin.close();
		stmt_insertUser.close();
		if(connection != null && !connection.isClosed())
			connection.close();
	}
}
