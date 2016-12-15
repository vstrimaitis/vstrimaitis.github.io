package vyst2902.hashing;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Sha256Hasher {
	public static String computeHash(String s) throws NoSuchAlgorithmException, UnsupportedEncodingException{
		MessageDigest md = MessageDigest.getInstance("SHA-256");
		md.update(s.getBytes("UTF-8"));
		byte[] digest = md.digest();
		return String.format("%064x", new java.math.BigInteger(1, digest));
	}
}
