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
	public static void start() throws ClassNotFoundException, SQLException{
        DataTransferManager mgr = new DataTransferManager("studentu", "vyst2902", "vyst2902");
		Scanner in = new Scanner(System.in);
		//in.useDelimiter("[\r\n]+");
		showHeader();
		boolean isRunning = true;
		while(isRunning){
			try{
				if(mgr.isLoggedIn())
					isRunning = showMenuLoggedIn(mgr, in);
				else
					isRunning = showMenuLoggedOut(mgr, in);
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
	
	private static void executeOptionDeleteComment(DataTransferManager mgr, Scanner in) throws SQLException{
		Post post = getPostFromList(mgr, in);
		if(post == null)
			return;
		Comment comment = getCommentFromList(mgr, in, post.getId());
		if(comment == null)
			return;
		try{
			mgr.deleteComment(comment);
			System.out.println("Comment deleted successfully");
		}catch(SQLException exc){
			System.out.println(exc.getMessage());
		}
	}

	private static void executeOptionDeletePost(DataTransferManager mgr, Scanner in) throws SQLException{
		if(!mgr.isLoggedIn()){
			System.out.println("You are not logged in!");
			return;
		}
		System.out.println("Select a post to delete:");
		Post post = getPostFromList(mgr, in);
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

	private static void executeOptionUpdateComment(DataTransferManager mgr, Scanner in) throws SQLException{
		if(!mgr.isLoggedIn()){
			System.out.println("You are not logged in!");
			return;
		}
		Post post = getPostFromList(mgr, in);
		if(post == null)
			return;
		if(!mgr.canEditPost(post)){
			System.out.println("This is not your post, you cannot edit it!");
			return;
		}
		Comment comment = getCommentFromList(mgr, in, post.getId());
		if(comment == null)
			return;
		if(!mgr.canEditComment(comment)){
			System.out.println("This is not your comment, you cannot edit it!");
			return;
		}
		Comment input = getCommentInput(mgr, in);
		mgr.updateComment(comment.getId(), input);
		System.out.println("Comment edit was successful");
	}

	private static void executeOptionUpdatePost(DataTransferManager mgr, Scanner in) throws SQLException{
		if(!mgr.isLoggedIn()){
			System.out.println("You are not logged in!");
			return;
		}
		Post post = getPostFromList(mgr, in);
		if(post == null)
			return;
		if(!mgr.canEditPost(post)){
			System.out.println("This is not your post, you cannot edit it!");
			return;
		}
		Post input = getPostInput(mgr, in);
		mgr.updatePost(post.getId(), input);
		System.out.println("Post edited successfully");
	}

	private static void executeOptionAddComment(DataTransferManager mgr, Scanner in) throws SQLException{
		if(!mgr.isLoggedIn()){
			System.out.println("You are not logged in!");
			return;
		}
		Post post = getPostFromList(mgr, in);
		if(post == null)
			return;
		Comment comment = getCommentInput(mgr, in);
		mgr.addComment(comment, post.getId());
		System.out.println("Comment added successfully");
	}

	private static void executeOptionAddPost(DataTransferManager mgr, Scanner in) throws SQLException{
		if(!mgr.isLoggedIn()){
			System.out.println("You are not logged in!");
			return;
		}
		Post post = getPostInput(mgr, in);
		mgr.addPost(post);
		System.out.println("Post added successfully");
	}
	
	private static void executeOptionAddPostWithComment(DataTransferManager mgr, Scanner in) throws SQLException{
		if(!mgr.isLoggedIn()){
			System.out.println("You are not logged in!");
			return;
		}
		Post post = getPostInput(mgr, in);
		Comment comment = getCommentInput(mgr, in);
		mgr.addPostWithComment(post, comment);
		System.out.println("Post and comment added successfully");
	}
	
	private static Comment getCommentInput(DataTransferManager mgr, Scanner in){
		System.out.print("Content of the comment: ");
		String content = in.nextLine();
		return new Comment(mgr.getCurrentUserEmail(), content, new Date());
	}
	
	private static Post getPostInput(DataTransferManager mgr, Scanner in){
		System.out.print("Title of the post: ");
		String title = in.nextLine();
		System.out.print("Content of the post: ");
		String content = in.nextLine();
		return new Post(mgr.getCurrentUserEmail(), title, content, new Date());
	}

	private static void executeOptionLogin(DataTransferManager mgr, Scanner in){
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

	private static Post getPostFromList(DataTransferManager mgr, Scanner in) throws SQLException{
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
	
	private static Comment getCommentFromList(DataTransferManager mgr, Scanner in, int postId) throws SQLException{
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
	
	private static void executeOptionLogout(DataTransferManager mgr){
		if(!mgr.isLoggedIn())
			return;
		mgr.logout();
		System.out.println("Logged out successfully!");
	}
	
	private static void executeOptionGetPosts(DataTransferManager mgr, Scanner in) throws SQLException{
        System.out.println(TableConverter.convert(mgr.getPosts()).toString());
	}
	
	private static void executeOptionGetComments(DataTransferManager mgr, Scanner in) throws SQLException{
		Post post = getPostFromList(mgr, in);
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
	
	private static boolean showMenuLoggedOut(DataTransferManager mgr, Scanner in) throws SQLException{
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
			executeOptionLogin(mgr, in);
			break;
		case 2:
			executeOptionGetPosts(mgr, in);
			break;
		case 3:
			executeOptionGetComments(mgr, in);
			break;
		default:
			throw new InputMismatchException();
		}
		return result;
	}
	
	private static boolean showMenuLoggedIn(DataTransferManager mgr, Scanner in) throws SQLException{
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
			executeOptionLogout(mgr);
			break;
		case 2:
			executeOptionGetPosts(mgr, in);
			break;
		case 3:
			executeOptionGetComments(mgr, in);
			break;
		case 4:
			executeOptionAddPost(mgr, in);
			break;
		case 5:
			executeOptionAddComment(mgr, in);
			break;
		case 6:
			executeOptionAddPostWithComment(mgr, in);
			break;
		case 7:
			executeOptionUpdatePost(mgr, in);
			break;
		case 8:
			executeOptionUpdateComment(mgr, in);
			break;
		case 9:
			executeOptionDeletePost(mgr, in);
			break;
		case 10:
			executeOptionDeleteComment(mgr, in);
			break;
		default:
			throw new InputMismatchException();
		}
		return result;
	}
}
