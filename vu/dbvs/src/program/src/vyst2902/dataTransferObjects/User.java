package vyst2902.dataTransferObjects;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

import vyst2902.hashing.Sha256Hasher;

public class User {
	private String email;
	private String passwordHash;
	private int id;
	
	public User(String email, String password){
		this.email = email;
		try {
			this.passwordHash = Sha256Hasher.computeHash(password);
		} catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	
	public void setId(int id){
		if(this.id > 0)
			return;
		this.id = id;
	}
	
	public int getId(){
		return id;
	}
	
	public String getEmail(){
		return email;
	}
	
	public String getPasswordHash(){
		return passwordHash;
	}
}
