package vyst2902.dataTransferObjects;

import java.util.Date;

public class Post {
	private int id;
	private String title;
	private String content;
	private String authorEmail;
	private Date publishDate;
	
	public Post(String authorEmail, String title, String content, Date publishDate){
		this.title = title;
		this.content = content;
		this.publishDate = publishDate;
		this.authorEmail = authorEmail;
	}
	
	public Post(int id, String authorEmail, String title, String content, Date publishDate){
		this(authorEmail, title, content, publishDate);
		this.id = id;
	}
	
	public int getId(){
		return id;
	}
	
	public String getTitle(){
		return title;
	}
	
	public String getContent(){
		return content;
	}
	
	public String getAuthorEmail(){
		return authorEmail;
	}
	
	public Date getPublishDate(){
		return publishDate;
	}
}
