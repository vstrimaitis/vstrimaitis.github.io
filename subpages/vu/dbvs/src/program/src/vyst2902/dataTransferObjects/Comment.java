package vyst2902.dataTransferObjects;

import java.util.Date;

public class Comment {

	private int id;
	private String content;
	private String authorEmail;
	private Date publishDate;
	
	public Comment(String authorEmail, String content, Date publishDate){
		this.content = content;
		this.publishDate = publishDate;
		this.authorEmail = authorEmail;
	}
	
	public Comment(int id, String authorEmail, String content, Date publishDate){
		this(authorEmail, content, publishDate);
		this.id = id;
	}
	
	public int getId(){
		return id;
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
