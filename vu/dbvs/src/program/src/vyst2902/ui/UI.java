package vyst2902.ui;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Scanner;

import vyst2902.dataTransferObjects.*;
import vyst2902.database.DataTransferManager;

public class UI {
	private DataTransferManager mgr;
	private Scanner in;
	
	public UI(String dbName, String login, String password) throws SQLException, ClassNotFoundException{
		mgr = new DataTransferManager(dbName, login, password);
		in = new Scanner(System.in);
	}
	public void start() throws ClassNotFoundException, SQLException{
		showHeader();
		boolean isRunning = true;
		while(isRunning){
			try{
				if(mgr.isLoggedIn())
					isRunning = showMenuLoggedIn();
				else
					isRunning = showMenuLoggedOut();
			} catch(InputMismatchException e){
				System.out.println("Invalid input!");
				in.next();
			} catch(SQLException e){
				System.out.println("A database error occurred...");
				System.out.println(e.getMessage());
			}
			finally{
				in.nextLine();
			}
		}
		in.close();
	}
	
	private void executeOptionDeleteComment() throws SQLException{
		Post post = getPostFromList();
		if(post == null)
			return;
		Comment comment = getCommentFromList(post.getId());
		if(comment == null)
			return;
		try{
			mgr.deleteComment(comment);
			System.out.println("Comment deleted successfully");
		}catch(SQLException exc){
			System.out.println(exc.getMessage());
		}
	}

	private void executeOptionDeletePost() throws SQLException{
		if(!mgr.isLoggedIn()){
			System.out.println("You are not logged in!");
			return;
		}
		System.out.println("Select a post to delete:");
		Post post = getPostFromList();
		if(post == null){
			System.out.println(TableConverter.convert(new Post[0]).toString());
			return;
		}
		try{
			mgr.deletePost(post);
			System.out.println("Post deleted successfully");
		} catch(SQLException exc){
			System.out.println(exc.getMessage());
		}
		
	}

	private void executeOptionUpdateComment() throws SQLException{
		if(!mgr.isLoggedIn()){
			System.out.println("You are not logged in!");
			return;
		}
		Post post = getPostFromList();
		if(post == null)
			return;
		if(!mgr.canEditPost(post)){
			System.out.println("This is not your post, you cannot edit it!");
			return;
		}
		Comment comment = getCommentFromList(post.getId());
		if(comment == null)
			return;
		if(!mgr.canEditComment(comment)){
			System.out.println("This is not your comment, you cannot edit it!");
			return;
		}
		Comment input = getCommentInput();
		mgr.updateComment(comment.getId(), input);
		System.out.println("Comment edit was successful");
	}

	private void executeOptionUpdatePost() throws SQLException{
		if(!mgr.isLoggedIn()){
			System.out.println("You are not logged in!");
			return;
		}
		Post post = getPostFromList();
		if(post == null)
			return;
		if(!mgr.canEditPost(post)){
			System.out.println("This is not your post, you cannot edit it!");
			return;
		}
		Post input = getPostInput();
		mgr.updatePost(post.getId(), input);
		System.out.println("Post edited successfully");
	}

	private void executeOptionAddComment() throws SQLException{
		if(!mgr.isLoggedIn()){
			System.out.println("You are not logged in!");
			return;
		}
		Post post = getPostFromList();
		if(post == null)
			return;
		Comment comment = getCommentInput();
		mgr.addComment(comment, post.getId());
		System.out.println("Comment added successfully");
	}

	private void executeOptionAddPost() throws SQLException{
		if(!mgr.isLoggedIn()){
			System.out.println("You are not logged in!");
			return;
		}
		Post post = getPostInput();
		mgr.addPost(post);
		System.out.println("Post added successfully");
	}
	
	private void executeOptionAddPostWithComment() throws SQLException{
		if(!mgr.isLoggedIn()){
			System.out.println("You are not logged in!");
			return;
		}
		Post post = getPostInput();
		Comment comment = getCommentInput();
		mgr.addPostWithComment(post, comment);
		System.out.println("Post and comment added successfully");
	}
	
	private Comment getCommentInput(){
		System.out.print("Content of the comment: ");
		String content = in.nextLine();
		return new Comment(mgr.getCurrentUserEmail(), content, new Date());
	}
	
	private Post getPostInput(){
		System.out.print("Title of the post: ");
		String title = in.nextLine();
		System.out.print("Content of the post: ");
		String content = in.nextLine();
		return new Post(mgr.getCurrentUserEmail(), title, content, new Date());
	}

	private void executeOptionLogin(){
		System.out.print("E-mail: ");
		String email = in.nextLine();
		System.out.print("Password: ");
		String pass = in.nextLine();
		User user = new User(email, pass);
		try{
			mgr.login(user);
			System.out.println("Logged in successfully!");
		} catch(SQLException exc){
			System.out.println("Login failed");
			return;
		}
	}

	private Post getPostFromList() throws SQLException{
		Post[] posts = mgr.getPosts();
		System.out.println(TableConverter.convert(posts).toString());
		if(posts.length == 0)
				return null;
		Post post = null;
		do{
		    System.out.print("Id of the selected post: ");
		    int id = in.nextInt(); in.nextLine();
		    post = mgr.getPost(id);
		}while(post == null);
		return post;
	}
	
	private Comment getCommentFromList(int postId) throws SQLException{
		Comment[] comments = mgr.getComments(postId);
		System.out.println(TableConverter.convert(comments).toString());
		if(comments.length == 0)
				return null;
		Comment comment = null;
		do{
		    System.out.print("Id of the selected comment: ");
		    int id = in.nextInt(); in.nextLine();
		    comment = mgr.getComment(postId, id);
		}while(comment == null);
		return comment;
	}
	
	private void executeOptionLogout(){
		if(!mgr.isLoggedIn())
			return;
		mgr.logout();
		System.out.println("Logged out successfully!");
	}
	
	private void executeOptionGetPosts() throws SQLException{
		System.out.println(TableConverter.convert(mgr.getPosts()).toString());
	}
	
	private void executeOptionGetComments() throws SQLException{
		Post post = getPostFromList();
		if(post == null)
			return;
		System.out.println(TableConverter.convert(mgr.getComments(post.getId())).toString());
	}
	
	private static void showHeader(){
		System.out.println("   ______          ___                ____    __               ");
		System.out.println("  / ____/___  ____/ (_)___  ____ _   /  _/___/ /__  ____ ______");
		System.out.println(" / /   / __ \\/ __  / / __ \\/ __ `/   / // __  / _ \\/ __ `/ ___/");
		System.out.println("/ /___/ /_/ / /_/ / / / / / /_/ /  _/ // /_/ /  __/ /_/ (__  ) ");
		System.out.println("\\____/\\____/\\__,_/_/_/ /_/\\__, /  /___/\\__,_/\\___/\\__,_/____/  ");
		System.out.println("                         /____/                                ");
	}
	
	private boolean showMenuLoggedOut() throws SQLException{
		System.out.println(" 0. Exit program");
		System.out.println(" 1. Log in");
		System.out.println(" 2. View all posts");
		System.out.println(" 3. View comments under a post");
		
		System.out.print("> ");
		int option = in.nextInt(); in.nextLine();
		boolean result = true;
		switch(option){
		case 0:
			result = false;
			break;
		case 1:
			executeOptionLogin();
			break;
		case 2:
			executeOptionGetPosts();
			break;
		case 3:
			executeOptionGetComments();
			break;
		default:
			throw new InputMismatchException();
		}
		return result;
	}
	
	private boolean showMenuLoggedIn() throws SQLException{
		System.out.println(" 0. Exit program");
		System.out.println(" 1. Log out");
		System.out.println(" 2. View all posts");
		System.out.println(" 3. View comments under a post");
		System.out.println(" 4. Write a new post");
		System.out.println(" 5. Write a new comment");
		System.out.println(" 6. Write a new post with an initial comment");
		System.out.println(" 7. Edit an existing post");
		System.out.println(" 8. Edit an existing comment");
		System.out.println(" 9. Delete a post");
		System.out.println("10. Delete a comment");
		
		System.out.print("> ");
		int option = in.nextInt(); in.nextLine();
		boolean result = true;
		switch(option){
		case 0:
			result = false;
			break;
		case 1:
			executeOptionLogout();
			break;
		case 2:
			executeOptionGetPosts();
			break;
		case 3:
			executeOptionGetComments();
			break;
		case 4:
			executeOptionAddPost();
			break;
		case 5:
			executeOptionAddComment();
			break;
		case 6:
			executeOptionAddPostWithComment();
			break;
		case 7:
			executeOptionUpdatePost();
			break;
		case 8:
			executeOptionUpdateComment();
			break;
		case 9:
			executeOptionDeletePost();
			break;
		case 10:
			executeOptionDeleteComment();
			break;
		default:
			throw new InputMismatchException();
		}
		return result;
	}
}
